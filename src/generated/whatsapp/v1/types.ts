// Generated from the GatherDeal public API contracts. Do not edit.

export interface AddBroadcastRecipientsInput {
  /**
   * Up to 1000 recipients; a number the broadcast already has is a
   * duplicate (the first wins).
   */
  recipients: BroadcastRecipientInput[];
}

export interface AddBroadcastRecipientsOutput {
  added: number;
  duplicates: number;
}

export type AddBroadcastRecipientsOutputEnvelope = AddBroadcastRecipientsOutput & {
  status: "success";
};

export interface AddBroadcastSuppressionsInput {
  note?: string;
  /**
   * Up to 1000 numbers; a number already on the list is a duplicate.
   */
  to: Array<string | null>;
}

/**
 * A WhatsApp connection used to send messages.
 */
export interface Agent {
  create_at?: string;
  current_run?: AgentCurrentRun;
  description?: string;
  distribution_id?: string;
  egress?: AgentEgress;
  error_message?: string;
  id?: string;
  last_heartbeat_at?: string;
  name?: string;
  organization_id?: string;
  outlet_id: string | null;
  /**
   * Phone with an explicit country code: "+<country code> <number>" or "(<country code>)<number>", e.g. "+60 123456789". A space or hyphen may separate a plus-prefixed country code from the number. The number accepts spaces, hyphens, periods, and simple balanced parentheses around area codes. Compact E.164 strings such as "+60123456789" use assigned ITU calling codes, validated at runtime. Output is canonical "(60)123456789".
   */
  phone?: string;
  phone_activity?: AgentPhoneActivity;
  /**
   * Time of the last attempt to check the primary phone. Visible only to
   * platform operators.
   */
  phone_last_pinged_at?: string;
  /**
   * When the primary phone was last seen. Omitted until first seen.
   */
  phone_last_seen_at?: string;
  /**
   * The connection runtime, when assigned.
   */
  runtime?: string;
  runtime_generation?: number;
  send_pacing?: SendPacingOutput;
  status?: AgentStatus;
  /**
   * Time when the connection status last changed.
   */
  status_changed_at?: string;
  /**
   * Error text from the last stop; visible only to platform operators.
   */
  stop_detail?: string;
  stop_reason?: AgentStopReason;
  /**
   * Whether the agent is reserved for platform use; visible only to platform operators.
   */
  system?: boolean;
  update_at?: string;
  /**
   * Last reported WhatsApp web client version; visible only to platform operators.
   */
  wa_version?: string;
}

export interface AgentCurrentRun {
  capacity_state: RunCapacityState;
  generation: number;
  id: string;
  node_ref?: string;
  online_at?: string;
  started_at?: string;
}

export interface AgentDeletion {
  agent_id: string;
  requested_at: string;
  status: string;
}

export interface AgentEgress {
  active_ipv6?: string;
  egress_group_id: string;
  shard_id?: string;
}

/**
 * Identifies the agent that cannot be found.
 */
export interface AgentNotFoundDetails {
  agent_id: string;
}

export interface AgentPairing {
  expires_at: string;
  pairing_code?: string;
  qr?: string;
  status: AgentPairingStatus;
}

export type AgentPairingStatus = "connected" | "expired" | "failed" | "pending" | (string & {});

/**
 * The pending message count and the maximum allowed for the agent.
 */
export interface AgentPendingMessagesLimitReachedDetails {
  limit: number;
  pending: number;
}

export type AgentPhoneActivity = "active" | "inactive" | "unknown" | (string & {});

/**
 * The current connection status of a WhatsApp agent.
 */
export type AgentStatus = "error" | "exiting" | "initializing" | "logged_out" | "offline" | "online" | "pairing" | "queued" | "restarting" | "starting" | "terminating" | (string & {});

/**
 * The reason the agent last stopped. The capacity_timeout value means
 * the wait for connection capacity expired.
 */
export type AgentStopReason = "EXIT_COMMAND_RECEIVED" | "LOGGED_OUT" | "NATS_CONNECTION_CLOSED" | "PAIRING_FAILED" | "PAIRING_TIMEOUT" | "SHUTDOWN" | "UNKNOWN_ERROR" | "WHATSAPP_CONNECTION_TIMEOUT" | "WHATSAPP_RECONNECTION_TIMEOUT" | "WHATSAPP_TERMINAL_FAILURE" | "capacity_timeout" | (string & {});

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

export interface Broadcast {
  affinity_fallback: BroadcastAffinityFallback;
  completed_at?: string;
  content: BroadcastContentOutput;
  create_at: string;
  distribution: BroadcastDistribution;
  id: string;
  interval: BroadcastIntervalOutput;
  name: string;
  /**
   * Recipients not sent by then expire; set at start (default 30 days).
   */
  not_after?: string;
  /**
   * Sending does not start before this time.
   */
  not_before?: string;
  organization_id: string;
  pause_reason?: BroadcastPauseReason;
  priority_offset: number;
  progress: BroadcastProgress;
  send_window?: SendWindowOutput;
  /**
   * The most broadcast messages each sender sends in a rolling 24 hours,
   * counted across every broadcast using it.
   */
  sender_daily_limit: number;
  senders: BroadcastSender[];
  started_at?: string;
  status: BroadcastStatus;
  update_at: string;
}

/**
 * BroadcastAffinityFallback is what happens to a recipient whose preferred
 * sender is gone: back to the pool, or failed with no_sender.
 */
export type BroadcastAffinityFallback = "none" | "round_robin" | (string & {});

/**
 * BroadcastAffinityFallback is what happens to a recipient whose preferred
 * sender is gone: back to the pool, or failed with no_sender.
 */
export type BroadcastAffinityFallbackRequest = "none" | "round_robin";

/**
 * BroadcastContent is a broadcast's content: a text body, or a template
 * rendered for each recipient with its params.
 */
export interface BroadcastContent {
  template?: BroadcastTemplateReference | null;
  text?: MessageText | null;
  type: BroadcastContentTypeRequest;
}

/**
 * BroadcastContent is a broadcast's content: a text body, or a template
 * rendered for each recipient with its params.
 */
export interface BroadcastContentOutput {
  template?: BroadcastTemplateReferenceOutput;
  text?: MessageTextOutput;
  type: BroadcastContentType;
}

export type BroadcastContentType = "template" | "text" | (string & {});

export type BroadcastContentTypeRequest = "template" | "text";

/**
 * How the broadcast chooses a sender for each recipient.
 */
export type BroadcastDistribution = "affinity" | "round_robin" | (string & {});

/**
 * How the broadcast chooses a sender for each recipient.
 */
export type BroadcastDistributionRequest = "affinity" | "round_robin";

/**
 * BroadcastInterval is the range each message's cooldown is drawn from:
 * after a broadcast message settles, its sender sends no other broadcast
 * message for the drawn time. 10 000 <= min_ms <= max_ms <= 600 000.
 */
export interface BroadcastInterval {
  max_ms: number;
  min_ms: number;
}

/**
 * BroadcastInterval is the range each message's cooldown is drawn from:
 * after a broadcast message settles, its sender sends no other broadcast
 * message for the drawn time. 10 000 <= min_ms <= max_ms <= 600 000.
 */
export interface BroadcastIntervalOutput {
  max_ms: number;
  min_ms: number;
}

/**
 * The limit that was reached and the count it applies to.
 */
export interface BroadcastLimitReachedDetails {
  count: number;
  limit: number;
}

/**
 * Identifies the broadcast that cannot be found.
 */
export interface BroadcastNotFoundDetails {
  broadcast_id: string;
}

export interface BroadcastOutput {
  broadcast?: Broadcast;
}

export type BroadcastOutputEnvelope = BroadcastOutput & {
  status: "success";
};

/**
 * BroadcastPauseReason says why a broadcast is paused; set iff paused.
 */
export type BroadcastPauseReason = "failure_rate" | "no_senders" | "requested" | "sender_lost" | (string & {});

/**
 * BroadcastProgress counts the recipients by status.
 */
export interface BroadcastProgress {
  canceled: number;
  delivered: number;
  expired: number;
  failed: number;
  pending: number;
  queued: number;
  suppressed: number;
  total: number;
}

export interface BroadcastRecipient {
  /**
   * The WhatsApp connection assigned to send to this recipient.
   */
  agent_id?: string;
  create_at: string;
  error?: BroadcastRecipientError;
  id: string;
  /**
   * The message sent or scheduled for this recipient.
   */
  message_id?: string;
  params?: Record<string, TemplateDateValueOutput | TemplateDatetimeValueOutput | TemplateMoneyValueOutput | TemplateTextValueOutput>;
  position: number;
  /**
   * The sender the recipient last talked to (affinity), if any.
   */
  preferred_agent_id?: string;
  settled_at?: string;
  status: BroadcastRecipientStatus;
  /**
   * Phone with an explicit country code: "+<country code> <number>" or "(<country code>)<number>", e.g. "+60 123456789". A space or hyphen may separate a plus-prefixed country code from the number. The number accepts spaces, hyphens, periods, and simple balanced parentheses around area codes. Compact E.164 strings such as "+60123456789" use assigned ITU calling codes, validated at runtime. Output is canonical "(60)123456789".
   */
  to: string | null;
  update_at: string;
}

/**
 * The reason sending failed for this recipient.
 */
export type BroadcastRecipientError = "invalid_number" | "no_sender" | "render_failed" | "send_failed" | "send_timeout" | "sender_lost" | (string & {});

/**
 * BroadcastRecipientInput is one recipient of an upload batch: its number
 * and, for template content, the template's values for it.
 */
