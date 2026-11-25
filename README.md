# GatherDeal JavaScript SDK

`@gatherdeal/sdk` is a typed client for the GatherDeal API: CRM contacts, tags,
contact logs, deals and pipelines; outlets; and WhatsApp agents, chats,
messages, templates and broadcasts.

- Runs unchanged in Node.js 22+, Bun, Deno, Cloudflare Workers and browsers.
- Uses only Web-standard APIs (`fetch`, `URL`, `AbortSignal`, `crypto`); no
  runtime dependencies, no Node.js built-ins, no environment variables.
- ESM only, with TypeScript types for every input, output and error code.

> The SDK is at 0.x: minor versions may change the API. Pin an exact version.

## Install

```sh
npm install @gatherdeal/sdk
```

Deno can import it directly: `import { createClient } from "npm:@gatherdeal/sdk";`

## Quick start

### Node.js, Bun and Deno

```ts
import { createClient } from "@gatherdeal/sdk";

const client = createClient({ apiKey: process.env.GATHERDEAL_API_KEY });

const { contacts } = await client.crm.contacts.list({ q: "tan", limit: 20 });
for (const contact of contacts.data) console.log(contact.id);
```

The SDK never reads environment variables itself; pass the key explicitly
(`Deno.env.get(...)` in Deno, `Bun.env` in Bun).

### Cloudflare Workers

```ts
import { createClient } from "@gatherdeal/sdk";

export default {
  async fetch(request: Request, env: { GATHERDEAL_API_KEY: string }) {
    const client = createClient({ apiKey: env.GATHERDEAL_API_KEY });
    const { contacts } = await client.crm.contacts.list({ limit: 10 });
    return Response.json(contacts.data);
  },
};
```

### Browsers

In a browser, use a per-user access token, never an organization API key:

```ts
import { createClient } from "@gatherdeal/sdk";

const client = createClient({ token: () => getAccessToken() });
const { deal } = await client.crm.deals.get({ id: dealId });
```

## Calling the API

Every operation is a method under its service, named after its public id:
`crm.contact_tags.assign` is `client.crm.contactTags.assign(...)` and
`whatsapp.agents.pairing.get` is `client.whatsapp.agents.pairing.get(...)`.

Deprecated operations stay callable until they are removed and are marked
`@deprecated` in the types, so editors and linters flag them; their
documentation names the replacement.

Each method takes one flat input object holding the path, query, header and
body members under their API names, and an optional second argument with
per-call options. Required members that are missing, path values that are
empty, `.` or `..`, and members an operation does not take throw a
`TypeError` before any request:

```ts
await client.crm.contactTags.assign(
  { contact_id: "…", tag_id: "…" },
  { signal: AbortSignal.timeout(10_000) },
);
```

| Call option      | Meaning                                                      |
| ---------------- | ------------------------------------------------------------ |
| `signal`         | Aborts the call; the abort reason is thrown as is.           |
| `timeoutMs`      | Time limit of the whole call, retries and token refresh included. |
| `retries`        | Additional attempts after the first (overrides the client).  |
| `idempotencyKey` | Idempotency-Key of a keyed write (see below).                |

The result is the response body as the API defines it, with API field names
(`snake_case`). Any 2xx status is a success. Operations that answer without a
body (`204 No Content`) resolve to `undefined`.

Types of inputs, outputs and resources are exported per service:

```ts
import type { Deal, DealsUpdateInput } from "@gatherdeal/sdk/crm";
import type { Outlet } from "@gatherdeal/sdk/identity";
import type { MessagesCreateInput } from "@gatherdeal/sdk/whatsapp";
```

Enumerations in responses are open: a newer server can send a value the SDK
does not list yet, so keep a default branch in `switch` statements.

## Authentication

`createClient` accepts one credential:

| Option                    | Use                                                                 |
| ------------------------- | ------------------------------------------------------------------- |
| `apiKey: string`          | An organization API key. Server-side only. Operations that do not admit organization keys answer with a problem. |
| `token: () => string \| Promise<string>` | An access token. Called before each call, and once more after a 401 so you can return a refreshed token. |
| neither                   | Anonymous calls, for operations that admit them (e.g. listing outlets). |

