// Generated from the GatherDeal public API contracts. Do not edit.

/**
 * BAD_REQUEST (400): The request is invalid.
 */
export interface BadRequestProblem {
  code: "BAD_REQUEST";
  correlation_id?: string;
  /**
   * Localized instance-specific text.
   */
  detail?: string;
  /**
   * urn:gatherdeal:request:<correlation_id>
   */
  instance?: string;
  record?: ProblemRecord;
  retryable: false;
  status: 400;
  /**
   * Localized by Accept-Language; English: "The request is invalid."
   */
  title: string;
  /**
   * Problem type URI, one-to-one with code; documentation only, never dereferenced at runtime.
   */
  type: "https://docs.gatherdeal.ai/errors/BAD_REQUEST";
}

/**
 * CRM_CONTACT_CHILD_KIND_MISMATCH (422): Contact child does not match the contact kind.
 */
export interface CRMContactChildKindMismatchProblem {
  code: "CRM_CONTACT_CHILD_KIND_MISMATCH";
  correlation_id?: string;
  /**
   * Localized instance-specific text.
   */
  detail?: string;
  /**
   * urn:gatherdeal:request:<correlation_id>
   */
  instance?: string;
  record?: ProblemRecord;
  retryable: false;
  status: 422;
  /**
   * Localized by Accept-Language; English: "Contact child does not match the contact kind."
   */
  title: string;
  /**
   * Problem type URI, one-to-one with code; documentation only, never dereferenced at runtime.
   */
  type: "https://docs.gatherdeal.ai/errors/CRM_CONTACT_CHILD_KIND_MISMATCH";
}

/**
 * CRM_CONTACT_EMAIL_OCCUPIED (409): Contact email is already in use.
 */
export interface CRMContactEmailOccupiedProblem {
  code: "CRM_CONTACT_EMAIL_OCCUPIED";
  correlation_id?: string;
  /**
   * Localized instance-specific text.
   */
  detail?: string;
  /**
   * urn:gatherdeal:request:<correlation_id>
   */
  instance?: string;
  record?: ProblemRecord;
  retryable: false;
  status: 409;
  /**
   * Localized by Accept-Language; English: "Contact email is already in use."
   */
  title: string;
  /**
   * Problem type URI, one-to-one with code; documentation only, never dereferenced at runtime.
   */
  type: "https://docs.gatherdeal.ai/errors/CRM_CONTACT_EMAIL_OCCUPIED";
}

/**
 * CRM_CONTACT_EXPANSION_LIMIT (422): Contact expansion exceeds its limit.
 */
export interface CRMContactExpansionLimitProblem {
  code: "CRM_CONTACT_EXPANSION_LIMIT";
  correlation_id?: string;
  /**
   * Localized instance-specific text.
   */
  detail?: string;
  details: ContactExpansionLimitDetails;
  /**
   * urn:gatherdeal:request:<correlation_id>
   */
  instance?: string;
  record?: ProblemRecord;
  retryable: false;
  status: 422;
  /**
   * Localized by Accept-Language; English: "Contact expansion exceeds its limit."
   */
  title: string;
  /**
   * Problem type URI, one-to-one with code; documentation only, never dereferenced at runtime.
   */
  type: "https://docs.gatherdeal.ai/errors/CRM_CONTACT_EXPANSION_LIMIT";
}

/**
 * CRM_CONTACT_LOG_NOT_FOUND (404): Contact log not found.
 */
export interface CRMContactLogNotFoundProblem {
  code: "CRM_CONTACT_LOG_NOT_FOUND";
  correlation_id?: string;
  /**
   * Localized instance-specific text.
   */
  detail?: string;
  /**
   * urn:gatherdeal:request:<correlation_id>
   */
  instance?: string;
  record?: ProblemRecord;
  retryable: false;
  status: 404;
  /**
   * Localized by Accept-Language; English: "Contact log not found."
   */
  title: string;
  /**
   * Problem type URI, one-to-one with code; documentation only, never dereferenced at runtime.
   */
  type: "https://docs.gatherdeal.ai/errors/CRM_CONTACT_LOG_NOT_FOUND";
}

/**
 * CRM_CONTACT_MASTER_OUTLET_MISSING (422): Organization has no master outlet.
 */
export interface CRMContactMasterOutletMissingProblem {
  code: "CRM_CONTACT_MASTER_OUTLET_MISSING";
  correlation_id?: string;
  /**
   * Localized instance-specific text.
   */
  detail?: string;
  /**
   * urn:gatherdeal:request:<correlation_id>
   */
  instance?: string;
  record?: ProblemRecord;
  retryable: false;
  status: 422;
  /**
   * Localized by Accept-Language; English: "Organization has no master outlet."
   */
  title: string;
  /**
   * Problem type URI, one-to-one with code; documentation only, never dereferenced at runtime.
   */
  type: "https://docs.gatherdeal.ai/errors/CRM_CONTACT_MASTER_OUTLET_MISSING";
}

/**
 * CRM_CONTACT_NOT_FOUND (404): Contact not found.
 */
export interface CRMContactNotFoundProblem {
  code: "CRM_CONTACT_NOT_FOUND";
  correlation_id?: string;
  /**
   * Localized instance-specific text.
   */
  detail?: string;
  /**
   * urn:gatherdeal:request:<correlation_id>
   */
  instance?: string;
  record?: ProblemRecord;
  retryable: false;
  status: 404;
  /**
   * Localized by Accept-Language; English: "Contact not found."
   */
  title: string;
  /**
   * Problem type URI, one-to-one with code; documentation only, never dereferenced at runtime.
   */
  type: "https://docs.gatherdeal.ai/errors/CRM_CONTACT_NOT_FOUND";
}

/**
 * CRM_CONTACT_OUTLET_REQUIRED (422): Select an outlet for the new contact.
 */
export interface CRMContactOutletRequiredProblem {
  code: "CRM_CONTACT_OUTLET_REQUIRED";
  correlation_id?: string;
  /**
   * Localized instance-specific text.
   */
  detail?: string;
  /**
   * urn:gatherdeal:request:<correlation_id>
   */
  instance?: string;
  record?: ProblemRecord;
  retryable: false;
  status: 422;
  /**
   * Localized by Accept-Language; English: "Select an outlet for the new contact."
   */
  title: string;
  /**
   * Problem type URI, one-to-one with code; documentation only, never dereferenced at runtime.
   */
  type: "https://docs.gatherdeal.ai/errors/CRM_CONTACT_OUTLET_REQUIRED";
}

