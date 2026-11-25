# GatherDeal SDK for JavaScript and TypeScript

Use `@gatherdeal/sdk` to call the GatherDeal API at `https://api.gatherdeal.ai`.

## Requirements

- Node.js 22.12.0 or later, Bun, Deno, Cloudflare Workers, or a modern browser.
- TypeScript 5.0 or later, if you use TypeScript.

The SDK is in 0.x. Minor releases may change the API until 1.0.

## Install

```sh
npm install @gatherdeal/sdk
```

In Deno, you can import directly from `npm:@gatherdeal/sdk`.

## Authentication

Set `GATHERDEAL_API_KEY` on your server. With no explicit credential, the SDK
reads it in Node.js, Bun, and Deno. Deno requires environment permission for
that variable. Construction throws if no credential is configured or found.

```ts
import GatherDeal from "@gatherdeal/sdk";

const client = new GatherDeal();
```

You can also pass an organization key explicitly with `new GatherDeal({ apiKey })`.
In Cloudflare Workers, pass the key from a secret binding. The examples below
use the `client` created above unless they show a separate client.

In browsers, use a per-user bearer token. `accessToken` accepts a string or a
function that returns a token, including an async function. Browser visitors can
read any API key you include in your app, so the SDK requires explicit
`dangerouslyAllowBrowser: true` to use one.

```ts
import GatherDeal from "@gatherdeal/sdk";

const browserClient = new GatherDeal({ accessToken: "user-access-token" });
```

Choose one credential option. Pass `apiKey: null` to skip environment lookup
and call endpoints that allow anonymous access, such as outlet reads.

```ts
import GatherDeal from "@gatherdeal/sdk";

const anonymousClient = new GatherDeal({ apiKey: null });
const outlets = await anonymousClient.identity.outlets.list({ limit: 20 });
```

## Making calls

Pass the ID of the item the method acts on first. Put parent IDs, query fields,
and body fields in the params object. Call options go last.

| Method targets | Signature | Example |
| --- | --- | --- |
| Item | `get(id, params?, options?)` | Look up an outlet by its ID. |
| Nested collection | `list({ parent_id, ... }, options?)` | List messages for a chat. |
| Nested item | `remove(id, { parent_id }, options?)` | Remove a recipient from a draft broadcast. |
| Singleton sub-resource | `get({ parent_id }, options?)` | Get the pairing for an agent. |
| Command on an item | `cancel(id, params?, options?)` | Cancel a broadcast by its ID. |

```ts
const outlet = await client.identity.outlets.get("outlet-id", { with_owner: true });
```

```ts
const messages = await client.whatsapp.chats.messages.list({ chat_id: "chat-id" });
```

```ts
await client.whatsapp.broadcasts.recipients.remove("recipient-id", {
  broadcast_id: "draft-broadcast-id",
});
```

Agent pairing requires a user credential with the appropriate permission.

```ts
import GatherDeal from "@gatherdeal/sdk";

const userClient = new GatherDeal({ accessToken: "user-access-token" });
const pairing = await userClient.whatsapp.agents.pairing.get({ agent_id: "agent-id" });
```

```ts
const broadcast = await client.whatsapp.broadcasts.cancel("broadcast-id");
```

## Results

Await a call to get its typed result. Resource, parameter, and operation-specific
response types are available from `@gatherdeal/sdk/crm`, `@gatherdeal/sdk/identity`,
and `@gatherdeal/sdk/whatsapp`.

**Resource**

```ts
import type { Outlet } from "@gatherdeal/sdk/identity";

const outlet: Outlet = await client.identity.outlets.get("outlet-id");
console.log(outlet.id);
```

**Page**

```ts
const page = await client.identity.outlets.list({ limit: 20 });
console.log(page.data.length, page.hasNextPage());
```

**Object receipts**

```ts
const { id } = await client.crm.contacts.create({ kind: "personal", name: "Alex Tan" });
console.log(id);
```

