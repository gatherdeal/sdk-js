import type { JsonKind, ProblemInfo } from "./generated/operation.js";

/** Diagnostic fields every SDK error carries. */
export interface ErrorContext {
  /** Public id of the operation, e.g. "crm.contacts.list". */
  readonly operation: string;
  /** The Idempotency-Key the call sent, if any. */
  readonly idempotencyKey?: string | undefined;
  /** The 1-based attempt that failed; undefined before the first request. */
  readonly attempt?: number | undefined;
}

/**
 * Base class of every error the SDK throws. Caller aborts are rethrown as
 * given. Errors never carry requests, headers, credentials or the errors of a
 * custom fetch or token provider.
 */
export class GatherDealError extends Error {
  override name = "GatherDealError";
  /** Public id of the operation, e.g. "crm.contacts.list". */
  readonly operation: string;
  /** The Idempotency-Key the call sent. Reuse it to retry the same write safely. */
  readonly idempotencyKey: string | undefined;
  /** The 1-based attempt that failed; undefined before the first request. */
  readonly attempt: number | undefined;

  constructor(message: string, context: ErrorContext) {
    super(message);
    this.operation = context.operation;
    this.idempotencyKey = context.idempotencyKey;
    this.attempt = context.attempt;
  }
}

/** A field the server rejected: located by a JSON pointer into the body or by a parameter. */
export interface Violation {
  readonly rule: string;
  readonly detail: string;
  readonly pointer?: string;
  readonly parameter?: { readonly in: string; readonly name: string };
  readonly params?: Readonly<Record<string, unknown>>;
}

/** The durable record the failed call created, when the server names one. */
export interface ProblemRecord {
  readonly kind: string;
  readonly id: string;
}

/** The fields of an API problem document. */
export interface ApiErrorInit<Code extends string, Details> {
  readonly status: number;
  readonly code: Code;
  readonly title: string;
  readonly detail: string | undefined;
  readonly retryable: boolean;
  readonly retryAfterMs: number | undefined;
  readonly correlationId: string | undefined;
  readonly details: Details;
  readonly violations: readonly Violation[];
  readonly record: ProblemRecord | undefined;
  readonly raw: Readonly<Record<string, unknown>>;
}

/** The server answered with a problem document (application/problem+json). */
export class ApiError<Code extends string = string, Details = unknown> extends GatherDealError {
  override name = "ApiError";
  readonly status: number;
  /** Stable machine-readable code, e.g. "CRM_CONTACT_NOT_FOUND". */
  readonly code: Code;
  /** Short localized summary. */
  readonly title: string;
  /** Localized text about this occurrence. */
  readonly detail: string | undefined;
  /** Whether the same request may succeed later. */
  readonly retryable: boolean;
  /** How long to wait before retrying, from retry_after_ms or the Retry-After header. */
  readonly retryAfterMs: number | undefined;
  /** X-Correlation-Id of the response; quote it when contacting support. */
  readonly correlationId: string | undefined;
  /** Code-specific details, as sent. */
  readonly details: Details;
  /** Field violations of VALIDATION_FAILED; empty otherwise. */
  readonly violations: readonly Violation[];
  readonly record: ProblemRecord | undefined;
  /** The whole problem document, unknown members included. */
  readonly raw: Readonly<Record<string, unknown>>;

  constructor(init: ApiErrorInit<Code, Details>, context: ErrorContext) {
    super(`${init.code} (${init.status}): ${init.detail ?? init.title}`, context);
    this.status = init.status;
    this.code = init.code;
    this.title = init.title;
    this.detail = init.detail;
    this.retryable = init.retryable;
    this.retryAfterMs = init.retryAfterMs;
    this.correlationId = init.correlationId;
    this.details = init.details;
    this.violations = init.violations;
    this.record = init.record;
    this.raw = init.raw;
  }
}

/** A non-2xx response without a problem document, e.g. from a gateway. */
export class StatusError extends GatherDealError {
  override name = "StatusError";
  readonly status: number;
  readonly retryAfterMs: number | undefined;
  readonly correlationId: string | undefined;

  constructor(
    init: { status: number; retryAfterMs: number | undefined; correlationId: string | undefined },
    context: ErrorContext,
  ) {
    super(`HTTP ${init.status}`, context);
    this.status = init.status;
    this.retryAfterMs = init.retryAfterMs;
    this.correlationId = init.correlationId;
  }
}

/** A response the SDK cannot accept: a redirect, a malformed problem or an unexpected success shape. */
export class ProtocolError extends GatherDealError {
  override name = "ProtocolError";
  /** HTTP status, 0 for an opaque redirect. */
  readonly status: number;
  /** The response body as text. */
  readonly body: string;

  constructor(message: string, init: { status: number; body: string }, context: ErrorContext) {
    super(message, context);
    this.status = init.status;
    this.body = init.body;
  }
}

/** The request did not complete: DNS, TLS, connection reset or a blocked cross-origin request. */
export class ConnectionError extends GatherDealError {
  override name = "ConnectionError";
}

/** The call exceeded timeoutMs. */
export class TimeoutError extends GatherDealError {
  override name = "TimeoutError";
}

/** The token provider threw, or returned something that is not a usable token. */
export class CredentialError extends GatherDealError {
  override name = "CredentialError";
}

/** Narrows error to an ApiError, optionally with the given code. */
export function isApiError(error: unknown): error is ApiError;
export function isApiError<Code extends string>(error: unknown, code: Code): error is ApiError<Code>;
export function isApiError(error: unknown, code?: string): boolean {
  return error instanceof ApiError && (code === undefined || error.code === code);
}

function kindOf(value: unknown): JsonKind | "undefined" {
  if (value === null) return "null";
  if (Array.isArray(value)) return "array";
  const t = typeof value;
  return t === "string" || t === "number" || t === "boolean" || t === "object" ? t : "undefined";
}

/** Whether details carry every required field of the problem code with an accepted kind. */
export function detailsMatch(info: ProblemInfo | undefined, details: unknown): boolean {
  if (info?.details === undefined) return true;
  if (kindOf(details) !== "object") return false;
  const record = details as Record<string, unknown>;
  return Object.entries(info.details).every(([field, kinds]) =>
    (kinds as readonly string[]).includes(kindOf(record[field])),
  );
}