Both are sent as `Authorization: Bearer …`. Requests never carry cookies
(`credentials: "omit"`).

**Organization keys stay on your server.** Anyone who opens a page can read
a key shipped in it. `createClient({ apiKey })` therefore throws in a
browser, web worker or service worker unless you pass
`dangerouslyAllowBrowser: true`. The check applies to the `apiKey` option
only: the SDK cannot tell what a `token` callback returns, so never return an
organization key from it in browser code. Call the API from your server
instead, or use per-user tokens.

Tokens and keys must be visible ASCII without spaces; anything else throws
before a request is sent. Errors never contain the credential, the request
or its headers, or the original error of a custom `fetch` or token provider.

Other client options:

| Option      | Default                         | Meaning                                       |
| ----------- | ------------------------------- | --------------------------------------------- |
| `fetch`     | `globalThis.fetch`              | The fetch implementation to use.              |
| `baseUrl`   | the production URL per service  | e.g. `{ crm: "https://api.gatherdeal.ai/crm" }` |
| `allowLoopbackHttp` | `false`                 | Allows `http://` base URLs on `localhost`, `127.0.0.0/8` and `[::1]`. |
| `retries`   | `2`                             | Additional attempts for retryable failures; a non-negative integer. |
| `timeoutMs` | `60000`                         | Time limit of each call, retries and token refresh included. |

Base URLs are checked when the client is created: each must be an absolute
`https://` URL without credentials, query or fragment. Plain `http://` is
accepted only for a loopback host and only with `allowLoopbackHttp: true`.

**Redirects.** The SDK never follows a redirect. A 3xx answer fails with a
`ProtocolError` and the credential is not sent to the new location.

## Errors

| Class             | When                                                                 |
| ----------------- | -------------------------------------------------------------------- |
| `ApiError`        | The API answered with a problem document (`application/problem+json`). |
| `StatusError`     | A non-2xx answer without a problem document, e.g. from a gateway.     |
| `ProtocolError`   | A redirect, a malformed problem document, or a success response that lacks what the operation promises. |
| `ConnectionError` | The request did not complete (network, DNS, TLS, blocked by CORS).    |
| `TimeoutError`    | The call exceeded `timeoutMs`.                                        |
| `CredentialError` | The `token` callback threw or returned an unusable token.             |

`StatusError` carries `status`, `correlationId` and `retryAfterMs`; its body
is not kept, since gateways answer with HTML or plain text.

All extend `GatherDealError`, which carries `operation` (the public id),
`attempt` and `idempotencyKey`. `ApiError` adds:

- `status`, `code` (e.g. `"CRM_CONTACT_NOT_FOUND"`), `title`, `detail`
- `retryable` and `retryAfterMs`
- `correlationId`: the `X-Correlation-Id` of the response; quote it when you
  contact support
- `details`: code-specific details; `violations`: field errors of
  `VALIDATION_FAILED`
- `raw`: the whole problem document

Narrow errors with the guards. They take `unknown`, so they work directly on
a caught value, and narrow `details` to the code's type after checking it:

```ts
try {
  await client.crm.contacts.list({ with_tags: true });
} catch (error) {
  if (client.crm.contacts.list.isError(error, "CRM_CONTACT_EXPANSION_LIMIT")) {
    console.log(error.details.limit); // number
  } else if (client.crm.isError(error, "CRM_CONTACT_NOT_FOUND")) {
    // any crm operation
  } else if (isApiError(error)) {
    console.log(error.code, error.correlationId);
  }
  throw error;
}
```

- `client.<service>.<…>.<method>.isError(error, code?)`: a problem this
  operation declares.
- `client.<service>.isError(error, code?)`: a problem from any operation of the
  service.
- `isApiError(error, code?)`: any problem, including codes newer than your SDK
  version.

## Retries

A call is serialized once; every attempt sends the same URL, headers and body.
The SDK retries a failed attempt only when the operation is safe to repeat:

- Reads and other operations marked safe, and keyed writes (below), are
  retried after a connection error, a retryable problem, or a 429, 502, 503
  or 504 without a problem document.
