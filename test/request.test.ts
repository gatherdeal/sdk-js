import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { createClient, type Operation } from "../src/index.js";
import * as crm from "../src/generated/crm/v1/index.js";
import * as identity from "../src/generated/identity/v1/index.js";
import * as whatsapp from "../src/generated/whatsapp/v1/index.js";
import { serializeRequest } from "../src/request.js";
import { fakeFetch, json } from "./helpers.js";

function decodeBase64Url(text: string): string {
  const b64 = text.replace(/-/g, "+").replace(/_/g, "/");
  return new TextDecoder().decode(Uint8Array.from(atob(b64), (c) => c.charCodeAt(0)));
}

function client(fetch: typeof globalThis.fetch) {
  return createClient({ apiKey: "key_test", fetch, retries: 0 });
}

const ok = { status: "success", contacts: { data: [], has_next_page: false, has_prev_page: false, page_size: 20 } };

describe("request serialization", () => {
  it("keeps the service prefix and writes scalar query values", async () => {
    const f = fakeFetch(json(200, ok));
    await client(f.fetch).crm.contacts.list({ q: "tan", count: 20, outlet_id: "o1" });
    const url = new URL(f.calls[0]!.url);
    assert.equal(url.origin + url.pathname, "https://api.gatherdeal.ai/crm/v1/contacts");
    assert.equal(url.searchParams.get("q"), "tan");
    assert.equal(url.searchParams.get("count"), "20");
    assert.equal(url.searchParams.get("outlet_id"), "o1");
    assert.equal(f.calls[0]!.init.method, "GET");
    assert.equal(f.calls[0]!.body, undefined);
  });

  it("repeats array query parameters", async () => {
    const f = fakeFetch(json(200, ok));
    await client(f.fetch).crm.contacts.list({ id: ["a", "b"], tag_id: ["t1"] });
    const url = new URL(f.calls[0]!.url);
    assert.deepEqual(url.searchParams.getAll("id"), ["a", "b"]);
    assert.deepEqual(url.searchParams.getAll("tag_id"), ["t1"]);
  });

  it("encodes filters as unpadded base64url JSON, Unicode included", async () => {
    const f = fakeFetch(json(200, ok));
    const filter = { rules: [{ field: "name", op: "EQ" as const, value: "陈 Tân ✓" }] };
    await client(f.fetch).crm.contacts.list({ filter });
    const raw = new URL(f.calls[0]!.url).searchParams.get("filter")!;
    assert.match(raw, /^[A-Za-z0-9_-]+$/);
    assert.deepEqual(JSON.parse(decodeBase64Url(raw)), filter);
  });

  it("writes JSON-encoded parameters as compact JSON text", () => {
    const op: Operation<unknown, unknown, string> = {
      id: "x.items.list",
      method: "GET",
      path: "/v1/items",
      parameters: [{ member: "meta", name: "meta", in: "query", required: false, encoding: "json" }],
      success: { status: 200, body: "json", required: [] },
      body: "none",
      idempotency: "safe",
      authentication: "required",
      organizationKeys: true,
      errors: [],
    };
    const req = serializeRequest(op, { meta: { a: 1, b: "é" } }, "https://example.test/x");
    assert.equal(new URL(req.url).searchParams.get("meta"), '{"a":1,"b":"é"}');
  });

  it("writes booleans and numbers as JSON text and omits null parameters", async () => {
    const f = fakeFetch(json(200, { status: "success", outlets: { data: [], has_next_page: false, has_prev_page: false, page_size: 20 } }));
    await createClient({ fetch: f.fetch }).identity.outlets.list({ with_owner: true, count: 5, filter: null });
    const url = new URL(f.calls[0]!.url);
    assert.equal(url.searchParams.get("with_owner"), "true");
    assert.equal(url.searchParams.get("count"), "5");
    assert.equal(url.searchParams.has("filter"), false);
  });

  it("escapes path parameters and sends If-Match and the JSON body", async () => {
    const f = fakeFetch(json(200, { status: "success", revision: "r2" }));
    await client(f.fetch).crm.deals.update({ id: "a/b c", if_match: "r1", remark: "hi", outlet_id: "o1" });
    const call = f.calls[0]!;
    assert.equal(call.url, "https://api.gatherdeal.ai/crm/v1/deals/a%2Fb%20c/fields?outlet_id=o1");
    assert.equal(call.init.method, "PATCH");
    assert.equal(call.headers.get("If-Match"), "r1");
    assert.equal(call.headers.get("Content-Type"), "application/json");
    assert.deepEqual(JSON.parse(call.body!), { remark: "hi" });
  });

  it("rejects a missing required parameter before any request", async () => {
    const f = fakeFetch();
    await assert.rejects(
      client(f.fetch).crm.deals.get({} as { id: string }),
      /crm\.deals\.get: id is required/,
    );
    assert.equal(f.calls.length, 0);
  });

  it("rejects unknown members of a body-less operation", async () => {
    const f = fakeFetch();
    await assert.rejects(
      client(f.fetch).crm.contacts.list({ nope: 1 } as never),
      /unknown input member nope/,
    );
  });

  it("rejects an object for a scalar parameter", async () => {
    await assert.rejects(
      client(fakeFetch().fetch).crm.contacts.list({ q: {} as unknown as string }),
      /q must be a string, number or boolean/,
    );
  });

  it("sends a bearer token, Accept, credentials omit and manual redirects", async () => {
    const f = fakeFetch(json(200, ok));
    await client(f.fetch).crm.contacts.list();
    const call = f.calls[0]!;
    assert.equal(call.headers.get("Authorization"), "Bearer key_test");
    assert.equal(call.headers.get("Accept"), "application/json, application/problem+json");
    assert.equal(call.init.credentials, "omit");
    assert.equal(call.init.redirect, "manual");
  });

  it("sends an Idempotency-Key on every keyed operation and none elsewhere", async () => {
    const trees = [crm.operations, identity.operations, whatsapp.operations];
    const ops: Operation<unknown, unknown, string>[] = [];
    const walk = (tree: object) => {
      for (const v of Object.values(tree)) {
        if (typeof (v as { id?: unknown }).id === "string") ops.push(v as Operation<unknown, unknown, string>);
        else walk(v as object);
      }
    };
    trees.forEach(walk);
    assert.ok(ops.length >= 50);
    let keyed = 0;
    for (const op of ops) {
      const input: Record<string, unknown> = {};
      for (const p of op.parameters) if (p.required) input[p.member] = p.encoding === "repeated" ? ["x"] : "x";
      const req = serializeRequest(op, input, "https://example.test/s");
      assert.equal("Idempotency-Key" in req.headers, false, op.id);
      if (op.idempotency !== "keyed") continue;
      keyed++;
      const f = fakeFetch(new Response(null, { status: op.success.status }));
      const c = createClient({ fetch: f.fetch, retries: 0 });
      const [service, ...path] = op.id.split(".");
      let method: unknown = c[service as keyof typeof c];
      const camel = (s: string) => s.replace(/_([a-z])/g, (_, ch: string) => ch.toUpperCase());
      for (const segment of path) method = (method as Record<string, unknown>)[camel(segment)];
      await (method as (i: unknown) => Promise<unknown>)(input).catch(() => undefined);
      assert.match(f.calls[0]!.headers.get("Idempotency-Key") ?? "", /^[0-9a-f-]{36}$/, op.id);
    }
    assert.ok(keyed > 0);
  });

  it("uses the caller's Idempotency-Key and refuses one on a non-keyed operation", async () => {
    const f = fakeFetch(json(200, { status: "success", id: "c1" }));
    await client(f.fetch).crm.contacts.create({ name: "Tan" } as never, { idempotencyKey: "my-key" });
    assert.equal(f.calls[0]!.headers.get("Idempotency-Key"), "my-key");
    await assert.rejects(
      client(fakeFetch().fetch).crm.contacts.list({}, { idempotencyKey: "k" }),
      /idempotencyKey applies to keyed writes only/,
    );
  });

  it("uses a base URL override per service", async () => {
    const f = fakeFetch(json(200, ok), json(200, ok));
    await createClient({ apiKey: "k", fetch: f.fetch, baseUrl: { crm: "https://gw.example.test/crm/" } }).crm.contacts.list();
    assert.equal(f.calls[0]!.url, "https://gw.example.test/crm/v1/contacts");
    const local = createClient({ apiKey: "k", fetch: f.fetch, baseUrl: { crm: "http://localhost:5005" }, allowLoopbackHttp: true });
    await local.crm.contacts.list();
    assert.equal(f.calls[1]!.url, "http://localhost:5005/v1/contacts");
  });

  it("refuses unsafe base URLs at construction", () => {
    const bad: [Record<string, string>, boolean, RegExp][] = [
      [{ crm: "http://api.example.test/crm" }, false, /must use https/],
      [{ crm: "http://api.example.test/crm" }, true, /must use https/],
      [{ crm: "http://127.0.0.1:5005" }, false, /must use https/],
      [{ crm: "/crm" }, false, /absolute URL/],
      [{ crm: "crm.example.test" }, false, /must use https|absolute URL/],
      [{ crm: "https://user:pw@api.example.test" }, false, /credentials, a query or a fragment/],
      [{ crm: "https://api.example.test/crm?x=1" }, false, /credentials, a query or a fragment/],
      [{ billing: "https://api.example.test" }, false, /unknown service/],
    ];
    for (const [baseUrl, allowLoopbackHttp, message] of bad) {
      assert.throws(() => createClient({ apiKey: "k", baseUrl, allowLoopbackHttp }), message, JSON.stringify(baseUrl));
    }
    assert.ok(createClient({ baseUrl: { crm: "http://[::1]:5005" }, allowLoopbackHttp: true }));
  });

  it("rejects empty and dot-segment path values", async () => {
    for (const id of ["", ".", ".."]) {
      await assert.rejects(client(fakeFetch().fetch).crm.contacts.get({ id }), /must not be empty, "\." or "\.\."/);
      await assert.rejects(
        client(fakeFetch().fetch).crm.deals.update({ id, if_match: "r" }),
        /must not be empty/,
      );
    }
  });

  it("rejects idempotency keys that would change on the wire", async () => {
    for (const key of ["", " k", "k ", "a b", "ключ", "x".repeat(256)]) {
      const f = fakeFetch();
      await assert.rejects(
        client(f.fetch).crm.contacts.create({ name: "Tan" } as never, { idempotencyKey: key }),
        /idempotencyKey must be/,
      );
      assert.equal(f.calls.length, 0);
    }
  });
});
