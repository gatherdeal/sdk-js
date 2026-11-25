import {
  APIConnectionError, APIConnectionTimeoutError, APIError, APIUserAbortError, InvalidResponseError,
  OutcomeUnknownError, type ErrorContext, type ResponseMetadata,
} from "./errors.js";
import type { Operation, ProblemInfo, RequestOptions } from "./generated/operation.js";
import type { SerializedRequest } from "./request.js";
import { failure, responseMetadata, success, type Execution } from "./response.js";
import { randomId, sleep } from "./runtime.js";

export interface TransportOptions extends RequestOptions {
  readonly idempotencyKey?: string;
  readonly ifMatch?: string;
}

export interface TransportConfig {
  readonly fetch: typeof globalThis.fetch;
  readonly authorization?: string;
  readonly accessToken?: () => string | Promise<string>;
  readonly maxRetries: number;
  readonly timeout: number;
  readonly requestHeaders?: (options: RequestOptions) => HeadersInit;
}

export type ProblemTable = Readonly<Record<string, ProblemInfo>>;

const RETRYABLE_STATUS = new Set([429, 502, 503, 504]);
const MAX_TIMEOUT = 2_147_483_647;
export const MAX_KEY_LENGTH = 128;
const ABORTED = Symbol("aborted");

export function isHeaderToken(value: unknown): value is string {
  return typeof value === "string" && value.length > 0 && !/[^\x21-\x7e]/.test(value);
}

export function checkRetries(value: number, where: string): void {
  if (!Number.isSafeInteger(value) || value < 0) {
    throw new TypeError(`${where}: maxRetries must be a non-negative integer`);
  }
}

export function checkTimeout(value: number, where: string): void {
  if (!Number.isFinite(value) || value < 1 || value > MAX_TIMEOUT) {
    throw new TypeError(`${where}: timeout must be a number from 1 to ${MAX_TIMEOUT}`);
  }
}

function idempotencyKeyOf(op: Operation, key?: string): string | undefined {
  if (key === undefined) return op.idempotency === "keyed" ? randomId() : undefined;
  if (op.idempotency !== "keyed") throw new TypeError(`${op.id}: idempotencyKey applies to keyed writes only`);
  if (!isHeaderToken(key) || key.length > MAX_KEY_LENGTH) {
    throw new TypeError(`${op.id}: idempotencyKey must be 1 to ${MAX_KEY_LENGTH} visible ASCII characters without spaces`);
  }
  return key;
}

