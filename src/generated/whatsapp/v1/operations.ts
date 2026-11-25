// Generated from the GatherDeal public API contracts. Do not edit.

import type { APIPromise, ConditionalRequestOptions, DelegatedAccessErrorCode, EmptyParams, KeyedRequestOptions, Operation, PagePromise, RequestOptions } from "../../operation.js";
import { delegatedAccessCodes } from "../../operation.js";
import type * as T from "./types.js";

export type AgentCreateParams = T.CreateAgentParam;
export type AgentCreateErrorCode =
  | DelegatedAccessErrorCode
  | "BAD_REQUEST"
  | "CLIENT_UPGRADE_REQUIRED"
  | "CONFLICT"
  | "FORBIDDEN"
  | "IDEMPOTENCY_KEY_CONFLICT"
  | "IDEMPOTENCY_KEY_REQUIRED"
  | "INTERNAL_ERROR"
  | "UNAUTHORIZED"
  | "UNAVAILABLE"
  | "VALIDATION_FAILED"
  | "WHATSAPP_AGENTS_FENCED"
  | "WHATSAPP_AGENT_OUTLET_INVALID"
  | "WHATSAPP_AGENT_SLOT_LIMIT_REACHED"
  | "WHATSAPP_REGISTRATION_QUEUE_FULL";
export const agentsCreate = {
  id: "whatsapp.agents.create",
  method: "POST",
  path: "/v1/agents",
  parameters: [],
  body: "required",
  success: { status: 201, body: "json", required: ["agent", "status"] },
  result: { kind: "resource", key: "agent" },
  idempotency: "keyed",
  authentication: "required",
  organizationKeys: false,
  errors: [
    ...delegatedAccessCodes,
    "BAD_REQUEST",
    "CLIENT_UPGRADE_REQUIRED",
    "CONFLICT",
    "FORBIDDEN",
    "IDEMPOTENCY_KEY_CONFLICT",
    "IDEMPOTENCY_KEY_REQUIRED",
    "INTERNAL_ERROR",
    "UNAUTHORIZED",
    "UNAVAILABLE",
    "VALIDATION_FAILED",
    "WHATSAPP_AGENTS_FENCED",
    "WHATSAPP_AGENT_OUTLET_INVALID",
    "WHATSAPP_AGENT_SLOT_LIMIT_REACHED",
    "WHATSAPP_REGISTRATION_QUEUE_FULL",
  ],
  "~types": undefined as unknown as { readonly args: [params: AgentCreateParams, options?: KeyedRequestOptions]; readonly result: APIPromise<T.Agent> },
} as const satisfies Operation<[params: AgentCreateParams, options?: KeyedRequestOptions], APIPromise<T.Agent>, AgentCreateErrorCode>;

export type AgentDeleteParams = {
  /**
   * Outlet the request acts in. It must be an outlet the credential may use; omit it to use every such outlet.
   */
  outlet_id?: string;
};
export type AgentDeleteErrorCode =
  | DelegatedAccessErrorCode
  | "BAD_REQUEST"
  | "CLIENT_UPGRADE_REQUIRED"
  | "CONFLICT"
  | "FORBIDDEN"
  | "INTERNAL_ERROR"
  | "UNAUTHORIZED"
  | "VALIDATION_FAILED"
  | "WHATSAPP_AGENTS_FENCED"
  | "WHATSAPP_AGENT_NOT_FOUND";
export const agentsDelete = {
  id: "whatsapp.agents.delete",
  method: "DELETE",
  path: "/v1/agents/{agent_id}",
  positional: "agent_id",
  parameters: [
    { member: "outlet_id", name: "outlet_id", in: "query", required: false, encoding: "scalar" },
  ],
  body: "none",
  success: { status: 202, body: "json", required: ["deletion", "status"] },
  result: { kind: "resource", key: "deletion" },
  idempotency: "safe",
  authentication: "required",
  organizationKeys: false,
  errors: [
    ...delegatedAccessCodes,
    "BAD_REQUEST",
    "CLIENT_UPGRADE_REQUIRED",
    "CONFLICT",
    "FORBIDDEN",
    "INTERNAL_ERROR",
    "UNAUTHORIZED",
    "VALIDATION_FAILED",
    "WHATSAPP_AGENTS_FENCED",
    "WHATSAPP_AGENT_NOT_FOUND",
  ],
  "~types": undefined as unknown as { readonly args: [agentId: string, params?: AgentDeleteParams, options?: RequestOptions]; readonly result: APIPromise<T.AgentDeletion> },
} as const satisfies Operation<[agentId: string, params?: AgentDeleteParams, options?: RequestOptions], APIPromise<T.AgentDeletion>, AgentDeleteErrorCode>;

export type AgentGetParams = {
  /**
   * Outlet the request acts in. It must be an outlet the credential may use; omit it to use every such outlet.
   */
  outlet_id?: string;
};
export type AgentGetErrorCode =
  | DelegatedAccessErrorCode
  | "BAD_REQUEST"
  | "CLIENT_UPGRADE_REQUIRED"
  | "FORBIDDEN"
  | "INTERNAL_ERROR"
  | "UNAUTHORIZED"
  | "VALIDATION_FAILED"
  | "WHATSAPP_AGENT_NOT_FOUND";
export const agentsGet = {
  id: "whatsapp.agents.get",
  method: "GET",
  path: "/v1/agents/{agent_id}",
  positional: "agent_id",
  parameters: [
    { member: "outlet_id", name: "outlet_id", in: "query", required: false, encoding: "scalar" },
  ],
  body: "none",
  success: { status: 200, body: "json", required: ["agent", "status"] },
  result: { kind: "resource", key: "agent" },
  idempotency: "safe",
  authentication: "required",
  organizationKeys: false,
  errors: [
    ...delegatedAccessCodes,
    "BAD_REQUEST",
    "CLIENT_UPGRADE_REQUIRED",
    "FORBIDDEN",
    "INTERNAL_ERROR",
    "UNAUTHORIZED",
    "VALIDATION_FAILED",
    "WHATSAPP_AGENT_NOT_FOUND",
  ],
  "~types": undefined as unknown as { readonly args: [agentId: string, params?: AgentGetParams, options?: RequestOptions]; readonly result: APIPromise<T.Agent> },
} as const satisfies Operation<[agentId: string, params?: AgentGetParams, options?: RequestOptions], APIPromise<T.Agent>, AgentGetErrorCode>;

export type AgentListParams = {
  /**
   * Only agents assigned to this outlet.
   */
  outlet_id?: string | null;
  /**
   * Page number (1-based). Selects page mode; mutually exclusive with after
   * and before.
   */
  page?: number;
  /**
   * Items per page. Defaults to 20, max 100 (larger values are clamped and
   * echoed as page_size).
   */
  limit?: number;
  /**
   * Opaque cursor: the page after this position. Pass a previous response's
   * next_cursor.
   */
  after?: string;
  /**
   * Opaque cursor: the page before this position. Pass a previous response's
   * prev_cursor.
   */
  before?: string;
  /**
   * Whether to count matching rows. Default: exact in page mode, none in
   * cursor mode.
   */
  total?: T.TotalMode;
  /**
   * Comma-separated sort fields, e.g. "name" or "-create_at,name". Each field
   * sorts ascending unless prefixed with "-" for descending.
   */
  sort?: string;
};
export type AgentListErrorCode =
  | DelegatedAccessErrorCode
  | "BAD_REQUEST"
  | "CLIENT_UPGRADE_REQUIRED"
  | "FORBIDDEN"
  | "INTERNAL_ERROR"
  | "PAGINATION_CURSOR_INVALID"
  | "PAGINATION_PARAMS_INVALID"
  | "UNAUTHORIZED"
  | "VALIDATION_FAILED";
export const agentsList = {
  id: "whatsapp.agents.list",
  method: "GET",
  path: "/v1/agents",
  parameters: [
    { member: "outlet_id", name: "outlet_id", in: "query", required: false, encoding: "scalar" },
    { member: "page", name: "page", in: "query", required: false, encoding: "scalar" },
    { member: "limit", name: "limit", in: "query", required: false, encoding: "scalar" },
    { member: "after", name: "after", in: "query", required: false, encoding: "scalar" },
    { member: "before", name: "before", in: "query", required: false, encoding: "scalar" },
    { member: "total", name: "total", in: "query", required: false, encoding: "scalar" },
    { member: "sort", name: "sort", in: "query", required: false, encoding: "scalar" },
  ],
  body: "none",
  success: { status: 200, body: "json", required: ["agents", "status"] },
  result: { kind: "page", key: "agents", pagination: {
    pageParam: "page",
    pageSizeParam: "limit",
    afterParam: "after",
    beforeParam: "before",
    totalParam: "total",
    defaultPageSize: 20,
    maxPageSize: 100,
    maxOffset: 10000,
    resultField: "agents",
    itemsField: "data",
    pageField: "page",
    pageSizeField: "page_size",
    hasNextPageField: "has_next_page",
    hasPrevPageField: "has_prev_page",
    nextCursorField: "next_cursor",
    prevCursorField: "prev_cursor",
    totalItemsField: "total_items",
    totalPagesField: "total_pages",
  } },
  idempotency: "safe",
  authentication: "required",
  organizationKeys: false,
  errors: [
    ...delegatedAccessCodes,
    "BAD_REQUEST",
    "CLIENT_UPGRADE_REQUIRED",
    "FORBIDDEN",
    "INTERNAL_ERROR",
    "PAGINATION_CURSOR_INVALID",
    "PAGINATION_PARAMS_INVALID",
    "UNAUTHORIZED",
    "VALIDATION_FAILED",
  ],
  "~types": undefined as unknown as { readonly args: [params?: AgentListParams, options?: RequestOptions]; readonly result: PagePromise<T.Agent> },
} as const satisfies Operation<[params?: AgentListParams, options?: RequestOptions], PagePromise<T.Agent>, AgentListErrorCode>;

export type AgentPairingGetParams = {
  /**
   * The agent being paired.
   */
  agent_id: string;
  /**
   * Outlet the request acts in. It must be an outlet the credential may use; omit it to use every such outlet.
   */
  outlet_id?: string;
};
export type AgentPairingGetErrorCode =
  | DelegatedAccessErrorCode
  | "BAD_REQUEST"
  | "CLIENT_UPGRADE_REQUIRED"
  | "FORBIDDEN"
  | "INTERNAL_ERROR"
  | "UNAUTHORIZED"
  | "VALIDATION_FAILED"
  | "WHATSAPP_AGENT_NOT_FOUND";
