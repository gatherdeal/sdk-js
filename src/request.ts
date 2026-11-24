import type { Operation, Parameter } from "./generated/operation.js";
import { base64UrlJson } from "./runtime.js";

/** The serialized request of one call; every attempt sends exactly these values. */
export interface SerializedRequest {
  readonly method: string;
  readonly url: string;
  readonly headers: Readonly<Record<string, string>>;
  readonly body: string | undefined;
}

type AnyOperation = Operation<unknown, unknown, string>;

function scalar(op: AnyOperation, p: Parameter, value: unknown): string {
  if (typeof value === "string") return value;
  if (typeof value === "number" || typeof value === "boolean") return JSON.stringify(value);
  throw new TypeError(`${op.id}: ${p.member} must be a string, number or boolean`);
}

function encode(op: AnyOperation, p: Parameter, value: unknown): string[] {
  switch (p.encoding) {
    case "scalar":
      return [scalar(op, p, value)];
    case "repeated":
      if (!Array.isArray(value)) throw new TypeError(`${op.id}: ${p.member} must be an array`);
      return value.map((item) => scalar(op, p, item));
    case "base64url-json":
      return [base64UrlJson(value)];
    case "json":
      return [JSON.stringify(value)];
    default:
      throw new TypeError(`${op.id}: unsupported encoding of ${p.member}`);
  }
}

/**
 * Builds the request of op from a flat input object: parameters go to the
 * path, query or headers as their descriptor says, and every other defined
 * member forms the JSON body. Parameters that are undefined or null and body
 * members that are undefined are omitted.
 */
export function serializeRequest(
  op: AnyOperation,
  input: Readonly<Record<string, unknown>>,
  baseUrl: string,
): SerializedRequest {
  const headers: Record<string, string> = {};
  const query = new URLSearchParams();
  let path = op.path;
  const parameterMembers = new Set<string>();

  for (const p of op.parameters) {
    parameterMembers.add(p.member);
    const value = input[p.member];
    if (value === undefined || value === null) {
      if (p.required) throw new TypeError(`${op.id}: ${p.member} is required`);
      continue;
    }
    const encoded = encode(op, p, value);
    switch (p.in) {
      case "path":
        path = path.replace(`{${p.name}}`, encodeURIComponent(encoded[0]!));
        break;
      case "query":
        for (const v of encoded) query.append(p.name, v);
        break;
      case "header":
        headers[p.name] = encoded[0]!;
        break;
    }
  }

  const body: Record<string, unknown> = {};
  let hasBody = false;
  for (const [member, value] of Object.entries(input)) {
    if (parameterMembers.has(member) || value === undefined) continue;
    body[member] = value;
    hasBody = true;
  }
  if (op.body === "none" && hasBody) {
    throw new TypeError(`${op.id}: unknown input member ${Object.keys(body)[0]}`);
  }
  const sendBody = op.body === "required" || hasBody;
  if (sendBody) headers["Content-Type"] = "application/json";

  const qs = query.toString();
  return {
    method: op.method,
    url: baseUrl.replace(/\/+$/, "") + path + (qs === "" ? "" : `?${qs}`),
    headers,
    body: sendBody ? JSON.stringify(body) : undefined,
  };
}
