import type { Operation, Parameter } from "./generated/operation.js";
import { base64UrlJson } from "./runtime.js";

/** The serialized request of one call; every attempt sends exactly these values. */
export interface SerializedRequest {
  readonly method: string;
  readonly url: string;
  readonly headers: Readonly<Record<string, string>>;
  readonly body: string | undefined;
}


function scalar(op: Operation, member: string, value: unknown): string {
  if (typeof value === "string") return value;
  if (typeof value === "number" || typeof value === "boolean") return JSON.stringify(value);
  throw new TypeError(`${op.id}: ${member} must be a string, number or boolean`);
}

function encode(op: Operation, p: Parameter, value: unknown): string[] {
  switch (p.encoding) {
    case "scalar":
      return [scalar(op, p.member, value)];
    case "repeated":
      if (!Array.isArray(value)) throw new TypeError(`${op.id}: ${p.member} must be an array`);
      return value.map((item) => scalar(op, p.member, item));
    case "base64url-json":
      return [base64UrlJson(value)];
    case "json":
      return [JSON.stringify(value)];
    default:
      throw new TypeError(`${op.id}: unsupported encoding of ${p.member}`);
  }
}

function replaceSegment(op: Operation, path: string, name: string, value: string): string {
  if (value === "" || value === "." || value === "..") {
    throw new TypeError(`${op.id}: ${name} must not be empty, "." or ".."`);
  }
  return path.replace(`{${name}}`, encodeURIComponent(value));
}

/**
 * Builds the request from params and the optional positional argument: parameters go to the
 * path, query or headers as their descriptor says, and every other defined
 * member forms the JSON body. Parameters that are undefined or null and body
 * members that are undefined are omitted.
 */
export function serializeRequest(
  op: Operation,
  params: object,
  baseUrl: string,
  positional: unknown,
): SerializedRequest {
  const input = params as Readonly<Record<string, unknown>>;
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
    if (p.in === "path") {
      path = replaceSegment(op, path, p.name, encoded[0]!);
    } else {
      for (const v of encoded) query.append(p.name, v);
    }
  }
  if (op.positional !== undefined) {
    if (positional === undefined || positional === null) throw new TypeError(`${op.id}: ${op.positional} is required`);
    path = replaceSegment(op, path, op.positional, scalar(op, op.positional, positional));
  }

  const body: Record<string, unknown> = Object.create(null);
  let hasBody = false;
  for (const [member, value] of Object.entries(input)) {
    if (member === op.positional) throw new TypeError(`${op.id}: ${member} belongs in the positional argument`);
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
