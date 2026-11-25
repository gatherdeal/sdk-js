// Generated from the GatherDeal public API contracts. Do not edit.

/**
 * Descriptor types of the generated operations.
 *
 * A generated operation is data: the runtime builds the request from its
 * descriptor and the call arguments.
 */

/** How a parameter value travels. */
export type ParameterEncoding =
  /** One value: strings as is, numbers and booleans as their JSON text. */
  | "scalar"
  /** An array: one repeated query key per element. */
  | "repeated"
  /** The compact JSON text of the value, base64url encoded without padding. */
  | "base64url-json"
  /** The compact JSON text of the value. */
  | "json";

/** A request parameter, read from the input member of the same purpose. */
export interface Parameter {
  /** Name of the member in the params object. */
  readonly member: string;
  /** Name on the wire. */
  readonly name: string;
  readonly in: "path" | "query";
  readonly required: boolean;
  readonly encoding: ParameterEncoding;
}

/** Adaptive pagination of a list operation: parameter and field names. */
export interface Pagination {
  readonly pageParam: string;
  readonly pageSizeParam: string;
  readonly afterParam: string;
  readonly beforeParam: string;
  readonly totalParam: string;
  readonly defaultPageSize: number;
  readonly maxPageSize: number;
  readonly maxOffset: number;
  /** Member of the success body that holds the page. */
  readonly resultField: string;
  readonly itemsField: string;
  readonly pageField: string;
  readonly pageSizeField: string;
  readonly hasNextPageField: string;
  readonly hasPrevPageField: string;
  readonly nextCursorField: string;
  readonly prevCursorField: string;
  readonly totalItemsField: string;
  readonly totalPagesField: string;
}

/** JSON value kinds a problem detail field may have. */
export type JsonKind = "string" | "number" | "boolean" | "array" | "object" | "null";

/** A problem code of a service. */
export interface ProblemInfo {
  readonly status: number;
  readonly retryable: boolean;
  /** Required detail fields and their accepted kinds; absent for a code without details. */
  readonly details?: Readonly<Record<string, readonly JsonKind[]>>;
}

/** One API operation with its call signature carried for typing. */
export interface Operation<Args extends readonly unknown[] = readonly unknown[], Result = unknown, Code extends string = string> {
  readonly id: string;
  readonly method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  readonly path: string;
  /** Path parameter passed as the first argument when present. */
  readonly positional?: string;
  readonly parameters: readonly Parameter[];
  readonly body: "none" | "optional" | "required";
  readonly success: { readonly status: number; readonly body: "json" | "none"; readonly required: readonly string[] };
  readonly result:
    | { readonly kind: "void" }
    | { readonly kind: "resource"; readonly key: string }
    | { readonly kind: "page"; readonly key: string; readonly pagination: Pagination }
    | { readonly kind: "object" };
  readonly idempotency: "safe" | "keyed" | "none";
  readonly conditional?: { readonly read: string };
  readonly authentication: "required" | "optional";
  readonly organizationKeys: boolean;
  readonly errors: readonly Code[];
  readonly "~types"?: { readonly args: Args; readonly result: Result };
}

/** Options for a single request. */
export interface RequestOptions {
  signal?: AbortSignal;
  timeout?: number;
  maxRetries?: number;
  headers?: Record<string, string | null>;
}

/** Options for an operation that accepts an idempotency key. */
export interface KeyedRequestOptions extends RequestOptions { idempotencyKey?: string }

/** Options for a write requiring a revision from a read. */
export interface ConditionalRequestOptions extends RequestOptions { ifMatch: string }

/** The params slot of an operation without request members. */
export type EmptyParams = Record<string, never>;

/** A response promise exposing the HTTP response alongside its typed result. */
export interface APIPromise<T> extends Promise<T> {
  asResponse(): Promise<Response>;
  withResponse(): Promise<{ data: T; response: Response; requestID: string | undefined }>;
}

/** One page of results and methods to continue the request. */
export interface Page<T> extends AsyncIterable<T> {
  readonly data: T[];
  readonly has_next_page: boolean;
  readonly has_prev_page: boolean;
  readonly next_cursor?: string;
  readonly prev_cursor?: string;
  readonly page?: number;
  readonly page_size: number;
  readonly total_items?: number;
  readonly total_pages?: number;
  hasNextPage(): boolean;
  getNextPage(): Promise<Page<T>>;
  iterPages(): AsyncIterable<Page<T>>;
}

/** An awaitable first page that also iterates over individual results. */
export interface PagePromise<T> extends APIPromise<Page<T>>, AsyncIterable<T> {}

/** The HTTP error fields refined by a generated guard. */
export interface APIErrorShape<Code extends string = string, Details = unknown> extends Error {
  readonly status: number;
  readonly headers: Headers;
  readonly requestID: string | undefined;
  readonly code?: Code;
  readonly details: Details;
}

/** Narrows an HTTP error to codes and details declared by an operation. */
export interface ErrorGuard<Code extends string, PD> {
  isError(error: unknown): error is APIErrorShape<Code>;
  isError<K extends Code>(error: unknown, code: K): error is APIErrorShape<K, K extends keyof PD ? PD[K] : unknown>;
}

/** The callable signature and error guard of an operation descriptor. */
export type Method<O, PD> = O extends Operation<infer A, infer R, infer C> ? ((...args: A) => R) & ErrorGuard<C, PD> : never;

/** Maps a descriptor tree to the SDK's method namespaces. */
export type Methods<T, PD> = { readonly [K in keyof T]: T[K] extends Operation ? Method<T[K], PD> : Methods<T[K], PD> };

/** Shared delegated-access problem codes. */
export const delegatedAccessCodes = [
  "DELEGATED_ACCESS_AUDIENCE_MISMATCH",
  "DELEGATED_ACCESS_CREDENTIAL_LOCATION",
  "DELEGATED_ACCESS_EFFECT_NOT_ALLOWED",
  "DELEGATED_ACCESS_EXPANSION_NOT_ALLOWED",
  "DELEGATED_ACCESS_FEATURE_NOT_ENTITLED",
  "DELEGATED_ACCESS_FILTER_NOT_ALLOWED",
  "DELEGATED_ACCESS_IMPERSONATION_NOT_ALLOWED",
  "DELEGATED_ACCESS_INACTIVE",
  "DELEGATED_ACCESS_KIND_NOT_ALLOWED",
  "DELEGATED_ACCESS_ORGANIZATION_KEY_NOT_ADMITTED",
  "DELEGATED_ACCESS_ORGANIZATION_MISMATCH",
  "DELEGATED_ACCESS_OUTLET_NOT_ALLOWED",
  "DELEGATED_ACCESS_PERMISSION_DENIED",
  "DELEGATED_ACCESS_PRINCIPAL_INACTIVE",
  "DELEGATED_ACCESS_ROUTE_NOT_ALLOWED",
  "DELEGATED_ACCESS_TARGET_MISMATCH",
  "DELEGATED_ACCESS_UNSUPPORTED",
] as const;

/** A problem code shared by delegated-access operations. */
export type DelegatedAccessErrorCode = typeof delegatedAccessCodes[number];