export const agentsPairingGet = {
  id: "whatsapp.agents.pairing.get",
  method: "GET",
  path: "/v1/agents/{agent_id}/pairing",
  parameters: [
    { member: "agent_id", name: "agent_id", in: "path", required: true, encoding: "scalar" },
    { member: "outlet_id", name: "outlet_id", in: "query", required: false, encoding: "scalar" },
  ],
  body: "none",
  success: { status: 200, body: "json", required: ["pairing", "status"] },
  result: { kind: "resource", key: "pairing" },
  idempotency: "safe",
  authentication: "required",
  organizationKeys: false,
  errors: [
    ...delegatedAccessCodes,
    "BAD_REQUEST",
    "CLIENT_UPGRADE_REQUIRED",
    "FORBIDDEN",
    "INTERNAL_ERROR",
    "UNAUTHORIZED",
    "VALIDATION_FAILED",
    "WHATSAPP_AGENT_NOT_FOUND",
  ],
  "~types": undefined as unknown as { readonly args: [params: AgentPairingGetParams, options?: RequestOptions]; readonly result: APIPromise<T.AgentPairing> },
} as const satisfies Operation<[params: AgentPairingGetParams, options?: RequestOptions], APIPromise<T.AgentPairing>, AgentPairingGetErrorCode>;

export type AgentUpdateParams = T.UpdateAgentParam;
export type AgentUpdateErrorCode =
  | DelegatedAccessErrorCode
  | "BAD_REQUEST"
  | "CLIENT_UPGRADE_REQUIRED"
  | "CONFLICT"
  | "FORBIDDEN"
  | "INTERNAL_ERROR"
  | "PRECONDITION_FAILED"
  | "PRECONDITION_REQUIRED"
  | "UNAUTHORIZED"
  | "UNAVAILABLE"
  | "VALIDATION_FAILED"
  | "WHATSAPP_AGENT_NOT_FOUND"
  | "WHATSAPP_AGENT_OUTLET_INVALID"
  | "WHATSAPP_SYSTEM_AGENT_UNASSIGNABLE";
export const agentsUpdate = {
  id: "whatsapp.agents.update",
  method: "PATCH",
  path: "/v1/agents/{agent_id}",
  positional: "agent_id",
  parameters: [],
  body: "required",
  success: { status: 200, body: "json", required: ["agent", "status"] },
  result: { kind: "resource", key: "agent" },
  idempotency: "safe",
  conditional: { read: "whatsapp.agents.get" },
  authentication: "required",
  organizationKeys: false,
  errors: [
    ...delegatedAccessCodes,
    "BAD_REQUEST",
    "CLIENT_UPGRADE_REQUIRED",
    "CONFLICT",
    "FORBIDDEN",
    "INTERNAL_ERROR",
    "PRECONDITION_FAILED",
    "PRECONDITION_REQUIRED",
    "UNAUTHORIZED",
    "UNAVAILABLE",
    "VALIDATION_FAILED",
    "WHATSAPP_AGENT_NOT_FOUND",
    "WHATSAPP_AGENT_OUTLET_INVALID",
    "WHATSAPP_SYSTEM_AGENT_UNASSIGNABLE",
  ],
  "~types": undefined as unknown as { readonly args: [agentId: string, params: AgentUpdateParams | undefined, options: ConditionalRequestOptions]; readonly result: APIPromise<T.Agent> },
} as const satisfies Operation<[agentId: string, params: AgentUpdateParams | undefined, options: ConditionalRequestOptions], APIPromise<T.Agent>, AgentUpdateErrorCode>;

export type BroadcastSuppressionAddParams = T.AddBroadcastSuppressionsParam;
export type BroadcastSuppressionAddResponse = {
  /**
   * Recipients added.
   */
  added: number;
  /**
   * Recipients skipped as duplicates.
   */
  duplicates: number;
};
export type BroadcastSuppressionAddErrorCode =
  | DelegatedAccessErrorCode
  | "BAD_REQUEST"
  | "CLIENT_UPGRADE_REQUIRED"
  | "CONFLICT"
  | "FORBIDDEN"
  | "IDEMPOTENCY_KEY_CONFLICT"
  | "IDEMPOTENCY_KEY_REQUIRED"
  | "INTERNAL_ERROR"
  | "UNAUTHORIZED"
  | "VALIDATION_FAILED";
export const broadcastSuppressionsAdd = {
  id: "whatsapp.broadcast_suppressions.add",
  method: "POST",
  path: "/v1/broadcast-suppressions",
  parameters: [],
  body: "required",
  success: { status: 200, body: "json", required: ["added", "duplicates", "status"] },
  result: { kind: "object" },
  idempotency: "keyed",
  authentication: "required",
  organizationKeys: true,
  errors: [
    ...delegatedAccessCodes,
    "BAD_REQUEST",
    "CLIENT_UPGRADE_REQUIRED",
    "CONFLICT",
    "FORBIDDEN",
    "IDEMPOTENCY_KEY_CONFLICT",
    "IDEMPOTENCY_KEY_REQUIRED",
    "INTERNAL_ERROR",
    "UNAUTHORIZED",
    "VALIDATION_FAILED",
  ],
  "~types": undefined as unknown as { readonly args: [params: BroadcastSuppressionAddParams, options?: KeyedRequestOptions]; readonly result: APIPromise<BroadcastSuppressionAddResponse> },
} as const satisfies Operation<[params: BroadcastSuppressionAddParams, options?: KeyedRequestOptions], APIPromise<BroadcastSuppressionAddResponse>, BroadcastSuppressionAddErrorCode>;

export type BroadcastSuppressionListParams = {
  /**
   * Page number (1-based). Selects page mode; mutually exclusive with after
   * and before.
   */
  page?: number;
  /**
   * Items per page. Defaults to 20, max 100 (larger values are clamped and
   * echoed as page_size).
   */
  limit?: number;
  /**
   * Opaque cursor: the page after this position. Pass a previous response's
   * next_cursor.
   */
  after?: string;
  /**
   * Opaque cursor: the page before this position. Pass a previous response's
   * prev_cursor.
   */
  before?: string;
  /**
   * Whether to count matching rows. Default: exact in page mode, none in
   * cursor mode.
   */
  total?: T.TotalMode;
  /**
   * Comma-separated sort fields, e.g. "name" or "-create_at,name". Each field
   * sorts ascending unless prefixed with "-" for descending.
   */
  sort?: string;
  /**
   * Only the suppression of this phone number.
   */
  to?: string | null;
};
export type BroadcastSuppressionListErrorCode =
  | DelegatedAccessErrorCode
  | "BAD_REQUEST"
  | "CLIENT_UPGRADE_REQUIRED"
  | "FORBIDDEN"
  | "INTERNAL_ERROR"
  | "PAGINATION_CURSOR_INVALID"
  | "PAGINATION_PARAMS_INVALID"
  | "UNAUTHORIZED"
  | "VALIDATION_FAILED";
export const broadcastSuppressionsList = {
  id: "whatsapp.broadcast_suppressions.list",
  method: "GET",
  path: "/v1/broadcast-suppressions",
  parameters: [
    { member: "page", name: "page", in: "query", required: false, encoding: "scalar" },
    { member: "limit", name: "limit", in: "query", required: false, encoding: "scalar" },
    { member: "after", name: "after", in: "query", required: false, encoding: "scalar" },
    { member: "before", name: "before", in: "query", required: false, encoding: "scalar" },
    { member: "total", name: "total", in: "query", required: false, encoding: "scalar" },
    { member: "sort", name: "sort", in: "query", required: false, encoding: "scalar" },
    { member: "to", name: "to", in: "query", required: false, encoding: "scalar" },
  ],
  body: "none",
  success: { status: 200, body: "json", required: ["status", "suppressions"] },
  result: { kind: "page", key: "suppressions", pagination: {
    pageParam: "page",
    pageSizeParam: "limit",
    afterParam: "after",
    beforeParam: "before",
    totalParam: "total",
    defaultPageSize: 20,
    maxPageSize: 100,
    maxOffset: 10000,
    resultField: "suppressions",
    itemsField: "data",
    pageField: "page",
    pageSizeField: "page_size",
    hasNextPageField: "has_next_page",
    hasPrevPageField: "has_prev_page",
    nextCursorField: "next_cursor",
    prevCursorField: "prev_cursor",
    totalItemsField: "total_items",
    totalPagesField: "total_pages",
  } },
  idempotency: "safe",
  authentication: "required",
  organizationKeys: true,
  errors: [
    ...delegatedAccessCodes,
    "BAD_REQUEST",
    "CLIENT_UPGRADE_REQUIRED",
    "FORBIDDEN",
    "INTERNAL_ERROR",
    "PAGINATION_CURSOR_INVALID",
    "PAGINATION_PARAMS_INVALID",
    "UNAUTHORIZED",
    "VALIDATION_FAILED",
  ],
  "~types": undefined as unknown as { readonly args: [params?: BroadcastSuppressionListParams, options?: RequestOptions]; readonly result: PagePromise<T.BroadcastSuppression> },
} as const satisfies Operation<[params?: BroadcastSuppressionListParams, options?: RequestOptions], PagePromise<T.BroadcastSuppression>, BroadcastSuppressionListErrorCode>;

export type BroadcastSuppressionRemoveErrorCode =
  | DelegatedAccessErrorCode
  | "BAD_REQUEST"
  | "CLIENT_UPGRADE_REQUIRED"
  | "CONFLICT"
  | "FORBIDDEN"
  | "INTERNAL_ERROR"
  | "UNAUTHORIZED"
  | "VALIDATION_FAILED"
  | "WHATSAPP_BROADCAST_SUPPRESSION_NOT_FOUND";
export const broadcastSuppressionsRemove = {
  id: "whatsapp.broadcast_suppressions.remove",
  method: "DELETE",
  path: "/v1/broadcast-suppressions/{suppression_id}",
  positional: "suppression_id",
  parameters: [],
  body: "none",
  success: { status: 204, body: "none", required: [] },
  result: { kind: "void" },
  idempotency: "safe",
  authentication: "required",
  organizationKeys: true,
  errors: [
    ...delegatedAccessCodes,
    "BAD_REQUEST",
    "CLIENT_UPGRADE_REQUIRED",
    "CONFLICT",
    "FORBIDDEN",
    "INTERNAL_ERROR",
    "UNAUTHORIZED",
    "VALIDATION_FAILED",
    "WHATSAPP_BROADCAST_SUPPRESSION_NOT_FOUND",
  ],
  "~types": undefined as unknown as { readonly args: [suppressionId: string, params?: EmptyParams, options?: RequestOptions]; readonly result: APIPromise<void> },
} as const satisfies Operation<[suppressionId: string, params?: EmptyParams, options?: RequestOptions], APIPromise<void>, BroadcastSuppressionRemoveErrorCode>;

