import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  APIConnectionError, APIConnectionTimeoutError, APIUserAbortError, AuthenticationError,
  InternalServerError, InvalidResponseError, OutcomeUnknownError, PreconditionFailedError,
} from "../../src/index.js";
import { outletsGet } from "../../src/generated/identity/v1/operations.js";
import { broadcastsRecipientsRemove, broadcastsStart, itemsCreate } from "../fixtures/operations/operations.js";
import { problem, rejection, reply } from "../helpers.js";
import { setup, update } from "./fixtures.js";

const hang = () => new Promise<never>(() => undefined);
const revision = '"r1"';
const received = () => reply(200, { outlet: { id: "o1" } });
const networkError = new Error("offline");
const refused = () => problem(401, "UNAUTHORIZED");

for (const budget of [0, 2]) {
  describe(`re-dispatch with maxRetries=${budget}`, () => {
    const expectReplay = budget > 0;

    it("reuses the same key, URL and body on a keyed write", async () => {
      const f = setup(budget, [networkError, reply(201, { id: "a1" })]);
      const call = f.method(itemsCreate)({ content: { kind: "text", text: "Tan" } });
      if (expectReplay) assert.deepEqual(await call, { id: "a1" });
      else assert.ok(await rejection(call) instanceof APIConnectionError);
      assert.equal(f.calls.length, expectReplay ? 2 : 1);
      const first = f.calls[0]!;
      assert.ok(first.headers.get("Idempotency-Key"));
      for (const sent of f.calls) {
        assert.equal(sent.headers.get("Idempotency-Key"), first.headers.get("Idempotency-Key"));
        assert.equal(sent.url, first.url);
        assert.equal(sent.body, first.body);
      }
    });

    it("does not re-send an unkeyed write, including a declared-safe DELETE", async () => {
      const f = setup(budget, [networkError, networkError]);
      assert.ok(await rejection(f.method(broadcastsStart)("b1")) instanceof APIConnectionError);
      assert.equal(f.calls.length, 1);
      assert.ok(await rejection(f.method(broadcastsRecipientsRemove)("r1", { broadcast_id: "b1" })) instanceof APIConnectionError);
      assert.equal(f.calls.length, 2);
    });

    it("retries a GET on transport rejection", async () => {
      const f = setup(budget, [networkError, received()]);
      const call = f.method(outletsGet)("o1");
      if (expectReplay) assert.deepEqual(await call, { id: "o1" });
      else {
        const error = await rejection(call);
        assert.ok(error instanceof APIConnectionError);
        assert.equal(error.cause, networkError);
      }
      assert.equal(f.calls.length, expectReplay ? 2 : 1);
    });

    it("retries an attempt timeout after dispatch on GET", async () => {
      const f = setup(budget, [hang, received()], { timeout: 20 });
      const call = f.method(outletsGet)("o1");
      if (expectReplay) assert.deepEqual(await call, { id: "o1" });
      else assert.ok(await rejection(call) instanceof APIConnectionTimeoutError);
      assert.equal(f.calls.length, expectReplay ? 2 : 1);
    });

    it("stops when the shared attempt budget is exhausted", async () => {
      const unavailable = () => problem(503, "UNAVAILABLE", { retry_after_ms: 0 });
      const f = setup(budget, [refused(), unavailable(), unavailable()], { accessToken: () => "token" });
      const error = await rejection(f.method(outletsGet)("o1"));
      assert.ok(expectReplay ? error instanceof InternalServerError : error instanceof AuthenticationError);
      assert.equal(f.calls.length, 1 + budget);
    });

    for (const [kind, unavailable] of [
      ["bare", () => new Response("gateway", { status: 503, headers: { "Retry-After": "0" } })],
      ["parsed", () => problem(503, "INTERNAL_ERROR", { retryable: false, retry_after_ms: 0 })],
    ] as const) {
      it(`retries a ${kind} 503 by status`, async () => {
        const f = setup(budget, [unavailable(), received()]);
        const call = f.method(outletsGet)("o1");
        if (expectReplay) assert.deepEqual(await call, { id: "o1" });
        else assert.ok(await rejection(call) instanceof InternalServerError);
        assert.equal(f.calls.length, expectReplay ? 2 : 1);
      });
    }

    it("refreshes a provider once, within the attempt budget, on an unkeyed 401", async () => {
      let tokens = 0;
      const f = setup(budget, [refused(), refused()], { accessToken: () => `t${++tokens}` });
      assert.ok(await rejection(f.method(broadcastsStart)("b1")) instanceof AuthenticationError);
      assert.equal(f.calls.length, expectReplay ? 2 : 1);
      assert.equal(tokens, f.calls.length);
      assert.deepEqual(f.calls.map((call) => call.headers.get("Authorization")), expectReplay ? ["Bearer t1", "Bearer t2"] : ["Bearer t1"]);
    });

    it("uses the longer retry hint and refuses waits over 60 seconds", async () => {
      for (const [body, header, wait] of [[100, "61", 61_000], [62_000, "1", 62_000]] as const) {
        const f = setup(budget, [problem(503, "UNAVAILABLE", { retry_after_ms: body }, { "Retry-After": header })]);
        const error = await rejection(f.method(outletsGet)("o1"));
        assert.ok(error instanceof InternalServerError);
        assert.equal(error.retryAfterMs, wait);
        assert.equal(f.calls.length, 1);
      }
    });

    it("starts a new timer after backoff", async () => {
      const f = setup(budget, [problem(503, "UNAVAILABLE", { retry_after_ms: 35 }), received()], { timeout: 20 });
      const call = f.method(outletsGet)("o1");
      if (expectReplay) assert.deepEqual(await call, { id: "o1" });
      else assert.ok(await rejection(call) instanceof InternalServerError);
      assert.equal(f.calls.length, expectReplay ? 2 : 1);
    });

    it("stops during backoff on caller abort", async () => {
      const controller = new AbortController();
      const reason = new Error("stop");
      const f = setup(budget, [problem(503, "UNAVAILABLE", { retry_after_ms: 500 })]);
      const call = f.method(outletsGet)("o1", undefined, { signal: controller.signal });
      const timer = setTimeout(() => controller.abort(reason), 25);
      try {
        const error = await rejection(call);
        if (expectReplay) {
          assert.ok(error instanceof APIUserAbortError);
          assert.equal(error.cause, reason);
        } else assert.ok(error instanceof InternalServerError);
      } finally {
        clearTimeout(timer);
      }
      assert.equal(f.calls.length, 1);
    });
  });

  describe(`conditional write with maxRetries=${budget}`, () => {
    it("reports a caller abort before dispatch", async () => {
      const reason = new Error("stop");
      const f = setup(budget, []);
      const error = await rejection(f.method(update)("d1", undefined, { ifMatch: revision, signal: AbortSignal.abort(reason) }));
      assert.ok(error instanceof APIUserAbortError);
      assert.equal(error.cause, reason);
      assert.equal(f.calls.length, 0);
    });

    it("reports a timeout acquiring a token before dispatch", async () => {
      const f = setup(budget, [], { accessToken: hang, timeout: 10 });
      const error = await rejection(f.method(update)("d1", undefined, { ifMatch: revision }));
      assert.ok(error instanceof APIConnectionTimeoutError);
      assert.equal(f.calls.length, 0);
    });

    it("reports an unknown outcome on caller abort after dispatch", async () => {
      const controller = new AbortController();
      const reason = new Error("stop");
      const f = setup(budget, [() => { controller.abort(reason); return hang(); }]);
      const error = await rejection(f.method(update)("d1", undefined, { ifMatch: revision, signal: controller.signal }));
      assert.ok(error instanceof OutcomeUnknownError);
      assert.equal(error.cause, reason);
      assert.equal(f.calls.length, 1);
    });

    it("reports an unknown outcome on timeout after dispatch", async () => {
      const f = setup(budget, [hang], { timeout: 10 });
      const error = await rejection(f.method(update)("d1", undefined, { ifMatch: revision }));
      assert.ok(error instanceof OutcomeUnknownError && error.cause instanceof APIConnectionTimeoutError);
      assert.equal(f.calls.length, 1);
    });

    it("covers body read with the attempt timer and retains observed metadata", async () => {
      const stream = new ReadableStream({ pull: hang });
      const f = setup(budget, [new Response(stream, { headers: { "X-Correlation-Id": "req-1" } })], { timeout: 10 });
      const error = await rejection(f.method(update)("d1", undefined, { ifMatch: revision }));
      assert.ok(error instanceof OutcomeUnknownError && error.cause instanceof APIConnectionTimeoutError);
      assert.equal(error.status, 200);
      assert.equal(error.requestID, "req-1");
      assert.equal(f.calls.length, 1);
    });

    for (const [kind, unavailable] of [
      ["bare", () => new Response("gateway", { status: 503 })],
      ["parsed", () => problem(503, "UNAVAILABLE", { retryable: true, retry_after_ms: 0 })],
    ] as const) {
      it(`reports an unknown outcome for a ${kind} 5xx`, async () => {
        const f = setup(budget, [unavailable()]);
        const error = await rejection(f.method(update)("d1", undefined, { ifMatch: revision }));
        assert.ok(error instanceof OutcomeUnknownError && error.cause instanceof InternalServerError);
        assert.equal(error.status, 503);
        assert.equal(error.attempt, 1);
        assert.equal(error.ifMatch, revision);
        assert.equal(error.readOperation, "test.items.get");
        assert.equal(f.calls[0]?.headers.get("If-Match"), revision);
        assert.equal(f.calls.length, 1);
      });
    }

    it("reports an unknown outcome on a broken receipt stream", async () => {
      const stream = new ReadableStream({ start: (controller) => controller.error(networkError) });
      const f = setup(budget, [new Response(stream)]);
      const error = await rejection(f.method(update)("d1", undefined, { ifMatch: revision }));
      assert.ok(error instanceof OutcomeUnknownError && error.cause instanceof APIConnectionError);
      assert.equal(error.status, 200);
      assert.equal(f.calls.length, 1);
    });

    it("reports an unknown outcome on a receipt with missing members", async () => {
      const f = setup(budget, [reply(200, {})]);
      const error = await rejection(f.method(update)("d1", undefined, { ifMatch: revision }));
      assert.ok(error instanceof OutcomeUnknownError && error.cause instanceof InvalidResponseError);
      assert.equal(f.calls.length, 1);
    });

    it("reports an unknown outcome on a network failure or redirect", async () => {
      for (const reply of [networkError, new Response(null, { status: 302 })]) {
        const f = setup(budget, [reply]);
        assert.ok(await rejection(f.method(update)("d1", undefined, { ifMatch: revision })) instanceof OutcomeUnknownError);
        assert.equal(f.calls.length, 1);
      }
    });

    it("reports 412 as a definite refusal", async () => {
      const f = setup(budget, [problem(412, "PRECONDITION_FAILED")]);
      const error = await rejection(f.method(update)("d1", undefined, { ifMatch: revision }));
      assert.ok(error instanceof PreconditionFailedError);
      assert.equal(error.code, "PRECONDITION_FAILED");
      assert.equal(f.calls.length, 1);
    });
  });
}
