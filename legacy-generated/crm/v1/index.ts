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
     * Create Contact Log
     *
     * Creates a contact note and returns its ID. Retry the same submission with the same idempotency key.
     *
     * Requires the permissions `crm.contact.read`, `crm.contact.write`.
     */
    create: op.contactLogsCreate,
    /**
     * Fetch Contact Logs
     *
     * Lists contact notes for one contact.
     *
     * Requires the permissions `crm.contact.read`.
     */
    list: op.contactLogsList,
  },
  contactTags: {
    /**
     * Assign Contact Tag
     *
     * Assigns one tag to a contact. Assigning a tag the contact already has changes nothing, including after the tag is archived.
     *
     * Requires the permissions `crm.contact.read`, `crm.contact.write`.
     */
    assign: op.contactTagsAssign,
    /**
     * Fetch Contact Tags
     *
     * Lists the organization’s contact tag definitions.
     *
     * Requires the permissions `crm.contact.read`.
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
     * Create Contact
     *
     * Requires the permissions `crm.contact.write`.
     */
    create: op.contactsCreate,
    /**
     * Fetch Contact By ID
     *
     * Retrieves a visible contact by its identifier.
     *
     * Requires the permissions `crm.contact.read`.
     */
    get: op.contactsGet,
    /**
     * Fetch Contacts
     *
     * Lists contacts visible to the caller.
     *
     * Requires the permissions `crm.contact.read`.
     */
    list: op.contactsList,
    /**
     * Partial Update Contact By ID
     *
     * Sets the supplied contact fields. HTTP 200 returns a success envelope.
     *
     * Requires the permissions `crm.contact.write`.
     */
    update: op.contactsUpdate,
  },
  dealFields: {
    /**
     * Update Deal Fields
     *
     * Changes a deal's priority, type and remark. If-Match must carry the revision from the deal's latest read; a stale revision fails with 412 and the caller rereads the deal before retrying. Values equal to the stored ones change nothing.
     *
     * Deprecated: since 2026-11-25; use `crm.deals.update` instead.
     *
     * Requires the permissions `crm.deal.read`, `crm.deal.write`.
     *
     * Pass `if_match` as the revision at `/deal/revision` in the result of `crm.deals.get`, unchanged. A stale revision fails with `PRECONDITION_FAILED`: read again, reapply the change, and retry.
     *
     * @deprecated
     */
    update: op.dealFieldsUpdate,
  },
  deals: {
    /**
     * Create Sales Pipeline Deal
     *
     * Creates a deal in a pipeline stage and returns its ID. CRM names the deal. Reuse the idempotency key to retry the same creation.
     *
     * Requires the permissions `crm.deal.read`, `crm.deal.write`.
     */
    create: op.dealsCreate,
    /**
     * Get Deal
     *
     * Reads a deal and its pipeline placement.
     *
     * Requires the permissions `crm.deal.read`.
     */
    get: op.dealsGet,
    /**
     * List Deals
     *
     * Lists visible deals with their current pipeline and stage.
     *
     * Requires the permissions `crm.deal.read`.
     */
    list: op.dealsList,
    /**
     * Move Deal Stage
     *
     * Moves a deal to another stage of its current pipeline. If-Match must carry the revision from the deal's latest read; a stale revision fails with 412 and the caller rereads the deal before retrying. Moving to the current stage changes nothing.
     *
     * Deprecated: since 2026-11-25; use `crm.deals.update` instead.
     *
     * Requires the permissions `crm.deal.read`, `crm.deal.write`.
     *
     * Pass `if_match` as the revision at `/deal/revision` in the result of `crm.deals.get`, unchanged. A stale revision fails with `PRECONDITION_FAILED`: read again, reapply the change, and retry.
     *
     * @deprecated
     */
    moveStage: op.dealsMoveStage,
    /**
     * Update Deal
     *
     * Changes a deal's stage, priority, type and remark. If-Match must carry the revision from the deal's latest read; a stale revision fails with 412 and the caller rereads the deal before retrying. Values equal to the stored ones change nothing.
     *
     * Requires the permissions `crm.deal.read`, `crm.deal.write`.
     *
     * Pass `if_match` as the revision at `/deal/revision` in the result of `crm.deals.get`, unchanged. A stale revision fails with `PRECONDITION_FAILED`: read again, reapply the change, and retry.
     */
    update: op.dealsUpdate,
  },
  salesPipelines: {
    /**
     * List Pipelines
     *
     * Lists organization-shared pipelines and optionally their stages.
     *
     * Requires the permissions `crm.deal.read`.
     */
    list: op.salesPipelinesList,
  },
} as const;
