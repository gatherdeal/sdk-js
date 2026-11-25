import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { InvalidResponseError } from "../../src/index.js";
import type { APIPromise, Operation, RequestOptions } from "../../src/generated/operation.js";
import { broadcastsRecipientsRemove, chatsMessagesList, itemsCreate } from "../fixtures/operations/operations.js";
import { rejection, reply } from "../helpers.js";
import { receipt, receiptDescriptor, setup, update } from "./fixtures.js";

const acceptedDeletion: Operation<[params?: undefined, options?: RequestOptions], APIPromise<{ id: string }>> = {
  ...receiptDescriptor(["deletion"], 202),
  id: "test.items.delete", method: "DELETE", result: { kind: "resource", key: "deletion" },
};

for (const maxRetries of [0, 2]) {
  describe(`descriptor results with maxRetries=${maxRetries}`, () => {
    it("unwraps a 202 deletion resource", async () => {
      const deletion = { id: "d1" };
      const f = setup(maxRetries, [reply(202, { deletion })]);
      assert.deepEqual(await f.method(acceptedDeletion)(), deletion);
      assert.equal(f.calls.length, 1);
    });

    it("returns void and reconstructs a bodyless 204", async () => {
      const f = setup(maxRetries, [new Response(null, { status: 204 })]);
      const call = f.method(broadcastsRecipientsRemove)("r1", { broadcast_id: "b1" });
      const { data, response } = await call.withResponse();
      assert.equal(data, undefined);
      assert.equal(response.status, 204);
      assert.equal(response.body, null);
      assert.equal(f.calls[0]?.url, "https://example.test/v1/broadcasts/b1/recipients/r1");
      assert.equal(f.calls.length, 1);
    });

    it("keeps an id receipt", async () => {
      const f = setup(maxRetries, [reply(201, { id: "i1" })]);
      assert.deepEqual(await f.method(itemsCreate)({ content: { kind: "text", text: "Item" } }), { id: "i1" });
      assert.equal(f.calls.length, 1);
    });

    it("keeps a revision receipt", async () => {
      const f = setup(maxRetries, [reply(200, { revision: '"r2"' })]);
      assert.deepEqual(await f.method(update)("d1", undefined, { ifMatch: '"r1"' }), { revision: '"r2"' });
      assert.equal(f.calls[0]?.headers.get("If-Match"), '"r1"');
      assert.equal(f.calls.length, 1);
    });

    const objects = [
      { label: "counts", value: { created: 5, removed: 2 } },
      { label: "variants", value: { variants: [{ id: "v1" }] } },
      { label: "feed", value: { data: [{ id: "a1" }], watermark: "w1", has_more: true } },
    ] as const;
    for (const { label, value } of objects) {
      it(`keeps the ${label} as an object`, async () => {
        const f = setup(maxRetries, [reply(200, value)]);
        assert.deepEqual(await f.method(receipt<typeof value>(Object.keys(value)))(), value);
        assert.equal(f.calls.length, 1);
      });
    }

    it("rejects a success envelope without its receipt", async () => {
      const f = setup(maxRetries, [reply(200, {})]);
      const error = await rejection(f.method(receipt<{ id: string }>(["id"]))());
      assert.ok(error instanceof InvalidResponseError);
      assert.match(error.message, /lacks "id"/);
      assert.equal(f.calls.length, 1);
    });

    it("rejects a descriptor that does not name a continuation flag before fetching", async () => {
      const f = setup(maxRetries, []);
      await assert.rejects(f.method(chatsMessagesList)({ chat_id: "c1" }), /pagination metadata/);
      assert.equal(f.calls.length, 0);
    });
  });
}
