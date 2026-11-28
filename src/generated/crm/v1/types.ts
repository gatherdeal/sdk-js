// Generated from the GatherDeal public API contracts. Do not edit.

export interface BatchAddContactTagAssignmentItem {
  /**
   * Contact whose membership to change.
   */
  contact_id: string;
  /**
   * Organization tag to add or remove.
   */
  tag_id: string;
}

/**
 * BatchCreateContactItem is one contact of contacts.batch_create: the single
 * create's fields without the profile image and attributes.
 */
export interface BatchCreateContactItem {
  /**
   * Primary email address.
   */
  email?: string;
  kind: ContactKindParam;
  /**
   * Contact display name.
   */
  name: string;
  /**
   * Primary phone number.
   */
  phone?: string | null;
  /**
   * Preferred language code.
   */
  preferred_language?: string;
  /**
   * Contact remark.
   */
  remark?: string;
}

/**
 * BatchCreateContactLogItem is one note of contact_logs.batch_create: the
 * single create's fields without attachments.
 */
export interface BatchCreateContactLogItem {
  /**
   * Contact to record the note against.
   */
  contact_id: string;
  /**
   * Nonblank note text. Whitespace in the submitted text is preserved.
   */
  content: string;
}

/**
 * BatchCreateContactTagItem is one definition of contact_tags.batch_create.
 */
export interface BatchCreateContactTagItem {
  /**
   * Optional tag description.
   */
  description?: string;
  /**
   * Tag name, unique in the organization.
   */
  name: string;
}

/**
 * BatchRejectedDetails are the details of BATCH_REJECTED.
 */
export interface BatchRejectedDetails {
  /**
   * Complete is true when errors lists every item the owner found failing,
   * false when the list is partial (a write-time failure or the size
   * budget). Every index not listed is uncommitted with validity unknown.
   */
  complete: boolean;
}

export interface BatchRemoveContactTagAssignmentItem {
  /**
   * Contact whose membership to change.
   */
  contact_id: string;
  /**
   * Organization tag to add or remove.
   */
  tag_id: string;
}

/**
 * ClientUpgradeRequiredDetails are the details of CLIENT_UPGRADE_REQUIRED.
 */
export interface ClientUpgradeRequiredDetails {
  /**
   * Client is the user-agent product name, e.g. "gatherdeal-cli".
   */
  client: string;
  /**
   * CurrentVersion is the version the request presented.
   */
  current_version: string;
  /**
   * MinVersion is the minimum accepted version (SemVer).
   */
  min_version: string;
}

/**
 * Conjunction represents a logical operator used to combine filter Rule values.
 */
export type Conjunction = "AND" | "OR";

export interface ContactAttributeBrief {
  attribute: ContactAttributeDefinition;
  /**
   * Attribute definition identifier.
   */
  attribute_id: string;
  /**
   * Contact holding the attribute.
   */
  contact_id: string;
  /**
   * When the attribute was assigned.
   */
  create_at: string;
  /**
   * Attribute association identifier.
   */
  id: string;
  /**
   * When the association was last updated.
   */
  update_at: string;
}

export interface ContactAttributeDefinition {
  /**
   * When the definition was created.
   */
  create_at: string;
  /**
   * Definition identifier.
   */
  id: string;
  /**
   * Whether the definition is enabled.
   */
  is_enabled: boolean;
  /**
   * Whether the definition is required.
   */
  is_required: boolean;
  /**
   * Whether values must be unique.
   */
  is_unique: boolean;
  kind: ContactAttributeKind;
  /**
   * Definition display name.
   */
  name: string;
  namespace: ContactAttributeNamespace;
  /**
   * Organization that owns the definition.
   */
  organization_id: string;
  /**
   * When the definition was last updated.
   */
  update_at: string;
}

/**
 * The kind of value an attribute accepts: text, number, or a selection.
 */
export type ContactAttributeKind = "number" | "select" | "text" | (string & {});

/**
 * ContactAttributeNamespace partitions attributes between built-in
 * system attributes and tenant-defined custom attributes.
 */
export type ContactAttributeNamespace = "custom" | "system" | (string & {});

export interface ContactCompanyProfile {
  /**
   * Incorporation country code, when specified.
   */
  incorporation_country?: string;
}