export type BroadcastCancelErrorCode =
  | DelegatedAccessErrorCode
  | "BAD_REQUEST"
  | "CLIENT_UPGRADE_REQUIRED"
  | "CONFLICT"
  | "FORBIDDEN"
  | "INTERNAL_ERROR"
  | "UNAUTHORIZED"
  | "VALIDATION_FAILED"
  | "WHATSAPP_BROADCAST_NOT_FOUND"
  | "WHATSAPP_BROADCAST_STATE_CONFLICT";
export const broadcastsCancel = {
  id: "whatsapp.broadcasts.cancel",
  method: "POST",
  path: "/v1/broadcasts/{broadcast_id}/cancel",
  positional: "broadcast_id",
  parameters: [],
  body: "none",
  success: { status: 200, body: "json", required: ["broadcast", "status"] },
  result: { kind: "resource", key: "broadcast" },
  idempotency: "safe",
  authentication: "required",
  organizationKeys: true,
  errors: [
    ...delegatedAccessCodes,
    "BAD_REQUEST",
    "CLIENT_UPGRADE_REQUIRED",
    "CONFLICT",
    "FORBIDDEN",
    "INTERNAL_ERROR",
    "UNAUTHORIZED",
    "VALIDATION_FAILED",
    "WHATSAPP_BROADCAST_NOT_FOUND",
    "WHATSAPP_BROADCAST_STATE_CONFLICT",
  ],
  "~types": undefined as unknown as { readonly args: [broadcastId: string, params?: EmptyParams, options?: RequestOptions]; readonly result: APIPromise<T.Broadcast> },
} as const satisfies Operation<[broadcastId: string, params?: EmptyParams, options?: RequestOptions], APIPromise<T.Broadcast>, BroadcastCancelErrorCode>;

export type BroadcastCreateParams = {
  /**
   * Outlet the request acts in. It must be an outlet the credential may use; omit it to use every such outlet.
   */
  outlet_id?: string;
} & T.CreateBroadcastParam;
export type BroadcastCreateErrorCode =
  | DelegatedAccessErrorCode
  | "BAD_REQUEST"
  | "CLIENT_UPGRADE_REQUIRED"
  | "CONFLICT"
  | "FORBIDDEN"
  | "IDEMPOTENCY_KEY_CONFLICT"
  | "IDEMPOTENCY_KEY_REQUIRED"
  | "INTERNAL_ERROR"
  | "UNAUTHORIZED"
  | "VALIDATION_FAILED"
  | "WHATSAPP_BROADCAST_SENDER_UNAVAILABLE"
  | "WHATSAPP_TEMPLATE_NOT_FOUND";
export const broadcastsCreate = {
  id: "whatsapp.broadcasts.create",
  method: "POST",
  path: "/v1/broadcasts",
  parameters: [
    { member: "outlet_id", name: "outlet_id", in: "query", required: false, encoding: "scalar" },
  ],
  body: "required",
  success: { status: 201, body: "json", required: ["broadcast", "status"] },
  result: { kind: "resource", key: "broadcast" },
  idempotency: "keyed",
  authentication: "required",
  organizationKeys: true,
  errors: [
    ...delegatedAccessCodes,
    "BAD_REQUEST",
    "CLIENT_UPGRADE_REQUIRED",
    "CONFLICT",
    "FORBIDDEN",
    "IDEMPOTENCY_KEY_CONFLICT",
    "IDEMPOTENCY_KEY_REQUIRED",
    "INTERNAL_ERROR",
    "UNAUTHORIZED",
    "VALIDATION_FAILED",
    "WHATSAPP_BROADCAST_SENDER_UNAVAILABLE",
    "WHATSAPP_TEMPLATE_NOT_FOUND",
  ],
  "~types": undefined as unknown as { readonly args: [params: BroadcastCreateParams, options?: KeyedRequestOptions]; readonly result: APIPromise<T.Broadcast> },
} as const satisfies Operation<[params: BroadcastCreateParams, options?: KeyedRequestOptions], APIPromise<T.Broadcast>, BroadcastCreateErrorCode>;

export type BroadcastGetErrorCode =
  | DelegatedAccessErrorCode
  | "BAD_REQUEST"
  | "CLIENT_UPGRADE_REQUIRED"
  | "FORBIDDEN"
  | "INTERNAL_ERROR"
  | "UNAUTHORIZED"
  | "VALIDATION_FAILED"
  | "WHATSAPP_BROADCAST_NOT_FOUND";
export const broadcastsGet = {
  id: "whatsapp.broadcasts.get",
  method: "GET",
  path: "/v1/broadcasts/{broadcast_id}",
  positional: "broadcast_id",
  parameters: [],
  body: "none",
  success: { status: 200, body: "json", required: ["broadcast", "status"] },
  result: { kind: "resource", key: "broadcast" },
  idempotency: "safe",
  authentication: "required",
  organizationKeys: true,
  errors: [
    ...delegatedAccessCodes,
    "BAD_REQUEST",
    "CLIENT_UPGRADE_REQUIRED",
    "FORBIDDEN",
    "INTERNAL_ERROR",
    "UNAUTHORIZED",
    "VALIDATION_FAILED",
    "WHATSAPP_BROADCAST_NOT_FOUND",
  ],
  "~types": undefined as unknown as { readonly args: [broadcastId: string, params?: EmptyParams, options?: RequestOptions]; readonly result: APIPromise<T.Broadcast> },
} as const satisfies Operation<[broadcastId: string, params?: EmptyParams, options?: RequestOptions], APIPromise<T.Broadcast>, BroadcastGetErrorCode>;

export type BroadcastListParams = {
  /**
   * Page number (1-based). Selects page mode; mutually exclusive with after
   * and before.
   */
  page?: number;
  /**
   * Items per page. Defaults to 20, max 100 (larger values are clamped and
   * echoed as page_size).
   */
  limit?: number;
  /**
   * Opaque cursor: the page after this position. Pass a previous response's
   * next_cursor.
   */
  after?: string;
  /**
   * Opaque cursor: the page before this position. Pass a previous response's
   * prev_cursor.
   */
  before?: string;
  /**
   * Whether to count matching rows. Default: exact in page mode, none in
   * cursor mode.
   */
  total?: T.TotalMode;
  /**
   * Comma-separated sort fields, e.g. "name" or "-create_at,name". Each field
   * sorts ascending unless prefixed with "-" for descending.
   */
  sort?: string;
  /**
   * Only broadcasts in this status.
   */
  status?: T.BroadcastStatusParam;
};
export type BroadcastListErrorCode =
  | DelegatedAccessErrorCode
  | "BAD_REQUEST"
  | "CLIENT_UPGRADE_REQUIRED"
  | "FORBIDDEN"
  | "INTERNAL_ERROR"
  | "PAGINATION_CURSOR_INVALID"
  | "PAGINATION_PARAMS_INVALID"
  | "UNAUTHORIZED"
  | "VALIDATION_FAILED";
export const broadcastsList = {
  id: "whatsapp.broadcasts.list",
  method: "GET",
  path: "/v1/broadcasts",
  parameters: [
    { member: "page", name: "page", in: "query", required: false, encoding: "scalar" },
    { member: "limit", name: "limit", in: "query", required: false, encoding: "scalar" },
    { member: "after", name: "after", in: "query", required: false, encoding: "scalar" },
    { member: "before", name: "before", in: "query", required: false, encoding: "scalar" },
    { member: "total", name: "total", in: "query", required: false, encoding: "scalar" },
    { member: "sort", name: "sort", in: "query", required: false, encoding: "scalar" },
    { member: "status", name: "status", in: "query", required: false, encoding: "scalar" },
  ],
  body: "none",
  success: { status: 200, body: "json", required: ["broadcasts", "status"] },
  result: { kind: "page", key: "broadcasts", pagination: {
    pageParam: "page",
    pageSizeParam: "limit",
    afterParam: "after",
    beforeParam: "before",
    totalParam: "total",
    defaultPageSize: 20,
    maxPageSize: 100,
    maxOffset: 10000,
    resultField: "broadcasts",
    itemsField: "data",
    pageField: "page",
    pageSizeField: "page_size",
    hasNextPageField: "has_next_page",
    hasPrevPageField: "has_prev_page",
    nextCursorField: "next_cursor",
    prevCursorField: "prev_cursor",
    totalItemsField: "total_items",
    totalPagesField: "total_pages",
  } },
  idempotency: "safe",
  authentication: "required",
  organizationKeys: true,
  errors: [
    ...delegatedAccessCodes,
    "BAD_REQUEST",
    "CLIENT_UPGRADE_REQUIRED",
    "FORBIDDEN",
    "INTERNAL_ERROR",
    "PAGINATION_CURSOR_INVALID",
    "PAGINATION_PARAMS_INVALID",
    "UNAUTHORIZED",
    "VALIDATION_FAILED",
  ],
  "~types": undefined as unknown as { readonly args: [params?: BroadcastListParams, options?: RequestOptions]; readonly result: PagePromise<T.Broadcast> },
} as const satisfies Operation<[params?: BroadcastListParams, options?: RequestOptions], PagePromise<T.Broadcast>, BroadcastListErrorCode>;

export type BroadcastPauseErrorCode =
  | DelegatedAccessErrorCode
  | "BAD_REQUEST"
  | "CLIENT_UPGRADE_REQUIRED"
  | "CONFLICT"
  | "FORBIDDEN"
  | "INTERNAL_ERROR"
  | "UNAUTHORIZED"
  | "VALIDATION_FAILED"
  | "WHATSAPP_BROADCAST_NOT_FOUND"
  | "WHATSAPP_BROADCAST_STATE_CONFLICT";
export const broadcastsPause = {
  id: "whatsapp.broadcasts.pause",
  method: "POST",
  path: "/v1/broadcasts/{broadcast_id}/pause",
  positional: "broadcast_id",
  parameters: [],
  body: "none",
  success: { status: 200, body: "json", required: ["broadcast", "status"] },
  result: { kind: "resource", key: "broadcast" },
  idempotency: "safe",
  authentication: "required",
  organizationKeys: true,
  errors: [
    ...delegatedAccessCodes,
    "BAD_REQUEST",
    "CLIENT_UPGRADE_REQUIRED",
    "CONFLICT",
    "FORBIDDEN",
    "INTERNAL_ERROR",
    "UNAUTHORIZED",
    "VALIDATION_FAILED",
    "WHATSAPP_BROADCAST_NOT_FOUND",
    "WHATSAPP_BROADCAST_STATE_CONFLICT",
  ],
  "~types": undefined as unknown as { readonly args: [broadcastId: string, params?: EmptyParams, options?: RequestOptions]; readonly result: APIPromise<T.Broadcast> },
} as const satisfies Operation<[broadcastId: string, params?: EmptyParams, options?: RequestOptions], APIPromise<T.Broadcast>, BroadcastPauseErrorCode>;

