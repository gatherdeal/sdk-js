export interface Recorded {
  readonly url: string;
  readonly init: RequestInit;
  readonly headers: Headers;
  readonly body: string | undefined;
}

export type Reply = Response | Error | ((call: Recorded) => Response | Promise<Response>);

/** A fetch that records each call and answers from replies in order. */
export function fakeFetch(...replies: Reply[]) {
  const calls: Recorded[] = [];
  const fetch = async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
    const call: Recorded = {
      url: String(input),
      init: init ?? {},
      headers: new Headers(init?.headers),
      body: typeof init?.body === "string" ? init.body : undefined,
    };
    calls.push(call);
    const reply = replies.shift();
    if (reply === undefined) throw new Error(`unexpected request ${call.url}`);
    if (reply instanceof Error) throw reply;
    if (typeof reply === "function") return reply(call);
    return reply;
  };
  return { calls, fetch: fetch as typeof globalThis.fetch };
}

export function json(status: number, body: unknown, headers: Record<string, string> = {}): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...headers },
  });
}

export const reply = (status: number, fields: object) => json(status, { status: "success", ...fields });

export function problem(
  status: number,
  code: string,
  extra: Record<string, unknown> = {},
  headers: Record<string, string> = {},
): Response {
  return new Response(
    JSON.stringify({
      type: `https://docs.gatherdeal.ai/errors/${code}`,
      title: "Title",
      status,
      code,
      retryable: false,
      ...extra,
    }),
    { status, headers: { "Content-Type": "application/problem+json", ...headers } },
  );
}

/** Rejects with the error a promise rejects with, or fails when it resolves. */
export async function rejection(promise: Promise<unknown>): Promise<unknown> {
  try {
    await promise;
  } catch (error) {
    return error;
  }
  throw new Error("expected a rejection");
}
