// Generated from the GatherDeal public API contracts. Do not edit.

import type { Operation } from "../../operation.js";
import type * as T from "./types.js";

export type AgentsCreateInput = T.CreateAgentInput;
export type AgentsCreateOutput = T.CreateAgentOutputEnvelope;
export type AgentsCreateErrorCode = 
  | "BAD_REQUEST"
  | "CLIENT_UPGRADE_REQUIRED"
  | "CONFLICT"
  | "DELEGATED_ACCESS_AUDIENCE_MISMATCH"
  | "DELEGATED_ACCESS_CREDENTIAL_LOCATION"
  | "DELEGATED_ACCESS_EFFECT_NOT_ALLOWED"
  | "DELEGATED_ACCESS_EXPANSION_NOT_ALLOWED"
  | "DELEGATED_ACCESS_FEATURE_NOT_ENTITLED"
  | "DELEGATED_ACCESS_FILTER_NOT_ALLOWED"
  | "DELEGATED_ACCESS_IMPERSONATION_NOT_ALLOWED"
  | "DELEGATED_ACCESS_INACTIVE"
  | "DELEGATED_ACCESS_KIND_NOT_ALLOWED"
  | "DELEGATED_ACCESS_ORGANIZATION_KEY_NOT_ADMITTED"
  | "DELEGATED_ACCESS_ORGANIZATION_MISMATCH"
  | "DELEGATED_ACCESS_OUTLET_NOT_ALLOWED"
  | "DELEGATED_ACCESS_PERMISSION_DENIED"
  | "DELEGATED_ACCESS_PRINCIPAL_INACTIVE"
  | "DELEGATED_ACCESS_ROUTE_NOT_ALLOWED"
  | "DELEGATED_ACCESS_TARGET_MISMATCH"
  | "DELEGATED_ACCESS_UNSUPPORTED"
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
  success: { status: 201, body: "json", required: ["agent", "status"] },
  body: "required",
  idempotency: "keyed",
  authentication: "required",
  organizationKeys: false,
  errors: [
    "BAD_REQUEST",
    "CLIENT_UPGRADE_REQUIRED",
    "CONFLICT",
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
  "~types": undefined as unknown as { readonly input: AgentsCreateInput; readonly output: AgentsCreateOutput },
} as const satisfies Operation<AgentsCreateInput, AgentsCreateOutput, AgentsCreateErrorCode>;

export type AgentsDeleteInput = {
  /**
   * The agent to delete.
   */
  agent_id: string;
  /**
   * Outlet the request acts in. It must be an outlet the credential may use; omit it to use every such outlet.
   */
  outlet_id?: string;
};
export type AgentsDeleteOutput = T.DeleteAgentOutputEnvelope;
export type AgentsDeleteErrorCode = 
  | "BAD_REQUEST"
  | "CLIENT_UPGRADE_REQUIRED"
  | "CONFLICT"
  | "DELEGATED_ACCESS_AUDIENCE_MISMATCH"
  | "DELEGATED_ACCESS_CREDENTIAL_LOCATION"
  | "DELEGATED_ACCESS_EFFECT_NOT_ALLOWED"
  | "DELEGATED_ACCESS_EXPANSION_NOT_ALLOWED"
  | "DELEGATED_ACCESS_FEATURE_NOT_ENTITLED"
  | "DELEGATED_ACCESS_FILTER_NOT_ALLOWED"
  | "DELEGATED_ACCESS_IMPERSONATION_NOT_ALLOWED"
  | "DELEGATED_ACCESS_INACTIVE"
  | "DELEGATED_ACCESS_KIND_NOT_ALLOWED"
  | "DELEGATED_ACCESS_ORGANIZATION_KEY_NOT_ADMITTED"
  | "DELEGATED_ACCESS_ORGANIZATION_MISMATCH"
  | "DELEGATED_ACCESS_OUTLET_NOT_ALLOWED"
  | "DELEGATED_ACCESS_PERMISSION_DENIED"
  | "DELEGATED_ACCESS_PRINCIPAL_INACTIVE"
  | "DELEGATED_ACCESS_ROUTE_NOT_ALLOWED"
  | "DELEGATED_ACCESS_TARGET_MISMATCH"
  | "DELEGATED_ACCESS_UNSUPPORTED"
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
  parameters: [
    { member: "agent_id", name: "agent_id", in: "path", required: true, encoding: "scalar" },
    { member: "outlet_id", name: "outlet_id", in: "query", required: false, encoding: "scalar" },
  ],
  success: { status: 202, body: "json", required: ["deletion", "status"] },
  body: "none",
  idempotency: "safe",
  authentication: "required",
  organizationKeys: false,
  errors: [
    "BAD_REQUEST",
    "CLIENT_UPGRADE_REQUIRED",
    "CONFLICT",
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
    "FORBIDDEN",
    "INTERNAL_ERROR",
    "UNAUTHORIZED",
    "VALIDATION_FAILED",
    "WHATSAPP_AGENTS_FENCED",
    "WHATSAPP_AGENT_NOT_FOUND",
  ],
  "~types": undefined as unknown as { readonly input: AgentsDeleteInput; readonly output: AgentsDeleteOutput },
} as const satisfies Operation<AgentsDeleteInput, AgentsDeleteOutput, AgentsDeleteErrorCode>;

export type AgentsGetInput = {
  /**
   * The agent to read.
   */
  agent_id: string;
  /**
   * Outlet the request acts in. It must be an outlet the credential may use; omit it to use every such outlet.
   */
  outlet_id?: string;
};
export type AgentsGetOutput = T.FetchAgentOutputEnvelope;
export type AgentsGetErrorCode = 
  | "BAD_REQUEST"
  | "CLIENT_UPGRADE_REQUIRED"
  | "DELEGATED_ACCESS_AUDIENCE_MISMATCH"
  | "DELEGATED_ACCESS_CREDENTIAL_LOCATION"
  | "DELEGATED_ACCESS_EFFECT_NOT_ALLOWED"
  | "DELEGATED_ACCESS_EXPANSION_NOT_ALLOWED"
  | "DELEGATED_ACCESS_FEATURE_NOT_ENTITLED"
  | "DELEGATED_ACCESS_FILTER_NOT_ALLOWED"
  | "DELEGATED_ACCESS_IMPERSONATION_NOT_ALLOWED"
  | "DELEGATED_ACCESS_INACTIVE"
  | "DELEGATED_ACCESS_KIND_NOT_ALLOWED"
  | "DELEGATED_ACCESS_ORGANIZATION_KEY_NOT_ADMITTED"
  | "DELEGATED_ACCESS_ORGANIZATION_MISMATCH"
  | "DELEGATED_ACCESS_OUTLET_NOT_ALLOWED"
  | "DELEGATED_ACCESS_PERMISSION_DENIED"
  | "DELEGATED_ACCESS_PRINCIPAL_INACTIVE"
  | "DELEGATED_ACCESS_ROUTE_NOT_ALLOWED"
  | "DELEGATED_ACCESS_TARGET_MISMATCH"
  | "DELEGATED_ACCESS_UNSUPPORTED"
  | "FORBIDDEN"
  | "INTERNAL_ERROR"
  | "UNAUTHORIZED"
  | "VALIDATION_FAILED"
  | "WHATSAPP_AGENT_NOT_FOUND";
export const agentsGet = {
  id: "whatsapp.agents.get",
  method: "GET",
  path: "/v1/agents/{agent_id}",
  parameters: [
    { member: "agent_id", name: "agent_id", in: "path", required: true, encoding: "scalar" },
    { member: "outlet_id", name: "outlet_id", in: "query", required: false, encoding: "scalar" },
  ],
  success: { status: 200, body: "json", required: ["agent", "status"] },
  body: "none",
  idempotency: "safe",
  authentication: "required",
  organizationKeys: false,
  errors: [
    "BAD_REQUEST",
    "CLIENT_UPGRADE_REQUIRED",
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
    "FORBIDDEN",
    "INTERNAL_ERROR",
    "UNAUTHORIZED",
    "VALIDATION_FAILED",
    "WHATSAPP_AGENT_NOT_FOUND",
  ],
  "~types": undefined as unknown as { readonly input: AgentsGetInput; readonly output: AgentsGetOutput },
} as const satisfies Operation<AgentsGetInput, AgentsGetOutput, AgentsGetErrorCode>;

export type AgentsListInput = {
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
export type AgentsListOutput = T.FetchAgentsOutputEnvelope;
export type AgentsListErrorCode = 
  | "BAD_REQUEST"
  | "CLIENT_UPGRADE_REQUIRED"
  | "DELEGATED_ACCESS_AUDIENCE_MISMATCH"
  | "DELEGATED_ACCESS_CREDENTIAL_LOCATION"
  | "DELEGATED_ACCESS_EFFECT_NOT_ALLOWED"
  | "DELEGATED_ACCESS_EXPANSION_NOT_ALLOWED"
  | "DELEGATED_ACCESS_FEATURE_NOT_ENTITLED"
  | "DELEGATED_ACCESS_FILTER_NOT_ALLOWED"
  | "DELEGATED_ACCESS_IMPERSONATION_NOT_ALLOWED"
  | "DELEGATED_ACCESS_INACTIVE"
  | "DELEGATED_ACCESS_KIND_NOT_ALLOWED"
  | "DELEGATED_ACCESS_ORGANIZATION_KEY_NOT_ADMITTED"
  | "DELEGATED_ACCESS_ORGANIZATION_MISMATCH"
  | "DELEGATED_ACCESS_OUTLET_NOT_ALLOWED"
  | "DELEGATED_ACCESS_PERMISSION_DENIED"
  | "DELEGATED_ACCESS_PRINCIPAL_INACTIVE"
  | "DELEGATED_ACCESS_ROUTE_NOT_ALLOWED"
  | "DELEGATED_ACCESS_TARGET_MISMATCH"
  | "DELEGATED_ACCESS_UNSUPPORTED"
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
  success: { status: 200, body: "json", required: ["agents", "status"] },
  body: "none",
  idempotency: "safe",
  authentication: "required",
  organizationKeys: false,
  pagination: {
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
  },
  errors: [
    "BAD_REQUEST",
    "CLIENT_UPGRADE_REQUIRED",
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
    "FORBIDDEN",
    "INTERNAL_ERROR",
    "PAGINATION_CURSOR_INVALID",
    "PAGINATION_PARAMS_INVALID",
    "UNAUTHORIZED",
    "VALIDATION_FAILED",
  ],
  "~types": undefined as unknown as { readonly input: AgentsListInput; readonly output: AgentsListOutput },
} as const satisfies Operation<AgentsListInput, AgentsListOutput, AgentsListErrorCode>;