export interface BroadcastRecipientInput {
  params?: Record<string, TemplateDateValue | TemplateDatetimeValue | TemplateMoneyValue | TemplateTextValue>;
  /**
   * Phone with an explicit country code: "+<country code> <number>" or "(<country code>)<number>", e.g. "+60 123456789". A space or hyphen may separate a plus-prefixed country code from the number. The number accepts spaces, hyphens, periods, and simple balanced parentheses around area codes. Compact E.164 strings such as "+60123456789" use assigned ITU calling codes, validated at runtime. Output is canonical "(60)123456789".
   */
  to: string | null;
}

export type BroadcastRecipientStatus = "canceled" | "delivered" | "expired" | "failed" | "pending" | "queued" | "suppressed" | (string & {});

export type BroadcastRecipientStatusRequest = "canceled" | "delivered" | "expired" | "failed" | "pending" | "queued" | "suppressed";

/**
 * BroadcastSender is one sender agent and the recipients it took.
 */
export interface BroadcastSender {
  agent_id: string;
  delivered: number;
  failed: number;
  position: number;
  queued: number;
  state: BroadcastSenderState;
}

/**
 * Whether the sender is active or permanently unavailable to this broadcast.
 */
export type BroadcastSenderState = "active" | "lost" | (string & {});

/**
 * Identifies the sender agent the broadcast cannot use.
 */
export interface BroadcastSenderUnavailableDetails {
  agent_id: string;
}

/**
 * The broadcast's current status, which does not allow the action.
 */
export interface BroadcastStateConflictDetails {
  status: string;
}

/**
 * The broadcast status. Only `draft` broadcasts can be edited. The
 * `completed` and `canceled` states are final.
 */
export type BroadcastStatus = "canceled" | "completed" | "draft" | "paused" | "running" | "scheduled" | (string & {});

/**
 * The broadcast status. Only `draft` broadcasts can be edited. The
 * `completed` and `canceled` states are final.
 */
export type BroadcastStatusRequest = "canceled" | "completed" | "draft" | "paused" | "running" | "scheduled";

export interface BroadcastSuppression {
  create_at: string;
  id: string;
  note?: string;
  /**
   * Phone with an explicit country code: "+<country code> <number>" or "(<country code>)<number>", e.g. "+60 123456789". A space or hyphen may separate a plus-prefixed country code from the number. The number accepts spaces, hyphens, periods, and simple balanced parentheses around area codes. Compact E.164 strings such as "+60123456789" use assigned ITU calling codes, validated at runtime. Output is canonical "(60)123456789".
   */
  to: string | null;
}

/**
 * BroadcastTemplateReference names the template a broadcast renders.
 */
export interface BroadcastTemplateReference {
  id: string;
}

/**
 * BroadcastTemplateReference names the template a broadcast renders.
 */
export interface BroadcastTemplateReferenceOutput {
  id: string;
}

/**
 * Chat is one WhatsApp conversation of an agent.
 */
export interface Chat {
  agent_id: string;
  create_at: string;
  /**
   * The disappearing-message timer, in seconds; 0 when off.
   */
  ephemeral_seconds: number;
  /**
   * The group JID, "<id>@g.us".
   */
  group_jid?: string;
  id: string;
  last_message_at?: string;
  /**
   * Set when this chat was found to be the same conversation as another;
   * read that chat instead.
   */
  merged_into_id?: string;
  /**
   * The group subject.
   */
  name?: string;
  type: ChatType;
  update_at: string;
  user?: ChatParty;
}

/**
 * ChatMessage is one message of a WhatsApp chat. A copy found to duplicate
 * another message is a tombstone: only id, rev and merged_into_id are set.
 */
export interface ChatMessage {
  agent_id?: string;
  chat_id?: string;
  content?: Content;
  edited_at?: string;
  /**
   * When a disappearing message's content goes away.
   */
  expires_at?: string;
  id: string;
  /**
   * Set on a tombstone: the message this copy was merged into.
   */
  merged_into_id?: string;
  origin?: ChatMessageOrigin;
  /**
   * The chat message this one replies to.
   */
  quoted_id?: string;
  reactions?: Array<ChatReaction | null>;
  receipt?: MessageReceipt;
  /**
   * Message revision. Pass it as `after_rev` when polling
   * `GET /v1/chat-messages` for later changes.
   */
  rev: number;
  revoked_at?: string;
  sender?: ChatParty;
  sent_at?: string;
  source?: ChatMessageSource;
  /**
   * The chat message a poll vote refers to.
   */
  target_id?: string;
  view_once?: boolean;
  /**
   * The WhatsApp message ID.
   */
  wid?: string;
}

export type ChatMessageOrigin = "api" | "device" | "remote" | (string & {});

export type ChatMessageSource = "backfill" | "history" | "live" | "on_demand" | (string & {});

export interface ChatNotFoundDetails {
  chat_id: string;
}

/**
 * ChatParty is one WhatsApp user as the agent's account sees them.
 */
export interface ChatParty {
  business_name?: string;
  id: string;
  /**
   * The user's LID (privacy identity), "<digits>@lid".
   */
  lid?: string;
  /**
   * The user's phone JID, "<digits>@s.whatsapp.net", when known.
   */
  phone?: string;
  push_name?: string;
  /**
   * The agent's own account.
   */
  self?: boolean;
}

/**
 * ChatReaction is one user's current reaction to a chat message.
 */
export interface ChatReaction {
  emoji: string;
  reacted_at: string;
  user_id: string;
}

/**
 * ChatRef identifies a chat from the receiving account's perspective. Set
 * exactly one of `group_jid` (a group address ending in `@g.us`) and `user`
 * (the direct counterpart, which can be the account itself in a notes chat).
 * Announcement and community subgroups are supported. Community parents,
 * broadcast lists, status, newsletters, and interop chats are excluded.
 *
 * When present, `send_jid` is the sending address. It must equal `group_jid`
 * or match one of the JIDs in `user`, depending on the chat type.
 */
export interface ChatRef {
  group_jid?: string;
  send_jid?: string;
  user?: Party;
}

export type ChatType = "direct" | "group" | (string & {});

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
 * ContactCard is one shared contact.
 */
export interface ContactCard {
  display_name?: string;
  vcard: string;
}

/**
 * Content is the content of a WhatsApp message. Set `type` and include
 * exactly the content member with that name. For example, `type` set to
 * `text` requires a `text` member. Any type may include `context`.
 */
export type Content = {
  audio?: ContentAudio;
  call?: ContentCall;
  contacts?: ContentContacts;
  context?: ContentContext;
  document?: ContentDocument;
  image?: ContentImage;
  interactive?: ContentInteractive;
  interactive_reply?: ContentInteractiveReply;
  location?: ContentLocation;
  poll?: ContentPoll;
  poll_vote?: ContentPollVote;
  sticker?: ContentSticker;
  system?: ContentSystem;
  text?: ContentText;
  type: ContentType;
  unavailable?: ContentUnavailable;
  unsupported?: ContentUnsupported;
  video?: ContentVideo;
} & (ContentVariant1 | ContentVariant10 | ContentVariant11 | ContentVariant12 | ContentVariant13 | ContentVariant14 | ContentVariant15 | ContentVariant16 | ContentVariant2 | ContentVariant3 | ContentVariant4 | ContentVariant5 | ContentVariant6 | ContentVariant7 | ContentVariant8 | ContentVariant9);

/**
 * ContentAudio is an audio file. `voice_note` marks a push-to-talk note.
 */
export interface ContentAudio {
  media: MediaMeta;
  voice_note?: boolean;
}

/**
 * ContentButton is one button or list row. `id` is the reply identifier.
 */
export interface ContentButton {
  id?: string;
  text: string;
}

/**
 * ContentCall records an unanswered incoming call.
 */
export interface ContentCall {
  call_id: string;
  video?: boolean;
}

/**
 * ContentContacts contains one or more shared contact cards in `contacts`.
 */
export interface ContentContacts {
  contacts: ContactCard[];
}

/**
 * ContentContext is the context shared by every content type: the quoted
 * message, mentions and whether the message was forwarded.
 */
export interface ContentContext {
  forwarded?: boolean;
  mentions?: Party[];
  quoted?: MessageKey;
}

/**
 * ContentDocument is a document with an optional `caption`. Its file name
 * is available in `media.file_name` when supplied.
 */
export interface ContentDocument {
  caption?: string;
  media: MediaMeta;
  page_count?: number;
  title?: string;
}

/**
 * ContentImage is an image with an optional `caption`.
 */
export interface ContentImage {
  caption?: string;
  media: MediaMeta;
}

/**
 * ContentInteractive is a best-effort rendering of a buttons, list, template,
 * interactive or highly structured message: its texts and its buttons (list
 * rows included).
 */
export interface ContentInteractive {
  body?: string;
  buttons?: ContentButton[];
  footer?: string;
  title?: string;
}

/**
 * ContentInteractiveReply is a reply to an interactive message, including
 * buttons, lists, and templates. `selected_id` identifies the user's choice
 * and `text` gives the text they saw. `context.quoted` identifies the
 * original message.
 */
export interface ContentInteractiveReply {
  selected_id?: string;
  text?: string;
}

/**
 * ContentLinkPreview contains the link details WhatsApp attached to a text
 * message. The preview omits the thumbnail.
 */
export interface ContentLinkPreview {
  description?: string;
  title?: string;
  url?: string;
}

/**
 * ContentLocation is a shared location. When `live` is true, the coordinates
 * represent the initial point of a live location.
 */
export interface ContentLocation {
  address?: string;
  caption?: string;
  latitude: number;
  live?: boolean;
  longitude: number;
  name?: string;
  url?: string;
}

/**
 * ContentPoll is a poll. `selectable_count` limits the number of options a
 * voter may select. Zero allows any number.
 */
export interface ContentPoll {
  options: string[];
  question: string;
  selectable_count?: number;
}

/**
 * ContentPollVote records a vote on the poll identified by `target`.
 * `option_hashes` contains lowercase hexadecimal SHA-256 hashes of the
 * selected option labels. An empty list clears the vote. A vote that could
 * not be decrypted appears as `unavailable`, with the poll in `target`.
 */
