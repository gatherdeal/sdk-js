import {
  ApiError,
  ConnectionError,
  GatherDealError,
  StatusError,
  TimeoutError,
} from "./errors.js";
import type { Operation } from "./generated/operation.js";
import { serializeRequest, type SerializedRequest } from "./request.js";
import { readResponse } from "./response.js";
import { randomId, sleep } from "./runtime.js";

/** Per-call options, the second argument of every method. */
export interface CallOptions {
  /** Aborts the call; the abort reason is thrown as is. */
  readonly signal?: AbortSignal;
  /** Time limit of each attempt in milliseconds. */
  readonly timeoutMs?: number;
  /** Additional attempts after the first; overrides the client setting. */
  readonly retries?: number;
  /** Idempotency-Key of a keyed write. Defaults to a new random key per call. */
  readonly idempotencyKey?: string;
}

/** Where the bearer credential of each request comes from. */
export type Credential =
  | { readonly kind: "none" }
  | { readonly kind: "apiKey"; readonly apiKey: string }
  | { readonly kind: "token"; readonly token: () => string | Promise<string> };

export interface TransportConfig {
  readonly fetch: typeof globalThis.fetch;
  readonly credential: Credential;
  readonly retries: number;
  readonly timeoutMs: number;
}

const RETRYABLE_STATUS = new Set([429, 502, 503, 504]);
const BACKOFF_BASE_MS = 200;
const BACKOFF_MAX_MS = 5_000;
/** Longest Retry-After the SDK waits for; a longer one is thrown to the caller. */
const RETRY_AFTER_MAX_MS = 60_000;
const ACCEPT = "application/json, application/problem+json";

type AnyOperation = Operation<unknown, unknown, string>;

function isRetryable(error: unknown): error is GatherDealError {
  if (error instanceof ConnectionError || error instanceof TimeoutError) return true;
  if (error instanceof ApiError) return error.retryable;
  if (error instanceof StatusError) return RETRYABLE_STATUS.has(error.status);
  return false;
}

function isUnauthorized(error: unknown): boolean {
  return (error instanceof ApiError || error instanceof StatusError) && error.status === 401;
}

function retryDelay(error: GatherDealError, attempt: number): number {
  const hinted = error instanceof ApiError || error instanceof StatusError ? error.retryAfterMs : undefined;
  if (hinted !== undefined) return hinted;
  const ceiling = Math.min(BACKOFF_MAX_MS, BACKOFF_BASE_MS * 2 ** (attempt - 1));
  return ceiling / 2 + Math.random() * (ceiling / 2);
}

async function attempt(
  config: TransportConfig,
  op: AnyOperation,
  request: SerializedRequest,
  bearer: string | undefined,
  timeoutMs: number,
  signal: AbortSignal | undefined,
  context: { operation: string; idempotencyKey: string | undefined },
): Promise<unknown> {
  if (signal?.aborted) throw signal.reason;
  const controller = new AbortController();
  let timedOut = false;
  const timer = setTimeout(() => {
    timedOut = true;
    controller.abort();
  }, timeoutMs);
  const onAbort = () => controller.abort(signal!.reason);
  signal?.addEventListener("abort", onAbort, { once: true });
  try {
    const headers: Record<string, string> = { Accept: ACCEPT, ...request.headers };
    if (bearer !== undefined) headers.Authorization = `Bearer ${bearer}`;
    const init: RequestInit = {
      method: request.method,
      headers,
      credentials: "omit",
      redirect: "manual",
      signal: controller.signal,
    };
    if (request.body !== undefined) init.body = request.body;
    const response = await config.fetch(request.url, init);
    return await readResponse(op, response, context);
  } catch (error) {
    if (signal?.aborted) throw signal.reason;
    if (timedOut) throw new TimeoutError(`${op.id}: attempt timed out after ${timeoutMs} ms`, context);
    if (error instanceof GatherDealError) throw error;
    throw new ConnectionError(`${op.id}: request failed`, { ...context, cause: error });
  } finally {
    clearTimeout(timer);
    signal?.removeEventListener("abort", onAbort);
  }
}

/**
 * Calls op once from the caller's view: serializes the request once, then
 * makes up to 1 + retries attempts with the same URL, headers, body and
 * Idempotency-Key. Backoff retries and the token refresh share that budget.
 */
export async function invoke(
  config: TransportConfig,
  op: AnyOperation,
  baseUrl: string,
  input: Readonly<Record<string, unknown>>,
  options: CallOptions = {},
): Promise<unknown> {
  if (options.idempotencyKey !== undefined && op.idempotency !== "keyed") {
    throw new TypeError(`${op.id}: idempotencyKey applies to keyed writes only`);
  }
  const idempotencyKey = op.idempotency === "keyed" ? (options.idempotencyKey ?? randomId()) : undefined;
  const serialized = serializeRequest(op, input, baseUrl);
  const request: SerializedRequest =
    idempotencyKey === undefined
      ? serialized
      : { ...serialized, headers: { ...serialized.headers, "Idempotency-Key": idempotencyKey } };
  const context = { operation: op.id, idempotencyKey };
  const maxAttempts = 1 + Math.max(0, options.retries ?? config.retries);
  const timeoutMs = options.timeoutMs ?? config.timeoutMs;
  const credential = config.credential;

  let bearer: string | undefined;
  if (credential.kind === "apiKey") bearer = credential.apiKey;
  if (credential.kind === "token") bearer = await credential.token();
  let refreshed = false;

  for (let n = 1; ; n++) {
    try {
      return await attempt(config, op, request, bearer, timeoutMs, options.signal, context);
    } catch (error) {
      if (n >= maxAttempts) throw error;
      if (
        credential.kind === "token" &&
        !refreshed &&
        isUnauthorized(error) &&
        (op.idempotency === "safe" || n === 1)
      ) {
        refreshed = true;
        bearer = await credential.token();
        continue;
      }
      if (op.idempotency === "none" || !isRetryable(error)) throw error;
      const delay = retryDelay(error, n);
      if (delay > RETRY_AFTER_MAX_MS) throw error;
      await sleep(delay, options.signal);
    }
  }
}