export type AgentsPairingGetInput = {
  /**
   * The agent being paired.
   */
  agent_id: string;
  /**
   * Outlet the request acts in. It must be an outlet the credential may use; omit it to use every such outlet.
   */
  outlet_id?: string;
};
export type AgentsPairingGetOutput = T.FetchAgentPairingOutputEnvelope;
export type AgentsPairingGetErrorCode = 
  | "BAD_REQUEST"
  | "CLIENT_UPGRADE_REQUIRED"
  | "DELEGATED_ACCESS_AUDIENCE_MISMATCH"
  | "DELEGATED_ACCESS_CREDENTIAL_LOCATION"
  | "DELEGATED_ACCESS_EFFECT_NOT_ALLOWED"
  | "DELEGATED_ACCESS_EXPANSION_NOT_ALLOWED"
  | "DELEGATED_ACCESS_FEATURE_NOT_ENTITLED"
  | "DELEGATED_ACCESS_FILTER_NOT_ALLOWED"
  | "DELEGATED_ACCESS_IMPERSONATION_NOT_ALLOWED"
  | "DELEGATED_ACCESS_INACTIVE"
  | "DELEGATED_ACCESS_KIND_NOT_ALLOWED"
  | "DELEGATED_ACCESS_ORGANIZATION_KEY_NOT_ADMITTED"
  | "DELEGATED_ACCESS_ORGANIZATION_MISMATCH"
  | "DELEGATED_ACCESS_OUTLET_NOT_ALLOWED"
  | "DELEGATED_ACCESS_PERMISSION_DENIED"
  | "DELEGATED_ACCESS_PRINCIPAL_INACTIVE"
  | "DELEGATED_ACCESS_ROUTE_NOT_ALLOWED"
  | "DELEGATED_ACCESS_TARGET_MISMATCH"
  | "DELEGATED_ACCESS_UNSUPPORTED"
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
  success: { status: 200, body: "json", required: ["pairing", "status"] },
  body: "none",
  idempotency: "safe",
  authentication: "required",
  organizationKeys: false,
  errors: [
    "BAD_REQUEST",
    "CLIENT_UPGRADE_REQUIRED",
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
    "FORBIDDEN",
    "INTERNAL_ERROR",
    "UNAUTHORIZED",
    "VALIDATION_FAILED",
    "WHATSAPP_AGENT_NOT_FOUND",
  ],
  "~types": undefined as unknown as { readonly input: AgentsPairingGetInput; readonly output: AgentsPairingGetOutput },
} as const satisfies Operation<AgentsPairingGetInput, AgentsPairingGetOutput, AgentsPairingGetErrorCode>;

export type AgentsUpdateInput = {
  /**
   * Pass `if_match` as the revision at `/agent/revision` in the result of `whatsapp.agents.get`, unchanged. A stale revision fails with `PRECONDITION_FAILED`: read again, reapply the change, and retry.
   */
  if_match: string;
  /**
   * The agent to update.
   */
  agent_id: string;
} & T.UpdateAgentInput;
export type AgentsUpdateOutput = T.UpdateAgentOutputEnvelope;
export type AgentsUpdateErrorCode = 
  | "BAD_REQUEST"
  | "CLIENT_UPGRADE_REQUIRED"
  | "CONFLICT"
  | "DELEGATED_ACCESS_AUDIENCE_MISMATCH"
  | "DELEGATED_ACCESS_CREDENTIAL_LOCATION"
  | "DELEGATED_ACCESS_EFFECT_NOT_ALLOWED"
  | "DELEGATED_ACCESS_EXPANSION_NOT_ALLOWED"
  | "DELEGATED_ACCESS_FEATURE_NOT_ENTITLED"
  | "DELEGATED_ACCESS_FILTER_NOT_ALLOWED"
  | "DELEGATED_ACCESS_IMPERSONATION_NOT_ALLOWED"
  | "DELEGATED_ACCESS_INACTIVE"
  | "DELEGATED_ACCESS_KIND_NOT_ALLOWED"
  | "DELEGATED_ACCESS_ORGANIZATION_KEY_NOT_ADMITTED"
  | "DELEGATED_ACCESS_ORGANIZATION_MISMATCH"
  | "DELEGATED_ACCESS_OUTLET_NOT_ALLOWED"
  | "DELEGATED_ACCESS_PERMISSION_DENIED"
  | "DELEGATED_ACCESS_PRINCIPAL_INACTIVE"
  | "DELEGATED_ACCESS_ROUTE_NOT_ALLOWED"
  | "DELEGATED_ACCESS_TARGET_MISMATCH"
  | "DELEGATED_ACCESS_UNSUPPORTED"
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
  parameters: [
    { member: "if_match", name: "If-Match", in: "header", required: true, encoding: "scalar" },
    { member: "agent_id", name: "agent_id", in: "path", required: true, encoding: "scalar" },
  ],
  success: { status: 200, body: "json", required: ["agent", "status"] },
  body: "required",
  idempotency: "safe",
  authentication: "required",
  organizationKeys: false,
  ifMatch: { operation: "whatsapp.agents.get", pointer: "/agent/revision" },
  errors: [
    "BAD_REQUEST",
    "CLIENT_UPGRADE_REQUIRED",
    "CONFLICT",
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
  "~types": undefined as unknown as { readonly input: AgentsUpdateInput; readonly output: AgentsUpdateOutput },
} as const satisfies Operation<AgentsUpdateInput, AgentsUpdateOutput, AgentsUpdateErrorCode>;

export type BroadcastSuppressionsAddInput = T.AddBroadcastSuppressionsInput;
export type BroadcastSuppressionsAddOutput = T.AddBroadcastRecipientsOutputEnvelope;
export type BroadcastSuppressionsAddErrorCode = 
  | "BAD_REQUEST"
  | "CLIENT_UPGRADE_REQUIRED"
  | "CONFLICT"
  | "DELEGATED_ACCESS_AUDIENCE_MISMATCH"
  | "DELEGATED_ACCESS_CREDENTIAL_LOCATION"
  | "DELEGATED_ACCESS_EFFECT_NOT_ALLOWED"
  | "DELEGATED_ACCESS_EXPANSION_NOT_ALLOWED"
  | "DELEGATED_ACCESS_FEATURE_NOT_ENTITLED"
  | "DELEGATED_ACCESS_FILTER_NOT_ALLOWED"
  | "DELEGATED_ACCESS_IMPERSONATION_NOT_ALLOWED"
  | "DELEGATED_ACCESS_INACTIVE"
  | "DELEGATED_ACCESS_KIND_NOT_ALLOWED"
  | "DELEGATED_ACCESS_ORGANIZATION_KEY_NOT_ADMITTED"
  | "DELEGATED_ACCESS_ORGANIZATION_MISMATCH"
  | "DELEGATED_ACCESS_OUTLET_NOT_ALLOWED"
  | "DELEGATED_ACCESS_PERMISSION_DENIED"
  | "DELEGATED_ACCESS_PRINCIPAL_INACTIVE"
  | "DELEGATED_ACCESS_ROUTE_NOT_ALLOWED"
  | "DELEGATED_ACCESS_TARGET_MISMATCH"
  | "DELEGATED_ACCESS_UNSUPPORTED"
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
  success: { status: 200, body: "json", required: ["added", "duplicates", "status"] },
  body: "required",
  idempotency: "keyed",
  authentication: "required",
  organizationKeys: true,
  errors: [
    "BAD_REQUEST",
    "CLIENT_UPGRADE_REQUIRED",
    "CONFLICT",
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
    "FORBIDDEN",
    "IDEMPOTENCY_KEY_CONFLICT",
    "IDEMPOTENCY_KEY_REQUIRED",
    "INTERNAL_ERROR",
    "UNAUTHORIZED",
    "VALIDATION_FAILED",
  ],
  "~types": undefined as unknown as { readonly input: BroadcastSuppressionsAddInput; readonly output: BroadcastSuppressionsAddOutput },
} as const satisfies Operation<BroadcastSuppressionsAddInput, BroadcastSuppressionsAddOutput, BroadcastSuppressionsAddErrorCode>;

export type BroadcastSuppressionsDeleteInput = {
  /**
   * The suppression to remove.
   */
  suppression_id: string;
};
export type BroadcastSuppressionsDeleteOutput = void;
export type BroadcastSuppressionsDeleteErrorCode = 
  | "BAD_REQUEST"
  | "CLIENT_UPGRADE_REQUIRED"
  | "CONFLICT"
  | "DELEGATED_ACCESS_AUDIENCE_MISMATCH"
  | "DELEGATED_ACCESS_CREDENTIAL_LOCATION"
  | "DELEGATED_ACCESS_EFFECT_NOT_ALLOWED"
  | "DELEGATED_ACCESS_EXPANSION_NOT_ALLOWED"
  | "DELEGATED_ACCESS_FEATURE_NOT_ENTITLED"
  | "DELEGATED_ACCESS_FILTER_NOT_ALLOWED"
  | "DELEGATED_ACCESS_IMPERSONATION_NOT_ALLOWED"
  | "DELEGATED_ACCESS_INACTIVE"
  | "DELEGATED_ACCESS_KIND_NOT_ALLOWED"
  | "DELEGATED_ACCESS_ORGANIZATION_KEY_NOT_ADMITTED"
  | "DELEGATED_ACCESS_ORGANIZATION_MISMATCH"
  | "DELEGATED_ACCESS_OUTLET_NOT_ALLOWED"
  | "DELEGATED_ACCESS_PERMISSION_DENIED"
  | "DELEGATED_ACCESS_PRINCIPAL_INACTIVE"
  | "DELEGATED_ACCESS_ROUTE_NOT_ALLOWED"
  | "DELEGATED_ACCESS_TARGET_MISMATCH"
  | "DELEGATED_ACCESS_UNSUPPORTED"
  | "FORBIDDEN"
  | "INTERNAL_ERROR"
  | "UNAUTHORIZED"
  | "VALIDATION_FAILED"
  | "WHATSAPP_BROADCAST_SUPPRESSION_NOT_FOUND";
export const broadcastSuppressionsDelete = {
  id: "whatsapp.broadcast_suppressions.delete",
  method: "DELETE",
  path: "/v1/broadcast-suppressions/{suppression_id}",
  parameters: [
    { member: "suppression_id", name: "suppression_id", in: "path", required: true, encoding: "scalar" },
  ],
  success: { status: 204, body: "none", required: [] },
  body: "none",
  idempotency: "safe",
  authentication: "required",
  organizationKeys: true,
  errors: [
    "BAD_REQUEST",
    "CLIENT_UPGRADE_REQUIRED",
    "CONFLICT",
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
    "FORBIDDEN",
    "INTERNAL_ERROR",
    "UNAUTHORIZED",
    "VALIDATION_FAILED",
    "WHATSAPP_BROADCAST_SUPPRESSION_NOT_FOUND",
  ],
  "~types": undefined as unknown as { readonly input: BroadcastSuppressionsDeleteInput; readonly output: BroadcastSuppressionsDeleteOutput },
} as const satisfies Operation<BroadcastSuppressionsDeleteInput, BroadcastSuppressionsDeleteOutput, BroadcastSuppressionsDeleteErrorCode>;

export type BroadcastSuppressionsListInput = {
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
export type BroadcastSuppressionsListOutput = T.FetchBroadcastSuppressionsOutputEnvelope;
export type BroadcastSuppressionsListErrorCode = 
  | "BAD_REQUEST"
  | "CLIENT_UPGRADE_REQUIRED"
  | "DELEGATED_ACCESS_AUDIENCE_MISMATCH"
  | "DELEGATED_ACCESS_CREDENTIAL_LOCATION"
  | "DELEGATED_ACCESS_EFFECT_NOT_ALLOWED"
  | "DELEGATED_ACCESS_EXPANSION_NOT_ALLOWED"
  | "DELEGATED_ACCESS_FEATURE_NOT_ENTITLED"
  | "DELEGATED_ACCESS_FILTER_NOT_ALLOWED"
  | "DELEGATED_ACCESS_IMPERSONATION_NOT_ALLOWED"
  | "DELEGATED_ACCESS_INACTIVE"
  | "DELEGATED_ACCESS_KIND_NOT_ALLOWED"
  | "DELEGATED_ACCESS_ORGANIZATION_KEY_NOT_ADMITTED"
  | "DELEGATED_ACCESS_ORGANIZATION_MISMATCH"
  | "DELEGATED_ACCESS_OUTLET_NOT_ALLOWED"
  | "DELEGATED_ACCESS_PERMISSION_DENIED"
  | "DELEGATED_ACCESS_PRINCIPAL_INACTIVE"
  | "DELEGATED_ACCESS_ROUTE_NOT_ALLOWED"
  | "DELEGATED_ACCESS_TARGET_MISMATCH"
  | "DELEGATED_ACCESS_UNSUPPORTED"
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
  success: { status: 200, body: "json", required: ["status", "suppressions"] },
  body: "none",
  idempotency: "safe",
  authentication: "required",
  organizationKeys: true,
  pagination: {
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
  },
  errors: [
    "BAD_REQUEST",
    "CLIENT_UPGRADE_REQUIRED",
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
    "FORBIDDEN",
    "INTERNAL_ERROR",
    "PAGINATION_CURSOR_INVALID",
    "PAGINATION_PARAMS_INVALID",
    "UNAUTHORIZED",
    "VALIDATION_FAILED",
  ],
  "~types": undefined as unknown as { readonly input: BroadcastSuppressionsListInput; readonly output: BroadcastSuppressionsListOutput },
} as const satisfies Operation<BroadcastSuppressionsListInput, BroadcastSuppressionsListOutput, BroadcastSuppressionsListErrorCode>;

