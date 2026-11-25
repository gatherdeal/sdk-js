import { APIPromise, PagePromise } from "./api-promise.js";
import { detailsMatch, isAPIError } from "./errors.js";
import type { ErrorGuard, Method, Methods, Operation } from "./generated/operation.js";
import { Page } from "./page.js";
import { serializeRequest } from "./request.js";
import type { Execution } from "./response.js";
import { checkCallerAbort, invoke, type ProblemTable, type TransportConfig, type TransportOptions } from "./transport.js";

export interface Binding {
  readonly config: TransportConfig;
  readonly baseUrl: string;
  readonly problems: ProblemTable;
}

function isOperation(node: unknown): node is Operation {
  return typeof node === "object" && node !== null && typeof (node as Partial<Operation>).id === "string";
}

function execute(binding: Binding, op: Operation, args: readonly unknown[]) {
  const result = op.result;
  const offset = op.positional === undefined ? 0 : 1;
  const supplied = args[offset + 1] as TransportOptions | undefined;
  const options = { ...supplied, ...(supplied?.headers === undefined ? {} : { headers: { ...supplied.headers } }) };
  const prepare = async () => {
    checkCallerAbort({ operation: op.id, attempt: 1 }, options.signal);
    if (result.kind === "page" && (!result.pagination.itemsField || !result.pagination.hasNextPageField)) {
      throw new TypeError(`${op.id}: pagination metadata must name the item and continuation fields`);
    }
    const params = args[offset] ?? {};
    if (typeof params !== "object" || Array.isArray(params)) throw new TypeError(`${op.id}: params must be an object`);
    return serializeRequest(op, params, binding.baseUrl, args[0]);
  };

  if (result.kind === "page") {
    const first = prepare().then((request) => {
      const initialAfter = new URL(request.url).searchParams.get(result.pagination.afterParam);
      const seen = new Set(initialAfter === null ? [] : [initialAfter]);
      const next = (url: string, cursors: ReadonlySet<string>): Promise<Execution<Page<unknown>>> =>
        invoke(binding.config, op, binding.problems, { ...request, url }, options, (data, invalid) =>
          new Page(data, result.pagination, url, cursors, next, invalid),
        );
      return next(request.url, seen);
    });
    return new PagePromise(first);
  }
  return new APIPromise(prepare().then((request) =>
    invoke(binding.config, op, binding.problems, request, options, (data) => data),
  ));
}

export function bindOperation<O extends Operation, PD>(op: O, binding: Binding): Method<O, PD> {
  const method = (...args: readonly unknown[]) => execute(binding, op, args);
  return Object.freeze(Object.assign(method, {
    isError: (error: unknown, code?: string) =>
      isAPIError(error) && error.operation === op.id && error.code !== undefined && op.errors.includes(error.code) &&
      (code === undefined || code === error.code) && detailsMatch(binding.problems[error.code], error.details),
  })) as unknown as Method<O, PD>;
}

export function bindTree<T extends object, PD>(tree: T, binding: Binding): Methods<T, PD> {
  const methods = Object.fromEntries(Object.entries(tree).map(([key, node]: [string, unknown]) =>
    [key, isOperation(node) ? bindOperation(node, binding) : bindTree(node as object, binding)],
  ));
  return Object.freeze(methods) as Methods<T, PD>;
}

export function bindService<T extends object, Code extends string, PD>(
  tree: T,
  service: string,
  binding: Binding,
): Methods<T, PD> & ErrorGuard<Code, PD> {
  const isError = (error: unknown, code?: string) =>
    isAPIError(error) && error.operation.startsWith(`${service}.`) && error.code !== undefined &&
    Object.hasOwn(binding.problems, error.code) &&
    (code === undefined || (error.code === code && detailsMatch(binding.problems[code], error.details)));
  return Object.freeze({ ...bindTree<T, PD>(tree, binding), isError }) as Methods<T, PD> & ErrorGuard<Code, PD>;
}
