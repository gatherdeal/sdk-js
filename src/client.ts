import { bindService } from "./bind.js";
import * as identity from "./generated/identity/v1/index.js";
import * as identityErrors from "./generated/identity/v1/errors.js";
import type { ErrorGuard, Methods } from "./generated/operation.js";
import { deepFreeze, isBrowserLike } from "./runtime.js";
import { checkRetries, checkTimeout, isHeaderToken, type TransportConfig } from "./transport.js";

/** Options of createClient. */
export interface ClientOptions {
  /** An organization API key. Server-side only; see dangerouslyAllowBrowser. */
  readonly apiKey?: string;
  /** Returns the current access token; called before each call and once more after a 401. */
  readonly token?: () => string | Promise<string>;
  /** The fetch implementation. Defaults to globalThis.fetch. */
  readonly fetch?: typeof globalThis.fetch;
  /** Absolute https base URL per service, e.g. { identity: "https://api.gatherdeal.ai/identity" }. */
  readonly baseUrl?: { readonly identity?: string };
  /** Allows http base URLs on a loopback host (localhost, 127.0.0.0/8, [::1]). */
  readonly allowLoopbackHttp?: boolean;
  /** Additional attempts after the first for retryable failures. Default 2. */
  readonly retries?: number;
  /** Time limit of each attempt in milliseconds. Default 60000. */
  readonly timeoutMs?: number;
  /** Allows apiKey in a browser, where any visitor can read it. */
  readonly dangerouslyAllowBrowser?: boolean;
}

export type ServiceClient<T, Code extends string, PD> = Methods<T, PD> & ErrorGuard<Code, PD>;

export interface Client {
  readonly identity: ServiceClient<typeof identity.operations, identityErrors.ProblemCode, identityErrors.ProblemDetails>;
}

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
  for (const key of Object.keys(options.baseUrl ?? {})) {
    if (key !== "identity") throw new TypeError(`createClient: unknown service baseUrl.${key}`);
  }
  const fetchImpl = options.fetch;
  const config: TransportConfig = {
    fetch: (input, init) => (fetchImpl === undefined ? globalThis.fetch(input, init) : fetchImpl(input, init)),
    ...(options.apiKey === undefined ? {} : { authorization: `Bearer ${options.apiKey}` }),
    ...(options.token === undefined ? {} : { accessToken: options.token }),
    maxRetries: retries,
    timeout: timeoutMs,
  };
  const baseUrl = options.baseUrl?.identity === undefined ? identity.service.baseURL :
    checkBaseUrl("identity", options.baseUrl.identity, options.allowLoopbackHttp === true);
  return Object.freeze({
    identity: bindService<typeof identity.operations, identityErrors.ProblemCode, identityErrors.ProblemDetails>(
      identity.operations, "identity", { config, baseUrl, problems: deepFreeze(identityErrors.problems) },
    ),
  });
}
