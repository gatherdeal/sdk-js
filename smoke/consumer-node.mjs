// Exercises both loaders in the same process, beginning with require().
import assert from "node:assert/strict";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
for (const entry of ["", "/crm", "/identity", "/whatsapp", "/internal"]) {
  const name = `@gatherdeal/sdk${entry}`;
  const cjs = require(name);
  const esm = await import(name);
  assert.deepEqual(Object.keys(cjs).sort(), Object.keys(esm).sort(), `${name} export names`);
  for (const [key, value] of Object.entries(esm)) {
    assert.strictEqual(cjs[key], value, `${name} ${key} export identity`);
  }
}

const first = await import("@gatherdeal/sdk");
const second = createRequire(process.argv[2])("@gatherdeal/sdk");
assert.notStrictEqual(first.GatherDeal, second.GatherDeal, "a separate installed copy was loaded");
const client = new second.GatherDeal({
  apiKey: null,
  fetch: async () => new Response(null, { status: 404 }),
});
await assert.rejects(client.identity.outlets.get("missing"), (error) => {
  assert.ok(error instanceof second.NotFoundError);
  assert.ok(!(error instanceof first.NotFoundError));
  assert.ok(first.isAPIError(error));
  return true;
});
console.log("node: CommonJS and ESM share exports, and isAPIError recognizes errors from a separate install");
