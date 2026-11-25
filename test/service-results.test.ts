import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { InvalidResponseError, createClient } from "../src/index.js";
import type { AgentDeletion, ChatMessageFeedListResponse, MessageTemplatePreviewResponse } from "../src/whatsapp.js";
import { fakeFetch, rejection, reply } from "./helpers.js";

const recipient = { to: "+12025550126" };

for (const maxRetries of [0, 2]) {
  describe(`CRM and WhatsApp results with maxRetries=${maxRetries}`, () => {
    function setup(...responses: Response[]) {
      const f = fakeFetch(...responses);
      return { client: createClient({ fetch: f.fetch, retries: maxRetries, token: () => "token" }), calls: f.calls };
    }

    it("unwraps an accepted agent deletion", async () => {
      const deletion: AgentDeletion = {
        agent_id: "a1", requested_at: "2026-01-01T00:00:00Z", status: "deleting",
      };
      const { client, calls } = setup(reply(202, { deletion }));
      const { data, response } = await client.whatsapp.agents.delete("a1").withResponse();
      assert.deepEqual(data, deletion);
      assert.equal(response.status, 202);
      assert.equal(calls[0]?.init.method, "DELETE");
      assert.equal(calls.length, 1);
    });

    it("returns void and reconstructs a bodyless 204 from a CRM contact update", async () => {
      const { client, calls } = setup(new Response(null, { status: 204 }));
      const { data, response } = await client.crm.contacts.update("c1", { name: "Updated" }).withResponse();
      assert.equal(data, undefined);
      assert.equal(response.status, 204);
      assert.equal(response.body, null);
      assert.equal(calls.length, 1);
    });

    it("keeps a CRM contact ID receipt", async () => {
      const { client, calls } = setup(reply(201, { id: "c1" }));
      assert.deepEqual(await client.crm.contacts.create({ kind: "personal", name: "Tan" }), { id: "c1" });
      assert.ok(calls[0]?.headers.get("Idempotency-Key"));
      assert.equal(calls.length, 1);
    });

    it("keeps a CRM deal revision receipt", async () => {
      const { client, calls } = setup(reply(200, { revision: '"r2"' }));
      assert.deepEqual(await client.crm.deals.update("d1", { remark: "Updated" }, { ifMatch: '"r1"' }), { revision: '"r2"' });
      assert.equal(calls[0]?.headers.get("If-Match"), '"r1"');
      assert.equal(calls.length, 1);
    });

    it("keeps broadcast recipient counts and serializes the parent ID separately", async () => {
      const counts = { added: 1, duplicates: 0 };
      const { client, calls } = setup(reply(200, counts));
      assert.deepEqual(await client.whatsapp.broadcasts.recipients.add({
        broadcast_id: "b/1", recipients: [recipient],
      }, { idempotencyKey: "add-b1" }), counts);
      assert.equal(new URL(calls[0]!.url).pathname, "/whatsapp/v1/broadcasts/b%2F1/recipients");
      assert.deepEqual(JSON.parse(calls[0]!.body!), { recipients: [recipient] });
      assert.equal(calls[0]?.headers.get("Idempotency-Key"), "add-b1");
      assert.equal(calls.length, 1);
    });

    it("keeps template preview variants in their receipt", async () => {
      const result: MessageTemplatePreviewResponse = {
        variants: [{ variant_id: "v1", text: "Hi", is_enabled: true, is_too_long: false, length: 2 }],
      };
      const { client, calls } = setup(reply(200, result));
      assert.deepEqual(await client.whatsapp.messageTemplates.preview("t1", { params: {} }), result);
      assert.equal(calls.length, 1);
    });

    it("keeps the chat message watermark and allows polling with the returned revision", async () => {
      const result: ChatMessageFeedListResponse = {
        after_rev: 42, has_more: true, messages: [{ id: "m1", rev: 42, merged_into_id: "m2" }],
      };
      const terminal: ChatMessageFeedListResponse = { after_rev: 42, has_more: false, messages: [] };
      const { client, calls } = setup(reply(200, result), reply(200, terminal));
      const feed = await client.whatsapp.chatMessages.list({ after_rev: 41, limit: 1 });
      assert.deepEqual(feed, result);
      assert.equal(calls.length, 1);
      assert.deepEqual(await client.whatsapp.chatMessages.list({ after_rev: feed.after_rev, limit: 1 }), terminal);
      assert.deepEqual(calls.map(({ url }) => new URL(url).searchParams.get("after_rev")), ["41", "42"]);
      assert.equal(calls.length, 2);
    });

    it("paginates messages within a chat", async () => {
      const messages = (id: string, fields: object = {}) => reply(200, {
        messages: { data: [{ id, rev: 1 }], has_next_page: false, has_prev_page: false, page_size: 1, ...fields },
      });
      const { client, calls } = setup(messages("m1", { has_next_page: true, next_cursor: "n1" }), messages("m2"));
      const ids: string[] = [];
      for await (const message of client.whatsapp.chats.messages.list({ chat_id: "c/1", limit: 1 })) ids.push(message.id);
      assert.deepEqual(ids, ["m1", "m2"]);
      const next = new URL(calls[1]!.url);
      assert.equal(next.pathname, "/whatsapp/v1/chats/c%2F1/messages");
      assert.equal(next.searchParams.get("after"), "n1");
      assert.equal(calls.length, 2);
    });

    it("rejects a 200 success envelope without the required counts receipt", async () => {
      const { client, calls } = setup(reply(200, {}));
      const error = await rejection(client.whatsapp.broadcasts.recipients.add({ broadcast_id: "b1", recipients: [recipient] }));
      assert.ok(error instanceof InvalidResponseError);
      assert.match(error.message, /lacks "added"/);
      assert.equal(calls.length, 1);
    });
  });
}
