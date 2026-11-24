import { problems as table } from "./generated/crm/v1/errors.js";
import { service as metadata } from "./generated/crm/v1/index.js";
import { deepFreeze } from "./runtime.js";

export * from "./generated/crm/v1/types.js";
export type * from "./generated/crm/v1/operations.js";
export type { ProblemCode, ProblemDetails } from "./generated/crm/v1/errors.js";

/** Every problem code of the crm API and its status, retryability and details. */
export const problems = deepFreeze(table);
/** Name, version and production base URL of the crm API. */
export const service = deepFreeze(metadata);
