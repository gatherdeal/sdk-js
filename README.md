# GatherDeal JavaScript SDK

`@gatherdeal/sdk` is a typed client for the GatherDeal API. Use `client.crm`
for contacts, tags, logs, deals, and pipelines, `client.identity` for outlets,
and `client.whatsapp` for agents, broadcasts, chats, messages, and templates.

The SDK uses Web-standard APIs and has no runtime dependencies. It runs in
Node.js 22.12.0 or later, Bun, Deno, Cloudflare Workers, and browsers. Use ESM
`import` or CommonJS `require`. TypeScript 5.0 or later is supported.

## Install

```sh
npm install @gatherdeal/sdk
```

Deno also supports `import GatherDeal from "npm:@gatherdeal/sdk"`.

## Call the API

```ts
import GatherDeal from "@gatherdeal/sdk";

const client = new GatherDeal({ apiKey });
const outlet = await client.identity.outlets.get("outlet-id");
console.log(outlet.id);
```

In CommonJS, use `const { GatherDeal } = require("@gatherdeal/sdk")`.

Pass the leaf path ID first, query and body params next, and call options last.
For example, `get(id, { with_owner: true }, { maxRetries: 0 })` includes the
outlet owner and makes one attempt. Import resource and param types from the
service module, such as `@gatherdeal/sdk/identity`.

Awaiting a call returns the resource, page or receipt described by the
operation. Bodyless operations resolve to `undefined`. To read the HTTP
response and request ID with the result, use `withResponse()`.

```ts
const call = client.identity.outlets.list({ limit: 20 });
const { data: page, response, requestID } = await call.withResponse();
console.log(page.data.length, response.status, requestID);
```

`asResponse()` returns the HTTP response alone. Both methods rebuild a
response from the buffered text, original status and headers. Each view has
its own readable body. Awaiting or iterating the same call reuses its
execution.

## Authentication

Use `new GatherDeal({ apiKey })` with an organization key on your server. In
browsers, use `new GatherDeal({ accessToken: () => getAccessToken() })` with a
per-user access token. The SDK can call the provider again after a 401 if another
attempt is available. Credentials go in the bearer header, and requests omit
cookies. The SDK refuses browser API keys unless `dangerouslyAllowBrowser`
is explicitly enabled. With no explicit credentials, the SDK looks for
`GATHERDEAL_API_KEY` on Node.js and Bun. On Deno it reads the variable only
with environment permission. Pass `apiKey: null` to make anonymous outlet reads.

Supply a custom fetch implementation with `fetch`, and override the service
URL with `serviceBaseURLs: { identity: "https://example.com/identity" }`. URLs
must be absolute and free of credentials, queries and fragments. HTTPS is
required except on loopback or when you set `allowInsecureHttp: true`.

## Timeouts and retries

Set `timeout` and `maxRetries` on a call to override the client defaults. The
default is two retries with a 60-second timeout per attempt, including token
acquisition and response reading. Pass a `signal` to bound the whole call,
including waits between attempts.

```ts
await client.identity.outlets.list(
  { limit: 20 },
  { maxRetries: 0, signal: AbortSignal.timeout(10_000) },
);
```

GET requests and keyed writes can retry connection failures, timeouts,
retryable problems and HTTP 429, 502, 503 or 504. If a token provider is
configured, one 401 can trigger an immediate refresh within the same attempt
budget. Other automatic retries of writes require an idempotency key. The SDK
generates a key for a keyed write and reuses it on every attempt. Supply your
own key when you need to persist it across calls.

The longer of `Retry-After` and `retry_after_ms` takes precedence over
exponential backoff with jitter. If the server requests more than 60 seconds,
the SDK throws the error.

## Errors

`APIError` carries the status, response headers, request ID from
`X-Correlation-Id`, operation and attempt. When the server returns a valid
problem document, the error includes its code, details, violations and raw
`problem`. Use `isAPIError(error, code?)` to narrow any HTTP error or the
service or method's `isError(error, code?)` to narrow declared problem codes
and their details.

| Error | When it is thrown |
| --- | --- |
| `BadRequestError`, `AuthenticationError`, `PermissionDeniedError`, `NotFoundError`, `ConflictError` | HTTP 400, 401, 403, 404 and 409 respectively |
| `PreconditionFailedError`, `UnprocessableEntityError`, `RateLimitError` | HTTP 412, 422 and 429 respectively |
| `InternalServerError` | HTTP 5xx |
| `APIError` | Other HTTP errors, including 426 and 428 |
| `InvalidResponseError` | A malformed success response or a refused redirect |
| `APIConnectionError`, `APIConnectionTimeoutError`, `APIUserAbortError` | A connection failure, an attempt timeout or cancellation by the caller |
| `OutcomeUnknownError` | An unkeyed conditional write may have reached the server, but the SDK cannot determine its outcome |

For conditional writes, pass the resource revision in the call options and
reuse the returned revision on the next write.

```ts
const deal = await client.crm.deals.get("deal-id");
const { revision } = await client.crm.deals.update(
  deal.id,
  { remark: "Contacted the customer" },
  { ifMatch: deal.revision },
);
```

On 412, read the resource again before applying the change. On
`OutcomeUnknownError`, read
the resource using the operation in `error.readOperation` and compare the
fields you intended to change. If your values are in place, continue with the
new revision. Otherwise reapply the change with the fresh revision. The
server accepts wildcards and revision lists in `If-Match`. A single revision
from the read gives the strongest protection.

## Pagination

Await a list call for its first page. A page provides `data`,
`hasNextPage()`, `getNextPage()` and `iterPages()`. Iterate over a list
call directly to visit its items across all pages.

```ts
for await (const outlet of client.identity.outlets.list({ limit: 20 })) {
  console.log(outlet.id);
}
```

To resume, pass the original params and `after: page.next_cursor`, omitting
`before` or `page`. In numbered mode the SDK can continue using the
current page number when the server omits a cursor. Invalid or repeated
continuation cursors raise `InvalidResponseError`.

### WhatsApp message feed

Use `client.whatsapp.chatMessages.list()` to poll for new and changed
messages. Pass the returned `after_rev` into the next call. When `has_more`
is true, more changes are ready. To paginate messages within one chat, use
`client.whatsapp.chats.messages.list({ chat_id })`.

```ts
const batch = await client.whatsapp.chatMessages.list({ after_rev: 0, limit: 20 });
const next = await client.whatsapp.chatMessages.list({ after_rev: batch.after_rev, limit: 20 });
```

## License

Apache License 2.0. See [LICENSE](LICENSE) and [NOTICE](NOTICE).
