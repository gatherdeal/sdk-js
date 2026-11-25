// Compile-time checks only.
import { bindOperation, type Binding } from "../src/bind.js";
import { createClient, type APIPromise, type Page, type PagePromise } from "../src/index.js";
import type { Outlet } from "../src/identity.js";
import { broadcastsRecipientsRemove, itemsCreate, itemsUpdate } from "./fixtures/operations/operations.js";

export async function checks(binding: Binding, error: unknown): Promise<void> {
  const { identity } = createClient();
  const call: APIPromise<Outlet> = identity.outlets.get("o1", { with_owner: true }, { maxRetries: 0 });
  const outlet: Outlet = (await call.withResponse()).data;
  const pending: PagePromise<Outlet> = identity.outlets.list({ limit: 2 });
  const page: Page<Outlet> = await pending;
  for await (const item of pending) {
    const id: string = item.id;
    void id;
  }
  // @ts-expect-error positional id is required
  void identity.outlets.get({ id: "o1" });
  // @ts-expect-error unknown query param
  void identity.outlets.list({ count: 20 });
  // @ts-expect-error non-keyed operations reject a key
  void identity.outlets.get("o1", undefined, { idempotencyKey: "key" });
  // @ts-expect-error method only narrows declared problem codes
  identity.outlets.get.isError(error, "PRECONDITION_FAILED");
  if (identity.outlets.list.isError(error, "PAGINATION_PARAMS_INVALID")) {
    const reason: string = error.details.reason;
    void reason;
  }

  const create = bindOperation(itemsCreate, binding);
  const id: string = (await create({ content: { kind: "text", text: "Item" } }, { idempotencyKey: "key" })).id;
  await bindOperation(broadcastsRecipientsRemove, binding)(id, { broadcast_id: id });
  const update = bindOperation(itemsUpdate, binding);
  await update(outlet.id, undefined, { ifMatch: '"r1"' });
  // @ts-expect-error If-Match is required
  void update(id);
  void page;
}