export interface ContactEmailBrief {
  /**
   * Contact that owns the email record.
   */
  contact_id: string;
  /**
   * When the email record was created.
   */
  create_at: string;
  /**
   * Email address.
   */
  email: string;
  /**
   * Email record identifier.
   */
  id: string;
  /**
   * Whether this is the primary email.
   */
  is_primary: boolean;
  /**
   * When the email record was last updated.
   */
  update_at: string;
}

export interface ContactExpansionLimitDetails {
  /**
   * Query parameter requesting the oversized expansion.
   */
  expansion: string;
  /**
   * Maximum items per contact.
   */
  limit: number;
}

/**
 * ContactKind represents the kind of contact (personal vs company).
 */
export type ContactKind = "company" | "personal" | (string & {});

/**
 * ContactKind represents the kind of contact (personal vs company).
 */
export type ContactKindParam = "company" | "personal";

export interface ContactLog {
  /**
   * Identifier of the contact the note belongs to.
   */
  contact_id: string;
  /**
   * Full note text, which may be empty on historical notes.
   */
  content: string;
  /**
   * When the note was created.
   */
  create_at: string;
  /**
   * Identifier of the recorded author when available.
   */
  create_by_user_id?: string;
  /**
   * Identifier of the contact note.
   */
  id: string;
  /**
   * When the note was last updated.
   */
  update_at: string;
}

export interface ContactPersonProfile {
  /**
   * Date of birth, when available.
   */
  birthday?: string;
  /**
   * Citizenship country code, when specified.
   */
  citizenship_country?: string;
  /**
   * Recorded ethnicity, or empty when unspecified.
   */
  ethnicity: string;
  gender?: PersonGender;
  /**
   * Nationality country code, when specified.
   */
  nationality?: string;
}

export interface ContactPhoneBrief {
  /**
   * Contact that owns the phone record.
   */
  contact_id: string;
  /**
   * When the phone record was created.
   */
  create_at: string;
  /**
   * Phone record identifier.
   */
  id: string;
  /**
   * Whether this is the primary phone.
   */
  is_primary: boolean;
  /**
   * Phone number with dialing code.
   */
  phone: string | null;
  /**
   * When the phone record was last updated.
   */
  update_at: string;
}

/**
 * ContactTagAddOutcome is what contact_tag_assignments.batch_add did to one pair.
 */
export type ContactTagAddOutcome = "added" | "unchanged" | (string & {});

/**
 * ContactTagAddResult reports one pair of contact_tag_assignments.batch_add.
 */
export interface ContactTagAddResult {
  outcome: ContactTagAddOutcome;
}

export interface ContactTagAssignment {
  /**
   * When the tag was assigned.
   */
  assigned_at: string;
  /**
   * Assigned tag identifier.
   */
  id: string;
  /**
   * Assigned tag name.
   */
  name: string;
}

export interface ContactTag {
  /**
   * When the tag was created.
   */
  create_at: string;
  /**
   * Tag description, or empty when unset.
   */
  description: string;
  /**
   * Tag identifier.
   */
  id: string;
  /**
   * Whether the tag is archived.
   */
  is_archived: boolean;
  /**
   * Tag name.
   */
  name: string;
  /**
   * When the tag was last updated.
   */
  update_at: string;
}

/**
 * ContactTagRemoveOutcome is what contact_tag_assignments.batch_remove did to one pair.
 */
export type ContactTagRemoveOutcome = "removed" | "unchanged" | (string & {});

/**
 * ContactTagRemoveResult reports one pair of contact_tag_assignments.batch_remove.
 */
export interface ContactTagRemoveResult {
  outcome: ContactTagRemoveOutcome;
}

/**
 * Contact details returned by the contact list and detail endpoints.
 */
