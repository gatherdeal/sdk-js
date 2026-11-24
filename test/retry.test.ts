import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  ApiError,
  ConnectionError,
  TimeoutError,
  createClient,
  type ClientOptions,
} from "../src/index.js";
import { fakeFetch, json, problem, rejection, type Reply } from "./helpers.js";

const listOk = () =>
  json(200, { status: "success", contacts: { data: [], has_next_page: false, has_prev_page: false, page_size: 20 } });
const createOk = () => json(200, { status: "success", id: "c1" });
const templateOk = () => json(200, { status: "success" });
const unavailable = (retryAfterMs = 0) => problem(503, "UNAVAILABLE", { retryable: true, retry_after_ms: retryAfterMs });
const unauthorized = () => problem(401, "UNAUTHORIZED");
const networkError = () => new TypeError("fetch failed");

function setup(replies: Reply[], options: ClientOptions = {}) {
  const f = fakeFetch(...replies);
  const client = createClient({ fetch: f.fetch, ...(options.token === undefined ? { apiKey: "k" } : {}), ...options });
  return { f, client };
}

function tokens() {
  let n = 0;
  const calls: number[] = [];
  return {
    calls,
    token: async () => {
      n++;
      calls.push(n);
      return `t${n}`;
    },
  };
}

const createInput = { name: "Tan" } as never;
const templateInput = { name: "hello" } as never;

describe("retries", () => {
  it("retries a safe operation after a retryable problem, honouring retry_after_ms", async () => {
    const { f, client } = setup([unavailable(), listOk()]);
    await client.crm.contacts.list();
    assert.equal(f.calls.length, 2);
    assert.equal(f.calls[0]!.url, f.calls[1]!.url);
  });

  it("retries a keyed write with the same key and identical bytes", async () => {
    const { f, client } = setup([networkError(), unavailable(), createOk()]);
    await client.crm.contacts.create(createInput);
    assert.equal(f.calls.length, 3);
    const key = f.calls[0]!.headers.get("Idempotency-Key");
    assert.ok(key);
    for (const call of f.calls) {
      assert.equal(call.headers.get("Idempotency-Key"), key);
      assert.equal(call.body, f.calls[0]!.body);
      assert.equal(call.url, f.calls[0]!.url);
    }
  });

  it("never retries an operation without replay protection", async () => {
    const { f, client } = setup([networkError()]);
    const error = await rejection(client.whatsapp.messageTemplates.create(templateInput));
    assert.ok(error instanceof ConnectionError);
    assert.equal(f.calls.length, 1);
  });

  it("never retries a problem marked non-retryable", async () => {
    const { f, client } = setup([problem(503, "INTERNAL_ERROR", { retryable: false })]);
    const error = await rejection(client.crm.contacts.list());
    assert.ok(error instanceof ApiError);
    assert.equal(f.calls.length, 1);
  });

  it("retries gateway status errors on safe operations", async () => {
    const { f, client } = setup([new Response("bad gateway", { status: 502 }), listOk()]);
    await client.crm.contacts.list();
    assert.equal(f.calls.length, 2);
  });

  it("stops when the attempt budget is spent and throws the last error", async () => {
    const { f, client } = setup([unavailable(), unavailable(), unavailable()], { retries: 2 });
    const error = await rejection(client.crm.contacts.list());
    assert.ok(error instanceof ApiError && error.code === "UNAVAILABLE");
    assert.equal(f.calls.length, 3);
  });

  it("lets per-call retries override the client", async () => {
    const { f, client } = setup([unavailable(), listOk()], { retries: 0 });
    await client.crm.contacts.list({}, { retries: 1 });
    assert.equal(f.calls.length, 2);
  });

  it("throws instead of waiting for a Retry-After beyond a minute", async () => {
    const { f, client } = setup([unavailable(120_000)]);
    const error = await rejection(client.crm.contacts.list());
    assert.ok(error instanceof ApiError && error.retryAfterMs === 120_000);
    assert.equal(f.calls.length, 1);
  });

  it("reads Retry-After from the header of a status error", async () => {
    const { f, client } = setup([new Response("", { status: 429, headers: { "Retry-After": "0" } }), listOk()]);
    await client.crm.contacts.list();
    assert.equal(f.calls.length, 2);
  });

  it("times out an attempt and retries it", async () => {
    const hang: Reply = (call) =>
      new Promise((_, reject) => call.init.signal!.addEventListener("abort", () => reject(new Error("aborted"))));
    const { f, client } = setup([hang, listOk()], { timeoutMs: 20 });
    await client.crm.contacts.list();
    assert.equal(f.calls.length, 2);
    const { client: once } = setup([hang], { timeoutMs: 20, retries: 0 });
    assert.ok((await rejection(once.crm.contacts.list())) instanceof TimeoutError);
  });

  it("rethrows a caller abort as is, without retrying", async () => {
    const controller = new AbortController();
    const reason = new Error("stop");
    const hang: Reply = (call) =>
      new Promise((_, reject) => call.init.signal!.addEventListener("abort", () => reject(new Error("aborted"))));
    const { f, client } = setup([hang]);
    const pending = client.crm.contacts.list({}, { signal: controller.signal });
    controller.abort(reason);
    assert.equal(await rejection(pending), reason);
    assert.equal(f.calls.length, 1);
  });

  it("carries the idempotency key on thrown errors", async () => {
    const { client } = setup([problem(409, "IDEMPOTENCY_KEY_CONFLICT")]);
    const error = await rejection(client.crm.contacts.create(createInput, { idempotencyKey: "k-1" }));
    assert.ok(error instanceof ApiError);
    assert.equal(error.idempotencyKey, "k-1");
    assert.equal(error.operation, "crm.contacts.create");
  });
});