export type BroadcastRecipientAddParams = {
  /**
   * The draft broadcast to add recipients to.
   */
  broadcast_id: string;
} & T.AddBroadcastRecipientsParam;
export type BroadcastRecipientAddResponse = {
  /**
   * Recipients added.
   */
  added: number;
  /**
   * Recipients skipped as duplicates.
   */
  duplicates: number;
};
export type BroadcastRecipientAddErrorCode =
  | DelegatedAccessErrorCode
  | "BAD_REQUEST"
  | "CLIENT_UPGRADE_REQUIRED"
  | "CONFLICT"
  | "FORBIDDEN"
  | "IDEMPOTENCY_KEY_CONFLICT"
  | "IDEMPOTENCY_KEY_REQUIRED"
  | "INTERNAL_ERROR"
  | "UNAUTHORIZED"
  | "VALIDATION_FAILED"
  | "WHATSAPP_BROADCAST_NOT_FOUND"
  | "WHATSAPP_BROADCAST_RECIPIENT_LIMIT_REACHED"
  | "WHATSAPP_BROADCAST_STATE_CONFLICT"
  | "WHATSAPP_TEMPLATE_NOT_FOUND"
  | "WHATSAPP_TEMPLATE_RENDERED_TOO_LONG";
export const broadcastsRecipientsAdd = {
  id: "whatsapp.broadcasts.recipients.add",
  method: "POST",
  path: "/v1/broadcasts/{broadcast_id}/recipients",
  parameters: [
    { member: "broadcast_id", name: "broadcast_id", in: "path", required: true, encoding: "scalar" },
  ],
  body: "required",
  success: { status: 200, body: "json", required: ["added", "duplicates", "status"] },
  result: { kind: "object" },
  idempotency: "keyed",
  authentication: "required",
  organizationKeys: true,
  errors: [
    ...delegatedAccessCodes,
    "BAD_REQUEST",
    "CLIENT_UPGRADE_REQUIRED",
    "CONFLICT",
    "FORBIDDEN",
    "IDEMPOTENCY_KEY_CONFLICT",
    "IDEMPOTENCY_KEY_REQUIRED",
    "INTERNAL_ERROR",
    "UNAUTHORIZED",
    "VALIDATION_FAILED",
    "WHATSAPP_BROADCAST_NOT_FOUND",
    "WHATSAPP_BROADCAST_RECIPIENT_LIMIT_REACHED",
    "WHATSAPP_BROADCAST_STATE_CONFLICT",
    "WHATSAPP_TEMPLATE_NOT_FOUND",
    "WHATSAPP_TEMPLATE_RENDERED_TOO_LONG",
  ],
  "~types": undefined as unknown as { readonly args: [params: BroadcastRecipientAddParams, options?: KeyedRequestOptions]; readonly result: APIPromise<BroadcastRecipientAddResponse> },
} as const satisfies Operation<[params: BroadcastRecipientAddParams, options?: KeyedRequestOptions], APIPromise<BroadcastRecipientAddResponse>, BroadcastRecipientAddErrorCode>;

export type BroadcastRecipientListParams = {
  /**
   * The broadcast whose recipients to list.
   */
  broadcast_id: string;
  /**
   * Page number (1-based). Selects page mode; mutually exclusive with after
   * and before.
   */
  page?: number;
  /**
   * Items per page. Defaults to 20, max 100 (larger values are clamped and
   * echoed as page_size).
   */
  limit?: number;
  /**
   * Opaque cursor: the page after this position. Pass a previous response's
   * next_cursor.
   */
  after?: string;
  /**
   * Opaque cursor: the page before this position. Pass a previous response's
   * prev_cursor.
   */
  before?: string;
  /**
   * Whether to count matching rows. Default: exact in page mode, none in
   * cursor mode.
   */
  total?: T.TotalMode;
  /**
   * Comma-separated sort fields, e.g. "name" or "-create_at,name". Each field
   * sorts ascending unless prefixed with "-" for descending.
   */
  sort?: string;
  /**
   * Only recipients in this status.
   */
  status?: T.BroadcastRecipientStatusParam;
  /**
   * Only recipients assigned to this sender agent.
   */
  agent_id?: string;
  /**
   * Only the recipient with this phone number.
   */
  to?: string | null;
};
export type BroadcastRecipientListErrorCode =
  | DelegatedAccessErrorCode
  | "BAD_REQUEST"
  | "CLIENT_UPGRADE_REQUIRED"
  | "FORBIDDEN"
  | "INTERNAL_ERROR"
  | "PAGINATION_CURSOR_INVALID"
  | "PAGINATION_PARAMS_INVALID"
  | "UNAUTHORIZED"
  | "VALIDATION_FAILED"
  | "WHATSAPP_BROADCAST_NOT_FOUND";
export const broadcastsRecipientsList = {
  id: "whatsapp.broadcasts.recipients.list",
  method: "GET",
  path: "/v1/broadcasts/{broadcast_id}/recipients",
  parameters: [
    { member: "broadcast_id", name: "broadcast_id", in: "path", required: true, encoding: "scalar" },
    { member: "page", name: "page", in: "query", required: false, encoding: "scalar" },
    { member: "limit", name: "limit", in: "query", required: false, encoding: "scalar" },
    { member: "after", name: "after", in: "query", required: false, encoding: "scalar" },
    { member: "before", name: "before", in: "query", required: false, encoding: "scalar" },
    { member: "total", name: "total", in: "query", required: false, encoding: "scalar" },
    { member: "sort", name: "sort", in: "query", required: false, encoding: "scalar" },
    { member: "status", name: "status", in: "query", required: false, encoding: "scalar" },
    { member: "agent_id", name: "agent_id", in: "query", required: false, encoding: "scalar" },
    { member: "to", name: "to", in: "query", required: false, encoding: "scalar" },
  ],
  body: "none",
  success: { status: 200, body: "json", required: ["recipients", "status"] },
  result: { kind: "page", key: "recipients", pagination: {
    pageParam: "page",
    pageSizeParam: "limit",
    afterParam: "after",
    beforeParam: "before",
    totalParam: "total",
    defaultPageSize: 20,
    maxPageSize: 100,
    maxOffset: 10000,
    resultField: "recipients",
    itemsField: "data",
    pageField: "page",
    pageSizeField: "page_size",
    hasNextPageField: "has_next_page",
    hasPrevPageField: "has_prev_page",
    nextCursorField: "next_cursor",
    prevCursorField: "prev_cursor",
    totalItemsField: "total_items",
    totalPagesField: "total_pages",
  } },
  idempotency: "safe",
  authentication: "required",
  organizationKeys: true,
  errors: [
    ...delegatedAccessCodes,
    "BAD_REQUEST",
    "CLIENT_UPGRADE_REQUIRED",
    "FORBIDDEN",
    "INTERNAL_ERROR",
    "PAGINATION_CURSOR_INVALID",
    "PAGINATION_PARAMS_INVALID",
    "UNAUTHORIZED",
    "VALIDATION_FAILED",
    "WHATSAPP_BROADCAST_NOT_FOUND",
  ],
  "~types": undefined as unknown as { readonly args: [params: BroadcastRecipientListParams, options?: RequestOptions]; readonly result: PagePromise<T.BroadcastRecipient> },
} as const satisfies Operation<[params: BroadcastRecipientListParams, options?: RequestOptions], PagePromise<T.BroadcastRecipient>, BroadcastRecipientListErrorCode>;

export type BroadcastRecipientRemoveParams = {
  /**
   * The draft broadcast.
   */
  broadcast_id: string;
};
export type BroadcastRecipientRemoveErrorCode =
  | DelegatedAccessErrorCode
  | "BAD_REQUEST"
  | "CLIENT_UPGRADE_REQUIRED"
  | "CONFLICT"
  | "FORBIDDEN"
  | "INTERNAL_ERROR"
  | "UNAUTHORIZED"
  | "VALIDATION_FAILED"
  | "WHATSAPP_BROADCAST_NOT_FOUND"
  | "WHATSAPP_BROADCAST_RECIPIENT_NOT_FOUND"
  | "WHATSAPP_BROADCAST_STATE_CONFLICT";
export const broadcastsRecipientsRemove = {
  id: "whatsapp.broadcasts.recipients.remove",
  method: "DELETE",
  path: "/v1/broadcasts/{broadcast_id}/recipients/{recipient_id}",
  positional: "recipient_id",
  parameters: [
    { member: "broadcast_id", name: "broadcast_id", in: "path", required: true, encoding: "scalar" },
  ],
  body: "none",
  success: { status: 204, body: "none", required: [] },
  result: { kind: "void" },
  idempotency: "safe",
  authentication: "required",
  organizationKeys: true,
  errors: [
    ...delegatedAccessCodes,
    "BAD_REQUEST",
    "CLIENT_UPGRADE_REQUIRED",
    "CONFLICT",
    "FORBIDDEN",
    "INTERNAL_ERROR",
    "UNAUTHORIZED",
    "VALIDATION_FAILED",
    "WHATSAPP_BROADCAST_NOT_FOUND",
    "WHATSAPP_BROADCAST_RECIPIENT_NOT_FOUND",
    "WHATSAPP_BROADCAST_STATE_CONFLICT",
  ],
  "~types": undefined as unknown as { readonly args: [recipientId: string, params: BroadcastRecipientRemoveParams, options?: RequestOptions]; readonly result: APIPromise<void> },
} as const satisfies Operation<[recipientId: string, params: BroadcastRecipientRemoveParams, options?: RequestOptions], APIPromise<void>, BroadcastRecipientRemoveErrorCode>;

export type BroadcastResumeParams = {
  /**
   * Outlet the request acts in. It must be an outlet the credential may use; omit it to use every such outlet.
   */
  outlet_id?: string;
};
export type BroadcastResumeErrorCode =
  | DelegatedAccessErrorCode
  | "BAD_REQUEST"
  | "CLIENT_UPGRADE_REQUIRED"
  | "CONFLICT"
  | "FORBIDDEN"
  | "INTERNAL_ERROR"
  | "UNAUTHORIZED"
  | "VALIDATION_FAILED"
  | "WHATSAPP_BROADCAST_NOT_FOUND"
  | "WHATSAPP_BROADCAST_SENDER_UNAVAILABLE"
  | "WHATSAPP_BROADCAST_STATE_CONFLICT";
