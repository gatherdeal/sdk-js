// Generated from the GatherDeal public API contracts. Do not edit.

import * as op from "./operations.js";

/** The crm API, version v1. */
export const service = {
  name: "crm",
  version: "v1",
  baseURL: "https://api.gatherdeal.ai/crm",
} as const;

/** Operations by member path. */
export const operations = {
  contactLogs: {
    /**
     * Create a contact log.
     *
     * Creates a contact note and returns its ID. Retry the same submission with the same idempotency key.
     *
     * Requires the permissions `crm.contact.read`, `crm.contact.write`.
     */
    create: op.contactLogsCreate,
    /**
     * List contact logs.
     *
     * Lists contact notes for one contact.
     *
     * Requires the permissions `crm.contact.read`.
     *
     * Use `for await` to iterate over all results.
     */
    list: op.contactLogsList,
  },
  contactTags: {
    /**
     * Assign Contact Tag
     *
     * Attaches an existing tag to a contact. Repeating the request for an attached tag changes nothing, including after the tag is archived.
     *
     * Requires the permissions `crm.contact.read`, `crm.contact.write`.
     */
    add: op.contactTagsAdd,
    /**
     * List contact tags.
     *
     * Lists the organization’s contact tag definitions.
     *
     * Requires the permissions `crm.contact.read`.
     *
     * Use `for await` to iterate over all results.
     */
    list: op.contactTagsList,
    /**
     * Remove Contact Tag
     *
     * Removes one tag from a contact.
     *
     * Requires the permissions `crm.contact.read`, `crm.contact.write`.
     */
    remove: op.contactTagsRemove,
  },
  contacts: {
    /**
     * Create a contact.
     *
     * Requires the permissions `crm.contact.write`.
     */
    create: op.contactsCreate,
    /**
     * Get a contact.
     *
     * Retrieves a visible contact by its identifier.
     *
     * Requires the permissions `crm.contact.read`.
     */
    get: op.contactsGet,
    /**
     * List contacts.
     *
     * Lists contacts visible to the caller.
     *
     * Requires the permissions `crm.contact.read`.
     *
     * Use `for await` to iterate over all results.
     */
    list: op.contactsList,
    /**
     * Update a contact.
     *
     * Sets the supplied contact fields. HTTP 200 returns a success envelope.
     *
     * Requires the permissions `crm.contact.write`.
     */
    update: op.contactsUpdate,
  },
  deals: {
    /**
     * Create a deal.
     *
     * Creates a deal in a pipeline stage and returns its ID. CRM names the deal. Reuse the idempotency key to retry the same creation.
     *
     * Requires the permissions `crm.deal.read`, `crm.deal.write`.
     */
    create: op.dealsCreate,
    /**
     * Get a deal.
     *
     * Reads a deal and its pipeline placement.
     *
     * Requires the permissions `crm.deal.read`.
     */
    get: op.dealsGet,
    /**
     * List deals.
     *
     * Lists visible deals with their current pipeline and stage.
     *
     * Requires the permissions `crm.deal.read`.
     *
     * Use `for await` to iterate over all results.
     */
    list: op.dealsList,
    /**
     * Update a deal.
     *
     * Changes a deal's stage, priority, type and remark. If-Match must carry the revision from the deal's latest read; a stale revision fails with 412 and the caller rereads the deal before retrying. Values equal to the stored ones change nothing.
     *
     * Requires the permissions `crm.deal.read`, `crm.deal.write`.
     *
     * Pass the revision from `crm.deals.get` as the `ifMatch` request option. A stale revision fails with `PRECONDITION_FAILED`: read again, reapply the change, and retry.
     */
    update: op.dealsUpdate,
  },
  salesPipelines: {
    /**
     * List sales pipelines.
     *
     * Lists organization-shared pipelines and optionally their stages.
     *
     * Requires the permissions `crm.deal.read`.
     *
     * Use `for await` to iterate over all results.
     */
    list: op.salesPipelinesList,
  },
} as const;