```ts
const deal = await client.crm.deals.get("deal-id");
const { revision } = await client.crm.deals.update(
  deal.id,
  { remark: "Contacted the customer" },
  { ifMatch: deal.revision },
);
console.log(revision);
```

**Counts**

```ts
const { added, duplicates } = await client.whatsapp.broadcastSuppressions.add({
  to: ["+12025550126"],
});
console.log(added, duplicates);
```

**Void**

```ts
const result: void = await client.crm.contactTags.add("tag-id", {
  contact_id: "contact-id",
});
// result is undefined.
```

**WhatsApp message feed**

`whatsapp.chatMessages.list()` returns message changes and an `after_rev`
watermark. Start at 0 or load your saved watermark. Drain available batches
while `has_more` is true, then save the watermark after processing the changes
and pass it to the next poll.

```ts
async function readMessageChanges(afterRev = 0): Promise<number> {
  for (;;) {
    const batch = await client.whatsapp.chatMessages.list({ after_rev: afterRev, limit: 100 });
    for (const message of batch.messages) {
      console.log(message.id, message.rev, message.merged_into_id);
    }
    afterRev = batch.after_rev;
    if (!batch.has_more) return afterRev;
  }
}

const watermark = await readMessageChanges();
```

## Raw responses

For a successful call, use `withResponse()` for the typed result, HTTP response,
and request ID. Use `asResponse()` for the HTTP response alone.

```ts
const call = client.identity.outlets.get("outlet-id");
const { data: outlet, response, requestID } = await call.withResponse();
console.log(outlet.id, response.status, requestID);

const raw = await call.asResponse();
console.log(await raw.text());
```

Both helpers share the same request execution and rebuild a fresh `Response`
from the buffered body text, status, and headers. The body has already been
read from the network when either helper resolves.

## Request IDs

The SDK exposes the `X-Correlation-Id` response header as `requestID` on
`withResponse()` results and HTTP errors. It is `undefined` when the header
is unavailable. Include it when reporting a failed request.

## Errors

```text
GatherDealError
├── APIError (including the HTTP status subclasses below)
├── APIConnectionError
│   ├── APIConnectionTimeoutError
│   └── OutcomeUnknownError
├── APIUserAbortError
└── InvalidResponseError
```

| Status or failure | Error |
| --- | --- |
| 400 | `BadRequestError` |
| 401 | `AuthenticationError` |
| 403 | `PermissionDeniedError` |
| 404 | `NotFoundError` |
| 409 | `ConflictError` |
| 412 | `PreconditionFailedError` |
| 422 | `UnprocessableEntityError` |
| 429 | `RateLimitError` |
| 5xx | `InternalServerError` |
| Other HTTP failures | `APIError` |
| Connection failure | `APIConnectionError` |
| Attempt timed out | `APIConnectionTimeoutError` |
| Conditional write may have been applied | `OutcomeUnknownError` |
| Caller cancelled | `APIUserAbortError` |
| Invalid success response or refused redirect | `InvalidResponseError` |

`APIError` includes `status`, `headers`, and `requestID`. With a valid API
problem it also exposes `code`, `details`, `violations`, and the original `problem`.
Use `isAPIError(error, code)` to match a problem code or omit the code to
match any HTTP error. Method and service `isError()` guards can narrow
`details` for a declared code.

```ts
import { isAPIError } from "@gatherdeal/sdk";

try {
  await client.identity.outlets.list({ limit: 20 });
} catch (error) {
  if (client.identity.outlets.list.isError(error, "PAGINATION_PARAMS_INVALID")) {
    console.error(error.details.reason);
  } else if (isAPIError(error, "PAGINATION_CURSOR_INVALID")) {
    console.error(error.code, error.requestID);
  }
  throw error;
}
```

## Retries and timeouts

The default is two retries after the first attempt. Each attempt has a
60-second timeout covering token acquisition, fetch, and reading the response.
Use an abort signal for an overall deadline that includes retry delays.

GETs and keyed writes can retry connection failures, attempt timeouts,
retryable API problems, and HTTP 429, 502, 503, or 504. Unkeyed writes are
never resent after a possible write. A definite 401 refusal can trigger one
token refresh and resend if you supplied an `accessToken` function and have
an attempt left.

