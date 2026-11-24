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

const { contacts } = await client.crm.contacts.list({ q: "tan", count: 20 });
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
    const { outlets } = await client.identity.outlets.list({ count: 10 });
    return Response.json(outlets.data);
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
`crm.contact_tags.assign` is `client.crm.contactTags.assign(...)`.

Each method takes one flat input object holding the path, query, header and
body members under their API names, and an optional second argument with
per-call options:

```ts
await client.crm.contactTags.assign(
  { contact_id: "…", tag_id: "…" },
  { signal: AbortSignal.timeout(10_000) },
);
```

| Call option      | Meaning                                                      |
| ---------------- | ------------------------------------------------------------ |
| `signal`         | Aborts the call; the abort reason is thrown as is.           |
| `timeoutMs`      | Time limit of each attempt.                                  |
| `retries`        | Additional attempts after the first (overrides the client).  |
| `idempotencyKey` | Idempotency-Key of a keyed write (see below).                |

The result is the response body as the API defines it, with API field names
(`snake_case`). Operations that answer without a body resolve to `undefined`.

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
| `apiKey: string`          | An organization API key. Server-side only.                           |
| `token: () => string \| Promise<string>` | An access token. Called before each call, and once more after a 401 so you can return a refreshed token. |
| neither                   | Anonymous calls, for operations that admit them (e.g. listing outlets). |

Both are sent as `Authorization: Bearer …`. Requests never carry cookies
(`credentials: "omit"`).

**API keys in browsers.** Anyone who opens a page can read a key shipped in
it. `createClient({ apiKey })` therefore throws in a browser, web worker or
service worker. Call the API from your server instead, or use per-user
tokens. If you understand the risk (an internal tool on a trusted machine),
pass `dangerouslyAllowBrowser: true`.

Other client options:

| Option      | Default                         | Meaning                                       |
| ----------- | ------------------------------- | --------------------------------------------- |
| `fetch`     | `globalThis.fetch`              | The fetch implementation to use.              |
| `baseUrl`   | the production URL per service  | e.g. `{ crm: "https://api.gatherdeal.ai/crm" }` |
| `retries`   | `2`                             | Additional attempts for retryable failures.   |
| `timeoutMs` | `30000`                         | Time limit of each attempt.                   |

**Redirects.** The SDK never follows a redirect. A 3xx answer fails with a
`ProtocolError` and the credential is not sent to the new location.

## Errors

| Class             | When                                                                 |
| ----------------- | -------------------------------------------------------------------- |
| `ApiError`        | The API answered with a problem document (`application/problem+json`). |
| `StatusError`     | A non-2xx answer without a problem document, e.g. from a gateway.     |
| `ProtocolError`   | A redirect, a malformed problem document, or a success response that lacks what the operation promises. |
| `ConnectionError` | The request did not complete (network, DNS, TLS, blocked by CORS).    |
| `TimeoutError`    | An attempt exceeded `timeoutMs`.                                      |

All extend `GatherDealError`, which carries `operation` (the public id) and
`idempotencyKey`. `ApiError` adds:

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
  retried after a connection error, a timeout, a problem marked `retryable`,
  or a 429, 502, 503 or 504 without a problem document.
- Writes without replay protection are never retried.
- Problems marked non-retryable are never retried.
- The wait honours `retry_after_ms` and `Retry-After`; a wait longer than a
  minute is not taken and the error is thrown instead. Otherwise it backs off
  exponentially with jitter.

All attempts of a call, including the token refresh after a 401, share one
budget of `1 + retries` attempts. Set `retries: 0` to make exactly one attempt.

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
Passing `idempotencyKey` to an operation that does not support it throws a
`TypeError`.

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
await client.crm.contacts.list({ outlet_id: outletId, count: 50 });
```

## Conditional writes

Deal updates are conditional. Read the deal, pass its `revision` as
`if_match`, and use the `revision` of the answer for the next write:

```ts
const { deal } = await client.crm.deals.get({ id });
try {
  const { revision } = await client.crm.deals.update({
    id,
    if_match: deal.revision,
    remark: "Called back",
  });
} catch (error) {
  if (client.crm.deals.update.isError(error, "PRECONDITION_FAILED")) {
    // Someone changed the deal: read it again and retry.
  }
  throw error;
}
```

## Pagination

List operations take the page parameters as the API defines them (`count`,
`after`, `before`, `p`, `total`) and return one page:

```ts
const { contacts } = await client.crm.contacts.list({ count: 100 });
if (contacts.next_cursor !== undefined) {
  await client.crm.contacts.list({ count: 100, after: contacts.next_cursor });
}
```

`paginate` iterates every item, following the cursor from page to page:

```ts
import { paginate } from "@gatherdeal/sdk";

for await (const contact of paginate(client.crm.contacts.list, { count: 100 })) {
  console.log(contact.id);
}
```

## Versioning

The package follows semantic versioning; at 0.x a minor release may change
the API. Each release lists the API operations it adds or removes. The API
version is part of each service (all services are at v1).

## License

Apache License 2.0. See [LICENSE](LICENSE) and [NOTICE](NOTICE).