export type BroadcastsCancelInput = {
  broadcast_id: string;
};
export type BroadcastsCancelOutput = T.BroadcastOutputEnvelope;
export type BroadcastsCancelErrorCode = 
  | "BAD_REQUEST"
  | "CLIENT_UPGRADE_REQUIRED"
  | "CONFLICT"
  | "DELEGATED_ACCESS_AUDIENCE_MISMATCH"
  | "DELEGATED_ACCESS_CREDENTIAL_LOCATION"
  | "DELEGATED_ACCESS_EFFECT_NOT_ALLOWED"
  | "DELEGATED_ACCESS_EXPANSION_NOT_ALLOWED"
  | "DELEGATED_ACCESS_FEATURE_NOT_ENTITLED"
  | "DELEGATED_ACCESS_FILTER_NOT_ALLOWED"
  | "DELEGATED_ACCESS_IMPERSONATION_NOT_ALLOWED"
  | "DELEGATED_ACCESS_INACTIVE"
  | "DELEGATED_ACCESS_KIND_NOT_ALLOWED"
  | "DELEGATED_ACCESS_ORGANIZATION_KEY_NOT_ADMITTED"
  | "DELEGATED_ACCESS_ORGANIZATION_MISMATCH"
  | "DELEGATED_ACCESS_OUTLET_NOT_ALLOWED"
  | "DELEGATED_ACCESS_PERMISSION_DENIED"
  | "DELEGATED_ACCESS_PRINCIPAL_INACTIVE"
  | "DELEGATED_ACCESS_ROUTE_NOT_ALLOWED"
  | "DELEGATED_ACCESS_TARGET_MISMATCH"
  | "DELEGATED_ACCESS_UNSUPPORTED"
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
  parameters: [
    { member: "broadcast_id", name: "broadcast_id", in: "path", required: true, encoding: "scalar" },
  ],
  success: { status: 200, body: "json", required: ["broadcast", "status"] },
  body: "none",
  idempotency: "safe",
  authentication: "required",
  organizationKeys: true,
  errors: [
    "BAD_REQUEST",
    "CLIENT_UPGRADE_REQUIRED",
    "CONFLICT",
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
    "FORBIDDEN",
    "INTERNAL_ERROR",
    "UNAUTHORIZED",
    "VALIDATION_FAILED",
    "WHATSAPP_BROADCAST_NOT_FOUND",
    "WHATSAPP_BROADCAST_STATE_CONFLICT",
  ],
  "~types": undefined as unknown as { readonly input: BroadcastsCancelInput; readonly output: BroadcastsCancelOutput },
} as const satisfies Operation<BroadcastsCancelInput, BroadcastsCancelOutput, BroadcastsCancelErrorCode>;

export type BroadcastsCreateInput = {
  /**
   * Outlet the request acts in. It must be an outlet the credential may use; omit it to use every such outlet.
   */
  outlet_id?: string;
} & T.CreateBroadcastInput;
export type BroadcastsCreateOutput = T.BroadcastOutputEnvelope;
export type BroadcastsCreateErrorCode = 
  | "BAD_REQUEST"
  | "CLIENT_UPGRADE_REQUIRED"
  | "CONFLICT"
  | "DELEGATED_ACCESS_AUDIENCE_MISMATCH"
  | "DELEGATED_ACCESS_CREDENTIAL_LOCATION"
  | "DELEGATED_ACCESS_EFFECT_NOT_ALLOWED"
  | "DELEGATED_ACCESS_EXPANSION_NOT_ALLOWED"
  | "DELEGATED_ACCESS_FEATURE_NOT_ENTITLED"
  | "DELEGATED_ACCESS_FILTER_NOT_ALLOWED"
  | "DELEGATED_ACCESS_IMPERSONATION_NOT_ALLOWED"
  | "DELEGATED_ACCESS_INACTIVE"
  | "DELEGATED_ACCESS_KIND_NOT_ALLOWED"
  | "DELEGATED_ACCESS_ORGANIZATION_KEY_NOT_ADMITTED"
  | "DELEGATED_ACCESS_ORGANIZATION_MISMATCH"
  | "DELEGATED_ACCESS_OUTLET_NOT_ALLOWED"
  | "DELEGATED_ACCESS_PERMISSION_DENIED"
  | "DELEGATED_ACCESS_PRINCIPAL_INACTIVE"
  | "DELEGATED_ACCESS_ROUTE_NOT_ALLOWED"
  | "DELEGATED_ACCESS_TARGET_MISMATCH"
  | "DELEGATED_ACCESS_UNSUPPORTED"
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
  success: { status: 201, body: "json", required: ["broadcast", "status"] },
  body: "required",
  idempotency: "keyed",
  authentication: "required",
  organizationKeys: true,
  errors: [
    "BAD_REQUEST",
    "CLIENT_UPGRADE_REQUIRED",
    "CONFLICT",
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
    "FORBIDDEN",
    "IDEMPOTENCY_KEY_CONFLICT",
    "IDEMPOTENCY_KEY_REQUIRED",
    "INTERNAL_ERROR",
    "UNAUTHORIZED",
    "VALIDATION_FAILED",
    "WHATSAPP_BROADCAST_SENDER_UNAVAILABLE",
    "WHATSAPP_TEMPLATE_NOT_FOUND",
  ],
  "~types": undefined as unknown as { readonly input: BroadcastsCreateInput; readonly output: BroadcastsCreateOutput },
} as const satisfies Operation<BroadcastsCreateInput, BroadcastsCreateOutput, BroadcastsCreateErrorCode>;

export type BroadcastsGetInput = {
  broadcast_id: string;
};
export type BroadcastsGetOutput = T.BroadcastOutputEnvelope;
export type BroadcastsGetErrorCode = 
  | "BAD_REQUEST"
  | "CLIENT_UPGRADE_REQUIRED"
  | "DELEGATED_ACCESS_AUDIENCE_MISMATCH"
  | "DELEGATED_ACCESS_CREDENTIAL_LOCATION"
  | "DELEGATED_ACCESS_EFFECT_NOT_ALLOWED"
  | "DELEGATED_ACCESS_EXPANSION_NOT_ALLOWED"
  | "DELEGATED_ACCESS_FEATURE_NOT_ENTITLED"
  | "DELEGATED_ACCESS_FILTER_NOT_ALLOWED"
  | "DELEGATED_ACCESS_IMPERSONATION_NOT_ALLOWED"
  | "DELEGATED_ACCESS_INACTIVE"
  | "DELEGATED_ACCESS_KIND_NOT_ALLOWED"
  | "DELEGATED_ACCESS_ORGANIZATION_KEY_NOT_ADMITTED"
  | "DELEGATED_ACCESS_ORGANIZATION_MISMATCH"
  | "DELEGATED_ACCESS_OUTLET_NOT_ALLOWED"
  | "DELEGATED_ACCESS_PERMISSION_DENIED"
  | "DELEGATED_ACCESS_PRINCIPAL_INACTIVE"
  | "DELEGATED_ACCESS_ROUTE_NOT_ALLOWED"
  | "DELEGATED_ACCESS_TARGET_MISMATCH"
  | "DELEGATED_ACCESS_UNSUPPORTED"
  | "FORBIDDEN"
  | "INTERNAL_ERROR"
  | "UNAUTHORIZED"
  | "VALIDATION_FAILED"
  | "WHATSAPP_BROADCAST_NOT_FOUND";
export const broadcastsGet = {
  id: "whatsapp.broadcasts.get",
  method: "GET",
  path: "/v1/broadcasts/{broadcast_id}",
  parameters: [
    { member: "broadcast_id", name: "broadcast_id", in: "path", required: true, encoding: "scalar" },
  ],
  success: { status: 200, body: "json", required: ["broadcast", "status"] },
  body: "none",
  idempotency: "safe",
  authentication: "required",
  organizationKeys: true,
  errors: [
    "BAD_REQUEST",
    "CLIENT_UPGRADE_REQUIRED",
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
    "FORBIDDEN",
    "INTERNAL_ERROR",
    "UNAUTHORIZED",
    "VALIDATION_FAILED",
    "WHATSAPP_BROADCAST_NOT_FOUND",
  ],
  "~types": undefined as unknown as { readonly input: BroadcastsGetInput; readonly output: BroadcastsGetOutput },
} as const satisfies Operation<BroadcastsGetInput, BroadcastsGetOutput, BroadcastsGetErrorCode>;

export type BroadcastsListInput = {
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
  status?: T.BroadcastStatusRequest;
};
export type BroadcastsListOutput = T.FetchBroadcastsOutputEnvelope;
export type BroadcastsListErrorCode = 
  | "BAD_REQUEST"
  | "CLIENT_UPGRADE_REQUIRED"
  | "DELEGATED_ACCESS_AUDIENCE_MISMATCH"
  | "DELEGATED_ACCESS_CREDENTIAL_LOCATION"
  | "DELEGATED_ACCESS_EFFECT_NOT_ALLOWED"
  | "DELEGATED_ACCESS_EXPANSION_NOT_ALLOWED"
  | "DELEGATED_ACCESS_FEATURE_NOT_ENTITLED"
  | "DELEGATED_ACCESS_FILTER_NOT_ALLOWED"
  | "DELEGATED_ACCESS_IMPERSONATION_NOT_ALLOWED"
  | "DELEGATED_ACCESS_INACTIVE"
  | "DELEGATED_ACCESS_KIND_NOT_ALLOWED"
  | "DELEGATED_ACCESS_ORGANIZATION_KEY_NOT_ADMITTED"
  | "DELEGATED_ACCESS_ORGANIZATION_MISMATCH"
  | "DELEGATED_ACCESS_OUTLET_NOT_ALLOWED"
  | "DELEGATED_ACCESS_PERMISSION_DENIED"
  | "DELEGATED_ACCESS_PRINCIPAL_INACTIVE"
  | "DELEGATED_ACCESS_ROUTE_NOT_ALLOWED"
  | "DELEGATED_ACCESS_TARGET_MISMATCH"
  | "DELEGATED_ACCESS_UNSUPPORTED"
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
  success: { status: 200, body: "json", required: ["broadcasts", "status"] },
  body: "none",
  idempotency: "safe",
  authentication: "required",
  organizationKeys: true,
  pagination: {
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
  },
  errors: [
    "BAD_REQUEST",
    "CLIENT_UPGRADE_REQUIRED",
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
    "FORBIDDEN",
    "INTERNAL_ERROR",
    "PAGINATION_CURSOR_INVALID",
    "PAGINATION_PARAMS_INVALID",
    "UNAUTHORIZED",
    "VALIDATION_FAILED",
  ],
  "~types": undefined as unknown as { readonly input: BroadcastsListInput; readonly output: BroadcastsListOutput },
} as const satisfies Operation<BroadcastsListInput, BroadcastsListOutput, BroadcastsListErrorCode>;

