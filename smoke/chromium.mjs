// Calls a cross-origin stub that applies smoke/cors-policy.json from a page in
// headless Chromium: keyed and conditional writes must pass the preflight, and
// X-Correlation-Id and Retry-After must be readable.
//   node smoke/chromium.mjs <installed package dir> [--executable <chromium path>]
import { readFile } from "node:fs/promises";
import { createServer } from "node:http";
import { extname, join, normalize } from "node:path";

const packageDir = process.argv[2];
const executableIndex = process.argv.indexOf("--executable");
const executablePath = executableIndex === -1 ? undefined : process.argv[executableIndex + 1];
const policy = JSON.parse(await readFile(new URL("./cors-policy.json", import.meta.url), "utf8"));
const { chromium } = await import("playwright-core");

async function listen(host, handler) {
  const server = createServer(handler);
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  return { url: `http://${host}:${server.address().port}`, close: () => server.close() };
}

const corsHeaders = {
  "Access-Control-Allow-Origin": policy.allowOrigin,
  "Access-Control-Expose-Headers": policy.exposeHeaders.join(", "),
};
const preflights = [];
const api = await listen("localhost", (req, res) => {
  if (req.method === "OPTIONS") {
    const requested = (req.headers["access-control-request-headers"] ?? "").split(",").map((h) => h.trim()).filter(Boolean);
    preflights.push({ method: req.headers["access-control-request-method"], headers: requested });
    const allowed = new Set(policy.allowHeaders.map((h) => h.toLowerCase()));
    if (!requested.every((h) => allowed.has(h.toLowerCase()))) return res.writeHead(204).end();
    return res
      .writeHead(204, {
        "Access-Control-Allow-Origin": policy.allowOrigin,
        "Access-Control-Allow-Methods": policy.allowMethods.join(", "),
        "Access-Control-Allow-Headers": policy.allowHeaders.join(", "),
        "Access-Control-Max-Age": String(policy.maxAge),
      })
      .end();
  }
  const send = (status, body, headers = {}) =>
    res.writeHead(status, { "Content-Type": "application/json", ...corsHeaders, ...headers }).end(JSON.stringify(body));
  if (req.method === "POST" && req.url === "/v1/contacts" && req.headers["idempotency-key"]) {
    return send(201, { status: "success", id: "c1" });
  }
  if (req.method === "PATCH" && req.url === "/v1/deals/d1" && req.headers["if-match"] === '"r1"') {
    return send(200, { status: "success", revision: '"r2"' });
  }
  send(
    404,
    { type: "https://docs.gatherdeal.ai/errors/NOT_FOUND", title: "Not found", status: 404, code: "NOT_FOUND", retryable: false },
    { "Content-Type": "application/problem+json", "X-Correlation-Id": "corr-1", "Retry-After": "7" },
  );
});

const page = `<!doctype html><meta charset="utf-8"><script type="module">
import { createClient } from "/sdk/index.js";
const result = {};
try {
  try { createClient({ apiKey: "k" }); result.apiKeyGuard = false; } catch { result.apiKeyGuard = true; }
  const client = createClient({ token: () => "t", baseUrl: { crm: ${JSON.stringify(api.url)} }, allowLoopbackHttp: true, retries: 0 });
  result.created = (await client.crm.contacts.create({ name: "Tan" })).id;
  result.revision = (await client.crm.deals.update({ id: "d1", if_match: '"r1"', remark: "x" })).revision;
  try { await client.crm.contacts.get({ id: "missing" }); } catch (e) {
    result.code = e.code; result.correlationId = e.correlationId; result.retryAfterMs = e.retryAfterMs;
  }
} catch (e) { result.error = String(e); }
window.__result = result;
</script>`;

const types = { ".js": "text/javascript", ".html": "text/html" };
const site = await listen("127.0.0.1", async (req, res) => {
  if (req.url === "/") return res.writeHead(200, { "Content-Type": "text/html" }).end(page);
  const path = normalize(req.url.replace(/^\/sdk\//, "/"));
  try {
    const body = await readFile(join(packageDir, "dist", path));
    res.writeHead(200, { "Content-Type": types[extname(path)] ?? "application/octet-stream" }).end(body);
  } catch {
    res.writeHead(404).end();
  }
});

const browser = await chromium.launch(executablePath === undefined ? {} : { executablePath });
try {
  const tab = await browser.newPage();
  await tab.goto(site.url);
  const result = await tab.waitForFunction(() => window.__result, undefined, { timeout: 15_000 }).then((h) => h.jsonValue());
  const want = { apiKeyGuard: true, created: "c1", revision: '"r2"', code: "NOT_FOUND", correlationId: "corr-1", retryAfterMs: 7000 };
  for (const [key, value] of Object.entries(want)) {
    if (result[key] !== value) throw new Error(`chromium: ${key} is ${JSON.stringify(result[key])}, want ${value}: ${JSON.stringify(result)}`);
  }
  const keyed = preflights.find((p) => p.method === "POST");
  if (!keyed?.headers.includes("idempotency-key")) throw new Error(`chromium: no keyed preflight: ${JSON.stringify(preflights)}`);
  const conditional = preflights.find((p) => p.method === "PATCH");
  if (!conditional?.headers.includes("if-match")) throw new Error(`chromium: no conditional preflight: ${JSON.stringify(preflights)}`);
  console.log("chromium: ok");
} finally {
  await browser.close();
  api.close();
  site.close();
}
