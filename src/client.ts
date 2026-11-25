import { bindService } from "./bind.js";
import type * as crm from "./crm.js";
import type { ErrorGuard, Methods } from "./generated/operation.js";
import type * as identity from "./identity.js";
import { operations, problems, service } from "./internal.js";
import { isBrowserLike, readAPIKey } from "./runtime.js";
import { checkRetries, checkTimeout, isHeaderToken, MAX_KEY_LENGTH, type TransportConfig } from "./transport.js";
import { VERSION } from "./version.js";
import type * as whatsapp from "./whatsapp.js";

type ServiceName = keyof typeof service;
type ServiceClient<T, Code extends string, PD> = Methods<T, PD> & ErrorGuard<Code, PD>;
type HeaderOptions = Record<string, string | null>;

/** Options for a GatherDeal client. */
export interface ClientOptions {
  /** Organization API key. Pass null to call anonymously. */
  apiKey?: string | null;
  /** A bearer token or a provider called again after an eligible 401. */
  accessToken?: string | (() => string | Promise<string>);
  /** Root URL. The SDK appends the service name. */
  baseURL?: string;
  /** Complete base URLs for individual services. */
  serviceBaseURLs?: Partial<Record<ServiceName, string>>;
  /** Allow HTTP on hosts other than loopback. */
  allowInsecureHttp?: boolean;
  /** Timeout in milliseconds per attempt. Defaults to 60,000. */
  timeout?: number;
  /** Additional attempts after the first. Defaults to 2. */
  maxRetries?: number;
  fetch?: typeof globalThis.fetch;
  /** Headers sent by default. A null value removes the inherited header. */
  defaultHeaders?: HeaderOptions;
  /** Allow an API key in browsers, where visitors can read it. */
  dangerouslyAllowBrowser?: boolean;
}

type Credential = { apiKey: string | null } | { accessToken: NonNullable<ClientOptions["accessToken"]> };

function explicitCredential({ apiKey, accessToken }: ClientOptions): Credential | undefined {
  if (apiKey !== undefined && accessToken !== undefined) {
    throw new TypeError("GatherDeal: apiKey and accessToken cannot be used together");
  }
  if (apiKey !== undefined) return { apiKey };
  if (accessToken !== undefined) return { accessToken };
  return undefined;
}

function resolveCredential(options: ClientOptions): Credential {
  const credential = explicitCredential(options);
  if (credential !== undefined) return credential;
  const apiKey = readAPIKey();
  if (!apiKey) {
    throw new Error("GatherDeal: set apiKey, accessToken or GATHERDEAL_API_KEY, or pass apiKey: null for anonymous access");
  }
  return { apiKey };
}

function authorizationFor(credential: Credential, allowBrowserKey: boolean): Pick<TransportConfig, "authorization" | "accessToken"> {
  if ("accessToken" in credential) {
    const { accessToken } = credential;
    if (typeof accessToken === "function") return { accessToken };
    if (!isHeaderToken(accessToken)) throw new TypeError("GatherDeal: accessToken must be a bearer token or a provider");
    return { authorization: `Bearer ${accessToken}` };
  }

  const { apiKey } = credential;
  if (apiKey === null) return {};
  if (!isHeaderToken(apiKey) || apiKey.length > MAX_KEY_LENGTH) {
    throw new TypeError(`GatherDeal: apiKey must be 1 to ${MAX_KEY_LENGTH} visible ASCII characters without spaces`);
  }
  if (!allowBrowserKey && isBrowserLike()) {
    throw new Error("GatherDeal: an API key in a browser is readable by every visitor. Use accessToken or set dangerouslyAllowBrowser: true");
  }
  return { authorization: `Bearer ${apiKey}` };
}

const managedHeaders = new Set([
  "authorization", "idempotency-key", "if-match", "content-type", "x-gatherdeal-client", "user-agent",
]);

function mergeHeaders(headers: Headers, overrides: HeaderOptions | undefined): Headers {
  const result = new Headers(headers);
  for (const [name, value] of Object.entries(overrides ?? {})) {
    if (managedHeaders.has(name.toLowerCase())) throw new TypeError(`GatherDeal: ${name} is an SDK-managed header`);
    if (value === null) result.delete(name);
    else result.set(name, value);
  }
  return result;
}

function isLoopback(hostname: string): boolean {
  return hostname === "localhost" || hostname === "[::1]" || /^127\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(hostname);
}