export type BroadcastsPauseInput = {
  broadcast_id: string;
};
export type BroadcastsPauseOutput = T.BroadcastOutputEnvelope;
export type BroadcastsPauseErrorCode = 
  | "BAD_REQUEST"
  | "CLIENT_UPGRADE_REQUIRED"
  | "CONFLICT"
  | "DELEGATED_ACCESS_AUDIENCE_MISMATCH"
  | "DELEGATED_ACCESS_CREDENTIAL_LOCATION"
  | "DELEGATED_ACCESS_EFFECT_NOT_ALLOWED"
  | "DELEGATED_ACCESS_EXPANSION_NOT_ALLOWED"
  | "DELEGATED_ACCESS_FEATURE_NOT_ENTITLED"
  | "DELEGATED_ACCESS_FILTER_NOT_ALLOWED"
  | "DELEGATED_ACCESS_IMPERSONATION_NOT_ALLOWED"
  | "DELEGATED_ACCESS_INACTIVE"
  | "DELEGATED_ACCESS_KIND_NOT_ALLOWED"
  | "DELEGATED_ACCESS_ORGANIZATION_KEY_NOT_ADMITTED"
  | "DELEGATED_ACCESS_ORGANIZATION_MISMATCH"
  | "DELEGATED_ACCESS_OUTLET_NOT_ALLOWED"
  | "DELEGATED_ACCESS_PERMISSION_DENIED"
  | "DELEGATED_ACCESS_PRINCIPAL_INACTIVE"
  | "DELEGATED_ACCESS_ROUTE_NOT_ALLOWED"
  | "DELEGATED_ACCESS_TARGET_MISMATCH"
  | "DELEGATED_ACCESS_UNSUPPORTED"
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
  parameters: [
    { member: "broadcast_id", name: "broadcast_id", in: "path", required: true, encoding: "scalar" },
  ],
  success: { status: 200, body: "json", required: ["broadcast", "status"] },
  body: "none",
  idempotency: "safe",
  authentication: "required",
  organizationKeys: true,
  errors: [
    "BAD_REQUEST",
    "CLIENT_UPGRADE_REQUIRED",
    "CONFLICT",
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
    "FORBIDDEN",
    "INTERNAL_ERROR",
    "UNAUTHORIZED",
    "VALIDATION_FAILED",
    "WHATSAPP_BROADCAST_NOT_FOUND",
    "WHATSAPP_BROADCAST_STATE_CONFLICT",
  ],
  "~types": undefined as unknown as { readonly input: BroadcastsPauseInput; readonly output: BroadcastsPauseOutput },
} as const satisfies Operation<BroadcastsPauseInput, BroadcastsPauseOutput, BroadcastsPauseErrorCode>;

export type BroadcastsRecipientsAddInput = {
  /**
   * The draft broadcast to add recipients to.
   */
  broadcast_id: string;
} & T.AddBroadcastRecipientsInput;
export type BroadcastsRecipientsAddOutput = T.AddBroadcastRecipientsOutputEnvelope;
export type BroadcastsRecipientsAddErrorCode = 
  | "BAD_REQUEST"
  | "CLIENT_UPGRADE_REQUIRED"
  | "CONFLICT"
  | "DELEGATED_ACCESS_AUDIENCE_MISMATCH"
  | "DELEGATED_ACCESS_CREDENTIAL_LOCATION"
  | "DELEGATED_ACCESS_EFFECT_NOT_ALLOWED"
  | "DELEGATED_ACCESS_EXPANSION_NOT_ALLOWED"
  | "DELEGATED_ACCESS_FEATURE_NOT_ENTITLED"
  | "DELEGATED_ACCESS_FILTER_NOT_ALLOWED"
  | "DELEGATED_ACCESS_IMPERSONATION_NOT_ALLOWED"
  | "DELEGATED_ACCESS_INACTIVE"
  | "DELEGATED_ACCESS_KIND_NOT_ALLOWED"
  | "DELEGATED_ACCESS_ORGANIZATION_KEY_NOT_ADMITTED"
  | "DELEGATED_ACCESS_ORGANIZATION_MISMATCH"
  | "DELEGATED_ACCESS_OUTLET_NOT_ALLOWED"
  | "DELEGATED_ACCESS_PERMISSION_DENIED"
  | "DELEGATED_ACCESS_PRINCIPAL_INACTIVE"
  | "DELEGATED_ACCESS_ROUTE_NOT_ALLOWED"
  | "DELEGATED_ACCESS_TARGET_MISMATCH"
  | "DELEGATED_ACCESS_UNSUPPORTED"
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
  success: { status: 200, body: "json", required: ["added", "duplicates", "status"] },
  body: "required",
  idempotency: "keyed",
  authentication: "required",
  organizationKeys: true,
  errors: [
    "BAD_REQUEST",
    "CLIENT_UPGRADE_REQUIRED",
    "CONFLICT",
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
  "~types": undefined as unknown as { readonly input: BroadcastsRecipientsAddInput; readonly output: BroadcastsRecipientsAddOutput },
} as const satisfies Operation<BroadcastsRecipientsAddInput, BroadcastsRecipientsAddOutput, BroadcastsRecipientsAddErrorCode>;

export type BroadcastsRecipientsDeleteInput = {
  /**
   * The draft broadcast.
   */
  broadcast_id: string;
  /**
   * The recipient to remove.
   */
  recipient_id: string;
};
export type BroadcastsRecipientsDeleteOutput = void;
export type BroadcastsRecipientsDeleteErrorCode = 
  | "BAD_REQUEST"
  | "CLIENT_UPGRADE_REQUIRED"
  | "CONFLICT"
  | "DELEGATED_ACCESS_AUDIENCE_MISMATCH"
  | "DELEGATED_ACCESS_CREDENTIAL_LOCATION"
  | "DELEGATED_ACCESS_EFFECT_NOT_ALLOWED"
  | "DELEGATED_ACCESS_EXPANSION_NOT_ALLOWED"
  | "DELEGATED_ACCESS_FEATURE_NOT_ENTITLED"
  | "DELEGATED_ACCESS_FILTER_NOT_ALLOWED"
  | "DELEGATED_ACCESS_IMPERSONATION_NOT_ALLOWED"
  | "DELEGATED_ACCESS_INACTIVE"
  | "DELEGATED_ACCESS_KIND_NOT_ALLOWED"
  | "DELEGATED_ACCESS_ORGANIZATION_KEY_NOT_ADMITTED"
  | "DELEGATED_ACCESS_ORGANIZATION_MISMATCH"
  | "DELEGATED_ACCESS_OUTLET_NOT_ALLOWED"
  | "DELEGATED_ACCESS_PERMISSION_DENIED"
  | "DELEGATED_ACCESS_PRINCIPAL_INACTIVE"
  | "DELEGATED_ACCESS_ROUTE_NOT_ALLOWED"
  | "DELEGATED_ACCESS_TARGET_MISMATCH"
  | "DELEGATED_ACCESS_UNSUPPORTED"
  | "FORBIDDEN"
  | "INTERNAL_ERROR"
  | "UNAUTHORIZED"
  | "VALIDATION_FAILED"
  | "WHATSAPP_BROADCAST_NOT_FOUND"
  | "WHATSAPP_BROADCAST_RECIPIENT_NOT_FOUND"
  | "WHATSAPP_BROADCAST_STATE_CONFLICT";
export const broadcastsRecipientsDelete = {
  id: "whatsapp.broadcasts.recipients.delete",
  method: "DELETE",
  path: "/v1/broadcasts/{broadcast_id}/recipients/{recipient_id}",
  parameters: [
    { member: "broadcast_id", name: "broadcast_id", in: "path", required: true, encoding: "scalar" },
    { member: "recipient_id", name: "recipient_id", in: "path", required: true, encoding: "scalar" },
  ],
  success: { status: 204, body: "none", required: [] },
  body: "none",
  idempotency: "safe",
  authentication: "required",
  organizationKeys: true,
  errors: [
    "BAD_REQUEST",
    "CLIENT_UPGRADE_REQUIRED",
    "CONFLICT",
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
    "FORBIDDEN",
    "INTERNAL_ERROR",
    "UNAUTHORIZED",
    "VALIDATION_FAILED",
    "WHATSAPP_BROADCAST_NOT_FOUND",
    "WHATSAPP_BROADCAST_RECIPIENT_NOT_FOUND",
    "WHATSAPP_BROADCAST_STATE_CONFLICT",
  ],
  "~types": undefined as unknown as { readonly input: BroadcastsRecipientsDeleteInput; readonly output: BroadcastsRecipientsDeleteOutput },
} as const satisfies Operation<BroadcastsRecipientsDeleteInput, BroadcastsRecipientsDeleteOutput, BroadcastsRecipientsDeleteErrorCode>;

export type BroadcastsRecipientsListInput = {
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
  status?: T.BroadcastRecipientStatusRequest;
  /**
   * Only recipients assigned to this sender agent.
   */
  agent_id?: string;
  /**
   * Only the recipient with this phone number.
   */
  to?: string | null;
};
export type BroadcastsRecipientsListOutput = T.FetchBroadcastRecipientsOutputEnvelope;
export type BroadcastsRecipientsListErrorCode = 
  | "BAD_REQUEST"
  | "CLIENT_UPGRADE_REQUIRED"
  | "DELEGATED_ACCESS_AUDIENCE_MISMATCH"
  | "DELEGATED_ACCESS_CREDENTIAL_LOCATION"
  | "DELEGATED_ACCESS_EFFECT_NOT_ALLOWED"
  | "DELEGATED_ACCESS_EXPANSION_NOT_ALLOWED"
  | "DELEGATED_ACCESS_FEATURE_NOT_ENTITLED"
  | "DELEGATED_ACCESS_FILTER_NOT_ALLOWED"
  | "DELEGATED_ACCESS_IMPERSONATION_NOT_ALLOWED"
  | "DELEGATED_ACCESS_INACTIVE"
  | "DELEGATED_ACCESS_KIND_NOT_ALLOWED"
  | "DELEGATED_ACCESS_ORGANIZATION_KEY_NOT_ADMITTED"
  | "DELEGATED_ACCESS_ORGANIZATION_MISMATCH"
  | "DELEGATED_ACCESS_OUTLET_NOT_ALLOWED"
  | "DELEGATED_ACCESS_PERMISSION_DENIED"
  | "DELEGATED_ACCESS_PRINCIPAL_INACTIVE"
  | "DELEGATED_ACCESS_ROUTE_NOT_ALLOWED"
  | "DELEGATED_ACCESS_TARGET_MISMATCH"
  | "DELEGATED_ACCESS_UNSUPPORTED"
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
  success: { status: 200, body: "json", required: ["recipients", "status"] },
  body: "none",
  idempotency: "safe",
  authentication: "required",
  organizationKeys: true,
  pagination: {
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
  },
  errors: [
    "BAD_REQUEST",
    "CLIENT_UPGRADE_REQUIRED",
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
    "FORBIDDEN",
    "INTERNAL_ERROR",
    "PAGINATION_CURSOR_INVALID",
    "PAGINATION_PARAMS_INVALID",
    "UNAUTHORIZED",
    "VALIDATION_FAILED",
    "WHATSAPP_BROADCAST_NOT_FOUND",
  ],
  "~types": undefined as unknown as { readonly input: BroadcastsRecipientsListInput; readonly output: BroadcastsRecipientsListOutput },
} as const satisfies Operation<BroadcastsRecipientsListInput, BroadcastsRecipientsListOutput, BroadcastsRecipientsListErrorCode>;

