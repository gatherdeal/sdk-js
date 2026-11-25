import assert from "node:assert/strict";
import { it } from "node:test";
import { GatherDeal } from "../src/index.js";
import { fakeFetch, reply } from "./helpers.js";

it("serializes scalar, repeated and structured query values", async () => {
  const f = fakeFetch(reply(200, { outlets: { data: [], has_next_page: false, has_prev_page: false, page_size: 20 } }));
  const filter = { rules: [{ field: "name", op: "EQ" as const, value: "陈" }] };
  await new GatherDeal({ apiKey: null, fetch: f.fetch }).identity.outlets.list({ id: ["o1", "o2"], is_master: false, limit: 5, filter });
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
