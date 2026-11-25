// Generated from the GatherDeal public API contracts. Do not edit.

import type { ProblemInfo } from "../../operation.js";
import type * as T from "./types.js";

/** Every problem code the operations of this API version declare. */
export const problems = {
  BAD_REQUEST: { status: 400, retryable: false },
  CLIENT_UPGRADE_REQUIRED: { status: 426, retryable: false, details: { client: ["string"], current_version: ["string"], min_version: ["string"] } },
  CONFLICT: { status: 409, retryable: false },
  CRM_CONTACT_CHILD_KIND_MISMATCH: { status: 422, retryable: false },
  CRM_CONTACT_EMAIL_OCCUPIED: { status: 409, retryable: false },
  CRM_CONTACT_EXPANSION_LIMIT: { status: 422, retryable: false, details: { expansion: ["string"], limit: ["number"] } },
  CRM_CONTACT_LOG_NOT_FOUND: { status: 404, retryable: false },
  CRM_CONTACT_MASTER_OUTLET_MISSING: { status: 422, retryable: false },
  CRM_CONTACT_NOT_FOUND: { status: 404, retryable: false },
  CRM_CONTACT_OUTLET_REQUIRED: { status: 422, retryable: false },
  CRM_CONTACT_PHONE_OCCUPIED: { status: 409, retryable: false },
  CRM_CONTACT_REFERRAL_CIRCULAR: { status: 422, retryable: false },
  CRM_CONTACT_REFERRER_NOT_ALLOWED: { status: 422, retryable: false },
  CRM_CONTACT_TAG_NOT_FOUND: { status: 404, retryable: false },
  CRM_CONTACT_VERIFIED_IMMUTABLE: { status: 422, retryable: false },
  CRM_DEAL_OUTLET_REQUIRED: { status: 422, retryable: false },
  CRM_FILE_NOT_FOUND: { status: 404, retryable: false },
  CRM_RELATED_CONTACT_NOT_ALLOWED: { status: 403, retryable: false },
  CRM_SALES_PIPELINE_DEAL_NOT_FOUND: { status: 404, retryable: false },
  CRM_SALES_PIPELINE_NOT_FOUND: { status: 404, retryable: false },
  CRM_SALES_PIPELINE_STAGE_LIMIT: { status: 422, retryable: false, details: { expansion: ["string"], limit: ["number"] } },
  CRM_SALES_PIPELINE_STAGE_NOT_FOUND: { status: 404, retryable: false },
  DELEGATED_ACCESS_AUDIENCE_MISMATCH: { status: 403, retryable: false, details: { reason: ["string"] } },
  DELEGATED_ACCESS_CREDENTIAL_LOCATION: { status: 401, retryable: false, details: { reason: ["string"] } },
  DELEGATED_ACCESS_EFFECT_NOT_ALLOWED: { status: 403, retryable: false, details: { reason: ["string"] } },
  DELEGATED_ACCESS_EXPANSION_NOT_ALLOWED: { status: 403, retryable: false, details: { reason: ["string"] } },
  DELEGATED_ACCESS_FEATURE_NOT_ENTITLED: { status: 403, retryable: false, details: { reason: ["string"] } },
  DELEGATED_ACCESS_FILTER_NOT_ALLOWED: { status: 403, retryable: false, details: { reason: ["string"] } },
  DELEGATED_ACCESS_IMPERSONATION_NOT_ALLOWED: { status: 403, retryable: false, details: { reason: ["string"] } },
  DELEGATED_ACCESS_INACTIVE: { status: 401, retryable: false, details: { reason: ["string"] } },
  DELEGATED_ACCESS_KIND_NOT_ALLOWED: { status: 403, retryable: false, details: { reason: ["string"] } },
  DELEGATED_ACCESS_ORGANIZATION_KEY_NOT_ADMITTED: { status: 403, retryable: false, details: { reason: ["string"] } },
  DELEGATED_ACCESS_ORGANIZATION_MISMATCH: { status: 403, retryable: false, details: { reason: ["string"] } },
  DELEGATED_ACCESS_OUTLET_NOT_ALLOWED: { status: 403, retryable: false, details: { reason: ["string"] } },
  DELEGATED_ACCESS_PERMISSION_DENIED: { status: 403, retryable: false, details: { reason: ["string"] } },
  DELEGATED_ACCESS_PRINCIPAL_INACTIVE: { status: 403, retryable: false, details: { reason: ["string"] } },
  DELEGATED_ACCESS_ROUTE_NOT_ALLOWED: { status: 403, retryable: false, details: { reason: ["string"] } },
  DELEGATED_ACCESS_TARGET_MISMATCH: { status: 403, retryable: false, details: { reason: ["string"] } },
  DELEGATED_ACCESS_UNSUPPORTED: { status: 401, retryable: false, details: { contract_version: ["number"] } },
  FORBIDDEN: { status: 403, retryable: false },
  IDEMPOTENCY_KEY_CONFLICT: { status: 409, retryable: false },
  IDEMPOTENCY_KEY_REQUIRED: { status: 400, retryable: false },
  INTERNAL_ERROR: { status: 500, retryable: false },
  PAGINATION_CURSOR_INVALID: { status: 400, retryable: false, details: { reason: ["string"] } },
  PAGINATION_PARAMS_INVALID: { status: 400, retryable: false, details: { reason: ["string"] } },
  PRECONDITION_FAILED: { status: 412, retryable: false },
  PRECONDITION_REQUIRED: { status: 428, retryable: false },
  UNAUTHORIZED: { status: 401, retryable: false },
  VALIDATION_FAILED: { status: 422, retryable: false },
} as const satisfies Readonly<Record<string, ProblemInfo>>;

