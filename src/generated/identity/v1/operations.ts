// Generated from the GatherDeal public API contracts. Do not edit.

import type { Operation } from "../../operation.js";
import type * as T from "./types.js";

export type OutletsGetInput = {
  /**
   * UUID of the outlet to fetch. To find an outlet by its code, list
   * outlets with the exact code selector.
   */
  id: string;
  /**
   * When true, include a lightweight owner object (id, name, profile image).
   */
  with_owner?: boolean;
  /**
   * When true, include a lightweight organization object (id, code, name, logo).
   */
  with_organization?: boolean;
  /**
   * Outlet the request acts in. It must be an outlet the credential may use; omit it to use every such outlet.
   */
  outlet_id?: string;
};
export type OutletsGetOutput = T.FetchOutletByIDOutputEnvelope;
export type OutletsGetErrorCode = 
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
  | "IDENTITY_DISTRIBUTION_NOT_FOUND"
  | "IDENTITY_ORGANIZATION_NOT_FOUND"
  | "IDENTITY_OUTLET_MEMBERSHIP_REQUIRED"
  | "IDENTITY_OUTLET_NOT_FOUND"
  | "INTERNAL_ERROR"
  | "UNAUTHORIZED"
  | "VALIDATION_FAILED";
export const outletsGet = {
  id: "identity.outlets.get",
  method: "GET",
  path: "/v1/outlets/{id}",
  parameters: [
    { member: "id", name: "id", in: "path", required: true, encoding: "scalar" },
    { member: "with_owner", name: "with_owner", in: "query", required: false, encoding: "scalar" },
    { member: "with_organization", name: "with_organization", in: "query", required: false, encoding: "scalar" },
    { member: "outlet_id", name: "outlet_id", in: "query", required: false, encoding: "scalar" },
  ],
  success: { status: 200, body: "json", required: ["outlet", "status"] },
  body: "none",
  idempotency: "safe",
  authentication: "optional",
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
    "IDENTITY_DISTRIBUTION_NOT_FOUND",
    "IDENTITY_ORGANIZATION_NOT_FOUND",
    "IDENTITY_OUTLET_MEMBERSHIP_REQUIRED",
    "IDENTITY_OUTLET_NOT_FOUND",
    "INTERNAL_ERROR",
    "UNAUTHORIZED",
    "VALIDATION_FAILED",
  ],
  "~types": undefined as unknown as { readonly input: OutletsGetInput; readonly output: OutletsGetOutput },
} as const satisfies Operation<OutletsGetInput, OutletsGetOutput, OutletsGetErrorCode>;

export type OutletsListInput = {
  /**
   * UUID of the organization whose outlets to list. Anonymous callers need it,
   * or an id or code selector, to receive rows; authenticated callers only
   * ever see outlets of their own organization.
   */
  organization_id?: string;
  /**
   * Filter by one or more outlet UUIDs.
   */
  id?: string[] | null;
  /**
   * Case-insensitive substring of the outlet name.
   */
  name?: string;
  /**
   * Exact outlet codes; repeat the parameter to match any of several.
   */
  code?: string[] | null;
  /**
   * Return only master (true) or only non-master (false) outlets. Omit for both.
   */
  is_master?: boolean | null;
  /**
   * When true, include a lightweight owner object (id, name, profile image) in each outlet.
   */
  with_owner?: boolean;
  /**
   * When true, include a lightweight organization object (id, code, name, logo) in each outlet.
   */
  with_organization?: boolean;
  /**
   * Case-insensitive substring of the outlet name.
   */
  q?: string;
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
   * Outlet the request acts in. It must be an outlet the credential may use; omit it to use every such outlet.
   */
  outlet_id?: string;
};
export type OutletsListOutput = T.FetchOutletsOutputEnvelope;
export type OutletsListErrorCode = 
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
  | "IDENTITY_DISTRIBUTION_NOT_FOUND"
  | "IDENTITY_ORGANIZATION_NOT_FOUND"
  | "IDENTITY_OUTLET_MEMBERSHIP_REQUIRED"
  | "INTERNAL_ERROR"
  | "PAGINATION_CURSOR_INVALID"
  | "PAGINATION_PARAMS_INVALID"
  | "UNAUTHORIZED"
  | "VALIDATION_FAILED";
export const outletsList = {
  id: "identity.outlets.list",
  method: "GET",
  path: "/v1/outlets",
  parameters: [
    { member: "organization_id", name: "organization_id", in: "query", required: false, encoding: "scalar" },
    { member: "id", name: "id", in: "query", required: false, encoding: "repeated" },
    { member: "name", name: "name", in: "query", required: false, encoding: "scalar" },
    { member: "code", name: "code", in: "query", required: false, encoding: "repeated" },
    { member: "is_master", name: "is_master", in: "query", required: false, encoding: "scalar" },
    { member: "with_owner", name: "with_owner", in: "query", required: false, encoding: "scalar" },
    { member: "with_organization", name: "with_organization", in: "query", required: false, encoding: "scalar" },
    { member: "q", name: "q", in: "query", required: false, encoding: "scalar" },
    { member: "page", name: "page", in: "query", required: false, encoding: "scalar" },
    { member: "limit", name: "limit", in: "query", required: false, encoding: "scalar" },
    { member: "after", name: "after", in: "query", required: false, encoding: "scalar" },
    { member: "before", name: "before", in: "query", required: false, encoding: "scalar" },
    { member: "total", name: "total", in: "query", required: false, encoding: "scalar" },
    { member: "sort", name: "sort", in: "query", required: false, encoding: "scalar" },
    { member: "filter", name: "filter", in: "query", required: false, encoding: "base64url-json" },
    { member: "outlet_id", name: "outlet_id", in: "query", required: false, encoding: "scalar" },
  ],
  success: { status: 200, body: "json", required: ["outlets", "status"] },
  body: "none",
  idempotency: "safe",
  authentication: "optional",
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
    resultField: "outlets",
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
    "IDENTITY_DISTRIBUTION_NOT_FOUND",
    "IDENTITY_ORGANIZATION_NOT_FOUND",
    "IDENTITY_OUTLET_MEMBERSHIP_REQUIRED",
    "INTERNAL_ERROR",
    "PAGINATION_CURSOR_INVALID",
    "PAGINATION_PARAMS_INVALID",
    "UNAUTHORIZED",
    "VALIDATION_FAILED",
  ],
  "~types": undefined as unknown as { readonly input: OutletsListInput; readonly output: OutletsListOutput },
} as const satisfies Operation<OutletsListInput, OutletsListOutput, OutletsListErrorCode>;
