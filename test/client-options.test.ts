import assert from "node:assert/strict";
import { it, type TestContext } from "node:test";
import GatherDeal, * as sdk from "../src/index.js";
import { fakeFetch, problem, reply } from "./helpers.js";

const outlet = () => reply(200, { outlet: { id: "o1" } });
const page = () => reply(200, { outlets: { data: [], has_next_page: false, has_prev_page: false, page_size: 20 } });

function stub(t: TestContext, target: object, name: string, descriptor: PropertyDescriptor) {
  const original = Object.getOwnPropertyDescriptor(target, name);
  Object.defineProperty(target, name, { configurable: true, ...descriptor });
  t.after(() => {
    if (original === undefined) Reflect.deleteProperty(target, name);
    else Object.defineProperty(target, name, original);
  });
}

function trackEnv(t: TestContext, value: string | undefined, runtime: { node?: string; bun?: string } = { node: "22" }) {
  let reads = 0;
  stub(t, globalThis, "process", {
    value: {
      versions: runtime,
      get env() {
        reads++;
        return { GATHERDEAL_API_KEY: value };
      },
    },
  });
  return () => reads;
}

it("exports the same default and named class without legacy or descriptor exports", () => {
  assert.equal(GatherDeal, sdk.GatherDeal);
  for (const name of ["createClient", "paginate", "operations", "problems", "service"]) {
    assert.equal(Object.hasOwn(sdk, name), false, name);
  }
});

it("constructs an anonymous client without checking for browser API keys or reading the environment", async (t) => {
  const reads = trackEnv(t, "env-secret");
  let browserChecks = 0;
  stub(t, globalThis, "document", { get() { browserChecks++; return {}; } });
  const f = fakeFetch(page());
  const client = new GatherDeal({ apiKey: null, fetch: f.fetch });
  assert.equal(browserChecks, 0);
  assert.deepEqual((await client.identity.outlets.list()).data, []);
  assert.equal(reads(), 0);
  assert.equal(f.calls[0]?.headers.get("Authorization"), null);
  assert.equal(f.calls[0]?.headers.get("User-Agent"), null);
  assert.match(f.calls[0]?.headers.get("X-GatherDeal-Client") ?? "", /^sdk-js\/\d/);
});

for (const runtime of ["browser", "worker", "workerd"]) {
  it(`skips the environment in ${runtime} even with a Node process shim`, (t) => {
    const reads = trackEnv(t, "env-secret");
    if (runtime === "workerd") stub(t, globalThis, "navigator", { value: { userAgent: "Cloudflare-Workers" } });
    else if (runtime === "browser") stub(t, globalThis, "document", { value: {} });
    else stub(t, globalThis, "importScripts", { value() {} });

    assert.throws(() => new GatherDeal(), /apiKey: null/);
    if (runtime !== "workerd") {
      assert.throws(() => new GatherDeal({ apiKey: "key" }), /dangerouslyAllowBrowser/);
      assert.doesNotThrow(() => new GatherDeal({ apiKey: "key", dangerouslyAllowBrowser: true }));
    }
    assert.equal(reads(), 0);
  });
}

for (const state of ["granted", "prompt", "denied"]) {
  it(`only reads the Deno environment when permission is granted (${state})`, async (t) => {
    const processReads = trackEnv(t, "process-secret");
    let queries = 0;
    let reads = 0;
    stub(t, globalThis, "Deno", { value: {
      permissions: {
        querySync(descriptor: unknown) {
          assert.deepEqual(descriptor, { name: "env", variable: "GATHERDEAL_API_KEY" });
          queries++;
          return { state };
        },
        request() { assert.fail("must not prompt for environment access"); },
      },
      get env() {
      assert.equal(state, "granted");
      return {
        get(name: string) {
          assert.equal(name, "GATHERDEAL_API_KEY");
          reads++;
          return "deno-key";
        },
      };
    },
    } });
    if (state === "granted") {
      const f = fakeFetch(outlet());
      await new GatherDeal({ fetch: f.fetch }).identity.outlets.get("o1");
      assert.equal(f.calls[0]?.headers.get("Authorization"), "Bearer deno-key");
    } else {
      assert.throws(() => new GatherDeal(), /apiKey: null/);
    }
    new GatherDeal({ apiKey: null });
    assert.equal(queries, 1);
    assert.equal(reads, state === "granted" ? 1 : 0);
    assert.equal(processReads(), 0);
  });
}

