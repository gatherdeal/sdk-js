import assert from "node:assert/strict";
import { createServer, type Server } from "node:http";
import type { AddressInfo } from "node:net";
import { after, describe, it } from "node:test";
import { problems as crmProblems, service as crmService } from "../src/crm.js";
import { ApiError, ProtocolError, createClient, paginate } from "../src/index.js";
import { fakeFetch, json, problem, rejection } from "./helpers.js";

function withGlobal<T>(name: string, value: unknown, run: () => T): T {
  const previous = Object.getOwnPropertyDescriptor(globalThis, name);
  Object.defineProperty(globalThis, name, { value, configurable: true, writable: true });
  const restore = () => {
    if (previous === undefined) delete (globalThis as Record<string, unknown>)[name];
    else Object.defineProperty(globalThis, name, previous);
  };
  let result: T;
  try {
    result = run();
  } catch (error) {
    restore();
    throw error;
  }
  if (result instanceof Promise) return result.finally(restore) as T;
  restore();
  return result;
}

describe("createClient", () => {
  it("refuses an API key in a browser unless allowed", () => {
    withGlobal("document", {}, () => {
      assert.throws(() => createClient({ apiKey: "k" }), /readable by every visitor/);
      assert.ok(createClient({ apiKey: "k", dangerouslyAllowBrowser: true }));
      assert.ok(createClient({ token: () => "t" }));
    });
    withGlobal("importScripts", () => undefined, () => {
      assert.throws(() => createClient({ apiKey: "k" }), /readable by every visitor/);
    });
    assert.ok(createClient({ apiKey: "k" }));
  });

  it("refuses both credentials and an unusable key", () => {
    assert.throws(() => createClient({ apiKey: "k", token: () => "t" }), /not both/);
    assert.throws(() => createClient({ apiKey: "" }), /apiKey must be/);
    assert.throws(() => createClient({ apiKey: "a b" }), /apiKey must be/);
  });

  it("validates retries and timeoutMs", async () => {
    for (const retries of [Number.NaN, Number.POSITIVE_INFINITY, -1, 1.5]) {
      assert.throws(() => createClient({ retries }), /retries must be a non-negative integer/);
      await assert.rejects(createClient({ fetch: fakeFetch().fetch }).crm.contacts.list({}, { retries }), /retries must be/);
    }
    for (const timeoutMs of [0, -5, Number.NaN, Number.POSITIVE_INFINITY, 2 ** 31]) {
      assert.throws(() => createClient({ timeoutMs }), /timeoutMs must be/);
    }
  });

  it("freezes descriptors and service metadata", () => {
    const c = createClient({ apiKey: "k" });
    const op = c.crm.contacts.list.operation as unknown as { idempotency: string; parameters: { encoding: string }[] };
    assert.throws(() => {
      op.idempotency = "keyed";
    }, TypeError);
    assert.throws(() => {
      op.parameters[0]!.encoding = "json";
    }, TypeError);
    assert.ok(Object.isFrozen(crmService) && Object.isFrozen(crmProblems.PRECONDITION_FAILED));
    assert.ok(Object.isFrozen(c.crm.contacts));
  });

  it("sends no Authorization header without a credential", async () => {
    const f = fakeFetch(
      json(200, { status: "success", outlets: { data: [], has_next_page: false, has_prev_page: false, page_size: 20 } }),
    );
    await createClient({ fetch: f.fetch }).identity.outlets.list();
    assert.equal(f.calls[0]!.headers.has("Authorization"), false);
    assert.equal(f.calls[0]!.url, "https://api.gatherdeal.ai/identity/v1/outlets");
  });

  it("calls globalThis.fetch at call time when no fetch is given", async () => {
    const f = fakeFetch(json(200, { status: "success", contact: {} }));
    const c = createClient({ apiKey: "k" });
    await withGlobal("fetch", f.fetch, () => c.crm.contacts.get({ id: "c1" }));
    assert.equal(f.calls.length, 1);
  });
});

