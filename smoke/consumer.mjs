// Runs against the installed package in Node, Bun and Deno.
import GatherDeal, { GatherDeal as NamedGatherDeal, InternalServerError, InvalidResponseError, NotFoundError, isAPIError } from "@gatherdeal/sdk";
import * as sdk from "@gatherdeal/sdk";
import { operations, problems, service } from "@gatherdeal/sdk/internal";
import manifest from "@gatherdeal/sdk/package.json" with { type: "json" };

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

check(GatherDeal === NamedGatherDeal, "constructor exports");
for (const name of ["createClient", "paginate", "operations", "problems", "service"]) {
  check(!(name in sdk), `unexpected root export ${name}`);
}
check(service.crm.name === "crm" && service.identity.name === "identity" && service.whatsapp.name === "whatsapp", "service metadata");
check(operations.identity.outlets.list.id === "identity.outlets.list", "operation tree");
check(problems.identity.IDENTITY_OUTLET_NOT_FOUND.status === 404, "problem table");

{
  const f = fakeFetch(json(200, { status: "success", outlet: { id: "o1" } }));
  const client = new GatherDeal({ apiKey: "k", fetch: f.fetch });
  const pending = client.identity.outlets.get("o1");
  const { data, response, requestID } = await pending.withResponse();
  check(data.id === "o1" && response.status === 200 && requestID === "corr-1", "response views");
  check((await pending).id === "o1" && f.calls.length === 1, "shared fetch");
  const call = f.calls[0];
  check(call.url === "https://api.gatherdeal.ai/identity/v1/outlets/o1", `url ${call.url}`);
  check(call.headers.get("Authorization") === "Bearer k", "authorization");
  check(call.headers.get("X-GatherDeal-Client") === `sdk-js/${manifest.version}`, "client header");
  check(call.headers.get("User-Agent") === `GatherDeal/JS ${manifest.version}`, "user agent");
  check(call.init.redirect === "manual", "redirect manual");
}

// Filter encoding and pagination.
{
  const page = (ids, next) =>
    json(200, {
      status: "success",
      outlets: { data: ids.map((id) => ({ id })), has_next_page: next !== undefined, has_prev_page: false, page_size: 2, next_cursor: next },
    });
  const f = fakeFetch(page(["a", "b"], "n1"), page(["c"]));
  const client = new GatherDeal({ apiKey: "k", fetch: f.fetch });
  const ids = [];
  for await (const c of client.identity.outlets.list({ filter: { rules: [{ field: "name", op: "EQ", value: "陈" }] } })) ids.push(c.id);
  check(ids.join() === "a,b,c", "pagination");
  check(/^[A-Za-z0-9_-]+$/.test(new URL(f.calls[0].url).searchParams.get("filter")), "base64url filter");
}

// Errors.
{
  const problem = json(404, { type: "https://docs.gatherdeal.ai/errors/IDENTITY_OUTLET_NOT_FOUND", title: "Missing", status: 404, code: "IDENTITY_OUTLET_NOT_FOUND", retryable: false }, "application/problem+json");
  const client = new GatherDeal({ apiKey: "k", fetch: fakeFetch(problem, new Response("", { status: 502 })).fetch, maxRetries: 0 });
  let error;
  try {
    await client.identity.outlets.get("o1");
  } catch (e) {
    error = e;
  }
  check(error instanceof NotFoundError && isAPIError(error, "IDENTITY_OUTLET_NOT_FOUND"), "api error");
  check(client.identity.outlets.get.isError(error, "IDENTITY_OUTLET_NOT_FOUND"), "operation guard");
  check(error.requestID === "corr-1", "correlation id");
  try {
    await client.identity.outlets.list();
  } catch (e) {
    error = e;
  }
  check(error instanceof InternalServerError && error.status === 502, "status error");
}

// A real redirect is refused and its target receives nothing.
{
  let reached = 0;
  const target = await serve(() => {
    reached++;
    return new Response("{}");
  });
  const origin = await serve(() => new Response(null, { status: 302, headers: { Location: `${target.url}/v1/outlets/o1` } }));
  const client = new GatherDeal({ apiKey: "secret", serviceBaseURLs: { identity: origin.url }, maxRetries: 0 });
  let error;
  try {
    await client.identity.outlets.get("o1");
  } catch (e) {
    error = e;
  }
  await origin.close();
  await target.close();
  check(error instanceof InvalidResponseError, `redirect refused, got ${error}`);
  check(reached === 0, "redirect target reached");
}

console.log("smoke: ok");
