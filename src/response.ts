import { httpError, InvalidResponseError, type ErrorContext, type JsonObject, type JsonValue, type ResponseMetadata, type Violation } from "./errors.js";
import type { Operation } from "./generated/operation.js";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

export interface BufferedResponse extends ResponseMetadata {
  readonly statusText: string;
  readonly text: string;
}

export interface Execution<T> {
  readonly data: T;
  readonly response: BufferedResponse;
}

export function responseMetadata(response: Response): ResponseMetadata {
  return {
    status: response.status,
    headers: new Headers(response.headers),
    requestID: response.headers.get("X-Correlation-Id") ?? undefined,
  };
}

export function rebuildResponse(response: BufferedResponse): Response {
  const { status, statusText, headers, text } = response;
  const body = status === 204 || status === 205 || status === 304 ? null : new TextEncoder().encode(text);
  return new Response(body, { status, statusText, headers });
}

function mediaType(response: ResponseMetadata): string {
  return (response.headers.get("Content-Type") ?? "").split(";")[0]!.trim().toLowerCase();
}

export function isObject(value: JsonValue | undefined): value is JsonObject {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function parseJson(text: string): JsonValue | undefined {
  try {
    return JSON.parse(text) as JsonValue;
  } catch {
    return undefined;
  }
}

export function retryAfterHeader(value: string | null): number | undefined {
  if (value === null || value.trim() === "") return undefined;
  if (/^\d+$/.test(value.trim())) return Number(value.trim()) * 1000;
  const at = Date.parse(value);
  return Number.isNaN(at) ? undefined : Math.max(0, at - Date.now());
}

function readViolations(value: JsonValue | undefined): Violation[] {
  if (!Array.isArray(value)) return [];
  const violations: Violation[] = [];
  for (const field of value as readonly JsonValue[]) {
    if (!isObject(field) || typeof field.rule !== "string" || typeof field.detail !== "string") continue;
    const { pointer, parameter, params } = field;
    violations.push({
      rule: field.rule,
      detail: field.detail,
      ...(typeof pointer === "string" ? { pointer } : {}),
      ...(isObject(parameter) && typeof parameter.in === "string" && typeof parameter.name === "string"
        ? { parameter: { in: parameter.in, name: parameter.name } } : {}),
      ...(isObject(params) ? { params } : {}),
    });
  }
  return violations;
}

export function failure(response: ResponseMetadata, text: string, context: ErrorContext) {
  const parsed = mediaType(response) === "application/problem+json" ? parseJson(text) : undefined;
  const problem = isObject(parsed) && parsed.status === response.status &&
    typeof parsed.code === "string" && parsed.code !== "" && typeof parsed.title === "string" &&
    (parsed.retryable === undefined || typeof parsed.retryable === "boolean") ? parsed : undefined;
  const headerWait = retryAfterHeader(response.headers.get("Retry-After"));
  const hint = problem?.retry_after_ms;
  const bodyWait = typeof hint === "number" && Number.isSafeInteger(hint) && hint >= 0 ? hint : undefined;
  const wait = headerWait === undefined ? bodyWait : Math.max(headerWait, bodyWait ?? 0);
  const record = problem?.record;
  return httpError({
    ...response,
    ...(typeof problem?.code === "string" ? { code: problem.code } : {}),
    ...(typeof problem?.title === "string" ? { title: problem.title } : {}),
    ...(typeof problem?.detail === "string" ? { detail: problem.detail } : {}),
    details: problem?.details,
    violations: readViolations(problem?.errors),
    record: isObject(record) && typeof record.kind === "string" && typeof record.id === "string" && UUID.test(record.id)
      ? { kind: record.kind, id: record.id } : undefined,
    problem,
    body: problem === undefined ? text : undefined,
    retryable: problem?.retryable === true,
    retryAfterMs: wait,
  }, context);
}

export function success(op: Operation, response: BufferedResponse, invalid: (message: string) => InvalidResponseError): unknown {
  if (response.status !== op.success.status) throw invalid(`expected HTTP ${op.success.status}`);
  if (op.success.body === "none") return undefined;

  const type = mediaType(response);
  if (type !== "application/json") throw invalid(`unexpected content type "${type}"`);
  const body = parseJson(response.text);
  if (!isObject(body) || body.status !== "success") throw invalid('expected a JSON object with status "success"');
  const missing = op.success.required.find((member) => !Object.hasOwn(body, member));
  if (missing !== undefined) throw invalid(`success body lacks "${missing}"`);

  const result = op.result;
  switch (result.kind) {
    case "void":
      return undefined;
    case "resource": {
      const resource = body[result.key];
      if (!isObject(resource)) throw invalid(`"${result.key}" is not an object`);
      return resource;
    }
    case "page": {
      const page = body[result.key];
      const { itemsField, hasNextPageField } = result.pagination;
      if (!itemsField || !hasNextPageField || !isObject(page) || !Array.isArray(page[itemsField]) ||
        typeof page[hasNextPageField] !== "boolean") {
        throw invalid("page lacks an item array or a boolean continuation flag");
      }
      return page;
    }
    case "object": {
      const { status: _status, ...fields } = body;
      return fields;
    }
  }
}
