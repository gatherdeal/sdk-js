// Runs the packed SDK inside workerd (through Miniflare) with the runtime's
// own fetch: a success call, and a redirect that must be refused without
// reaching its target.
//   node smoke/workerd.mjs <installed package dir>
import { readFile, readdir } from "node:fs/promises";
import { createServer } from "node:http";
import { join, relative, sep } from "node:path";

const packageDir = process.argv[2];
const { Miniflare } = await import("miniflare");
const envSentinel = "smoke-workerd-sentinel";

async function listen(handler) {
  const server = createServer(handler);
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  return { url: `http://127.0.0.1:${server.address().port}`, close: () => server.close() };
}

let reached = 0;
const target = await listen((_req, res) => {
  reached++;
  res.end("{}");
});
const origin = await listen((req, res) => {
  if (req.url === "/v1/outlets/ok") {
    res.writeHead(200, { "Content-Type": "application/json" }).end('{"status":"success","outlet":{"id":"ok"}}');
  } else {
    res.writeHead(302, { Location: `${target.url}/v1/outlets/x` }).end();
  }
});

const worker = `
export default {
  async fetch(request, bindings) {
    const variable = "GATHERDEAL_API_KEY";
    const environment = process.env;
    if (environment[variable] !== bindings[variable] || environment[variable] !== ${JSON.stringify(envSentinel)}) {
      throw new Error("workerd: sentinel is missing from process.env");
    }
    let envReads = 0;
    const observed = new Proxy(environment, {
      get(target, key, receiver) {
        if (key === variable) envReads++;
        return Reflect.get(target, key, receiver);
      },
      ownKeys(target) {
        envReads++;
        return Reflect.ownKeys(target);
      },
    });
    let sdk;
    try {
      process.env = observed;
      if (process.env !== observed) throw new Error("workerd: failed to observe process.env access");
      sdk = await import("./sdk/index.js");
      try {
        new sdk.GatherDeal();
        throw new Error("workerd: credentials unexpectedly resolved");
      } catch (error) {
        if (!error.message.startsWith("GatherDeal: set apiKey, accessToken or GATHERDEAL_API_KEY")) throw error;
      }
    } finally {
      process.env = environment;
    }
    const { GatherDeal, InvalidResponseError } = sdk;
    const origin = new URL(request.url).searchParams.get("origin");
    const client = new GatherDeal({ apiKey: "secret", serviceBaseURLs: { identity: origin }, maxRetries: 0 });
    const ok = await client.identity.outlets.get("ok");
    let error;
    try {
      await client.identity.outlets.get("redirect");
    } catch (e) {
      error = e;
    }
    return Response.json({ ok: ok.id, refused: error instanceof InvalidResponseError, error: String(error), envReads });
  },
};
`;

const dist = join(packageDir, "dist");
const modules = [{ type: "ESModule", path: "worker.mjs", contents: worker }];
for (const entry of await readdir(dist, { recursive: true, withFileTypes: true })) {
  if (!entry.isFile() || !entry.name.endsWith(".js")) continue;
  const file = join(entry.parentPath, entry.name);
  modules.push({
    type: "ESModule",
    path: `sdk/${relative(dist, file).split(sep).join("/")}`,
    contents: await readFile(file, "utf8"),
  });
}

const mf = new Miniflare({
  modules,
  compatibilityDate: "2026-07-01",
  compatibilityFlags: ["nodejs_compat"],
  bindings: { GATHERDEAL_API_KEY: envSentinel },
});
try {
  const response = await mf.dispatchFetch(`http://localhost/?origin=${encodeURIComponent(origin.url)}`);
  const result = await response.json();
  if (result.ok !== "ok") throw new Error(`workerd: success call failed: ${JSON.stringify(result)}`);
  if (!result.refused) throw new Error(`workerd: redirect not refused: ${result.error}`);
  if (result.envReads !== 0) throw new Error(`workerd: ${result.envReads} environment reads`);
  if (reached !== 0) throw new Error("workerd: redirect target was reached");
  console.log("workerd: success and redirect checks passed with nodejs_compat and zero environment reads");
} finally {
  await mf.dispose();
  origin.close();
  target.close();
}