/**
 * CRM_CONTACT_PHONE_OCCUPIED (409): Contact phone number is already in use.
 */
export interface CRMContactPhoneOccupiedProblem {
  code: "CRM_CONTACT_PHONE_OCCUPIED";
  correlation_id?: string;
  /**
   * Localized instance-specific text.
   */
  detail?: string;
  /**
   * urn:gatherdeal:request:<correlation_id>
   */
  instance?: string;
  record?: ProblemRecord;
  retryable: false;
  status: 409;
  /**
   * Localized by Accept-Language; English: "Contact phone number is already in use."
   */
  title: string;
  /**
   * Problem type URI, one-to-one with code; documentation only, never dereferenced at runtime.
   */
  type: "https://docs.gatherdeal.ai/errors/CRM_CONTACT_PHONE_OCCUPIED";
}

/**
 * CRM_CONTACT_REFERRAL_CIRCULAR (422): Referral would create a circular referral chain.
 */
export interface CRMContactReferralCircularProblem {
  code: "CRM_CONTACT_REFERRAL_CIRCULAR";
  correlation_id?: string;
  /**
   * Localized instance-specific text.
   */
  detail?: string;
  /**
   * urn:gatherdeal:request:<correlation_id>
   */
  instance?: string;
  record?: ProblemRecord;
  retryable: false;
  status: 422;
  /**
   * Localized by Accept-Language; English: "Referral would create a circular referral chain."
   */
  title: string;
  /**
   * Problem type URI, one-to-one with code; documentation only, never dereferenced at runtime.
   */
  type: "https://docs.gatherdeal.ai/errors/CRM_CONTACT_REFERRAL_CIRCULAR";
}

/**
 * CRM_CONTACT_REFERRER_NOT_ALLOWED (422): Contact is not allowed to be set as a referrer.
 */
export interface CRMContactReferrerNotAllowedProblem {
  code: "CRM_CONTACT_REFERRER_NOT_ALLOWED";
  correlation_id?: string;
  /**
   * Localized instance-specific text.
   */
  detail?: string;
  /**
   * urn:gatherdeal:request:<correlation_id>
   */
  instance?: string;
  record?: ProblemRecord;
  retryable: false;
  status: 422;
  /**
   * Localized by Accept-Language; English: "Contact is not allowed to be set as a referrer."
   */
  title: string;
  /**
   * Problem type URI, one-to-one with code; documentation only, never dereferenced at runtime.
   */
  type: "https://docs.gatherdeal.ai/errors/CRM_CONTACT_REFERRER_NOT_ALLOWED";
}

/**
 * CRM_CONTACT_TAG_NOT_FOUND (404): Contact tag not found.
 */
export interface CRMContactTagNotFoundProblem {
  code: "CRM_CONTACT_TAG_NOT_FOUND";
  correlation_id?: string;
  /**
   * Localized instance-specific text.
   */
  detail?: string;
  /**
   * urn:gatherdeal:request:<correlation_id>
   */
  instance?: string;
  record?: ProblemRecord;
  retryable: false;
  status: 404;
  /**
   * Localized by Accept-Language; English: "Contact tag not found."
   */
  title: string;
  /**
   * Problem type URI, one-to-one with code; documentation only, never dereferenced at runtime.
   */
  type: "https://docs.gatherdeal.ai/errors/CRM_CONTACT_TAG_NOT_FOUND";
}

/**
 * CRM_CONTACT_VERIFIED_IMMUTABLE (422): A verified contact cannot be changed or deleted.
 */
export interface CRMContactVerifiedImmutableProblem {
  code: "CRM_CONTACT_VERIFIED_IMMUTABLE";
  correlation_id?: string;
  /**
   * Localized instance-specific text.
   */
  detail?: string;
  /**
   * urn:gatherdeal:request:<correlation_id>
   */
  instance?: string;
  record?: ProblemRecord;
  retryable: false;
  status: 422;
  /**
   * Localized by Accept-Language; English: "A verified contact cannot be changed or deleted."
   */
  title: string;
  /**
   * Problem type URI, one-to-one with code; documentation only, never dereferenced at runtime.
   */
  type: "https://docs.gatherdeal.ai/errors/CRM_CONTACT_VERIFIED_IMMUTABLE";
}

/**
 * CRM_DEAL_OUTLET_REQUIRED (422): Select an outlet for the new deal.
 */
export interface CRMDealOutletRequiredProblem {
  code: "CRM_DEAL_OUTLET_REQUIRED";
  correlation_id?: string;
  /**
   * Localized instance-specific text.
   */
  detail?: string;
  /**
   * urn:gatherdeal:request:<correlation_id>
   */
  instance?: string;
  record?: ProblemRecord;
  retryable: false;
  status: 422;
  /**
   * Localized by Accept-Language; English: "Select an outlet for the new deal."
   */
  title: string;
  /**
   * Problem type URI, one-to-one with code; documentation only, never dereferenced at runtime.
   */
  type: "https://docs.gatherdeal.ai/errors/CRM_DEAL_OUTLET_REQUIRED";
}

/**
 * CRM_FILE_NOT_FOUND (404): File not found.
 */
export interface CRMFileNotFoundProblem {
  code: "CRM_FILE_NOT_FOUND";
  correlation_id?: string;
  /**
   * Localized instance-specific text.
   */
  detail?: string;
  /**
   * urn:gatherdeal:request:<correlation_id>
   */
  instance?: string;
  record?: ProblemRecord;
  retryable: false;
  status: 404;
  /**
   * Localized by Accept-Language; English: "File not found."
   */
  title: string;
  /**
   * Problem type URI, one-to-one with code; documentation only, never dereferenced at runtime.
   */
  type: "https://docs.gatherdeal.ai/errors/CRM_FILE_NOT_FOUND";
}

/**
 * CRM_RELATED_CONTACT_NOT_ALLOWED (403): The change affects a contact outside your access.
 */
