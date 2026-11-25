import type { JsonKind, ProblemInfo } from "./generated/operation.js";

const marker = Symbol.for("@gatherdeal/sdk.error");

export interface ErrorContext {
  readonly operation: string;
  readonly idempotencyKey?: string | undefined;
  readonly attempt: number;
}

export class GatherDealError extends Error {
  static readonly errorName: string = "GatherDealError";

  readonly operation: string;
  readonly idempotencyKey: string | undefined;
  readonly attempt: number;

  constructor(message: string, context: ErrorContext, options?: ErrorOptions) {
    super(message, options);
    this.name = (new.target as typeof GatherDealError).errorName;
    Object.defineProperty(this, marker, { value: this.name });
    this.operation = context.operation;
    this.idempotencyKey = context.idempotencyKey;
    this.attempt = context.attempt;
  }
}

export interface Violation {
  readonly rule: string;
  readonly detail: string;
  readonly pointer?: string;
  readonly parameter?: { readonly in: string; readonly name: string };
  readonly params?: JsonObject;
}

export interface ProblemRecord {
  readonly kind: string;
  readonly id: string;
}

export type JsonValue = string | number | boolean | null | readonly JsonValue[] | JsonObject;
export interface JsonObject {
  readonly [name: string]: JsonValue;
}

export interface ResponseMetadata {
  readonly status: number;
  readonly headers: Headers;
  readonly requestID: string | undefined;
}

export interface APIErrorInit<Code extends string, Details> extends ResponseMetadata {
  readonly code?: Code;
  readonly title?: string;
  readonly detail?: string;
  readonly retryable: boolean;
  readonly retryAfterMs: number | undefined;
  readonly details: Details;
  readonly violations: readonly Violation[];
  readonly record: ProblemRecord | undefined;
  readonly problem: JsonObject | undefined;
  readonly body: string | undefined;
}

export class APIError<Code extends string = string, Details = unknown> extends GatherDealError {
  static override readonly errorName: string = "APIError";
  readonly status: number;
  readonly headers: Headers;
  readonly requestID: string | undefined;
  readonly code?: Code;
  readonly title?: string;
  readonly detail?: string;
  readonly details: Details;
  readonly violations: readonly Violation[];
  readonly record: ProblemRecord | undefined;
  readonly problem: JsonObject | undefined;
  readonly body: string | undefined;
  readonly retryable: boolean;
  readonly retryAfterMs: number | undefined;

  constructor(init: APIErrorInit<Code, Details>, context: ErrorContext) {
    super(init.code ? `${init.code} (${init.status}): ${init.detail ?? init.title}` : `HTTP ${init.status}`, context);
    this.status = init.status;
    this.headers = init.headers;
    this.requestID = init.requestID;
    if (init.code !== undefined) this.code = init.code;
    if (init.title !== undefined) this.title = init.title;
    if (init.detail !== undefined) this.detail = init.detail;
    this.details = init.details;
    this.violations = init.violations;
    this.record = init.record;
    this.problem = init.problem;
    this.body = init.body;
    this.retryable = init.retryable;
    this.retryAfterMs = init.retryAfterMs;
  }
}

export class BadRequestError extends APIError {
  static override readonly errorName: string = "BadRequestError";
}
export class AuthenticationError extends APIError {
  static override readonly errorName: string = "AuthenticationError";
}
export class PermissionDeniedError extends APIError {
  static override readonly errorName: string = "PermissionDeniedError";
}
export class NotFoundError extends APIError {
  static override readonly errorName: string = "NotFoundError";
}
export class ConflictError extends APIError {
  static override readonly errorName: string = "ConflictError";
}
export class PreconditionFailedError extends APIError {
  static override readonly errorName: string = "PreconditionFailedError";
}
export class UnprocessableEntityError extends APIError {
  static override readonly errorName: string = "UnprocessableEntityError";
}
export class RateLimitError extends APIError {
  static override readonly errorName: string = "RateLimitError";
}
export class InternalServerError extends APIError {
  static override readonly errorName: string = "InternalServerError";
}

