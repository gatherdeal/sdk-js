// Runs against the installed package in Node, Bun and Deno.
import {
  ApiError,
  ProtocolError,
  StatusError,
  createClient,
  isApiError,
  paginate,
} from "@gatherdeal/sdk";
import * as crm from "@gatherdeal/sdk/crm";
import * as identity from "@gatherdeal/sdk/identity";
import * as whatsapp from "@gatherdeal/sdk/whatsapp";

function check(condition, message) {
  if (!condition) throw new Error(`smoke: ${message}`);
}

function json(status, body, type = "application/json") {
  return new Response(JSON.stringify(body), { status, headers: { "Content-Type": type, "X-Correlation-Id": "corr-1" } });
}

function fakeFetch(...replies) {
  const calls = [];
  const fetch = async (url, init) => {
    calls.push({ url: String(url), init, headers: new Headers(init.headers) });
    return replies.shift();
  };
  return { calls, fetch };
}

/** Serves handler on 127.0.0.1 with the runtime's own server. */
async function serve(handler) {
  if (globalThis.Deno !== undefined) {
    const server = Deno.serve({ port: 0, hostname: "127.0.0.1", onListen() {} }, handler);
    return { url: `http://127.0.0.1:${server.addr.port}`, close: () => server.shutdown() };
  }
  if (globalThis.Bun !== undefined) {
    const server = Bun.serve({ port: 0, hostname: "127.0.0.1", fetch: handler });
    return { url: `http://127.0.0.1:${server.port}`, close: () => server.stop(true) };
  }
  const http = await import("node:http");
  const server = http.createServer(async (req, res) => {
    const response = await handler(new Request(`http://127.0.0.1${req.url}`, { headers: req.headers }));
    res.writeHead(response.status, Object.fromEntries(response.headers));
    res.end(Buffer.from(await response.arrayBuffer()));
  });
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  return { url: `http://127.0.0.1:${server.address().port}`, close: () => server.close() };
}

check(crm.service.name === "crm" && identity.service.name === "identity" && whatsapp.service.name === "whatsapp", "subpaths");
check(crm.problems.PRECONDITION_FAILED.status === 412, "problem table");

// Success, serialization and the idempotency key.
{
  const f = fakeFetch(json(200, { status: "success", id: "c1" }));
  const client = createClient({ apiKey: "k", fetch: f.fetch });
  await client.crm.contacts.create({ name: "Tan" });
  const call = f.calls[0];
  check(call.url === "https://api.gatherdeal.ai/crm/v1/contacts", `url ${call.url}`);
  check(/^[0-9a-f-]{36}$/.test(call.headers.get("Idempotency-Key") ?? ""), "idempotency key");
  check(call.headers.get("Authorization") === "Bearer k", "authorization");
  check(call.init.redirect === "manual", "redirect manual");
}

// Filter encoding and pagination.
{
  const page = (ids, next) =>
    json(200, {
      status: "success",
      contacts: { data: ids.map((id) => ({ id })), has_next_page: next !== undefined, has_prev_page: false, page_size: 2, next_cursor: next },
    });
  const f = fakeFetch(page(["a", "b"], "n1"), page(["c"]));
  const client = createClient({ apiKey: "k", fetch: f.fetch });
  const ids = [];
  for await (const c of paginate(client.crm.contacts.list, { filter: { rules: [{ field: "name", op: "EQ", value: "陈" }] } })) ids.push(c.id);
  check(ids.join() === "a,b,c", "pagination");
  check(/^[A-Za-z0-9_-]+$/.test(new URL(f.calls[0].url).searchParams.get("filter")), "base64url filter");
}

// Errors.
{
  const problem = json(412, { type: "https://docs.gatherdeal.ai/errors/PRECONDITION_FAILED", title: "Stale", status: 412, code: "PRECONDITION_FAILED", retryable: false }, "application/problem+json");
  const client = createClient({ apiKey: "k", fetch: fakeFetch(problem, new Response("", { status: 502 })).fetch, retries: 0 });
  let error;
  try {
    await client.crm.deals.update({ id: "d1", if_match: "r1" });
  } catch (e) {
    error = e;
  }
  check(error instanceof ApiError && isApiError(error, "PRECONDITION_FAILED"), "api error");
  check(client.crm.deals.update.isError(error, "PRECONDITION_FAILED"), "operation guard");
  check(error.correlationId === "corr-1", "correlation id");
  try {
    await client.crm.contacts.list();
  } catch (e) {
    error = e;
  }
  check(error instanceof StatusError && error.status === 502, "status error");
}

// A real redirect is refused and its target receives nothing.
{
  let reached = 0;
  const target = await serve(() => {
    reached++;
    return new Response("{}");
  });
  const origin = await serve(() => new Response(null, { status: 302, headers: { Location: `${target.url}/v1/contacts/c1` } }));
  const client = createClient({ apiKey: "secret", baseUrl: { crm: origin.url }, retries: 0 });
  let error;
  try {
    await client.crm.contacts.get({ id: "c1" });
  } catch (e) {
    error = e;
  }
  await origin.close();
  await target.close();
  check(error instanceof ProtocolError, `redirect refused, got ${error}`);
  check(reached === 0, "redirect target reached");
}

console.log("smoke: ok");
