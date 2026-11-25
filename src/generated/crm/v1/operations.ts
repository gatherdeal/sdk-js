// Generated from the GatherDeal public API contracts. Do not edit.

import type { APIPromise, ConditionalRequestOptions, DelegatedAccessErrorCode, KeyedRequestOptions, Operation, PagePromise, RequestOptions } from "../../operation.js";
import { delegatedAccessCodes } from "../../operation.js";
import type * as T from "./types.js";

export type ContactLogCreateParams = {
  /**
   * Outlet the request acts in. It must be an outlet the credential may use; omit it to use every such outlet.
   */
  outlet_id?: string;
} & T.CreateContactLogParam;
export type ContactLogCreateResponse = {
  /**
   * Identifier of the affected resource.
   */
  id: string;
};
export type ContactLogCreateErrorCode =
  | DelegatedAccessErrorCode
  | "BAD_REQUEST"
  | "CLIENT_UPGRADE_REQUIRED"
  | "CONFLICT"
  | "CRM_CONTACT_LOG_NOT_FOUND"
  | "CRM_CONTACT_NOT_FOUND"
  | "CRM_FILE_NOT_FOUND"
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
  body: "required",
  success: { status: 201, body: "json", required: ["id", "status"] },
  result: { kind: "object" },
  idempotency: "keyed",
  authentication: "required",
  organizationKeys: true,
  errors: [
    ...delegatedAccessCodes,
    "BAD_REQUEST",
    "CLIENT_UPGRADE_REQUIRED",
    "CONFLICT",
    "CRM_CONTACT_LOG_NOT_FOUND",
    "CRM_CONTACT_NOT_FOUND",
    "CRM_FILE_NOT_FOUND",
    "FORBIDDEN",
    "IDEMPOTENCY_KEY_CONFLICT",
    "IDEMPOTENCY_KEY_REQUIRED",
    "INTERNAL_ERROR",
    "UNAUTHORIZED",
    "VALIDATION_FAILED",
  ],
  "~types": undefined as unknown as { readonly args: [params: ContactLogCreateParams, options?: KeyedRequestOptions]; readonly result: APIPromise<ContactLogCreateResponse> },
} as const satisfies Operation<[params: ContactLogCreateParams, options?: KeyedRequestOptions], APIPromise<ContactLogCreateResponse>, ContactLogCreateErrorCode>;