describe("token refresh", () => {
  it("calls the provider again after a 401 and replays a safe operation", async () => {
    const t = tokens();
    const { f, client } = setup([unauthorized(), listOk()], { token: t.token });
    await client.crm.contacts.list();
    assert.deepEqual(
      f.calls.map((c) => c.headers.get("Authorization")),
      ["Bearer t1", "Bearer t2"],
    );
  });

  it("refreshes only once per call", async () => {
    const t = tokens();
    const { f, client } = setup([unauthorized(), unauthorized()], { token: t.token });
    const error = await rejection(client.crm.contacts.list());
    assert.ok(error instanceof ApiError && error.status === 401);
    assert.equal(f.calls.length, 2);
  });

  it("replays a keyed write when the 401 answered the first attempt", async () => {
    const t = tokens();
    const { f, client } = setup([unauthorized(), createOk()], { token: t.token });
    await client.crm.contacts.create(createInput);
    assert.equal(f.calls.length, 2);
    assert.equal(f.calls[0]!.headers.get("Idempotency-Key"), f.calls[1]!.headers.get("Idempotency-Key"));
  });

  it("replays a write without replay protection when the 401 answered the first attempt", async () => {
    const t = tokens();
    const { f, client } = setup([unauthorized(), templateOk()], { token: t.token });
    await client.whatsapp.messageTemplates.create(templateInput);
    assert.equal(f.calls.length, 2);
  });

  it("does not replay a keyed write when an earlier attempt may have reached the server", async () => {
    const t = tokens();
    const { f, client } = setup([networkError(), unauthorized(), createOk()], {
      token: t.token,
    });
    const error = await rejection(client.crm.contacts.create(createInput, { idempotencyKey: "k-2" }));
    assert.ok(error instanceof ApiError && error.status === 401);
    assert.equal(error.idempotencyKey, "k-2");
    assert.equal(f.calls.length, 2);
    assert.deepEqual(t.calls, [1]);
  });

  it("shares the attempt budget between backoff and refresh", async () => {
    const t = tokens();
    const { f, client } = setup([unavailable(), unauthorized()], {
      token: t.token,
      retries: 1,
    });
    const error = await rejection(client.crm.contacts.list());
    assert.ok(error instanceof ApiError && error.status === 401);
    assert.equal(f.calls.length, 2);
  });

  it("never refreshes an API key", async () => {
    const { f, client } = setup([unauthorized()]);
    const error = await rejection(client.crm.contacts.list());
    assert.ok(error instanceof ApiError && error.status === 401);
    assert.equal(f.calls.length, 1);
  });

  it("treats a status-only 401 like a problem 401", async () => {
    const t = tokens();
    const { f, client } = setup([new Response("", { status: 401 }), listOk()], {
      token: t.token,
    });
    await client.crm.contacts.list();
    assert.equal(f.calls.length, 2);
  });
});
