import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { describe, it } from "node:test";
import { APIError, InvalidResponseError, UnprocessableEntityError, GatherDeal, isAPIError } from "../src/index.js";
import { fakeFetch, problem, rejection } from "./helpers.js";

interface Fixture {
  description: string;
  response: { status: number; headers: Record<string, string>; body: string };
  expect: {
    kind: "success" | "problem" | "status" | "protocol";
    status: number;
    code?: string;
    retryable?: boolean;
    retry_after_ms?: number;
    record?: { kind: string; id: string };
  };
}

const fixtureDir = new URL("../../test/fixtures/problems/", import.meta.url);
const fixtures = readdirSync(fixtureDir)
  .filter((name) => name.endsWith(".json"))
  .map((name) => [name, JSON.parse(readFileSync(new URL(name, fixtureDir), "utf8")) as Fixture] as const);

describe("problem conformance", () => {
  for (const [name, fx] of fixtures) {
    it(name, async () => {
      const f = fakeFetch(new Response(fx.response.body, { status: fx.response.status, headers: fx.response.headers }));
      const call = new GatherDeal({ apiKey: null, fetch: f.fetch, maxRetries: 0 }).identity.outlets.get("o1");
      if (fx.expect.kind === "success") assert.deepEqual(await call, { id: "o1" });
      else {
        const error = await rejection(call);
        if (fx.expect.status < 300) assert.ok(error instanceof InvalidResponseError);
        else {
          assert.ok(error instanceof APIError);
          assert.equal(error.requestID, "corr-1");
          assert.equal(error.code, fx.expect.code);
          if (fx.expect.kind === "problem") {
            assert.equal(error.problem?.code, fx.expect.code);
            assert.deepEqual(error.record, fx.expect.record);
          } else {
            assert.equal(error.problem, undefined);
            assert.equal(error.body, fx.response.body);
          }
          if (fx.expect.retryable !== undefined) assert.equal(error.retryable, fx.expect.retryable);
          if (fx.expect.retry_after_ms !== undefined) assert.equal(error.retryAfterMs, fx.expect.retry_after_ms);
        }
        assert.equal(error.status, fx.expect.status);
      }
      assert.equal(f.calls.length, 1);
    });
  }
});

for (const maxRetries of [0, 2]) {
  describe(`HTTP errors with maxRetries=${maxRetries}`, () => {
    it("uses the status subclass for malformed 422", async () => {
      const f = fakeFetch(new Response("{", { status: 422, headers: { "Content-Type": "application/problem+json" } }));
      const error = await rejection(new GatherDeal({ apiKey: null, fetch: f.fetch }).identity.outlets.get("o1", undefined, { maxRetries }));
      assert.ok(error instanceof UnprocessableEntityError && isAPIError(error));
      assert.equal(error.code, undefined);
      assert.equal(error.problem, undefined);
      assert.equal(error.body, "{");
      assert.equal(f.calls.length, 1);
    });

    for (const status of [426, 428]) {
      it(`uses plain APIError for ${status}`, async () => {
        const f = fakeFetch(new Response("upgrade", { status }));
        const error = await rejection(new GatherDeal({ apiKey: null, fetch: f.fetch }).identity.outlets.get("o1", undefined, { maxRetries }));
        assert.ok(error instanceof APIError);
        assert.equal(error.constructor, APIError);
        assert.equal(error.status, status);
        assert.equal(f.calls.length, 1);
      });
    }

    for (const status of [302, 0]) {
      it(`refuses redirect status ${status}`, async () => {
        const response = status === 0 ? Response.error() : new Response(null, { status, headers: { Location: "https://elsewhere.test/" } });
        if (status === 0) Object.defineProperty(response, "type", { value: "opaqueredirect" });
        const f = fakeFetch(response);
        const error = await rejection(new GatherDeal({ fetch: f.fetch, apiKey: "k" }).identity.outlets.get("o1", undefined, { maxRetries }));
        assert.ok(error instanceof InvalidResponseError);
        assert.equal(error.status, status);
        assert.equal(f.calls[0]?.init.redirect, "manual");
        assert.equal(f.calls.length, 1);
      });
    }
  });
}

it("narrows marked HTTP errors across prototypes and validates declared detail kinds", async () => {
  const code = "PAGINATION_PARAMS_INVALID";
  const f = fakeFetch(
    problem(400, code, { details: { reason: "limit" } }),
    problem(400, code, { details: { reason: 42 } }),
    problem(400, "FUTURE_PROBLEM"),
  );
  const { identity } = new GatherDeal({ apiKey: null, fetch: f.fetch });
  const first = await rejection(identity.outlets.list());
  assert.ok(first instanceof APIError);
  Object.setPrototypeOf(first, Error.prototype);
  assert.ok(isAPIError(first, code));
  assert.ok(identity.isError(first, code));
  assert.ok(identity.outlets.list.isError(first, code));
  assert.equal(first.details.reason, "limit");
  assert.equal(f.calls.length, 1);

  const malformed = await rejection(identity.outlets.list());
  assert.ok(isAPIError(malformed, code));
  assert.equal(identity.outlets.list.isError(malformed, code), false);
  assert.equal(f.calls.length, 2);

  const unknown = await rejection(identity.outlets.list());
  assert.ok(isAPIError(unknown, "FUTURE_PROBLEM"));
  assert.equal(identity.outlets.list.isError(unknown), false);
  assert.equal(isAPIError({ status: 400, operation: "identity.outlets.list", code }), false);
  assert.equal(f.calls.length, 3);
});
