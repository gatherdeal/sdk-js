export { createClient } from "./client.js";
export type { Client, ClientOptions, Method, Methods, ServiceClient } from "./client.js";
export {
  ApiError,
  ConnectionError,
  GatherDealError,
  ProtocolError,
  StatusError,
  TimeoutError,
  isApiError,
} from "./errors.js";
export type { ApiErrorInit, ProblemRecord, Violation } from "./errors.js";
export { paginate } from "./pagination.js";
export type { PageItem } from "./pagination.js";
export type { CallOptions } from "./transport.js";
export type {
  IfMatchSource,
  JsonKind,
  Operation,
  Pagination,
  Parameter,
  ParameterEncoding,
  ProblemInfo,
} from "./generated/operation.js";
