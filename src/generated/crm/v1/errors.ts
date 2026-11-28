// Generated from the GatherDeal public API contracts. Do not edit.

import type { ProblemInfo } from "../../operation.js";
import { delegatedAccessCodes } from "../../operation.js";
import type * as T from "./types.js";

/** Every problem code the operations of this API version declare. */
export const problems = {
  BAD_REQUEST: { status: 400, retryable: false },
  BATCH_REJECTED: { status: 422, retryable: false, details: { complete: ["boolean"] } },
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
  CRM_CONTACT_TAG_ALREADY_EXISTS: { status: 409, retryable: false },
  CRM_CONTACT_TAG_NOT_FOUND: { status: 404, retryable: false },
  CRM_CONTACT_VERIFIED_IMMUTABLE: { status: 422, retryable: false },
  CRM_DEAL_OUTLET_REQUIRED: { status: 422, retryable: false },
  CRM_FILE_NOT_FOUND: { status: 404, retryable: false },
  CRM_RELATED_CONTACT_NOT_ALLOWED: { status: 403, retryable: false },
  CRM_SALES_PIPELINE_DEAL_NOT_FOUND: { status: 404, retryable: false },
  CRM_SALES_PIPELINE_NOT_FOUND: { status: 404, retryable: false },
  CRM_SALES_PIPELINE_STAGE_LIMIT: { status: 422, retryable: false, details: { expansion: ["string"], limit: ["number"] } },
  CRM_SALES_PIPELINE_STAGE_NOT_FOUND: { status: 404, retryable: false },
  [delegatedAccessCodes[0]]: { status: 403, retryable: false, details: { reason: ["string"] } },
  [delegatedAccessCodes[1]]: { status: 401, retryable: false, details: { reason: ["string"] } },
  [delegatedAccessCodes[2]]: { status: 403, retryable: false, details: { reason: ["string"] } },
  [delegatedAccessCodes[3]]: { status: 403, retryable: false, details: { reason: ["string"] } },
  [delegatedAccessCodes[4]]: { status: 403, retryable: false, details: { reason: ["string"] } },
  [delegatedAccessCodes[5]]: { status: 403, retryable: false, details: { reason: ["string"] } },
  [delegatedAccessCodes[6]]: { status: 403, retryable: false, details: { reason: ["string"] } },
  [delegatedAccessCodes[7]]: { status: 401, retryable: false, details: { reason: ["string"] } },
  [delegatedAccessCodes[8]]: { status: 403, retryable: false, details: { reason: ["string"] } },
  [delegatedAccessCodes[9]]: { status: 403, retryable: false, details: { reason: ["string"] } },
  [delegatedAccessCodes[10]]: { status: 403, retryable: false, details: { reason: ["string"] } },
  [delegatedAccessCodes[11]]: { status: 403, retryable: false, details: { reason: ["string"] } },
  [delegatedAccessCodes[12]]: { status: 403, retryable: false, details: { reason: ["string"] } },
  [delegatedAccessCodes[13]]: { status: 403, retryable: false, details: { reason: ["string"] } },
  [delegatedAccessCodes[14]]: { status: 403, retryable: false, details: { reason: ["string"] } },
  [delegatedAccessCodes[15]]: { status: 403, retryable: false, details: { reason: ["string"] } },
  [delegatedAccessCodes[16]]: { status: 401, retryable: false, details: { contract_version: ["number"] } },
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
export type ProblemDetails = {
  BATCH_REJECTED: T.BatchRejectedDetails;
  CLIENT_UPGRADE_REQUIRED: T.ClientUpgradeRequiredDetails;
  CRM_CONTACT_EXPANSION_LIMIT: T.ContactExpansionLimitDetails;
  CRM_SALES_PIPELINE_STAGE_LIMIT: T.SalesPipelineStageLimitDetails;
  PAGINATION_CURSOR_INVALID: T.PaginationCursorInvalidDetails;
  PAGINATION_PARAMS_INVALID: T.PaginationParamsInvalidDetails;
}
  & { [Code in typeof delegatedAccessCodes[0]]: T.DelegatedAccessDeniedDetails }
  & { [Code in typeof delegatedAccessCodes[1]]: T.DelegatedAccessDeniedDetails }
  & { [Code in typeof delegatedAccessCodes[2]]: T.DelegatedAccessDeniedDetails }
  & { [Code in typeof delegatedAccessCodes[3]]: T.DelegatedAccessDeniedDetails }
  & { [Code in typeof delegatedAccessCodes[4]]: T.DelegatedAccessDeniedDetails }
  & { [Code in typeof delegatedAccessCodes[5]]: T.DelegatedAccessDeniedDetails }
  & { [Code in typeof delegatedAccessCodes[6]]: T.DelegatedAccessDeniedDetails }
  & { [Code in typeof delegatedAccessCodes[7]]: T.DelegatedAccessInactiveDetails }
  & { [Code in typeof delegatedAccessCodes[8]]: T.DelegatedAccessDeniedDetails }
  & { [Code in typeof delegatedAccessCodes[9]]: T.DelegatedAccessDeniedDetails }
  & { [Code in typeof delegatedAccessCodes[10]]: T.DelegatedAccessDeniedDetails }
  & { [Code in typeof delegatedAccessCodes[11]]: T.DelegatedAccessDeniedDetails }
  & { [Code in typeof delegatedAccessCodes[12]]: T.DelegatedAccessDeniedDetails }
  & { [Code in typeof delegatedAccessCodes[13]]: T.DelegatedAccessDeniedDetails }
  & { [Code in typeof delegatedAccessCodes[14]]: T.DelegatedAccessDeniedDetails }
  & { [Code in typeof delegatedAccessCodes[15]]: T.DelegatedAccessDeniedDetails }
  & { [Code in typeof delegatedAccessCodes[16]]: T.DelegatedAccessUnsupportedDetails };