export interface Contact {
  /**
   * Name to address the customer by: the account name of a verified
   * contact; absent otherwise, never the organization's label.
   */
  addressing_name?: string;
  /**
   * Up to 100 visible attribute associations and definitions.
   */
  attributes?: ContactAttributeBrief[];
  capabilities: ContactCapabilities;
  company?: ContactCompanyProfile;
  /**
   * When the contact was created.
   */
  create_at: string;
  /**
   * User who created the contact, when recorded.
   */
  create_by_user_id?: string;
  /**
   * Business customer code, absent until assigned.
   */
  customer_code?: string;
  /**
   * When the contact was deleted, if applicable.
   */
  delete_at?: string;
  /**
   * Primary email, when present.
   */
  emails?: ContactEmailBrief[];
  /**
   * Contact identifier.
   */
  id: string;
  /**
   * Whether the contact is linked to a verified account.
   */
  is_verified: boolean;
  kind: ContactKind;
  /**
   * Contact display name: the organization's label for the contact.
   */
  name: string;
  /**
   * Organization that owns the contact.
   */
  organization_id: string;
  /**
   * Home outlet, when assigned.
   */
  outlet_id?: string;
  person?: ContactPersonProfile;
  /**
   * Primary phone, when present.
   */
  phones?: ContactPhoneBrief[];
  /**
   * Preferred language code, or empty when unset.
   */
  preferred_language: string;
  /**
   * Reference to the contact's profile image, when set.
   */
  profile_image?: string;
  /**
   * Referring contact, when present.
   */
  referrer_id?: string;
  /**
   * Contact remark.
   */
  remark: string;
  /**
   * Up to 100 visible tag assignments.
   */
  tags?: ContactTagAssignment[];
  /**
   * When the contact was last updated.
   */
  update_at: string;
  /**
   * Linked user account, when present.
   */
  user_id?: string;
  /**
   * Linked account's name, synced from identity; read-only.
   */
  user_name?: string;
}

export interface ContactCapabilities {
  /**
   * Whether staff attachments may be read.
   */
  can_attachment_read_staff: boolean;
  /**
   * Whether contact attachments may be shared.
   */
  can_attachment_share: boolean;
  /**
   * Whether the caller may read the customer information for this contact.
   */
  can_customer_read: boolean;
  /**
   * Whether the caller may delete the contact.
   */
  can_delete: boolean;
  /**
   * Whether the caller may read the contact.
   */
  can_read: boolean;
  /**
   * Whether the caller may reference the contact.
   */
  can_reference: boolean;
  /**
   * Whether the caller may read the contact statement.
   */
  can_statement_read: boolean;
  /**
   * Whether the caller may share the contact statement.
   */
  can_statement_share: boolean;
  /**
   * Whether the caller may update the contact.
   */
  can_update: boolean;
  /**
   * Whether the caller may update the contact's identity.
   */
  can_update_identity: boolean;
  /**
   * Contact identifier.
   */
  id: string;
}

/**
 * Supply `person` or `company` to set profile details for the matching
 * `kind`. Omitting profile details creates an empty profile.
 */
export interface CreateContactParam {
  /**
   * Primary email address.
   */
  email?: string;
  kind: ContactKindParam;
  /**
   * Contact display name.
   */
  name: string;
  /**
   * Primary phone number.
   */
  phone?: string | null;
  /**
   * Preferred language code.
   */
  preferred_language?: string;
  /**
   * Contact remark.
   */
  remark?: string;
}

export interface CreateContactLogParam {
  /**
   * Contact to record the note against.
   */
  contact_id: string;
  /**
   * Nonblank note text. Whitespace in the submitted text is preserved.
   */
  content: string;
}

export interface CreateContactTagParam {
  /**
   * Optional tag description.
   */
  description?: string;
  /**
   * Tag name, unique in the organization.
   */
  name: string;
}

/**
 * The deal is homed at the selected outlet, or at the caller's only deal-write
 * outlet when none is selected.
 */
export interface CreateSalesPipelineDealParam {
  /**
   * Pipeline that holds the deal.
   */
  pipeline_id: string;
  priority?: SalesPipelineDealPriorityParam;
  /**
   * Deal remark of at most 500 characters.
   */
  remark?: string;
  /**
   * Initial stage; it must belong to the pipeline.
   */
  stage_id: string;
  type?: SalesPipelineDealTypeParam;
}

export interface Deal {
  /**
   * Creation time in UTC.
   */
  create_at: string;
  /**
   * Deal identifier.
   */
  id: string;
  /**
   * Deal name.
   */
  name: string;
  pipeline: DealPipeline;
  /**
   * ID of the pipeline containing the deal.
   */
  pipeline_id: string;
  priority?: SalesPipelineDealPriority;
  /**
   * Deal remark, when present.
   */
  remark?: string;
  /**
   * Revision is the deal's opaque strong entity tag, quotes included. Send it
   * unchanged as If-Match to update the deal; any write to the deal changes
   * it.
   */
  revision: string;
  stage: DealStage;
  /**
   * ID of the deal's current stage.
   */
  stage_id: string;
  type?: SalesPipelineDealType;
  /**
   * Last update time in UTC.
   */
  update_at: string;
}

