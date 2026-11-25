// Compile the README examples against the SDK.
import { createClient, isAPIError } from "../src/index.js";

export async function examples(apiKey: string): Promise<void> {
  const client = createClient({ apiKey });
  const deal = await client.crm.deals.get("deal-id");
  const { revision } = await client.crm.deals.update(
    deal.id,
    { remark: "Contacted the customer" },
    { ifMatch: deal.revision },
  );
  const batch = await client.whatsapp.chatMessages.list({ after_rev: 0, limit: 20 });
  const next = await client.whatsapp.chatMessages.list({ after_rev: batch.after_rev, limit: 20 });
  void [revision, next];

  const outlet = await client.identity.outlets.get("outlet-id");
  const call = client.identity.outlets.list({ limit: 20 });
  const { data: page, response, requestID } = await call.withResponse();
  console.log(outlet.id, page.data.length, response.status, requestID);
  for await (const item of client.identity.outlets.list({ limit: 20 })) console.log(item.id);
  try {
    await client.identity.outlets.list({ limit: 20 }, { maxRetries: 0, signal: AbortSignal.timeout(10_000) });
  } catch (error) {
    if (client.identity.outlets.list.isError(error, "PAGINATION_PARAMS_INVALID")) console.log(error.details.reason);
    else if (isAPIError(error)) console.log(error.status, error.requestID);
    throw error;
  }
}
