// Generated from the GatherDeal public API contracts. Do not edit.

/**
 * Weekly opening hours. A null organization schedule means hours are unset.
 * A null outlet schedule inherits the organization's current hours.
 */
export interface BusinessHours {
  friday: BusinessHoursDay;
  monday: BusinessHoursDay;
  saturday: BusinessHoursDay;
  sunday: BusinessHoursDay;
  thursday: BusinessHoursDay;
  tuesday: BusinessHoursDay;
  wednesday: BusinessHoursDay;
}

/**
 * Opening hours for one day. An empty `intervals` array means the outlet
 * or organization is closed. The server changes `revision` only when this
 * day is edited or reset.
 */
export interface BusinessHoursDay {
  /**
   * Opening intervals of the day in start order, at most eight; empty when closed.
   */
  intervals: BusinessHoursIntervalOutput[];
  /**
   * Revision of this day, changed only when the day is edited or reset.
   */
  revision: number;
}

/**
 * BusinessHoursInterval is a half-open local-time interval within one day.
 * Midnight-crossing openings are split into intervals on consecutive days.
 */
export interface BusinessHoursIntervalOutput {
  /**
   * Closing time in local HH:mm, after start; "24:00" closes at midnight.
   */
  end: string;
  /**
   * Opening time in local HH:mm, e.g. "09:00".
   */
  start: string;
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

/**
 * Currency represents an ISO 4217 currency code.
 */
export type Currency = "AED" | "AFN" | "ALL" | "AMD" | "ANG" | "AOA" | "ARS" | "AUD" | "AWG" | "AZN" | "BAM" | "BBD" | "BDT" | "BGN" | "BHD" | "BIF" | "BMD" | "BND" | "BOB" | "BOV" | "BRL" | "BSD" | "BTN" | "BWP" | "BYN" | "BZD" | "CAD" | "CDF" | "CHE" | "CHF" | "CHW" | "CLF" | "CLP" | "CNH" | "CNY" | "COP" | "COU" | "CRC" | "CUC" | "CUP" | "CVE" | "CZK" | "DJF" | "DKK" | "DOP" | "DZD" | "EGP" | "ERN" | "ETB" | "EUR" | "FJD" | "FKP" | "GBP" | "GEL" | "GHS" | "GIP" | "GMD" | "GNF" | "GTQ" | "GYD" | "HKD" | "HNL" | "HTG" | "HUF" | "IDR" | "ILS" | "INR" | "IQD" | "IRR" | "ISK" | "JMD" | "JOD" | "JPY" | "KES" | "KGS" | "KHR" | "KMF" | "KPW" | "KRW" | "KWD" | "KYD" | "KZT" | "LAK" | "LBP" | "LKR" | "LRD" | "LSL" | "LYD" | "MAD" | "MDL" | "MGA" | "MKD" | "MMK" | "MNT" | "MOP" | "MRU" | "MUR" | "MVR" | "MWK" | "MXN" | "MXV" | "MYR" | "MZN" | "NAD" | "NGN" | "NIO" | "NOK" | "NPR" | "NZD" | "OMR" | "PAB" | "PEN" | "PGK" | "PHP" | "PKR" | "PLN" | "PYG" | "QAR" | "RON" | "RSD" | "RUB" | "RWF" | "SAR" | "SBD" | "SCR" | "SDG" | "SEK" | "SGD" | "SHP" | "SLE" | "SLL" | "SOS" | "SRD" | "SSP" | "STN" | "SVC" | "SYP" | "SZL" | "THB" | "TJS" | "TMT" | "TND" | "TOP" | "TRY" | "TTD" | "TWD" | "TZS" | "UAH" | "UGX" | "USD" | "USN" | "UYI" | "UYU" | "UYW" | "UZS" | "VED" | "VES" | "VND" | "VUV" | "WST" | "XAF" | "XAG" | "XAU" | "XBA" | "XBB" | "XBC" | "XBD" | "XCD" | "XDR" | "XOF" | "XPD" | "XPF" | "XPT" | "XSU" | "XUA" | "XXX" | "YER" | "ZAR" | "ZMW" | "ZWL" | (string & {});

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
 * Operator represents a comparison operator used in a filter Rule.
 */
export type Operator = "BETWEEN" | "CONTAINS" | "CONTAINS_FOLD" | "DWITHIN" | "ENDS_WITH" | "ENDS_WITH_FOLD" | "EQ" | "EQ_FOLD" | "GT" | "GTE" | "IN" | "IS_NOT_NULL" | "IS_NULL" | "LT" | "LTE" | "NEQ" | "NOT_IN" | "STARTS_WITH" | "STARTS_WITH_FOLD";

/**
 * An outlet and its organization, owner, and operating settings. Anonymous
 * callers receive the basic directory projection, which omits the audit
 * instants, description and owner.
 */
export interface Outlet {
  /**
   * Physical address of the outlet. Absent when unset.
   */
  address?: {
    address?: string[];
    attention?: string;
    city?: string;
    /**
     * ISO 3166-1 alpha-2
     */
    country?: string | null;
    latitude?: string;
    longitude?: string;
    /**
     * Phone with an explicit country code: "+<country code> <number>" or "(<country code>)<number>", e.g. "+60 123456789". A space or hyphen may separate a plus-prefixed country code from the number. The number accepts spaces, hyphens, periods, and simple balanced parentheses around area codes. Compact E.164 strings such as "+60123456789" use assigned ITU calling codes, validated at runtime. Output is canonical "(60)123456789".
     */
    phone?: string | null;
    place_id?: string;
    state?: string;
    zip_code?: string;
  };
  business_hours: BusinessHours | null;
  /**
   * Revision of the outlet's whole business-hours schedule, kept across
   * resets; an inheriting outlet uses its own revision.
   */
  business_hours_revision: number;
  /**
   * Business code of the outlet, unique across organizations. Look an outlet
   * up by code with the list's exact code selector.
   */
  code?: string;
  /**
   * When the outlet was created (UTC). Absent in the basic directory projection.
   */
  create_at?: string;
  currency?: Currency;
  /**
   * When the outlet was deleted (UTC). Always absent here: outlet reads never
   * return deleted outlets.
   */
  delete_at?: string;
  /**
   * Free-text description. Absent when unset or in the basic directory projection.
   */
  description?: string;
  /**
   * UUID of the outlet.
   */
  id: string;
  /**
   * Whether this is a master (headquarters) outlet of its organization.
   */
  is_master?: boolean;
  /**
   * Display name of the outlet.
   */
  name: string;
  organization?: OutletOrganization;
  /**
   * UUID of the organization that owns the outlet.
   */
  organization_id?: string;
  owner?: UserBrief;
  /**
   * UUID of the outlet's owner. Absent in the basic directory projection.
   */
  owner_id?: string;
  /**
   * IANA time zone override for this outlet, e.g. "Asia/Kuala_Lumpur". Empty
   * or absent means the organization's timezone applies (see the organization
   * expansion).
   */
  timezone?: string;
  /**
   * When the outlet was last updated (UTC). Absent in the basic directory projection.
   */
  update_at?: string;
}

/**
 * Organization details included in an outlet response. The contact fields
 * (phone, address, email, website) appear only in the basic directory
 * projection.
 */
export interface OutletOrganization {
  /**
   * Public address of the organization. Basic directory projection only; absent when unset.
   */
  address?: {
    address?: string[];
    attention?: string;
    city?: string;
    /**
     * ISO 3166-1 alpha-2
     */
    country?: string | null;
    latitude?: string;
    longitude?: string;
    /**
     * Phone with an explicit country code: "+<country code> <number>" or "(<country code>)<number>", e.g. "+60 123456789". A space or hyphen may separate a plus-prefixed country code from the number. The number accepts spaces, hyphens, periods, and simple balanced parentheses around area codes. Compact E.164 strings such as "+60123456789" use assigned ITU calling codes, validated at runtime. Output is canonical "(60)123456789".
     */
    phone?: string | null;
    place_id?: string;
    state?: string;
    zip_code?: string;
  };
  business_hours: BusinessHours | null;
  /**
   * Revision of the organization's whole business-hours schedule, kept across resets.
   */
  business_hours_revision: number;
  /**
   * Business code of the organization.
   */
  code?: string;
  currency?: Currency;
  /**
   * Public contact email of the organization. Basic directory projection only; may be empty.
   */
  email?: string;
  /**
   * UUID of the organization.
   */
  id: string;
  /**
   * Logo of the organization. Absent when unset.
   */
  logo?: string;
  /**
   * Display name of the organization.
   */
  name?: string;
  /**
   * Public contact phone of the organization. Basic directory projection only; absent when unset.
   */
  phone?: string;
  /**
   * Organization timezone used as the fallback when the outlet's timezone is empty.
   */
  timezone?: string;
  /**
   * Website of the organization. Basic directory projection only; may be empty.
   */
  website?: string;
}

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
 * TotalMode selects whether a list response counts its rows.
 */
export type TotalMode = "exact" | "none";

/**
 * A user reference with an `id` and, when available, a `name` and
 * `profile_image`.
 */
export interface UserBrief {
  /**
   * UUID of the user.
   */
  id: string;
  /**
   * Display name of the user. Absent when the user has no name.
   */
  name?: string;
  /**
   * Profile image of the user. Absent when unset.
   */
  profile_image?: string;
}