export interface CRMRelatedContactNotAllowedProblem {
  code: "CRM_RELATED_CONTACT_NOT_ALLOWED";
  correlation_id?: string;
  /**
   * Localized instance-specific text.
   */
  detail?: string;
  /**
   * urn:gatherdeal:request:<correlation_id>
   */
  instance?: string;
  record?: ProblemRecord;
  retryable: false;
  status: 403;
  /**
   * Localized by Accept-Language; English: "The change affects a contact outside your access."
   */
  title: string;
  /**
   * Problem type URI, one-to-one with code; documentation only, never dereferenced at runtime.
   */
  type: "https://docs.gatherdeal.ai/errors/CRM_RELATED_CONTACT_NOT_ALLOWED";
}

/**
 * CRM_SALES_PIPELINE_DEAL_NOT_FOUND (404): Sales pipeline deal not found.
 */
export interface CRMSalesPipelineDealNotFoundProblem {
  code: "CRM_SALES_PIPELINE_DEAL_NOT_FOUND";
  correlation_id?: string;
  /**
   * Localized instance-specific text.
   */
  detail?: string;
  /**
   * urn:gatherdeal:request:<correlation_id>
   */
  instance?: string;
  record?: ProblemRecord;
  retryable: false;
  status: 404;
  /**
   * Localized by Accept-Language; English: "Sales pipeline deal not found."
   */
  title: string;
  /**
   * Problem type URI, one-to-one with code; documentation only, never dereferenced at runtime.
   */
  type: "https://docs.gatherdeal.ai/errors/CRM_SALES_PIPELINE_DEAL_NOT_FOUND";
}

/**
 * CRM_SALES_PIPELINE_NOT_FOUND (404): Sales pipeline not found.
 */
export interface CRMSalesPipelineNotFoundProblem {
  code: "CRM_SALES_PIPELINE_NOT_FOUND";
  correlation_id?: string;
  /**
   * Localized instance-specific text.
   */
  detail?: string;
  /**
   * urn:gatherdeal:request:<correlation_id>
   */
  instance?: string;
  record?: ProblemRecord;
  retryable: false;
  status: 404;
  /**
   * Localized by Accept-Language; English: "Sales pipeline not found."
   */
  title: string;
  /**
   * Problem type URI, one-to-one with code; documentation only, never dereferenced at runtime.
   */
  type: "https://docs.gatherdeal.ai/errors/CRM_SALES_PIPELINE_NOT_FOUND";
}

/**
 * CRM_SALES_PIPELINE_STAGE_LIMIT (422): Pipeline stage expansion exceeds its limit.
 */
export interface CRMSalesPipelineStageLimitProblem {
  code: "CRM_SALES_PIPELINE_STAGE_LIMIT";
  correlation_id?: string;
  /**
   * Localized instance-specific text.
   */
  detail?: string;
  details: SalesPipelineStageLimitDetails;
  /**
   * urn:gatherdeal:request:<correlation_id>
   */
  instance?: string;
  record?: ProblemRecord;
  retryable: false;
  status: 422;
  /**
   * Localized by Accept-Language; English: "Pipeline stage expansion exceeds its limit."
   */
  title: string;
  /**
   * Problem type URI, one-to-one with code; documentation only, never dereferenced at runtime.
   */
  type: "https://docs.gatherdeal.ai/errors/CRM_SALES_PIPELINE_STAGE_LIMIT";
}

/**
 * CRM_SALES_PIPELINE_STAGE_NOT_FOUND (404): Sales pipeline stage not found.
 */
export interface CRMSalesPipelineStageNotFoundProblem {
  code: "CRM_SALES_PIPELINE_STAGE_NOT_FOUND";
  correlation_id?: string;
  /**
   * Localized instance-specific text.
   */
  detail?: string;
  /**
   * urn:gatherdeal:request:<correlation_id>
   */
  instance?: string;
  record?: ProblemRecord;
  retryable: false;
  status: 404;
  /**
   * Localized by Accept-Language; English: "Sales pipeline stage not found."
   */
  title: string;
  /**
   * Problem type URI, one-to-one with code; documentation only, never dereferenced at runtime.
   */
  type: "https://docs.gatherdeal.ai/errors/CRM_SALES_PIPELINE_STAGE_NOT_FOUND";
}

/**
 * CLIENT_CLOSED_REQUEST (499): The client closed the request.
 */
