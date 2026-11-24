// Generated from the GatherDeal public API contracts. Do not edit.

import type { Operation } from "../../operation.js";
import type * as T from "./types.js";

export type AgentsCreateInput = T.CreateAgentInput;
export type AgentsCreateOutput = T.CreateAgentOutputEnvelope;
export type AgentsCreateErrorCode = 
  | "BAD_REQUEST"
  | "CLIENT_CLOSED_REQUEST"
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
export const agentsCreate: Operation<AgentsCreateInput, AgentsCreateOutput, AgentsCreateErrorCode> = {
  id: "whatsapp.agents.create",
  method: "POST",
  path: "/v1/agents",
  parameters: [],
  success: { status: 200, body: "json", required: ["status"] },
  body: "required",
  idempotency: "keyed",
  authentication: "required",
  organizationKeys: false,
  errors: [
    "BAD_REQUEST",
    "CLIENT_CLOSED_REQUEST",
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
};

export type AgentsDeleteInput = {
  agent_id: string;
  /**
   * Outlet the request acts in. It must be an outlet the credential may use; omit it to use every such outlet.
   */
  outlet_id?: string;
};
export type AgentsDeleteOutput = T.DeleteAgentOutputEnvelope;
export type AgentsDeleteErrorCode = 
  | "BAD_REQUEST"
  | "CLIENT_CLOSED_REQUEST"
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
export const agentsDelete: Operation<AgentsDeleteInput, AgentsDeleteOutput, AgentsDeleteErrorCode> = {
  id: "whatsapp.agents.delete",
  method: "DELETE",
  path: "/v1/agents/{agent_id}",
  parameters: [
    { member: "agent_id", name: "agent_id", in: "path", required: true, encoding: "scalar" },
    { member: "outlet_id", name: "outlet_id", in: "query", required: false, encoding: "scalar" },
  ],
  success: { status: 200, body: "json", required: ["status"] },
  body: "none",
  idempotency: "safe",
  authentication: "required",
  organizationKeys: false,
  errors: [
    "BAD_REQUEST",
    "CLIENT_CLOSED_REQUEST",
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
};

export type AgentsGetInput = {
  agent_id: string;
  /**
   * Outlet the request acts in. It must be an outlet the credential may use; omit it to use every such outlet.
   */
  outlet_id?: string;
};
export type AgentsGetOutput = T.FetchAgentOutputEnvelope;
export type AgentsGetErrorCode = 
  | "BAD_REQUEST"
  | "CLIENT_CLOSED_REQUEST"
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
export const agentsGet: Operation<AgentsGetInput, AgentsGetOutput, AgentsGetErrorCode> = {
  id: "whatsapp.agents.get",
  method: "GET",
  path: "/v1/agents/{agent_id}",
  parameters: [
    { member: "agent_id", name: "agent_id", in: "path", required: true, encoding: "scalar" },
    { member: "outlet_id", name: "outlet_id", in: "query", required: false, encoding: "scalar" },
  ],
  success: { status: 200, body: "json", required: ["status"] },
  body: "none",
  idempotency: "safe",
  authentication: "required",
  organizationKeys: false,
  errors: [
    "BAD_REQUEST",
    "CLIENT_CLOSED_REQUEST",
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
};

export type AgentsListInput = {
  outlet_id?: string | null;
  /**
   * Page number (1-based). Selects page mode; mutually exclusive with after
   * and before.
   */
  p?: number;
  /**
   * Items per page. Defaults to 20, max 100 (larger values are clamped and
   * echoed as page_size).
   */
  count?: number;
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
   * Field name to sort by (e.g., "created_at", "name").
   */
  s?: string;
  /**
   * Sort direction: "asc" or "desc". Defaults to "desc".
   */
  o?: "asc" | "desc";
};
export type AgentsListOutput = T.FetchAgentsOutputEnvelope;
export type AgentsListErrorCode = 
  | "BAD_REQUEST"
  | "CLIENT_CLOSED_REQUEST"
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
export const agentsList: Operation<AgentsListInput, AgentsListOutput, AgentsListErrorCode> = {
  id: "whatsapp.agents.list",
  method: "GET",
  path: "/v1/agents",
  parameters: [
    { member: "outlet_id", name: "outlet_id", in: "query", required: false, encoding: "scalar" },
    { member: "p", name: "p", in: "query", required: false, encoding: "scalar" },
    { member: "count", name: "count", in: "query", required: false, encoding: "scalar" },
    { member: "after", name: "after", in: "query", required: false, encoding: "scalar" },
    { member: "before", name: "before", in: "query", required: false, encoding: "scalar" },
    { member: "total", name: "total", in: "query", required: false, encoding: "scalar" },
    { member: "s", name: "s", in: "query", required: false, encoding: "scalar" },
    { member: "o", name: "o", in: "query", required: false, encoding: "scalar" },
  ],
  success: { status: 200, body: "json", required: ["status"] },
  body: "none",
  idempotency: "safe",
  authentication: "required",
  organizationKeys: false,
  pagination: {
    pageParam: "p",
    pageSizeParam: "count",
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
    "CLIENT_CLOSED_REQUEST",
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
};

export type AgentsPairingInput = {
  agent_id: string;
  /**
   * Outlet the request acts in. It must be an outlet the credential may use; omit it to use every such outlet.
   */
  outlet_id?: string;
};
export type AgentsPairingOutput = T.FetchAgentPairingOutputEnvelope;
export type AgentsPairingErrorCode = 
  | "BAD_REQUEST"
  | "CLIENT_CLOSED_REQUEST"
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
export const agentsPairing: Operation<AgentsPairingInput, AgentsPairingOutput, AgentsPairingErrorCode> = {
  id: "whatsapp.agents.pairing",
  method: "GET",
  path: "/v1/agents/{agent_id}/pairing",
  parameters: [
    { member: "agent_id", name: "agent_id", in: "path", required: true, encoding: "scalar" },
    { member: "outlet_id", name: "outlet_id", in: "query", required: false, encoding: "scalar" },
  ],
  success: { status: 200, body: "json", required: ["status"] },
  body: "none",
  idempotency: "safe",
  authentication: "required",
  organizationKeys: false,
  errors: [
    "BAD_REQUEST",
    "CLIENT_CLOSED_REQUEST",
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
};

export type AgentsUpdateInput = {
  agent_id: string;
} & T.UpdateAgentInput;
export type AgentsUpdateOutput = T.UpdateAgentOutputEnvelope;
export type AgentsUpdateErrorCode = 
  | "BAD_REQUEST"
  | "CLIENT_CLOSED_REQUEST"
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
  | "UNAUTHORIZED"
  | "UNAVAILABLE"
  | "VALIDATION_FAILED"
  | "WHATSAPP_AGENT_NOT_FOUND"
  | "WHATSAPP_AGENT_OUTLET_INVALID"
  | "WHATSAPP_SYSTEM_AGENT_UNASSIGNABLE";
export const agentsUpdate: Operation<AgentsUpdateInput, AgentsUpdateOutput, AgentsUpdateErrorCode> = {
  id: "whatsapp.agents.update",
  method: "PATCH",
  path: "/v1/agents/{agent_id}",
  parameters: [
    { member: "agent_id", name: "agent_id", in: "path", required: true, encoding: "scalar" },
  ],
  success: { status: 200, body: "json", required: ["status"] },
  body: "required",
  idempotency: "safe",
  authentication: "required",
  organizationKeys: false,
  errors: [
    "BAD_REQUEST",
    "CLIENT_CLOSED_REQUEST",
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
    "UNAUTHORIZED",
    "UNAVAILABLE",
    "VALIDATION_FAILED",
    "WHATSAPP_AGENT_NOT_FOUND",
    "WHATSAPP_AGENT_OUTLET_INVALID",
    "WHATSAPP_SYSTEM_AGENT_UNASSIGNABLE",
  ],
};

export type BroadcastSuppressionsAddInput = T.AddBroadcastSuppressionsInput;
export type BroadcastSuppressionsAddOutput = T.AddBroadcastRecipientsOutputEnvelope;
export type BroadcastSuppressionsAddErrorCode = 
  | "BAD_REQUEST"
  | "CLIENT_CLOSED_REQUEST"
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
export const broadcastSuppressionsAdd: Operation<BroadcastSuppressionsAddInput, BroadcastSuppressionsAddOutput, BroadcastSuppressionsAddErrorCode> = {
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
    "CLIENT_CLOSED_REQUEST",
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
};

export type BroadcastSuppressionsDeleteInput = {
  suppression_id: string;
};
export type BroadcastSuppressionsDeleteOutput = void;
export type BroadcastSuppressionsDeleteErrorCode = 
  | "BAD_REQUEST"
  | "CLIENT_CLOSED_REQUEST"
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
export const broadcastSuppressionsDelete: Operation<BroadcastSuppressionsDeleteInput, BroadcastSuppressionsDeleteOutput, BroadcastSuppressionsDeleteErrorCode> = {
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
    "CLIENT_CLOSED_REQUEST",
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
};

export type BroadcastSuppressionsListInput = {
  /**
   * Page number (1-based). Selects page mode; mutually exclusive with after
   * and before.
   */
  p?: number;
  /**
   * Items per page. Defaults to 20, max 100 (larger values are clamped and
   * echoed as page_size).
   */
  count?: number;
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
   * Field name to sort by (e.g., "created_at", "name").
   */
  s?: string;
  /**
   * Sort direction: "asc" or "desc". Defaults to "desc".
   */
  o?: "asc" | "desc";
  to?: string | null;
};
export type BroadcastSuppressionsListOutput = T.FetchBroadcastSuppressionsOutputEnvelope;
export type BroadcastSuppressionsListErrorCode = 
  | "BAD_REQUEST"
  | "CLIENT_CLOSED_REQUEST"
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
export const broadcastSuppressionsList: Operation<BroadcastSuppressionsListInput, BroadcastSuppressionsListOutput, BroadcastSuppressionsListErrorCode> = {
  id: "whatsapp.broadcast_suppressions.list",
  method: "GET",
  path: "/v1/broadcast-suppressions",
  parameters: [
    { member: "p", name: "p", in: "query", required: false, encoding: "scalar" },
    { member: "count", name: "count", in: "query", required: false, encoding: "scalar" },
    { member: "after", name: "after", in: "query", required: false, encoding: "scalar" },
    { member: "before", name: "before", in: "query", required: false, encoding: "scalar" },
    { member: "total", name: "total", in: "query", required: false, encoding: "scalar" },
    { member: "s", name: "s", in: "query", required: false, encoding: "scalar" },
    { member: "o", name: "o", in: "query", required: false, encoding: "scalar" },
    { member: "to", name: "to", in: "query", required: false, encoding: "scalar" },
  ],
  success: { status: 200, body: "json", required: ["status"] },
  body: "none",
  idempotency: "safe",
  authentication: "required",
  organizationKeys: true,
  pagination: {
    pageParam: "p",
    pageSizeParam: "count",
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
    "CLIENT_CLOSED_REQUEST",
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
};

export type BroadcastsCancelInput = {
  broadcast_id: string;
};
export type BroadcastsCancelOutput = T.BroadcastOutputEnvelope;
export type BroadcastsCancelErrorCode = 
  | "BAD_REQUEST"
  | "CLIENT_CLOSED_REQUEST"
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
export const broadcastsCancel: Operation<BroadcastsCancelInput, BroadcastsCancelOutput, BroadcastsCancelErrorCode> = {
  id: "whatsapp.broadcasts.cancel",
  method: "POST",
  path: "/v1/broadcasts/{broadcast_id}/cancel",
  parameters: [
    { member: "broadcast_id", name: "broadcast_id", in: "path", required: true, encoding: "scalar" },
  ],
  success: { status: 200, body: "json", required: ["status"] },
  body: "none",
  idempotency: "safe",
  authentication: "required",
  organizationKeys: true,
  errors: [
    "BAD_REQUEST",
    "CLIENT_CLOSED_REQUEST",
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
};

export type BroadcastsCreateInput = {
  /**
   * Outlet the request acts in. It must be an outlet the credential may use; omit it to use every such outlet.
   */
  outlet_id?: string;
} & T.CreateBroadcastInput;
export type BroadcastsCreateOutput = T.BroadcastOutputEnvelope;
export type BroadcastsCreateErrorCode = 
  | "BAD_REQUEST"
  | "CLIENT_CLOSED_REQUEST"
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
export const broadcastsCreate: Operation<BroadcastsCreateInput, BroadcastsCreateOutput, BroadcastsCreateErrorCode> = {
  id: "whatsapp.broadcasts.create",
  method: "POST",
  path: "/v1/broadcasts",
  parameters: [
    { member: "outlet_id", name: "outlet_id", in: "query", required: false, encoding: "scalar" },
  ],
  success: { status: 200, body: "json", required: ["status"] },
  body: "required",
  idempotency: "keyed",
  authentication: "required",
  organizationKeys: true,
  errors: [
    "BAD_REQUEST",
    "CLIENT_CLOSED_REQUEST",
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
};

export type BroadcastsGetInput = {
  broadcast_id: string;
};
export type BroadcastsGetOutput = T.BroadcastOutputEnvelope;
export type BroadcastsGetErrorCode = 
  | "BAD_REQUEST"
  | "CLIENT_CLOSED_REQUEST"
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
export const broadcastsGet: Operation<BroadcastsGetInput, BroadcastsGetOutput, BroadcastsGetErrorCode> = {
  id: "whatsapp.broadcasts.get",
  method: "GET",
  path: "/v1/broadcasts/{broadcast_id}",
  parameters: [
    { member: "broadcast_id", name: "broadcast_id", in: "path", required: true, encoding: "scalar" },
  ],
  success: { status: 200, body: "json", required: ["status"] },
  body: "none",
  idempotency: "safe",
  authentication: "required",
  organizationKeys: true,
  errors: [
    "BAD_REQUEST",
    "CLIENT_CLOSED_REQUEST",
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
};

export type BroadcastsListInput = {
  /**
   * Page number (1-based). Selects page mode; mutually exclusive with after
   * and before.
   */
  p?: number;
  /**
   * Items per page. Defaults to 20, max 100 (larger values are clamped and
   * echoed as page_size).
   */
  count?: number;
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
   * Field name to sort by (e.g., "created_at", "name").
   */
  s?: string;
  /**
   * Sort direction: "asc" or "desc". Defaults to "desc".
   */
  o?: "asc" | "desc";
  status?: T.BroadcastStatusRequest;
};
export type BroadcastsListOutput = T.FetchBroadcastsOutputEnvelope;
export type BroadcastsListErrorCode = 
  | "BAD_REQUEST"
  | "CLIENT_CLOSED_REQUEST"
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
export const broadcastsList: Operation<BroadcastsListInput, BroadcastsListOutput, BroadcastsListErrorCode> = {
  id: "whatsapp.broadcasts.list",
  method: "GET",
  path: "/v1/broadcasts",
  parameters: [
    { member: "p", name: "p", in: "query", required: false, encoding: "scalar" },
    { member: "count", name: "count", in: "query", required: false, encoding: "scalar" },
    { member: "after", name: "after", in: "query", required: false, encoding: "scalar" },
    { member: "before", name: "before", in: "query", required: false, encoding: "scalar" },
    { member: "total", name: "total", in: "query", required: false, encoding: "scalar" },
    { member: "s", name: "s", in: "query", required: false, encoding: "scalar" },
    { member: "o", name: "o", in: "query", required: false, encoding: "scalar" },
    { member: "status", name: "status", in: "query", required: false, encoding: "scalar" },
  ],
  success: { status: 200, body: "json", required: ["status"] },
  body: "none",
  idempotency: "safe",
  authentication: "required",
  organizationKeys: true,
  pagination: {
    pageParam: "p",
    pageSizeParam: "count",
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
    "CLIENT_CLOSED_REQUEST",
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
};

export type BroadcastsPauseInput = {
  broadcast_id: string;
};
export type BroadcastsPauseOutput = T.BroadcastOutputEnvelope;
export type BroadcastsPauseErrorCode = 
  | "BAD_REQUEST"
  | "CLIENT_CLOSED_REQUEST"
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
export const broadcastsPause: Operation<BroadcastsPauseInput, BroadcastsPauseOutput, BroadcastsPauseErrorCode> = {
  id: "whatsapp.broadcasts.pause",
  method: "POST",
  path: "/v1/broadcasts/{broadcast_id}/pause",
  parameters: [
    { member: "broadcast_id", name: "broadcast_id", in: "path", required: true, encoding: "scalar" },
  ],
  success: { status: 200, body: "json", required: ["status"] },
  body: "none",
  idempotency: "safe",
  authentication: "required",
  organizationKeys: true,
  errors: [
    "BAD_REQUEST",
    "CLIENT_CLOSED_REQUEST",
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
};

export type BroadcastsRecipientsAddInput = {
  broadcast_id: string;
} & T.AddBroadcastRecipientsInput;
export type BroadcastsRecipientsAddOutput = T.AddBroadcastRecipientsOutputEnvelope;
export type BroadcastsRecipientsAddErrorCode = 
  | "BAD_REQUEST"
  | "CLIENT_CLOSED_REQUEST"
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
export const broadcastsRecipientsAdd: Operation<BroadcastsRecipientsAddInput, BroadcastsRecipientsAddOutput, BroadcastsRecipientsAddErrorCode> = {
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
    "CLIENT_CLOSED_REQUEST",
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
};

export type BroadcastsRecipientsDeleteInput = {
  broadcast_id: string;
  recipient_id: string;
};
export type BroadcastsRecipientsDeleteOutput = void;
export type BroadcastsRecipientsDeleteErrorCode = 
  | "BAD_REQUEST"
  | "CLIENT_CLOSED_REQUEST"
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
export const broadcastsRecipientsDelete: Operation<BroadcastsRecipientsDeleteInput, BroadcastsRecipientsDeleteOutput, BroadcastsRecipientsDeleteErrorCode> = {
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
    "CLIENT_CLOSED_REQUEST",
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
};

export type BroadcastsRecipientsListInput = {
  broadcast_id: string;
  /**
   * Page number (1-based). Selects page mode; mutually exclusive with after
   * and before.
   */
  p?: number;
  /**
   * Items per page. Defaults to 20, max 100 (larger values are clamped and
   * echoed as page_size).
   */
  count?: number;
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
   * Field name to sort by (e.g., "created_at", "name").
   */
  s?: string;
  /**
   * Sort direction: "asc" or "desc". Defaults to "desc".
   */
  o?: "asc" | "desc";
  status?: T.BroadcastRecipientStatusRequest;
  agent_id?: string;
  to?: string | null;
};
export type BroadcastsRecipientsListOutput = T.FetchBroadcastRecipientsOutputEnvelope;
export type BroadcastsRecipientsListErrorCode = 
  | "BAD_REQUEST"
  | "CLIENT_CLOSED_REQUEST"
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
export const broadcastsRecipientsList: Operation<BroadcastsRecipientsListInput, BroadcastsRecipientsListOutput, BroadcastsRecipientsListErrorCode> = {
  id: "whatsapp.broadcasts.recipients.list",
  method: "GET",
  path: "/v1/broadcasts/{broadcast_id}/recipients",
  parameters: [
    { member: "broadcast_id", name: "broadcast_id", in: "path", required: true, encoding: "scalar" },
    { member: "p", name: "p", in: "query", required: false, encoding: "scalar" },
    { member: "count", name: "count", in: "query", required: false, encoding: "scalar" },
    { member: "after", name: "after", in: "query", required: false, encoding: "scalar" },
    { member: "before", name: "before", in: "query", required: false, encoding: "scalar" },
    { member: "total", name: "total", in: "query", required: false, encoding: "scalar" },
    { member: "s", name: "s", in: "query", required: false, encoding: "scalar" },
    { member: "o", name: "o", in: "query", required: false, encoding: "scalar" },
    { member: "status", name: "status", in: "query", required: false, encoding: "scalar" },
    { member: "agent_id", name: "agent_id", in: "query", required: false, encoding: "scalar" },
    { member: "to", name: "to", in: "query", required: false, encoding: "scalar" },
  ],
  success: { status: 200, body: "json", required: ["status"] },
  body: "none",
  idempotency: "safe",
  authentication: "required",
  organizationKeys: true,
  pagination: {
    pageParam: "p",
    pageSizeParam: "count",
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
    "CLIENT_CLOSED_REQUEST",
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
};

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
  | "CLIENT_CLOSED_REQUEST"
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
export const broadcastsResume: Operation<BroadcastsResumeInput, BroadcastsResumeOutput, BroadcastsResumeErrorCode> = {
  id: "whatsapp.broadcasts.resume",
  method: "POST",
  path: "/v1/broadcasts/{broadcast_id}/resume",
  parameters: [
    { member: "broadcast_id", name: "broadcast_id", in: "path", required: true, encoding: "scalar" },
    { member: "outlet_id", name: "outlet_id", in: "query", required: false, encoding: "scalar" },
  ],
  success: { status: 200, body: "json", required: ["status"] },
  body: "none",
  idempotency: "safe",
  authentication: "required",
  organizationKeys: true,
  errors: [
    "BAD_REQUEST",
    "CLIENT_CLOSED_REQUEST",
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
};

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
  | "CLIENT_CLOSED_REQUEST"
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
export const broadcastsStart: Operation<BroadcastsStartInput, BroadcastsStartOutput, BroadcastsStartErrorCode> = {
  id: "whatsapp.broadcasts.start",
  method: "POST",
  path: "/v1/broadcasts/{broadcast_id}/start",
  parameters: [
    { member: "broadcast_id", name: "broadcast_id", in: "path", required: true, encoding: "scalar" },
    { member: "outlet_id", name: "outlet_id", in: "query", required: false, encoding: "scalar" },
  ],
  success: { status: 200, body: "json", required: ["status"] },
  body: "none",
  idempotency: "safe",
  authentication: "required",
  organizationKeys: true,
  errors: [
    "BAD_REQUEST",
    "CLIENT_CLOSED_REQUEST",
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
};

export type BroadcastsUpdateInput = {
  broadcast_id: string;
  /**
   * Outlet the request acts in. It must be an outlet the credential may use; omit it to use every such outlet.
   */
  outlet_id?: string;
} & T.UpdateBroadcastInput;
export type BroadcastsUpdateOutput = T.BroadcastOutputEnvelope;
export type BroadcastsUpdateErrorCode = 
  | "BAD_REQUEST"
  | "CLIENT_CLOSED_REQUEST"
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
export const broadcastsUpdate: Operation<BroadcastsUpdateInput, BroadcastsUpdateOutput, BroadcastsUpdateErrorCode> = {
  id: "whatsapp.broadcasts.update",
  method: "PATCH",
  path: "/v1/broadcasts/{broadcast_id}",
  parameters: [
    { member: "broadcast_id", name: "broadcast_id", in: "path", required: true, encoding: "scalar" },
    { member: "outlet_id", name: "outlet_id", in: "query", required: false, encoding: "scalar" },
  ],
  success: { status: 200, body: "json", required: ["status"] },
  body: "required",
  idempotency: "safe",
  authentication: "required",
  organizationKeys: true,
  errors: [
    "BAD_REQUEST",
    "CLIENT_CLOSED_REQUEST",
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
};

export type ChatMessagesGetInput = {
  id: string;
  /**
   * Outlet the request acts in. It must be an outlet the credential may use; omit it to use every such outlet.
   */
  outlet_id?: string;
};
export type ChatMessagesGetOutput = T.FetchChatMessageOutputEnvelope;
export type ChatMessagesGetErrorCode = 
  | "BAD_REQUEST"
  | "CLIENT_CLOSED_REQUEST"
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
export const chatMessagesGet: Operation<ChatMessagesGetInput, ChatMessagesGetOutput, ChatMessagesGetErrorCode> = {
  id: "whatsapp.chat_messages.get",
  method: "GET",
  path: "/v1/chat-messages/{id}",
  parameters: [
    { member: "id", name: "id", in: "path", required: true, encoding: "scalar" },
    { member: "outlet_id", name: "outlet_id", in: "query", required: false, encoding: "scalar" },
  ],
  success: { status: 200, body: "json", required: ["status"] },
  body: "none",
  idempotency: "safe",
  authentication: "required",
  organizationKeys: true,
  errors: [
    "BAD_REQUEST",
    "CLIENT_CLOSED_REQUEST",
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
};

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
  | "CLIENT_CLOSED_REQUEST"
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
export const chatMessagesList: Operation<ChatMessagesListInput, ChatMessagesListOutput, ChatMessagesListErrorCode> = {
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
    "CLIENT_CLOSED_REQUEST",
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
};

export type ChatsGetInput = {
  chat_id: string;
  /**
   * Outlet the request acts in. It must be an outlet the credential may use; omit it to use every such outlet.
   */
  outlet_id?: string;
};
export type ChatsGetOutput = T.FetchChatOutputEnvelope;
export type ChatsGetErrorCode = 
  | "BAD_REQUEST"
  | "CLIENT_CLOSED_REQUEST"
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
export const chatsGet: Operation<ChatsGetInput, ChatsGetOutput, ChatsGetErrorCode> = {
  id: "whatsapp.chats.get",
  method: "GET",
  path: "/v1/chats/{chat_id}",
  parameters: [
    { member: "chat_id", name: "chat_id", in: "path", required: true, encoding: "scalar" },
    { member: "outlet_id", name: "outlet_id", in: "query", required: false, encoding: "scalar" },
  ],
  success: { status: 200, body: "json", required: ["status"] },
  body: "none",
  idempotency: "safe",
  authentication: "required",
  organizationKeys: true,
  errors: [
    "BAD_REQUEST",
    "CLIENT_CLOSED_REQUEST",
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
};

export type ChatsListInput = {
  /**
   * The agent whose chats to list.
   */
  agent_id?: string;
  /**
   * Page number (1-based). Selects page mode; mutually exclusive with after
   * and before.
   */
  p?: number;
  /**
   * Items per page. Defaults to 20, max 100 (larger values are clamped and
   * echoed as page_size).
   */
  count?: number;
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
   * Field name to sort by (e.g., "created_at", "name").
   */
  s?: string;
  /**
   * Sort direction: "asc" or "desc". Defaults to "desc".
   */
  o?: "asc" | "desc";
  /**
   * Outlet the request acts in. It must be an outlet the credential may use; omit it to use every such outlet.
   */
  outlet_id?: string;
};
export type ChatsListOutput = T.FetchChatsOutputEnvelope;
export type ChatsListErrorCode = 
  | "BAD_REQUEST"
  | "CLIENT_CLOSED_REQUEST"
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
export const chatsList: Operation<ChatsListInput, ChatsListOutput, ChatsListErrorCode> = {
  id: "whatsapp.chats.list",
  method: "GET",
  path: "/v1/chats",
  parameters: [
    { member: "agent_id", name: "agent_id", in: "query", required: false, encoding: "scalar" },
    { member: "p", name: "p", in: "query", required: false, encoding: "scalar" },
    { member: "count", name: "count", in: "query", required: false, encoding: "scalar" },
    { member: "after", name: "after", in: "query", required: false, encoding: "scalar" },
    { member: "before", name: "before", in: "query", required: false, encoding: "scalar" },
    { member: "total", name: "total", in: "query", required: false, encoding: "scalar" },
    { member: "s", name: "s", in: "query", required: false, encoding: "scalar" },
    { member: "o", name: "o", in: "query", required: false, encoding: "scalar" },
    { member: "outlet_id", name: "outlet_id", in: "query", required: false, encoding: "scalar" },
  ],
  success: { status: 200, body: "json", required: ["status"] },
  body: "none",
  idempotency: "safe",
  authentication: "required",
  organizationKeys: true,
  pagination: {
    pageParam: "p",
    pageSizeParam: "count",
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
    "CLIENT_CLOSED_REQUEST",
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
};

export type ChatsMessagesInput = {
  chat_id: string;
  /**
   * Page number (1-based). Selects page mode; mutually exclusive with after
   * and before.
   */
  p?: number;
  /**
   * Items per page. Defaults to 20, max 100 (larger values are clamped and
   * echoed as page_size).
   */
  count?: number;
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
export type ChatsMessagesOutput = T.FetchChatMessagesOutputEnvelope;
export type ChatsMessagesErrorCode = 
  | "BAD_REQUEST"
  | "CLIENT_CLOSED_REQUEST"
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
export const chatsMessages: Operation<ChatsMessagesInput, ChatsMessagesOutput, ChatsMessagesErrorCode> = {
  id: "whatsapp.chats.messages",
  method: "GET",
  path: "/v1/chats/{chat_id}/messages",
  parameters: [
    { member: "chat_id", name: "chat_id", in: "path", required: true, encoding: "scalar" },
    { member: "p", name: "p", in: "query", required: false, encoding: "scalar" },
    { member: "count", name: "count", in: "query", required: false, encoding: "scalar" },
    { member: "after", name: "after", in: "query", required: false, encoding: "scalar" },
    { member: "before", name: "before", in: "query", required: false, encoding: "scalar" },
    { member: "total", name: "total", in: "query", required: false, encoding: "scalar" },
    { member: "outlet_id", name: "outlet_id", in: "query", required: false, encoding: "scalar" },
  ],
  success: { status: 200, body: "json", required: ["status"] },
  body: "none",
  idempotency: "safe",
  authentication: "required",
  organizationKeys: true,
  pagination: {
    pageParam: "p",
    pageSizeParam: "count",
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
    "CLIENT_CLOSED_REQUEST",
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
};

export type MessageTemplatesCreateInput = T.CreateMessageTemplateInput;
export type MessageTemplatesCreateOutput = T.MessageTemplateOutputEnvelope;
export type MessageTemplatesCreateErrorCode = 
  | "BAD_REQUEST"
  | "CLIENT_CLOSED_REQUEST"
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
  | "WHATSAPP_TEMPLATE_LIMIT_REACHED"
  | "WHATSAPP_TEMPLATE_NAME_TAKEN";
export const messageTemplatesCreate: Operation<MessageTemplatesCreateInput, MessageTemplatesCreateOutput, MessageTemplatesCreateErrorCode> = {
  id: "whatsapp.message_templates.create",
  method: "POST",
  path: "/v1/message-templates",
  parameters: [],
  success: { status: 200, body: "json", required: ["status"] },
  body: "required",
  idempotency: "none",
  authentication: "required",
  organizationKeys: true,
  errors: [
    "BAD_REQUEST",
    "CLIENT_CLOSED_REQUEST",
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
    "WHATSAPP_TEMPLATE_LIMIT_REACHED",
    "WHATSAPP_TEMPLATE_NAME_TAKEN",
  ],
};

export type MessageTemplatesDeleteInput = {
  template_id: string;
};
export type MessageTemplatesDeleteOutput = void;
export type MessageTemplatesDeleteErrorCode = 
  | "BAD_REQUEST"
  | "CLIENT_CLOSED_REQUEST"
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
export const messageTemplatesDelete: Operation<MessageTemplatesDeleteInput, MessageTemplatesDeleteOutput, MessageTemplatesDeleteErrorCode> = {
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
    "CLIENT_CLOSED_REQUEST",
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
};

export type MessageTemplatesGetInput = {
  template_id: string;
};
export type MessageTemplatesGetOutput = T.MessageTemplateOutputEnvelope;
export type MessageTemplatesGetErrorCode = 
  | "BAD_REQUEST"
  | "CLIENT_CLOSED_REQUEST"
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
export const messageTemplatesGet: Operation<MessageTemplatesGetInput, MessageTemplatesGetOutput, MessageTemplatesGetErrorCode> = {
  id: "whatsapp.message_templates.get",
  method: "GET",
  path: "/v1/message-templates/{template_id}",
  parameters: [
    { member: "template_id", name: "template_id", in: "path", required: true, encoding: "scalar" },
  ],
  success: { status: 200, body: "json", required: ["status"] },
  body: "none",
  idempotency: "safe",
  authentication: "required",
  organizationKeys: true,
  errors: [
    "BAD_REQUEST",
    "CLIENT_CLOSED_REQUEST",
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
};

export type MessageTemplatesListInput = {
  /**
   * Page number (1-based). Selects page mode; mutually exclusive with after
   * and before.
   */
  p?: number;
  /**
   * Items per page. Defaults to 20, max 100 (larger values are clamped and
   * echoed as page_size).
   */
  count?: number;
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
   * Field name to sort by (e.g., "created_at", "name").
   */
  s?: string;
  /**
   * Sort direction: "asc" or "desc". Defaults to "desc".
   */
  o?: "asc" | "desc";
  name?: string;
};
export type MessageTemplatesListOutput = T.FetchMessageTemplatesOutputEnvelope;
export type MessageTemplatesListErrorCode = 
  | "BAD_REQUEST"
  | "CLIENT_CLOSED_REQUEST"
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
export const messageTemplatesList: Operation<MessageTemplatesListInput, MessageTemplatesListOutput, MessageTemplatesListErrorCode> = {
  id: "whatsapp.message_templates.list",
  method: "GET",
  path: "/v1/message-templates",
  parameters: [
    { member: "p", name: "p", in: "query", required: false, encoding: "scalar" },
    { member: "count", name: "count", in: "query", required: false, encoding: "scalar" },
    { member: "after", name: "after", in: "query", required: false, encoding: "scalar" },
    { member: "before", name: "before", in: "query", required: false, encoding: "scalar" },
    { member: "total", name: "total", in: "query", required: false, encoding: "scalar" },
    { member: "s", name: "s", in: "query", required: false, encoding: "scalar" },
    { member: "o", name: "o", in: "query", required: false, encoding: "scalar" },
    { member: "name", name: "name", in: "query", required: false, encoding: "scalar" },
  ],
  success: { status: 200, body: "json", required: ["status"] },
  body: "none",
  idempotency: "safe",
  authentication: "required",
  organizationKeys: true,
  pagination: {
    pageParam: "p",
    pageSizeParam: "count",
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
    "CLIENT_CLOSED_REQUEST",
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
};

export type MessageTemplatesPreviewInput = {
  template_id: string;
} & T.PreviewMessageTemplateInput;
export type MessageTemplatesPreviewOutput = T.PreviewMessageTemplateOutputEnvelope;
export type MessageTemplatesPreviewErrorCode = 
  | "BAD_REQUEST"
  | "CLIENT_CLOSED_REQUEST"
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
export const messageTemplatesPreview: Operation<MessageTemplatesPreviewInput, MessageTemplatesPreviewOutput, MessageTemplatesPreviewErrorCode> = {
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
    "CLIENT_CLOSED_REQUEST",
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
};

export type MessageTemplatesUpdateInput = {
  template_id: string;
} & T.UpdateMessageTemplateInput;
export type MessageTemplatesUpdateOutput = T.MessageTemplateOutputEnvelope;
export type MessageTemplatesUpdateErrorCode = 
  | "BAD_REQUEST"
  | "CLIENT_CLOSED_REQUEST"
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
export const messageTemplatesUpdate: Operation<MessageTemplatesUpdateInput, MessageTemplatesUpdateOutput, MessageTemplatesUpdateErrorCode> = {
  id: "whatsapp.message_templates.update",
  method: "PUT",
  path: "/v1/message-templates/{template_id}",
  parameters: [
    { member: "template_id", name: "template_id", in: "path", required: true, encoding: "scalar" },
  ],
  success: { status: 200, body: "json", required: ["status"] },
  body: "required",
  idempotency: "none",
  authentication: "required",
  organizationKeys: true,
  errors: [
    "BAD_REQUEST",
    "CLIENT_CLOSED_REQUEST",
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
};

export type MessagesCreateInput = {
  /**
   * Outlet the request acts in. It must be an outlet the credential may use; omit it to use every such outlet.
   */
  outlet_id?: string;
} & T.CreateMessageInput;
export type MessagesCreateOutput = T.CreateMessageOutputEnvelope;
export type MessagesCreateErrorCode = 
  | "BAD_REQUEST"
  | "CLIENT_CLOSED_REQUEST"
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
export const messagesCreate: Operation<MessagesCreateInput, MessagesCreateOutput, MessagesCreateErrorCode> = {
  id: "whatsapp.messages.create",
  method: "POST",
  path: "/v1/messages",
  parameters: [
    { member: "outlet_id", name: "outlet_id", in: "query", required: false, encoding: "scalar" },
  ],
  success: { status: 200, body: "json", required: ["status"] },
  body: "required",
  idempotency: "keyed",
  authentication: "required",
  organizationKeys: true,
  errors: [
    "BAD_REQUEST",
    "CLIENT_CLOSED_REQUEST",
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
};

export type MessagesGetInput = {
  message_id: string;
  /**
   * Outlet the request acts in. It must be an outlet the credential may use; omit it to use every such outlet.
   */
  outlet_id?: string;
};
export type MessagesGetOutput = T.FetchMessageOutputEnvelope;
export type MessagesGetErrorCode = 
  | "BAD_REQUEST"
  | "CLIENT_CLOSED_REQUEST"
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
export const messagesGet: Operation<MessagesGetInput, MessagesGetOutput, MessagesGetErrorCode> = {
  id: "whatsapp.messages.get",
  method: "GET",
  path: "/v1/messages/{message_id}",
  parameters: [
    { member: "message_id", name: "message_id", in: "path", required: true, encoding: "scalar" },
    { member: "outlet_id", name: "outlet_id", in: "query", required: false, encoding: "scalar" },
  ],
  success: { status: 200, body: "json", required: ["status"] },
  body: "none",
  idempotency: "safe",
  authentication: "required",
  organizationKeys: true,
  errors: [
    "BAD_REQUEST",
    "CLIENT_CLOSED_REQUEST",
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
};

export type MessagesListInput = {
  outlet_id?: string | null;
  /**
   * Page number (1-based). Selects page mode; mutually exclusive with after
   * and before.
   */
  p?: number;
  /**
   * Items per page. Defaults to 20, max 100 (larger values are clamped and
   * echoed as page_size).
   */
  count?: number;
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
   * Field name to sort by (e.g., "created_at", "name").
   */
  s?: string;
  /**
   * Sort direction: "asc" or "desc". Defaults to "desc".
   */
  o?: "asc" | "desc";
  agent_id?: string;
  status?: T.MessageStatusRequest;
  to?: string | null;
  from?: string | null;
  "create_at[gte]"?: string | null;
  "create_at[lte]"?: string | null;
};
export type MessagesListOutput = T.FetchMessagesOutputEnvelope;
export type MessagesListErrorCode = 
  | "BAD_REQUEST"
  | "CLIENT_CLOSED_REQUEST"
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
export const messagesList: Operation<MessagesListInput, MessagesListOutput, MessagesListErrorCode> = {
  id: "whatsapp.messages.list",
  method: "GET",
  path: "/v1/messages",
  parameters: [
    { member: "outlet_id", name: "outlet_id", in: "query", required: false, encoding: "scalar" },
    { member: "p", name: "p", in: "query", required: false, encoding: "scalar" },
    { member: "count", name: "count", in: "query", required: false, encoding: "scalar" },
    { member: "after", name: "after", in: "query", required: false, encoding: "scalar" },
    { member: "before", name: "before", in: "query", required: false, encoding: "scalar" },
    { member: "total", name: "total", in: "query", required: false, encoding: "scalar" },
    { member: "s", name: "s", in: "query", required: false, encoding: "scalar" },
    { member: "o", name: "o", in: "query", required: false, encoding: "scalar" },
    { member: "agent_id", name: "agent_id", in: "query", required: false, encoding: "scalar" },
    { member: "status", name: "status", in: "query", required: false, encoding: "scalar" },
    { member: "to", name: "to", in: "query", required: false, encoding: "scalar" },
    { member: "from", name: "from", in: "query", required: false, encoding: "scalar" },
    { member: "create_at[gte]", name: "create_at[gte]", in: "query", required: false, encoding: "scalar" },
    { member: "create_at[lte]", name: "create_at[lte]", in: "query", required: false, encoding: "scalar" },
  ],
  success: { status: 200, body: "json", required: ["status"] },
  body: "none",
  idempotency: "safe",
  authentication: "required",
  organizationKeys: true,
  pagination: {
    pageParam: "p",
    pageSizeParam: "count",
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
    "CLIENT_CLOSED_REQUEST",
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
};