function checkBaseURL(where: string, value: string, allowInsecureHttp: boolean): string {
  if (typeof value !== "string") throw new TypeError(`GatherDeal: ${where} must be a string`);
  const authority = /^[a-z][a-z\d+.-]*:\/\/([^/?#\\]+)/i.exec(value.trim())?.[1];
  if (authority === undefined || /[\u0000-\u001f\u007f\\]/.test(value)) {
    throw new TypeError(`GatherDeal: ${where} must be an absolute URL`);
  }
  const url = new URL(value);
  if (authority.includes("@") || /[?#]/.test(value)) {
    throw new TypeError(`GatherDeal: ${where} must not carry credentials, a query or a fragment`);
  }
  if (url.protocol !== "https:" && !(url.protocol === "http:" && (allowInsecureHttp || isLoopback(url.hostname)))) {
    throw new TypeError(`GatherDeal: ${where} must use https; non-loopback http requires allowInsecureHttp`);
  }
  return url.href.replace(/\/+$/, "");
}

export class GatherDeal {
  readonly crm: ServiceClient<typeof operations.crm, crm.ProblemCode, crm.ProblemDetails>;
  readonly identity: ServiceClient<typeof operations.identity, identity.ProblemCode, identity.ProblemDetails>;
  readonly whatsapp: ServiceClient<typeof operations.whatsapp, whatsapp.ProblemCode, whatsapp.ProblemDetails>;

  readonly #options: Omit<ClientOptions, "apiKey" | "accessToken" | "defaultHeaders">;
  readonly #credential: Credential;
  readonly #defaultHeaders: Headers;

  constructor(options: ClientOptions = {}) {
    const { apiKey, accessToken, defaultHeaders, serviceBaseURLs, ...rest } = options;
    this.#credential = resolveCredential(options);
    this.#defaultHeaders = mergeHeaders(new Headers(), defaultHeaders);
    this.#options = { ...rest, ...(serviceBaseURLs === undefined ? {} : { serviceBaseURLs: { ...serviceBaseURLs } }) };

    const authorization = authorizationFor(this.#credential, options.dangerouslyAllowBrowser === true);
    const maxRetries = options.maxRetries ?? 2;
    const timeout = options.timeout ?? 60_000;
    checkRetries(maxRetries, "GatherDeal");
    checkTimeout(timeout, "GatherDeal");

    const allowInsecureHttp = options.allowInsecureHttp === true;
    const root = options.baseURL === undefined ? undefined : checkBaseURL("baseURL", options.baseURL, allowInsecureHttp);
    const overrides = this.#options.serviceBaseURLs;
    for (const name of Object.keys(overrides ?? {})) {
      if (!Object.hasOwn(service, name)) throw new TypeError(`GatherDeal: unknown serviceBaseURLs entry ${name}`);
    }
    const fetchImpl = options.fetch;
    const config: TransportConfig = {
      ...authorization,
      fetch: (input, init) => fetchImpl === undefined ? globalThis.fetch(input, init) : fetchImpl(input, init),
      maxRetries,
      timeout,
      requestHeaders: ({ headers }) => {
        const merged = mergeHeaders(this.#defaultHeaders, headers);
        merged.set("X-GatherDeal-Client", `sdk-js/${VERSION}`);
        if (!isBrowserLike()) merged.set("User-Agent", `GatherDeal/JS ${VERSION}`);
        return merged;
      },
    };
    const bindingFor = (name: ServiceName) => {
      const override = overrides?.[name];
      const baseUrl = override === undefined ?
        (root === undefined ? service[name].baseURL : `${root}/${name}`) :
        checkBaseURL(`serviceBaseURLs.${name}`, override, allowInsecureHttp);
      return { config, baseUrl, problems: problems[name] };
    };
    this.crm = bindService<typeof operations.crm, crm.ProblemCode, crm.ProblemDetails>(
      operations.crm, "crm", bindingFor("crm"),
    );
    this.identity = bindService<typeof operations.identity, identity.ProblemCode, identity.ProblemDetails>(
      operations.identity, "identity", bindingFor("identity"),
    );
    this.whatsapp = bindService<typeof operations.whatsapp, whatsapp.ProblemCode, whatsapp.ProblemDetails>(
      operations.whatsapp, "whatsapp", bindingFor("whatsapp"),
    );
  }

  withOptions(options: Partial<ClientOptions>): GatherDeal {
    const { apiKey, accessToken, defaultHeaders, ...overrides } = options;
    const credential = explicitCredential(options) ?? this.#credential;
    const merged = mergeHeaders(this.#defaultHeaders, defaultHeaders);
    const headers: HeaderOptions = Object.create(null);
    merged.forEach((value, name) => { headers[name] = value; });
    return new GatherDeal({ ...this.#options, ...overrides, ...credential, defaultHeaders: headers });
  }
}

export default GatherDeal;
