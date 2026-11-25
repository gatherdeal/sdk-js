import type { APIPromise as APIPromiseShape, Page, PagePromise as PagePromiseShape } from "./generated/operation.js";
import { rebuildResponse, type Execution } from "./response.js";

/** The typed result and all response views share the same buffered execution. */
export class APIPromise<T> extends Promise<T> implements APIPromiseShape<T> {
  static override get [Symbol.species](): PromiseConstructor {
    return Promise;
  }

  constructor(private readonly execution: Promise<Execution<T>>) {
    super((resolve, reject) => { void execution.then((result) => resolve(result.data), reject); });
  }

  asResponse(): Promise<Response> {
    return this.then(async () => rebuildResponse((await this.execution).response));
  }

  withResponse(): Promise<{ data: T; response: Response; requestID: string | undefined }> {
    return this.then(async (data) => {
      const { response } = await this.execution;
      return { data, response: rebuildResponse(response), requestID: response.requestID };
    });
  }
}

export class PagePromise<T> extends APIPromise<Page<T>> implements PagePromiseShape<T> {
  async *[Symbol.asyncIterator](): AsyncIterator<T> {
    yield* await this;
  }
}