export interface DealSummary {
  /**
   * Creation time in UTC.
   */
  create_at: string;
  /**
   * Deal identifier.
   */
  id: string;
  /**
   * Deal name.
   */
  name: string;
  pipeline: DealPipeline;
  /**
   * ID of the pipeline containing the deal.
   */
  pipeline_id: string;
  priority?: SalesPipelineDealPriority;
  /**
   * Revision is the deal's opaque strong entity tag, quotes included. Send it
   * unchanged as If-Match to update the deal; any write to the deal changes
   * it.
   */
  revision: string;
  stage: DealStage;
  /**
   * ID of the deal's current stage.
   */
  stage_id: string;
  type?: SalesPipelineDealType;
  /**
   * Last update time in UTC.
   */
  update_at: string;
}

export interface DealPipeline {
  /**
   * ID of the deal's pipeline.
   */
  id: string;
  /**
   * Current pipeline name.
   */
  name: string;
}

export interface DealStage {
  /**
   * ID of the deal's stage.
   */
  id: string;
  /**
   * Current stage name.
   */
  name: string;
  /**
   * Zero-based position within the pipeline.
   */
  sequence: number;
}

/**
 * DelegatedAccessDeniedDetails are the details of a delegated-access refusal.
 */
export interface DelegatedAccessDeniedDetails {
  /**
   * MissingPermissions lists the permission keys the access lacks (reason
   * missing_permissions).
   */
  missing_permissions?: string[];
  reason: DelegatedAccessDenyReason;
}

/**
 * DelegatedAccessDenyReason names why the delegated-access gate refused a
 * request. It is the wire reason of every 403 DELEGATED_ACCESS_* code (and of
 * the 401 DELEGATED_ACCESS_CREDENTIAL_LOCATION).
 */
export type DelegatedAccessDenyReason = "audience_mismatch" | "credential_location" | "effect_not_allowed" | "expansion_not_allowed" | "feature_not_entitled" | "filter_not_allowed" | "impersonation_not_allowed" | "kind_not_allowed" | "missing_permissions" | "organization_key_not_admitted" | "organization_mismatch" | "outlet_not_allowed" | "principal_inactive" | "route_not_allowed" | "target_mismatch" | (string & {});

/**
 * DelegatedAccessInactiveDetails are the details of DELEGATED_ACCESS_INACTIVE.
 */
export interface DelegatedAccessInactiveDetails {
  reason: DelegatedAccessInactiveReason;
}

/**
 * DelegatedAccessInactiveReason names why the server reports a delegated
 * credential inactive.
 */
export type DelegatedAccessInactiveReason = "expired" | "idle" | "revoked" | (string & {});

/**
 * DelegatedAccessUnsupportedDetails are the details of
 * DELEGATED_ACCESS_UNSUPPORTED: ContractVersion is the minimum
 * delegated_access_contract_version the server requires.
 */
export interface DelegatedAccessUnsupportedDetails {
  contract_version: number;
}

/**
 * Group combines `rules` and nested `groups` using `conjunction` (`AND` or
 * `OR`). Set `negated` to true to reverse the result of the whole group.
 *
 * To filter by related resources, set `edge` to the relationship name and
 * choose a supported `quantifier` (`SOME`, `EVERY`, or `NONE`). Use field
 * names from the related resource in that group's rules.
 */
export interface Group {
  conjunction?: Conjunction;
  edge?: string;
  groups?: Array<Group | null> | null;
  negated?: boolean;
  quantifier?: Quantifier;
  rules?: Array<Rule | null> | null;
}

/**
 * KeyedAcknowledgment confirms a keyed write and names the resource it
 * affected. Retrying the write with the same idempotency key returns the same
 * acknowledgment.
 */
export interface KeyedAcknowledgment {
  /**
   * Identifier of the affected resource.
   */
  id: string;
}

/**
 * Operator represents a comparison operator used in a filter Rule.
 */
export type Operator = "BETWEEN" | "CONTAINS" | "CONTAINS_FOLD" | "DWITHIN" | "ENDS_WITH" | "ENDS_WITH_FOLD" | "EQ" | "EQ_FOLD" | "GT" | "GTE" | "IN" | "IS_NOT_NULL" | "IS_NULL" | "LT" | "LTE" | "NEQ" | "NOT_IN" | "STARTS_WITH" | "STARTS_WITH_FOLD";

