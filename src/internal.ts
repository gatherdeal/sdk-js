import { problems as crmProblems } from "./generated/crm/v1/errors.js";
import { operations as crmOperations, service as crmService } from "./generated/crm/v1/index.js";
import { problems as identityProblems } from "./generated/identity/v1/errors.js";
import { operations as identityOperations, service as identityService } from "./generated/identity/v1/index.js";
import { problems as whatsappProblems } from "./generated/whatsapp/v1/errors.js";
import { operations as whatsappOperations, service as whatsappService } from "./generated/whatsapp/v1/index.js";
import { deepFreeze } from "./runtime.js";

export type {
  APIErrorShape, DelegatedAccessErrorCode, EmptyParams, ErrorGuard, JsonKind, Method, Methods,
  Operation, Pagination, Parameter, ParameterEncoding, ProblemInfo,
} from "./generated/operation.js";

export const operations = deepFreeze({ crm: crmOperations, identity: identityOperations, whatsapp: whatsappOperations });
export const problems = deepFreeze({ crm: crmProblems, identity: identityProblems, whatsapp: whatsappProblems });
export const service = deepFreeze({ crm: crmService, identity: identityService, whatsapp: whatsappService });
