export { createClient } from "./client.js";
export type { Client, ClientOptions, ServiceClient } from "./client.js";
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
  JsonKind,
  KeyedRequestOptions,
  Method,
  Methods,
  Operation,
  Page,
  PagePromise,
  Pagination,
  Parameter,
  ParameterEncoding,
  ProblemInfo,
  RequestOptions,
} from "./generated/operation.js";