const statusErrors = new Map<number, (new (init: APIErrorInit<string, unknown>, context: ErrorContext) => APIError) & { readonly errorName: string }>([
  [400, BadRequestError],
  [401, AuthenticationError],
  [403, PermissionDeniedError],
  [404, NotFoundError],
  [409, ConflictError],
  [412, PreconditionFailedError],
  [422, UnprocessableEntityError],
  [429, RateLimitError],
]);

export function httpError(init: APIErrorInit<string, unknown>, context: ErrorContext): APIError {
  const ErrorClass = init.status >= 500 ? InternalServerError : statusErrors.get(init.status) ?? APIError;
  return new ErrorClass(init, context);
}

export class APIConnectionError extends GatherDealError {
  static override readonly errorName: string = "APIConnectionError";
}
export class APIConnectionTimeoutError extends APIConnectionError {
  static override readonly errorName: string = "APIConnectionTimeoutError";
}
export class APIUserAbortError extends GatherDealError {
  static override readonly errorName: string = "APIUserAbortError";
}

export class OutcomeUnknownError extends APIConnectionError {
  static override readonly errorName: string = "OutcomeUnknownError";
  readonly ifMatch: string;
  readonly readOperation: string;
  readonly status: number | undefined;
  readonly requestID: string | undefined;

  constructor(
    ifMatch: string,
    readOperation: string,
    response: ResponseMetadata | undefined,
    context: ErrorContext,
    cause: unknown,
  ) {
    super(`${context.operation}: write outcome is unknown. Read the resource again with ${readOperation} and compare the fields you intended to change before retrying.`, context, { cause });
    this.ifMatch = ifMatch;
    this.readOperation = readOperation;
    this.status = response?.status;
    this.requestID = response?.requestID;
  }
}

export class InvalidResponseError extends GatherDealError implements ResponseMetadata {
  static override readonly errorName: string = "InvalidResponseError";
  readonly status: number;
  readonly headers: Headers;
  readonly requestID: string | undefined;

  constructor(message: string, response: ResponseMetadata, context: ErrorContext) {
    super(`${context.operation}: ${message} (HTTP ${response.status})`, context);
    this.status = response.status;
    this.headers = new Headers(response.headers);
    this.requestID = response.requestID;
  }
}

const httpMarkers = new Set([
  APIError.errorName,
  InternalServerError.errorName,
  ...Array.from(statusErrors.values(), (ErrorClass) => ErrorClass.errorName),
]);

export function isAPIError(error: unknown): error is APIError;
export function isAPIError<Code extends string>(error: unknown, code: Code): error is APIError<Code> & { readonly code: Code };
export function isAPIError(error: unknown, code?: string): boolean {
  if (typeof error !== "object" || error === null) return false;
  const value = error as Partial<APIError> & { [marker]?: unknown };
  return typeof value[marker] === "string" && httpMarkers.has(value[marker]) &&
    typeof value.status === "number" && Number.isInteger(value.status) && value.status >= 400 &&
    typeof value.operation === "string" &&
    (value.code === undefined || typeof value.code === "string") &&
    (code === undefined || value.code === code);
}

function kindOf(value: unknown): JsonKind | "undefined" {
  if (value === null) return "null";
  if (Array.isArray(value)) return "array";
  const type = typeof value;
  return type === "string" || type === "number" || type === "boolean" || type === "object" ? type : "undefined";
}

export function detailsMatch(info: ProblemInfo | undefined, details: unknown): boolean {
  if (info?.details === undefined) return true;
  if (kindOf(details) !== "object") return false;
  const fields = details as Record<string, unknown>;
  return Object.entries(info.details).every(([field, kinds]) =>
    Object.hasOwn(fields, field) && kinds.some((kind) => kind === kindOf(fields[field])),
  );
}