export const broadcastsResume = {
  id: "whatsapp.broadcasts.resume",
  method: "POST",
  path: "/v1/broadcasts/{broadcast_id}/resume",
  positional: "broadcast_id",
  parameters: [
    { member: "outlet_id", name: "outlet_id", in: "query", required: false, encoding: "scalar" },
  ],
  body: "none",
  success: { status: 200, body: "json", required: ["broadcast", "status"] },
  result: { kind: "resource", key: "broadcast" },
  idempotency: "safe",
  authentication: "required",
  organizationKeys: true,
  errors: [
    ...delegatedAccessCodes,
    "BAD_REQUEST",
    "CLIENT_UPGRADE_REQUIRED",
    "CONFLICT",
    "FORBIDDEN",
    "INTERNAL_ERROR",
    "UNAUTHORIZED",
    "VALIDATION_FAILED",
    "WHATSAPP_BROADCAST_NOT_FOUND",
    "WHATSAPP_BROADCAST_SENDER_UNAVAILABLE",
    "WHATSAPP_BROADCAST_STATE_CONFLICT",
  ],
  "~types": undefined as unknown as { readonly args: [broadcastId: string, params?: BroadcastResumeParams, options?: RequestOptions]; readonly result: APIPromise<T.Broadcast> },
} as const satisfies Operation<[broadcastId: string, params?: BroadcastResumeParams, options?: RequestOptions], APIPromise<T.Broadcast>, BroadcastResumeErrorCode>;

export type BroadcastStartParams = {
  /**
   * Outlet the request acts in. It must be an outlet the credential may use; omit it to use every such outlet.
   */
  outlet_id?: string;
};
export type BroadcastStartErrorCode =
  | DelegatedAccessErrorCode
  | "BAD_REQUEST"
  | "CLIENT_UPGRADE_REQUIRED"
  | "CONFLICT"
  | "FORBIDDEN"
  | "INTERNAL_ERROR"
  | "UNAUTHORIZED"
  | "VALIDATION_FAILED"
  | "WHATSAPP_BROADCAST_ACTIVE_LIMIT_REACHED"
  | "WHATSAPP_BROADCAST_NOT_FOUND"
  | "WHATSAPP_BROADCAST_SENDER_UNAVAILABLE"
  | "WHATSAPP_BROADCAST_STATE_CONFLICT"
  | "WHATSAPP_TEMPLATE_NOT_FOUND";
export const broadcastsStart = {
  id: "whatsapp.broadcasts.start",
  method: "POST",
  path: "/v1/broadcasts/{broadcast_id}/start",
  positional: "broadcast_id",
  parameters: [
    { member: "outlet_id", name: "outlet_id", in: "query", required: false, encoding: "scalar" },
  ],
  body: "none",
  success: { status: 200, body: "json", required: ["broadcast", "status"] },
  result: { kind: "resource", key: "broadcast" },
  idempotency: "safe",
  authentication: "required",
  organizationKeys: true,
  errors: [
    ...delegatedAccessCodes,
    "BAD_REQUEST",
    "CLIENT_UPGRADE_REQUIRED",
    "CONFLICT",
    "FORBIDDEN",
    "INTERNAL_ERROR",
    "UNAUTHORIZED",
    "VALIDATION_FAILED",
    "WHATSAPP_BROADCAST_ACTIVE_LIMIT_REACHED",
    "WHATSAPP_BROADCAST_NOT_FOUND",
    "WHATSAPP_BROADCAST_SENDER_UNAVAILABLE",
    "WHATSAPP_BROADCAST_STATE_CONFLICT",
    "WHATSAPP_TEMPLATE_NOT_FOUND",
  ],
  "~types": undefined as unknown as { readonly args: [broadcastId: string, params?: BroadcastStartParams, options?: RequestOptions]; readonly result: APIPromise<T.Broadcast> },
} as const satisfies Operation<[broadcastId: string, params?: BroadcastStartParams, options?: RequestOptions], APIPromise<T.Broadcast>, BroadcastStartErrorCode>;

export type BroadcastUpdateParams = {
  /**
   * Outlet the request acts in. It must be an outlet the credential may use; omit it to use every such outlet.
   */
  outlet_id?: string;
} & T.UpdateBroadcastParam;
export type BroadcastUpdateErrorCode =
  | DelegatedAccessErrorCode
  | "BAD_REQUEST"
  | "CLIENT_UPGRADE_REQUIRED"
  | "CONFLICT"
  | "FORBIDDEN"
  | "INTERNAL_ERROR"
  | "UNAUTHORIZED"
  | "VALIDATION_FAILED"
  | "WHATSAPP_BROADCAST_NOT_FOUND"
  | "WHATSAPP_BROADCAST_SENDER_UNAVAILABLE"
  | "WHATSAPP_BROADCAST_STATE_CONFLICT"
  | "WHATSAPP_TEMPLATE_NOT_FOUND";
export const broadcastsUpdate = {
  id: "whatsapp.broadcasts.update",
  method: "PATCH",
  path: "/v1/broadcasts/{broadcast_id}",
  positional: "broadcast_id",
  parameters: [
    { member: "outlet_id", name: "outlet_id", in: "query", required: false, encoding: "scalar" },
  ],
  body: "required",
  success: { status: 200, body: "json", required: ["broadcast", "status"] },
  result: { kind: "resource", key: "broadcast" },
  idempotency: "safe",
  authentication: "required",
  organizationKeys: true,
  errors: [
    ...delegatedAccessCodes,
    "BAD_REQUEST",
    "CLIENT_UPGRADE_REQUIRED",
    "CONFLICT",
    "FORBIDDEN",
    "INTERNAL_ERROR",
    "UNAUTHORIZED",
    "VALIDATION_FAILED",
    "WHATSAPP_BROADCAST_NOT_FOUND",
    "WHATSAPP_BROADCAST_SENDER_UNAVAILABLE",
    "WHATSAPP_BROADCAST_STATE_CONFLICT",
    "WHATSAPP_TEMPLATE_NOT_FOUND",
  ],
  "~types": undefined as unknown as { readonly args: [broadcastId: string, params?: BroadcastUpdateParams, options?: RequestOptions]; readonly result: APIPromise<T.Broadcast> },
} as const satisfies Operation<[broadcastId: string, params?: BroadcastUpdateParams, options?: RequestOptions], APIPromise<T.Broadcast>, BroadcastUpdateErrorCode>;

export type ChatMessageGetParams = {
  /**
   * Outlet the request acts in. It must be an outlet the credential may use; omit it to use every such outlet.
   */
  outlet_id?: string;
};
export type ChatMessageGetErrorCode =
  | DelegatedAccessErrorCode
  | "BAD_REQUEST"
  | "CLIENT_UPGRADE_REQUIRED"
  | "FORBIDDEN"
  | "INTERNAL_ERROR"
  | "UNAUTHORIZED"
  | "VALIDATION_FAILED"
  | "WHATSAPP_MESSAGE_NOT_FOUND";
export const chatMessagesGet = {
  id: "whatsapp.chat_messages.get",
  method: "GET",
  path: "/v1/chat-messages/{id}",
  positional: "id",
  parameters: [
    { member: "outlet_id", name: "outlet_id", in: "query", required: false, encoding: "scalar" },
  ],
  body: "none",
  success: { status: 200, body: "json", required: ["message", "status"] },
  result: { kind: "resource", key: "message" },
  idempotency: "safe",
  authentication: "required",
  organizationKeys: true,
  errors: [
    ...delegatedAccessCodes,
    "BAD_REQUEST",
    "CLIENT_UPGRADE_REQUIRED",
    "FORBIDDEN",
    "INTERNAL_ERROR",
    "UNAUTHORIZED",
    "VALIDATION_FAILED",
    "WHATSAPP_MESSAGE_NOT_FOUND",
  ],
  "~types": undefined as unknown as { readonly args: [id: string, params?: ChatMessageGetParams, options?: RequestOptions]; readonly result: APIPromise<T.ChatMessage> },
} as const satisfies Operation<[id: string, params?: ChatMessageGetParams, options?: RequestOptions], APIPromise<T.ChatMessage>, ChatMessageGetErrorCode>;

export type ChatMessageFeedListParams = {
  /**
   * The WhatsApp connection whose chat messages to list.
   */
  agent_id?: string;
  /**
   * Return messages whose revision is above this one; 0 starts from the
   * beginning.
   */
  after_rev?: number;
  /**
   * At most this many messages (default 100).
   */
  limit?: number;
  /**
   * Outlet the request acts in. It must be an outlet the credential may use; omit it to use every such outlet.
   */
  outlet_id?: string;
};
export type ChatMessageFeedListResponse = {
  /**
   * Poll again with this after_rev.
   */
  after_rev: number;
  /**
   * More messages are ready now.
   */
  has_more: boolean;
  /**
   * New, changed and merged messages in revision order; a merged copy is
   * a tombstone (id, rev, merged_into_id).
   */
  messages: T.ChatMessage[];
};
export type ChatMessageFeedListErrorCode =
  | DelegatedAccessErrorCode
  | "BAD_REQUEST"
  | "CLIENT_UPGRADE_REQUIRED"
  | "FORBIDDEN"
  | "INTERNAL_ERROR"
  | "UNAUTHORIZED"
  | "VALIDATION_FAILED"
  | "WHATSAPP_AGENT_NOT_FOUND";
export const chatMessagesList = {
  id: "whatsapp.chat_messages.list",
  method: "GET",
  path: "/v1/chat-messages",
  parameters: [
    { member: "agent_id", name: "agent_id", in: "query", required: false, encoding: "scalar" },
    { member: "after_rev", name: "after_rev", in: "query", required: false, encoding: "scalar" },
    { member: "limit", name: "limit", in: "query", required: false, encoding: "scalar" },
    { member: "outlet_id", name: "outlet_id", in: "query", required: false, encoding: "scalar" },
  ],
  body: "none",
  success: { status: 200, body: "json", required: ["after_rev", "has_more", "messages", "status"] },
  result: { kind: "object" },
  idempotency: "safe",
  authentication: "required",
  organizationKeys: true,
  errors: [
    ...delegatedAccessCodes,
    "BAD_REQUEST",
    "CLIENT_UPGRADE_REQUIRED",
    "FORBIDDEN",
    "INTERNAL_ERROR",
    "UNAUTHORIZED",
    "VALIDATION_FAILED",
    "WHATSAPP_AGENT_NOT_FOUND",
  ],
  "~types": undefined as unknown as { readonly args: [params?: ChatMessageFeedListParams, options?: RequestOptions]; readonly result: APIPromise<ChatMessageFeedListResponse> },
} as const satisfies Operation<[params?: ChatMessageFeedListParams, options?: RequestOptions], APIPromise<ChatMessageFeedListResponse>, ChatMessageFeedListErrorCode>;