export type BroadcastsResumeInput = {
  broadcast_id: string;
  /**
   * Outlet the request acts in. It must be an outlet the credential may use; omit it to use every such outlet.
   */
  outlet_id?: string;
};
export type BroadcastsResumeOutput = T.BroadcastOutputEnvelope;
export type BroadcastsResumeErrorCode = 
  | "BAD_REQUEST"
  | "CLIENT_UPGRADE_REQUIRED"
  | "CONFLICT"
  | "DELEGATED_ACCESS_AUDIENCE_MISMATCH"
  | "DELEGATED_ACCESS_CREDENTIAL_LOCATION"
  | "DELEGATED_ACCESS_EFFECT_NOT_ALLOWED"
  | "DELEGATED_ACCESS_EXPANSION_NOT_ALLOWED"
  | "DELEGATED_ACCESS_FEATURE_NOT_ENTITLED"
  | "DELEGATED_ACCESS_FILTER_NOT_ALLOWED"
  | "DELEGATED_ACCESS_IMPERSONATION_NOT_ALLOWED"
  | "DELEGATED_ACCESS_INACTIVE"
  | "DELEGATED_ACCESS_KIND_NOT_ALLOWED"
  | "DELEGATED_ACCESS_ORGANIZATION_KEY_NOT_ADMITTED"
  | "DELEGATED_ACCESS_ORGANIZATION_MISMATCH"
  | "DELEGATED_ACCESS_OUTLET_NOT_ALLOWED"
  | "DELEGATED_ACCESS_PERMISSION_DENIED"
  | "DELEGATED_ACCESS_PRINCIPAL_INACTIVE"
  | "DELEGATED_ACCESS_ROUTE_NOT_ALLOWED"
  | "DELEGATED_ACCESS_TARGET_MISMATCH"
  | "DELEGATED_ACCESS_UNSUPPORTED"
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
  parameters: [
    { member: "broadcast_id", name: "broadcast_id", in: "path", required: true, encoding: "scalar" },
    { member: "outlet_id", name: "outlet_id", in: "query", required: false, encoding: "scalar" },
  ],
  success: { status: 200, body: "json", required: ["broadcast", "status"] },
  body: "none",
  idempotency: "safe",
  authentication: "required",
  organizationKeys: true,
  errors: [
    "BAD_REQUEST",
    "CLIENT_UPGRADE_REQUIRED",
    "CONFLICT",
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
    "FORBIDDEN",
    "INTERNAL_ERROR",
    "UNAUTHORIZED",
    "VALIDATION_FAILED",
    "WHATSAPP_BROADCAST_NOT_FOUND",
    "WHATSAPP_BROADCAST_SENDER_UNAVAILABLE",
    "WHATSAPP_BROADCAST_STATE_CONFLICT",
  ],
  "~types": undefined as unknown as { readonly input: BroadcastsResumeInput; readonly output: BroadcastsResumeOutput },
} as const satisfies Operation<BroadcastsResumeInput, BroadcastsResumeOutput, BroadcastsResumeErrorCode>;

export type BroadcastsStartInput = {
  broadcast_id: string;
  /**
   * Outlet the request acts in. It must be an outlet the credential may use; omit it to use every such outlet.
   */
  outlet_id?: string;
};
export type BroadcastsStartOutput = T.BroadcastOutputEnvelope;
export type BroadcastsStartErrorCode = 
  | "BAD_REQUEST"
  | "CLIENT_UPGRADE_REQUIRED"
  | "CONFLICT"
  | "DELEGATED_ACCESS_AUDIENCE_MISMATCH"
  | "DELEGATED_ACCESS_CREDENTIAL_LOCATION"
  | "DELEGATED_ACCESS_EFFECT_NOT_ALLOWED"
  | "DELEGATED_ACCESS_EXPANSION_NOT_ALLOWED"
  | "DELEGATED_ACCESS_FEATURE_NOT_ENTITLED"
  | "DELEGATED_ACCESS_FILTER_NOT_ALLOWED"
  | "DELEGATED_ACCESS_IMPERSONATION_NOT_ALLOWED"
  | "DELEGATED_ACCESS_INACTIVE"
  | "DELEGATED_ACCESS_KIND_NOT_ALLOWED"
  | "DELEGATED_ACCESS_ORGANIZATION_KEY_NOT_ADMITTED"
  | "DELEGATED_ACCESS_ORGANIZATION_MISMATCH"
  | "DELEGATED_ACCESS_OUTLET_NOT_ALLOWED"
  | "DELEGATED_ACCESS_PERMISSION_DENIED"
  | "DELEGATED_ACCESS_PRINCIPAL_INACTIVE"
  | "DELEGATED_ACCESS_ROUTE_NOT_ALLOWED"
  | "DELEGATED_ACCESS_TARGET_MISMATCH"
  | "DELEGATED_ACCESS_UNSUPPORTED"
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
  parameters: [
    { member: "broadcast_id", name: "broadcast_id", in: "path", required: true, encoding: "scalar" },
    { member: "outlet_id", name: "outlet_id", in: "query", required: false, encoding: "scalar" },
  ],
  success: { status: 200, body: "json", required: ["broadcast", "status"] },
  body: "none",
  idempotency: "safe",
  authentication: "required",
  organizationKeys: true,
  errors: [
    "BAD_REQUEST",
    "CLIENT_UPGRADE_REQUIRED",
    "CONFLICT",
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
  "~types": undefined as unknown as { readonly input: BroadcastsStartInput; readonly output: BroadcastsStartOutput },
} as const satisfies Operation<BroadcastsStartInput, BroadcastsStartOutput, BroadcastsStartErrorCode>;

export type BroadcastsUpdateInput = {
  /**
   * The draft broadcast to update.
   */
  broadcast_id: string;
  /**
   * Outlet the request acts in. It must be an outlet the credential may use; omit it to use every such outlet.
   */
  outlet_id?: string;
} & T.UpdateBroadcastInput;
export type BroadcastsUpdateOutput = T.BroadcastOutputEnvelope;
export type BroadcastsUpdateErrorCode = 
  | "BAD_REQUEST"
  | "CLIENT_UPGRADE_REQUIRED"
  | "CONFLICT"
  | "DELEGATED_ACCESS_AUDIENCE_MISMATCH"
  | "DELEGATED_ACCESS_CREDENTIAL_LOCATION"
  | "DELEGATED_ACCESS_EFFECT_NOT_ALLOWED"
  | "DELEGATED_ACCESS_EXPANSION_NOT_ALLOWED"
  | "DELEGATED_ACCESS_FEATURE_NOT_ENTITLED"
  | "DELEGATED_ACCESS_FILTER_NOT_ALLOWED"
  | "DELEGATED_ACCESS_IMPERSONATION_NOT_ALLOWED"
  | "DELEGATED_ACCESS_INACTIVE"
  | "DELEGATED_ACCESS_KIND_NOT_ALLOWED"
  | "DELEGATED_ACCESS_ORGANIZATION_KEY_NOT_ADMITTED"
  | "DELEGATED_ACCESS_ORGANIZATION_MISMATCH"
  | "DELEGATED_ACCESS_OUTLET_NOT_ALLOWED"
  | "DELEGATED_ACCESS_PERMISSION_DENIED"
  | "DELEGATED_ACCESS_PRINCIPAL_INACTIVE"
  | "DELEGATED_ACCESS_ROUTE_NOT_ALLOWED"
  | "DELEGATED_ACCESS_TARGET_MISMATCH"
  | "DELEGATED_ACCESS_UNSUPPORTED"
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
  parameters: [
    { member: "broadcast_id", name: "broadcast_id", in: "path", required: true, encoding: "scalar" },
    { member: "outlet_id", name: "outlet_id", in: "query", required: false, encoding: "scalar" },
  ],
  success: { status: 200, body: "json", required: ["broadcast", "status"] },
  body: "required",
  idempotency: "safe",
  authentication: "required",
  organizationKeys: true,
  errors: [
    "BAD_REQUEST",
    "CLIENT_UPGRADE_REQUIRED",
    "CONFLICT",
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
    "FORBIDDEN",
    "INTERNAL_ERROR",
    "UNAUTHORIZED",
    "VALIDATION_FAILED",
    "WHATSAPP_BROADCAST_NOT_FOUND",
    "WHATSAPP_BROADCAST_SENDER_UNAVAILABLE",
    "WHATSAPP_BROADCAST_STATE_CONFLICT",
    "WHATSAPP_TEMPLATE_NOT_FOUND",
  ],
  "~types": undefined as unknown as { readonly input: BroadcastsUpdateInput; readonly output: BroadcastsUpdateOutput },
} as const satisfies Operation<BroadcastsUpdateInput, BroadcastsUpdateOutput, BroadcastsUpdateErrorCode>;

export type ChatMessagesGetInput = {
  /**
   * The chat message to read.
   */
  id: string;
  /**
   * Outlet the request acts in. It must be an outlet the credential may use; omit it to use every such outlet.
   */
  outlet_id?: string;
};
export type ChatMessagesGetOutput = T.FetchChatMessageOutputEnvelope;
export type ChatMessagesGetErrorCode = 
  | "BAD_REQUEST"
  | "CLIENT_UPGRADE_REQUIRED"
  | "DELEGATED_ACCESS_AUDIENCE_MISMATCH"
  | "DELEGATED_ACCESS_CREDENTIAL_LOCATION"
  | "DELEGATED_ACCESS_EFFECT_NOT_ALLOWED"
  | "DELEGATED_ACCESS_EXPANSION_NOT_ALLOWED"
  | "DELEGATED_ACCESS_FEATURE_NOT_ENTITLED"
  | "DELEGATED_ACCESS_FILTER_NOT_ALLOWED"
  | "DELEGATED_ACCESS_IMPERSONATION_NOT_ALLOWED"
  | "DELEGATED_ACCESS_INACTIVE"
  | "DELEGATED_ACCESS_KIND_NOT_ALLOWED"
  | "DELEGATED_ACCESS_ORGANIZATION_KEY_NOT_ADMITTED"
  | "DELEGATED_ACCESS_ORGANIZATION_MISMATCH"
  | "DELEGATED_ACCESS_OUTLET_NOT_ALLOWED"
  | "DELEGATED_ACCESS_PERMISSION_DENIED"
  | "DELEGATED_ACCESS_PRINCIPAL_INACTIVE"
  | "DELEGATED_ACCESS_ROUTE_NOT_ALLOWED"
  | "DELEGATED_ACCESS_TARGET_MISMATCH"
  | "DELEGATED_ACCESS_UNSUPPORTED"
  | "FORBIDDEN"
  | "INTERNAL_ERROR"
  | "UNAUTHORIZED"
  | "VALIDATION_FAILED"
  | "WHATSAPP_MESSAGE_NOT_FOUND";
export const chatMessagesGet = {
  id: "whatsapp.chat_messages.get",
  method: "GET",
  path: "/v1/chat-messages/{id}",
  parameters: [
    { member: "id", name: "id", in: "path", required: true, encoding: "scalar" },
    { member: "outlet_id", name: "outlet_id", in: "query", required: false, encoding: "scalar" },
  ],
  success: { status: 200, body: "json", required: ["message", "status"] },
  body: "none",
  idempotency: "safe",
  authentication: "required",
  organizationKeys: true,
  errors: [
    "BAD_REQUEST",
    "CLIENT_UPGRADE_REQUIRED",
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
    "FORBIDDEN",
    "INTERNAL_ERROR",
    "UNAUTHORIZED",
    "VALIDATION_FAILED",
    "WHATSAPP_MESSAGE_NOT_FOUND",
  ],
  "~types": undefined as unknown as { readonly input: ChatMessagesGetInput; readonly output: ChatMessagesGetOutput },
} as const satisfies Operation<ChatMessagesGetInput, ChatMessagesGetOutput, ChatMessagesGetErrorCode>;

