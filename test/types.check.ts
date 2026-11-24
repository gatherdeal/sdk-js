// Compile-time checks only; tsc fails when an expectation breaks.
import { createClient, paginate, type ApiError } from "../src/index.js";
import type { ContactsListOutput, Deal, DealsUpdateInput, ProblemCode } from "../src/crm.js";
import type { MessagesCreateInput } from "../src/whatsapp.js";

type Equal<A, B> = (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B ? 1 : 2 ? true : false;
function expectType<T extends true>(_: T): void {}

export async function checks(): Promise<void> {
  const client = createClient({ apiKey: "k" });

  const list = await client.crm.contacts.list();
  expectType<Equal<typeof list, ContactsListOutput>>(true);
  await client.crm.contacts.list({ q: "tan", count: 20 }, { signal: AbortSignal.timeout(1000), retries: 0 });

  // @ts-expect-error id is required
  await client.crm.deals.get();
  // @ts-expect-error unknown member
  await client.crm.deals.get({ id: "d", nope: 1 });
  // @ts-expect-error exactOptionalPropertyTypes: undefined is not a value of an optional member
  await client.crm.contacts.list({ outlet_id: undefined });

  const deal: Deal = (await client.crm.deals.get({ id: "d" })).deal;
  const update: DealsUpdateInput = { id: deal.id, if_match: deal.revision };
  await client.crm.deals.update(update);

  await client.crm.contacts.create({ name: "Tan" } as never, { idempotencyKey: "k" });
  await client.whatsapp.broadcasts.recipients.list({ broadcast_id: "b" } as never);
  const message: Partial<MessagesCreateInput> = {};
  void message;

  const error: unknown = new Error();
  if (client.crm.contacts.list.isError(error, "CRM_CONTACT_EXPANSION_LIMIT")) {
    expectType<Equal<typeof error.code, "CRM_CONTACT_EXPANSION_LIMIT">>(true);
    const limit: number = error.details.limit;
    void limit;
  }
  // @ts-expect-error the operation does not declare this code
  client.crm.contacts.list.isError(error, "PRECONDITION_FAILED");
  // @ts-expect-error not a crm code
  client.crm.isError(error, "WHATSAPP_AGENTS_FENCED");
  if (client.crm.deals.update.isError(error)) {
    const code: ProblemCode = error.code;
    void code;
  }
  if (client.whatsapp.isError(error)) {
    const e: ApiError = error;
    void e;
  }

  for await (const contact of paginate(client.crm.contacts.list, { count: 50 })) {
    const id: string = contact.id;
    void id;
  }
}
