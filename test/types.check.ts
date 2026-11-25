// Compile-time checks only.
import { createClient, type APIPromise, type Page, type PagePromise } from "../src/index.js";
import type { Outlet } from "../src/identity.js";
import type { ChatMessageFeedListResponse } from "../src/whatsapp.js";

export async function checks(error: unknown): Promise<void> {
  const { crm, identity, whatsapp } = createClient();
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

  const id: string = (await crm.contacts.create({ kind: "personal", name: "Test" }, { idempotencyKey: "key" })).id;
  await whatsapp.broadcasts.recipients.remove(id, { broadcast_id: "b1" });
  await crm.deals.update("d1", { remark: "Updated" }, { ifMatch: '"r1"' });
  // @ts-expect-error If-Match is required
  void crm.deals.update("d1", { remark: "Updated" });
  const feed: ChatMessageFeedListResponse = await whatsapp.chatMessages.list({ after_rev: 1 });
  const messages = await whatsapp.chats.messages.list({ chat_id: "c1" });
  void [outlet, page, feed.after_rev, messages.data];
}