export type ChatMessagesListInput = {
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
export type ChatMessagesListOutput = T.PollChatMessagesOutputEnvelope;
export type ChatMessagesListErrorCode = 
  | "BAD_REQUEST"
  | "CLIENT_UPGRADE_REQUIRED"
  | "DELEGATED_ACCESS_AUDIENCE_MISMATCH"
  | "DELEGATED_ACCESS_CREDENTIAL_LOCATION"
  | "DELEGATED_ACCESS_EFFECT_NOT_ALLOWED"
  | "DELEGATED_ACCESS_EXPANSION_NOT_ALLOWED"
  | "DELEGATED_ACCESS_FEATURE_NOT_ENTITLED"
  | "DELEGATED_ACCESS_FILTER_NOT_ALLOWED"
  | "DELEGATED_ACCESS_IMPERSONATION_NOT_ALLOWED"
  | "DELEGATED_ACCESS_INACTIVE"
  | "DELEGATED_ACCESS_KIND_NOT_ALLOWED"
  | "DELEGATED_ACCESS_ORGANIZATION_KEY_NOT_ADMITTED"
  | "DELEGATED_ACCESS_ORGANIZATION_MISMATCH"
  | "DELEGATED_ACCESS_OUTLET_NOT_ALLOWED"
  | "DELEGATED_ACCESS_PERMISSION_DENIED"
  | "DELEGATED_ACCESS_PRINCIPAL_INACTIVE"
  | "DELEGATED_ACCESS_ROUTE_NOT_ALLOWED"
  | "DELEGATED_ACCESS_TARGET_MISMATCH"
  | "DELEGATED_ACCESS_UNSUPPORTED"
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
  success: { status: 200, body: "json", required: ["after_rev", "has_more", "messages", "status"] },
  body: "none",
  idempotency: "safe",
  authentication: "required",
  organizationKeys: true,
  errors: [
    "BAD_REQUEST",
    "CLIENT_UPGRADE_REQUIRED",
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
    "FORBIDDEN",
    "INTERNAL_ERROR",
    "UNAUTHORIZED",
    "VALIDATION_FAILED",
    "WHATSAPP_AGENT_NOT_FOUND",
  ],
  "~types": undefined as unknown as { readonly input: ChatMessagesListInput; readonly output: ChatMessagesListOutput },
} as const satisfies Operation<ChatMessagesListInput, ChatMessagesListOutput, ChatMessagesListErrorCode>;

export type ChatsGetInput = {
  /**
   * The chat.
   */
  chat_id: string;
  /**
   * Outlet the request acts in. It must be an outlet the credential may use; omit it to use every such outlet.
   */
  outlet_id?: string;
};
export type ChatsGetOutput = T.FetchChatOutputEnvelope;
export type ChatsGetErrorCode = 
  | "BAD_REQUEST"
  | "CLIENT_UPGRADE_REQUIRED"
  | "DELEGATED_ACCESS_AUDIENCE_MISMATCH"
  | "DELEGATED_ACCESS_CREDENTIAL_LOCATION"
  | "DELEGATED_ACCESS_EFFECT_NOT_ALLOWED"
  | "DELEGATED_ACCESS_EXPANSION_NOT_ALLOWED"
  | "DELEGATED_ACCESS_FEATURE_NOT_ENTITLED"
  | "DELEGATED_ACCESS_FILTER_NOT_ALLOWED"
  | "DELEGATED_ACCESS_IMPERSONATION_NOT_ALLOWED"
  | "DELEGATED_ACCESS_INACTIVE"
  | "DELEGATED_ACCESS_KIND_NOT_ALLOWED"
  | "DELEGATED_ACCESS_ORGANIZATION_KEY_NOT_ADMITTED"
  | "DELEGATED_ACCESS_ORGANIZATION_MISMATCH"
  | "DELEGATED_ACCESS_OUTLET_NOT_ALLOWED"
  | "DELEGATED_ACCESS_PERMISSION_DENIED"
  | "DELEGATED_ACCESS_PRINCIPAL_INACTIVE"
  | "DELEGATED_ACCESS_ROUTE_NOT_ALLOWED"
  | "DELEGATED_ACCESS_TARGET_MISMATCH"
  | "DELEGATED_ACCESS_UNSUPPORTED"
  | "FORBIDDEN"
  | "INTERNAL_ERROR"
  | "UNAUTHORIZED"
  | "VALIDATION_FAILED"
  | "WHATSAPP_CHAT_NOT_FOUND";
export const chatsGet = {
  id: "whatsapp.chats.get",
  method: "GET",
  path: "/v1/chats/{chat_id}",
  parameters: [
    { member: "chat_id", name: "chat_id", in: "path", required: true, encoding: "scalar" },
    { member: "outlet_id", name: "outlet_id", in: "query", required: false, encoding: "scalar" },
  ],
  success: { status: 200, body: "json", required: ["chat", "status"] },
  body: "none",
  idempotency: "safe",
  authentication: "required",
  organizationKeys: true,
  errors: [
    "BAD_REQUEST",
    "CLIENT_UPGRADE_REQUIRED",
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
    "FORBIDDEN",
    "INTERNAL_ERROR",
    "UNAUTHORIZED",
    "VALIDATION_FAILED",
    "WHATSAPP_CHAT_NOT_FOUND",
  ],
  "~types": undefined as unknown as { readonly input: ChatsGetInput; readonly output: ChatsGetOutput },
} as const satisfies Operation<ChatsGetInput, ChatsGetOutput, ChatsGetErrorCode>;

export type ChatsListInput = {
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
export type ChatsListOutput = T.FetchChatsOutputEnvelope;
export type ChatsListErrorCode = 
  | "BAD_REQUEST"
  | "CLIENT_UPGRADE_REQUIRED"
  | "DELEGATED_ACCESS_AUDIENCE_MISMATCH"
  | "DELEGATED_ACCESS_CREDENTIAL_LOCATION"
  | "DELEGATED_ACCESS_EFFECT_NOT_ALLOWED"
  | "DELEGATED_ACCESS_EXPANSION_NOT_ALLOWED"
  | "DELEGATED_ACCESS_FEATURE_NOT_ENTITLED"
  | "DELEGATED_ACCESS_FILTER_NOT_ALLOWED"
  | "DELEGATED_ACCESS_IMPERSONATION_NOT_ALLOWED"
  | "DELEGATED_ACCESS_INACTIVE"
  | "DELEGATED_ACCESS_KIND_NOT_ALLOWED"
  | "DELEGATED_ACCESS_ORGANIZATION_KEY_NOT_ADMITTED"
  | "DELEGATED_ACCESS_ORGANIZATION_MISMATCH"
  | "DELEGATED_ACCESS_OUTLET_NOT_ALLOWED"
  | "DELEGATED_ACCESS_PERMISSION_DENIED"
  | "DELEGATED_ACCESS_PRINCIPAL_INACTIVE"
  | "DELEGATED_ACCESS_ROUTE_NOT_ALLOWED"
  | "DELEGATED_ACCESS_TARGET_MISMATCH"
  | "DELEGATED_ACCESS_UNSUPPORTED"
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
  success: { status: 200, body: "json", required: ["chats", "status"] },
  body: "none",
  idempotency: "safe",
  authentication: "required",
  organizationKeys: true,
  pagination: {
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
  },
  errors: [
    "BAD_REQUEST",
    "CLIENT_UPGRADE_REQUIRED",
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
    "FORBIDDEN",
    "INTERNAL_ERROR",
    "PAGINATION_CURSOR_INVALID",
    "PAGINATION_PARAMS_INVALID",
    "UNAUTHORIZED",
    "VALIDATION_FAILED",
    "WHATSAPP_AGENT_NOT_FOUND",
  ],
  "~types": undefined as unknown as { readonly input: ChatsListInput; readonly output: ChatsListOutput },
} as const satisfies Operation<ChatsListInput, ChatsListOutput, ChatsListErrorCode>;

export type ChatsMessagesListInput = {
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
export type ChatsMessagesListOutput = T.FetchChatMessagesOutputEnvelope;
export type ChatsMessagesListErrorCode = 
  | "BAD_REQUEST"
  | "CLIENT_UPGRADE_REQUIRED"
  | "DELEGATED_ACCESS_AUDIENCE_MISMATCH"
  | "DELEGATED_ACCESS_CREDENTIAL_LOCATION"
  | "DELEGATED_ACCESS_EFFECT_NOT_ALLOWED"
  | "DELEGATED_ACCESS_EXPANSION_NOT_ALLOWED"
  | "DELEGATED_ACCESS_FEATURE_NOT_ENTITLED"
  | "DELEGATED_ACCESS_FILTER_NOT_ALLOWED"
  | "DELEGATED_ACCESS_IMPERSONATION_NOT_ALLOWED"
  | "DELEGATED_ACCESS_INACTIVE"
  | "DELEGATED_ACCESS_KIND_NOT_ALLOWED"
  | "DELEGATED_ACCESS_ORGANIZATION_KEY_NOT_ADMITTED"
  | "DELEGATED_ACCESS_ORGANIZATION_MISMATCH"
  | "DELEGATED_ACCESS_OUTLET_NOT_ALLOWED"
  | "DELEGATED_ACCESS_PERMISSION_DENIED"
  | "DELEGATED_ACCESS_PRINCIPAL_INACTIVE"
  | "DELEGATED_ACCESS_ROUTE_NOT_ALLOWED"
  | "DELEGATED_ACCESS_TARGET_MISMATCH"
  | "DELEGATED_ACCESS_UNSUPPORTED"
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
  success: { status: 200, body: "json", required: ["messages", "status"] },
  body: "none",
  idempotency: "safe",
  authentication: "required",
  organizationKeys: true,
  pagination: {
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
  },
  errors: [
    "BAD_REQUEST",
    "CLIENT_UPGRADE_REQUIRED",
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
    "FORBIDDEN",
    "INTERNAL_ERROR",
    "PAGINATION_CURSOR_INVALID",
    "PAGINATION_PARAMS_INVALID",
    "UNAUTHORIZED",
    "VALIDATION_FAILED",
    "WHATSAPP_CHAT_NOT_FOUND",
  ],
  "~types": undefined as unknown as { readonly input: ChatsMessagesListInput; readonly output: ChatsMessagesListOutput },
} as const satisfies Operation<ChatsMessagesListInput, ChatsMessagesListOutput, ChatsMessagesListErrorCode>;