The SDK uses the longer of `Retry-After` and `retry_after_ms` when both are
present. Without a server hint it uses exponential backoff with jitter.
If the server asks for more than 60 seconds, the SDK throws the error
immediately.

```ts
await client.identity.outlets.list(
  { limit: 20 },
  { timeout: 5_000, maxRetries: 1, signal: AbortSignal.timeout(10_000) },
);
```

## Idempotency keys

For writes that accept an `idempotencyKey`, the SDK generates one if you
omit it and reuses it across automatic retries. To retry the same logical
write across separate calls, save your own key and reuse it with the same
parameters. Use a new key for a different write. Keys must be 1–128 visible
ASCII characters without spaces.

```ts
const idempotencyKey = crypto.randomUUID();
const { id } = await client.crm.contacts.create(
  { kind: "personal", name: "Alex Tan" },
  { idempotencyKey },
);
```

## Conditional writes

Pass the revision from the read as the required `ifMatch` option, as shown
in the deal update above. The SDK sends it in `If-Match`. Reuse the returned
`revision` for the next update. If you get a 412 (`PreconditionFailedError`),
read the resource again and reapply your change with the fresh revision.

If you get `OutcomeUnknownError`, the write may already have been applied.
Read the resource using the method named by `error.readOperation` and
compare the fields you intended to set. A changed revision alone cannot
tell you who wrote it. If your values are present, continue with the fresh
revision. Otherwise, reapply the change using that revision. Resending the
old revision can yield a 412 caused by your own earlier write. The server
accepts `*` and comma-separated revision lists, which relax the protection
of checking one exact revision.

## Pagination

Use `for await` to visit each item across pages. Await the list call itself
for the first page. Use `iterPages()` to iterate page by page.

```ts
for await (const outlet of client.identity.outlets.list({ limit: 20 })) {
  console.log(outlet.id);
}
```

Use `hasNextPage()` before `getNextPage()`. To resume later, save
`page.next_cursor` and pass it as `after` with the original filters, sort,
and limit. Omit any `page` or `before` selector when resuming by cursor.

```ts
const params = { limit: 20 };
let page = await client.identity.outlets.list(params);
console.log(page.data.length);
if (page.hasNextPage()) {
  page = await page.getNextPage();
  console.log(page.data.length);
}

// Resume using the cursor from the last processed page.
if (page.next_cursor !== undefined) {
  const resumed = await client.identity.outlets.list({ ...params, after: page.next_cursor });
  console.log(resumed.data.length);
}
```

## Using from CommonJS

```js
const { GatherDeal } = require("@gatherdeal/sdk");

const client = new GatherDeal();
client.identity.outlets.get("outlet-id").then((outlet) => console.log(outlet.id));
```

## Per-call options and `withOptions`

| Call option | Use |
| --- | --- |
| `timeout` | Override the per-attempt timeout in milliseconds. |
| `maxRetries` | Override the retry count. Use `0` for a single attempt. |
| `signal` | Cancel the call with an `AbortSignal`. |
| `headers` | Override default headers case-insensitively. Use `null` to remove an inherited header. |
| `idempotencyKey` | Set the key for a write that accepts one. |
| `ifMatch` | Supply the required revision for a conditional write. |

Pass `undefined` in the params slot when you only need call options.
Use `withOptions()` to create a client with inherited settings and selected
overrides. You can also set `defaultHeaders`, a custom `fetch`, or a
`baseURL` on the client. Use the dedicated authentication and write options
for SDK-managed headers such as `Authorization`, `Idempotency-Key`, and `If-Match`.

```ts
const quickClient = client.withOptions({ timeout: 5_000, maxRetries: 0 });
const outlet = await quickClient.identity.outlets.get(
  "outlet-id",
  undefined,
  { signal: AbortSignal.timeout(10_000) },
);
```

## License

Apache License 2.0. See [LICENSE](LICENSE) and [NOTICE](NOTICE).
