import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { createServer, type Server } from "node:http";
import type { AddressInfo } from "node:net";
import { after, before, describe, it } from "node:test";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";

const root = fileURLToPath(new URL("../../", import.meta.url));
const script = `${root}scripts/generated.mjs`;
const lockBytes = readFileSync(`${root}generated.lock.json`);
const lock = JSON.parse(lockBytes.toString("utf8")) as {
  set: string;
  files: { path: string; sha256: string; size: number }[];
};
const hex = lock.set.slice("sha256:".length);

let routes = new Map<string, Buffer>();
let server: Server;
let base = "";

before(async () => {
  server = createServer((req, res) => {
    const body = routes.get(req.url ?? "");
    if (body === undefined) res.writeHead(404).end();
    else res.end(body);
  });
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  base = `http://127.0.0.1:${(server.address() as AddressInfo).port}`;
});
after(() => server.close());

function publishLockedSet(): void {
  routes = new Map([["/index.json", lockBytes]]);
  for (const f of lock.files) routes.set(`/sets/${hex}/${f.path}`, readFileSync(`${root}src/generated/${f.path}`));
}

async function run(...args: string[]): Promise<{ code: number; out: string }> {
  try {
    const { stdout, stderr } = await promisify(execFile)(process.execPath, [script, ...args, "--base", base]);
    return { code: 0, out: stdout + stderr };
  } catch (error) {
    const e = error as { code: number; stdout: string; stderr: string };
    return { code: e.code, out: e.stdout + e.stderr };
  }
}

describe("generated.mjs", () => {
  it("accepts the committed files offline", async () => {
    const result = await run("check");
    assert.equal(result.code, 0, result.out);
  });

  it("treats a missing index as nothing to do", async () => {
    routes = new Map();
    const result = await run("sync");
    assert.equal(result.code, 0, result.out);
    assert.match(result.out, /nothing to do/);
  });

  it("reports an identical index as up to date", async () => {
    publishLockedSet();
    const result = await run("sync");
    assert.equal(result.code, 0, result.out);
    assert.match(result.out, /up to date/);
  });

  it("verifies the locked set byte for byte", async () => {
    publishLockedSet();
    assert.equal((await run("verify-remote")).code, 0);
    const first = lock.files[0]!;
    const original = routes.get(`/sets/${hex}/${first.path}`)!;
    routes.set(`/sets/${hex}/${first.path}`, Buffer.concat([original.subarray(0, -1), Buffer.from(" ")]));
    const result = await run("verify-remote");
    assert.equal(result.code, 1);
    assert.match(result.out, /sha256 mismatch/);
  });

  it("rejects an index whose set hash does not match its files", async () => {
    const index = JSON.parse(lockBytes.toString("utf8"));
    index.files[0].size += 1;
    routes = new Map([["/index.json", Buffer.from(JSON.stringify(index))]]);
    const result = await run("sync");
    assert.equal(result.code, 1);
    assert.match(result.out, /set hash does not match/);
  });

  it("rejects a path outside src/generated", async () => {
    const index = JSON.parse(lockBytes.toString("utf8"));
    index.files.push({ path: "../package.json", sha256: "0".repeat(64), size: 1 });
    routes = new Map([["/index.json", Buffer.from(JSON.stringify(index))]]);
    const result = await run("sync");
    assert.equal(result.code, 1);
    assert.match(result.out, /path outside src\/generated/);
  });

  it("changes nothing when a file of a new set is missing", async () => {
    const index = JSON.parse(lockBytes.toString("utf8"));
    const changed = Buffer.from("export {};\n");
    index.files[0] = { path: index.files[0].path, sha256: createHash("sha256").update(changed).digest("hex"), size: changed.length };
    const list = index.files.map((f: { path: string; sha256: string; size: number }) => ({ path: f.path, sha256: f.sha256, size: f.size }));
    index.set = `sha256:${createHash("sha256").update(JSON.stringify(list)).digest("hex")}`;
    routes = new Map([["/index.json", Buffer.from(JSON.stringify(index))]]);
    const result = await run("sync");
    assert.equal(result.code, 1);
    assert.match(result.out, new RegExp(`${index.files[0].path}: HTTP 404`));
    assert.equal((await run("check")).code, 0);
  });
});
