import { bindOperation } from "../../src/bind.js";
import type { Operation } from "../../src/generated/operation.js";
import type { TransportConfig } from "../../src/transport.js";
import { fakeFetch, type Reply } from "../helpers.js";

export function setup(maxRetries: number, replies: Reply[], config: Partial<TransportConfig> = {}) {
  const f = fakeFetch(...replies);
  const binding = { baseUrl: "https://example.test", problems: {}, config: { fetch: f.fetch, timeout: 1000, maxRetries, ...config } };
  return { ...f, method: <O extends Operation>(op: O) => bindOperation(op, binding) };
}
