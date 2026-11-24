import { ApiError, detailsMatch } from "./errors.js";
import * as crm from "./generated/crm/v1/index.js";
import * as crmErrors from "./generated/crm/v1/errors.js";
import * as identity from "./generated/identity/v1/index.js";
import * as identityErrors from "./generated/identity/v1/errors.js";
import type { Operation, ProblemInfo } from "./generated/operation.js";
import * as whatsapp from "./generated/whatsapp/v1/index.js";
import * as whatsappErrors from "./generated/whatsapp/v1/errors.js";
import { isBrowserLike } from "./runtime.js";
import { invoke, type CallOptions, type Credential, type TransportConfig } from "./transport.js";

/** Options of createClient. */
export interface ClientOptions {
  /** An organization API key. Server-side only; see dangerouslyAllowBrowser. */
  readonly apiKey?: string;
  /** Returns the current access token; called before each call and once more after a 401. */
  readonly token?: () => string | Promise<string>;
  /** The fetch implementation. Defaults to globalThis.fetch. */
  readonly fetch?: typeof globalThis.fetch;
  /** Base URL per service, e.g. { crm: "https://api.gatherdeal.ai/crm" }. */
  readonly baseUrl?: { readonly crm?: string; readonly identity?: string; readonly whatsapp?: string };
  /** Additional attempts after the first for retryable failures. Default 2. */
  readonly retries?: number;
  /** Time limit of each attempt in milliseconds. Default 30000. */
  readonly timeoutMs?: number;
  /** Allows apiKey in a browser, where any visitor can read it. */
  readonly dangerouslyAllowBrowser?: boolean;
}

type DetailsOf<PD, K> = K extends keyof PD ? PD[K] : unknown;

type Arguments<I> = {} extends I ? [input?: I, options?: CallOptions] : [input: I, options?: CallOptions];

/** A bound API operation. */
export interface Method<I, O, C extends string, PD> {
  (...args: Arguments<I>): Promise<O>;
  /** The generated descriptor of the operation. */
  readonly operation: Operation<I, O, C>;
  /** Narrows error to a problem this operation declares, optionally with the given code and its details. */
  isError(error: unknown): error is ApiError<C>;
  isError<K extends C>(error: unknown, code: K): error is ApiError<K, DetailsOf<PD, K>>;
}

/** Bound methods mirroring a generated operation tree. */
export type Methods<T, PD> = {
  readonly [K in keyof T]: T[K] extends Operation<infer I, infer O, infer C> ? Method<I, O, C, PD> : Methods<T[K], PD>;
};

/** The methods of one API service plus its problem guard. */
export type ServiceClient<T, Code extends string, PD> = Methods<T, PD> & {
  /** Narrows error to a problem from an operation of this service, optionally with the given code and its details. */
  isError(error: unknown): error is ApiError;
  isError<K extends Code>(error: unknown, code: K): error is ApiError<K, DetailsOf<PD, K>>;
};

/** A GatherDeal API client. */
export interface Client {
  readonly crm: ServiceClient<typeof crm.operations, crmErrors.ProblemCode, crmErrors.ProblemDetails>;
  readonly identity: ServiceClient<
    typeof identity.operations,
    identityErrors.ProblemCode,
    identityErrors.ProblemDetails
  >;
  readonly whatsapp: ServiceClient<
    typeof whatsapp.operations,
    whatsappErrors.ProblemCode,
    whatsappErrors.ProblemDetails
  >;
}

type AnyOperation = Operation<unknown, unknown, string>;
type ProblemTable = Readonly<Record<string, ProblemInfo>>;

function isOperation(value: unknown): value is AnyOperation {
  return typeof value === "object" && value !== null && typeof (value as { id?: unknown }).id === "string";
}

function bindTree(
  tree: object,
  config: TransportConfig,
  baseUrl: string,
  problems: ProblemTable,
): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(tree)) {
    if (!isOperation(value)) {
      out[key] = bindTree(value as object, config, baseUrl, problems);
      continue;
    }
    const op = value;
    const method = (input?: Record<string, unknown>, options?: CallOptions) =>
      invoke(config, op, baseUrl, input ?? {}, options);
    method.operation = op;
    method.isError = (error: unknown, code?: string) =>
      error instanceof ApiError &&
      error.operation === op.id &&
      op.errors.includes(error.code) &&
      (code === undefined || (error.code === code && detailsMatch(problems[code], error.details)));
    out[key] = Object.freeze(method);
  }
  return Object.freeze(out);
}

function bindService(
  name: string,
  tree: object,
  defaultBaseUrl: string,
  problems: ProblemTable,
  config: TransportConfig,
  baseUrl: string | undefined,
): unknown {
  const methods = bindTree(tree, config, baseUrl ?? defaultBaseUrl, problems);
  return Object.freeze({
    ...methods,
    isError: (error: unknown, code?: string) =>
      error instanceof ApiError &&
      error.operation.startsWith(`${name}.`) &&
      (code === undefined || (error.code === code && detailsMatch(problems[code], error.details))),
  });
}

/**
 * Creates a client. Pass apiKey (server-side) or token, or neither for
 * operations that admit anonymous callers.
 */
export function createClient(options: ClientOptions = {}): Client {
  if (options.apiKey !== undefined && options.token !== undefined) {
    throw new TypeError("createClient: pass apiKey or token, not both");
  }
  if (options.apiKey !== undefined && options.apiKey === "") {
    throw new TypeError("createClient: apiKey is empty");
  }
  if (options.apiKey !== undefined && isBrowserLike() && options.dangerouslyAllowBrowser !== true) {
    throw new Error(
      "createClient: an API key in a browser is readable by every visitor. " +
        "Call the API from your server, or use a per-user token. " +
        "Set dangerouslyAllowBrowser: true to override.",
    );
  }
  const credential: Credential =
    options.apiKey !== undefined
      ? { kind: "apiKey", apiKey: options.apiKey }
      : options.token !== undefined
        ? { kind: "token", token: options.token }
        : { kind: "none" };
  const fetchImpl = options.fetch;
  const config: TransportConfig = {
    fetch: (input, init) => (fetchImpl === undefined ? globalThis.fetch(input, init) : fetchImpl(input, init)),
    credential,
    retries: options.retries ?? 2,
    timeoutMs: options.timeoutMs ?? 30_000,
  };
  const base = options.baseUrl ?? {};
  return Object.freeze({
    crm: bindService("crm", crm.operations, crm.service.baseURL, crmErrors.problems, config, base.crm),
    identity: bindService(
      "identity",
      identity.operations,
      identity.service.baseURL,
      identityErrors.problems,
      config,
      base.identity,
    ),
    whatsapp: bindService(
      "whatsapp",
      whatsapp.operations,
      whatsapp.service.baseURL,
      whatsappErrors.problems,
      config,
      base.whatsapp,
    ),
  }) as Client;
}
