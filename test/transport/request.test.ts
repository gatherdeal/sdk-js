import assert from "node:assert/strict";
import { it } from "node:test";
import { agentsPairingGet, broadcastsRecipientsRemove, broadcastsStart, itemsCreate } from "../fixtures/operations/operations.js";
import { reply } from "../helpers.js";
import { setup } from "./fixtures.js";

it("encodes a parent path, an item path and a positional command", async () => {
  const f = setup(0, [reply(200, { item: {} }), new Response(null, { status: 204 }), new Response(null, { status: 204 })]);
  await f.method(agentsPairingGet)({ agent_id: "a/1" });
  await f.method(broadcastsRecipientsRemove)("r/1", { broadcast_id: "b/1" });
  await f.method(broadcastsStart)("b/1");
  assert.deepEqual(f.calls.map(({ url }) => new URL(url).pathname), [
    "/v1/agents/a%2F1/pairing", "/v1/broadcasts/b%2F1/recipients/r%2F1", "/v1/broadcasts/b%2F1/start",
  ]);
  assert.equal(f.calls.length, 3);
});

it("refuses empty or dot-segment paths and malformed idempotency keys before sending", async () => {
  const f = setup(0, []);
  for (const id of ["", ".", ".."]) await assert.rejects(f.method(broadcastsStart)(id), /must not be empty/);
  for (const key of ["", "a b", "ключ", "x".repeat(256)]) {
    await assert.rejects(f.method(itemsCreate)({ content: { kind: "text", text: "item" } }, { idempotencyKey: key }), /idempotencyKey must be/);
  }
  assert.equal(f.calls.length, 0);
});
