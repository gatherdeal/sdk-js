import assert from "node:assert/strict";
import { it } from "node:test";
import { contactsCreate } from "../../src/generated/crm/v1/operations.js";
import { agentsPairingGet, broadcastsRecipientsRemove, broadcastsStart, chatsMessagesList } from "../../src/generated/whatsapp/v1/operations.js";
import { reply } from "../helpers.js";
import { setup } from "./fixtures.js";

it("encodes a parent path, an item path and a positional command", async () => {
  const f = setup(0, [reply(200, { pairing: {} }), new Response(null, { status: 204 }), reply(200, { broadcast: {} })]);
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
    await assert.rejects(f.method(contactsCreate)({ kind: "personal", name: "Test" }, { idempotencyKey: key }), /idempotencyKey must be/);
  }
  assert.equal(f.calls.length, 0);
});

it("rejects a descriptor that does not name a continuation flag before fetching", async () => {
  const f = setup(2, []);
  const incomplete = {
    ...chatsMessagesList,
    result: {
      ...chatsMessagesList.result,
      pagination: { ...chatsMessagesList.result.pagination, hasNextPageField: "" },
    },
  };
  await assert.rejects(f.method(incomplete)({ chat_id: "c1" }), /pagination metadata/);
  assert.equal(f.calls.length, 0);
});