export type ChatGetParams = {
  /**
   * Outlet the request acts in. It must be an outlet the credential may use; omit it to use every such outlet.
   */
  outlet_id?: string;
};
export type ChatGetErrorCode =
  | DelegatedAccessErrorCode
  | "BAD_REQUEST"
  | "CLIENT_UPGRADE_REQUIRED"
  | "FORBIDDEN"
  | "INTERNAL_ERROR"
  | "UNAUTHORIZED"
  | "VALIDATION_FAILED"
  | "WHATSAPP_CHAT_NOT_FOUND";
export const chatsGet = {
  id: "whatsapp.chats.get",
  method: "GET",
  path: "/v1/chats/{chat_id}",
  positional: "chat_id",
  parameters: [
    { member: "outlet_id", name: "outlet_id", in: "query", required: false, encoding: "scalar" },
  ],
  body: "none",
  success: { status: 200, body: "json", required: ["chat", "status"] },
  result: { kind: "resource", key: "chat" },
  idempotency: "safe",
  authentication: "required",
  organizationKeys: true,
  errors: [
    ...delegatedAccessCodes,
    "BAD_REQUEST",
    "CLIENT_UPGRADE_REQUIRED",
    "FORBIDDEN",
    "INTERNAL_ERROR",
    "UNAUTHORIZED",
    "VALIDATION_FAILED",
    "WHATSAPP_CHAT_NOT_FOUND",
  ],
  "~types": undefined as unknown as { readonly args: [chatId: string, params?: ChatGetParams, options?: RequestOptions]; readonly result: APIPromise<T.Chat> },
} as const satisfies Operation<[chatId: string, params?: ChatGetParams, options?: RequestOptions], APIPromise<T.Chat>, ChatGetErrorCode>;

export type ChatListParams = {
  /**
   * The agent whose chats to list.
   */
  agent_id?: string;
  /**
   * Page number (1-based). Selects page mode; mutually exclusive with after
   * and before.
   */
  page?: number;
  /**
   * Items per page. Defaults to 20, max 100 (larger values are clamped and
   * echoed as page_size).
   */
  limit?: number;
  /**
   * Opaque cursor: the page after this position. Pass a previous response's
   * next_cursor.
   */
  after?: string;
  /**
   * Opaque cursor: the page before this position. Pass a previous response's
   * prev_cursor.
   */
  before?: string;
  /**
   * Whether to count matching rows. Default: exact in page mode, none in
   * cursor mode.
   */
  total?: T.TotalMode;
  /**
   * Comma-separated sort fields, e.g. "name" or "-create_at,name". Each field
   * sorts ascending unless prefixed with "-" for descending.
   */
  sort?: string;
  /**
   * Outlet the request acts in. It must be an outlet the credential may use; omit it to use every such outlet.
   */
  outlet_id?: string;
};
export type ChatListErrorCode =
  | DelegatedAccessErrorCode
  | "BAD_REQUEST"
  | "CLIENT_UPGRADE_REQUIRED"
  | "FORBIDDEN"
  | "INTERNAL_ERROR"
  | "PAGINATION_CURSOR_INVALID"
  | "PAGINATION_PARAMS_INVALID"
  | "UNAUTHORIZED"
  | "VALIDATION_FAILED"
  | "WHATSAPP_AGENT_NOT_FOUND";
export const chatsList = {
  id: "whatsapp.chats.list",
  method: "GET",
  path: "/v1/chats",
  parameters: [
    { member: "agent_id", name: "agent_id", in: "query", required: false, encoding: "scalar" },
    { member: "page", name: "page", in: "query", required: false, encoding: "scalar" },
    { member: "limit", name: "limit", in: "query", required: false, encoding: "scalar" },
    { member: "after", name: "after", in: "query", required: false, encoding: "scalar" },
    { member: "before", name: "before", in: "query", required: false, encoding: "scalar" },
    { member: "total", name: "total", in: "query", required: false, encoding: "scalar" },
    { member: "sort", name: "sort", in: "query", required: false, encoding: "scalar" },
    { member: "outlet_id", name: "outlet_id", in: "query", required: false, encoding: "scalar" },
  ],
  body: "none",
  success: { status: 200, body: "json", required: ["chats", "status"] },
  result: { kind: "page", key: "chats", pagination: {
    pageParam: "page",
    pageSizeParam: "limit",
    afterParam: "after",
    beforeParam: "before",
    totalParam: "total",
    defaultPageSize: 20,
    maxPageSize: 100,
    maxOffset: 10000,
    resultField: "chats",
    itemsField: "data",
    pageField: "page",
    pageSizeField: "page_size",
    hasNextPageField: "has_next_page",
    hasPrevPageField: "has_prev_page",
    nextCursorField: "next_cursor",
    prevCursorField: "prev_cursor",
    totalItemsField: "total_items",
    totalPagesField: "total_pages",
  } },
  idempotency: "safe",
  authentication: "required",
  organizationKeys: true,
  errors: [
    ...delegatedAccessCodes,
    "BAD_REQUEST",
    "CLIENT_UPGRADE_REQUIRED",
    "FORBIDDEN",
    "INTERNAL_ERROR",
    "PAGINATION_CURSOR_INVALID",
    "PAGINATION_PARAMS_INVALID",
    "UNAUTHORIZED",
    "VALIDATION_FAILED",
    "WHATSAPP_AGENT_NOT_FOUND",
  ],
  "~types": undefined as unknown as { readonly args: [params?: ChatListParams, options?: RequestOptions]; readonly result: PagePromise<T.Chat> },
} as const satisfies Operation<[params?: ChatListParams, options?: RequestOptions], PagePromise<T.Chat>, ChatListErrorCode>;

export type ChatMessageListParams = {
  /**
   * The chat whose messages to list.
   */
  chat_id: string;
  /**
   * Page number (1-based). Selects page mode; mutually exclusive with after
   * and before.
   */
  page?: number;
  /**
   * Items per page. Defaults to 20, max 100 (larger values are clamped and
   * echoed as page_size).
   */
  limit?: number;
  /**
   * Opaque cursor: the page after this position. Pass a previous response's
   * next_cursor.
   */
  after?: string;
  /**
   * Opaque cursor: the page before this position. Pass a previous response's
   * prev_cursor.
   */
  before?: string;
  /**
   * Whether to count matching rows. Default: exact in page mode, none in
   * cursor mode.
   */
  total?: T.TotalMode;
  /**
   * Outlet the request acts in. It must be an outlet the credential may use; omit it to use every such outlet.
   */
  outlet_id?: string;
};
export type ChatMessageListErrorCode =
  | DelegatedAccessErrorCode
  | "BAD_REQUEST"
  | "CLIENT_UPGRADE_REQUIRED"
  | "FORBIDDEN"
  | "INTERNAL_ERROR"
  | "PAGINATION_CURSOR_INVALID"
  | "PAGINATION_PARAMS_INVALID"
  | "UNAUTHORIZED"
  | "VALIDATION_FAILED"
  | "WHATSAPP_CHAT_NOT_FOUND";
export const chatsMessagesList = {
  id: "whatsapp.chats.messages.list",
  method: "GET",
  path: "/v1/chats/{chat_id}/messages",
  parameters: [
    { member: "chat_id", name: "chat_id", in: "path", required: true, encoding: "scalar" },
    { member: "page", name: "page", in: "query", required: false, encoding: "scalar" },
    { member: "limit", name: "limit", in: "query", required: false, encoding: "scalar" },
    { member: "after", name: "after", in: "query", required: false, encoding: "scalar" },
    { member: "before", name: "before", in: "query", required: false, encoding: "scalar" },
    { member: "total", name: "total", in: "query", required: false, encoding: "scalar" },
    { member: "outlet_id", name: "outlet_id", in: "query", required: false, encoding: "scalar" },
  ],
  body: "none",
  success: { status: 200, body: "json", required: ["messages", "status"] },
  result: { kind: "page", key: "messages", pagination: {
    pageParam: "page",
    pageSizeParam: "limit",
    afterParam: "after",
    beforeParam: "before",
    totalParam: "total",
    defaultPageSize: 20,
    maxPageSize: 100,
    maxOffset: 10000,
    resultField: "messages",
    itemsField: "data",
    pageField: "page",
    pageSizeField: "page_size",
    hasNextPageField: "has_next_page",
    hasPrevPageField: "has_prev_page",
    nextCursorField: "next_cursor",
    prevCursorField: "prev_cursor",
    totalItemsField: "total_items",
    totalPagesField: "total_pages",
  } },
  idempotency: "safe",
  authentication: "required",
  organizationKeys: true,
  errors: [
    ...delegatedAccessCodes,
    "BAD_REQUEST",
    "CLIENT_UPGRADE_REQUIRED",
    "FORBIDDEN",
    "INTERNAL_ERROR",
    "PAGINATION_CURSOR_INVALID",
    "PAGINATION_PARAMS_INVALID",
    "UNAUTHORIZED",
    "VALIDATION_FAILED",
    "WHATSAPP_CHAT_NOT_FOUND",
  ],
  "~types": undefined as unknown as { readonly args: [params: ChatMessageListParams, options?: RequestOptions]; readonly result: PagePromise<T.ChatMessage> },
} as const satisfies Operation<[params: ChatMessageListParams, options?: RequestOptions], PagePromise<T.ChatMessage>, ChatMessageListErrorCode>;

export type MessageTemplateCreateParams = T.CreateMessageTemplateParam;
export type MessageTemplateCreateErrorCode =
  | DelegatedAccessErrorCode
  | "BAD_REQUEST"
  | "CLIENT_UPGRADE_REQUIRED"
  | "CONFLICT"
  | "FORBIDDEN"
  | "IDEMPOTENCY_KEY_CONFLICT"
  | "IDEMPOTENCY_KEY_REQUIRED"
  | "INTERNAL_ERROR"
  | "UNAUTHORIZED"
  | "VALIDATION_FAILED"
  | "WHATSAPP_TEMPLATE_LIMIT_REACHED"
  | "WHATSAPP_TEMPLATE_NAME_TAKEN";
