// Type-checked against the installed package with strict settings.
import { createClient, isApiError, paginate, type ApiError, type Client } from "@gatherdeal/sdk";
import type { Deal, ProblemDetails } from "@gatherdeal/sdk/crm";
import type { OutletsListInput } from "@gatherdeal/sdk/identity";
import type { MessagesCreateInput } from "@gatherdeal/sdk/whatsapp";

export async function consumer(token: () => Promise<string>): Promise<string[]> {
  const client: Client = createClient({ token });
  const { deal }: { deal: Deal } = await client.crm.deals.get({ id: "d1" });
  try {
    await client.crm.deals.update({ id: deal.id, if_match: deal.revision });
  } catch (error) {
    if (client.crm.deals.update.isError(error, "PRECONDITION_FAILED")) {
      const e: ApiError<"PRECONDITION_FAILED"> = error;
      void e;
    }
    if (client.crm.isError(error, "CRM_CONTACT_EXPANSION_LIMIT")) {
      const details: ProblemDetails["CRM_CONTACT_EXPANSION_LIMIT"] = error.details;
      void details;
    }
    if (isApiError(error)) throw error;
  }
  const input: OutletsListInput = { limit: 10 };
  const names: string[] = [];
  for await (const outlet of paginate(client.identity.outlets.list, input)) if (outlet !== null) names.push(outlet.id);
  const message: Partial<MessagesCreateInput> = {};
  void message;
  return names;
}