- Whether a problem is retryable comes from the SDK's error catalog for codes
  it knows, and from the problem's `retryable` member for newer codes.
- Writes without replay protection are never retried. A 401 is never retried
  except for the single token refresh described below.
- The wait is the longer of `retry_after_ms` and `Retry-After`, or an
  exponential backoff with jitter. A wait longer than a minute, or one that
  would pass the call's deadline, is not taken and the error is thrown.

All attempts of a call, including the token refresh after a 401, share one
budget of `1 + retries` attempts and one `timeoutMs` deadline. Set
`retries: 0` to make exactly one attempt.

## Idempotency

Writes that support it carry an `Idempotency-Key`. The SDK generates one
random key per call and sends it on every attempt of that call, so a retry
cannot apply the write twice.

To survive a crash or a restart, create the key yourself, store it with the
work item, and pass it on every try:

```ts
const key = crypto.randomUUID(); // persist with the job
await client.whatsapp.messages.create(input, { idempotencyKey: key });
```

Every error thrown by a keyed write carries the key in `error.idempotencyKey`.
A key must be 1 to 255 visible ASCII characters without spaces. Passing an
invalid key, or a key to an operation that does not support it, throws a
`TypeError` before any request.

**Token refresh and writes.** After a 401, a read is always replayed with a
fresh token. A write is replayed only if the 401 answered its first attempt;
if an earlier attempt may have reached the server (a timeout or a connection
error), the 401 is thrown with the idempotency key so you can retry
deliberately.

## Outlet selection

Operations that act within outlets accept an optional `outlet_id`. Omit it to
act in every outlet the credential may use, or pass one to act in that
outlet:

```ts
await client.crm.contacts.list({ outlet_id: outletId, limit: 50 });
```

## Conditional writes

Updates of deals and WhatsApp agents are conditional. Read the resource, pass
its `revision` unchanged as `if_match` (it is a quoted entity tag, sent as the
`If-Match` header), and use the `revision` of the answer for the next write:

```ts
const { deal } = await client.crm.deals.get({ id });
try {
  const { revision } = await client.crm.deals.update({
    id,
    if_match: deal.revision,
    stage_id: nextStageId,
    remark: "Called back",
  });
} catch (error) {
  if (client.crm.deals.update.isError(error, "PRECONDITION_FAILED")) {
    // Someone changed the deal: read it again and retry.
  }
  throw error;
}
```

`if_match` is a required member, so a missing revision is a type error and a
`TypeError` before any request. A stale revision fails with
`PRECONDITION_FAILED` (412); a request without one fails with
`PRECONDITION_REQUIRED` (428).

## Pagination

List operations take the page parameters as the API defines them and return
one page:

| Member            | Meaning                                                          |
| ----------------- | ---------------------------------------------------------------- |
| `limit`           | Items per page.                                                  |
| `after`, `before` | Cursors from a previous page's `next_cursor` or `prev_cursor`.   |
| `page`            | A 1-based page number, instead of a cursor.                      |
| `total`           | `"exact"` to count the matching items, `"none"` to skip it.      |
| `sort`            | Comma-separated fields, ascending unless prefixed with `-`, e.g. `"-create_at,name"`. |

```ts
const { contacts } = await client.crm.contacts.list({ limit: 100, sort: "name" });
if (contacts.next_cursor !== undefined) {
  await client.crm.contacts.list({ limit: 100, sort: "name", after: contacts.next_cursor });
}
```

`paginate` iterates every item, following the cursor from page to page. A
page without its item list, or one that announces a next page without a new
cursor, throws `ProtocolError` before any of its items is yielded:

```ts
import { paginate } from "@gatherdeal/sdk";

for await (const contact of paginate(client.crm.contacts.list, { limit: 100 })) {
  console.log(contact.id);
}
```

## Versioning

The package follows semantic versioning; at 0.x a minor release may change
the API. Each release lists the API operations it adds or removes. The API
version is part of each service (all services are at v1).

## License

Apache License 2.0. See [LICENSE](LICENSE) and [NOTICE](NOTICE).