export type MessageTemplatesCreateInput = T.CreateMessageTemplateInput;
export type MessageTemplatesCreateOutput = T.MessageTemplateOutputEnvelope;
export type MessageTemplatesCreateErrorCode = 
  | "BAD_REQUEST"
  | "CLIENT_UPGRADE_REQUIRED"
  | "CONFLICT"
  | "DELEGATED_ACCESS_AUDIENCE_MISMATCH"
  | "DELEGATED_ACCESS_CREDENTIAL_LOCATION"
  | "DELEGATED_ACCESS_EFFECT_NOT_ALLOWED"
  | "DELEGATED_ACCESS_EXPANSION_NOT_ALLOWED"
  | "DELEGATED_ACCESS_FEATURE_NOT_ENTITLED"
  | "DELEGATED_ACCESS_FILTER_NOT_ALLOWED"
  | "DELEGATED_ACCESS_IMPERSONATION_NOT_ALLOWED"
  | "DELEGATED_ACCESS_INACTIVE"
  | "DELEGATED_ACCESS_KIND_NOT_ALLOWED"
  | "DELEGATED_ACCESS_ORGANIZATION_KEY_NOT_ADMITTED"
  | "DELEGATED_ACCESS_ORGANIZATION_MISMATCH"
  | "DELEGATED_ACCESS_OUTLET_NOT_ALLOWED"
  | "DELEGATED_ACCESS_PERMISSION_DENIED"
  | "DELEGATED_ACCESS_PRINCIPAL_INACTIVE"
  | "DELEGATED_ACCESS_ROUTE_NOT_ALLOWED"
  | "DELEGATED_ACCESS_TARGET_MISMATCH"
  | "DELEGATED_ACCESS_UNSUPPORTED"
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
  success: { status: 201, body: "json", required: ["status", "template"] },
  body: "required",
  idempotency: "keyed",
  authentication: "required",
  organizationKeys: true,
  errors: [
    "BAD_REQUEST",
    "CLIENT_UPGRADE_REQUIRED",
    "CONFLICT",
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
    "FORBIDDEN",
    "IDEMPOTENCY_KEY_CONFLICT",
    "IDEMPOTENCY_KEY_REQUIRED",
    "INTERNAL_ERROR",
    "UNAUTHORIZED",
    "VALIDATION_FAILED",
    "WHATSAPP_TEMPLATE_LIMIT_REACHED",
    "WHATSAPP_TEMPLATE_NAME_TAKEN",
  ],
  "~types": undefined as unknown as { readonly input: MessageTemplatesCreateInput; readonly output: MessageTemplatesCreateOutput },
} as const satisfies Operation<MessageTemplatesCreateInput, MessageTemplatesCreateOutput, MessageTemplatesCreateErrorCode>;

export type MessageTemplatesDeleteInput = {
  /**
   * The message template to delete.
   */
  template_id: string;
};
export type MessageTemplatesDeleteOutput = void;
export type MessageTemplatesDeleteErrorCode = 
  | "BAD_REQUEST"
  | "CLIENT_UPGRADE_REQUIRED"
  | "CONFLICT"
  | "DELEGATED_ACCESS_AUDIENCE_MISMATCH"
  | "DELEGATED_ACCESS_CREDENTIAL_LOCATION"
  | "DELEGATED_ACCESS_EFFECT_NOT_ALLOWED"
  | "DELEGATED_ACCESS_EXPANSION_NOT_ALLOWED"
  | "DELEGATED_ACCESS_FEATURE_NOT_ENTITLED"
  | "DELEGATED_ACCESS_FILTER_NOT_ALLOWED"
  | "DELEGATED_ACCESS_IMPERSONATION_NOT_ALLOWED"
  | "DELEGATED_ACCESS_INACTIVE"
  | "DELEGATED_ACCESS_KIND_NOT_ALLOWED"
  | "DELEGATED_ACCESS_ORGANIZATION_KEY_NOT_ADMITTED"
  | "DELEGATED_ACCESS_ORGANIZATION_MISMATCH"
  | "DELEGATED_ACCESS_OUTLET_NOT_ALLOWED"
  | "DELEGATED_ACCESS_PERMISSION_DENIED"
  | "DELEGATED_ACCESS_PRINCIPAL_INACTIVE"
  | "DELEGATED_ACCESS_ROUTE_NOT_ALLOWED"
  | "DELEGATED_ACCESS_TARGET_MISMATCH"
  | "DELEGATED_ACCESS_UNSUPPORTED"
  | "FORBIDDEN"
  | "INTERNAL_ERROR"
  | "UNAUTHORIZED"
  | "VALIDATION_FAILED"
  | "WHATSAPP_TEMPLATE_NOT_FOUND";
export const messageTemplatesDelete = {
  id: "whatsapp.message_templates.delete",
  method: "DELETE",
  path: "/v1/message-templates/{template_id}",
  parameters: [
    { member: "template_id", name: "template_id", in: "path", required: true, encoding: "scalar" },
  ],
  success: { status: 204, body: "none", required: [] },
  body: "none",
  idempotency: "safe",
  authentication: "required",
  organizationKeys: true,
  errors: [
    "BAD_REQUEST",
    "CLIENT_UPGRADE_REQUIRED",
    "CONFLICT",
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
    "FORBIDDEN",
    "INTERNAL_ERROR",
    "UNAUTHORIZED",
    "VALIDATION_FAILED",
    "WHATSAPP_TEMPLATE_NOT_FOUND",
  ],
  "~types": undefined as unknown as { readonly input: MessageTemplatesDeleteInput; readonly output: MessageTemplatesDeleteOutput },
} as const satisfies Operation<MessageTemplatesDeleteInput, MessageTemplatesDeleteOutput, MessageTemplatesDeleteErrorCode>;

export type MessageTemplatesGetInput = {
  /**
   * The message template to read.
   */
  template_id: string;
};
export type MessageTemplatesGetOutput = T.MessageTemplateOutputEnvelope;
export type MessageTemplatesGetErrorCode = 
  | "BAD_REQUEST"
  | "CLIENT_UPGRADE_REQUIRED"
  | "DELEGATED_ACCESS_AUDIENCE_MISMATCH"
  | "DELEGATED_ACCESS_CREDENTIAL_LOCATION"
  | "DELEGATED_ACCESS_EFFECT_NOT_ALLOWED"
  | "DELEGATED_ACCESS_EXPANSION_NOT_ALLOWED"
  | "DELEGATED_ACCESS_FEATURE_NOT_ENTITLED"
  | "DELEGATED_ACCESS_FILTER_NOT_ALLOWED"
  | "DELEGATED_ACCESS_IMPERSONATION_NOT_ALLOWED"
  | "DELEGATED_ACCESS_INACTIVE"
  | "DELEGATED_ACCESS_KIND_NOT_ALLOWED"
  | "DELEGATED_ACCESS_ORGANIZATION_KEY_NOT_ADMITTED"
  | "DELEGATED_ACCESS_ORGANIZATION_MISMATCH"
  | "DELEGATED_ACCESS_OUTLET_NOT_ALLOWED"
  | "DELEGATED_ACCESS_PERMISSION_DENIED"
  | "DELEGATED_ACCESS_PRINCIPAL_INACTIVE"
  | "DELEGATED_ACCESS_ROUTE_NOT_ALLOWED"
  | "DELEGATED_ACCESS_TARGET_MISMATCH"
  | "DELEGATED_ACCESS_UNSUPPORTED"
  | "FORBIDDEN"
  | "INTERNAL_ERROR"
  | "UNAUTHORIZED"
  | "VALIDATION_FAILED"
  | "WHATSAPP_TEMPLATE_NOT_FOUND";
export const messageTemplatesGet = {
  id: "whatsapp.message_templates.get",
  method: "GET",
  path: "/v1/message-templates/{template_id}",
  parameters: [
    { member: "template_id", name: "template_id", in: "path", required: true, encoding: "scalar" },
  ],
  success: { status: 200, body: "json", required: ["status", "template"] },
  body: "none",
  idempotency: "safe",
  authentication: "required",
  organizationKeys: true,
  errors: [
    "BAD_REQUEST",
    "CLIENT_UPGRADE_REQUIRED",
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
    "FORBIDDEN",
    "INTERNAL_ERROR",
    "UNAUTHORIZED",
    "VALIDATION_FAILED",
    "WHATSAPP_TEMPLATE_NOT_FOUND",
  ],
  "~types": undefined as unknown as { readonly input: MessageTemplatesGetInput; readonly output: MessageTemplatesGetOutput },
} as const satisfies Operation<MessageTemplatesGetInput, MessageTemplatesGetOutput, MessageTemplatesGetErrorCode>;

export type MessageTemplatesListInput = {
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
export type MessageTemplatesListOutput = T.FetchMessageTemplatesOutputEnvelope;
export type MessageTemplatesListErrorCode = 
  | "BAD_REQUEST"
  | "CLIENT_UPGRADE_REQUIRED"
  | "DELEGATED_ACCESS_AUDIENCE_MISMATCH"
  | "DELEGATED_ACCESS_CREDENTIAL_LOCATION"
  | "DELEGATED_ACCESS_EFFECT_NOT_ALLOWED"
  | "DELEGATED_ACCESS_EXPANSION_NOT_ALLOWED"
  | "DELEGATED_ACCESS_FEATURE_NOT_ENTITLED"
  | "DELEGATED_ACCESS_FILTER_NOT_ALLOWED"
  | "DELEGATED_ACCESS_IMPERSONATION_NOT_ALLOWED"
  | "DELEGATED_ACCESS_INACTIVE"
  | "DELEGATED_ACCESS_KIND_NOT_ALLOWED"
  | "DELEGATED_ACCESS_ORGANIZATION_KEY_NOT_ADMITTED"
  | "DELEGATED_ACCESS_ORGANIZATION_MISMATCH"
  | "DELEGATED_ACCESS_OUTLET_NOT_ALLOWED"
  | "DELEGATED_ACCESS_PERMISSION_DENIED"
  | "DELEGATED_ACCESS_PRINCIPAL_INACTIVE"
  | "DELEGATED_ACCESS_ROUTE_NOT_ALLOWED"
  | "DELEGATED_ACCESS_TARGET_MISMATCH"
  | "DELEGATED_ACCESS_UNSUPPORTED"
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
  success: { status: 200, body: "json", required: ["status", "templates"] },
  body: "none",
  idempotency: "safe",
  authentication: "required",
  organizationKeys: true,
  pagination: {
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
  },
  errors: [
    "BAD_REQUEST",
    "CLIENT_UPGRADE_REQUIRED",
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
    "FORBIDDEN",
    "INTERNAL_ERROR",
    "PAGINATION_CURSOR_INVALID",
    "PAGINATION_PARAMS_INVALID",
    "UNAUTHORIZED",
    "VALIDATION_FAILED",
  ],
  "~types": undefined as unknown as { readonly input: MessageTemplatesListInput; readonly output: MessageTemplatesListOutput },
} as const satisfies Operation<MessageTemplatesListInput, MessageTemplatesListOutput, MessageTemplatesListErrorCode>;

export type MessageTemplatesPreviewInput = {
  /**
   * The message template to render.
   */
  template_id: string;
} & T.PreviewMessageTemplateInput;
export type MessageTemplatesPreviewOutput = T.PreviewMessageTemplateOutputEnvelope;
export type MessageTemplatesPreviewErrorCode = 
  | "BAD_REQUEST"
  | "CLIENT_UPGRADE_REQUIRED"
  | "DELEGATED_ACCESS_AUDIENCE_MISMATCH"
  | "DELEGATED_ACCESS_CREDENTIAL_LOCATION"
  | "DELEGATED_ACCESS_EFFECT_NOT_ALLOWED"
  | "DELEGATED_ACCESS_EXPANSION_NOT_ALLOWED"
  | "DELEGATED_ACCESS_FEATURE_NOT_ENTITLED"
  | "DELEGATED_ACCESS_FILTER_NOT_ALLOWED"
  | "DELEGATED_ACCESS_IMPERSONATION_NOT_ALLOWED"
  | "DELEGATED_ACCESS_INACTIVE"
  | "DELEGATED_ACCESS_KIND_NOT_ALLOWED"
  | "DELEGATED_ACCESS_ORGANIZATION_KEY_NOT_ADMITTED"
  | "DELEGATED_ACCESS_ORGANIZATION_MISMATCH"
  | "DELEGATED_ACCESS_OUTLET_NOT_ALLOWED"
  | "DELEGATED_ACCESS_PERMISSION_DENIED"
  | "DELEGATED_ACCESS_PRINCIPAL_INACTIVE"
  | "DELEGATED_ACCESS_ROUTE_NOT_ALLOWED"
  | "DELEGATED_ACCESS_TARGET_MISMATCH"
  | "DELEGATED_ACCESS_UNSUPPORTED"
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
  parameters: [
    { member: "template_id", name: "template_id", in: "path", required: true, encoding: "scalar" },
  ],
  success: { status: 200, body: "json", required: ["status", "variants"] },
  body: "required",
  idempotency: "safe",
  authentication: "required",
  organizationKeys: true,
  errors: [
    "BAD_REQUEST",
    "CLIENT_UPGRADE_REQUIRED",
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
    "FORBIDDEN",
    "INTERNAL_ERROR",
    "UNAUTHORIZED",
    "VALIDATION_FAILED",
    "WHATSAPP_TEMPLATE_NOT_FOUND",
    "WHATSAPP_TEMPLATE_RENDERED_TOO_LONG",
  ],
  "~types": undefined as unknown as { readonly input: MessageTemplatesPreviewInput; readonly output: MessageTemplatesPreviewOutput },
} as const satisfies Operation<MessageTemplatesPreviewInput, MessageTemplatesPreviewOutput, MessageTemplatesPreviewErrorCode>;

