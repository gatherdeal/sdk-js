import {
  ApiError,
  ProtocolError,
  StatusError,
  type ErrorContext,
  type ProblemRecord,
  type Violation,
} from "./errors.js";
import type { Operation } from "./generated/operation.js";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

function mediaType(response: Response): string {
  return (response.headers.get("Content-Type") ?? "").split(";")[0]!.trim().toLowerCase();
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function parseJson(text: string): unknown {
  try {
    return JSON.parse(text);
  } catch {
    return undefined;
  }
}

/** Milliseconds from a Retry-After header: delay seconds or an HTTP date. */
export function retryAfterHeader(value: string | null): number | undefined {
  if (value === null || value.trim() === "") return undefined;
  if (/^\d+$/.test(value.trim())) return Number(value.trim()) * 1000;
  const at = Date.parse(value);
  return Number.isNaN(at) ? undefined : Math.max(0, at - Date.now());
}

function readViolations(value: unknown): Violation[] {
  if (!Array.isArray(value)) return [];
  return value.filter(
    (v): v is Violation => isObject(v) && typeof v.rule === "string" && typeof v.detail === "string",
  );
}

function readRecord(value: unknown): ProblemRecord | undefined {
  if (!isObject(value) || typeof value.kind !== "string" || typeof value.id !== "string") return undefined;
  return UUID.test(value.id) ? { kind: value.kind, id: value.id } : undefined;
}

/** Whether the response is a redirect, which the SDK never follows. */
export function isRedirect(response: Response): boolean {
  return response.type === "opaqueredirect" || (response.status >= 300 && response.status < 400);
}

/**
 * Reads a response of op: returns the success body (undefined for a body-less
 * success) or throws ApiError, StatusError or ProtocolError.
 */
export async function readResponse(
  op: Operation<unknown, unknown, string>,
  response: Response,
  context: ErrorContext,
): Promise<unknown> {
  const status = response.status;
  if (isRedirect(response)) {
    await response.body?.cancel();
    throw new ProtocolError(`${op.id}: redirect refused (HTTP ${status})`, { status, body: "" }, context);
  }
  const text = await response.text();
  const type = mediaType(response);
  const protocol = (message: string) =>
    new ProtocolError(`${op.id}: ${message} (HTTP ${status})`, { status, body: text }, context);

  if (status >= 200 && status < 300) {
    if (type === "application/problem+json") throw protocol("problem document with a success status");
    if (op.success.body === "none") return undefined;
    if (type !== "application/json") throw protocol(`unexpected content type "${type}"`);
    const body = parseJson(text);
    if (!isObject(body)) throw protocol("success body is not a JSON object");
    const missing = op.success.required.find((member) => !(member in body));
    if (missing !== undefined) throw protocol(`success body lacks "${missing}"`);
    return body;
  }

  const headerCorrelation = response.headers.get("X-Correlation-Id") ?? undefined;
  const headerRetryAfter = retryAfterHeader(response.headers.get("Retry-After"));
  if (type !== "application/problem+json") {
    throw new StatusError(
      { status, retryAfterMs: headerRetryAfter, correlationId: headerCorrelation },
      context,
    );
  }
  const doc = parseJson(text);
  if (!isObject(doc)) throw protocol("malformed problem document");
  if (typeof doc.code !== "string" || doc.code === "") throw protocol("problem document without a code");
  if (doc.status !== status) throw protocol("problem status differs from the HTTP status");
  if (typeof doc.title !== "string") throw protocol("problem document without a title");
  if (doc.retryable !== undefined && typeof doc.retryable !== "boolean") {
    throw protocol("problem retryable is not a boolean");
  }
  const bodyRetryAfter =
    typeof doc.retry_after_ms === "number" && Number.isSafeInteger(doc.retry_after_ms) && doc.retry_after_ms >= 0
      ? doc.retry_after_ms
      : undefined;
  const retryAfterMs =
    bodyRetryAfter === undefined || headerRetryAfter === undefined
      ? (bodyRetryAfter ?? headerRetryAfter)
      : Math.max(bodyRetryAfter, headerRetryAfter);
  throw new ApiError(
    {
      status,
      code: doc.code,
      title: doc.title,
      detail: typeof doc.detail === "string" ? doc.detail : undefined,
      retryable: doc.retryable === true,
      retryAfterMs,
      correlationId: headerCorrelation ?? (typeof doc.correlation_id === "string" ? doc.correlation_id : undefined),
      details: doc.details,
      violations: readViolations(doc.errors),
      record: readRecord(doc.record),
      raw: doc,
    },
    context,
  );
}