export interface ContentPollVote {
  option_hashes?: string[];
  target: MessageKey;
}

/**
 * ContentSticker is a sticker, including Lottie stickers.
 */
export interface ContentSticker {
  animated?: boolean;
  media: MediaMeta;
}

/**
 * ContentSystem describes a chat event, such as a group change. The message
 * key's `sender` identifies the actor when WhatsApp reports one. `event`
 * determines which fields have values.
 *
 *   - `ephemeral_changed` uses `ephemeral_seconds`. Zero disables the timer.
 *   - `group_name_changed` uses `name` and `group_topic_changed` uses `topic`.
 *     An empty topic indicates removal.
 *   - `group_participants_*` uses `participants`, with at least one entry.
 *   - `group_announce_changed` and `group_locked_changed` use `enabled`.
 */
export interface ContentSystem {
  enabled?: boolean;
  ephemeral_seconds?: number;
  event: string;
  name?: string;
  participants?: Party[];
  topic?: string;
}

/**
 * ContentText contains a plain or extended text message in `body`.
 */
export interface ContentText {
  body: string;
  preview?: ContentLinkPreview;
}

/**
 * ContentType is the discriminator of Content. Each value is also the JSON
 * name of the one member that carries the content.
 */
export type ContentType = "audio" | "call" | "contacts" | "document" | "image" | "interactive" | "interactive_reply" | "location" | "poll" | "poll_vote" | "sticker" | "system" | "text" | "unavailable" | "unsupported" | "video" | (string & {});

/**
 * ContentUnavailable indicates that message content is unavailable. When
 * known, `expected_type` names the format, such as `image` for a view-once
 * photo. If a poll vote could not be decrypted, `target` identifies the poll.
 */
export interface ContentUnavailable {
  expected_type?: ContentType;
  reason: string;
  target?: MessageKey;
}

/**
 * ContentUnsupported indicates that a message's content could not be
 * represented. Read `reason` for the cause.
 */
export interface ContentUnsupported {
  field_number?: number;
  proto_field?: string;
  reason: string;
}

export interface ContentVariant1 {
  audio: ContentAudio;
  call?: unknown;
  contacts?: unknown;
  context?: ContentContext;
  document?: unknown;
  image?: unknown;
  interactive?: unknown;
  interactive_reply?: unknown;
  location?: unknown;
  poll?: unknown;
  poll_vote?: unknown;
  sticker?: unknown;
  system?: unknown;
  text?: unknown;
  type: "audio";
  unavailable?: unknown;
  unsupported?: unknown;
  video?: unknown;
}

export interface ContentVariant10 {
  audio?: unknown;
  call?: unknown;
  contacts?: unknown;
  context?: ContentContext;
  document?: unknown;
  image?: unknown;
  interactive?: unknown;
  interactive_reply?: unknown;
  location?: unknown;
  poll?: unknown;
  poll_vote: ContentPollVote;
  sticker?: unknown;
  system?: unknown;
  text?: unknown;
  type: "poll_vote";
  unavailable?: unknown;
  unsupported?: unknown;
  video?: unknown;
}

export interface ContentVariant11 {
  audio?: unknown;
  call?: unknown;
  contacts?: unknown;
  context?: ContentContext;
  document?: unknown;
  image?: unknown;
  interactive?: unknown;
  interactive_reply?: unknown;
  location?: unknown;
  poll?: unknown;
  poll_vote?: unknown;
  sticker: ContentSticker;
  system?: unknown;
  text?: unknown;
  type: "sticker";
  unavailable?: unknown;
  unsupported?: unknown;
  video?: unknown;
}

export interface ContentVariant12 {
  audio?: unknown;
  call?: unknown;
  contacts?: unknown;
  context?: ContentContext;
  document?: unknown;
  image?: unknown;
  interactive?: unknown;
  interactive_reply?: unknown;
  location?: unknown;
  poll?: unknown;
  poll_vote?: unknown;
  sticker?: unknown;
  system: ContentSystem;
  text?: unknown;
  type: "system";
  unavailable?: unknown;
  unsupported?: unknown;
  video?: unknown;
}

export interface ContentVariant13 {
  audio?: unknown;
  call?: unknown;
  contacts?: unknown;
  context?: ContentContext;
  document?: unknown;
  image?: unknown;
  interactive?: unknown;
  interactive_reply?: unknown;
  location?: unknown;
  poll?: unknown;
  poll_vote?: unknown;
  sticker?: unknown;
  system?: unknown;
  text: ContentText;
  type: "text";
  unavailable?: unknown;
  unsupported?: unknown;
  video?: unknown;
}

export interface ContentVariant14 {
  audio?: unknown;
  call?: unknown;
  contacts?: unknown;
  context?: ContentContext;
  document?: unknown;
  image?: unknown;
  interactive?: unknown;
  interactive_reply?: unknown;
  location?: unknown;
  poll?: unknown;
  poll_vote?: unknown;
  sticker?: unknown;
  system?: unknown;
  text?: unknown;
  type: "unavailable";
  unavailable: ContentUnavailable;
  unsupported?: unknown;
  video?: unknown;
}

export interface ContentVariant15 {
  audio?: unknown;
  call?: unknown;
  contacts?: unknown;
  context?: ContentContext;
  document?: unknown;
  image?: unknown;
  interactive?: unknown;
  interactive_reply?: unknown;
  location?: unknown;
  poll?: unknown;
  poll_vote?: unknown;
  sticker?: unknown;
  system?: unknown;
  text?: unknown;
  type: "unsupported";
  unavailable?: unknown;
  unsupported: ContentUnsupported;
  video?: unknown;
}

export interface ContentVariant16 {
  audio?: unknown;
  call?: unknown;
  contacts?: unknown;
  context?: ContentContext;
  document?: unknown;
  image?: unknown;
  interactive?: unknown;
  interactive_reply?: unknown;
  location?: unknown;
  poll?: unknown;
  poll_vote?: unknown;
  sticker?: unknown;
  system?: unknown;
  text?: unknown;
  type: "video";
  unavailable?: unknown;
  unsupported?: unknown;
  video: ContentVideo;
}

export interface ContentVariant2 {
  audio?: unknown;
  call: ContentCall;
  contacts?: unknown;
  context?: ContentContext;
  document?: unknown;
  image?: unknown;
  interactive?: unknown;
  interactive_reply?: unknown;
  location?: unknown;
  poll?: unknown;
  poll_vote?: unknown;
  sticker?: unknown;
  system?: unknown;
  text?: unknown;
  type: "call";
  unavailable?: unknown;
  unsupported?: unknown;
  video?: unknown;
}

export interface ContentVariant3 {
  audio?: unknown;
  call?: unknown;
  contacts: ContentContacts;
  context?: ContentContext;
  document?: unknown;
  image?: unknown;
  interactive?: unknown;
  interactive_reply?: unknown;
  location?: unknown;
  poll?: unknown;
  poll_vote?: unknown;
  sticker?: unknown;
  system?: unknown;
  text?: unknown;
  type: "contacts";
  unavailable?: unknown;
  unsupported?: unknown;
  video?: unknown;
}

export interface ContentVariant4 {
  audio?: unknown;
  call?: unknown;
  contacts?: unknown;
  context?: ContentContext;
  document: ContentDocument;
  image?: unknown;
  interactive?: unknown;
  interactive_reply?: unknown;
  location?: unknown;
  poll?: unknown;
  poll_vote?: unknown;
  sticker?: unknown;
  system?: unknown;
  text?: unknown;
  type: "document";
  unavailable?: unknown;
  unsupported?: unknown;
  video?: unknown;
}

export interface ContentVariant5 {
  audio?: unknown;
  call?: unknown;
  contacts?: unknown;
  context?: ContentContext;
  document?: unknown;
  image: ContentImage;
  interactive?: unknown;
  interactive_reply?: unknown;
  location?: unknown;
  poll?: unknown;
  poll_vote?: unknown;
  sticker?: unknown;
  system?: unknown;
  text?: unknown;
  type: "image";
  unavailable?: unknown;
  unsupported?: unknown;
  video?: unknown;
}

export interface ContentVariant6 {
  audio?: unknown;
  call?: unknown;
  contacts?: unknown;
  context?: ContentContext;
  document?: unknown;
  image?: unknown;
  interactive: ContentInteractive;
  interactive_reply?: unknown;
  location?: unknown;
  poll?: unknown;
  poll_vote?: unknown;
  sticker?: unknown;
  system?: unknown;
  text?: unknown;
  type: "interactive";
  unavailable?: unknown;
  unsupported?: unknown;
  video?: unknown;
}

export interface ContentVariant7 {
  audio?: unknown;
  call?: unknown;
  contacts?: unknown;
  context?: ContentContext;
  document?: unknown;
  image?: unknown;
  interactive?: unknown;
  interactive_reply: ContentInteractiveReply;
  location?: unknown;
  poll?: unknown;
  poll_vote?: unknown;
  sticker?: unknown;
  system?: unknown;
  text?: unknown;
  type: "interactive_reply";
  unavailable?: unknown;
  unsupported?: unknown;
  video?: unknown;
}

export interface ContentVariant8 {
  audio?: unknown;
  call?: unknown;
  contacts?: unknown;
  context?: ContentContext;
  document?: unknown;
  image?: unknown;
  interactive?: unknown;
  interactive_reply?: unknown;
  location: ContentLocation;
  poll?: unknown;
  poll_vote?: unknown;
  sticker?: unknown;
  system?: unknown;
  text?: unknown;
  type: "location";
  unavailable?: unknown;
  unsupported?: unknown;
  video?: unknown;
}

