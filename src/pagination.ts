import type { Method } from "./client.js";
import type { CallOptions } from "./transport.js";

/** The item type of the page a list operation returns. */
export type PageItem<O> = {
  [K in keyof O]-?: NonNullable<O[K]> extends { data?: readonly (infer X)[] | null } ? X : never;
}[keyof O];

/**
 * Iterates every item of a paginated list operation, following next_cursor
 * from page to page. The page size comes from the input (e.g. count); page
 * and before members are ignored.
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
  const seen = new Set<string>();
  for (;;) {
    const body = await call(next, options);
    const page = body[pagination.resultField] as Record<string, unknown> | undefined;
    const items = page?.[pagination.itemsField];
    if (Array.isArray(items)) yield* items as PageItem<O>[];
    const cursor = page?.[pagination.nextCursorField];
    if (page?.[pagination.hasNextPageField] !== true || typeof cursor !== "string" || cursor === "") return;
    if (seen.has(cursor)) throw new Error(`${method.operation.id}: the server repeated a page cursor`);
    seen.add(cursor);
    next = { ...next, [pagination.afterParam]: cursor };
  }
}