function race<T>(promise: Promise<T>, signal: AbortSignal): Promise<T> {
  return new Promise((resolve, reject) => {
    const onAbort = () => reject(ABORTED);
    if (signal.aborted) onAbort();
    else signal.addEventListener("abort", onAbort, { once: true });
    void promise.then(
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

function isRetryable(error: unknown, problems: ProblemTable): boolean {
  if (error instanceof APIConnectionError) return true;
  if (!(error instanceof APIError)) return false;
  return RETRYABLE_STATUS.has(error.status) ||
    (error.code !== undefined && Object.hasOwn(problems, error.code) ? problems[error.code]!.retryable : error.retryable);
}

function retryDelay(error: unknown, attempt: number): number {
  if (error instanceof APIError && error.retryAfterMs !== undefined) return error.retryAfterMs;
  const ceiling = Math.min(5_000, 200 * 2 ** (attempt - 1));
  return ceiling * (0.5 + Math.random() * 0.5);
}

function userAbort(context: ErrorContext, signal: AbortSignal): APIUserAbortError {
  return new APIUserAbortError(`${context.operation}: request aborted`, context, { cause: signal.reason });
}

export function checkCallerAbort(context: ErrorContext, signal?: AbortSignal): void {
  if (signal?.aborted) throw userAbort(context, signal);
}

async function bodyText(
  response: Response,
  metadata: ResponseMetadata,
  signal: AbortSignal,
): Promise<string> {
  try {
    return await race(response.text(), signal);
  } catch (error) {
    // The observed 4xx already establishes that the server refused the request.
    if (metadata.status >= 400 && metadata.status < 500 && !signal.aborted) return "";
    throw error;
  }
}

export async function invoke<T>(
  config: TransportConfig,
  op: Operation,
  problems: ProblemTable,
  request: SerializedRequest,
  options: TransportOptions,
  transform: (data: unknown, invalid: (message: string) => InvalidResponseError) => T,
): Promise<Execution<T>> {
  const callerSignal = options.signal;
  checkCallerAbort({ operation: op.id, attempt: 1 }, callerSignal);
  const maxRetries = options.maxRetries ?? config.maxRetries;
  const timeout = options.timeout ?? config.timeout;
  checkRetries(maxRetries, op.id);
  checkTimeout(timeout, op.id);
  const idempotencyKey = idempotencyKeyOf(op, options.idempotencyKey);
  const ifMatch = options.ifMatch;
  if (op.conditional !== undefined && (typeof ifMatch !== "string" || ifMatch.trim() === "")) {
    throw new TypeError(`${op.id}: ifMatch is required`);
  }
  if (op.conditional === undefined && ifMatch !== undefined) {
    throw new TypeError(`${op.id}: ifMatch applies to conditional writes only`);
  }

  const headers = new Headers(config.requestHeaders?.(options));
  if (!headers.has("Accept")) headers.set("Accept", "application/json, application/problem+json");
  for (const [name, value] of Object.entries(request.headers)) headers.set(name, value);
  if (idempotencyKey !== undefined) headers.set("Idempotency-Key", idempotencyKey);
  if (ifMatch !== undefined) headers.set("If-Match", ifMatch);

  let authorization = config.authorization;
  let refreshed = false;
  for (let attempt = 1; ; attempt++) {
    const context = { operation: op.id, idempotencyKey, attempt };
    checkCallerAbort(context, callerSignal);
    const controller = new AbortController();
    const signal = controller.signal;
    const timer = setTimeout(() => controller.abort(), timeout);
    const onCallerAbort = () => controller.abort();
    callerSignal?.addEventListener("abort", onCallerAbort, { once: true });

    let dispatched = false;
    let metadata: ResponseMetadata | undefined;
    let failed: unknown;
    try {
      if (authorization === undefined && config.accessToken !== undefined) {
        const token = await race(Promise.resolve(config.accessToken()), signal);
        if (!isHeaderToken(token)) throw new TypeError("accessToken provider returned an unusable token");
        authorization = `Bearer ${token}`;
      }
      if (signal.aborted) throw ABORTED;
      const attemptHeaders = new Headers(headers);
      if (authorization !== undefined) attemptHeaders.set("Authorization", authorization);
      const init: RequestInit = {
        method: request.method, headers: attemptHeaders, redirect: "manual", credentials: "omit", signal,
      };
      if (request.body !== undefined) init.body = request.body;
      dispatched = true;
      const raw = await race(config.fetch(request.url, init), signal);
      const observed = responseMetadata(raw);
      metadata = observed;
      const invalid = (message: string) => new InvalidResponseError(message, observed, context);
      if (raw.status === 0 || raw.redirected || raw.type === "opaqueredirect" || (raw.status >= 300 && raw.status < 400)) {
        // Cancellation is best effort. The redirect has already been refused.
        void raw.body?.cancel().catch(() => undefined);
        throw invalid("redirect refused");
      }
      const text = await bodyText(raw, metadata, signal);
      if (raw.status < 200 || raw.status >= 300) throw failure(metadata, text, context);

      const response = { ...metadata, statusText: raw.statusText, text };
      return { data: transform(success(op, response, invalid), invalid), response };
    } catch (error) {
      if (callerSignal?.aborted) failed = userAbort(context, callerSignal);
      else if (signal.aborted) failed = new APIConnectionTimeoutError(`${op.id}: attempt timed out after ${timeout} ms`, context);
      else if (error instanceof APIError || error instanceof InvalidResponseError) failed = error;
      else failed = new APIConnectionError(`${op.id}: ${dispatched ? "request did not complete" : "access token acquisition failed"}`, context, { cause: error });
    } finally {
      clearTimeout(timer);
      callerSignal?.removeEventListener("abort", onCallerAbort);
    }

    if (!dispatched) throw failed;
    const definiteRefusal = metadata !== undefined && metadata.status >= 400 && metadata.status < 500 &&
      !(failed instanceof InvalidResponseError);
    if (ifMatch !== undefined && op.conditional !== undefined && idempotencyKey === undefined && !definiteRefusal) {
      const cause = failed instanceof APIUserAbortError ? failed.cause : failed;
      throw new OutcomeUnknownError(ifMatch, op.conditional.read, metadata, context, cause);
    }
    if (failed instanceof APIUserAbortError) throw failed;

    if (failed instanceof APIError && failed.status === 401 && config.accessToken !== undefined && !refreshed && attempt <= maxRetries) {
      refreshed = true;
      authorization = undefined;
      continue;
    }
    if (op.method !== "GET" && op.idempotency !== "keyed") throw failed;
    if (attempt > maxRetries || !isRetryable(failed, problems)) throw failed;
    const delay = retryDelay(failed, attempt);
    if (delay > 60_000) throw failed;
    try {
      await sleep(delay, callerSignal);
    } catch {
      checkCallerAbort(context, callerSignal);
      throw failed;
    }
  }
}
