import {
  ApiError,
  ConnectionError,
  CredentialError,
  GatherDealError,
  StatusError,
  TimeoutError,
  type ErrorContext,
} from "./errors.js";
import type { Operation, ProblemInfo } from "./generated/operation.js";
import { serializeRequest, type SerializedRequest } from "./request.js";
import { readResponse } from "./response.js";
import { randomId, sleep } from "./runtime.js";

/** Per-call options, the second argument of every method. */
export interface CallOptions {
  /** Aborts the call; the abort reason is thrown as is. */
  readonly signal?: AbortSignal;
  /** Time limit of the whole call in milliseconds, retries and token refresh included. */
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
/** Longest wait the SDK takes before a retry; a longer one is thrown to the caller. */
const RETRY_AFTER_MAX_MS = 60_000;
const ACCEPT = "application/json, application/problem+json";
/** Visible ASCII only: a value fetch sends unchanged in a header. */
const HEADER_TOKEN = /^[\x21-\x7e]+$/;
const MAX_IDEMPOTENCY_KEY_LENGTH = 255;
const MAX_TIMEOUT_MS = 2_147_483_647;

type AnyOperation = Operation<unknown, unknown, string>;
type ProblemTable = Readonly<Record<string, ProblemInfo>>;

/** Rejection of a wait that the call's signal ended. */
const ABORTED = Symbol("aborted");

/** Whether value is usable as a bearer credential. */
export function isHeaderToken(value: unknown): value is string {
  return typeof value === "string" && HEADER_TOKEN.test(value);
}

/** Throws unless value is a non-negative safe integer. */
export function checkRetries(value: unknown, where: string): asserts value is number {
  if (!Number.isSafeInteger(value) || (value as number) < 0) {
    throw new TypeError(`${where}: retries must be a non-negative integer`);
  }
}

/** Throws unless value is a positive number of milliseconds a timer can hold. */
export function checkTimeout(value: unknown, where: string): asserts value is number {
  if (typeof value !== "number" || !Number.isFinite(value) || value <= 0 || value > MAX_TIMEOUT_MS) {
    throw new TypeError(`${where}: timeoutMs must be a number from 1 to ${MAX_TIMEOUT_MS}`);
  }
}

function race<T>(promise: Promise<T>, signal: AbortSignal): Promise<T> {
  if (signal.aborted) return Promise.reject(ABORTED);
  return new Promise<T>((resolve, reject) => {
    const onAbort = () => reject(ABORTED);
    signal.addEventListener("abort", onAbort, { once: true });
    promise.then(
      (value) => {
        signal.removeEventListener("abort", onAbort);
        resolve(value);
      },
      (error: unknown) => {
        signal.removeEventListener("abort", onAbort);
        reject(error);
      },
    );
  });
}

function isRetryable(error: unknown, problems: ProblemTable): error is GatherDealError {
  if (error instanceof ConnectionError) return true;
  if (error instanceof ApiError) {
    if (error.status === 401) return false;
    return Object.hasOwn(problems, error.code) ? problems[error.code]!.retryable : error.retryable;
  }
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

function errorName(error: unknown): string {
  const name = (error as { name?: unknown } | null)?.name;
  return typeof name === "string" && /^\w{1,64}$/.test(name) ? name : "Error";
}

async function acquireToken(
  token: () => string | Promise<string>,
  signal: AbortSignal,
  context: ErrorContext,
): Promise<string> {
  let value: unknown;
  try {
    value = await race(Promise.resolve().then(token), signal);
  } catch (error) {
    if (error === ABORTED) throw error;
    throw new CredentialError(`${context.operation}: token provider failed (${errorName(error)})`, context);
  }
  if (!isHeaderToken(value)) {
    throw new CredentialError(`${context.operation}: token provider returned an unusable token`, context);
  }
  return value;
}

async function attempt(
  config: TransportConfig,
  op: AnyOperation,
  request: SerializedRequest,
  bearer: string | undefined,
  signal: AbortSignal,
  context: ErrorContext,
): Promise<unknown> {
  const headers: Record<string, string> = { Accept: ACCEPT, ...request.headers };
  if (bearer !== undefined) headers.Authorization = `Bearer ${bearer}`;
  const init: RequestInit = {
    method: request.method,
    headers,
    credentials: "omit",
    redirect: "manual",
    signal,
  };
  if (request.body !== undefined) init.body = request.body;
  let response: Response;
  try {
    response = await race(Promise.resolve().then(() => config.fetch(request.url, init)), signal);
  } catch (error) {
    if (error === ABORTED || signal.aborted) throw ABORTED;
    throw new ConnectionError(`${op.id}: request failed (${errorName(error)})`, context);
  }
  try {
    return await race(readResponse(op, response, context), signal);
  } catch (error) {
    if (error === ABORTED || signal.aborted) throw ABORTED;
    if (error instanceof GatherDealError) throw error;
    throw new ConnectionError(`${op.id}: reading the response failed (${errorName(error)})`, context);
  }
}

function idempotencyKeyOf(op: AnyOperation, options: CallOptions): string | undefined {
  const key = options.idempotencyKey;
  if (key === undefined) return op.idempotency === "keyed" ? randomId() : undefined;
  if (op.idempotency !== "keyed") throw new TypeError(`${op.id}: idempotencyKey applies to keyed writes only`);
  if (!isHeaderToken(key) || key.length > MAX_IDEMPOTENCY_KEY_LENGTH) {
    throw new TypeError(
      `${op.id}: idempotencyKey must be 1 to ${MAX_IDEMPOTENCY_KEY_LENGTH} visible ASCII characters without spaces`,
    );
  }
  return key;
}

/**
 * Calls op once from the caller's view: serializes the request once, then
 * makes up to 1 + retries attempts with the same URL, headers, body and
 * Idempotency-Key. Backoff retries and the token refresh share that budget,
 * and one deadline of timeoutMs covers the whole call.
 */
export async function invoke(
  config: TransportConfig,
  op: AnyOperation,
  problems: ProblemTable,
  baseUrl: string,
  input: Readonly<Record<string, unknown>>,
  options: CallOptions = {},
): Promise<unknown> {
  const callerSignal = options.signal;
  if (callerSignal?.aborted) throw callerSignal.reason;
  const retries = options.retries ?? config.retries;
  checkRetries(retries, op.id);
  const timeoutMs = options.timeoutMs ?? config.timeoutMs;
  checkTimeout(timeoutMs, op.id);
  const idempotencyKey = idempotencyKeyOf(op, options);
  const serialized = serializeRequest(op, input, baseUrl);
  const request: SerializedRequest =
    idempotencyKey === undefined
      ? serialized
      : { ...serialized, headers: { ...serialized.headers, "Idempotency-Key": idempotencyKey } };
  const maxAttempts = 1 + retries;
  const deadline = Date.now() + timeoutMs;
  const credential = config.credential;

  const controller = new AbortController();
  const signal = controller.signal;
  let timedOut = false;
  const timer = setTimeout(() => {
    timedOut = true;
    controller.abort();
  }, timeoutMs);
  const onCallerAbort = () => controller.abort();
  callerSignal?.addEventListener("abort", onCallerAbort, { once: true });

  let n = 0;
  const context = (): ErrorContext => ({ operation: op.id, idempotencyKey, attempt: n === 0 ? undefined : n });
  try {
    let bearer: string | undefined;
    if (credential.kind === "apiKey") bearer = credential.apiKey;
    if (credential.kind === "token") bearer = await acquireToken(credential.token, signal, context());
    let refreshed = false;
    for (;;) {
      n++;
      try {
        return await attempt(config, op, request, bearer, signal, context());
      } catch (error) {
        if (error === ABORTED || n >= maxAttempts) throw error;
        if (
          credential.kind === "token" &&
          !refreshed &&
          isUnauthorized(error) &&
          (op.idempotency === "safe" || n === 1)
        ) {
          refreshed = true;
          bearer = await acquireToken(credential.token, signal, context());
          continue;
        }
        if (op.idempotency === "none" || !isRetryable(error, problems)) throw error;
        const delay = retryDelay(error, n);
        if (delay > RETRY_AFTER_MAX_MS || Date.now() + delay >= deadline) throw error;
        try {
          await sleep(delay, signal);
        } catch {
          throw ABORTED;
        }
      }
    }
  } catch (error) {
    if (callerSignal?.aborted) throw callerSignal.reason;
    if (timedOut || error === ABORTED) {
      throw new TimeoutError(`${op.id}: call timed out after ${timeoutMs} ms`, context());
    }
    throw error;
  } finally {
    clearTimeout(timer);
    callerSignal?.removeEventListener("abort", onCallerAbort);
  }
}
