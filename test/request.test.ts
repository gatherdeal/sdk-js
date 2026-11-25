import assert from "node:assert/strict";
import { it } from "node:test";
import { createClient } from "../src/index.js";
import { fakeFetch, reply } from "./helpers.js";

it("serializes scalar, repeated and structured query values", async () => {
  const f = fakeFetch(reply(200, { outlets: { data: [], has_next_page: false, has_prev_page: false, page_size: 20 } }));
  const filter = { rules: [{ field: "name", op: "EQ" as const, value: "陈" }] };
  await createClient({ fetch: f.fetch }).identity.outlets.list({ id: ["o1", "o2"], is_master: false, limit: 5, filter });
  const request = f.calls[0]!;
  const query = new URL(request.url).searchParams;
  assert.deepEqual(query.getAll("id"), ["o1", "o2"]);
  assert.equal(query.get("is_master"), "false");
  assert.equal(query.get("limit"), "5");
  assert.deepEqual(JSON.parse(Buffer.from(query.get("filter")!, "base64url").toString()), filter);
  assert.equal(request.headers.has("Authorization"), false);
  assert.equal(request.init.credentials, "omit");
  assert.equal(f.calls.length, 1);
});

it("preserves client credential and base URL validation", async () => {
  assert.throws(() => createClient({ apiKey: "k", token: () => "t" }), /not both/);
  assert.throws(() => createClient({ apiKey: "a b" }), /apiKey must be/);
  assert.throws(() => createClient({ baseUrl: { identity: "http://example.test/" } }), /must use https/);
  assert.throws(() => createClient({ baseUrl: { identity: "https://user:pass@example.test/" } }), /must not carry credentials/);
  const f = fakeFetch(reply(200, { outlet: {} }));
  const client = createClient({ fetch: f.fetch, apiKey: "k", allowLoopbackHttp: true, baseUrl: { identity: "http://127.0.0.1:5000/" } });
  await client.identity.outlets.get("o1");
  assert.equal(f.calls[0]?.headers.get("Authorization"), "Bearer k");
  assert.equal(f.calls[0]?.url, "http://127.0.0.1:5000/v1/outlets/o1");
  assert.equal(f.calls.length, 1);
});
