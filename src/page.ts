import type { InvalidResponseError, JsonObject } from "./errors.js";
import type { Page as PageShape, Pagination } from "./generated/operation.js";
import type { Execution } from "./response.js";

type NextPage<T> = (url: string, seen: ReadonlySet<string>) => Promise<Execution<Page<T>>>;

export class Page<T> implements PageShape<T> {
  readonly data: T[];
  readonly has_next_page: boolean;
  readonly has_prev_page: boolean;
  readonly page_size: number;
  readonly next_cursor?: string;
  readonly prev_cursor?: string;
  readonly page?: number;
  readonly total_items?: number;
  readonly total_pages?: number;

  readonly #next?: () => Promise<Execution<Page<T>>>;
  #pending?: Promise<Page<T>>;

  constructor(
    data: unknown,
    pagination: Pagination,
    url: string,
    seen: ReadonlySet<string>,
    request: NextPage<T>,
    invalid: (message: string) => InvalidResponseError,
  ) {
    // The envelope decoder has validated the item array and continuation flag.
    const wire = data as JsonObject;
    this.data = wire[pagination.itemsField] as T[];
    this.has_next_page = wire[pagination.hasNextPageField] as boolean;
    this.has_prev_page = wire[pagination.hasPrevPageField] as boolean;
    this.page_size = wire[pagination.pageSizeField] as number;

    const { nextCursorField, prevCursorField, pageField, totalItemsField, totalPagesField } = pagination;
    const next = wire[nextCursorField];
    const previous = wire[prevCursorField];
    const page = wire[pageField];
    const totalItems = wire[totalItemsField];
    const totalPages = wire[totalPagesField];
    if (typeof next === "string") this.next_cursor = next;
    if (typeof previous === "string") this.prev_cursor = previous;
    if (typeof page === "number") this.page = page;
    if (typeof totalItems === "number") this.total_items = totalItems;
    if (typeof totalPages === "number") this.total_pages = totalPages;

    if (!this.has_next_page) return;
    const { pageParam, afterParam, beforeParam } = pagination;
    const nextURL = new URL(url);
    const query = nextURL.searchParams;
    const cursorMode = query.has(afterParam) || query.has(beforeParam);
    if (next != null && (typeof next !== "string" || next.length === 0 || !afterParam)) {
      throw invalid("invalid next cursor");
    }
    if (typeof next === "string") {
      if (seen.has(next)) throw invalid("repeated next cursor");
      query.delete(pageParam);
      query.delete(beforeParam);
      query.set(afterParam, next);
      seen = new Set([...seen, next]);
    } else if (!cursorMode && pageParam && typeof page === "number" && Number.isSafeInteger(page) && page > 0) {
      query.delete(afterParam);
      query.delete(beforeParam);
      query.set(pageParam, String(page + 1));
    } else {
      throw invalid("next page is missing a cursor or page number");
    }
    this.#next = () => request(nextURL.href, seen);
  }

  hasNextPage(): boolean {
    return this.has_next_page;
  }

  async getNextPage(): Promise<Page<T>> {
    if (this.#next === undefined) throw new RangeError("no next page");
    this.#pending ??= this.#next().then(({ data }) => data);
    return this.#pending;
  }

  async *iterPages(): AsyncIterable<Page<T>> {
    let page: Page<T> = this;
    for (;;) {
      yield page;
      if (!page.hasNextPage()) return;
      page = await page.getNextPage();
    }
  }

  async *[Symbol.asyncIterator](): AsyncIterator<T> {
    for await (const page of this.iterPages()) yield* page.data;
  }
}
