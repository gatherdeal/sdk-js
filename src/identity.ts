import { problems as table } from "./generated/identity/v1/errors.js";
import { service as metadata } from "./generated/identity/v1/index.js";
import { deepFreeze } from "./runtime.js";

export * from "./generated/identity/v1/types.js";
export type * from "./generated/identity/v1/operations.js";
export type { ProblemCode, ProblemDetails } from "./generated/identity/v1/errors.js";

/** Every problem code of the identity API and its status, retryability and details. */
export const problems = deepFreeze(table);
/** Name, version and production base URL of the identity API. */
export const service = deepFreeze(metadata);