export interface ContentVariant9 {
  audio?: unknown;
  call?: unknown;
  contacts?: unknown;
  context?: ContentContext;
  document?: unknown;
  image?: unknown;
  interactive?: unknown;
  interactive_reply?: unknown;
  location?: unknown;
  poll: ContentPoll;
  poll_vote?: unknown;
  sticker?: unknown;
  system?: unknown;
  text?: unknown;
  type: "poll";
  unavailable?: unknown;
  unsupported?: unknown;
  video?: unknown;
}

/**
 * ContentVideo is a video. `gif_playback` marks a GIF and `video_note` marks
 * a round video note.
 */
export interface ContentVideo {
  caption?: string;
  gif_playback?: boolean;
  media: MediaMeta;
  video_note?: boolean;
}

export interface CreateAgentInput {
  outlet_id: string;
  /**
   * A phone number in E.164 format to request a WhatsApp linking code.
   */
  phone?: string;
}

export interface CreateAgentOutput {
  agent?: Agent;
  pairing?: AgentPairing;
}

export type CreateAgentOutputEnvelope = CreateAgentOutput & {
  status: "success";
};

export interface CreateBroadcastInput {
  affinity_fallback?: BroadcastAffinityFallbackRequest;
  content: BroadcastContent;
  distribution?: BroadcastDistributionRequest;
  interval?: BroadcastInterval | null;
  name: string;
  /**
   * At most 30 days after the start; defaults to that at start.
   */
  not_after?: string | null;
  not_before?: string | null;
  /**
   * Orders the broadcast's messages within the broadcast class.
   */
  priority_offset?: number;
  send_window?: SendWindow | null;
  /**
   * Up to 20 sender agents. Setting them, start and resume require
   * whatsapp.message.create on every sender.
   */
  sender_agent_ids?: string[];
  /**
   * Default 500, at most 2000.
   */
  sender_daily_limit?: number;
}

export type CreateMessageInput = {
  /**
   * The agent to send from. Required for organization-scoped requests
   * unless reply_to_id or an operation names a chat message, whose agent
   * it then must be. Authorized requests without an organization may omit
   * it to select an available sender.
   */
  agent_id?: string;
  edit?: MessageEdit | null;
  /**
   * After this time the service stops trying to send the message and it
   * ends expired. Must be in the future, after not_before, and after the
   * window's first opening.
   */
  not_after?: string | null;
  /**
   * Scheduled send: the message is not sent before this time.
   */
  not_before?: string | null;
  priority?: SendPriorityClassRequest;
  /**
   * Orders messages within the class; higher is sent first.
   */
  priority_offset?: number;
  reaction?: MessageReaction | null;
  /**
   * Makes a text or template send a reply quoting that chat message (a
   * direct chat only); quoting a received message also requires
   * whatsapp.inbound.read.
   */
  reply_to_id?: string;
  revoke?: MessageRevoke | null;
  send_window?: SendWindow | null;
  strategy?: SendMessageStrategy;
  template?: SendMessageTemplate | null;
  text?: MessageText | null;
  /**
   * The recipient. Required unless reply_to_id or an operation (reaction,
   * edit, revoke) names a chat message: the send then goes to that
   * message's chat, and to, if given, must be that chat's phone.
   */
  to?: string | null;
  type: CreateMessageType;
} & (CreateMessageInputVariant1 | CreateMessageInputVariant2 | CreateMessageInputVariant3 | CreateMessageInputVariant4 | CreateMessageInputVariant5);

export interface CreateMessageInputVariant1 {
  /**
   * The agent to send from. Required for organization-scoped requests
   * unless reply_to_id or an operation names a chat message, whose agent
   * it then must be. Authorized requests without an organization may omit
   * it to select an available sender.
   */
  agent_id?: string;
  edit: MessageEdit;
  /**
   * After this time the service stops trying to send the message and it
   * ends expired. Must be in the future, after not_before, and after the
   * window's first opening.
   */
  not_after?: string | null;
  /**
   * Scheduled send: the message is not sent before this time.
   */
  not_before?: string | null;
  priority?: SendPriorityClassRequest;
  /**
   * Orders messages within the class; higher is sent first.
   */
  priority_offset?: number;
  reaction?: unknown;
  /**
   * Makes a text or template send a reply quoting that chat message (a
   * direct chat only); quoting a received message also requires
   * whatsapp.inbound.read.
   */
  reply_to_id?: string;
  revoke?: unknown;
  send_window?: SendWindow | null;
  strategy?: SendMessageStrategy;
  template?: unknown;
  text?: unknown;
  /**
   * The recipient. Required unless reply_to_id or an operation (reaction,
   * edit, revoke) names a chat message: the send then goes to that
   * message's chat, and to, if given, must be that chat's phone.
   */
  to?: string | null;
  type: "edit";
}

export interface CreateMessageInputVariant2 {
  /**
   * The agent to send from. Required for organization-scoped requests
   * unless reply_to_id or an operation names a chat message, whose agent
   * it then must be. Authorized requests without an organization may omit
   * it to select an available sender.
   */
  agent_id?: string;
  edit?: unknown;
  /**
   * After this time the service stops trying to send the message and it
   * ends expired. Must be in the future, after not_before, and after the
   * window's first opening.
   */
  not_after?: string | null;
  /**
   * Scheduled send: the message is not sent before this time.
   */
  not_before?: string | null;
  priority?: SendPriorityClassRequest;
  /**
   * Orders messages within the class; higher is sent first.
   */
  priority_offset?: number;
  reaction: MessageReaction;
  /**
   * Makes a text or template send a reply quoting that chat message (a
   * direct chat only); quoting a received message also requires
   * whatsapp.inbound.read.
   */
  reply_to_id?: string;
  revoke?: unknown;
  send_window?: SendWindow | null;
  strategy?: SendMessageStrategy;
  template?: unknown;
  text?: unknown;
  /**
   * The recipient. Required unless reply_to_id or an operation (reaction,
   * edit, revoke) names a chat message: the send then goes to that
   * message's chat, and to, if given, must be that chat's phone.
   */
  to?: string | null;
  type: "reaction";
}

export interface CreateMessageInputVariant3 {
  /**
   * The agent to send from. Required for organization-scoped requests
   * unless reply_to_id or an operation names a chat message, whose agent
   * it then must be. Authorized requests without an organization may omit
   * it to select an available sender.
   */
  agent_id?: string;
  edit?: unknown;
  /**
   * After this time the service stops trying to send the message and it
   * ends expired. Must be in the future, after not_before, and after the
   * window's first opening.
   */
  not_after?: string | null;
  /**
   * Scheduled send: the message is not sent before this time.
   */
  not_before?: string | null;
  priority?: SendPriorityClassRequest;
  /**
   * Orders messages within the class; higher is sent first.
   */
  priority_offset?: number;
  reaction?: unknown;
  /**
   * Makes a text or template send a reply quoting that chat message (a
   * direct chat only); quoting a received message also requires
   * whatsapp.inbound.read.
   */
  reply_to_id?: string;
  revoke: MessageRevoke;
  send_window?: SendWindow | null;
  strategy?: SendMessageStrategy;
  template?: unknown;
  text?: unknown;
  /**
   * The recipient. Required unless reply_to_id or an operation (reaction,
   * edit, revoke) names a chat message: the send then goes to that
   * message's chat, and to, if given, must be that chat's phone.
   */
  to?: string | null;
  type: "revoke";
}

export interface CreateMessageInputVariant4 {
  /**
   * The agent to send from. Required for organization-scoped requests
   * unless reply_to_id or an operation names a chat message, whose agent
   * it then must be. Authorized requests without an organization may omit
   * it to select an available sender.
   */
  agent_id?: string;
  edit?: unknown;
  /**
   * After this time the service stops trying to send the message and it
   * ends expired. Must be in the future, after not_before, and after the
   * window's first opening.
   */
  not_after?: string | null;
  /**
   * Scheduled send: the message is not sent before this time.
   */
  not_before?: string | null;
  priority?: SendPriorityClassRequest;
  /**
   * Orders messages within the class; higher is sent first.
   */
  priority_offset?: number;
  reaction?: unknown;
  /**
   * Makes a text or template send a reply quoting that chat message (a
   * direct chat only); quoting a received message also requires
   * whatsapp.inbound.read.
   */
  reply_to_id?: string;
  revoke?: unknown;
  send_window?: SendWindow | null;
  strategy?: SendMessageStrategy;
  template: SendMessageTemplate;
  text?: unknown;
  /**
   * The recipient. Required unless reply_to_id or an operation (reaction,
   * edit, revoke) names a chat message: the send then goes to that
   * message's chat, and to, if given, must be that chat's phone.
   */
  to?: string | null;
  type: "template";
}

export interface CreateMessageInputVariant5 {
  /**
   * The agent to send from. Required for organization-scoped requests
   * unless reply_to_id or an operation names a chat message, whose agent
   * it then must be. Authorized requests without an organization may omit
   * it to select an available sender.
   */
  agent_id?: string;
  edit?: unknown;
  /**
   * After this time the service stops trying to send the message and it
   * ends expired. Must be in the future, after not_before, and after the
   * window's first opening.
   */
  not_after?: string | null;
  /**
   * Scheduled send: the message is not sent before this time.
   */
  not_before?: string | null;
  priority?: SendPriorityClassRequest;
  /**
   * Orders messages within the class; higher is sent first.
   */
  priority_offset?: number;
  reaction?: unknown;
  /**
   * Makes a text or template send a reply quoting that chat message (a
   * direct chat only); quoting a received message also requires
   * whatsapp.inbound.read.
   */
  reply_to_id?: string;
  revoke?: unknown;
  send_window?: SendWindow | null;
  strategy?: SendMessageStrategy;
  template?: unknown;
  text: MessageText;
  /**
   * The recipient. Required unless reply_to_id or an operation (reaction,
   * edit, revoke) names a chat message: the send then goes to that
   * message's chat, and to, if given, must be that chat's phone.
   */
  to?: string | null;
  type: "text";
}

