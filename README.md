# GatherDeal JavaScript SDK

`@gatherdeal/sdk` is a typed client for the GatherDeal API. This version
exposes the Identity outlet operations. The CRM and WhatsApp operations are
temporarily unavailable while their SDK contracts are updated.

The SDK uses Web-standard APIs and has no runtime dependencies. It is ESM and
runs in Node.js 22+, Bun, Deno, Cloudflare Workers and browsers.

## Install

```sh
npm install @gatherdeal/sdk
```

Deno also supports `import { createClient } from "npm:@gatherdeal/sdk"`.

## Call the API

```ts
import { createClient } from "@gatherdeal/sdk";

const client = createClient({ apiKey });
const outlet = await client.identity.outlets.get("outlet-id");
console.log(outlet.id);
```

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

Use `createClient({ apiKey })` with an organization key on your server. In
browsers, use `createClient({ token: () => getAccessToken() })` with a per-user
access token. The SDK can call the provider again after a 401 if another
attempt is available. Credentials go in the bearer header, and requests omit
cookies. The SDK refuses browser API keys unless `dangerouslyAllowBrowser`
is explicitly enabled. Pass credentials explicitly. Outlet reads also
support anonymous calls with `createClient()`.

Supply a custom fetch implementation with `fetch`, and override the service
URL with `baseUrl: { identity: "https://example.com/identity" }`. URLs must
be absolute HTTPS URLs without credentials, queries or fragments. For loopback
HTTP, set `allowLoopbackHttp: true`.

## Timeouts and retries

Use per-call `timeout` and `maxRetries` to override the client's
`timeoutMs` and `retries` defaults. The default is two retries with a
60-second timeout per attempt, including token acquisition and response
reading. Pass a `signal` to bound the whole call, including waits between
attempts.

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

For conditional writes, pass `{ ifMatch: resource.revision }` in the call
options and reuse the returned revision on the next write. On 412, read the
resource again before applying the change. On `OutcomeUnknownError`, read
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

## License

Apache License 2.0. See [LICENSE](LICENSE) and [NOTICE](NOTICE).
