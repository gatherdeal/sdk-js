import { problems as table } from "./generated/whatsapp/v1/errors.js";
import { service as metadata } from "./generated/whatsapp/v1/index.js";
import { deepFreeze } from "./runtime.js";

export * from "./generated/whatsapp/v1/types.js";
export type * from "./generated/whatsapp/v1/operations.js";
export type { ProblemCode, ProblemDetails } from "./generated/whatsapp/v1/errors.js";

/** Every problem code of the whatsapp API and its status, retryability and details. */
export const problems = deepFreeze(table);
/** Name, version and production base URL of the whatsapp API. */
export const service = deepFreeze(metadata);