export interface CreateMessageOutput {
  message?: Message;
}

export type CreateMessageOutputEnvelope = CreateMessageOutput & {
  status: "success";
};

export interface CreateMessageTemplateInput {
  description?: string;
  locale: TemplateLocaleRequest;
  name: string;
  params: TemplateParam[];
  timezone: string;
  variants: TemplateVariantInput[];
}

export type CreateMessageType = "edit" | "reaction" | "revoke" | "template" | "text";

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

export interface DeleteAgentOutput {
  deletion?: AgentDeletion;
}

export type DeleteAgentOutputEnvelope = DeleteAgentOutput & {
  status: "success";
};

export interface FetchAgentOutput {
  agent?: Agent;
}

export type FetchAgentOutputEnvelope = FetchAgentOutput & {
  status: "success";
};

export interface FetchAgentPairingOutput {
  pairing?: AgentPairing;
}

export type FetchAgentPairingOutputEnvelope = FetchAgentPairingOutput & {
  status: "success";
};

export interface FetchAgentsOutput {
  agents?: ListPageAgent;
}

export type FetchAgentsOutputEnvelope = FetchAgentsOutput & {
  status: "success";
};

export interface FetchBroadcastRecipientsOutput {
  recipients?: ListPageBroadcastRecipient;
}

export type FetchBroadcastRecipientsOutputEnvelope = FetchBroadcastRecipientsOutput & {
  status: "success";
};

export interface FetchBroadcastSuppressionsOutput {
  suppressions?: ListPageBroadcastSuppression;
}

export type FetchBroadcastSuppressionsOutputEnvelope = FetchBroadcastSuppressionsOutput & {
  status: "success";
};

export interface FetchBroadcastsOutput {
  broadcasts?: ListPageBroadcast;
}

export type FetchBroadcastsOutputEnvelope = FetchBroadcastsOutput & {
  status: "success";
};

export interface FetchChatMessageOutput {
  message?: ChatMessage;
}

export type FetchChatMessageOutputEnvelope = FetchChatMessageOutput & {
  status: "success";
};

export interface FetchChatMessagesOutput {
  messages?: ListPageChatMessage;
}

export type FetchChatMessagesOutputEnvelope = FetchChatMessagesOutput & {
  status: "success";
};

export interface FetchChatOutput {
  chat?: Chat;
}

export type FetchChatOutputEnvelope = FetchChatOutput & {
  status: "success";
};

export interface FetchChatsOutput {
  chats?: ListPageChat;
}

export type FetchChatsOutputEnvelope = FetchChatsOutput & {
  status: "success";
};

export interface FetchMessageOutput {
  message?: Message;
}

export type FetchMessageOutputEnvelope = FetchMessageOutput & {
  status: "success";
};

export interface FetchMessageTemplatesOutput {
  templates?: ListPageMessageTemplate;
}

export type FetchMessageTemplatesOutputEnvelope = FetchMessageTemplatesOutput & {
  status: "success";
};

export interface FetchMessagesOutput {
  messages?: ListPageMessage;
}