export type MessageTemplatesReplaceInput = {
  /**
   * The message template to replace.
   */
  template_id: string;
} & T.ReplaceMessageTemplateInput;
export type MessageTemplatesReplaceOutput = T.MessageTemplateOutputEnvelope;
export type MessageTemplatesReplaceErrorCode = 
  | "BAD_REQUEST"
  | "CLIENT_UPGRADE_REQUIRED"
  | "CONFLICT"
  | "DELEGATED_ACCESS_AUDIENCE_MISMATCH"
  | "DELEGATED_ACCESS_CREDENTIAL_LOCATION"
  | "DELEGATED_ACCESS_EFFECT_NOT_ALLOWED"
  | "DELEGATED_ACCESS_EXPANSION_NOT_ALLOWED"
  | "DELEGATED_ACCESS_FEATURE_NOT_ENTITLED"
  | "DELEGATED_ACCESS_FILTER_NOT_ALLOWED"
  | "DELEGATED_ACCESS_IMPERSONATION_NOT_ALLOWED"
  | "DELEGATED_ACCESS_INACTIVE"
  | "DELEGATED_ACCESS_KIND_NOT_ALLOWED"
  | "DELEGATED_ACCESS_ORGANIZATION_KEY_NOT_ADMITTED"
  | "DELEGATED_ACCESS_ORGANIZATION_MISMATCH"
  | "DELEGATED_ACCESS_OUTLET_NOT_ALLOWED"
  | "DELEGATED_ACCESS_PERMISSION_DENIED"
  | "DELEGATED_ACCESS_PRINCIPAL_INACTIVE"
  | "DELEGATED_ACCESS_ROUTE_NOT_ALLOWED"
  | "DELEGATED_ACCESS_TARGET_MISMATCH"
  | "DELEGATED_ACCESS_UNSUPPORTED"
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
  parameters: [
    { member: "template_id", name: "template_id", in: "path", required: true, encoding: "scalar" },
  ],
  success: { status: 200, body: "json", required: ["status", "template"] },
  body: "required",
  idempotency: "safe",
  authentication: "required",
  organizationKeys: true,
  errors: [
    "BAD_REQUEST",
    "CLIENT_UPGRADE_REQUIRED",
    "CONFLICT",
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
    "FORBIDDEN",
    "INTERNAL_ERROR",
    "UNAUTHORIZED",
    "VALIDATION_FAILED",
    "WHATSAPP_TEMPLATE_NAME_TAKEN",
    "WHATSAPP_TEMPLATE_NOT_FOUND",
  ],
  "~types": undefined as unknown as { readonly input: MessageTemplatesReplaceInput; readonly output: MessageTemplatesReplaceOutput },
} as const satisfies Operation<MessageTemplatesReplaceInput, MessageTemplatesReplaceOutput, MessageTemplatesReplaceErrorCode>;

export type MessagesCreateInput = {
  /**
   * Outlet the request acts in. It must be an outlet the credential may use; omit it to use every such outlet.
   */
  outlet_id?: string;
} & T.CreateMessageInput;
export type MessagesCreateOutput = T.CreateMessageOutputEnvelope;
export type MessagesCreateErrorCode = 
  | "BAD_REQUEST"
  | "CLIENT_UPGRADE_REQUIRED"
  | "CONFLICT"
  | "DELEGATED_ACCESS_AUDIENCE_MISMATCH"
  | "DELEGATED_ACCESS_CREDENTIAL_LOCATION"
  | "DELEGATED_ACCESS_EFFECT_NOT_ALLOWED"
  | "DELEGATED_ACCESS_EXPANSION_NOT_ALLOWED"
  | "DELEGATED_ACCESS_FEATURE_NOT_ENTITLED"
  | "DELEGATED_ACCESS_FILTER_NOT_ALLOWED"
  | "DELEGATED_ACCESS_IMPERSONATION_NOT_ALLOWED"
  | "DELEGATED_ACCESS_INACTIVE"
  | "DELEGATED_ACCESS_KIND_NOT_ALLOWED"
  | "DELEGATED_ACCESS_ORGANIZATION_KEY_NOT_ADMITTED"
  | "DELEGATED_ACCESS_ORGANIZATION_MISMATCH"
  | "DELEGATED_ACCESS_OUTLET_NOT_ALLOWED"
  | "DELEGATED_ACCESS_PERMISSION_DENIED"
  | "DELEGATED_ACCESS_PRINCIPAL_INACTIVE"
  | "DELEGATED_ACCESS_ROUTE_NOT_ALLOWED"
  | "DELEGATED_ACCESS_TARGET_MISMATCH"
  | "DELEGATED_ACCESS_UNSUPPORTED"
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
  success: { status: 201, body: "json", required: ["message", "status"] },
  body: "required",
  idempotency: "keyed",
  authentication: "required",
  organizationKeys: true,
  errors: [
    "BAD_REQUEST",
    "CLIENT_UPGRADE_REQUIRED",
    "CONFLICT",
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
  "~types": undefined as unknown as { readonly input: MessagesCreateInput; readonly output: MessagesCreateOutput },
} as const satisfies Operation<MessagesCreateInput, MessagesCreateOutput, MessagesCreateErrorCode>;

export type MessagesGetInput = {
  /**
   * The message to read.
   */
  message_id: string;
  /**
   * Outlet the request acts in. It must be an outlet the credential may use; omit it to use every such outlet.
   */
  outlet_id?: string;
};
export type MessagesGetOutput = T.FetchMessageOutputEnvelope;
export type MessagesGetErrorCode = 
  | "BAD_REQUEST"
  | "CLIENT_UPGRADE_REQUIRED"
  | "DELEGATED_ACCESS_AUDIENCE_MISMATCH"
  | "DELEGATED_ACCESS_CREDENTIAL_LOCATION"
  | "DELEGATED_ACCESS_EFFECT_NOT_ALLOWED"
  | "DELEGATED_ACCESS_EXPANSION_NOT_ALLOWED"
  | "DELEGATED_ACCESS_FEATURE_NOT_ENTITLED"
  | "DELEGATED_ACCESS_FILTER_NOT_ALLOWED"
  | "DELEGATED_ACCESS_IMPERSONATION_NOT_ALLOWED"
  | "DELEGATED_ACCESS_INACTIVE"
  | "DELEGATED_ACCESS_KIND_NOT_ALLOWED"
  | "DELEGATED_ACCESS_ORGANIZATION_KEY_NOT_ADMITTED"
  | "DELEGATED_ACCESS_ORGANIZATION_MISMATCH"
  | "DELEGATED_ACCESS_OUTLET_NOT_ALLOWED"
  | "DELEGATED_ACCESS_PERMISSION_DENIED"
  | "DELEGATED_ACCESS_PRINCIPAL_INACTIVE"
  | "DELEGATED_ACCESS_ROUTE_NOT_ALLOWED"
  | "DELEGATED_ACCESS_TARGET_MISMATCH"
  | "DELEGATED_ACCESS_UNSUPPORTED"
  | "FORBIDDEN"
  | "INTERNAL_ERROR"
  | "UNAUTHORIZED"
  | "VALIDATION_FAILED"
  | "WHATSAPP_MESSAGE_NOT_FOUND";
export const messagesGet = {
  id: "whatsapp.messages.get",
  method: "GET",
  path: "/v1/messages/{message_id}",
  parameters: [
    { member: "message_id", name: "message_id", in: "path", required: true, encoding: "scalar" },
    { member: "outlet_id", name: "outlet_id", in: "query", required: false, encoding: "scalar" },
  ],
  success: { status: 200, body: "json", required: ["message", "status"] },
  body: "none",
  idempotency: "safe",
  authentication: "required",
  organizationKeys: true,
  errors: [
    "BAD_REQUEST",
    "CLIENT_UPGRADE_REQUIRED",
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
    "FORBIDDEN",
    "INTERNAL_ERROR",
    "UNAUTHORIZED",
    "VALIDATION_FAILED",
    "WHATSAPP_MESSAGE_NOT_FOUND",
  ],
  "~types": undefined as unknown as { readonly input: MessagesGetInput; readonly output: MessagesGetOutput },
} as const satisfies Operation<MessagesGetInput, MessagesGetOutput, MessagesGetErrorCode>;

export type MessagesListInput = {
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
  status?: T.MessageStatusRequest;
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
export type MessagesListOutput = T.FetchMessagesOutputEnvelope;
export type MessagesListErrorCode = 
  | "BAD_REQUEST"
  | "CLIENT_UPGRADE_REQUIRED"
  | "DELEGATED_ACCESS_AUDIENCE_MISMATCH"
  | "DELEGATED_ACCESS_CREDENTIAL_LOCATION"
  | "DELEGATED_ACCESS_EFFECT_NOT_ALLOWED"
  | "DELEGATED_ACCESS_EXPANSION_NOT_ALLOWED"
  | "DELEGATED_ACCESS_FEATURE_NOT_ENTITLED"
  | "DELEGATED_ACCESS_FILTER_NOT_ALLOWED"
  | "DELEGATED_ACCESS_IMPERSONATION_NOT_ALLOWED"
  | "DELEGATED_ACCESS_INACTIVE"
  | "DELEGATED_ACCESS_KIND_NOT_ALLOWED"
  | "DELEGATED_ACCESS_ORGANIZATION_KEY_NOT_ADMITTED"
  | "DELEGATED_ACCESS_ORGANIZATION_MISMATCH"
  | "DELEGATED_ACCESS_OUTLET_NOT_ALLOWED"
  | "DELEGATED_ACCESS_PERMISSION_DENIED"
  | "DELEGATED_ACCESS_PRINCIPAL_INACTIVE"
  | "DELEGATED_ACCESS_ROUTE_NOT_ALLOWED"
  | "DELEGATED_ACCESS_TARGET_MISMATCH"
  | "DELEGATED_ACCESS_UNSUPPORTED"
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
  success: { status: 200, body: "json", required: ["messages", "status"] },
  body: "none",
  idempotency: "safe",
  authentication: "required",
  organizationKeys: true,
  pagination: {
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
  },
  errors: [
    "BAD_REQUEST",
    "CLIENT_UPGRADE_REQUIRED",
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
    "FORBIDDEN",
    "INTERNAL_ERROR",
    "PAGINATION_CURSOR_INVALID",
    "PAGINATION_PARAMS_INVALID",
    "UNAUTHORIZED",
    "VALIDATION_FAILED",
  ],
  "~types": undefined as unknown as { readonly input: MessagesListInput; readonly output: MessagesListOutput },
} as const satisfies Operation<MessagesListInput, MessagesListOutput, MessagesListErrorCode>;