export type ProblemCode = keyof typeof problems;

/** The details member of each problem code that carries details. */
export interface ProblemDetails {
  CLIENT_UPGRADE_REQUIRED: T.ClientUpgradeRequiredDetails;
  CRM_CONTACT_EXPANSION_LIMIT: T.ContactExpansionLimitDetails;
  CRM_SALES_PIPELINE_STAGE_LIMIT: T.SalesPipelineStageLimitDetails;
  DELEGATED_ACCESS_AUDIENCE_MISMATCH: T.DelegatedAccessDeniedDetails;
  DELEGATED_ACCESS_CREDENTIAL_LOCATION: T.DelegatedAccessDeniedDetails;
  DELEGATED_ACCESS_EFFECT_NOT_ALLOWED: T.DelegatedAccessDeniedDetails;
  DELEGATED_ACCESS_EXPANSION_NOT_ALLOWED: T.DelegatedAccessDeniedDetails;
  DELEGATED_ACCESS_FEATURE_NOT_ENTITLED: T.DelegatedAccessDeniedDetails;
  DELEGATED_ACCESS_FILTER_NOT_ALLOWED: T.DelegatedAccessDeniedDetails;
  DELEGATED_ACCESS_IMPERSONATION_NOT_ALLOWED: T.DelegatedAccessDeniedDetails;
  DELEGATED_ACCESS_INACTIVE: T.DelegatedAccessInactiveDetails;
  DELEGATED_ACCESS_KIND_NOT_ALLOWED: T.DelegatedAccessDeniedDetails;
  DELEGATED_ACCESS_ORGANIZATION_KEY_NOT_ADMITTED: T.DelegatedAccessDeniedDetails;
  DELEGATED_ACCESS_ORGANIZATION_MISMATCH: T.DelegatedAccessDeniedDetails;
  DELEGATED_ACCESS_OUTLET_NOT_ALLOWED: T.DelegatedAccessDeniedDetails;
  DELEGATED_ACCESS_PERMISSION_DENIED: T.DelegatedAccessDeniedDetails;
  DELEGATED_ACCESS_PRINCIPAL_INACTIVE: T.DelegatedAccessDeniedDetails;
  DELEGATED_ACCESS_ROUTE_NOT_ALLOWED: T.DelegatedAccessDeniedDetails;
  DELEGATED_ACCESS_TARGET_MISMATCH: T.DelegatedAccessDeniedDetails;
  DELEGATED_ACCESS_UNSUPPORTED: T.DelegatedAccessUnsupportedDetails;
  PAGINATION_CURSOR_INVALID: T.PaginationCursorInvalidDetails;
  PAGINATION_PARAMS_INVALID: T.PaginationParamsInvalidDetails;
}