export type FetchMessagesOutputEnvelope = FetchMessagesOutput & {
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
 * ListPage is one page of a list in either mode.
 */
export interface ListPageAgent {
  data: Array<Agent | null>;
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
export interface ListPageBroadcast {
  data: Array<Broadcast | null>;
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
export interface ListPageBroadcastRecipient {
  data: Array<BroadcastRecipient | null>;
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
export interface ListPageBroadcastSuppression {
  data: Array<BroadcastSuppression | null>;
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
export interface ListPageChat {
  data: Array<Chat | null>;
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
export interface ListPageChatMessage {
  data: Array<ChatMessage | null>;
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
export interface ListPageMessage {
  data: Array<Message | null>;
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
export interface ListPageMessageTemplate {
  data: Array<MessageTemplate | null>;
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
 * MediaMeta describes a media file with metadata such as its size or MIME type.
 */
export interface MediaMeta {
  duration_seconds?: number;
  file_name?: string;
  height?: number;
  mimetype?: string;
  /**
   * SHA-256 hash of the file before encryption, encoded as lowercase hex.
   */
  sha256?: string;
  /**
   * File length in bytes before encryption.
   */
  size?: number;
  width?: number;
}

export interface Message {
  agent_id: string;
  /**
   * The broadcast the message was sent for.
   */
  broadcast_id?: string;
  create_at: string;
  /**
   * When the message was sent to WhatsApp (single tick); it does not
   * confirm receipt by the recipient: see receipt.
   */
  delivered_at?: string;
  error?: MessageError;
  /**
   * The agent's current phone number, which may differ from its number when the message was sent.
   */
  from?: string;
  id: string;
  /**
   * The service stops trying to send the message after this time.
   */
  not_after?: string;
  /**
   * The message is not sent before this time.
   */
  not_before?: string;
  organization_id?: string;
  priority?: SendPriorityClass;
  priority_offset: number;
  reaction?: MessageReactionEmoji;
  receipt?: MessageReceipt;
  /**
   * Whether the message text is withheld from this response.
   */
  redacted?: boolean;
  /**
   * The chat message a reply quotes.
   */
  reply_to_id?: string;
  send_window?: SendWindowOutput;
  status: MessageStatus;
  /**
   * The chat message a reaction, edit or revoke changes.
   */
  target_id?: string;
  template?: MessageTemplateReference;
  text?: MessageTextOutput;
  /**
   * The recipient phone; absent for an operation in a chat whose
   * counterpart has no known phone.
   */
  to?: string;
  type: MessageKind;
  update_at: string;
}

/**
 * MessageEdit replaces the text of one of the agent's own text messages,
 * within 20 minutes of its send.
 */
export interface MessageEdit {
  body: string;
  target_id: string;
}

export interface MessageError {
  code: string;
  detail: string;
}

/**
 * MessageKey identifies a WhatsApp message by `chat`, the original author
 * in `sender`, and the WhatsApp message ID in `wid`. `sender.self` marks
 * messages authored by the receiving account.
 */
export interface MessageKey {
  chat: ChatRef;
  sender: Party;
  wid: string;
}

/**
 * The content type of a WhatsApp message, or the operation a send performs
 * on an earlier message (reaction, edit, revoke).
 */
export type MessageKind = "audio" | "contact" | "document" | "edit" | "image" | "location" | "reaction" | "revoke" | "sticker" | "text" | "unknown" | "video" | (string & {});

export interface MessageOperationNotAllowedDetails {
  reason: MessageOperationRefusal;
  target_id: string;
}

/**
 * Why an operation on a chat message is refused.
 */
export type MessageOperationRefusal = "group_chat" | "not_own" | "not_text" | "revoked" | "unaddressable" | "window_closed" | (string & {});

/**
 * MessageReaction sets the agent's reaction on a chat message.
 */
export interface MessageReaction {
  /**
   * One emoji; an empty string removes the agent's reaction.
   */
  emoji?: string;
  /**
   * ID of the chat message to react to. A message sent through the API
   * can be identified by its message ID. Reacting to a received message
   * requires `whatsapp.inbound.read`.
   */
  target_id: string;
}

/**
 * MessageReactionEmoji is the emoji a reaction send sets.
 */
export interface MessageReactionEmoji {
  /**
   * Empty when the send removes the agent's reaction.
   */
  emoji: string;
}

/**
 * MessageReceipt is the WhatsApp receipt state of a sent message. Receipts
 * are best effort: a recipient with read receipts off never reports read.
 */
export interface MessageReceipt {
  delivered_at?: string;
  played_at?: string;
  read_at?: string;
  sent_at?: string;
  status: MessageReceiptStatus;
}

/**
 * How far WhatsApp confirmed a sent message.
 */
export type MessageReceiptStatus = "delivered" | "pending" | "played" | "read" | "sent" | (string & {});

/**
 * MessageRevoke deletes one of the agent's own messages for everyone,
 * within 48 hours of its send.
 */
export interface MessageRevoke {
  target_id: string;
}

/**
 * The sending status of a WhatsApp message.
 */
export type MessageStatus = "cancelled" | "delivered" | "error" | "expired" | "pending" | (string & {});

/**
 * The sending status of a WhatsApp message.
 */
export type MessageStatusRequest = "cancelled" | "delivered" | "error" | "expired" | "pending";

/**
 * Identifies the chat message targeted by the request.
 */
export interface MessageTargetDetails {
  /**
   * ID of the chat message specified by `reply_to_id` or `target_id`.
   */
  target_id: string;
}

export interface MessageTemplate {
  create_at: string;
  description: string;
  id: string;
  locale: TemplateLocale;
  name: string;
  organization_id: string;
  params: TemplateParamOutput[];
  timezone: string;
  update_at: string;
  variants: TemplateVariant[];
}

export interface MessageTemplateOutput {
  template?: MessageTemplate;
}

export type MessageTemplateOutputEnvelope = MessageTemplateOutput & {
  status: "success";
};

export interface MessageTemplateReference {
  id: string;
  variant_id: string;
}

export interface MessageText {
  body: string;
}

export interface MessageTextOutput {
  body: string;
}

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
 * Party identifies a WhatsApp user from the receiving account's perspective.
 * Supply at least one of `lid` and `phone` as a device-less JID (`<digits>@<server>`).
 *
 *   - `lid` is the canonical identity: server `lid`, or `hosted.lid` for a
 *     Cloud-API-hosted business account (it behaves like a LID).
 *   - `phone` is the non-LID alias: server `s.whatsapp.net`, `hosted` (a hosted
 *     account's phone alias) or `bot` (Meta AI and other WhatsApp bots, which
 *     have no LID).
 *
 * `self` marks the receiving account itself.
 */
export interface Party {
  lid?: string;
  phone?: string;
  self?: boolean;
}

export interface PollChatMessagesOutput {
  /**
   * Poll again with this after_rev.
   */
  after_rev: number;
  /**
   * More messages are ready now.
   */
  has_more: boolean;
  /**
   * New, changed and merged messages in revision order; a merged copy is
   * a tombstone (id, rev, merged_into_id).
   */
  messages: Array<ChatMessage | null>;
}

export type PollChatMessagesOutputEnvelope = PollChatMessagesOutput & {
  status: "success";
};

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

export interface PreviewMessageTemplateInput {
  params: Record<string, TemplateDateValue | TemplateDatetimeValue | TemplateMoneyValue | TemplateTextValue>;
}

export interface PreviewMessageTemplateOutput {
  variants: RenderedTemplateVariant[];
}

export type PreviewMessageTemplateOutputEnvelope = PreviewMessageTemplateOutput & {
  status: "success";
};

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

export interface RenderedTemplateVariant {
  enabled: boolean;
  length: number;
  text: string;
  /**
   * Whether the rendered variant exceeds the message length limit, even
   * when the variant is disabled.
   */
  too_long: boolean;
  variant_id: string;
}

export type RunCapacityState = "admitted" | "queued" | "released" | "running" | "starting" | (string & {});

/**
 * How the recipient is resolved before sending a message.
 */
export type SendMessageStrategy = "only_lid" | "only_phone" | "prefer_lid" | "prefer_phone";

export interface SendMessageTemplate {
  id: string;
  params: Record<string, TemplateDateValue | TemplateDatetimeValue | TemplateMoneyValue | TemplateTextValue>;
}

/**
 * SendPacing controls the delay between the start of consecutive message
 * sends. Set `min_interval_ms` and `max_interval_ms` to bound the randomly
 * chosen delay in milliseconds. Set both to zero to disable spacing.
 */
export interface SendPacingOutput {
  max_interval_ms: number;
  min_interval_ms: number;
}

/**
 * A priority band for sending messages. An offset adjusts priority
 * within the selected class.
 */
export type SendPriorityClass = "background" | "broadcast" | "critical" | "interaction" | "normal" | (string & {});

/**
 * A priority band for sending messages. An offset adjusts priority
 * within the selected class.
 */
export type SendPriorityClassRequest = "background" | "broadcast" | "critical" | "interaction" | "normal";

/**
 * SendWindow is a recurring local wall-clock window in which a message may be
 * sent; outside it the message waits for the next opening.
 */
export interface SendWindow {
  /**
   * Weekdays on which the window opens, unique; empty means every day.
   * A window that wraps past midnight belongs to the day it opens.
   */
  days?: WeekdayRequest[];
  /**
   * Opening time, "HH:MM" 24-hour, local to timezone.
   */
  from: string;
  /**
   * IANA timezone name, e.g. Asia/Kuala_Lumpur.
   */
  timezone: string;
  /**
   * Closing time, "HH:MM", exclusive; earlier than from wraps past midnight. Must differ from from.
   */
  to: string;
}

/**
 * SendWindow is a recurring local wall-clock window in which a message may be
 * sent; outside it the message waits for the next opening.
 */
export interface SendWindowOutput {
  /**
   * Weekdays on which the window opens, unique; empty means every day.
   * A window that wraps past midnight belongs to the day it opens.
   */
  days?: Weekday[];
  /**
   * Opening time, "HH:MM" 24-hour, local to timezone.
   */
  from: string;
  /**
   * IANA timezone name, e.g. Asia/Kuala_Lumpur.
   */
  timezone: string;
  /**
   * Closing time, "HH:MM", exclusive; earlier than from wraps past midnight. Must differ from from.
   */
  to: string;
}

export interface TemplateDateValue {
  date: string;
  kind: "date";
}

export interface TemplateDateValueOutput {
  date: string;
  kind: "date";
}

export interface TemplateDatetimeValue {
  datetime: string;
  kind: "datetime";
}

export interface TemplateDatetimeValueOutput {
  datetime: string;
  kind: "datetime";
}

export interface TemplateLimitReachedDetails {
  limit: number;
}

export type TemplateLocale = "en" | "ms" | "zh-Hans" | "zh-Hant" | (string & {});

export type TemplateLocaleRequest = "en" | "ms" | "zh-Hans" | "zh-Hant";

export interface TemplateMoneyValue {
  amount: string;
  currency: string;
  kind: "money";
}

export interface TemplateMoneyValueOutput {
  amount: string;
  currency: string;
  kind: "money";
}

export interface TemplateNotFoundDetails {
  template_id: string;
}

export interface TemplateParam {
  kind?: TemplateParamKindRequest;
  name?: string;
}

export type TemplateParamKind = "date" | "datetime" | "money" | "text" | (string & {});

export type TemplateParamKindRequest = "date" | "datetime" | "money" | "text";

export interface TemplateParamOutput {
  kind: TemplateParamKind;
  name: string;
}

export interface TemplateRenderedTooLongDetails {
  length: number;
  limit: number;
  variant_id: string;
}

export interface TemplateTextValue {
  kind: "text";
  text: string;
}

export interface TemplateTextValueOutput {
  kind: "text";
  text: string;
}

export interface TemplateVariant {
  enabled: boolean;
  id: string;
  text: string;
}

export interface TemplateVariantInput {
  enabled: boolean;
  id?: string | null;
  text: string;
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
 * UNAVAILABLE (503): The service is temporarily unavailable. Try again later. Retryable.
 */
export interface UnavailableProblem {
  code: "UNAVAILABLE";
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
  /**
   * Retry delay hint in milliseconds; mirrors the Retry-After header.
   */
  retry_after_ms?: number;
  retryable: true;
  status: 503;
  /**
   * Localized by Accept-Language; English: "The service is temporarily unavailable. Try again later."
   */
  title: string;
  /**
   * Problem type URI, one-to-one with code; documentation only, never dereferenced at runtime.
   */
  type: "https://docs.gatherdeal.ai/errors/UNAVAILABLE";
}

export interface UpdateAgentInput {
  outlet_id?: string | null;
  /**
   * The last-read update_at value at millisecond precision.
   */
  revision?: string;
}

export interface UpdateAgentOutput {
  agent?: Agent;
}

export type UpdateAgentOutputEnvelope = UpdateAgentOutput & {
  status: "success";
};

export interface UpdateBroadcastInput {
  affinity_fallback?: BroadcastAffinityFallbackRequest;
  content?: BroadcastContent;
  distribution?: BroadcastDistributionRequest;
  interval?: BroadcastInterval;
  name?: string;
  not_after?: string | null;
  not_before?: string | null;
  priority_offset?: number;
  send_window?: SendWindow | null;
  sender_agent_ids?: string[];
  sender_daily_limit?: number;
}

export interface UpdateMessageTemplateInput {
  description?: string;
  locale: TemplateLocaleRequest;
  name: string;
  params: TemplateParam[];
  timezone: string;
  variants: TemplateVariantInput[];
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

/**
 * Weekday names the local date on which a send window occurrence opens.
 */
export type Weekday = "fri" | "mon" | "sat" | "sun" | "thu" | "tue" | "wed" | (string & {});

/**
 * Weekday names the local date on which a send window occurrence opens.
 */
export type WeekdayRequest = "fri" | "mon" | "sat" | "sun" | "thu" | "tue" | "wed";

/**
 * WHATSAPP_AGENT_NOT_FOUND (404): Agent not found.
 */
export interface WhatsAppAgentNotFoundProblem {
  code: "WHATSAPP_AGENT_NOT_FOUND";
  correlation_id?: string;
  /**
   * Localized instance-specific text.
   */
  detail?: string;
  details: AgentNotFoundDetails;
  /**
   * urn:gatherdeal:request:<correlation_id>
   */
  instance?: string;
  record?: ProblemRecord;
  retryable: false;
  status: 404;
  /**
   * Localized by Accept-Language; English: "Agent not found."
   */
  title: string;
  /**
   * Problem type URI, one-to-one with code; documentation only, never dereferenced at runtime.
   */
  type: "https://docs.gatherdeal.ai/errors/WHATSAPP_AGENT_NOT_FOUND";
}

/**
 * WHATSAPP_AGENT_NOT_READY (409): The agent must complete pairing before sending messages.
 */
export interface WhatsAppAgentNotReadyProblem {
  code: "WHATSAPP_AGENT_NOT_READY";
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
   * Localized by Accept-Language; English: "The agent must complete pairing before sending messages."
   */
  title: string;
  /**
   * Problem type URI, one-to-one with code; documentation only, never dereferenced at runtime.
   */
  type: "https://docs.gatherdeal.ai/errors/WHATSAPP_AGENT_NOT_READY";
}

/**
 * WHATSAPP_AGENT_OUTLET_INVALID (422): Outlet must belong to the agent organization.
 */
export interface WhatsAppAgentOutletInvalidProblem {
  code: "WHATSAPP_AGENT_OUTLET_INVALID";
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
   * Localized by Accept-Language; English: "Outlet must belong to the agent organization."
   */
  title: string;
  /**
   * Problem type URI, one-to-one with code; documentation only, never dereferenced at runtime.
   */
  type: "https://docs.gatherdeal.ai/errors/WHATSAPP_AGENT_OUTLET_INVALID";
}

/**
 * WHATSAPP_AGENT_PENDING_MESSAGES_LIMIT_REACHED (429): Too many messages are pending for this agent. Retryable.
 */
export interface WhatsAppAgentPendingMessagesLimitReachedProblem {
  code: "WHATSAPP_AGENT_PENDING_MESSAGES_LIMIT_REACHED";
  correlation_id?: string;
  /**
   * Localized, rendered from details; English template: "{pending} messages are pending for this agent; the limit is {limit}."
   */
  detail?: string;
  details: AgentPendingMessagesLimitReachedDetails;
  /**
   * urn:gatherdeal:request:<correlation_id>
   */
  instance?: string;
  record?: ProblemRecord;
  /**
   * Retry delay hint in milliseconds; mirrors the Retry-After header.
   */
  retry_after_ms?: number;
  retryable: true;
  status: 429;
  /**
   * Localized by Accept-Language; English: "Too many messages are pending for this agent."
   */
  title: string;
  /**
   * Problem type URI, one-to-one with code; documentation only, never dereferenced at runtime.
   */
  type: "https://docs.gatherdeal.ai/errors/WHATSAPP_AGENT_PENDING_MESSAGES_LIMIT_REACHED";
}

/**
 * WHATSAPP_AGENT_SLOT_LIMIT_REACHED (422): Your organization has no available WhatsApp API agent slot.
 */
export interface WhatsAppAgentSlotLimitReachedProblem {
  code: "WHATSAPP_AGENT_SLOT_LIMIT_REACHED";
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
   * Localized by Accept-Language; English: "Your organization has no available WhatsApp API agent slot."
   */
  title: string;
  /**
   * Problem type URI, one-to-one with code; documentation only, never dereferenced at runtime.
   */
  type: "https://docs.gatherdeal.ai/errors/WHATSAPP_AGENT_SLOT_LIMIT_REACHED";
}

/**
 * WHATSAPP_AGENTS_FENCED (503): Agents cannot be started during maintenance. Try again later. Retryable.
 */
export interface WhatsAppAgentsFencedProblem {
  code: "WHATSAPP_AGENTS_FENCED";
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
  /**
   * Retry delay hint in milliseconds; mirrors the Retry-After header.
   */
  retry_after_ms?: number;
  retryable: true;
  status: 503;
  /**
   * Localized by Accept-Language; English: "Agents cannot be started during maintenance. Try again later."
   */
  title: string;
  /**
   * Problem type URI, one-to-one with code; documentation only, never dereferenced at runtime.
   */
  type: "https://docs.gatherdeal.ai/errors/WHATSAPP_AGENTS_FENCED";
}

/**
 * WHATSAPP_BROADCAST_ACTIVE_LIMIT_REACHED (409): Your organization has too many broadcasts in progress.
 */
export interface WhatsAppBroadcastActiveLimitReachedProblem {
  code: "WHATSAPP_BROADCAST_ACTIVE_LIMIT_REACHED";
  correlation_id?: string;
  /**
   * Localized, rendered from details; English template: "{count} broadcasts are in progress; the limit is {limit}."
   */
  detail?: string;
  details: BroadcastLimitReachedDetails;
  /**
   * urn:gatherdeal:request:<correlation_id>
   */
  instance?: string;
  record?: ProblemRecord;
  retryable: false;
  status: 409;
  /**
   * Localized by Accept-Language; English: "Your organization has too many broadcasts in progress."
   */
  title: string;
  /**
   * Problem type URI, one-to-one with code; documentation only, never dereferenced at runtime.
   */
  type: "https://docs.gatherdeal.ai/errors/WHATSAPP_BROADCAST_ACTIVE_LIMIT_REACHED";
}

/**
 * WHATSAPP_BROADCAST_NOT_FOUND (404): Broadcast not found.
 */
export interface WhatsAppBroadcastNotFoundProblem {
  code: "WHATSAPP_BROADCAST_NOT_FOUND";
  correlation_id?: string;
  /**
   * Localized instance-specific text.
   */
  detail?: string;
  details: BroadcastNotFoundDetails;
  /**
   * urn:gatherdeal:request:<correlation_id>
   */
  instance?: string;
  record?: ProblemRecord;
  retryable: false;
  status: 404;
  /**
   * Localized by Accept-Language; English: "Broadcast not found."
   */
  title: string;
  /**
   * Problem type URI, one-to-one with code; documentation only, never dereferenced at runtime.
   */
  type: "https://docs.gatherdeal.ai/errors/WHATSAPP_BROADCAST_NOT_FOUND";
}

/**
 * WHATSAPP_BROADCAST_RECIPIENT_LIMIT_REACHED (422): The broadcast has too many recipients.
 */
export interface WhatsAppBroadcastRecipientLimitReachedProblem {
  code: "WHATSAPP_BROADCAST_RECIPIENT_LIMIT_REACHED";
  correlation_id?: string;
  /**
   * Localized, rendered from details; English template: "The broadcast would have {count} recipients; the limit is {limit}."
   */
  detail?: string;
  details: BroadcastLimitReachedDetails;
  /**
   * urn:gatherdeal:request:<correlation_id>
   */
  instance?: string;
  record?: ProblemRecord;
  retryable: false;
  status: 422;
  /**
   * Localized by Accept-Language; English: "The broadcast has too many recipients."
   */
  title: string;
  /**
   * Problem type URI, one-to-one with code; documentation only, never dereferenced at runtime.
   */
  type: "https://docs.gatherdeal.ai/errors/WHATSAPP_BROADCAST_RECIPIENT_LIMIT_REACHED";
}

/**
 * WHATSAPP_BROADCAST_RECIPIENT_NOT_FOUND (404): Broadcast recipient not found.
 */
export interface WhatsAppBroadcastRecipientNotFoundProblem {
  code: "WHATSAPP_BROADCAST_RECIPIENT_NOT_FOUND";
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
   * Localized by Accept-Language; English: "Broadcast recipient not found."
   */
  title: string;
  /**
   * Problem type URI, one-to-one with code; documentation only, never dereferenced at runtime.
   */
  type: "https://docs.gatherdeal.ai/errors/WHATSAPP_BROADCAST_RECIPIENT_NOT_FOUND";
}

/**
 * WHATSAPP_BROADCAST_SENDER_UNAVAILABLE (422): This agent cannot send the broadcast.
 */
export interface WhatsAppBroadcastSenderUnavailableProblem {
  code: "WHATSAPP_BROADCAST_SENDER_UNAVAILABLE";
  correlation_id?: string;
  /**
   * Localized instance-specific text.
   */
  detail?: string;
  details: BroadcastSenderUnavailableDetails;
  /**
   * urn:gatherdeal:request:<correlation_id>
   */
  instance?: string;
  record?: ProblemRecord;
  retryable: false;
  status: 422;
  /**
   * Localized by Accept-Language; English: "This agent cannot send the broadcast."
   */
  title: string;
  /**
   * Problem type URI, one-to-one with code; documentation only, never dereferenced at runtime.
   */
  type: "https://docs.gatherdeal.ai/errors/WHATSAPP_BROADCAST_SENDER_UNAVAILABLE";
}

/**
 * WHATSAPP_BROADCAST_STATE_CONFLICT (409): The broadcast's status does not allow this action.
 */
export interface WhatsAppBroadcastStateConflictProblem {
  code: "WHATSAPP_BROADCAST_STATE_CONFLICT";
  correlation_id?: string;
  /**
   * Localized, rendered from details; English template: "The broadcast is {status}."
   */
  detail?: string;
  details: BroadcastStateConflictDetails;
  /**
   * urn:gatherdeal:request:<correlation_id>
   */
  instance?: string;
  record?: ProblemRecord;
  retryable: false;
  status: 409;
  /**
   * Localized by Accept-Language; English: "The broadcast's status does not allow this action."
   */
  title: string;
  /**
   * Problem type URI, one-to-one with code; documentation only, never dereferenced at runtime.
   */
  type: "https://docs.gatherdeal.ai/errors/WHATSAPP_BROADCAST_STATE_CONFLICT";
}

/**
 * WHATSAPP_BROADCAST_SUPPRESSION_NOT_FOUND (404): Broadcast suppression not found.
 */
export interface WhatsAppBroadcastSuppressionNotFoundProblem {
  code: "WHATSAPP_BROADCAST_SUPPRESSION_NOT_FOUND";
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
   * Localized by Accept-Language; English: "Broadcast suppression not found."
   */
  title: string;
  /**
   * Problem type URI, one-to-one with code; documentation only, never dereferenced at runtime.
   */
  type: "https://docs.gatherdeal.ai/errors/WHATSAPP_BROADCAST_SUPPRESSION_NOT_FOUND";
}

/**
 * WHATSAPP_CHAT_NOT_FOUND (404): Chat not found.
 */
export interface WhatsAppChatNotFoundProblem {
  code: "WHATSAPP_CHAT_NOT_FOUND";
  correlation_id?: string;
  /**
   * Localized instance-specific text.
   */
  detail?: string;
  details: ChatNotFoundDetails;
  /**
   * urn:gatherdeal:request:<correlation_id>
   */
  instance?: string;
  record?: ProblemRecord;
  retryable: false;
  status: 404;
  /**
   * Localized by Accept-Language; English: "Chat not found."
   */
  title: string;
  /**
   * Problem type URI, one-to-one with code; documentation only, never dereferenced at runtime.
   */
  type: "https://docs.gatherdeal.ai/errors/WHATSAPP_CHAT_NOT_FOUND";
}

/**
 * WHATSAPP_MESSAGE_NOT_FOUND (404): Message not found.
 */
export interface WhatsAppMessageNotFoundProblem {
  code: "WHATSAPP_MESSAGE_NOT_FOUND";
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
   * Localized by Accept-Language; English: "Message not found."
   */
  title: string;
  /**
   * Problem type URI, one-to-one with code; documentation only, never dereferenced at runtime.
   */
  type: "https://docs.gatherdeal.ai/errors/WHATSAPP_MESSAGE_NOT_FOUND";
}

/**
 * WHATSAPP_MESSAGE_OPERATION_NOT_ALLOWED (409): This operation is not allowed on the referenced message.
 */
export interface WhatsAppMessageOperationNotAllowedProblem {
  code: "WHATSAPP_MESSAGE_OPERATION_NOT_ALLOWED";
  correlation_id?: string;
  /**
   * Localized, rendered from details; English template: "Operation refused: {reason}."
   */
  detail?: string;
  details: MessageOperationNotAllowedDetails;
  /**
   * urn:gatherdeal:request:<correlation_id>
   */
  instance?: string;
  record?: ProblemRecord;
  retryable: false;
  status: 409;
  /**
   * Localized by Accept-Language; English: "This operation is not allowed on the referenced message."
   */
  title: string;
  /**
   * Problem type URI, one-to-one with code; documentation only, never dereferenced at runtime.
   */
  type: "https://docs.gatherdeal.ai/errors/WHATSAPP_MESSAGE_OPERATION_NOT_ALLOWED";
}

/**
 * WHATSAPP_MESSAGE_PRIORITY_NOT_ALLOWED (403): This send priority is not allowed for the caller.
 */
export interface WhatsAppMessagePriorityNotAllowedProblem {
  code: "WHATSAPP_MESSAGE_PRIORITY_NOT_ALLOWED";
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
   * Localized by Accept-Language; English: "This send priority is not allowed for the caller."
   */
  title: string;
  /**
   * Problem type URI, one-to-one with code; documentation only, never dereferenced at runtime.
   */
  type: "https://docs.gatherdeal.ai/errors/WHATSAPP_MESSAGE_PRIORITY_NOT_ALLOWED";
}

/**
 * WHATSAPP_MESSAGE_RUNTIME_UNSUPPORTED (409): This agent cannot send messages through the API. Create and pair a new agent.
 */
export interface WhatsAppMessageRuntimeUnsupportedProblem {
  code: "WHATSAPP_MESSAGE_RUNTIME_UNSUPPORTED";
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
   * Localized by Accept-Language; English: "This agent cannot send messages through the API. Create and pair a new agent."
   */
  title: string;
  /**
   * Problem type URI, one-to-one with code; documentation only, never dereferenced at runtime.
   */
  type: "https://docs.gatherdeal.ai/errors/WHATSAPP_MESSAGE_RUNTIME_UNSUPPORTED";
}

/**
 * WHATSAPP_MESSAGE_TARGET_NOT_FOUND (404): The referenced message was not found.
 */
export interface WhatsAppMessageTargetNotFoundProblem {
  code: "WHATSAPP_MESSAGE_TARGET_NOT_FOUND";
  correlation_id?: string;
  /**
   * Localized instance-specific text.
   */
  detail?: string;
  details: MessageTargetDetails;
  /**
   * urn:gatherdeal:request:<correlation_id>
   */
  instance?: string;
  record?: ProblemRecord;
  retryable: false;
  status: 404;
  /**
   * Localized by Accept-Language; English: "The referenced message was not found."
   */
  title: string;
  /**
   * Problem type URI, one-to-one with code; documentation only, never dereferenced at runtime.
   */
  type: "https://docs.gatherdeal.ai/errors/WHATSAPP_MESSAGE_TARGET_NOT_FOUND";
}

/**
 * WHATSAPP_MESSAGE_TARGET_NOT_SENT (409): The referenced message has not been sent yet.
 */
export interface WhatsAppMessageTargetNotSentProblem {
  code: "WHATSAPP_MESSAGE_TARGET_NOT_SENT";
  correlation_id?: string;
  /**
   * Localized instance-specific text.
   */
  detail?: string;
  details: MessageTargetDetails;
  /**
   * urn:gatherdeal:request:<correlation_id>
   */
  instance?: string;
  record?: ProblemRecord;
  retryable: false;
  status: 409;
  /**
   * Localized by Accept-Language; English: "The referenced message has not been sent yet."
   */
  title: string;
  /**
   * Problem type URI, one-to-one with code; documentation only, never dereferenced at runtime.
   */
  type: "https://docs.gatherdeal.ai/errors/WHATSAPP_MESSAGE_TARGET_NOT_SENT";
}

/**
 * WHATSAPP_REGISTRATION_QUEUE_FULL (503): Too many registrations are waiting for capacity. Try again later. Retryable.
 */
export interface WhatsAppRegistrationQueueFullProblem {
  code: "WHATSAPP_REGISTRATION_QUEUE_FULL";
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
  /**
   * Retry delay hint in milliseconds; mirrors the Retry-After header.
   */
  retry_after_ms?: number;
  retryable: true;
  status: 503;
  /**
   * Localized by Accept-Language; English: "Too many registrations are waiting for capacity. Try again later."
   */
  title: string;
  /**
   * Problem type URI, one-to-one with code; documentation only, never dereferenced at runtime.
   */
  type: "https://docs.gatherdeal.ai/errors/WHATSAPP_REGISTRATION_QUEUE_FULL";
}

/**
 * WHATSAPP_SENDER_AGENT_NOT_FOUND (404): No agent is available to send this message.
 */
export interface WhatsAppSenderAgentNotFoundProblem {
  code: "WHATSAPP_SENDER_AGENT_NOT_FOUND";
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
   * Localized by Accept-Language; English: "No agent is available to send this message."
   */
  title: string;
  /**
   * Problem type URI, one-to-one with code; documentation only, never dereferenced at runtime.
   */
  type: "https://docs.gatherdeal.ai/errors/WHATSAPP_SENDER_AGENT_NOT_FOUND";
}

/**
 * WHATSAPP_SYSTEM_AGENT_UNASSIGNABLE (409): This agent cannot be assigned to an organization or outlet.
 */
export interface WhatsAppSystemAgentUnassignableProblem {
  code: "WHATSAPP_SYSTEM_AGENT_UNASSIGNABLE";
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
   * Localized by Accept-Language; English: "This agent cannot be assigned to an organization or outlet."
   */
  title: string;
  /**
   * Problem type URI, one-to-one with code; documentation only, never dereferenced at runtime.
   */
  type: "https://docs.gatherdeal.ai/errors/WHATSAPP_SYSTEM_AGENT_UNASSIGNABLE";
}

/**
 * WHATSAPP_SYSTEM_AGENT_UNAVAILABLE (503): Message sending is temporarily unavailable. Try again later. Retryable.
 */
export interface WhatsAppSystemAgentUnavailableProblem {
  code: "WHATSAPP_SYSTEM_AGENT_UNAVAILABLE";
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
  /**
   * Retry delay hint in milliseconds; mirrors the Retry-After header.
   */
  retry_after_ms?: number;
  retryable: true;
  status: 503;
  /**
   * Localized by Accept-Language; English: "Message sending is temporarily unavailable. Try again later."
   */
  title: string;
  /**
   * Problem type URI, one-to-one with code; documentation only, never dereferenced at runtime.
   */
  type: "https://docs.gatherdeal.ai/errors/WHATSAPP_SYSTEM_AGENT_UNAVAILABLE";
}

/**
 * WHATSAPP_TEMPLATE_LIMIT_REACHED (422): Message template limit reached.
 */
export interface WhatsAppTemplateLimitReachedProblem {
  code: "WHATSAPP_TEMPLATE_LIMIT_REACHED";
  correlation_id?: string;
  /**
   * Localized instance-specific text.
   */
  detail?: string;
  details: TemplateLimitReachedDetails;
  /**
   * urn:gatherdeal:request:<correlation_id>
   */
  instance?: string;
  record?: ProblemRecord;
  retryable: false;
  status: 422;
  /**
   * Localized by Accept-Language; English: "Message template limit reached."
   */
  title: string;
  /**
   * Problem type URI, one-to-one with code; documentation only, never dereferenced at runtime.
   */
  type: "https://docs.gatherdeal.ai/errors/WHATSAPP_TEMPLATE_LIMIT_REACHED";
}

/**
 * WHATSAPP_TEMPLATE_NAME_TAKEN (409): Message template name is already taken.
 */
export interface WhatsAppTemplateNameTakenProblem {
  code: "WHATSAPP_TEMPLATE_NAME_TAKEN";
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
   * Localized by Accept-Language; English: "Message template name is already taken."
   */
  title: string;
  /**
   * Problem type URI, one-to-one with code; documentation only, never dereferenced at runtime.
   */
  type: "https://docs.gatherdeal.ai/errors/WHATSAPP_TEMPLATE_NAME_TAKEN";
}

/**
 * WHATSAPP_TEMPLATE_NOT_FOUND (404): Message template not found.
 */
export interface WhatsAppTemplateNotFoundProblem {
  code: "WHATSAPP_TEMPLATE_NOT_FOUND";
  correlation_id?: string;
  /**
   * Localized instance-specific text.
   */
  detail?: string;
  details: TemplateNotFoundDetails;
  /**
   * urn:gatherdeal:request:<correlation_id>
   */
  instance?: string;
  record?: ProblemRecord;
  retryable: false;
  status: 404;
  /**
   * Localized by Accept-Language; English: "Message template not found."
   */
  title: string;
  /**
   * Problem type URI, one-to-one with code; documentation only, never dereferenced at runtime.
   */
  type: "https://docs.gatherdeal.ai/errors/WHATSAPP_TEMPLATE_NOT_FOUND";
}

/**
 * WHATSAPP_TEMPLATE_RENDERED_TOO_LONG (422): Rendered message template is too long.
 */
export interface WhatsAppTemplateRenderedTooLongProblem {
  code: "WHATSAPP_TEMPLATE_RENDERED_TOO_LONG";
  correlation_id?: string;
  /**
   * Localized instance-specific text.
   */
  detail?: string;
  details: TemplateRenderedTooLongDetails;
  /**
   * urn:gatherdeal:request:<correlation_id>
   */
  instance?: string;
  record?: ProblemRecord;
  retryable: false;
  status: 422;
  /**
   * Localized by Accept-Language; English: "Rendered message template is too long."
   */
  title: string;
  /**
   * Problem type URI, one-to-one with code; documentation only, never dereferenced at runtime.
   */
  type: "https://docs.gatherdeal.ai/errors/WHATSAPP_TEMPLATE_RENDERED_TOO_LONG";
}