describe("redirects", () => {
  it("refuses a redirect response without following it", async () => {
    const f = fakeFetch(new Response(null, { status: 302, headers: { Location: "https://elsewhere.test/" } }));
    const error = await rejection(createClient({ apiKey: "k", fetch: f.fetch }).crm.contacts.get({ id: "c1" }));
    assert.ok(error instanceof ProtocolError);
    assert.match(error.message, /redirect refused/);
    assert.equal(f.calls.length, 1);
  });

  it("refuses an opaque redirect", async () => {
    const opaque = new Response(null, { status: 200 });
    Object.defineProperty(opaque, "type", { value: "opaqueredirect" });
    Object.defineProperty(opaque, "status", { value: 0 });
    const error = await rejection(
      createClient({ apiKey: "k", fetch: fakeFetch(opaque).fetch }).crm.contacts.get({ id: "c1" }),
    );
    assert.ok(error instanceof ProtocolError && error.status === 0);
  });

  const servers: Server[] = [];
  after(() => servers.forEach((s) => s.close()));
  async function listen(handler: Parameters<typeof createServer>[1]): Promise<string> {
    const server = createServer(handler);
    servers.push(server);
    await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
    return `http://127.0.0.1:${(server.address() as AddressInfo).port}`;
  }

  it("never sends credentials to a redirect target with the real fetch", async () => {
    const seen: string[] = [];
    const target = await listen((req, res) => {
      seen.push(String(req.headers.authorization));
      res.end("{}");
    });
    const origin = await listen((_req, res) => {
      res.writeHead(302, { Location: `${target}/v1/contacts/c1` }).end();
    });
    const c = createClient({ apiKey: "secret", baseUrl: { crm: origin }, allowLoopbackHttp: true, retries: 0 });
    const error = await rejection(c.crm.contacts.get({ id: "c1" }));
    assert.ok(error instanceof ProtocolError);
    assert.deepEqual(seen, []);
  });
});

describe("pagination", () => {
  const page = (ids: string[], next?: string) =>
    json(200, {
      status: "success",
      contacts: {
        data: ids.map((id) => ({ id })),
        has_next_page: next !== undefined,
        has_prev_page: false,
        page_size: 2,
        ...(next === undefined ? {} : { next_cursor: next }),
      },
    });

  it("follows next_cursor until the last page", async () => {
    const f = fakeFetch(page(["a", "b"], "n1"), page(["c"]));
    const c = createClient({ apiKey: "k", fetch: f.fetch });
    const ids: string[] = [];
    for await (const contact of paginate(c.crm.contacts.list, { count: 2, p: 3 })) ids.push(contact.id);
    assert.deepEqual(ids, ["a", "b", "c"]);
    const second = new URL(f.calls[1]!.url).searchParams;
    assert.equal(second.get("after"), "n1");
    assert.equal(second.get("count"), "2");
    assert.equal(second.has("p"), false);
  });

  it("stops on a repeated cursor", async () => {
    const f = fakeFetch(page(["a"], "n1"), page(["b"], "n1"));
    const c = createClient({ apiKey: "k", fetch: f.fetch });
    await assert.rejects(async () => {
      for await (const _ of paginate(c.crm.contacts.list, {})) void _;
    }, /repeated a page cursor/);
  });

  it("throws ProtocolError before yielding a malformed page", async () => {
    const pages = [
      json(200, { status: "success", contacts: { data: [{ id: "a" }], has_next_page: true, has_prev_page: false, page_size: 1 } }),
      json(200, { status: "success", contacts: { has_next_page: false, has_prev_page: false, page_size: 1 } }),
      json(200, { status: "success", contacts: { data: [{ id: "a" }], has_prev_page: false, page_size: 1 } }),
    ];
    for (const response of pages) {
      const c = createClient({ apiKey: "k", fetch: fakeFetch(response).fetch });
      const seen: string[] = [];
      const error = await rejection(
        (async () => {
          for await (const contact of paginate(c.crm.contacts.list, {})) seen.push(contact.id);
        })(),
      );
      assert.ok(error instanceof ProtocolError, String(error));
      assert.deepEqual(seen, []);
    }
  });

  it("refuses an operation without pagination", async () => {
    const c = createClient({ apiKey: "k", fetch: fakeFetch().fetch });
    await assert.rejects(async () => {
      for await (const _ of paginate(c.crm.contacts.get as never, {})) void _;
    }, /not a paginated operation/);
  });
});

describe("conditional write", () => {
  it("passes the revision from a read to If-Match and surfaces 412", async () => {
    const f = fakeFetch(
      json(200, { status: "success", deal: { id: "d1", revision: "W/rev-7" } }),
      problem(412, "PRECONDITION_FAILED"),
    );
    const c = createClient({ apiKey: "k", fetch: f.fetch });
    const { deal } = await c.crm.deals.get({ id: "d1" });
    const error = await rejection(c.crm.deals.update({ id: deal.id, if_match: deal.revision, remark: "x" }));
    assert.equal(f.calls[1]!.headers.get("If-Match"), "W/rev-7");
    assert.ok(c.crm.deals.update.isError(error, "PRECONDITION_FAILED"));
    assert.ok(error instanceof ApiError && error.status === 412);
  });
});
