// CommonJS consumer type-checked against the installed package with strict settings.
import sdk = require("@gatherdeal/sdk");
import crm = require("@gatherdeal/sdk/crm");
import identity = require("@gatherdeal/sdk/identity");
import whatsapp = require("@gatherdeal/sdk/whatsapp");
import internal = require("@gatherdeal/sdk/internal");

export async function consumer(): Promise<string> {
  const client: sdk.GatherDeal = new sdk.default({ apiKey: null });
  const descriptor: internal.Operation = internal.operations.crm.deals.update;
  const update: crm.DealUpdateResponse = await client.crm.deals.update("d1", { remark: "Updated" }, { ifMatch: '"r1"' });
  const feed: whatsapp.ChatMessageFeedListResponse = await client.whatsapp.chatMessages.list({ after_rev: 0 });
  void [descriptor.id, update.revision, feed.after_rev];
  try {
    const outlet: identity.Outlet = await client.identity.outlets.get("o1");
    return outlet.id;
  } catch (error) {
    if (sdk.isAPIError(error)) return String(error.status);
    throw error;
  }
}
