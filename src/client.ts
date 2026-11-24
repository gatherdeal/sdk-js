import { ApiError, detailsMatch } from "./errors.js";
import * as crm from "./generated/crm/v1/index.js";
import * as crmErrors from "./generated/crm/v1/errors.js";
import * as identity from "./generated/identity/v1/index.js";
import * as identityErrors from "./generated/identity/v1/errors.js";
import type { Operation, ProblemInfo } from "./generated/operation.js";
import * as whatsapp from "./generated/whatsapp/v1/index.js";
import * as whatsappErrors from "./generated/whatsapp/v1/errors.js";
import { deepFreeze, isBrowserLike } from "./runtime.js";
import {
  checkRetries,
  checkTimeout,
  invoke,
  isHeaderToken,
  type CallOptions,
  type Credential,
  type TransportConfig,
} from "./transport.js";

/** Options of createClient. */
export interface ClientOptions {
  /** An organization API key. Server-side only; see dangerouslyAllowBrowser. */
  readonly apiKey?: string;
  /** Returns the current access token; called before each call and once more after a 401. */
  readonly token?: () => string | Promise<string>;
  /** The fetch implementation. Defaults to globalThis.fetch. */
  readonly fetch?: typeof globalThis.fetch;
  /** Absolute https base URL per service, e.g. { crm: "https://api.gatherdeal.ai/crm" }. */
  readonly baseUrl?: { readonly crm?: string; readonly identity?: string; readonly whatsapp?: string };
  /** Allows http base URLs on a loopback host (localhost, 127.0.0.0/8, [::1]). */
  readonly allowLoopbackHttp?: boolean;
  /** Additional attempts after the first for retryable failures. Default 2. */
  readonly retries?: number;
  /** Time limit of each call in milliseconds, retries and token refresh included. Default 60000. */
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
      invoke(config, op, problems, baseUrl, input ?? {}, options);
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

interface ServiceDefinition {
  readonly name: ServiceName;
  readonly operations: object;
  readonly baseUrl: string;
  readonly problems: ProblemTable;
}

type ServiceName = "crm" | "identity" | "whatsapp";

const SERVICES: readonly ServiceDefinition[] = deepFreeze([
  { name: "crm", operations: crm.operations, baseUrl: crm.service.baseURL, problems: crmErrors.problems },
  {
    name: "identity",
    operations: identity.operations,
    baseUrl: identity.service.baseURL,
    problems: identityErrors.problems,
  },
  {
    name: "whatsapp",
    operations: whatsapp.operations,
    baseUrl: whatsapp.service.baseURL,
    problems: whatsappErrors.problems,
  },
]);

function isLoopback(hostname: string): boolean {
  return hostname === "localhost" || hostname === "[::1]" || /^127\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(hostname);
}

function checkBaseUrl(service: string, value: unknown, allowLoopbackHttp: boolean): string {
  const where = `createClient: baseUrl.${service}`;
  if (typeof value !== "string") throw new TypeError(`${where} must be a string`);
  let url: URL;
  try {
    url = new URL(value);
  } catch {
    throw new TypeError(`${where} must be an absolute URL`);
  }
  if (url.username !== "" || url.password !== "" || url.search !== "" || url.hash !== "") {
    throw new TypeError(`${where} must not carry credentials, a query or a fragment`);
  }
  const secure = url.protocol === "https:";
  const loopback = url.protocol === "http:" && allowLoopbackHttp && isLoopback(url.hostname);
  if (!secure && !loopback) {
    throw new TypeError(`${where} must use https; http is allowed only for a loopback host with allowLoopbackHttp`);
  }
  return url.href.replace(/\/+$/, "");
}

function bindService(definition: ServiceDefinition, config: TransportConfig, baseUrl: string): unknown {
  const { name, problems } = definition;
  const methods = bindTree(definition.operations, config, baseUrl, problems);
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
  if (options.apiKey !== undefined && !isHeaderToken(options.apiKey)) {
    throw new TypeError("createClient: apiKey must be a non-empty string of visible ASCII characters");
  }
  if (options.token !== undefined && typeof options.token !== "function") {
    throw new TypeError("createClient: token must be a function");
  }
  if (options.apiKey !== undefined && isBrowserLike() && options.dangerouslyAllowBrowser !== true) {
    throw new Error(
      "createClient: an API key in a browser is readable by every visitor. " +
        "Call the API from your server, or use a per-user token. " +
        "Set dangerouslyAllowBrowser: true to override.",
    );
  }
  const retries = options.retries ?? 2;
  checkRetries(retries, "createClient");
  const timeoutMs = options.timeoutMs ?? 60_000;
  checkTimeout(timeoutMs, "createClient");
  const overrides: Readonly<Record<string, unknown>> = options.baseUrl ?? {};
  for (const key of Object.keys(overrides)) {
    if (!SERVICES.some((s) => s.name === key)) throw new TypeError(`createClient: unknown service baseUrl.${key}`);
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
    retries,
    timeoutMs,
  };
  const client: Record<string, unknown> = {};
  for (const definition of SERVICES) {
    const override = overrides[definition.name];
    const baseUrl =
      override === undefined
        ? definition.baseUrl
        : checkBaseUrl(definition.name, override, options.allowLoopbackHttp === true);
    client[definition.name] = bindService(definition, config, baseUrl);
  }
  return Object.freeze(client) as unknown as Client;
}
