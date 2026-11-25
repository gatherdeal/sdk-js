// Compile-time checks only.
import { GatherDeal, type APIPromise, type Page, type PagePromise } from "../src/index.js";
// @ts-expect-error descriptor types belong to the internal entry
import type { Operation } from "../src/index.js";
import type { Outlet } from "../src/identity.js";
import type { ChatMessageFeedListResponse } from "../src/whatsapp.js";

export async function checks(error: unknown): Promise<void> {
  const { crm, identity, whatsapp } = new GatherDeal({ apiKey: null });
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
  await crm.deals.update("d1", { remark: "Updated" }, { ifMatch: '"r1"' });
  // @ts-expect-error If-Match is required
  void crm.deals.update("d1", { remark: "Updated" });
  const feed: ChatMessageFeedListResponse = await whatsapp.chatMessages.list({ after_rev: 1 });
  void [id, outlet, page, feed.after_rev];

  await whatsapp.chats.messages.list({ chat_id: "c1" });
  // @ts-expect-error a nested collection takes the parent ID in params
  void whatsapp.chats.messages.list("c1");

  await whatsapp.broadcasts.recipients.remove("r1", { broadcast_id: "b1" });
  // @ts-expect-error a nested item takes its own ID separately from the parent ID
  void whatsapp.broadcasts.recipients.remove({ recipient_id: "r1", broadcast_id: "b1" });

  await whatsapp.agents.pairing.get({ agent_id: "a1" });
  // @ts-expect-error a singleton sub-resource takes the parent ID in params
  void whatsapp.agents.pairing.get("a1");

  await whatsapp.broadcasts.cancel("b1");
  // @ts-expect-error a command on an item takes its ID positionally
  void whatsapp.broadcasts.cancel({ broadcast_id: "b1" });
}