/**
 * PaginationCursorInvalidDetails are the details of PAGINATION_CURSOR_INVALID.
 */
export interface PaginationCursorInvalidDetails {
  reason: PaginationCursorReason;
}

/**
 * PaginationCursorReason refines PAGINATION_CURSOR_INVALID.
 */
export type PaginationCursorReason = "malformed" | "query_mismatch" | "sort_mismatch" | "version" | (string & {});

/**
 * PaginationParamsInvalidDetails are the details of PAGINATION_PARAMS_INVALID.
 */
export interface PaginationParamsInvalidDetails {
  /**
   * MaxOffset is the offset cap, set with reason offset_too_large.
   */
  max_offset?: number;
  reason: PaginationParamsReason;
}

/**
 * PaginationParamsReason refines PAGINATION_PARAMS_INVALID.
 */
export type PaginationParamsReason = "offset_too_large" | "selector_conflict" | "sort_not_seekable" | "sort_unknown" | "total_invalid" | (string & {});

/**
 * Omitted fields keep their values. Null clears the primary phone, email,
 * remark or preferred language. The contact name must remain nonempty.
 */
export interface PartialUpdateContactByIDParam {
  /**
   * Primary email. Pass null to remove.
   */
  email?: string | null;
  /**
   * Nonempty contact display name.
   */
  name?: string;
  /**
   * Primary phone. Pass null to remove.
   */
  phone?: string | null;
  /**
   * Language code, or null to clear.
   */
  preferred_language?: string | null;
  /**
   * Contact remark. Pass null to clear.
   */
  remark?: string | null;
}

/**
 * PersonGender records the contact's reported gender.
 */
export type PersonGender = "female" | "male" | "non_binary" | "other" | "prefer_not_to_say" | (string & {});

export interface SalesPipeline {
  /**
   * Creation time in UTC.
   */
  create_at: string;
  /**
   * Pipeline identifier.
   */
  id: string;
  /**
   * Pipeline name.
   */
  name: string;
  /**
   * Stages ordered by sequence and ID, when requested.
   */
  stages?: SalesPipelineStage[];
}

export interface SalesPipelineStage {
  /**
   * Stage identifier.
   */
  id: string;
  /**
   * Stage name.
   */
  name: string;
  /**
   * Closing probability in percent.
   */
  probability: number;
  /**
   * Zero-based position within the pipeline.
   */
  sequence: number;
}

/**
 * Quantifier controls how a filter group matches related resources when
 * `edge` is set. Use `SOME` for at least one match, `EVERY` for all, or `NONE`
 * for no matches. Only resources you can read count.
 */
export type Quantifier = "EVERY" | "NONE" | "SOME";

/**
 * Rule is a single filter condition. Set `field` to the field name and `op`
 * to the comparison operator. Supply a JSON `value` if the operator takes one.
 */
export interface Rule {
  field?: string;
  op?: Operator;
  value?: unknown;
}

/**
 * SalesPipelineDealPriority is the urgency level applied to a deal.
 */
export type SalesPipelineDealPriority = "high" | "low" | "medium" | (string & {});

/**
 * SalesPipelineDealPriority is the urgency level applied to a deal.
 */
export type SalesPipelineDealPriorityParam = "high" | "low" | "medium";

/**
 * SalesPipelineDealType distinguishes new acquisitions from
 * existing-customer expansion deals.
 */
export type SalesPipelineDealType = "existing" | "new" | (string & {});

/**
 * SalesPipelineDealType distinguishes new acquisitions from
 * existing-customer expansion deals.
 */
export type SalesPipelineDealTypeParam = "existing" | "new";

export interface SalesPipelineStageLimitDetails {
  /**
   * Requested expansion.
   */
  expansion: string;
  /**
   * Maximum stages per pipeline.
   */
  limit: number;
}

/**
 * TotalMode selects whether a list response counts its rows.
 */
export type TotalMode = "exact" | "none";

/**
 * An omitted field keeps its value and null clears it. A remark keeps 1 to 500
 * characters after trimming each line.
 */
export interface UpdateDealParam {
  priority?: SalesPipelineDealPriorityParam | null;
  /**
   * Deal remark; null clears it.
   */
  remark?: string | null;
  /**
   * Target stage; it must belong to the deal's current pipeline.
   */
  stage_id?: string;
  type?: SalesPipelineDealTypeParam | null;
}