export type ContactLogListParams = {
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
export type ContactLogListErrorCode =
  | DelegatedAccessErrorCode
  | "BAD_REQUEST"
  | "CLIENT_UPGRADE_REQUIRED"
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
  body: "none",
  success: { status: 200, body: "json", required: ["contact_logs", "status"] },
  result: { kind: "page", key: "contact_logs", pagination: {
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
  "~types": undefined as unknown as { readonly args: [params: ContactLogListParams, options?: RequestOptions]; readonly result: PagePromise<T.ContactLog> },
} as const satisfies Operation<[params: ContactLogListParams, options?: RequestOptions], PagePromise<T.ContactLog>, ContactLogListErrorCode>;

export type ContactTagAddParams = {
  /**
   * Contact to receive the tag.
   */
  contact_id: string;
  /**
   * Outlet the request acts in. It must be an outlet the credential may use; omit it to use every such outlet.
   */
  outlet_id?: string;
};
export type ContactTagAddErrorCode =
  | DelegatedAccessErrorCode
  | "BAD_REQUEST"
  | "CLIENT_UPGRADE_REQUIRED"
  | "CONFLICT"
  | "CRM_CONTACT_NOT_FOUND"
  | "CRM_CONTACT_TAG_NOT_FOUND"
  | "FORBIDDEN"
  | "INTERNAL_ERROR"
  | "UNAUTHORIZED"
  | "VALIDATION_FAILED";
export const contactTagsAdd = {
  id: "crm.contact_tags.add",
  method: "PUT",
  path: "/v1/contacts/{contact_id}/tags/{tag_id}",
  positional: "tag_id",
  parameters: [
    { member: "contact_id", name: "contact_id", in: "path", required: true, encoding: "scalar" },
    { member: "outlet_id", name: "outlet_id", in: "query", required: false, encoding: "scalar" },
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
    "CRM_CONTACT_NOT_FOUND",
    "CRM_CONTACT_TAG_NOT_FOUND",
    "FORBIDDEN",
    "INTERNAL_ERROR",
    "UNAUTHORIZED",
    "VALIDATION_FAILED",
  ],
  "~types": undefined as unknown as { readonly args: [tagId: string, params: ContactTagAddParams, options?: RequestOptions]; readonly result: APIPromise<void> },
} as const satisfies Operation<[tagId: string, params: ContactTagAddParams, options?: RequestOptions], APIPromise<void>, ContactTagAddErrorCode>;

export type ContactTagListParams = {
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
export type ContactTagListErrorCode =
  | DelegatedAccessErrorCode
  | "BAD_REQUEST"
  | "CLIENT_UPGRADE_REQUIRED"
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
  body: "none",
  success: { status: 200, body: "json", required: ["status", "tags"] },
  result: { kind: "page", key: "tags", pagination: {
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
  "~types": undefined as unknown as { readonly args: [params?: ContactTagListParams, options?: RequestOptions]; readonly result: PagePromise<T.ContactTag> },
} as const satisfies Operation<[params?: ContactTagListParams, options?: RequestOptions], PagePromise<T.ContactTag>, ContactTagListErrorCode>;

export type ContactTagRemoveParams = {
  /**
   * Contact whose membership to remove.
   */
  contact_id: string;
  /**
   * Outlet the request acts in. It must be an outlet the credential may use; omit it to use every such outlet.
   */
  outlet_id?: string;
};
export type ContactTagRemoveErrorCode =
  | DelegatedAccessErrorCode
  | "BAD_REQUEST"
  | "CLIENT_UPGRADE_REQUIRED"
  | "CONFLICT"
  | "CRM_CONTACT_NOT_FOUND"
  | "CRM_CONTACT_TAG_NOT_FOUND"
  | "FORBIDDEN"
  | "INTERNAL_ERROR"
  | "UNAUTHORIZED"
  | "VALIDATION_FAILED";
export const contactTagsRemove = {
  id: "crm.contact_tags.remove",
  method: "DELETE",
  path: "/v1/contacts/{contact_id}/tags/{tag_id}",
  positional: "tag_id",
  parameters: [
    { member: "contact_id", name: "contact_id", in: "path", required: true, encoding: "scalar" },
    { member: "outlet_id", name: "outlet_id", in: "query", required: false, encoding: "scalar" },
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
    "CRM_CONTACT_NOT_FOUND",
    "CRM_CONTACT_TAG_NOT_FOUND",
    "FORBIDDEN",
    "INTERNAL_ERROR",
    "UNAUTHORIZED",
    "VALIDATION_FAILED",
  ],
  "~types": undefined as unknown as { readonly args: [tagId: string, params: ContactTagRemoveParams, options?: RequestOptions]; readonly result: APIPromise<void> },
} as const satisfies Operation<[tagId: string, params: ContactTagRemoveParams, options?: RequestOptions], APIPromise<void>, ContactTagRemoveErrorCode>;

export type ContactCreateParams = {
  /**
   * Outlet the request acts in. It must be an outlet the credential may use; omit it to use every such outlet.
   */
  outlet_id?: string;
} & T.CreateContactParam;
export type ContactCreateResponse = {
  /**
   * Identifier of the affected resource.
   */
  id: string;
};
export type ContactCreateErrorCode =
  | DelegatedAccessErrorCode
  | "BAD_REQUEST"
  | "CLIENT_UPGRADE_REQUIRED"
  | "CONFLICT"
  | "CRM_CONTACT_EMAIL_OCCUPIED"
  | "CRM_CONTACT_MASTER_OUTLET_MISSING"
  | "CRM_CONTACT_NOT_FOUND"
  | "CRM_CONTACT_OUTLET_REQUIRED"
  | "CRM_CONTACT_PHONE_OCCUPIED"
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
  body: "required",
  success: { status: 201, body: "json", required: ["id", "status"] },
  result: { kind: "object" },
  idempotency: "keyed",
  authentication: "required",
  organizationKeys: true,
  errors: [
    ...delegatedAccessCodes,
    "BAD_REQUEST",
    "CLIENT_UPGRADE_REQUIRED",
    "CONFLICT",
    "CRM_CONTACT_EMAIL_OCCUPIED",
    "CRM_CONTACT_MASTER_OUTLET_MISSING",
    "CRM_CONTACT_NOT_FOUND",
    "CRM_CONTACT_OUTLET_REQUIRED",
    "CRM_CONTACT_PHONE_OCCUPIED",
    "FORBIDDEN",
    "IDEMPOTENCY_KEY_CONFLICT",
    "IDEMPOTENCY_KEY_REQUIRED",
    "INTERNAL_ERROR",
    "UNAUTHORIZED",
    "VALIDATION_FAILED",
  ],
  "~types": undefined as unknown as { readonly args: [params: ContactCreateParams, options?: KeyedRequestOptions]; readonly result: APIPromise<ContactCreateResponse> },
} as const satisfies Operation<[params: ContactCreateParams, options?: KeyedRequestOptions], APIPromise<ContactCreateResponse>, ContactCreateErrorCode>;

export type ContactGetParams = {
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
export type ContactGetErrorCode =
  | DelegatedAccessErrorCode
  | "BAD_REQUEST"
  | "CLIENT_UPGRADE_REQUIRED"
  | "CRM_CONTACT_EXPANSION_LIMIT"
  | "CRM_CONTACT_NOT_FOUND"
  | "FORBIDDEN"
  | "INTERNAL_ERROR"
  | "UNAUTHORIZED"
  | "VALIDATION_FAILED";
export const contactsGet = {
  id: "crm.contacts.get",
  method: "GET",
  path: "/v1/contacts/{id}",
  positional: "id",
  parameters: [
    { member: "with_phones", name: "with_phones", in: "query", required: false, encoding: "scalar" },
    { member: "with_emails", name: "with_emails", in: "query", required: false, encoding: "scalar" },
    { member: "with_tags", name: "with_tags", in: "query", required: false, encoding: "scalar" },
    { member: "with_attributes", name: "with_attributes", in: "query", required: false, encoding: "scalar" },
    { member: "outlet_id", name: "outlet_id", in: "query", required: false, encoding: "scalar" },
  ],
  body: "none",
  success: { status: 200, body: "json", required: ["contact", "status"] },
  result: { kind: "resource", key: "contact" },
  idempotency: "safe",
  authentication: "required",
  organizationKeys: true,
  errors: [
    ...delegatedAccessCodes,
    "BAD_REQUEST",
    "CLIENT_UPGRADE_REQUIRED",
    "CRM_CONTACT_EXPANSION_LIMIT",
    "CRM_CONTACT_NOT_FOUND",
    "FORBIDDEN",
    "INTERNAL_ERROR",
    "UNAUTHORIZED",
    "VALIDATION_FAILED",
  ],
  "~types": undefined as unknown as { readonly args: [id: string, params?: ContactGetParams, options?: RequestOptions]; readonly result: APIPromise<T.Contact> },
} as const satisfies Operation<[id: string, params?: ContactGetParams, options?: RequestOptions], APIPromise<T.Contact>, ContactGetErrorCode>;

export type ContactListParams = {
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
  kind?: T.ContactKindParam;
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
export type ContactListErrorCode =
  | DelegatedAccessErrorCode
  | "BAD_REQUEST"
  | "CLIENT_UPGRADE_REQUIRED"
  | "CRM_CONTACT_EXPANSION_LIMIT"
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
  body: "none",
  success: { status: 200, body: "json", required: ["contacts", "status"] },
  result: { kind: "page", key: "contacts", pagination: {
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
  } },
  idempotency: "safe",
  authentication: "required",
  organizationKeys: true,
  errors: [
    ...delegatedAccessCodes,
    "BAD_REQUEST",
    "CLIENT_UPGRADE_REQUIRED",
    "CRM_CONTACT_EXPANSION_LIMIT",
    "FORBIDDEN",
    "INTERNAL_ERROR",
    "PAGINATION_CURSOR_INVALID",
    "PAGINATION_PARAMS_INVALID",
    "UNAUTHORIZED",
    "VALIDATION_FAILED",
  ],
  "~types": undefined as unknown as { readonly args: [params?: ContactListParams, options?: RequestOptions]; readonly result: PagePromise<T.Contact> },
} as const satisfies Operation<[params?: ContactListParams, options?: RequestOptions], PagePromise<T.Contact>, ContactListErrorCode>;

export type ContactUpdateParams = {
  /**
   * Outlet the request acts in. It must be an outlet the credential may use; omit it to use every such outlet.
   */
  outlet_id?: string;
} & T.PartialUpdateContactByIDParam;
export type ContactUpdateErrorCode =
  | DelegatedAccessErrorCode
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
  | "FORBIDDEN"
  | "INTERNAL_ERROR"
  | "UNAUTHORIZED"
  | "VALIDATION_FAILED";
export const contactsUpdate = {
  id: "crm.contacts.update",
  method: "PATCH",
  path: "/v1/contacts/{id}",
  positional: "id",
  parameters: [
    { member: "outlet_id", name: "outlet_id", in: "query", required: false, encoding: "scalar" },
  ],
  body: "required",
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
    "CRM_CONTACT_CHILD_KIND_MISMATCH",
    "CRM_CONTACT_EMAIL_OCCUPIED",
    "CRM_CONTACT_NOT_FOUND",
    "CRM_CONTACT_PHONE_OCCUPIED",
    "CRM_CONTACT_REFERRAL_CIRCULAR",
    "CRM_CONTACT_REFERRER_NOT_ALLOWED",
    "CRM_CONTACT_VERIFIED_IMMUTABLE",
    "CRM_FILE_NOT_FOUND",
    "CRM_RELATED_CONTACT_NOT_ALLOWED",
    "FORBIDDEN",
    "INTERNAL_ERROR",
    "UNAUTHORIZED",
    "VALIDATION_FAILED",
  ],
  "~types": undefined as unknown as { readonly args: [id: string, params?: ContactUpdateParams, options?: RequestOptions]; readonly result: APIPromise<void> },
} as const satisfies Operation<[id: string, params?: ContactUpdateParams, options?: RequestOptions], APIPromise<void>, ContactUpdateErrorCode>;

export type DealCreateParams = {
  /**
   * Outlet the request acts in. It must be an outlet the credential may use; omit it to use every such outlet.
   */
  outlet_id?: string;
} & T.CreateSalesPipelineDealParam;
export type DealCreateResponse = {
  /**
   * Identifier of the affected resource.
   */
  id: string;
};
export type DealCreateErrorCode =
  | DelegatedAccessErrorCode
  | "BAD_REQUEST"
  | "CLIENT_UPGRADE_REQUIRED"
  | "CONFLICT"
  | "CRM_DEAL_OUTLET_REQUIRED"
  | "CRM_SALES_PIPELINE_DEAL_NOT_FOUND"
  | "CRM_SALES_PIPELINE_NOT_FOUND"
  | "CRM_SALES_PIPELINE_STAGE_NOT_FOUND"
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
  body: "required",
  success: { status: 201, body: "json", required: ["id", "status"] },
  result: { kind: "object" },
  idempotency: "keyed",
  authentication: "required",
  organizationKeys: true,
  errors: [
    ...delegatedAccessCodes,
    "BAD_REQUEST",
    "CLIENT_UPGRADE_REQUIRED",
    "CONFLICT",
    "CRM_DEAL_OUTLET_REQUIRED",
    "CRM_SALES_PIPELINE_DEAL_NOT_FOUND",
    "CRM_SALES_PIPELINE_NOT_FOUND",
    "CRM_SALES_PIPELINE_STAGE_NOT_FOUND",
    "FORBIDDEN",
    "IDEMPOTENCY_KEY_CONFLICT",
    "IDEMPOTENCY_KEY_REQUIRED",
    "INTERNAL_ERROR",
    "UNAUTHORIZED",
    "VALIDATION_FAILED",
  ],
  "~types": undefined as unknown as { readonly args: [params: DealCreateParams, options?: KeyedRequestOptions]; readonly result: APIPromise<DealCreateResponse> },
} as const satisfies Operation<[params: DealCreateParams, options?: KeyedRequestOptions], APIPromise<DealCreateResponse>, DealCreateErrorCode>;

export type DealGetParams = {
  /**
   * Outlet the request acts in. It must be an outlet the credential may use; omit it to use every such outlet.
   */
  outlet_id?: string;
};
export type DealGetErrorCode =
  | DelegatedAccessErrorCode
  | "BAD_REQUEST"
  | "CLIENT_UPGRADE_REQUIRED"
  | "CRM_SALES_PIPELINE_DEAL_NOT_FOUND"
  | "FORBIDDEN"
  | "INTERNAL_ERROR"
  | "UNAUTHORIZED"
  | "VALIDATION_FAILED";
export const dealsGet = {
  id: "crm.deals.get",
  method: "GET",
  path: "/v1/deals/{id}",
  positional: "id",
  parameters: [
    { member: "outlet_id", name: "outlet_id", in: "query", required: false, encoding: "scalar" },
  ],
  body: "none",
  success: { status: 200, body: "json", required: ["deal", "status"] },
  result: { kind: "resource", key: "deal" },
  idempotency: "safe",
  authentication: "required",
  organizationKeys: true,
  errors: [
    ...delegatedAccessCodes,
    "BAD_REQUEST",
    "CLIENT_UPGRADE_REQUIRED",
    "CRM_SALES_PIPELINE_DEAL_NOT_FOUND",
    "FORBIDDEN",
    "INTERNAL_ERROR",
    "UNAUTHORIZED",
    "VALIDATION_FAILED",
  ],
  "~types": undefined as unknown as { readonly args: [id: string, params?: DealGetParams, options?: RequestOptions]; readonly result: APIPromise<T.Deal> },
} as const satisfies Operation<[id: string, params?: DealGetParams, options?: RequestOptions], APIPromise<T.Deal>, DealGetErrorCode>;

export type DealListParams = {
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
export type DealListErrorCode =
  | DelegatedAccessErrorCode
  | "BAD_REQUEST"
  | "CLIENT_UPGRADE_REQUIRED"
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
  body: "none",
  success: { status: 200, body: "json", required: ["deals", "status"] },
  result: { kind: "page", key: "deals", pagination: {
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
  "~types": undefined as unknown as { readonly args: [params?: DealListParams, options?: RequestOptions]; readonly result: PagePromise<T.DealSummary> },
} as const satisfies Operation<[params?: DealListParams, options?: RequestOptions], PagePromise<T.DealSummary>, DealListErrorCode>;

export type DealUpdateParams = {
  /**
   * Outlet the request acts in. It must be an outlet the credential may use; omit it to use every such outlet.
   */
  outlet_id?: string;
} & T.UpdateDealParam;
export type DealUpdateResponse = {
  /**
   * The deal's revision after the request, for the next If-Match.
   */
  revision: string;
};
export type DealUpdateErrorCode =
  | DelegatedAccessErrorCode
  | "BAD_REQUEST"
  | "CLIENT_UPGRADE_REQUIRED"
  | "CONFLICT"
  | "CRM_SALES_PIPELINE_DEAL_NOT_FOUND"
  | "CRM_SALES_PIPELINE_NOT_FOUND"
  | "CRM_SALES_PIPELINE_STAGE_NOT_FOUND"
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
  positional: "id",
  parameters: [
    { member: "outlet_id", name: "outlet_id", in: "query", required: false, encoding: "scalar" },
  ],
  body: "required",
  success: { status: 200, body: "json", required: ["revision", "status"] },
  result: { kind: "object" },
  idempotency: "safe",
  conditional: { read: "crm.deals.get" },
  authentication: "required",
  organizationKeys: true,
  errors: [
    ...delegatedAccessCodes,
    "BAD_REQUEST",
    "CLIENT_UPGRADE_REQUIRED",
    "CONFLICT",
    "CRM_SALES_PIPELINE_DEAL_NOT_FOUND",
    "CRM_SALES_PIPELINE_NOT_FOUND",
    "CRM_SALES_PIPELINE_STAGE_NOT_FOUND",
    "FORBIDDEN",
    "INTERNAL_ERROR",
    "PRECONDITION_FAILED",
    "PRECONDITION_REQUIRED",
    "UNAUTHORIZED",
    "VALIDATION_FAILED",
  ],
  "~types": undefined as unknown as { readonly args: [id: string, params: DealUpdateParams | undefined, options: ConditionalRequestOptions]; readonly result: APIPromise<DealUpdateResponse> },
} as const satisfies Operation<[id: string, params: DealUpdateParams | undefined, options: ConditionalRequestOptions], APIPromise<DealUpdateResponse>, DealUpdateErrorCode>;

export type SalesPipelineListParams = {
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
export type SalesPipelineListErrorCode =
  | DelegatedAccessErrorCode
  | "BAD_REQUEST"
  | "CLIENT_UPGRADE_REQUIRED"
  | "CRM_SALES_PIPELINE_STAGE_LIMIT"
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
  body: "none",
  success: { status: 200, body: "json", required: ["sales_pipelines", "status"] },
  result: { kind: "page", key: "sales_pipelines", pagination: {
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
  } },
  idempotency: "safe",
  authentication: "required",
  organizationKeys: true,
  errors: [
    ...delegatedAccessCodes,
    "BAD_REQUEST",
    "CLIENT_UPGRADE_REQUIRED",
    "CRM_SALES_PIPELINE_STAGE_LIMIT",
    "FORBIDDEN",
    "INTERNAL_ERROR",
    "PAGINATION_CURSOR_INVALID",
    "PAGINATION_PARAMS_INVALID",
    "UNAUTHORIZED",
    "VALIDATION_FAILED",
  ],
  "~types": undefined as unknown as { readonly args: [params?: SalesPipelineListParams, options?: RequestOptions]; readonly result: PagePromise<T.SalesPipeline> },
} as const satisfies Operation<[params?: SalesPipelineListParams, options?: RequestOptions], PagePromise<T.SalesPipeline>, SalesPipelineListErrorCode>;
