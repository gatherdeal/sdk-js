// The README examples, type-checked.
import { createClient, isApiError, paginate } from "../src/index.js";
import type { Deal, DealsUpdateInput } from "../src/crm.js";
import type { Outlet } from "../src/identity.js";
import type { MessagesCreateInput } from "../src/whatsapp.js";

declare const apiKey: string;
declare function getAccessToken(): Promise<string>;
declare const dealId: string;
declare const id: string;
declare const outletId: string;
declare const input: MessagesCreateInput;

export async function examples(): Promise<void> {
  const client = createClient({ apiKey });
  const { contacts } = await client.crm.contacts.list({ q: "tan", count: 20 });
  for (const contact of contacts.data) console.log(contact.id);

  const { outlets } = await client.identity.outlets.list({ count: 10 });
  const first: Outlet | null | undefined = outlets.data[0];
  void first;

  const browser = createClient({ token: () => getAccessToken() });
  const { deal } = await browser.crm.deals.get({ id: dealId });
  const typed: Deal = deal;
  void typed;

  await client.crm.contactTags.assign({ contact_id: "c", tag_id: "t" }, { signal: AbortSignal.timeout(10_000) });

  try {
    await client.crm.contacts.list({ with_tags: true });
  } catch (error) {
    if (client.crm.contacts.list.isError(error, "CRM_CONTACT_EXPANSION_LIMIT")) {
      console.log(error.details.limit);
    } else if (client.crm.isError(error, "CRM_CONTACT_NOT_FOUND")) {
      // any crm operation
    } else if (isApiError(error)) {
      console.log(error.code, error.correlationId);
    }
    throw error;
  }

  const key = crypto.randomUUID();
  await client.whatsapp.messages.create(input, { idempotencyKey: key });

  await client.crm.contacts.list({ outlet_id: outletId, count: 50 });

  const read = await client.crm.deals.get({ id });
  const update: DealsUpdateInput = { id, if_match: read.deal.revision, remark: "Called back" };
  try {
    const { revision } = await client.crm.deals.update(update);
    void revision;
  } catch (error) {
    if (client.crm.deals.update.isError(error, "PRECONDITION_FAILED")) {
      // read again
    }
    throw error;
  }

  const page = await client.crm.contacts.list({ count: 100 });
  if (page.contacts.next_cursor !== undefined) {
    await client.crm.contacts.list({ count: 100, after: page.contacts.next_cursor });
  }
  for await (const contact of paginate(client.crm.contacts.list, { count: 100 })) console.log(contact.id);
}
