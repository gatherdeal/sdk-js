// Generated from the GatherDeal public API contracts. Do not edit.

import type { ProblemInfo } from "../../operation.js";
import { delegatedAccessCodes } from "../../operation.js";
import type * as T from "./types.js";

/** Every problem code the operations of this API version declare. */
export const problems = {
  BAD_REQUEST: { status: 400, retryable: false },
  CLIENT_UPGRADE_REQUIRED: { status: 426, retryable: false, details: { client: ["string"], current_version: ["string"], min_version: ["string"] } },
  CONFLICT: { status: 409, retryable: false },
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
  UNAVAILABLE: { status: 503, retryable: true },
  VALIDATION_FAILED: { status: 422, retryable: false },
  WHATSAPP_AGENTS_FENCED: { status: 503, retryable: true },
  WHATSAPP_AGENT_NOT_FOUND: { status: 404, retryable: false, details: { agent_id: ["string"] } },
  WHATSAPP_AGENT_NOT_READY: { status: 409, retryable: false },
  WHATSAPP_AGENT_OUTLET_INVALID: { status: 422, retryable: false },
  WHATSAPP_AGENT_PENDING_MESSAGES_LIMIT_REACHED: { status: 429, retryable: true, details: { limit: ["number"], pending: ["number"] } },
  WHATSAPP_AGENT_SLOT_LIMIT_REACHED: { status: 422, retryable: false },
  WHATSAPP_BROADCAST_ACTIVE_LIMIT_REACHED: { status: 409, retryable: false, details: { count: ["number"], limit: ["number"] } },
  WHATSAPP_BROADCAST_NOT_FOUND: { status: 404, retryable: false, details: { broadcast_id: ["string"] } },
  WHATSAPP_BROADCAST_RECIPIENT_LIMIT_REACHED: { status: 422, retryable: false, details: { count: ["number"], limit: ["number"] } },
  WHATSAPP_BROADCAST_RECIPIENT_NOT_FOUND: { status: 404, retryable: false },
  WHATSAPP_BROADCAST_SENDER_UNAVAILABLE: { status: 422, retryable: false, details: { agent_id: ["string"] } },
  WHATSAPP_BROADCAST_STATE_CONFLICT: { status: 409, retryable: false, details: { status: ["string"] } },
  WHATSAPP_BROADCAST_SUPPRESSION_NOT_FOUND: { status: 404, retryable: false },
  WHATSAPP_CHAT_NOT_FOUND: { status: 404, retryable: false, details: { chat_id: ["string"] } },
  WHATSAPP_MESSAGE_NOT_FOUND: { status: 404, retryable: false },
  WHATSAPP_MESSAGE_OPERATION_NOT_ALLOWED: { status: 409, retryable: false, details: { reason: ["string"], target_id: ["string"] } },
  WHATSAPP_MESSAGE_PRIORITY_NOT_ALLOWED: { status: 403, retryable: false },
  WHATSAPP_MESSAGE_RUNTIME_UNSUPPORTED: { status: 409, retryable: false },
  WHATSAPP_MESSAGE_TARGET_NOT_FOUND: { status: 404, retryable: false, details: { target_id: ["string"] } },
  WHATSAPP_MESSAGE_TARGET_NOT_SENT: { status: 409, retryable: false, details: { target_id: ["string"] } },
  WHATSAPP_REGISTRATION_QUEUE_FULL: { status: 503, retryable: true },
  WHATSAPP_SENDER_AGENT_NOT_FOUND: { status: 404, retryable: false },
  WHATSAPP_SYSTEM_AGENT_UNASSIGNABLE: { status: 409, retryable: false },
  WHATSAPP_SYSTEM_AGENT_UNAVAILABLE: { status: 503, retryable: true },
  WHATSAPP_TEMPLATE_LIMIT_REACHED: { status: 422, retryable: false, details: { limit: ["number"] } },
  WHATSAPP_TEMPLATE_NAME_TAKEN: { status: 409, retryable: false },
  WHATSAPP_TEMPLATE_NOT_FOUND: { status: 404, retryable: false, details: { template_id: ["string"] } },
  WHATSAPP_TEMPLATE_RENDERED_TOO_LONG: { status: 422, retryable: false, details: { length: ["number"], limit: ["number"], variant_id: ["string"] } },
} as const satisfies Readonly<Record<string, ProblemInfo>>;

export type ProblemCode = keyof typeof problems;

/** The details member of each problem code that carries details. */
export type ProblemDetails = {
  CLIENT_UPGRADE_REQUIRED: T.ClientUpgradeRequiredDetails;
  PAGINATION_CURSOR_INVALID: T.PaginationCursorInvalidDetails;
  PAGINATION_PARAMS_INVALID: T.PaginationParamsInvalidDetails;
  WHATSAPP_AGENT_NOT_FOUND: T.AgentNotFoundDetails;
  WHATSAPP_AGENT_PENDING_MESSAGES_LIMIT_REACHED: T.AgentPendingMessagesLimitReachedDetails;
  WHATSAPP_BROADCAST_ACTIVE_LIMIT_REACHED: T.BroadcastLimitReachedDetails;
  WHATSAPP_BROADCAST_NOT_FOUND: T.BroadcastNotFoundDetails;
  WHATSAPP_BROADCAST_RECIPIENT_LIMIT_REACHED: T.BroadcastLimitReachedDetails;
  WHATSAPP_BROADCAST_SENDER_UNAVAILABLE: T.BroadcastSenderUnavailableDetails;
  WHATSAPP_BROADCAST_STATE_CONFLICT: T.BroadcastStateConflictDetails;
  WHATSAPP_CHAT_NOT_FOUND: T.ChatNotFoundDetails;
  WHATSAPP_MESSAGE_OPERATION_NOT_ALLOWED: T.MessageOperationNotAllowedDetails;
  WHATSAPP_MESSAGE_TARGET_NOT_FOUND: T.MessageTargetDetails;
  WHATSAPP_MESSAGE_TARGET_NOT_SENT: T.MessageTargetDetails;
  WHATSAPP_TEMPLATE_LIMIT_REACHED: T.TemplateLimitReachedDetails;
  WHATSAPP_TEMPLATE_NOT_FOUND: T.TemplateNotFoundDetails;
  WHATSAPP_TEMPLATE_RENDERED_TOO_LONG: T.TemplateRenderedTooLongDetails;
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