it("uses an explicit bearer without reading the environment or refreshing after a 401", async (t) => {
  const reads = trackEnv(t, "env-secret");
  const f = fakeFetch(problem(401, "UNAUTHORIZED"));
  const client = new GatherDeal({ accessToken: "bearer", fetch: f.fetch });
  await assert.rejects(client.identity.outlets.get("o1"), sdk.AuthenticationError);
  assert.equal(f.calls.length, 1);
  assert.equal(f.calls[0]?.headers.get("Authorization"), "Bearer bearer");
  assert.throws(() => new GatherDeal({ apiKey: "key", accessToken: "bearer" }), /cannot be used together/);
  assert.throws(() => new GatherDeal({ apiKey: null, accessToken: "bearer" }), /cannot be used together/);
  assert.equal(reads(), 0);
});

it("merges headers and replaces credentials in child clients without mutating the parent or re-reading the environment", async (t) => {
  const reads = trackEnv(t, "env-key");
  const f = fakeFetch(outlet(), outlet(), outlet(), outlet(), outlet());
  const parent = new GatherDeal({
    fetch: f.fetch, defaultHeaders: { "X-Keep": "keep", "X-Replace": "parent", "X-Remove": "parent", "X-Call": "default" },
  });
  const child = parent.withOptions({
    accessToken: async () => "access-token",
    defaultHeaders: { "x-replace": "child", "x-remove": null, "X-Child": "child" },
  });
  assert.notEqual(parent, child);
  await child.identity.outlets.get("o1", undefined, { headers: { "x-cALL": "request", "x-Keep": null } });
  await child.withOptions({ apiKey: null }).identity.outlets.get("o1");
  await child.withOptions({ apiKey: "new-key" }).identity.outlets.get("o1");
  await parent.withOptions({}).identity.outlets.get("o1");
  await parent.identity.outlets.get("o1");
  assert.equal(reads(), 1);

  const [first, second, , inherited, original] = f.calls.map(({ headers }) => headers);
  assert.deepEqual(f.calls.map(({ headers }) => headers.get("Authorization")),
    ["Bearer access-token", null, "Bearer new-key", "Bearer env-key", "Bearer env-key"]);
  assert.equal(first?.get("x-keep"), null);
  assert.equal(first?.get("x-remove"), null);
  assert.equal(first?.get("x-replace"), "child");
  assert.equal(first?.get("x-child"), "child");
  assert.equal(first?.get("x-call"), "request");
  assert.equal(second?.get("x-keep"), "keep");
  assert.equal(second?.get("x-call"), "default");
  assert.deepEqual(inherited, original);
  assert.equal(original?.get("x-replace"), "parent");
  assert.equal(original?.get("x-remove"), "parent");
  assert.equal(original?.get("x-child"), null);
  assert.match(original?.get("User-Agent") ?? "", /^GatherDeal\/JS \d/);
});

it("recognizes Bun and ignores process.env when there is no Node or Bun marker", async (t) => {
  const runtime = { bun: "1" };
  const reads = trackEnv(t, "bun-key", runtime);
  const f = fakeFetch(outlet());
  await new GatherDeal({ fetch: f.fetch }).identity.outlets.get("o1");
  assert.equal(f.calls[0]?.headers.get("Authorization"), "Bearer bun-key");

  Reflect.deleteProperty(runtime, "bun");
  assert.throws(() => new GatherDeal(), /apiKey: null/);
  assert.equal(reads(), 1);
});

