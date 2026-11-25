import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { describe, it } from "node:test";
import {
  ApiError,
  ProtocolError,
  StatusError,
  createClient,
  isApiError,
} from "../src/index.js";
import { fakeFetch, json, problem, rejection } from "./helpers.js";

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

function client(...responses: Response[]) {
  return createClient({ apiKey: "k", fetch: fakeFetch(...responses).fetch, retries: 0 });
}

describe("problem conformance", () => {
  for (const [name, fx] of fixtures) {
    it(`${name}: ${fx.description}`, async () => {
      const response = new Response(fx.response.body === "" ? null : fx.response.body, {
        status: fx.response.status,
        headers: fx.response.headers,
      });
      const result = client(response).crm.contacts.get({ id: "c1" });
      if (fx.expect.kind === "success") {
        assert.ok(await result);
        return;
      }
      const error = await rejection(result);
      switch (fx.expect.kind) {
        case "problem": {
          assert.ok(error instanceof ApiError, String(error));
          assert.equal(error.status, fx.expect.status);
          assert.equal(error.code, fx.expect.code);
          assert.equal(error.correlationId, "corr-1");
          if (fx.expect.retryable !== undefined) assert.equal(error.retryable, fx.expect.retryable);
          if (fx.expect.retry_after_ms !== undefined) assert.equal(error.retryAfterMs, fx.expect.retry_after_ms);
          assert.deepEqual(error.record, fx.expect.record);
          assert.equal(error.raw.code, fx.expect.code);
          break;
        }
        case "status":
          assert.ok(error instanceof StatusError, String(error));
          assert.equal(error.status, fx.expect.status);
          assert.equal(error.correlationId, "corr-1");
          break;
        case "protocol":
          assert.ok(error instanceof ProtocolError, String(error));
          assert.equal(error.status, fx.expect.status);
          break;
      }
    });
  }
});

describe("error fields and guards", () => {
  it("reads violations, details and the correlation header", async () => {
    const violations = [
      { pointer: "#/name", rule: "required", detail: "name is required" },
      { parameter: { in: "query", name: "count" }, rule: "max", detail: "too large", params: { max: 100 } },
    ];
    const error = await rejection(
      client(problem(422, "VALIDATION_FAILED", { errors: violations }, { "X-Correlation-Id": "c-9" })).crm.contacts.list(),
    );
    assert.ok(error instanceof ApiError);
    assert.deepEqual(error.violations, violations);
    assert.equal(error.correlationId, "c-9");
    assert.equal(error.operation, "crm.contacts.list");
  });

  it("narrows by operation, code and validated details", async () => {
    const c = client(
      problem(422, "CRM_CONTACT_EXPANSION_LIMIT", { details: { expansion: "tags", limit: 5 } }),
      problem(422, "CRM_CONTACT_EXPANSION_LIMIT", { details: { expansion: "tags", limit: "5" } }),
      problem(422, "FUTURE_NEW_CODE", { details: { since: "2030" } }),
    );
    const good = await rejection(c.crm.contacts.list());
    assert.ok(c.crm.contacts.list.isError(good, "CRM_CONTACT_EXPANSION_LIMIT"));
    if (c.crm.contacts.list.isError(good, "CRM_CONTACT_EXPANSION_LIMIT")) {
      const limit: number = good.details.limit;
      assert.equal(limit, 5);
    }
    assert.ok(c.crm.isError(good, "CRM_CONTACT_EXPANSION_LIMIT"));
    assert.equal(c.crm.deals.list.isError(good), false);
    assert.equal(c.whatsapp.isError(good), false);
    assert.ok(isApiError(good, "CRM_CONTACT_EXPANSION_LIMIT"));

    const malformed = await rejection(c.crm.contacts.list());
    assert.ok(isApiError(malformed, "CRM_CONTACT_EXPANSION_LIMIT"));
    assert.equal(c.crm.contacts.list.isError(malformed, "CRM_CONTACT_EXPANSION_LIMIT"), false);

    const unknown = await rejection(c.crm.contacts.list());
    assert.ok(isApiError(unknown, "FUTURE_NEW_CODE"));
    assert.ok(c.crm.isError(unknown));
    assert.equal(c.crm.contacts.list.isError(unknown), false);
    assert.equal(isApiError(new Error("x")), false);
    assert.equal(isApiError(undefined), false);
  });
});

describe("success validation", () => {
  it("returns the parsed envelope", async () => {
    const body = { status: "success", contact: { id: "c1" }, extra: 1 };
    assert.deepEqual(await client(json(200, body)).crm.contacts.get({ id: "c1" }), body);
  });

  it("rejects a missing required member", async () => {
    const error = await rejection(client(json(200, { status: "success" })).crm.contacts.get({ id: "c1" }));
    assert.ok(error instanceof ProtocolError);
    assert.match(error.message, /lacks "contact"/);
  });

  it("rejects an empty 2xx, content type or body shape", async () => {
    for (const response of [
      new Response("", { status: 202, headers: { "Content-Type": "application/json" } }),
      new Response('{"status":"success","contact":{}}', { status: 200, headers: { "Content-Type": "text/plain" } }),
      json(200, [1, 2]),
      new Response("{", { status: 200, headers: { "Content-Type": "application/json" } }),
    ]) {
      assert.ok((await rejection(client(response).crm.contacts.get({ id: "c1" }))) instanceof ProtocolError);
    }
  });

  it("returns undefined for a body-less success", async () => {
    const result = await client(new Response(null, { status: 204 })).crm.contacts.update({ id: "c1" } as never);
    assert.equal(result, undefined);
  });

  it("accepts any 2xx for a body-less operation", async () => {
    for (const response of [
      new Response(null, { status: 204 }),
      json(200, { status: "success" }),
      new Response(null, { status: 202 }),
    ]) {
      assert.equal(await client(response).crm.contacts.update({ id: "c1" } as never), undefined);
    }
  });

  it("accepts any 2xx envelope for a json operation", async () => {
    const body = { status: "success", contact: { id: "c1" } };
    for (const status of [200, 201, 202]) {
      assert.deepEqual(await client(json(status, body)).crm.contacts.get({ id: "c1" }), body);
    }
  });
});
