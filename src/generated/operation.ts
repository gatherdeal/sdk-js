// Generated from the GatherDeal public API contracts. Do not edit.

/**
 * Descriptor types of the generated operations.
 *
 * A generated operation is data: the runtime builds the request from its
 * descriptor and the caller's flat input object.
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
  /** Name of the member in the flat input object. */
  readonly member: string;
  /** Name on the wire. */
  readonly name: string;
  readonly in: "path" | "query" | "header";
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

/** Where a conditional write finds the revision it sends as If-Match. */
export interface IfMatchSource {
  /** Public id of the read operation. */
  readonly operation: string;
  /** JSON pointer of the revision in the read's success body. */
  readonly pointer: string;
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

/**
 * One API operation. Input, Output and Code are carried for typing only.
 *
 * Members of the input that are not parameters form the JSON request body.
 */
export interface Operation<Input, Output, Code extends string> {
  /** Public id, e.g. "crm.contacts.list". */
  readonly id: string;
  readonly method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  /** Path template relative to the service base URL, e.g. "/v1/contacts/{id}". */
  readonly path: string;
  readonly parameters: readonly Parameter[];
  /** The success response: its status, whether it has a JSON body, and the top-level members that body requires. */
  readonly success: {
    readonly status: number;
    readonly body: "json" | "none";
    readonly required: readonly string[];
  };
  readonly body: "none" | "optional" | "required";
  /**
   * "safe": repeating the request has no further effect. "keyed": the
   * request carries an Idempotency-Key. "none": a repeat may apply twice.
   */
  readonly idempotency: "safe" | "keyed" | "none";
  /** "optional": anonymous callers are admitted too. */
  readonly authentication: "required" | "optional";
  /** Whether organization API keys are admitted. */
  readonly organizationKeys: boolean;
  readonly pagination?: Pagination;
  readonly ifMatch?: IfMatchSource;
  /** Problem codes the operation declares. */
  readonly errors: readonly Code[];
  readonly "~types"?: { readonly input: Input; readonly output: Output };
}
