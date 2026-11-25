// ESM consumer type-checked against the installed package with strict settings.
import GatherDeal, { isAPIError } from "@gatherdeal/sdk";
import { operations, type Operation } from "@gatherdeal/sdk/internal";
import type { DealUpdateResponse } from "@gatherdeal/sdk/crm";
import type { ChatMessageFeedListResponse } from "@gatherdeal/sdk/whatsapp";
import type { Outlet, OutletListParams, ProblemDetails } from "@gatherdeal/sdk/identity";

export async function consumer(token: () => Promise<string>): Promise<string[]> {
  const client = new GatherDeal({ accessToken: token });
  const descriptor: Operation = operations.crm.deals.update;
  void descriptor;
  const update: DealUpdateResponse = await client.crm.deals.update("d1", { remark: "Updated" }, { ifMatch: '"r1"' });
  const feed: ChatMessageFeedListResponse = await client.whatsapp.chatMessages.list({ after_rev: 0 });
  void [update.revision, feed.after_rev];
  const outlet: Outlet = await client.identity.outlets.get("o1");
  try {
    await client.identity.outlets.list({ limit: 10 });
  } catch (error) {
    if (client.identity.isError(error, "PAGINATION_PARAMS_INVALID")) {
      const details: ProblemDetails["PAGINATION_PARAMS_INVALID"] = error.details;
      void details;
    }
    if (isAPIError(error)) throw error;
  }
  const input: OutletListParams = { limit: 10 };
  const names = [outlet.id];
  for await (const item of client.identity.outlets.list(input)) names.push(item.id);
  return names;
}