export interface ClientClosedRequestProblem {
  code: "CLIENT_CLOSED_REQUEST";
  correlation_id?: string;
  /**
   * Localized instance-specific text.
   */
  detail?: string;
  /**
   * urn:gatherdeal:request:<correlation_id>
   */
  instance?: string;
  record?: ProblemRecord;
  retryable: false;
  status: 499;
  /**
   * Localized by Accept-Language; English: "The client closed the request."
   */
  title: string;
  /**
   * Problem type URI, one-to-one with code; documentation only, never dereferenced at runtime.
   */
  type: "https://docs.gatherdeal.ai/errors/CLIENT_CLOSED_REQUEST";
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
 * CLIENT_UPGRADE_REQUIRED (426): This client version is no longer supported. Update the client to continue.
 */
export interface ClientUpgradeRequiredProblem {
  code: "CLIENT_UPGRADE_REQUIRED";
  correlation_id?: string;
  /**
   * Localized instance-specific text.
   */
  detail?: string;
  details: ClientUpgradeRequiredDetails;
  /**
   * urn:gatherdeal:request:<correlation_id>
   */
  instance?: string;
  record?: ProblemRecord;
  retryable: false;
  status: 426;
  /**
   * Localized by Accept-Language; English: "This client version is no longer supported. Update the client to continue."
   */
  title: string;
  /**
   * Problem type URI, one-to-one with code; documentation only, never dereferenced at runtime.
   */
  type: "https://docs.gatherdeal.ai/errors/CLIENT_UPGRADE_REQUIRED";
}

/**
 * CONFLICT (409): The request conflicts with the current state of the resource.
 */
export interface ConflictProblem {
  code: "CONFLICT";
  correlation_id?: string;
  /**
   * Localized instance-specific text.
   */
  detail?: string;
  /**
   * urn:gatherdeal:request:<correlation_id>
   */
  instance?: string;
  record?: ProblemRecord;
  retryable: false;
  status: 409;
  /**
   * Localized by Accept-Language; English: "The request conflicts with the current state of the resource."
   */
  title: string;
  /**
   * Problem type URI, one-to-one with code; documentation only, never dereferenced at runtime.
   */
  type: "https://docs.gatherdeal.ai/errors/CONFLICT";
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
export type ContactKindRequest = "company" | "personal";

export interface ContactLogBrief {
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

export interface ContactTagListBrief {
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
 * Contact details returned by the contact list and detail endpoints.
 */
export interface ContactView {
  /**
   * Name to address the customer by: the account name of a verified
   * contact; absent otherwise, never the organization's label.
   */
  addressing_name?: string;
  /**
   * Up to 100 visible attribute associations and definitions.
   */
  attributes?: ContactAttributeBrief[];
  capabilities: ContactViewCapabilities;
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

export interface ContactViewCapabilities {
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
export interface CreateContactInput {
  /**
   * Primary email address.
   */
  email?: string;
  kind: ContactKindRequest;
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

export interface CreateContactLogInput {
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
 * The deal is homed at the selected outlet, or at the caller's only deal-write
 * outlet when none is selected.
 */
export interface CreateSalesPipelineDealInput {
  /**
   * Pipeline that holds the deal.
   */
  pipeline_id: string;
  priority?: SalesPipelineDealPriorityRequest;
  /**
   * Deal remark of at most 500 characters.
   */
  remark?: string;
  /**
   * Initial stage; it must belong to the pipeline.
   */
  stage_id: string;
  type?: SalesPipelineDealTypeRequest;
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
   * unchanged as If-Match to move or update the deal; any write to the deal
   * changes it.
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

export interface DealBrief {
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

export interface DealRevisionOutput {
  /**
   * The deal's revision after the request, for the next If-Match.
   */
  revision: string;
}

export type DealRevisionOutputEnvelope = DealRevisionOutput & {
  status: "success";
};

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
 * DELEGATED_ACCESS_AUDIENCE_MISMATCH (403): The credential audience does not match this resource.
 */
export interface DelegatedAccessAudienceMismatchProblem {
  code: "DELEGATED_ACCESS_AUDIENCE_MISMATCH";
  correlation_id?: string;
  /**
   * Localized instance-specific text.
   */
  detail?: string;
  details: DelegatedAccessDeniedDetails;
  /**
   * urn:gatherdeal:request:<correlation_id>
   */
  instance?: string;
  record?: ProblemRecord;
  retryable: false;
  status: 403;
  /**
   * Localized by Accept-Language; English: "The credential audience does not match this resource."
   */
  title: string;
  /**
   * Problem type URI, one-to-one with code; documentation only, never dereferenced at runtime.
   */
  type: "https://docs.gatherdeal.ai/errors/DELEGATED_ACCESS_AUDIENCE_MISMATCH";
}

/**
 * DELEGATED_ACCESS_CREDENTIAL_LOCATION (401): Delegated access credentials must be sent in the Authorization header.
 */
export interface DelegatedAccessCredentialLocationProblem {
  code: "DELEGATED_ACCESS_CREDENTIAL_LOCATION";
  correlation_id?: string;
  /**
   * Localized instance-specific text.
   */
  detail?: string;
  details: DelegatedAccessDeniedDetails;
  /**
   * urn:gatherdeal:request:<correlation_id>
   */
  instance?: string;
  record?: ProblemRecord;
  retryable: false;
  status: 401;
  /**
   * Localized by Accept-Language; English: "Delegated access credentials must be sent in the Authorization header."
   */
  title: string;
  /**
   * Problem type URI, one-to-one with code; documentation only, never dereferenced at runtime.
   */
  type: "https://docs.gatherdeal.ai/errors/DELEGATED_ACCESS_CREDENTIAL_LOCATION";
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
 * DELEGATED_ACCESS_EFFECT_NOT_ALLOWED (403): The delegated access does not allow this operation.
 */
export interface DelegatedAccessEffectNotAllowedProblem {
  code: "DELEGATED_ACCESS_EFFECT_NOT_ALLOWED";
  correlation_id?: string;
  /**
   * Localized instance-specific text.
   */
  detail?: string;
  details: DelegatedAccessDeniedDetails;
  /**
   * urn:gatherdeal:request:<correlation_id>
   */
  instance?: string;
  record?: ProblemRecord;
  retryable: false;
  status: 403;
  /**
   * Localized by Accept-Language; English: "The delegated access does not allow this operation."
   */
  title: string;
  /**
   * Problem type URI, one-to-one with code; documentation only, never dereferenced at runtime.
   */
  type: "https://docs.gatherdeal.ai/errors/DELEGATED_ACCESS_EFFECT_NOT_ALLOWED";
}

/**
 * DELEGATED_ACCESS_EXPANSION_NOT_ALLOWED (403): This expansion is not available to delegated access.
 */
export interface DelegatedAccessExpansionNotAllowedProblem {
  code: "DELEGATED_ACCESS_EXPANSION_NOT_ALLOWED";
  correlation_id?: string;
  /**
   * Localized instance-specific text.
   */
  detail?: string;
  details: DelegatedAccessDeniedDetails;
  /**
   * urn:gatherdeal:request:<correlation_id>
   */
  instance?: string;
  record?: ProblemRecord;
  retryable: false;
  status: 403;
  /**
   * Localized by Accept-Language; English: "This expansion is not available to delegated access."
   */
  title: string;
  /**
   * Problem type URI, one-to-one with code; documentation only, never dereferenced at runtime.
   */
  type: "https://docs.gatherdeal.ai/errors/DELEGATED_ACCESS_EXPANSION_NOT_ALLOWED";
}

/**
 * DELEGATED_ACCESS_FEATURE_NOT_ENTITLED (403): The organization is not entitled to delegated access through MCP.
 */
export interface DelegatedAccessFeatureNotEntitledProblem {
  code: "DELEGATED_ACCESS_FEATURE_NOT_ENTITLED";
  correlation_id?: string;
  /**
   * Localized instance-specific text.
   */
  detail?: string;
  details: DelegatedAccessDeniedDetails;
  /**
   * urn:gatherdeal:request:<correlation_id>
   */
  instance?: string;
  record?: ProblemRecord;
  retryable: false;
  status: 403;
  /**
   * Localized by Accept-Language; English: "The organization is not entitled to delegated access through MCP."
   */
  title: string;
  /**
   * Problem type URI, one-to-one with code; documentation only, never dereferenced at runtime.
   */
  type: "https://docs.gatherdeal.ai/errors/DELEGATED_ACCESS_FEATURE_NOT_ENTITLED";
}

/**
 * DELEGATED_ACCESS_FILTER_NOT_ALLOWED (403): This filter is not available to delegated access.
 */
export interface DelegatedAccessFilterNotAllowedProblem {
  code: "DELEGATED_ACCESS_FILTER_NOT_ALLOWED";
  correlation_id?: string;
  /**
   * Localized instance-specific text.
   */
  detail?: string;
  details: DelegatedAccessDeniedDetails;
  /**
   * urn:gatherdeal:request:<correlation_id>
   */
  instance?: string;
  record?: ProblemRecord;
  retryable: false;
  status: 403;
  /**
   * Localized by Accept-Language; English: "This filter is not available to delegated access."
   */
  title: string;
  /**
   * Problem type URI, one-to-one with code; documentation only, never dereferenced at runtime.
   */
  type: "https://docs.gatherdeal.ai/errors/DELEGATED_ACCESS_FILTER_NOT_ALLOWED";
}

/**
 * DELEGATED_ACCESS_IMPERSONATION_NOT_ALLOWED (403): Delegated access cannot impersonate.
 */
export interface DelegatedAccessImpersonationNotAllowedProblem {
  code: "DELEGATED_ACCESS_IMPERSONATION_NOT_ALLOWED";
  correlation_id?: string;
  /**
   * Localized instance-specific text.
   */
  detail?: string;
  details: DelegatedAccessDeniedDetails;
  /**
   * urn:gatherdeal:request:<correlation_id>
   */
  instance?: string;
  record?: ProblemRecord;
  retryable: false;
  status: 403;
  /**
   * Localized by Accept-Language; English: "Delegated access cannot impersonate."
   */
  title: string;
  /**
   * Problem type URI, one-to-one with code; documentation only, never dereferenced at runtime.
   */
  type: "https://docs.gatherdeal.ai/errors/DELEGATED_ACCESS_IMPERSONATION_NOT_ALLOWED";
}

/**
 * DelegatedAccessInactiveDetails are the details of DELEGATED_ACCESS_INACTIVE.
 */
export interface DelegatedAccessInactiveDetails {
  reason: DelegatedAccessInactiveReason;
}

/**
 * DELEGATED_ACCESS_INACTIVE (401): The delegated access is no longer active.
 */
export interface DelegatedAccessInactiveProblem {
  code: "DELEGATED_ACCESS_INACTIVE";
  correlation_id?: string;
  /**
   * Localized instance-specific text.
   */
  detail?: string;
  details: DelegatedAccessInactiveDetails;
  /**
   * urn:gatherdeal:request:<correlation_id>
   */
  instance?: string;
  record?: ProblemRecord;
  retryable: false;
  status: 401;
  /**
   * Localized by Accept-Language; English: "The delegated access is no longer active."
   */
  title: string;
  /**
   * Problem type URI, one-to-one with code; documentation only, never dereferenced at runtime.
   */
  type: "https://docs.gatherdeal.ai/errors/DELEGATED_ACCESS_INACTIVE";
}

/**
 * DelegatedAccessInactiveReason names why the server reports a delegated
 * credential inactive.
 */
export type DelegatedAccessInactiveReason = "expired" | "idle" | "revoked" | (string & {});

/**
 * DELEGATED_ACCESS_KIND_NOT_ALLOWED (403): This credential kind is not available on this resource.
 */
export interface DelegatedAccessKindNotAllowedProblem {
  code: "DELEGATED_ACCESS_KIND_NOT_ALLOWED";
  correlation_id?: string;
  /**
   * Localized instance-specific text.
   */
  detail?: string;
  details: DelegatedAccessDeniedDetails;
  /**
   * urn:gatherdeal:request:<correlation_id>
   */
  instance?: string;
  record?: ProblemRecord;
  retryable: false;
  status: 403;
  /**
   * Localized by Accept-Language; English: "This credential kind is not available on this resource."
   */
  title: string;
  /**
   * Problem type URI, one-to-one with code; documentation only, never dereferenced at runtime.
   */
  type: "https://docs.gatherdeal.ai/errors/DELEGATED_ACCESS_KIND_NOT_ALLOWED";
}

/**
 * DELEGATED_ACCESS_ORGANIZATION_KEY_NOT_ADMITTED (403): This operation is not available to organization API keys.
 */
export interface DelegatedAccessOrganizationKeyNotAdmittedProblem {
  code: "DELEGATED_ACCESS_ORGANIZATION_KEY_NOT_ADMITTED";
  correlation_id?: string;
  /**
   * Localized instance-specific text.
   */
  detail?: string;
  details: DelegatedAccessDeniedDetails;
  /**
   * urn:gatherdeal:request:<correlation_id>
   */
  instance?: string;
  record?: ProblemRecord;
  retryable: false;
  status: 403;
  /**
   * Localized by Accept-Language; English: "This operation is not available to organization API keys."
   */
  title: string;
  /**
   * Problem type URI, one-to-one with code; documentation only, never dereferenced at runtime.
   */
  type: "https://docs.gatherdeal.ai/errors/DELEGATED_ACCESS_ORGANIZATION_KEY_NOT_ADMITTED";
}

/**
 * DELEGATED_ACCESS_ORGANIZATION_MISMATCH (403): The selected organization does not match the delegated access.
 */
export interface DelegatedAccessOrganizationMismatchProblem {
  code: "DELEGATED_ACCESS_ORGANIZATION_MISMATCH";
  correlation_id?: string;
  /**
   * Localized instance-specific text.
   */
  detail?: string;
  details: DelegatedAccessDeniedDetails;
  /**
   * urn:gatherdeal:request:<correlation_id>
   */
  instance?: string;
  record?: ProblemRecord;
  retryable: false;
  status: 403;
  /**
   * Localized by Accept-Language; English: "The selected organization does not match the delegated access."
   */
  title: string;
  /**
   * Problem type URI, one-to-one with code; documentation only, never dereferenced at runtime.
   */
  type: "https://docs.gatherdeal.ai/errors/DELEGATED_ACCESS_ORGANIZATION_MISMATCH";
}

/**
 * DELEGATED_ACCESS_OUTLET_NOT_ALLOWED (403): The selected outlet is outside the delegated access.
 */
export interface DelegatedAccessOutletNotAllowedProblem {
  code: "DELEGATED_ACCESS_OUTLET_NOT_ALLOWED";
  correlation_id?: string;
  /**
   * Localized instance-specific text.
   */
  detail?: string;
  details: DelegatedAccessDeniedDetails;
  /**
   * urn:gatherdeal:request:<correlation_id>
   */
  instance?: string;
  record?: ProblemRecord;
  retryable: false;
  status: 403;
  /**
   * Localized by Accept-Language; English: "The selected outlet is outside the delegated access."
   */
  title: string;
  /**
   * Problem type URI, one-to-one with code; documentation only, never dereferenced at runtime.
   */
  type: "https://docs.gatherdeal.ai/errors/DELEGATED_ACCESS_OUTLET_NOT_ALLOWED";
}

/**
 * DELEGATED_ACCESS_PERMISSION_DENIED (403): The delegated access lacks a required permission.
 */
export interface DelegatedAccessPermissionDeniedProblem {
  code: "DELEGATED_ACCESS_PERMISSION_DENIED";
  correlation_id?: string;
  /**
   * Localized instance-specific text.
   */
  detail?: string;
  details: DelegatedAccessDeniedDetails;
  /**
   * urn:gatherdeal:request:<correlation_id>
   */
  instance?: string;
  record?: ProblemRecord;
  retryable: false;
  status: 403;
  /**
   * Localized by Accept-Language; English: "The delegated access lacks a required permission."
   */
  title: string;
  /**
   * Problem type URI, one-to-one with code; documentation only, never dereferenced at runtime.
   */
  type: "https://docs.gatherdeal.ai/errors/DELEGATED_ACCESS_PERMISSION_DENIED";
}

/**
 * DELEGATED_ACCESS_PRINCIPAL_INACTIVE (403): The delegated access's user is no longer eligible in its organization.
 */
export interface DelegatedAccessPrincipalInactiveProblem {
  code: "DELEGATED_ACCESS_PRINCIPAL_INACTIVE";
  correlation_id?: string;
  /**
   * Localized instance-specific text.
   */
  detail?: string;
  details: DelegatedAccessDeniedDetails;
  /**
   * urn:gatherdeal:request:<correlation_id>
   */
  instance?: string;
  record?: ProblemRecord;
  retryable: false;
  status: 403;
  /**
   * Localized by Accept-Language; English: "The delegated access's user is no longer eligible in its organization."
   */
  title: string;
  /**
   * Problem type URI, one-to-one with code; documentation only, never dereferenced at runtime.
   */
  type: "https://docs.gatherdeal.ai/errors/DELEGATED_ACCESS_PRINCIPAL_INACTIVE";
}

/**
 * DELEGATED_ACCESS_ROUTE_NOT_ALLOWED (403): This route is not available to delegated access.
 */
export interface DelegatedAccessRouteNotAllowedProblem {
  code: "DELEGATED_ACCESS_ROUTE_NOT_ALLOWED";
  correlation_id?: string;
  /**
   * Localized instance-specific text.
   */
  detail?: string;
  details: DelegatedAccessDeniedDetails;
  /**
   * urn:gatherdeal:request:<correlation_id>
   */
  instance?: string;
  record?: ProblemRecord;
  retryable: false;
  status: 403;
  /**
   * Localized by Accept-Language; English: "This route is not available to delegated access."
   */
  title: string;
  /**
   * Problem type URI, one-to-one with code; documentation only, never dereferenced at runtime.
   */
  type: "https://docs.gatherdeal.ai/errors/DELEGATED_ACCESS_ROUTE_NOT_ALLOWED";
}

/**
 * DELEGATED_ACCESS_TARGET_MISMATCH (403): The credential target does not match this service.
 */
export interface DelegatedAccessTargetMismatchProblem {
  code: "DELEGATED_ACCESS_TARGET_MISMATCH";
  correlation_id?: string;
  /**
   * Localized instance-specific text.
   */
  detail?: string;
  details: DelegatedAccessDeniedDetails;
  /**
   * urn:gatherdeal:request:<correlation_id>
   */
  instance?: string;
  record?: ProblemRecord;
  retryable: false;
  status: 403;
  /**
   * Localized by Accept-Language; English: "The credential target does not match this service."
   */
  title: string;
  /**
   * Problem type URI, one-to-one with code; documentation only, never dereferenced at runtime.
   */
  type: "https://docs.gatherdeal.ai/errors/DELEGATED_ACCESS_TARGET_MISMATCH";
}

/**
 * DelegatedAccessUnsupportedDetails are the details of
 * DELEGATED_ACCESS_UNSUPPORTED: ContractVersion is the minimum
 * delegated_access_contract_version the server requires.
 */
export interface DelegatedAccessUnsupportedDetails {
  contract_version: number;
}

/**
 * DELEGATED_ACCESS_UNSUPPORTED (401): The caller does not support delegated access.
 */
export interface DelegatedAccessUnsupportedProblem {
  code: "DELEGATED_ACCESS_UNSUPPORTED";
  correlation_id?: string;
  /**
   * Localized instance-specific text.
   */
  detail?: string;
  details: DelegatedAccessUnsupportedDetails;
  /**
   * urn:gatherdeal:request:<correlation_id>
   */
  instance?: string;
  record?: ProblemRecord;
  retryable: false;
  status: 401;
  /**
   * Localized by Accept-Language; English: "The caller does not support delegated access."
   */
  title: string;
  /**
   * Problem type URI, one-to-one with code; documentation only, never dereferenced at runtime.
   */
  type: "https://docs.gatherdeal.ai/errors/DELEGATED_ACCESS_UNSUPPORTED";
}

export interface FetchContactByIDOutput {
  contact: ContactView;
}

export type FetchContactByIDOutputEnvelope = FetchContactByIDOutput & {
  status: "success";
};

export interface FetchContactLogsOutput {
  contact_logs: ListPageContactLogBrief;
}

export type FetchContactLogsOutputEnvelope = FetchContactLogsOutput & {
  status: "success";
};

export interface FetchContactTagsOutput {
  tags: ListPageContactTagListBrief;
}

export type FetchContactTagsOutputEnvelope = FetchContactTagsOutput & {
  status: "success";
};

export interface FetchContactsOutput {
  contacts: ListPageContactView;
}

export type FetchContactsOutputEnvelope = FetchContactsOutput & {
  status: "success";
};

/**
 * FORBIDDEN (403): You do not have permission to perform this action.
 */
export interface ForbiddenProblem {
  code: "FORBIDDEN";
  correlation_id?: string;
  /**
   * Localized instance-specific text.
   */
  detail?: string;
  /**
   * urn:gatherdeal:request:<correlation_id>
   */
  instance?: string;
  record?: ProblemRecord;
  retryable: false;
  status: 403;
  /**
   * Localized by Accept-Language; English: "You do not have permission to perform this action."
   */
  title: string;
  /**
   * Problem type URI, one-to-one with code; documentation only, never dereferenced at runtime.
   */
  type: "https://docs.gatherdeal.ai/errors/FORBIDDEN";
}

export interface GetDealOutput {
  deal: Deal;
}

export type GetDealOutputEnvelope = GetDealOutput & {
  status: "success";
};

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
 * IDEMPOTENCY_KEY_CONFLICT (409): The idempotency key is already bound to a different request.
 */
export interface IdempotencyKeyConflictProblem {
  code: "IDEMPOTENCY_KEY_CONFLICT";
  correlation_id?: string;
  /**
   * Localized instance-specific text.
   */
  detail?: string;
  /**
   * urn:gatherdeal:request:<correlation_id>
   */
  instance?: string;
  record?: ProblemRecord;
  retryable: false;
  status: 409;
  /**
   * Localized by Accept-Language; English: "The idempotency key is already bound to a different request."
   */
  title: string;
  /**
   * Problem type URI, one-to-one with code; documentation only, never dereferenced at runtime.
   */
  type: "https://docs.gatherdeal.ai/errors/IDEMPOTENCY_KEY_CONFLICT";
}

/**
 * IDEMPOTENCY_KEY_REQUIRED (400): A valid Idempotency-Key header is required.
 */
export interface IdempotencyKeyRequiredProblem {
  code: "IDEMPOTENCY_KEY_REQUIRED";
  correlation_id?: string;
  /**
   * Localized instance-specific text.
   */
  detail?: string;
  /**
   * urn:gatherdeal:request:<correlation_id>
   */
  instance?: string;
  record?: ProblemRecord;
  retryable: false;
  status: 400;
  /**
   * Localized by Accept-Language; English: "A valid Idempotency-Key header is required."
   */
  title: string;
  /**
   * Problem type URI, one-to-one with code; documentation only, never dereferenced at runtime.
   */
  type: "https://docs.gatherdeal.ai/errors/IDEMPOTENCY_KEY_REQUIRED";
}

/**
 * INTERNAL_ERROR (500): Internal server error.
 */
export interface InternalErrorProblem {
  code: "INTERNAL_ERROR";
  correlation_id?: string;
  /**
   * Localized instance-specific text.
   */
  detail?: string;
  /**
   * urn:gatherdeal:request:<correlation_id>
   */
  instance?: string;
  record?: ProblemRecord;
  retryable: false;
  status: 500;
  /**
   * Localized by Accept-Language; English: "Internal server error."
   */
  title: string;
  /**
   * Problem type URI, one-to-one with code; documentation only, never dereferenced at runtime.
   */
  type: "https://docs.gatherdeal.ai/errors/INTERNAL_ERROR";
}

/**
 * KeyedAcknowledgment is the complete success payload persisted by a scoped route.
 */
export interface KeyedAcknowledgment {
  /**
   * Identifier of the resource acknowledged by this operation.
   */
  id: string;
}

export type KeyedAcknowledgmentEnvelope = KeyedAcknowledgment & {
  status: "success";
};

export interface ListDealsOutput {
  deals: ListPageDealBrief;
}

export type ListDealsOutputEnvelope = ListDealsOutput & {
  status: "success";
};

/**
 * ListPage is one page of a list in either mode.
 */
export interface ListPageContactLogBrief {
  data: ContactLogBrief[];
  has_next_page: boolean;
  has_prev_page: boolean;
  next_cursor?: string;
  page?: number;
  page_size: number;
  prev_cursor?: string;
  total_items?: number;
  total_pages?: number;
}

/**
 * ListPage is one page of a list in either mode.
 */
export interface ListPageContactTagListBrief {
  data: ContactTagListBrief[];
  has_next_page: boolean;
  has_prev_page: boolean;
  next_cursor?: string;
  page?: number;
  page_size: number;
  prev_cursor?: string;
  total_items?: number;
  total_pages?: number;
}

/**
 * ListPage is one page of a list in either mode.
 */
export interface ListPageContactView {
  data: ContactView[];
  has_next_page: boolean;
  has_prev_page: boolean;
  next_cursor?: string;
  page?: number;
  page_size: number;
  prev_cursor?: string;
  total_items?: number;
  total_pages?: number;
}

/**
 * ListPage is one page of a list in either mode.
 */
export interface ListPageDealBrief {
  data: DealBrief[];
  has_next_page: boolean;
  has_prev_page: boolean;
  next_cursor?: string;
  page?: number;
  page_size: number;
  prev_cursor?: string;
  total_items?: number;
  total_pages?: number;
}

/**
 * ListPage is one page of a list in either mode.
 */
export interface ListPagePipelineBrief {
  data: PipelineBrief[];
  has_next_page: boolean;
  has_prev_page: boolean;
  next_cursor?: string;
  page?: number;
  page_size: number;
  prev_cursor?: string;
  total_items?: number;
  total_pages?: number;
}

export interface ListPipelinesOutput {
  sales_pipelines: ListPagePipelineBrief;
}

export type ListPipelinesOutputEnvelope = ListPipelinesOutput & {
  status: "success";
};

export interface MoveDealStageInput {
  /**
   * Target stage; it must belong to the deal's current pipeline.
   */
  stage_id: string;
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
 * PAGINATION_CURSOR_INVALID (400): The pagination cursor is invalid.
 */
export interface PaginationCursorInvalidProblem {
  code: "PAGINATION_CURSOR_INVALID";
  correlation_id?: string;
  /**
   * Localized instance-specific text.
   */
  detail?: string;
  details: PaginationCursorInvalidDetails;
  /**
   * urn:gatherdeal:request:<correlation_id>
   */
  instance?: string;
  record?: ProblemRecord;
  retryable: false;
  status: 400;
  /**
   * Localized by Accept-Language; English: "The pagination cursor is invalid."
   */
  title: string;
  /**
   * Problem type URI, one-to-one with code; documentation only, never dereferenced at runtime.
   */
  type: "https://docs.gatherdeal.ai/errors/PAGINATION_CURSOR_INVALID";
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
 * PAGINATION_PARAMS_INVALID (400): The pagination parameters are invalid.
 */
export interface PaginationParamsInvalidProblem {
  code: "PAGINATION_PARAMS_INVALID";
  correlation_id?: string;
  /**
   * Localized instance-specific text.
   */
  detail?: string;
  details: PaginationParamsInvalidDetails;
  /**
   * urn:gatherdeal:request:<correlation_id>
   */
  instance?: string;
  record?: ProblemRecord;
  retryable: false;
  status: 400;
  /**
   * Localized by Accept-Language; English: "The pagination parameters are invalid."
   */
  title: string;
  /**
   * Problem type URI, one-to-one with code; documentation only, never dereferenced at runtime.
   */
  type: "https://docs.gatherdeal.ai/errors/PAGINATION_PARAMS_INVALID";
}

/**
 * PaginationParamsReason refines PAGINATION_PARAMS_INVALID.
 */
export type PaginationParamsReason = "offset_too_large" | "selector_conflict" | "sort_not_seekable" | "sort_unknown" | "total_invalid" | (string & {});

/**
 * Omitted fields keep their values. Null clears the primary phone, email,
 * remark or preferred language. The contact name must remain nonempty.
 */
export interface PartialUpdateContactByIDInput {
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

export interface PipelineBrief {
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
  stages?: PipelineStage[];
}

export interface PipelineStage {
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
 * PRECONDITION_FAILED (412): A precondition of the request was not met.
 */
export interface PreconditionFailedProblem {
  code: "PRECONDITION_FAILED";
  correlation_id?: string;
  /**
   * Localized instance-specific text.
   */
  detail?: string;
  /**
   * urn:gatherdeal:request:<correlation_id>
   */
  instance?: string;
  record?: ProblemRecord;
  retryable: false;
  status: 412;
  /**
   * Localized by Accept-Language; English: "A precondition of the request was not met."
   */
  title: string;
  /**
   * Problem type URI, one-to-one with code; documentation only, never dereferenced at runtime.
   */
  type: "https://docs.gatherdeal.ai/errors/PRECONDITION_FAILED";
}

export interface ProblemParameter {
  in: "header" | "path" | "query" | (string & {});
  name: string;
}

/**
 * The durable record created by the failed call, present when the response identifies one. Never localized; never on item problems.
 */
export interface ProblemRecord {
  /**
   * The record id, canonical lowercase UUID text.
   */
  id: string;
  /**
   * The record kind: the owning table or operation, which names the read that resolves id. Clients keep or ignore a kind they do not know.
   */
  kind: "inference_request" | (string & {});
}

/**
 * One field violation: exactly one of pointer and parameter locates it.
 */
export type ProblemViolation = ProblemViolationAtParameter | ProblemViolationAtPointer;

/**
 * A violation located in a query, path or header parameter.
 */
export interface ProblemViolationAtParameter {
  /**
   * Localized text rendered from the platform template for rule.
   */
  detail: string;
  parameter: ProblemParameter;
  params?: ProblemViolationParams;
  rule: ProblemViolationRule;
}

/**
 * A violation located in the request body.
 */
export interface ProblemViolationAtPointer {
  /**
   * Localized text rendered from the platform template for rule.
   */
  detail: string;
  params?: ProblemViolationParams;
  /**
   * RFC 6901 JSON Pointer in URI fragment form into the request body ("#" is the root).
   */
  pointer: string;
  rule: ProblemViolationRule;
}

export interface ProblemViolationParams {
  allowed?: string[];
  format?: string;
  /**
   * Upper bound of a number (max) or item count (max_items).
   */
  max?: number;
  max_length?: number;
  /**
   * Lower bound of a number (min) or item count (min_items).
   */
  min?: number;
  min_length?: number;
}

/**
 * The violated rule; params carries its parameters.
 */
export type ProblemViolationRule = "enum" | "format" | "invalid" | "max" | "max_items" | "max_length" | "min" | "min_items" | "min_length" | "pattern" | "required" | "type" | "unique" | "unknown_field" | (string & {});

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
export type SalesPipelineDealPriorityRequest = "high" | "low" | "medium";

/**
 * SalesPipelineDealType distinguishes new acquisitions from
 * existing-customer expansion deals.
 */
export type SalesPipelineDealType = "existing" | "new" | (string & {});

/**
 * SalesPipelineDealType distinguishes new acquisitions from
 * existing-customer expansion deals.
 */
export type SalesPipelineDealTypeRequest = "existing" | "new";

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
 * UNAUTHORIZED (401): Authentication is required.
 */
export interface UnauthorizedProblem {
  code: "UNAUTHORIZED";
  correlation_id?: string;
  /**
   * Localized instance-specific text.
   */
  detail?: string;
  /**
   * urn:gatherdeal:request:<correlation_id>
   */
  instance?: string;
  record?: ProblemRecord;
  retryable: false;
  status: 401;
  /**
   * Localized by Accept-Language; English: "Authentication is required."
   */
  title: string;
  /**
   * Problem type URI, one-to-one with code; documentation only, never dereferenced at runtime.
   */
  type: "https://docs.gatherdeal.ai/errors/UNAUTHORIZED";
}

/**
 * An omitted field keeps its value and null clears it. A remark keeps 1 to 500
 * characters after trimming each line.
 */
export interface UpdateDealInput {
  priority?: SalesPipelineDealPriorityRequest | null;
  /**
   * Deal remark; null clears it.
   */
  remark?: string | null;
  type?: SalesPipelineDealTypeRequest | null;
}

/**
 * VALIDATION_FAILED (422): Some fields are invalid.
 */
export interface ValidationFailedProblem {
  code: "VALIDATION_FAILED";
  correlation_id?: string;
  /**
   * Localized instance-specific text.
   */
  detail?: string;
  errors: ProblemViolation[];
  /**
   * urn:gatherdeal:request:<correlation_id>
   */
  instance?: string;
  record?: ProblemRecord;
  retryable: false;
  status: 422;
  /**
   * Localized by Accept-Language; English: "Some fields are invalid."
   */
  title: string;
  /**
   * Problem type URI, one-to-one with code; documentation only, never dereferenced at runtime.
   */
  type: "https://docs.gatherdeal.ai/errors/VALIDATION_FAILED";
}
