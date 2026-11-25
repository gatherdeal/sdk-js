import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { InvalidResponseError, createClient } from "../src/index.js";
import { fakeFetch, rejection, reply } from "./helpers.js";

function page(ids: string[], fields: object = {}) {
  return reply(200, { outlets: { data: ids.map((id) => ({ id })), has_next_page: false, has_prev_page: false, page_size: 20, ...fields } });
}

async function collect<T>(items: AsyncIterable<T>): Promise<T[]> {
  const values: T[] = [];
  for await (const item of items) values.push(item);
  return values;
}

for (const maxRetries of [0, 2]) {
  describe(`result kinds with maxRetries=${maxRetries}`, () => {
    it("unwraps an outlet resource and shares one execution across response views", async () => {
      const outlet = { id: "o/1" };
      const body = { status: "success", outlet };
      const f = fakeFetch(Response.json(body, { headers: { "X-Correlation-Id": "req-1" }, statusText: "Custom" }));
      const call = createClient({ fetch: f.fetch }).identity.outlets.get("o/1", undefined, { maxRetries });
      const [resource, withResponse, raw] = await Promise.all([call, call.withResponse(), call.asResponse()]);
      assert.deepEqual(resource, outlet);
      assert.equal(resource, withResponse.data);
      assert.equal(withResponse.requestID, "req-1");
      assert.equal(raw.headers.get("X-Correlation-Id"), "req-1");
      assert.equal(raw.statusText, "Custom");
      assert.deepEqual(await raw.json(), body);
      assert.deepEqual(await withResponse.response.json(), body);
      assert.deepEqual(await (await call.asResponse()).json(), body);
      assert.equal(f.calls[0]?.url, "https://api.gatherdeal.ai/identity/v1/outlets/o%2F1");
      assert.equal(f.calls.length, 1);
    });

    it("rejects an unexpected success status or envelope marker", async () => {
      for (const response of [reply(202, { outlet: {} }), Response.json({ status: "error", outlet: {} })]) {
        const f = fakeFetch(response);
        assert.ok(await rejection(createClient({ fetch: f.fetch }).identity.outlets.get("o1", undefined, { maxRetries })) instanceof InvalidResponseError);
        assert.equal(f.calls.length, 1);
      }
    });
  });

  describe(`pagination with maxRetries=${maxRetries}`, () => {
    it("stops at a terminal page and shares the first fetch with await, response views and iteration", async () => {
      const f = fakeFetch(page(["o1"]));
      const pending = createClient({ fetch: f.fetch }).identity.outlets.list(undefined, { maxRetries });
      const [first, raw, withResponse, items] = await Promise.all([pending, pending.asResponse(), pending.withResponse(), collect(pending)]);
      assert.deepEqual(items, [{ id: "o1" }]);
      assert.equal(first.hasNextPage(), false);
      assert.equal(first, withResponse.data);
      assert.equal(raw.status, 200);
      assert.deepEqual(await collect(first.iterPages()), [first]);
      await assert.rejects(first.getNextPage(), /no next page/);
      assert.equal(f.calls.length, 1);
    });

    it("continues from implicit numbered page one and shares getNextPage with iteration", async () => {
      const f = fakeFetch(page(["o1"], { has_next_page: true, page: 1 }), page(["o2"], { page: 2 }));
      const pending = createClient({ fetch: f.fetch }).identity.outlets.list({ q: "Tan" }, { maxRetries });
      const first = await pending;
      assert.equal(f.calls.length, 1);
      const [second, pages] = await Promise.all([first.getNextPage(), collect(first.iterPages())]);
      assert.deepEqual(pages, [first, second]);
      assert.deepEqual(await collect(pending), [{ id: "o1" }, { id: "o2" }]);
      assert.equal(new URL(f.calls[0]!.url).searchParams.has("page"), false);
      assert.equal(new URL(f.calls[1]!.url).searchParams.get("page"), "2");
      assert.equal(new URL(f.calls[1]!.url).searchParams.get("q"), "Tan");
      assert.equal(f.calls.length, 2);
    });

    for (const params of [{ page: 3 }, { before: "prior" }]) {
      it(`follows a cursor and drops the ${Object.keys(params)[0]} selector`, async () => {
        const f = fakeFetch(page(["o1"], { has_next_page: true, next_cursor: "resume" }), page(["o2"]));
        const call = createClient({ fetch: f.fetch }).identity.outlets.list({ ...params, limit: 10, sort: "name" }, { maxRetries });
        assert.deepEqual(await collect(call), [{ id: "o1" }, { id: "o2" }]);
        assert.deepEqual(Object.fromEntries(new URL(f.calls[1]!.url).searchParams), { limit: "10", sort: "name", after: "resume" });
        assert.equal(f.calls.length, 2);
      });
    }

    it("rejects a repeated resume cursor from the initial selector", async () => {
      const f = fakeFetch(page(["o1"], { has_next_page: true, next_cursor: "same" }));
      const call = createClient({ fetch: f.fetch }).identity.outlets.list({ after: "same" }, { maxRetries });
      const error = await rejection(call);
      assert.ok(error instanceof InvalidResponseError);
      assert.match(error.message, /repeated next cursor/);
      assert.equal(f.calls.length, 1);
    });

    it("carries the seen cursor set into getNextPage", async () => {
      const f = fakeFetch(page(["o1"], { has_next_page: true, next_cursor: "new" }), page(["o2"], { has_next_page: true, next_cursor: "old" }));
      const first = await createClient({ fetch: f.fetch }).identity.outlets.list({ after: "old" }, { maxRetries });
      assert.equal(f.calls.length, 1);
      const error = await rejection(first.getNextPage());
      assert.ok(error instanceof InvalidResponseError);
      assert.match(error.message, /repeated next cursor/);
      assert.equal(f.calls.length, 2);
    });

    it("rejects a missing cursor in cursor mode, even if a page number was sent back", async () => {
      const f = fakeFetch(page(["o1"], { has_next_page: true, page: 2 }));
      const error = await rejection(createClient({ fetch: f.fetch }).identity.outlets.list({ after: "old" }, { maxRetries }));
      assert.ok(error instanceof InvalidResponseError);
      assert.match(error.message, /missing a cursor/);
      assert.equal(f.calls.length, 1);
    });

    it("rejects missing item arrays and non-boolean continuation flags", async () => {
      for (const body of [{ has_next_page: false }, { data: [], has_next_page: "false" }]) {
        const f = fakeFetch(reply(200, { outlets: body }));
        assert.ok(await rejection(createClient({ fetch: f.fetch }).identity.outlets.list(undefined, { maxRetries })) instanceof InvalidResponseError);
        assert.equal(f.calls.length, 1);
      }
    });


  });
}