export const messageTemplatesCreate = {
  id: "whatsapp.message_templates.create",
  method: "POST",
  path: "/v1/message-templates",
  parameters: [],
  body: "required",
  success: { status: 201, body: "json", required: ["status", "template"] },
  result: { kind: "resource", key: "template" },
  idempotency: "keyed",
  authentication: "required",
  organizationKeys: true,
  errors: [
    ...delegatedAccessCodes,
    "BAD_REQUEST",
    "CLIENT_UPGRADE_REQUIRED",
    "CONFLICT",
    "FORBIDDEN",
    "IDEMPOTENCY_KEY_CONFLICT",
    "IDEMPOTENCY_KEY_REQUIRED",
    "INTERNAL_ERROR",
    "UNAUTHORIZED",
    "VALIDATION_FAILED",
    "WHATSAPP_TEMPLATE_LIMIT_REACHED",
    "WHATSAPP_TEMPLATE_NAME_TAKEN",
  ],
  "~types": undefined as unknown as { readonly args: [params: MessageTemplateCreateParams, options?: KeyedRequestOptions]; readonly result: APIPromise<T.MessageTemplate> },
} as const satisfies Operation<[params: MessageTemplateCreateParams, options?: KeyedRequestOptions], APIPromise<T.MessageTemplate>, MessageTemplateCreateErrorCode>;

export type MessageTemplateDeleteErrorCode =
  | DelegatedAccessErrorCode
  | "BAD_REQUEST"
  | "CLIENT_UPGRADE_REQUIRED"
  | "CONFLICT"
  | "FORBIDDEN"
  | "INTERNAL_ERROR"
  | "UNAUTHORIZED"
  | "VALIDATION_FAILED"
  | "WHATSAPP_TEMPLATE_NOT_FOUND";
export const messageTemplatesDelete = {
  id: "whatsapp.message_templates.delete",
  method: "DELETE",
  path: "/v1/message-templates/{template_id}",
  positional: "template_id",
  parameters: [],
  body: "none",
  success: { status: 204, body: "none", required: [] },
  result: { kind: "void" },
  idempotency: "safe",
  authentication: "required",
  organizationKeys: true,
  errors: [
    ...delegatedAccessCodes,
    "BAD_REQUEST",
    "CLIENT_UPGRADE_REQUIRED",
    "CONFLICT",
    "FORBIDDEN",
    "INTERNAL_ERROR",
    "UNAUTHORIZED",
    "VALIDATION_FAILED",
    "WHATSAPP_TEMPLATE_NOT_FOUND",
  ],
  "~types": undefined as unknown as { readonly args: [templateId: string, params?: EmptyParams, options?: RequestOptions]; readonly result: APIPromise<void> },
} as const satisfies Operation<[templateId: string, params?: EmptyParams, options?: RequestOptions], APIPromise<void>, MessageTemplateDeleteErrorCode>;

export type MessageTemplateGetErrorCode =
  | DelegatedAccessErrorCode
  | "BAD_REQUEST"
  | "CLIENT_UPGRADE_REQUIRED"
  | "FORBIDDEN"
  | "INTERNAL_ERROR"
  | "UNAUTHORIZED"
  | "VALIDATION_FAILED"
  | "WHATSAPP_TEMPLATE_NOT_FOUND";
export const messageTemplatesGet = {
  id: "whatsapp.message_templates.get",
  method: "GET",
  path: "/v1/message-templates/{template_id}",
  positional: "template_id",
  parameters: [],
  body: "none",
  success: { status: 200, body: "json", required: ["status", "template"] },
  result: { kind: "resource", key: "template" },
  idempotency: "safe",
  authentication: "required",
  organizationKeys: true,
  errors: [
    ...delegatedAccessCodes,
    "BAD_REQUEST",
    "CLIENT_UPGRADE_REQUIRED",
    "FORBIDDEN",
    "INTERNAL_ERROR",
    "UNAUTHORIZED",
    "VALIDATION_FAILED",
    "WHATSAPP_TEMPLATE_NOT_FOUND",
  ],
  "~types": undefined as unknown as { readonly args: [templateId: string, params?: EmptyParams, options?: RequestOptions]; readonly result: APIPromise<T.MessageTemplate> },
} as const satisfies Operation<[templateId: string, params?: EmptyParams, options?: RequestOptions], APIPromise<T.MessageTemplate>, MessageTemplateGetErrorCode>;

export type MessageTemplateListParams = {
  /**
   * Page number (1-based). Selects page mode; mutually exclusive with after
   * and before.
   */
  page?: number;
  /**
   * Items per page. Defaults to 20, max 100 (larger values are clamped and
   * echoed as page_size).
   */
  limit?: number;
  /**
   * Opaque cursor: the page after this position. Pass a previous response's
   * next_cursor.
   */
  after?: string;
  /**
   * Opaque cursor: the page before this position. Pass a previous response's
   * prev_cursor.
   */
  before?: string;
  /**
   * Whether to count matching rows. Default: exact in page mode, none in
   * cursor mode.
   */
  total?: T.TotalMode;
  /**
   * Comma-separated sort fields, e.g. "name" or "-create_at,name". Each field
   * sorts ascending unless prefixed with "-" for descending.
   */
  sort?: string;
  /**
   * Only templates whose name starts with this prefix.
   */
  name?: string;
};
export type MessageTemplateListErrorCode =
  | DelegatedAccessErrorCode
  | "BAD_REQUEST"
  | "CLIENT_UPGRADE_REQUIRED"
  | "FORBIDDEN"
  | "INTERNAL_ERROR"
  | "PAGINATION_CURSOR_INVALID"
  | "PAGINATION_PARAMS_INVALID"
  | "UNAUTHORIZED"
  | "VALIDATION_FAILED";
export const messageTemplatesList = {
  id: "whatsapp.message_templates.list",
  method: "GET",
  path: "/v1/message-templates",
  parameters: [
    { member: "page", name: "page", in: "query", required: false, encoding: "scalar" },
    { member: "limit", name: "limit", in: "query", required: false, encoding: "scalar" },
    { member: "after", name: "after", in: "query", required: false, encoding: "scalar" },
    { member: "before", name: "before", in: "query", required: false, encoding: "scalar" },
    { member: "total", name: "total", in: "query", required: false, encoding: "scalar" },
    { member: "sort", name: "sort", in: "query", required: false, encoding: "scalar" },
    { member: "name", name: "name", in: "query", required: false, encoding: "scalar" },
  ],
  body: "none",
  success: { status: 200, body: "json", required: ["status", "templates"] },
  result: { kind: "page", key: "templates", pagination: {
    pageParam: "page",
    pageSizeParam: "limit",
    afterParam: "after",
    beforeParam: "before",
    totalParam: "total",
    defaultPageSize: 20,
    maxPageSize: 100,
    maxOffset: 10000,
    resultField: "templates",
    itemsField: "data",
    pageField: "page",
    pageSizeField: "page_size",
    hasNextPageField: "has_next_page",
    hasPrevPageField: "has_prev_page",
    nextCursorField: "next_cursor",
    prevCursorField: "prev_cursor",
    totalItemsField: "total_items",
    totalPagesField: "total_pages",
  } },
  idempotency: "safe",
  authentication: "required",
  organizationKeys: true,
  errors: [
    ...delegatedAccessCodes,
    "BAD_REQUEST",
    "CLIENT_UPGRADE_REQUIRED",
    "FORBIDDEN",
    "INTERNAL_ERROR",
    "PAGINATION_CURSOR_INVALID",
    "PAGINATION_PARAMS_INVALID",
    "UNAUTHORIZED",
    "VALIDATION_FAILED",
  ],
  "~types": undefined as unknown as { readonly args: [params?: MessageTemplateListParams, options?: RequestOptions]; readonly result: PagePromise<T.MessageTemplate> },
} as const satisfies Operation<[params?: MessageTemplateListParams, options?: RequestOptions], PagePromise<T.MessageTemplate>, MessageTemplateListErrorCode>;

export type MessageTemplatePreviewParams = T.PreviewMessageTemplateParam;
export type MessageTemplatePreviewResponse = {
  /**
   * Every variant rendered with the given values.
   */
  variants: T.RenderedTemplateVariant[];
};
export type MessageTemplatePreviewErrorCode =
  | DelegatedAccessErrorCode
  | "BAD_REQUEST"
  | "CLIENT_UPGRADE_REQUIRED"
  | "FORBIDDEN"
  | "INTERNAL_ERROR"
  | "UNAUTHORIZED"
  | "VALIDATION_FAILED"
  | "WHATSAPP_TEMPLATE_NOT_FOUND"
  | "WHATSAPP_TEMPLATE_RENDERED_TOO_LONG";
export const messageTemplatesPreview = {
  id: "whatsapp.message_templates.preview",
  method: "POST",
  path: "/v1/message-templates/{template_id}/preview",
  positional: "template_id",
  parameters: [],
  body: "required",
  success: { status: 200, body: "json", required: ["status", "variants"] },
  result: { kind: "object" },
  idempotency: "safe",
  authentication: "required",
  organizationKeys: true,
  errors: [
    ...delegatedAccessCodes,
    "BAD_REQUEST",
    "CLIENT_UPGRADE_REQUIRED",
    "FORBIDDEN",
    "INTERNAL_ERROR",
    "UNAUTHORIZED",
    "VALIDATION_FAILED",
    "WHATSAPP_TEMPLATE_NOT_FOUND",
    "WHATSAPP_TEMPLATE_RENDERED_TOO_LONG",
  ],
  "~types": undefined as unknown as { readonly args: [templateId: string, params: MessageTemplatePreviewParams, options?: RequestOptions]; readonly result: APIPromise<MessageTemplatePreviewResponse> },
} as const satisfies Operation<[templateId: string, params: MessageTemplatePreviewParams, options?: RequestOptions], APIPromise<MessageTemplatePreviewResponse>, MessageTemplatePreviewErrorCode>;

export type MessageTemplateReplaceParams = T.ReplaceMessageTemplateParam;
export type MessageTemplateReplaceErrorCode =
  | DelegatedAccessErrorCode
  | "BAD_REQUEST"
  | "CLIENT_UPGRADE_REQUIRED"
  | "CONFLICT"
  | "FORBIDDEN"
  | "INTERNAL_ERROR"
  | "UNAUTHORIZED"
  | "VALIDATION_FAILED"
  | "WHATSAPP_TEMPLATE_NAME_TAKEN"
  | "WHATSAPP_TEMPLATE_NOT_FOUND";
