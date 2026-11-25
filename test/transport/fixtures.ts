import { bindOperation } from "../../src/bind.js";
import type { APIPromise, ConditionalRequestOptions, Operation, RequestOptions } from "../../src/generated/operation.js";
import type { TransportConfig } from "../../src/transport.js";
import { fakeFetch, type Reply } from "../helpers.js";

export function setup(maxRetries: number, replies: Reply[], config: Partial<TransportConfig> = {}) {
  const f = fakeFetch(...replies);
  const binding = { baseUrl: "https://example.test", problems: {}, config: { fetch: f.fetch, timeout: 1000, maxRetries, ...config } };
  return { ...f, method: <O extends Operation>(op: O) => bindOperation(op, binding) };
}

export function receiptDescriptor(required: readonly string[], status = 200) {
  return {
    id: "test.items.receipt", method: "POST", path: "/v1/items", parameters: [], body: "none",
    success: { status, body: "json", required: ["status", ...required] }, result: { kind: "object" },
    idempotency: "none", authentication: "required", organizationKeys: true, errors: [],
  } as const satisfies Operation;
}

export function receipt<T>(required: readonly string[]): Operation<[params?: undefined, options?: RequestOptions], APIPromise<T>> {
  return receiptDescriptor(required);
}

export const update: Operation<[id: string, params: undefined, options: ConditionalRequestOptions], APIPromise<{ revision: string }>> = {
  ...receiptDescriptor(["revision"]),
  id: "test.items.update", method: "PATCH", path: "/v1/items/{id}", positional: "id",
  conditional: { read: "test.items.get" },
};
