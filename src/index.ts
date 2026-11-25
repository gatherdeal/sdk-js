export { default, GatherDeal } from "./client.js";
export type { ClientOptions } from "./client.js";
export {
  APIConnectionError,
  APIConnectionTimeoutError,
  APIError,
  APIUserAbortError,
  AuthenticationError,
  BadRequestError,
  ConflictError,
  GatherDealError,
  InternalServerError,
  InvalidResponseError,
  NotFoundError,
  OutcomeUnknownError,
  PermissionDeniedError,
  PreconditionFailedError,
  RateLimitError,
  UnprocessableEntityError,
  isAPIError,
} from "./errors.js";
export type { APIErrorInit, ErrorContext, ProblemRecord, Violation } from "./errors.js";
export type { RequestOptions as CallOptions } from "./generated/operation.js";
export type {
  APIPromise,
  ConditionalRequestOptions,
  KeyedRequestOptions,
  Page,
  PagePromise,
  RequestOptions,
} from "./generated/operation.js";