export const messageTemplatesReplace = {
  id: "whatsapp.message_templates.replace",
  method: "PUT",
  path: "/v1/message-templates/{template_id}",
  positional: "template_id",
  parameters: [],
  body: "required",
  success: { status: 200, body: "json", required: ["status", "template"] },
  result: { kind: "resource", key: "template" },
  idempotency: "safe",
  authentication: "required",
  organizationKeys: true,
  errors: [
    ...delegatedAccessCodes,
    "BAD_REQUEST",
    "CLIENT_UPGRADE_REQUIRED",
    "CONFLICT",
    "FORBIDDEN",
    "INTERNAL_ERROR",
    "UNAUTHORIZED",
    "VALIDATION_FAILED",
    "WHATSAPP_TEMPLATE_NAME_TAKEN",
    "WHATSAPP_TEMPLATE_NOT_FOUND",
  ],
  "~types": undefined as unknown as { readonly args: [templateId: string, params: MessageTemplateReplaceParams, options?: RequestOptions]; readonly result: APIPromise<T.MessageTemplate> },
} as const satisfies Operation<[templateId: string, params: MessageTemplateReplaceParams, options?: RequestOptions], APIPromise<T.MessageTemplate>, MessageTemplateReplaceErrorCode>;

export type MessageCreateParams = {
  /**
   * Outlet the request acts in. It must be an outlet the credential may use; omit it to use every such outlet.
   */
  outlet_id?: string;
} & T.CreateMessageParam;
export type MessageCreateErrorCode =
  | DelegatedAccessErrorCode
  | "BAD_REQUEST"
  | "CLIENT_UPGRADE_REQUIRED"
  | "CONFLICT"
  | "FORBIDDEN"
  | "IDEMPOTENCY_KEY_CONFLICT"
  | "IDEMPOTENCY_KEY_REQUIRED"
  | "INTERNAL_ERROR"
  | "UNAUTHORIZED"
  | "VALIDATION_FAILED"
  | "WHATSAPP_AGENT_NOT_READY"
  | "WHATSAPP_AGENT_PENDING_MESSAGES_LIMIT_REACHED"
  | "WHATSAPP_MESSAGE_OPERATION_NOT_ALLOWED"
  | "WHATSAPP_MESSAGE_PRIORITY_NOT_ALLOWED"
  | "WHATSAPP_MESSAGE_RUNTIME_UNSUPPORTED"
  | "WHATSAPP_MESSAGE_TARGET_NOT_FOUND"
  | "WHATSAPP_MESSAGE_TARGET_NOT_SENT"
  | "WHATSAPP_SENDER_AGENT_NOT_FOUND"
  | "WHATSAPP_SYSTEM_AGENT_UNAVAILABLE"
  | "WHATSAPP_TEMPLATE_NOT_FOUND"
  | "WHATSAPP_TEMPLATE_RENDERED_TOO_LONG";
export const messagesCreate = {
  id: "whatsapp.messages.create",
  method: "POST",
  path: "/v1/messages",
  parameters: [
    { member: "outlet_id", name: "outlet_id", in: "query", required: false, encoding: "scalar" },
  ],
  body: "required",
  success: { status: 201, body: "json", required: ["message", "status"] },
  result: { kind: "resource", key: "message" },
  idempotency: "keyed",
  authentication: "required",
  organizationKeys: true,
  errors: [
    ...delegatedAccessCodes,
    "BAD_REQUEST",
    "CLIENT_UPGRADE_REQUIRED",
    "CONFLICT",
    "FORBIDDEN",
    "IDEMPOTENCY_KEY_CONFLICT",
    "IDEMPOTENCY_KEY_REQUIRED",
    "INTERNAL_ERROR",
    "UNAUTHORIZED",
    "VALIDATION_FAILED",
    "WHATSAPP_AGENT_NOT_READY",
    "WHATSAPP_AGENT_PENDING_MESSAGES_LIMIT_REACHED",
    "WHATSAPP_MESSAGE_OPERATION_NOT_ALLOWED",
    "WHATSAPP_MESSAGE_PRIORITY_NOT_ALLOWED",
    "WHATSAPP_MESSAGE_RUNTIME_UNSUPPORTED",
    "WHATSAPP_MESSAGE_TARGET_NOT_FOUND",
    "WHATSAPP_MESSAGE_TARGET_NOT_SENT",
    "WHATSAPP_SENDER_AGENT_NOT_FOUND",
    "WHATSAPP_SYSTEM_AGENT_UNAVAILABLE",
    "WHATSAPP_TEMPLATE_NOT_FOUND",
    "WHATSAPP_TEMPLATE_RENDERED_TOO_LONG",
  ],
  "~types": undefined as unknown as { readonly args: [params: MessageCreateParams, options?: KeyedRequestOptions]; readonly result: APIPromise<T.Message> },
} as const satisfies Operation<[params: MessageCreateParams, options?: KeyedRequestOptions], APIPromise<T.Message>, MessageCreateErrorCode>;

export type MessageGetParams = {
  /**
   * Outlet the request acts in. It must be an outlet the credential may use; omit it to use every such outlet.
   */
  outlet_id?: string;
};
export type MessageGetErrorCode =
  | DelegatedAccessErrorCode
  | "BAD_REQUEST"
  | "CLIENT_UPGRADE_REQUIRED"
  | "FORBIDDEN"
  | "INTERNAL_ERROR"
  | "UNAUTHORIZED"
  | "VALIDATION_FAILED"
  | "WHATSAPP_MESSAGE_NOT_FOUND";
export const messagesGet = {
  id: "whatsapp.messages.get",
  method: "GET",
  path: "/v1/messages/{message_id}",
  positional: "message_id",
  parameters: [
    { member: "outlet_id", name: "outlet_id", in: "query", required: false, encoding: "scalar" },
  ],
  body: "none",
  success: { status: 200, body: "json", required: ["message", "status"] },
  result: { kind: "resource", key: "message" },
  idempotency: "safe",
  authentication: "required",
  organizationKeys: true,
  errors: [
    ...delegatedAccessCodes,
    "BAD_REQUEST",
    "CLIENT_UPGRADE_REQUIRED",
    "FORBIDDEN",
    "INTERNAL_ERROR",
    "UNAUTHORIZED",
    "VALIDATION_FAILED",
    "WHATSAPP_MESSAGE_NOT_FOUND",
  ],
  "~types": undefined as unknown as { readonly args: [messageId: string, params?: MessageGetParams, options?: RequestOptions]; readonly result: APIPromise<T.Message> },
} as const satisfies Operation<[messageId: string, params?: MessageGetParams, options?: RequestOptions], APIPromise<T.Message>, MessageGetErrorCode>;

export type MessageListParams = {
  /**
   * Only messages sent by agents of this outlet.
   */
  outlet_id?: string | null;
  /**
   * Page number (1-based). Selects page mode; mutually exclusive with after
   * and before.
   */
  page?: number;
  /**
   * Items per page. Defaults to 20, max 100 (larger values are clamped and
   * echoed as page_size).
   */
  limit?: number;
  /**
   * Opaque cursor: the page after this position. Pass a previous response's
   * next_cursor.
   */
  after?: string;
  /**
   * Opaque cursor: the page before this position. Pass a previous response's
   * prev_cursor.
   */
  before?: string;
  /**
   * Whether to count matching rows. Default: exact in page mode, none in
   * cursor mode.
   */
  total?: T.TotalMode;
  /**
   * Comma-separated sort fields, e.g. "name" or "-create_at,name". Each field
   * sorts ascending unless prefixed with "-" for descending.
   */
  sort?: string;
  /**
   * Only messages sent by this agent.
   */
  agent_id?: string;
  /**
   * Only messages in this status.
   */
  status?: T.MessageStatusParam;
  /**
   * Only messages to this phone number.
   */
  to?: string | null;
  /**
   * Only messages from this sender phone number.
   */
  from?: string | null;
  /**
   * Only messages accepted at or after this time.
   */
  "create_at[gte]"?: string | null;
  /**
   * Only messages accepted at or before this time.
   */
  "create_at[lte]"?: string | null;
};
export type MessageListErrorCode =
  | DelegatedAccessErrorCode
  | "BAD_REQUEST"
  | "CLIENT_UPGRADE_REQUIRED"
  | "FORBIDDEN"
  | "INTERNAL_ERROR"
  | "PAGINATION_CURSOR_INVALID"
  | "PAGINATION_PARAMS_INVALID"
  | "UNAUTHORIZED"
  | "VALIDATION_FAILED";
export const messagesList = {
  id: "whatsapp.messages.list",
  method: "GET",
  path: "/v1/messages",
  parameters: [
    { member: "outlet_id", name: "outlet_id", in: "query", required: false, encoding: "scalar" },
    { member: "page", name: "page", in: "query", required: false, encoding: "scalar" },
    { member: "limit", name: "limit", in: "query", required: false, encoding: "scalar" },
    { member: "after", name: "after", in: "query", required: false, encoding: "scalar" },
    { member: "before", name: "before", in: "query", required: false, encoding: "scalar" },
    { member: "total", name: "total", in: "query", required: false, encoding: "scalar" },
    { member: "sort", name: "sort", in: "query", required: false, encoding: "scalar" },
    { member: "agent_id", name: "agent_id", in: "query", required: false, encoding: "scalar" },
    { member: "status", name: "status", in: "query", required: false, encoding: "scalar" },
    { member: "to", name: "to", in: "query", required: false, encoding: "scalar" },
    { member: "from", name: "from", in: "query", required: false, encoding: "scalar" },
    { member: "create_at[gte]", name: "create_at[gte]", in: "query", required: false, encoding: "scalar" },
    { member: "create_at[lte]", name: "create_at[lte]", in: "query", required: false, encoding: "scalar" },
  ],
  body: "none",
  success: { status: 200, body: "json", required: ["messages", "status"] },
  result: { kind: "page", key: "messages", pagination: {
    pageParam: "page",
    pageSizeParam: "limit",
    afterParam: "after",
    beforeParam: "before",
    totalParam: "total",
    defaultPageSize: 20,
    maxPageSize: 100,
    maxOffset: 10000,
    resultField: "messages",
    itemsField: "data",
    pageField: "page",
    pageSizeField: "page_size",
    hasNextPageField: "has_next_page",
    hasPrevPageField: "has_prev_page",
    nextCursorField: "next_cursor",
    prevCursorField: "prev_cursor",
    totalItemsField: "total_items",
    totalPagesField: "total_pages",
  } },
  idempotency: "safe",
  authentication: "required",
  organizationKeys: true,
  errors: [
    ...delegatedAccessCodes,
    "BAD_REQUEST",
    "CLIENT_UPGRADE_REQUIRED",
    "FORBIDDEN",
    "INTERNAL_ERROR",
    "PAGINATION_CURSOR_INVALID",
    "PAGINATION_PARAMS_INVALID",
    "UNAUTHORIZED",
    "VALIDATION_FAILED",
  ],
  "~types": undefined as unknown as { readonly args: [params?: MessageListParams, options?: RequestOptions]; readonly result: PagePromise<T.Message> },
} as const satisfies Operation<[params?: MessageListParams, options?: RequestOptions], PagePromise<T.Message>, MessageListErrorCode>;
