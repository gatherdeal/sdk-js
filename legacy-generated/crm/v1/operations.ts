// Generated from the GatherDeal public API contracts. Do not edit.

import type { Operation } from "../../operation.js";
import type * as T from "./types.js";

export type ContactLogsCreateInput = {
  /**
   * Outlet the request acts in. It must be an outlet the credential may use; omit it to use every such outlet.
   */
  outlet_id?: string;
} & T.CreateContactLogInput;
export type ContactLogsCreateOutput = T.KeyedAcknowledgmentEnvelope;
export type ContactLogsCreateErrorCode = 
  | "BAD_REQUEST"
  | "CLIENT_UPGRADE_REQUIRED"
  | "CONFLICT"
  | "CRM_CONTACT_LOG_NOT_FOUND"
  | "CRM_CONTACT_NOT_FOUND"
  | "CRM_FILE_NOT_FOUND"
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
export const contactLogsCreate = {
  id: "crm.contact_logs.create",
  method: "POST",
  path: "/v1/contact-logs",
  parameters: [
    { member: "outlet_id", name: "outlet_id", in: "query", required: false, encoding: "scalar" },
  ],
  success: { status: 201, body: "json", required: ["id", "status"] },
  body: "required",
  idempotency: "keyed",
  authentication: "required",
  organizationKeys: true,
  errors: [
    "BAD_REQUEST",
    "CLIENT_UPGRADE_REQUIRED",
    "CONFLICT",
    "CRM_CONTACT_LOG_NOT_FOUND",
    "CRM_CONTACT_NOT_FOUND",
    "CRM_FILE_NOT_FOUND",
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
  "~types": undefined as unknown as { readonly input: ContactLogsCreateInput; readonly output: ContactLogsCreateOutput },
} as const satisfies Operation<ContactLogsCreateInput, ContactLogsCreateOutput, ContactLogsCreateErrorCode>;

export type ContactLogsListInput = {
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
   * Filter is the client-supplied filter group. Query and form parameters
   * use unpadded base64url-encoded JSON; JSON bodies use an object.
   */
  filter?: T.Group | null;
  /**
   * Contact whose notes to list.
   */
  contact_id: string;
  /**
   * Case-insensitive substring of note content.
   */
  q?: string;
  /**
   * Outlet the request acts in. It must be an outlet the credential may use; omit it to use every such outlet.
   */
  outlet_id?: string;
};
export type ContactLogsListOutput = T.FetchContactLogsOutputEnvelope;
export type ContactLogsListErrorCode = 
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
export const contactLogsList = {
  id: "crm.contact_logs.list",
  method: "GET",
  path: "/v1/contact-logs",
  parameters: [
    { member: "page", name: "page", in: "query", required: false, encoding: "scalar" },
    { member: "limit", name: "limit", in: "query", required: false, encoding: "scalar" },
    { member: "after", name: "after", in: "query", required: false, encoding: "scalar" },
    { member: "before", name: "before", in: "query", required: false, encoding: "scalar" },
    { member: "total", name: "total", in: "query", required: false, encoding: "scalar" },
    { member: "sort", name: "sort", in: "query", required: false, encoding: "scalar" },
    { member: "filter", name: "filter", in: "query", required: false, encoding: "base64url-json" },
    { member: "contact_id", name: "contact_id", in: "query", required: true, encoding: "scalar" },
    { member: "q", name: "q", in: "query", required: false, encoding: "scalar" },
    { member: "outlet_id", name: "outlet_id", in: "query", required: false, encoding: "scalar" },
  ],
  success: { status: 200, body: "json", required: ["contact_logs", "status"] },
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
    resultField: "contact_logs",
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
  "~types": undefined as unknown as { readonly input: ContactLogsListInput; readonly output: ContactLogsListOutput },
} as const satisfies Operation<ContactLogsListInput, ContactLogsListOutput, ContactLogsListErrorCode>;

export type ContactTagsAssignInput = {
  /**
   * Contact to receive the tag.
   */
  contact_id: string;
  /**
   * Organization tag to assign.
   */
  tag_id: string;
  /**
   * Outlet the request acts in. It must be an outlet the credential may use; omit it to use every such outlet.
   */
  outlet_id?: string;
};
export type ContactTagsAssignOutput = void;
export type ContactTagsAssignErrorCode = 
  | "BAD_REQUEST"
  | "CLIENT_UPGRADE_REQUIRED"
  | "CONFLICT"
  | "CRM_CONTACT_NOT_FOUND"
  | "CRM_CONTACT_TAG_NOT_FOUND"
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
  | "VALIDATION_FAILED";
export const contactTagsAssign = {
  id: "crm.contact_tags.assign",
  method: "PUT",
  path: "/v1/contacts/{contact_id}/tags/{tag_id}",
  parameters: [
    { member: "contact_id", name: "contact_id", in: "path", required: true, encoding: "scalar" },
    { member: "tag_id", name: "tag_id", in: "path", required: true, encoding: "scalar" },
    { member: "outlet_id", name: "outlet_id", in: "query", required: false, encoding: "scalar" },
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
    "CRM_CONTACT_NOT_FOUND",
    "CRM_CONTACT_TAG_NOT_FOUND",
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
  ],
  "~types": undefined as unknown as { readonly input: ContactTagsAssignInput; readonly output: ContactTagsAssignOutput },
} as const satisfies Operation<ContactTagsAssignInput, ContactTagsAssignOutput, ContactTagsAssignErrorCode>;

export type ContactTagsListInput = {
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
   * Free-text search query matched against searchable fields.
   */
  q?: string;
  /**
   * Comma-separated sort fields, e.g. "name" or "-create_at,name". Each field
   * sorts ascending unless prefixed with "-" for descending.
   */
  sort?: string;
  /**
   * Filter is the client-supplied filter group. Query and form parameters
   * use unpadded base64url-encoded JSON; JSON bodies use an object.
   */
  filter?: T.Group | null;
};
export type ContactTagsListOutput = T.FetchContactTagsOutputEnvelope;
export type ContactTagsListErrorCode = 
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
export const contactTagsList = {
  id: "crm.contact_tags.list",
  method: "GET",
  path: "/v1/contact-tags",
  parameters: [
    { member: "page", name: "page", in: "query", required: false, encoding: "scalar" },
    { member: "limit", name: "limit", in: "query", required: false, encoding: "scalar" },
    { member: "after", name: "after", in: "query", required: false, encoding: "scalar" },
    { member: "before", name: "before", in: "query", required: false, encoding: "scalar" },
    { member: "total", name: "total", in: "query", required: false, encoding: "scalar" },
    { member: "q", name: "q", in: "query", required: false, encoding: "scalar" },
    { member: "sort", name: "sort", in: "query", required: false, encoding: "scalar" },
    { member: "filter", name: "filter", in: "query", required: false, encoding: "base64url-json" },
  ],
  success: { status: 200, body: "json", required: ["status", "tags"] },
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
    resultField: "tags",
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
  "~types": undefined as unknown as { readonly input: ContactTagsListInput; readonly output: ContactTagsListOutput },
} as const satisfies Operation<ContactTagsListInput, ContactTagsListOutput, ContactTagsListErrorCode>;

export type ContactTagsRemoveInput = {
  /**
   * Contact whose membership to remove.
   */
  contact_id: string;
  /**
   * Organization tag to remove.
   */
  tag_id: string;
  /**
   * Outlet the request acts in. It must be an outlet the credential may use; omit it to use every such outlet.
   */
  outlet_id?: string;
};
export type ContactTagsRemoveOutput = void;
export type ContactTagsRemoveErrorCode = 
  | "BAD_REQUEST"
  | "CLIENT_UPGRADE_REQUIRED"
  | "CONFLICT"
  | "CRM_CONTACT_NOT_FOUND"
  | "CRM_CONTACT_TAG_NOT_FOUND"
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
  | "VALIDATION_FAILED";
export const contactTagsRemove = {
  id: "crm.contact_tags.remove",
  method: "DELETE",
  path: "/v1/contacts/{contact_id}/tags/{tag_id}",
  parameters: [
    { member: "contact_id", name: "contact_id", in: "path", required: true, encoding: "scalar" },
    { member: "tag_id", name: "tag_id", in: "path", required: true, encoding: "scalar" },
    { member: "outlet_id", name: "outlet_id", in: "query", required: false, encoding: "scalar" },
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
    "CRM_CONTACT_NOT_FOUND",
    "CRM_CONTACT_TAG_NOT_FOUND",
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
  ],
  "~types": undefined as unknown as { readonly input: ContactTagsRemoveInput; readonly output: ContactTagsRemoveOutput },
} as const satisfies Operation<ContactTagsRemoveInput, ContactTagsRemoveOutput, ContactTagsRemoveErrorCode>;

export type ContactsCreateInput = {
  /**
   * Outlet the request acts in. It must be an outlet the credential may use; omit it to use every such outlet.
   */
  outlet_id?: string;
} & T.CreateContactInput;
export type ContactsCreateOutput = T.KeyedAcknowledgmentEnvelope;
export type ContactsCreateErrorCode = 
  | "BAD_REQUEST"
  | "CLIENT_UPGRADE_REQUIRED"
  | "CONFLICT"
  | "CRM_CONTACT_EMAIL_OCCUPIED"
  | "CRM_CONTACT_MASTER_OUTLET_MISSING"
  | "CRM_CONTACT_NOT_FOUND"
  | "CRM_CONTACT_OUTLET_REQUIRED"
  | "CRM_CONTACT_PHONE_OCCUPIED"
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
export const contactsCreate = {
  id: "crm.contacts.create",
  method: "POST",
  path: "/v1/contacts",
  parameters: [
    { member: "outlet_id", name: "outlet_id", in: "query", required: false, encoding: "scalar" },
  ],
  success: { status: 201, body: "json", required: ["id", "status"] },
  body: "required",
  idempotency: "keyed",
  authentication: "required",
  organizationKeys: true,
  errors: [
    "BAD_REQUEST",
    "CLIENT_UPGRADE_REQUIRED",
    "CONFLICT",
    "CRM_CONTACT_EMAIL_OCCUPIED",
    "CRM_CONTACT_MASTER_OUTLET_MISSING",
    "CRM_CONTACT_NOT_FOUND",
    "CRM_CONTACT_OUTLET_REQUIRED",
    "CRM_CONTACT_PHONE_OCCUPIED",
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
  "~types": undefined as unknown as { readonly input: ContactsCreateInput; readonly output: ContactsCreateOutput },
} as const satisfies Operation<ContactsCreateInput, ContactsCreateOutput, ContactsCreateErrorCode>;

export type ContactsGetInput = {
  /**
   * Contact identifier.
   */
  id: string;
  /**
   * Include the contact's primary phone.
   */
  with_phones?: boolean;
  /**
   * Include the contact's primary email.
   */
  with_emails?: boolean;
  /**
   * Include the contact's tags and assignment details.
   */
  with_tags?: boolean;
  /**
   * Include the contact's attributes.
   */
  with_attributes?: boolean;
  /**
   * Outlet the request acts in. It must be an outlet the credential may use; omit it to use every such outlet.
   */
  outlet_id?: string;
};
export type ContactsGetOutput = T.FetchContactByIDOutputEnvelope;
export type ContactsGetErrorCode = 
  | "BAD_REQUEST"
  | "CLIENT_UPGRADE_REQUIRED"
  | "CRM_CONTACT_EXPANSION_LIMIT"
  | "CRM_CONTACT_NOT_FOUND"
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
  | "VALIDATION_FAILED";
export const contactsGet = {
  id: "crm.contacts.get",
  method: "GET",
  path: "/v1/contacts/{id}",
  parameters: [
    { member: "id", name: "id", in: "path", required: true, encoding: "scalar" },
    { member: "with_phones", name: "with_phones", in: "query", required: false, encoding: "scalar" },
    { member: "with_emails", name: "with_emails", in: "query", required: false, encoding: "scalar" },
    { member: "with_tags", name: "with_tags", in: "query", required: false, encoding: "scalar" },
    { member: "with_attributes", name: "with_attributes", in: "query", required: false, encoding: "scalar" },
    { member: "outlet_id", name: "outlet_id", in: "query", required: false, encoding: "scalar" },
  ],
  success: { status: 200, body: "json", required: ["contact", "status"] },
  body: "none",
  idempotency: "safe",
  authentication: "required",
  organizationKeys: true,
  errors: [
    "BAD_REQUEST",
    "CLIENT_UPGRADE_REQUIRED",
    "CRM_CONTACT_EXPANSION_LIMIT",
    "CRM_CONTACT_NOT_FOUND",
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
  ],
  "~types": undefined as unknown as { readonly input: ContactsGetInput; readonly output: ContactsGetOutput },
} as const satisfies Operation<ContactsGetInput, ContactsGetOutput, ContactsGetErrorCode>;

export type ContactsListInput = {
  /**
   * Include only these contact identifiers.
   */
  id?: string[] | null;
  /**
   * Exclude these contact identifiers.
   */
  exclude_id?: string[] | null;
  /**
   * Filter by contact kind.
   */
  kind?: T.ContactKindRequest;
  /**
   * Filter by whether the contact is linked to a verified account.
   */
  is_verified?: boolean | null;
  /**
   * Match contacts whose name contains this text.
   */
  name?: string | null;
  /**
   * Match primary phone numbers containing this text.
   */
  phone?: string | null;
  /**
   * Match the normalized primary phone exactly.
   */
  phone_exact?: string | null;
  /**
   * Filter by whether a contact has any phone records.
   */
  has_phone?: boolean | null;
  /**
   * Match primary email addresses containing this text.
   */
  email?: string | null;
  /**
   * Match contacts assigned one or more of these tag identifiers.
   */
  tag_id?: string[] | null;
  /**
   * Combine tag identifiers with OR or AND.
   */
  tag_id_conjunction?: T.Conjunction | null;
  /**
   * Free-text search query matched against searchable fields.
   */
  q?: string;
  /**
   * Comma-separated sort fields, e.g. "name" or "-create_at,name". Each field
   * sorts ascending unless prefixed with "-" for descending.
   */
  sort?: string;
  /**
   * Filter is the client-supplied filter group. Query and form parameters
   * use unpadded base64url-encoded JSON; JSON bodies use an object.
   */
  filter?: T.Group | null;
  /**
   * Include contacts created at or after this instant.
   */
  start_at?: string;
  /**
   * Include contacts created at or before this instant.
   */
  end_at?: string;
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
   * Include each contact's primary phone.
   */
  with_phones?: boolean;
  /**
   * Include each contact's primary email.
   */
  with_emails?: boolean;
  /**
   * Include each contact's tags and assignment details.
   */
  with_tags?: boolean;
  /**
   * Include each contact's attributes.
   */
  with_attributes?: boolean;
  /**
   * Outlet the request acts in. It must be an outlet the credential may use; omit it to use every such outlet.
   */
  outlet_id?: string;
};
export type ContactsListOutput = T.FetchContactsOutputEnvelope;
export type ContactsListErrorCode = 
  | "BAD_REQUEST"
  | "CLIENT_UPGRADE_REQUIRED"
  | "CRM_CONTACT_EXPANSION_LIMIT"
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
export const contactsList = {
  id: "crm.contacts.list",
  method: "GET",
  path: "/v1/contacts",
  parameters: [
    { member: "id", name: "id", in: "query", required: false, encoding: "repeated" },
    { member: "exclude_id", name: "exclude_id", in: "query", required: false, encoding: "repeated" },
    { member: "kind", name: "kind", in: "query", required: false, encoding: "scalar" },
    { member: "is_verified", name: "is_verified", in: "query", required: false, encoding: "scalar" },
    { member: "name", name: "name", in: "query", required: false, encoding: "scalar" },
    { member: "phone", name: "phone", in: "query", required: false, encoding: "scalar" },
    { member: "phone_exact", name: "phone_exact", in: "query", required: false, encoding: "scalar" },
    { member: "has_phone", name: "has_phone", in: "query", required: false, encoding: "scalar" },
    { member: "email", name: "email", in: "query", required: false, encoding: "scalar" },
    { member: "tag_id", name: "tag_id", in: "query", required: false, encoding: "repeated" },
    { member: "tag_id_conjunction", name: "tag_id_conjunction", in: "query", required: false, encoding: "scalar" },
    { member: "q", name: "q", in: "query", required: false, encoding: "scalar" },
    { member: "sort", name: "sort", in: "query", required: false, encoding: "scalar" },
    { member: "filter", name: "filter", in: "query", required: false, encoding: "base64url-json" },
    { member: "start_at", name: "start_at", in: "query", required: false, encoding: "scalar" },
    { member: "end_at", name: "end_at", in: "query", required: false, encoding: "scalar" },
    { member: "page", name: "page", in: "query", required: false, encoding: "scalar" },
    { member: "limit", name: "limit", in: "query", required: false, encoding: "scalar" },
    { member: "after", name: "after", in: "query", required: false, encoding: "scalar" },
    { member: "before", name: "before", in: "query", required: false, encoding: "scalar" },
    { member: "total", name: "total", in: "query", required: false, encoding: "scalar" },
    { member: "with_phones", name: "with_phones", in: "query", required: false, encoding: "scalar" },
    { member: "with_emails", name: "with_emails", in: "query", required: false, encoding: "scalar" },
    { member: "with_tags", name: "with_tags", in: "query", required: false, encoding: "scalar" },
    { member: "with_attributes", name: "with_attributes", in: "query", required: false, encoding: "scalar" },
    { member: "outlet_id", name: "outlet_id", in: "query", required: false, encoding: "scalar" },
  ],
  success: { status: 200, body: "json", required: ["contacts", "status"] },
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
    resultField: "contacts",
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
    "CRM_CONTACT_EXPANSION_LIMIT",
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
  "~types": undefined as unknown as { readonly input: ContactsListInput; readonly output: ContactsListOutput },
} as const satisfies Operation<ContactsListInput, ContactsListOutput, ContactsListErrorCode>;

export type ContactsUpdateInput = {
  /**
   * Contact identifier.
   */
  id: string;
  /**
   * Outlet the request acts in. It must be an outlet the credential may use; omit it to use every such outlet.
   */
  outlet_id?: string;
} & T.PartialUpdateContactByIDInput;
export type ContactsUpdateOutput = void;
export type ContactsUpdateErrorCode = 
  | "BAD_REQUEST"
  | "CLIENT_UPGRADE_REQUIRED"
  | "CONFLICT"
  | "CRM_CONTACT_CHILD_KIND_MISMATCH"
  | "CRM_CONTACT_EMAIL_OCCUPIED"
  | "CRM_CONTACT_NOT_FOUND"
  | "CRM_CONTACT_PHONE_OCCUPIED"
  | "CRM_CONTACT_REFERRAL_CIRCULAR"
  | "CRM_CONTACT_REFERRER_NOT_ALLOWED"
  | "CRM_CONTACT_VERIFIED_IMMUTABLE"
  | "CRM_FILE_NOT_FOUND"
  | "CRM_RELATED_CONTACT_NOT_ALLOWED"
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
  | "VALIDATION_FAILED";
export const contactsUpdate = {
  id: "crm.contacts.update",
  method: "PATCH",
  path: "/v1/contacts/{id}",
  parameters: [
    { member: "id", name: "id", in: "path", required: true, encoding: "scalar" },
    { member: "outlet_id", name: "outlet_id", in: "query", required: false, encoding: "scalar" },
  ],
  success: { status: 204, body: "none", required: [] },
  body: "required",
  idempotency: "safe",
  authentication: "required",
  organizationKeys: true,
  errors: [
    "BAD_REQUEST",
    "CLIENT_UPGRADE_REQUIRED",
    "CONFLICT",
    "CRM_CONTACT_CHILD_KIND_MISMATCH",
    "CRM_CONTACT_EMAIL_OCCUPIED",
    "CRM_CONTACT_NOT_FOUND",
    "CRM_CONTACT_PHONE_OCCUPIED",
    "CRM_CONTACT_REFERRAL_CIRCULAR",
    "CRM_CONTACT_REFERRER_NOT_ALLOWED",
    "CRM_CONTACT_VERIFIED_IMMUTABLE",
    "CRM_FILE_NOT_FOUND",
    "CRM_RELATED_CONTACT_NOT_ALLOWED",
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
  ],
  "~types": undefined as unknown as { readonly input: ContactsUpdateInput; readonly output: ContactsUpdateOutput },
} as const satisfies Operation<ContactsUpdateInput, ContactsUpdateOutput, ContactsUpdateErrorCode>;

export type DealFieldsUpdateInput = {
  /**
   * Pass `if_match` as the revision at `/deal/revision` in the result of `crm.deals.get`, unchanged. A stale revision fails with `PRECONDITION_FAILED`: read again, reapply the change, and retry.
   */
  if_match: string;
  /**
   * Deal identifier.
   */
  id: string;
  /**
   * Outlet the request acts in. It must be an outlet the credential may use; omit it to use every such outlet.
   */
  outlet_id?: string;
} & T.UpdateDealFieldsInput;
export type DealFieldsUpdateOutput = T.DealRevisionOutputEnvelope;
export type DealFieldsUpdateErrorCode = 
  | "BAD_REQUEST"
  | "CLIENT_UPGRADE_REQUIRED"
  | "CONFLICT"
  | "CRM_SALES_PIPELINE_DEAL_NOT_FOUND"
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
  | "VALIDATION_FAILED";
export const dealFieldsUpdate = {
  id: "crm.deal_fields.update",
  method: "PATCH",
  path: "/v1/deals/{id}/fields",
  parameters: [
    { member: "if_match", name: "If-Match", in: "header", required: true, encoding: "scalar" },
    { member: "id", name: "id", in: "path", required: true, encoding: "scalar" },
    { member: "outlet_id", name: "outlet_id", in: "query", required: false, encoding: "scalar" },
  ],
  success: { status: 200, body: "json", required: ["revision", "status"] },
  body: "required",
  idempotency: "safe",
  authentication: "required",
  organizationKeys: true,
  ifMatch: { operation: "crm.deals.get", pointer: "/deal/revision" },
  errors: [
    "BAD_REQUEST",
    "CLIENT_UPGRADE_REQUIRED",
    "CONFLICT",
    "CRM_SALES_PIPELINE_DEAL_NOT_FOUND",
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
    "VALIDATION_FAILED",
  ],
  "~types": undefined as unknown as { readonly input: DealFieldsUpdateInput; readonly output: DealFieldsUpdateOutput },
} as const satisfies Operation<DealFieldsUpdateInput, DealFieldsUpdateOutput, DealFieldsUpdateErrorCode>;

export type DealsCreateInput = {
  /**
   * Outlet the request acts in. It must be an outlet the credential may use; omit it to use every such outlet.
   */
  outlet_id?: string;
} & T.CreateSalesPipelineDealInput;
export type DealsCreateOutput = T.KeyedAcknowledgmentEnvelope;
export type DealsCreateErrorCode = 
  | "BAD_REQUEST"
  | "CLIENT_UPGRADE_REQUIRED"
  | "CONFLICT"
  | "CRM_DEAL_OUTLET_REQUIRED"
  | "CRM_SALES_PIPELINE_DEAL_NOT_FOUND"
  | "CRM_SALES_PIPELINE_NOT_FOUND"
  | "CRM_SALES_PIPELINE_STAGE_NOT_FOUND"
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
export const dealsCreate = {
  id: "crm.deals.create",
  method: "POST",
  path: "/v1/deals",
  parameters: [
    { member: "outlet_id", name: "outlet_id", in: "query", required: false, encoding: "scalar" },
  ],
  success: { status: 201, body: "json", required: ["id", "status"] },
  body: "required",
  idempotency: "keyed",
  authentication: "required",
  organizationKeys: true,
  errors: [
    "BAD_REQUEST",
    "CLIENT_UPGRADE_REQUIRED",
    "CONFLICT",
    "CRM_DEAL_OUTLET_REQUIRED",
    "CRM_SALES_PIPELINE_DEAL_NOT_FOUND",
    "CRM_SALES_PIPELINE_NOT_FOUND",
    "CRM_SALES_PIPELINE_STAGE_NOT_FOUND",
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
  "~types": undefined as unknown as { readonly input: DealsCreateInput; readonly output: DealsCreateOutput },
} as const satisfies Operation<DealsCreateInput, DealsCreateOutput, DealsCreateErrorCode>;

export type DealsGetInput = {
  /**
   * Deal identifier.
   */
  id: string;
  /**
   * Outlet the request acts in. It must be an outlet the credential may use; omit it to use every such outlet.
   */
  outlet_id?: string;
};
export type DealsGetOutput = T.GetDealOutputEnvelope;
export type DealsGetErrorCode = 
  | "BAD_REQUEST"
  | "CLIENT_UPGRADE_REQUIRED"
  | "CRM_SALES_PIPELINE_DEAL_NOT_FOUND"
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
  | "VALIDATION_FAILED";
export const dealsGet = {
  id: "crm.deals.get",
  method: "GET",
  path: "/v1/deals/{id}",
  parameters: [
    { member: "id", name: "id", in: "path", required: true, encoding: "scalar" },
    { member: "outlet_id", name: "outlet_id", in: "query", required: false, encoding: "scalar" },
  ],
  success: { status: 200, body: "json", required: ["deal", "status"] },
  body: "none",
  idempotency: "safe",
  authentication: "required",
  organizationKeys: true,
  errors: [
    "BAD_REQUEST",
    "CLIENT_UPGRADE_REQUIRED",
    "CRM_SALES_PIPELINE_DEAL_NOT_FOUND",
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
  ],
  "~types": undefined as unknown as { readonly input: DealsGetInput; readonly output: DealsGetOutput },
} as const satisfies Operation<DealsGetInput, DealsGetOutput, DealsGetErrorCode>;

export type DealsListInput = {
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
   * Filter is the client-supplied filter group. Query and form parameters
   * use unpadded base64url-encoded JSON; JSON bodies use an object.
   */
  filter?: T.Group | null;
  /**
   * List deals in this pipeline. Supply at most once.
   */
  pipeline_id?: string | null;
  /**
   * List deals in this stage. Supply at most once.
   */
  stage_id?: string | null;
  /**
   * Case-insensitive substring of the deal, visible pipeline, or visible stage name.
   */
  q?: string;
  /**
   * Outlet the request acts in. It must be an outlet the credential may use; omit it to use every such outlet.
   */
  outlet_id?: string;
};
export type DealsListOutput = T.ListDealsOutputEnvelope;
export type DealsListErrorCode = 
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
export const dealsList = {
  id: "crm.deals.list",
  method: "GET",
  path: "/v1/deals",
  parameters: [
    { member: "page", name: "page", in: "query", required: false, encoding: "scalar" },
    { member: "limit", name: "limit", in: "query", required: false, encoding: "scalar" },
    { member: "after", name: "after", in: "query", required: false, encoding: "scalar" },
    { member: "before", name: "before", in: "query", required: false, encoding: "scalar" },
    { member: "total", name: "total", in: "query", required: false, encoding: "scalar" },
    { member: "sort", name: "sort", in: "query", required: false, encoding: "scalar" },
    { member: "filter", name: "filter", in: "query", required: false, encoding: "base64url-json" },
    { member: "pipeline_id", name: "pipeline_id", in: "query", required: false, encoding: "scalar" },
    { member: "stage_id", name: "stage_id", in: "query", required: false, encoding: "scalar" },
    { member: "q", name: "q", in: "query", required: false, encoding: "scalar" },
    { member: "outlet_id", name: "outlet_id", in: "query", required: false, encoding: "scalar" },
  ],
  success: { status: 200, body: "json", required: ["deals", "status"] },
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
    resultField: "deals",
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
  "~types": undefined as unknown as { readonly input: DealsListInput; readonly output: DealsListOutput },
} as const satisfies Operation<DealsListInput, DealsListOutput, DealsListErrorCode>;

export type DealsMoveStageInput = {
  /**
   * Pass `if_match` as the revision at `/deal/revision` in the result of `crm.deals.get`, unchanged. A stale revision fails with `PRECONDITION_FAILED`: read again, reapply the change, and retry.
   */
  if_match: string;
  /**
   * Deal identifier.
   */
  id: string;
  /**
   * Outlet the request acts in. It must be an outlet the credential may use; omit it to use every such outlet.
   */
  outlet_id?: string;
} & T.MoveDealStageInput;
export type DealsMoveStageOutput = T.DealRevisionOutputEnvelope;
export type DealsMoveStageErrorCode = 
  | "BAD_REQUEST"
  | "CLIENT_UPGRADE_REQUIRED"
  | "CONFLICT"
  | "CRM_SALES_PIPELINE_DEAL_NOT_FOUND"
  | "CRM_SALES_PIPELINE_NOT_FOUND"
  | "CRM_SALES_PIPELINE_STAGE_NOT_FOUND"
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
  | "VALIDATION_FAILED";
export const dealsMoveStage = {
  id: "crm.deals.move_stage",
  method: "PUT",
  path: "/v1/deals/{id}/stage",
  parameters: [
    { member: "if_match", name: "If-Match", in: "header", required: true, encoding: "scalar" },
    { member: "id", name: "id", in: "path", required: true, encoding: "scalar" },
    { member: "outlet_id", name: "outlet_id", in: "query", required: false, encoding: "scalar" },
  ],
  success: { status: 200, body: "json", required: ["revision", "status"] },
  body: "required",
  idempotency: "safe",
  authentication: "required",
  organizationKeys: true,
  ifMatch: { operation: "crm.deals.get", pointer: "/deal/revision" },
  errors: [
    "BAD_REQUEST",
    "CLIENT_UPGRADE_REQUIRED",
    "CONFLICT",
    "CRM_SALES_PIPELINE_DEAL_NOT_FOUND",
    "CRM_SALES_PIPELINE_NOT_FOUND",
    "CRM_SALES_PIPELINE_STAGE_NOT_FOUND",
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
    "VALIDATION_FAILED",
  ],
  "~types": undefined as unknown as { readonly input: DealsMoveStageInput; readonly output: DealsMoveStageOutput },
} as const satisfies Operation<DealsMoveStageInput, DealsMoveStageOutput, DealsMoveStageErrorCode>;

export type DealsUpdateInput = {
  /**
   * Pass `if_match` as the revision at `/deal/revision` in the result of `crm.deals.get`, unchanged. A stale revision fails with `PRECONDITION_FAILED`: read again, reapply the change, and retry.
   */
  if_match: string;
  /**
   * Deal identifier.
   */
  id: string;
  /**
   * Outlet the request acts in. It must be an outlet the credential may use; omit it to use every such outlet.
   */
  outlet_id?: string;
} & T.UpdateDealInput;
export type DealsUpdateOutput = T.DealRevisionOutputEnvelope;
export type DealsUpdateErrorCode = 
  | "BAD_REQUEST"
  | "CLIENT_UPGRADE_REQUIRED"
  | "CONFLICT"
  | "CRM_SALES_PIPELINE_DEAL_NOT_FOUND"
  | "CRM_SALES_PIPELINE_NOT_FOUND"
  | "CRM_SALES_PIPELINE_STAGE_NOT_FOUND"
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
  | "VALIDATION_FAILED";
export const dealsUpdate = {
  id: "crm.deals.update",
  method: "PATCH",
  path: "/v1/deals/{id}",
  parameters: [
    { member: "if_match", name: "If-Match", in: "header", required: true, encoding: "scalar" },
    { member: "id", name: "id", in: "path", required: true, encoding: "scalar" },
    { member: "outlet_id", name: "outlet_id", in: "query", required: false, encoding: "scalar" },
  ],
  success: { status: 200, body: "json", required: ["revision", "status"] },
  body: "required",
  idempotency: "safe",
  authentication: "required",
  organizationKeys: true,
  ifMatch: { operation: "crm.deals.get", pointer: "/deal/revision" },
  errors: [
    "BAD_REQUEST",
    "CLIENT_UPGRADE_REQUIRED",
    "CONFLICT",
    "CRM_SALES_PIPELINE_DEAL_NOT_FOUND",
    "CRM_SALES_PIPELINE_NOT_FOUND",
    "CRM_SALES_PIPELINE_STAGE_NOT_FOUND",
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
    "VALIDATION_FAILED",
  ],
  "~types": undefined as unknown as { readonly input: DealsUpdateInput; readonly output: DealsUpdateOutput },
} as const satisfies Operation<DealsUpdateInput, DealsUpdateOutput, DealsUpdateErrorCode>;

export type SalesPipelinesListInput = {
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
   * Filter is the client-supplied filter group. Query and form parameters
   * use unpadded base64url-encoded JSON; JSON bodies use an object.
   */
  filter?: T.Group | null;
  /**
   * Case-insensitive substring of the pipeline name.
   */
  q?: string;
  /**
   * Include up to 50 stages per pipeline.
   */
  with_stages?: boolean;
};
export type SalesPipelinesListOutput = T.ListPipelinesOutputEnvelope;
export type SalesPipelinesListErrorCode = 
  | "BAD_REQUEST"
  | "CLIENT_UPGRADE_REQUIRED"
  | "CRM_SALES_PIPELINE_STAGE_LIMIT"
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
export const salesPipelinesList = {
  id: "crm.sales_pipelines.list",
  method: "GET",
  path: "/v1/sales-pipelines",
  parameters: [
    { member: "page", name: "page", in: "query", required: false, encoding: "scalar" },
    { member: "limit", name: "limit", in: "query", required: false, encoding: "scalar" },
    { member: "after", name: "after", in: "query", required: false, encoding: "scalar" },
    { member: "before", name: "before", in: "query", required: false, encoding: "scalar" },
    { member: "total", name: "total", in: "query", required: false, encoding: "scalar" },
    { member: "sort", name: "sort", in: "query", required: false, encoding: "scalar" },
    { member: "filter", name: "filter", in: "query", required: false, encoding: "base64url-json" },
    { member: "q", name: "q", in: "query", required: false, encoding: "scalar" },
    { member: "with_stages", name: "with_stages", in: "query", required: false, encoding: "scalar" },
  ],
  success: { status: 200, body: "json", required: ["sales_pipelines", "status"] },
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
    resultField: "sales_pipelines",
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
    "CRM_SALES_PIPELINE_STAGE_LIMIT",
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
  "~types": undefined as unknown as { readonly input: SalesPipelinesListInput; readonly output: SalesPipelinesListOutput },
} as const satisfies Operation<SalesPipelinesListInput, SalesPipelinesListOutput, SalesPipelinesListErrorCode>;
