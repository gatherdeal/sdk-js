import type { Method } from "./client.js";
import { ProtocolError } from "./errors.js";
import type { CallOptions } from "./transport.js";

/** The item type of the page a list operation returns. */
export type PageItem<O> = {
  [K in keyof O]-?: NonNullable<O[K]> extends { data?: readonly (infer X)[] | null } ? X : never;
}[keyof O];

/**
 * Iterates every item of a paginated list operation, following next_cursor
 * from page to page. The page size comes from the input (e.g. count); page
 * and before members are ignored. A page without its item list, or one that
 * announces a next page without a new cursor, throws ProtocolError before
 * any of its items is yielded.
 */
export async function* paginate<I, O, C extends string, PD>(
  method: Method<I, O, C, PD>,
  input: I,
  options?: CallOptions,
): AsyncGenerator<PageItem<O>, void, undefined> {
  const pagination = method.operation.pagination;
  if (pagination === undefined) {
    throw new TypeError(`${method.operation.id}: not a paginated operation`);
  }
  const call = method as unknown as (
    input: Record<string, unknown>,
    options?: CallOptions,
  ) => Promise<Record<string, unknown>>;
  let next: Record<string, unknown> = { ...(input as Record<string, unknown>) };
  delete next[pagination.pageParam];
  delete next[pagination.beforeParam];
  const id = method.operation.id;
  const malformed = (message: string) =>
    new ProtocolError(`${id}: ${message}`, { status: method.operation.success.status, body: "" }, { operation: id });
  const seen = new Set<string>();
  for (;;) {
    const body = await call(next, options);
    const page = body[pagination.resultField];
    if (typeof page !== "object" || page === null || Array.isArray(page)) throw malformed("page is missing");
    const fields = page as Record<string, unknown>;
    const items = fields[pagination.itemsField];
    if (!Array.isArray(items)) throw malformed("page has no item list");
    const hasNext = fields[pagination.hasNextPageField];
    if (typeof hasNext !== "boolean") throw malformed(`page lacks ${pagination.hasNextPageField}`);
    const cursor = fields[pagination.nextCursorField];
    if (hasNext) {
      if (typeof cursor !== "string" || cursor === "") throw malformed("next page announced without a cursor");
      if (seen.has(cursor)) throw malformed("the server repeated a page cursor");
      seen.add(cursor);
    }
    yield* items as PageItem<O>[];
    if (!hasNext) return;
    next = { ...next, [pagination.afterParam]: cursor };
  }
}