it("rejects SDK-managed headers in defaults, overrides and single requests regardless of case", async () => {
  const f = fakeFetch();
  const client = new GatherDeal({ apiKey: null, fetch: f.fetch });
  for (const name of ["aUtHoRiZaTiOn", "IDEMPOTENCY-KEY", "if-match", "Content-Type", "x-gatherdeal-Client", "User-AGENT"]) {
    assert.throws(() => new GatherDeal({ apiKey: null, defaultHeaders: { [name]: "value" } }), /SDK-managed header/);
    assert.throws(() => client.withOptions({ defaultHeaders: { [name]: null } }), /SDK-managed header/);
    await assert.rejects(client.identity.outlets.get("o1", undefined, { headers: { [name]: "value" } }), /SDK-managed header/);
  }
  assert.equal(f.calls.length, 0);
});

it("uses a root for all services and lets a complete service URL override it", async () => {
  const f = fakeFetch(reply(200, { contact: {} }), outlet(), reply(200, { agent: {} }));
  const client = new GatherDeal({
    apiKey: null, fetch: f.fetch, baseURL: "http://example.test/root///", allowInsecureHttp: true,
    serviceBaseURLs: { identity: "https://other.test/custom/" },
  });
  await client.crm.contacts.get("c1");
  await client.identity.outlets.get("o1");
  await client.whatsapp.agents.get("a1");
  assert.deepEqual(f.calls.map(({ url }) => url), [
    "http://example.test/root/crm/v1/contacts/c1",
    "https://other.test/custom/v1/outlets/o1",
    "http://example.test/root/whatsapp/v1/agents/a1",
  ]);
});

it("requires an HTTP opt-in outside loopback and rejects URL credentials, queries and fragments even with the opt-in", () => {
  const anonymous = { apiKey: null };
  for (const host of ["localhost", "127.12.34.56", "[::1]"]) {
    assert.doesNotThrow(() => new GatherDeal({ ...anonymous, baseURL: `http://${host}:8080` }));
  }
  assert.throws(() => new GatherDeal({ ...anonymous, baseURL: "http://example.test" }), /allowInsecureHttp/);
  assert.throws(() => new GatherDeal({ ...anonymous, serviceBaseURLs: { identity: "http://example.test" } }), /allowInsecureHttp/);
  assert.throws(() => new GatherDeal({ ...anonymous, baseURL: "ftp://example.test", allowInsecureHttp: true }), /must use https/);
  for (const url of ["http://user:pass@example.test", "http://@example.test", "http://example.test/?q=1",
    "http://example.test/?", "http://example.test/#f", "http://example.test/#"]) {
    assert.throws(() => new GatherDeal({ ...anonymous, baseURL: url, allowInsecureHttp: true }), /credentials, a query or a fragment/);
    assert.throws(() => new GatherDeal({ ...anonymous, serviceBaseURLs: { identity: url }, allowInsecureHttp: true }),
      /credentials, a query or a fragment/);
  }
});

it("validates API keys and reuses 128-character API and idempotency keys on every replay", async () => {
  for (const apiKey of ["", "x".repeat(129), "a b", "key\n", "密钥"]) {
    assert.throws(() => new GatherDeal({ apiKey }), /apiKey must be/);
  }
  const apiKey = "k".repeat(128);
  const unavailable = () => new Response(null, { status: 503, headers: { "Retry-After": "0" } });
  const idempotencyKey = "i".repeat(128);
  const f = fakeFetch(unavailable(), unavailable(), reply(201, { id: "c1" }));
  const client = new GatherDeal({ apiKey, fetch: f.fetch });
  await client.crm.contacts.create({ kind: "personal", name: "Tan" }, { idempotencyKey });
  assert.equal(f.calls.length, 3);
  for (const { headers } of f.calls) {
    assert.equal(headers.get("Authorization"), `Bearer ${apiKey}`);
    assert.equal(headers.get("Idempotency-Key"), idempotencyKey);
  }
});
