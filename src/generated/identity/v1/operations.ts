// Generated from the GatherDeal public API contracts. Do not edit.

import type { Operation } from "../../operation.js";
import type * as T from "./types.js";

export type OutletsListInput = {
  organization_id?: string;
  /**
   * Filter by one or more outlet UUIDs.
   */
  id?: string[];
  /**
   * Filter by outlet display name (partial match).
   */
  name?: string;
  /**
   * Filter by one or more outlet codes.
   */
  code?: string[];
  /**
   * Filter by master outlet status. Nil means no filter.
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
   * Free-text search query matched against searchable fields.
   */
  q?: string;
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
  | "IDENTITY_DISTRIBUTION_NOT_FOUND"
  | "IDENTITY_ORGANIZATION_NOT_FOUND"
  | "IDENTITY_OUTLET_MEMBERSHIP_REQUIRED"
  | "INTERNAL_ERROR"
  | "PAGINATION_CURSOR_INVALID"
  | "PAGINATION_PARAMS_INVALID"
  | "UNAUTHORIZED"
  | "VALIDATION_FAILED";
export const outletsList: Operation<OutletsListInput, OutletsListOutput, OutletsListErrorCode> = {
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
    { member: "p", name: "p", in: "query", required: false, encoding: "scalar" },
    { member: "count", name: "count", in: "query", required: false, encoding: "scalar" },
    { member: "after", name: "after", in: "query", required: false, encoding: "scalar" },
    { member: "before", name: "before", in: "query", required: false, encoding: "scalar" },
    { member: "total", name: "total", in: "query", required: false, encoding: "scalar" },
    { member: "s", name: "s", in: "query", required: false, encoding: "scalar" },
    { member: "o", name: "o", in: "query", required: false, encoding: "scalar" },
    { member: "filter", name: "filter", in: "query", required: false, encoding: "base64url-json" },
    { member: "outlet_id", name: "outlet_id", in: "query", required: false, encoding: "scalar" },
  ],
  success: { status: 200, body: "json", required: ["outlets", "status"] },
  body: "none",
  idempotency: "safe",
  authentication: "optional",
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
    "IDENTITY_DISTRIBUTION_NOT_FOUND",
    "IDENTITY_ORGANIZATION_NOT_FOUND",
    "IDENTITY_OUTLET_MEMBERSHIP_REQUIRED",
    "INTERNAL_ERROR",
    "PAGINATION_CURSOR_INVALID",
    "PAGINATION_PARAMS_INVALID",
    "UNAUTHORIZED",
    "VALIDATION_FAILED",
  ],
};
