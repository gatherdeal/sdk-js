// Generated from the GatherDeal public API contracts. Do not edit.

export interface AddBroadcastRecipientsParam {
  /**
   * Up to 1000 recipients; a number the broadcast already has is a
   * duplicate (the first wins).
   */
  recipients: BroadcastRecipientParam[] | null;
}

export interface AddBroadcastSuppressionsParam {
  /**
   * Free-text note stored with every added number.
   */
  note?: string;
  /**
   * Up to 1000 numbers; a number already on the list is a duplicate.
   */
  to: Array<string | null> | null;
}

/**
 * A WhatsApp connection used to send messages.
 */
export interface Agent {
  /**
   * When the agent was created.
   */
  create_at: string;
  current_run?: AgentCurrentRun;
  /**
   * Free-text description; empty when none was set.
   */
  description: string;
  /**
   * Distribution the agent belongs to.
   */
  distribution_id?: string;
  egress?: AgentEgress;
  /**
   * Error from the agent's last failure; absent when there is none.
   */
  error_message?: string;
  /**
   * Agent ID.
   */
  id: string;
  /**
   * Whether the agent is reserved for platform use; visible only to platform operators.
   */
  is_system?: boolean;
  /**
   * When the agent last reported a heartbeat; absent until its first one.
   */
  last_heartbeat_at?: string;
  /**
   * Display name; empty when none was set.
   */
  name: string;
  /**
   * Organization that owns the agent.
   */
  organization_id?: string;
  /**
   * Outlet the agent is assigned to; null when it is not assigned to an outlet.
   */
  outlet_id: string | null;
  /**
   * The WhatsApp phone number the agent is linked to; absent until paired.
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
   * The agent's revision, an opaque quoted entity tag. Send it in If-Match
   * to update the agent; it changes when the outlet assignment changes.
   */
  revision: string;
  /**
   * The connection runtime: eks for a controller-managed agent; absent at
   * runtime generation zero.
   */
  runtime?: string;
  /**
   * The agent's runtime generation, including zero; visible only to platform operators.
   */
  runtime_generation?: number;
  send_pacing?: SendPacingOutput;
  status: AgentStatus;
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
   * When the agent was last changed.
   */
  update_at: string;
  /**
   * Last reported WhatsApp web client version; visible only to platform operators.
   */
  wa_version?: string;
}

export interface AgentCurrentRun {
  capacity_state: RunCapacityState;
  /**
   * Runtime generation the run belongs to.
   */
  generation: number;
  /**
   * Run ID.
   */
  id: string;
  /**
   * Runtime node hosting the run; visible only to platform operators.
   */
  node_ref?: string;
  /**
   * When the run first came online; absent until then.
   */
  online_at?: string;
  /**
   * When the run started; absent until it starts.
   */
  started_at?: string;
}

export interface AgentDeletion {
  /**
   * The agent being deleted.
   */
  agent_id: string;
  /**
   * When the deletion was requested.
   */
  requested_at: string;
  status: AgentDeletionStatus;
}

export type AgentDeletionStatus = "deleted" | "deleting" | (string & {});

export interface AgentEgress {
  /**
   * Active IPv6 egress address (/128); absent when the group has none active.
   */
  active_ipv6?: string;
  /**
   * Egress group the agent sends through.
   */
  egress_group_id: string;
  /**
   * Egress shard of the active address, when one is active.
   */
  shard_id?: string;
}

/**
 * Identifies the agent that cannot be found.
 */
export interface AgentNotFoundDetails {
  /**
   * The agent that was not found.
   */
  agent_id: string;
}

export interface AgentPairing {
  /**
   * When the pairing attempt expires.
   */
  expires_at: string;
  /**
   * The current linking code to enter on the phone; present only while
   * pending, when a phone number was given at create.
   */
  pairing_code?: string;
  /**
   * The current QR code payload to render and scan; present only while
   * pending and the code has not yet rotated out.
   */
  qr?: string;
  status: AgentPairingStatus;
}

export type AgentPairingStatus = "connected" | "expired" | "failed" | "pending" | (string & {});

/**
 * The pending message count and the maximum allowed for the agent.
 */
export interface AgentPendingMessagesLimitReachedDetails {
  /**
   * Maximum pending messages allowed for the agent.
   */
  limit: number;
  /**
   * Messages currently pending for the agent.
   */
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

export interface Broadcast {
  affinity_fallback: BroadcastAffinityFallback;
  /**
   * When the broadcast completed or was canceled.
   */
  completed_at?: string;
  content: BroadcastContentOutput;
  /**
   * When the broadcast was created.
   */
  create_at: string;
  distribution: BroadcastDistribution;
  /**
   * Broadcast ID.
   */
  id: string;
  interval: BroadcastIntervalOutput;
  /**
   * Broadcast name.
   */
  name: string;
  /**
   * Recipients not sent by then expire; set at start (default 30 days).
   */
  not_after?: string;
  /**
   * Sending does not start before this time.
   */
  not_before?: string;
  /**
   * Organization that owns the broadcast.
   */
  organization_id: string;
  pause_reason?: BroadcastPauseReason;
  /**
   * Orders the broadcast's messages within the broadcast class.
   */
  priority_offset: number;
  progress: BroadcastProgress;
  send_window?: SendWindowOutput;
  /**
   * The most broadcast messages each sender sends in a rolling 24 hours,
   * counted across every broadcast using it.
   */
  sender_daily_limit: number;
  /**
   * The broadcast's sender agents and their progress.
   */
  senders: BroadcastSender[];
  /**
   * When the broadcast was first started.
   */
  started_at?: string;
  status: BroadcastStatus;
  /**
   * When the broadcast was last changed.
   */
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
export type BroadcastAffinityFallbackParam = "none" | "round_robin";

/**
 * BroadcastContent is a broadcast's content: a text body, or a template
 * rendered for each recipient with its params.
 */
export interface BroadcastContent {
  template?: BroadcastTemplateReference | null;
  text?: MessageText | null;
  type: BroadcastContentTypeParam;
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

export type BroadcastContentTypeParam = "template" | "text";

/**
 * How the broadcast chooses a sender for each recipient.
 */
export type BroadcastDistribution = "affinity" | "round_robin" | (string & {});

/**
 * How the broadcast chooses a sender for each recipient.
 */
export type BroadcastDistributionParam = "affinity" | "round_robin";

/**
 * BroadcastInterval is the range each message's cooldown is drawn from:
 * after a broadcast message settles, its sender sends no other broadcast
 * message for the drawn time. 10 000 <= min_ms <= max_ms <= 600 000.
 */
export interface BroadcastInterval {
  /**
   * Longest cooldown, in milliseconds; at least min_ms.
   */
  max_ms: number;
  /**
   * Shortest cooldown, in milliseconds.
   */
  min_ms: number;
}

/**
 * BroadcastInterval is the range each message's cooldown is drawn from:
 * after a broadcast message settles, its sender sends no other broadcast
 * message for the drawn time. 10 000 <= min_ms <= max_ms <= 600 000.
 */
export interface BroadcastIntervalOutput {
  /**
   * Longest cooldown, in milliseconds; at least min_ms.
   */
  max_ms: number;
  /**
   * Shortest cooldown, in milliseconds.
   */
  min_ms: number;
}

/**
 * The limit that was reached and the count it applies to.
 */
export interface BroadcastLimitReachedDetails {
  /**
   * The current count the limit applies to; for recipients, it includes the requested ones.
   */
  count: number;
  /**
   * The limit that was reached.
   */
  limit: number;
}

/**
 * Identifies the broadcast that cannot be found.
 */
export interface BroadcastNotFoundDetails {
  /**
   * The broadcast that was not found.
   */
  broadcast_id: string;
}

/**
 * BroadcastPauseReason says why a broadcast is paused; set iff paused.
 */
export type BroadcastPauseReason = "failure_rate" | "no_senders" | "requested" | "sender_lost" | (string & {});

/**
 * BroadcastProgress counts the recipients by status.
 */
export interface BroadcastProgress {
  /**
   * Recipients canceled with the broadcast.
   */
  canceled: number;
  /**
   * Recipients whose message was sent to WhatsApp.
   */
  delivered: number;
  /**
   * Recipients not sent before the broadcast's not_after.
   */
  expired: number;
  /**
   * Recipients whose send failed.
   */
  failed: number;
  /**
   * Recipients not yet handed to a sender.
   */
  pending: number;
  /**
   * Recipients whose message is queued on a sender.
   */
  queued: number;
  /**
   * Recipients skipped because their number is suppressed.
   */
  suppressed: number;
  /**
   * All recipients of the broadcast.
   */
  total: number;
}

export interface BroadcastRecipient {
  /**
   * The WhatsApp connection assigned to send to this recipient.
   */
  agent_id?: string;
  /**
   * When the recipient was added.
   */
  create_at: string;
  error?: BroadcastRecipientError;
  /**
   * Recipient ID.
   */
  id: string;
  /**
   * The message sent or scheduled for this recipient.
   */
  message_id?: string;
  /**
   * The template values for this recipient, by parameter name; absent for
   * text content.
   */
  params?: Record<string, TemplateDateValueOutput | TemplateDatetimeValueOutput | TemplateMoneyValueOutput | TemplateTextValueOutput>;
  /**
   * The recipient's place in upload order.
   */
  position: number;
  /**
   * The sender the recipient last talked to (affinity), if any.
   */
  preferred_agent_id?: string;
  /**
   * When the recipient reached a final status.
   */
  settled_at?: string;
  status: BroadcastRecipientStatus;
  /**
   * The recipient's phone number.
   */
  to: string | null;
  /**
   * When the recipient last changed.
   */
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
export interface BroadcastRecipientParam {
  /**
   * The template's values for this recipient, by parameter name; required
   * for template content, not allowed for text content.
   */
  params?: Record<string, TemplateDateValue | TemplateDatetimeValue | TemplateMoneyValue | TemplateTextValue> | null;
  /**
   * The recipient's phone number.
   */
  to: string | null;
}

export type BroadcastRecipientStatus = "canceled" | "delivered" | "expired" | "failed" | "pending" | "queued" | "suppressed" | (string & {});

export type BroadcastRecipientStatusParam = "canceled" | "delivered" | "expired" | "failed" | "pending" | "queued" | "suppressed";

/**
 * BroadcastSender is one sender agent and the recipients it took.
 */
export interface BroadcastSender {
  /**
   * The sender agent.
   */
  agent_id: string;
  /**
   * Recipients this sender delivered.
   */
  delivered: number;
  /**
   * Recipients whose send failed on this sender.
   */
  failed: number;
  /**
   * The sender's place in the broadcast's sender order.
   */
  position: number;
  /**
   * Recipients queued on this sender.
   */
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
  /**
   * The sender agent the broadcast cannot use.
   */
  agent_id: string;
}

/**
 * The broadcast's current status, which does not allow the action.
 */
export interface BroadcastStateConflictDetails {
  /**
   * The broadcast's current status.
   */
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
export type BroadcastStatusParam = "canceled" | "completed" | "draft" | "paused" | "running" | "scheduled";

export interface BroadcastSuppression {
  /**
   * When the number was suppressed.
   */
  create_at: string;
  /**
   * Suppression ID.
   */
  id: string;
  /**
   * Free-text note given when the number was added; empty when none.
   */
  note: string;
  /**
   * The suppressed phone number; broadcasts skip it.
   */
  to: string | null;
}

/**
 * BroadcastTemplateReference names the template a broadcast renders.
 */
export interface BroadcastTemplateReference {
  /**
   * The message template to render.
   */
  id: string;
}

/**
 * BroadcastTemplateReference names the template a broadcast renders.
 */
export interface BroadcastTemplateReferenceOutput {
  /**
   * The message template to render.
   */
  id: string;
}

/**
 * Chat is one WhatsApp conversation of an agent.
 */
export interface Chat {
  /**
   * The agent whose chat this is.
   */
  agent_id: string;
  /**
   * When the chat was first seen.
   */
  create_at: string;
  /**
   * The disappearing-message timer, in seconds; 0 when off.
   */
  ephemeral_seconds: number;
  /**
   * The group JID, "<id>@g.us"; absent for a direct chat.
   */
  group_jid?: string;
  /**
   * Chat ID.
   */
  id: string;
  /**
   * When the chat's latest message was sent; absent before any message.
   */
  last_message_at?: string;
  /**
   * Set when this chat was found to be the same conversation as another;
   * read that chat instead.
   */
  merged_into_id?: string;
  /**
   * The group subject; absent for a direct chat or an unnamed group.
   */
  name?: string;
  type: ChatType;
  /**
   * When the chat last changed.
   */
  update_at: string;
  user?: ChatParty;
}

/**
 * ChatMessage is one message of a WhatsApp chat. A copy found to duplicate
 * another message is a tombstone: only id, rev and merged_into_id are set.
 */
export interface ChatMessage {
  /**
   * The agent whose ledger holds the message; absent on a tombstone.
   */
  agent_id?: string;
  /**
   * The chat the message belongs to; absent on a tombstone.
   */
  chat_id?: string;
  content?: Content;
  /**
   * When the message was last edited.
   */
  edited_at?: string;
  /**
   * When a disappearing message's content goes away.
   */
  expires_at?: string;
  /**
   * Chat message ID.
   */
  id: string;
  /**
   * True for a view-once message; absent otherwise.
   */
  is_view_once?: boolean;
  /**
   * Set on a tombstone: the message this copy was merged into.
   */
  merged_into_id?: string;
  origin?: ChatMessageOrigin;
  /**
   * The chat message this one replies to.
   */
  quoted_id?: string;
  /**
   * Current reactions, one per reacting user; absent when there are none.
   */
  reactions?: ChatReaction[];
  receipt?: MessageReceipt;
  /**
   * Message revision. Pass it as `after_rev` when polling
   * `GET /v1/chat-messages` for later changes.
   */
  rev: number;
  /**
   * When the message was deleted for everyone.
   */
  revoked_at?: string;
  sender?: ChatParty;
  /**
   * When the message was sent, as WhatsApp reports it.
   */
  sent_at?: string;
  source?: ChatMessageSource;
  /**
   * The chat message a poll vote refers to.
   */
  target_id?: string;
  /**
   * The WhatsApp message ID; absent on a tombstone.
   */
  wid?: string;
}

export type ChatMessageOrigin = "api" | "device" | "remote" | (string & {});

export type ChatMessageSource = "backfill" | "history" | "live" | "on_demand" | (string & {});

export interface ChatNotFoundDetails {
  /**
   * The chat that was not found.
   */
  chat_id: string;
}

/**
 * ChatParty is one WhatsApp user as the agent's account sees them.
 */
export interface ChatParty {
  /**
   * The user's WhatsApp Business name; absent when not a business or unknown.
   */
  business_name?: string;
  /**
   * WhatsApp user ID in this service.
   */
  id: string;
  /**
   * Whether this is the agent's own account.
   */
  is_self: boolean;
  /**
   * The user's LID (privacy identity), "<digits>@lid"; absent when unknown.
   */
  lid?: string;
  /**
   * The user's phone JID, "<digits>@s.whatsapp.net"; absent when unknown.
   */
  phone?: string;
  /**
   * The name the user set on WhatsApp; absent when unknown.
   */
  push_name?: string;
}

/**
 * ChatReaction is one user's current reaction to a chat message.
 */
export interface ChatReaction {
  /**
   * The reaction emoji.
   */
  emoji: string;
  /**
   * When the user reacted.
   */
  reacted_at: string;
  /**
   * The reacting WhatsApp user.
   */
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
  /**
   * The group JID ending in `@g.us`; absent for a direct chat.
   */
  group_jid?: string;
  /**
   * The address messages to the chat are sent to; absent when unknown.
   */
  send_jid?: string;
  user?: Party;
}

export type ChatType = "direct" | "group" | (string & {});

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
 * ContactCard is one shared contact.
 */
export interface ContactCard {
  /**
   * The name shown for the contact; absent when the sender supplied none.
   */
  display_name?: string;
  /**
   * The contact as a vCard.
   */
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
} & ({
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
} | {
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
} | {
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
} | {
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
} | {
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
} | {
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
} | {
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
} | {
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
} | {
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
} | {
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
} | {
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
} | {
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
} | {
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
} | {
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
} | {
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
} | {
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
});

/**
 * ContentAudio is an audio file. `voice_note` marks a push-to-talk note.
 */
export interface ContentAudio {
  media: MediaMeta;
  /**
   * True when the audio is a push-to-talk voice note; absent when false.
   */
  voice_note?: boolean;
}

/**
 * ContentButton is one button or list row. `id` is the reply identifier.
 */
export interface ContentButton {
  /**
   * The WhatsApp reply identifier of the button, not a UUID; absent when
   * the message gave none.
   */
  id?: string;
  /**
   * The button or row label.
   */
  text: string;
}

/**
 * ContentCall records an unanswered incoming call.
 */
export interface ContentCall {
  /**
   * The WhatsApp call identifier, not a UUID.
   */
  call_id: string;
  /**
   * True for a video call; absent for a voice call.
   */
  video?: boolean;
}

/**
 * ContentContacts contains one or more shared contact cards in `contacts`.
 */
export interface ContentContacts {
  /**
   * The shared contact cards, 1 to 256.
   */
  contacts: ContactCard[];
}

/**
 * ContentContext is the context shared by every content type: the quoted
 * message, mentions and whether the message was forwarded.
 */
export interface ContentContext {
  /**
   * True when the message was forwarded; absent when false.
   */
  forwarded?: boolean;
  /**
   * The mentioned users, at most 1,024; absent when there are none.
   */
  mentions?: Party[];
  quoted?: MessageKey;
}

/**
 * ContentDocument is a document with an optional `caption`. Its file name
 * is available in `media.file_name` when supplied.
 */
export interface ContentDocument {
  /**
   * The document caption; absent when there is none.
   */
  caption?: string;
  media: MediaMeta;
  /**
   * The number of pages; absent when unknown.
   */
  page_count?: number;
  /**
   * The document title; absent when the sender supplied none.
   */
  title?: string;
}

/**
 * ContentImage is an image with an optional `caption`.
 */
export interface ContentImage {
  /**
   * The image caption; absent when there is none.
   */
  caption?: string;
  media: MediaMeta;
}

/**
 * ContentInteractive is a best-effort rendering of a buttons, list, template,
 * interactive or highly structured message: its texts and its buttons (list
 * rows included).
 */
export interface ContentInteractive {
  /**
   * The message body; absent when there is none.
   */
  body?: string;
  /**
   * The buttons and list rows, at most 64; absent when there are none.
   */
  buttons?: ContentButton[];
  /**
   * The message footer; absent when there is none.
   */
  footer?: string;
  /**
   * The message title; absent when there is none.
   */
  title?: string;
}

/**
 * ContentInteractiveReply is a reply to an interactive message, including
 * buttons, lists, and templates. `selected_id` identifies the user's choice
 * and `text` gives the text they saw. `context.quoted` identifies the
 * original message.
 */
export interface ContentInteractiveReply {
  /**
   * The WhatsApp reply identifier of the chosen button or row, not a
   * UUID; absent when WhatsApp sent none. At least one of `selected_id`
   * and `text` is present.
   */
  selected_id?: string;
  /**
   * The label the user saw; absent when WhatsApp sent none.
   */
  text?: string;
}

/**
 * ContentLinkPreview contains the link details WhatsApp attached to a text
 * message. The preview omits the thumbnail.
 */
export interface ContentLinkPreview {
  /**
   * The page description; absent when WhatsApp sent none.
   */
  description?: string;
  /**
   * The page title; absent when WhatsApp sent none.
   */
  title?: string;
  /**
   * The previewed link; absent when WhatsApp sent none.
   */
  url?: string;
}

/**
 * ContentLocation is a shared location. When `live` is true, the coordinates
 * represent the initial point of a live location.
 */
export interface ContentLocation {
  /**
   * The place address; absent when there is none.
   */
  address?: string;
  /**
   * The location caption; absent when there is none.
   */
  caption?: string;
  /**
   * Latitude in degrees, from -90 to 90.
   */
  latitude: number;
  /**
   * True when the location is the start of a live location; absent when
   * false.
   */
  live?: boolean;
  /**
   * Longitude in degrees, from -180 to 180.
   */
  longitude: number;
  /**
   * The place name; absent when there is none.
   */
  name?: string;
  /**
   * A link for the place; absent when there is none.
   */
  url?: string;
}

/**
 * ContentPoll is a poll. `selectable_count` limits the number of options a
 * voter may select. Zero allows any number.
 */
export interface ContentPoll {
  /**
   * The option labels, 1 to 64 distinct values.
   */
  options: string[];
  /**
   * The poll question.
   */
  question: string;
  /**
   * The most options a voter may select; absent when any number is
   * allowed.
   */
  selectable_count?: number;
}

/**
 * ContentPollVote records a vote on the poll identified by `target`.
 * `option_hashes` contains lowercase hexadecimal SHA-256 hashes of the
 * selected option labels. An empty list clears the vote. A vote that could
 * not be decrypted appears as `unavailable`, with the poll in `target`.
 */
export interface ContentPollVote {
  /**
   * Lowercase hex SHA-256 hashes of the selected option labels, at most
   * 64; absent when the vote clears an earlier one.
   */
  option_hashes?: string[];
  target: MessageKey;
}

/**
 * ContentSticker is a sticker, including Lottie stickers.
 */
export interface ContentSticker {
  /**
   * True for an animated sticker; absent when false.
   */
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
  /**
   * The new setting for `group_announce_changed` (only admins may send)
   * and `group_locked_changed` (only admins may edit group info); absent
   * for other events.
   */
  enabled?: boolean;
  /**
   * The new disappearing-message timer in seconds for
   * `ephemeral_changed`; zero disables it. Absent for other events.
   */
  ephemeral_seconds?: number;
  /**
   * The kind of chat event; it determines which other fields are present.
   */
  event: string;
  /**
   * The new group name for `group_name_changed`; absent for other events.
   */
  name?: string;
  /**
   * The affected participants for `group_participants_*`, 1 to 1,024;
   * absent for other events.
   */
  participants?: Party[];
  /**
   * The new group topic for `group_topic_changed`; absent for other
   * events and when the topic was removed.
   */
  topic?: string;
}

/**
 * ContentText contains a plain or extended text message in `body`.
 */
export interface ContentText {
  /**
   * The message text.
   */
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
  /**
   * Why the content is unavailable.
   */
  reason: string;
  target?: MessageKey;
}

/**
 * ContentUnsupported indicates that a message's content could not be
 * represented. Read `reason` for the cause.
 */
export interface ContentUnsupported {
  /**
   * The protocol field number of `proto_field`; absent when no known
   * field was set.
   */
  field_number?: number;
  /**
   * The WhatsApp protocol field that carried the content; absent when no
   * known field was set.
   */
  proto_field?: string;
  /**
   * Why the content is not represented.
   */
  reason: string;
}

/**
 * ContentVideo is a video. `gif_playback` marks a GIF and `video_note` marks
 * a round video note.
 */
export interface ContentVideo {
  /**
   * The video caption; absent when there is none.
   */
  caption?: string;
  /**
   * True when the video plays as a GIF; absent when false.
   */
  gif_playback?: boolean;
  media: MediaMeta;
  /**
   * True when the video is a round video note; absent when false.
   */
  video_note?: boolean;
}

export interface CreateAgentParam {
  /**
   * Outlet the new agent is assigned to.
   */
  outlet_id: string;
  /**
   * A phone number in E.164 format to request a WhatsApp linking code.
   */
  phone?: string;
}

export interface CreateBroadcastParam {
  affinity_fallback?: BroadcastAffinityFallbackParam;
  content: BroadcastContent;
  distribution?: BroadcastDistributionParam;
  interval?: BroadcastInterval | null;
  /**
   * Broadcast name.
   */
  name: string;
  /**
   * At most 30 days after the start; defaults to that at start.
   */
  not_after?: string | null;
  /**
   * Sending does not start before this time.
   */
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
  sender_agent_ids?: string[] | null;
  /**
   * Default 500, at most 2000.
   */
  sender_daily_limit?: number;
}

export type CreateMessageParam = {
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
  priority?: SendPriorityClassParam;
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
} & (({
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
  priority?: SendPriorityClassParam;
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
}) | ({
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
  priority?: SendPriorityClassParam;
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
}) | ({
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
  priority?: SendPriorityClassParam;
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
}) | ({
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
  priority?: SendPriorityClassParam;
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
}) | ({
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
  priority?: SendPriorityClassParam;
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
}));

export interface CreateMessageTemplateParam {
  /**
   * Free-text description, at most 255 characters.
   */
  description?: string;
  locale: TemplateLocaleParam;
  /**
   * Template name, at most 64 characters.
   */
  name: string;
  /**
   * The parameters each send supplies, at most 20.
   */
  params: TemplateParam[] | null;
  /**
   * IANA timezone that date and datetime values render in.
   */
  timezone: string;
  /**
   * The text variants, at most 20; at least one must be enabled.
   */
  variants: TemplateVariantParam[] | null;
}

export type CreateMessageType = "edit" | "reaction" | "revoke" | "template" | "text";

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
 * MediaMeta describes a media file with metadata such as its size or MIME type.
 */
export interface MediaMeta {
  /**
   * Duration in seconds of a video or audio file; absent when unknown.
   */
  duration_seconds?: number;
  /**
   * The original file name; absent when the sender supplied none.
   */
  file_name?: string;
  /**
   * Height in pixels of an image, video or sticker; absent when unknown.
   */
  height?: number;
  /**
   * The MIME type, such as `image/jpeg`; absent when WhatsApp sent none.
   */
  mimetype?: string;
  /**
   * SHA-256 hash of the file before encryption, encoded as lowercase hex;
   * absent when unknown.
   */
  sha256?: string;
  /**
   * File length in bytes before encryption; absent when unknown.
   */
  size?: number;
  /**
   * Width in pixels of an image, video or sticker; absent when unknown.
   */
  width?: number;
}

export interface Message {
  /**
   * The agent sending the message.
   */
  agent_id: string;
  /**
   * The broadcast the message was sent for.
   */
  broadcast_id?: string;
  /**
   * When the message was accepted.
   */
  create_at: string;
  /**
   * When the message was sent to WhatsApp (single tick); it does not
   * confirm receipt by the recipient: see receipt. Absent until sent.
   */
  delivered_at?: string;
  error?: MessageError;
  /**
   * The agent's current phone number, which may differ from its number when the message was sent.
   */
  from?: string;
  /**
   * Message ID.
   */
  id: string;
  /**
   * Whether the message text is withheld from this response.
   */
  is_redacted: boolean;
  /**
   * The service stops trying to send the message after this time.
   */
  not_after?: string;
  /**
   * The message is not sent before this time.
   */
  not_before?: string;
  /**
   * Organization of the sending agent; absent when the agent is hidden.
   */
  organization_id?: string;
  priority?: SendPriorityClass;
  /**
   * Priority offset within the class the message was accepted with.
   */
  priority_offset: number;
  reaction?: MessageReactionEmoji;
  receipt?: MessageReceipt;
  /**
   * Whether the message text is withheld from this response; equals is_redacted.
   *
   * Deprecated: use `is_redacted` instead.
   *
   * @deprecated
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
  /**
   * When the message last changed.
   */
  update_at: string;
}

/**
 * MessageEdit replaces the text of one of the agent's own text messages,
 * within 20 minutes of its send.
 */
export interface MessageEdit {
  /**
   * The new message text.
   */
  body: string;
  /**
   * The chat message to edit.
   */
  target_id: string;
}

export interface MessageError {
  /**
   * Stable failure code.
   */
  code: string;
  /**
   * Human-readable failure description.
   */
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
  /**
   * The WhatsApp message ID, not a UUID.
   */
  wid: string;
}

/**
 * The content type of a WhatsApp message, or the operation a send performs
 * on an earlier message (reaction, edit, revoke).
 */
export type MessageKind = "audio" | "contact" | "document" | "edit" | "image" | "location" | "reaction" | "revoke" | "sticker" | "text" | "unknown" | "video" | (string & {});

export interface MessageOperationNotAllowedDetails {
  reason: MessageOperationRefusal;
  /**
   * The chat message the operation names.
   */
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
  /**
   * When the recipient's device reported delivery.
   */
  delivered_at?: string;
  /**
   * When the recipient played a voice or video note.
   */
  played_at?: string;
  /**
   * When the recipient reported reading it.
   */
  read_at?: string;
  /**
   * When WhatsApp accepted the message.
   */
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
  /**
   * The chat message to delete for everyone.
   */
  target_id: string;
}

/**
 * The sending status of a WhatsApp message.
 */
export type MessageStatus = "cancelled" | "delivered" | "error" | "expired" | "pending" | (string & {});

/**
 * The sending status of a WhatsApp message.
 */
export type MessageStatusParam = "cancelled" | "delivered" | "error" | "expired" | "pending";

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
  /**
   * When the template was created.
   */
  create_at: string;
  /**
   * Free-text description; empty when none.
   */
  description: string;
  /**
   * Template ID.
   */
  id: string;
  locale: TemplateLocale;
  /**
   * Template name.
   */
  name: string;
  /**
   * Organization that owns the template.
   */
  organization_id: string;
  /**
   * The parameters each send supplies.
   */
  params: TemplateParamOutput[];
  /**
   * IANA timezone that date and datetime values render in.
   */
  timezone: string;
  /**
   * When the template was last changed.
   */
  update_at: string;
  /**
   * The text variants; each send uses one enabled variant.
   */
  variants: TemplateVariant[];
}

export interface MessageTemplateReference {
  /**
   * The message template rendered.
   */
  id: string;
  /**
   * The template variant sent.
   */
  variant_id: string;
}

export interface MessageText {
  /**
   * The message text.
   */
  body: string;
}

export interface MessageTextOutput {
  /**
   * The message text.
   */
  body: string;
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
  /**
   * The user's LID JID (`<digits>@lid` or `<digits>@hosted.lid`); absent
   * when unknown. At least one of `lid` and `phone` is present.
   */
  lid?: string;
  /**
   * The user's phone JID (`<digits>@s.whatsapp.net`, `@hosted` or
   * `@bot`); absent when unknown.
   */
  phone?: string;
  /**
   * True when the party is the receiving account itself; absent when
   * false.
   */
  self?: boolean;
}

export interface PreviewMessageTemplateParam {
  /**
   * A value for every template parameter, by parameter name.
   */
  params: Record<string, TemplateDateValue | TemplateDatetimeValue | TemplateMoneyValue | TemplateTextValue> | null;
}

export interface RenderedTemplateVariant {
  /**
   * Whether the variant is used for sends.
   */
  is_enabled: boolean;
  /**
   * Whether the rendered variant exceeds the message length limit, even
   * when the variant is disabled.
   */
  is_too_long: boolean;
  /**
   * Length of the rendered text, in characters.
   */
  length: number;
  /**
   * The rendered message text.
   */
  text: string;
  /**
   * The template variant rendered.
   */
  variant_id: string;
}

export interface ReplaceMessageTemplateParam {
  /**
   * Free-text description, at most 255 characters.
   */
  description?: string;
  locale: TemplateLocaleParam;
  /**
   * Template name, at most 64 characters.
   */
  name: string;
  /**
   * The parameters each send supplies, at most 20.
   */
  params: TemplateParam[] | null;
  /**
   * IANA timezone that date and datetime values render in.
   */
  timezone: string;
  /**
   * The complete set of text variants, at most 20; at least one must be
   * enabled. Variants absent from the list are removed.
   */
  variants: ReplaceTemplateVariantParam[] | null;
}

export interface ReplaceTemplateVariantParam {
  /**
   * The variant's ID: an existing variant's ID keeps that variant; a new
   * UUID you generate adds one. IDs of another template's variants are
   * rejected.
   */
  id: string;
  /**
   * Whether the variant is used for sends.
   */
  is_enabled: boolean;
  /**
   * Variant text with {{name}} parameter placeholders.
   */
  text: string;
}

export type RunCapacityState = "admitted" | "queued" | "released" | "running" | "starting" | (string & {});

/**
 * How the recipient is resolved before sending a message.
 */
export type SendMessageStrategy = "only_lid" | "only_phone" | "prefer_lid" | "prefer_phone";

export interface SendMessageTemplate {
  /**
   * The message template to render.
   */
  id: string;
  /**
   * A value for every template parameter, by parameter name.
   */
  params: Record<string, TemplateDateValue | TemplateDatetimeValue | TemplateMoneyValue | TemplateTextValue> | null;
}

/**
 * SendPacing controls the delay between the start of consecutive message
 * sends. Set `min_interval_ms` and `max_interval_ms` to bound the randomly
 * chosen delay in milliseconds. Set both to zero to disable spacing.
 */
export interface SendPacingOutput {
  /**
   * The longest delay between the starts of consecutive sends, in
   * milliseconds, at most 600000 (10 minutes).
   */
  max_interval_ms: number;
  /**
   * The shortest delay between the starts of consecutive sends, in
   * milliseconds; at most `max_interval_ms`.
   */
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
export type SendPriorityClassParam = "background" | "broadcast" | "critical" | "interaction" | "normal";

/**
 * SendWindow is a recurring local wall-clock window in which a message may be
 * sent; outside it the message waits for the next opening.
 */
export interface SendWindow {
  /**
   * Weekdays on which the window opens, unique; absent or empty means
   * every day. A window that wraps past midnight belongs to the day it opens.
   */
  days?: WeekdayParam[] | null;
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
   * Weekdays on which the window opens, unique; absent or empty means
   * every day. A window that wraps past midnight belongs to the day it opens.
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
  /**
   * Calendar date, YYYY-MM-DD.
   */
  date: string;
  kind: "date";
}

export interface TemplateDateValueOutput {
  /**
   * Calendar date, YYYY-MM-DD.
   */
  date: string;
  kind: "date";
}

export interface TemplateDatetimeValue {
  /**
   * RFC 3339 instant, rendered in the template's timezone.
   */
  datetime: string;
  kind: "datetime";
}

export interface TemplateDatetimeValueOutput {
  /**
   * RFC 3339 instant, rendered in the template's timezone.
   */
  datetime: string;
  kind: "datetime";
}

export interface TemplateLimitReachedDetails {
  /**
   * Maximum message templates allowed for the organization.
   */
  limit: number;
}

export type TemplateLocale = "en" | "ms" | "zh-Hans" | "zh-Hant" | (string & {});

export type TemplateLocaleParam = "en" | "ms" | "zh-Hans" | "zh-Hant";

export interface TemplateMoneyValue {
  /**
   * Decimal amount.
   */
  amount: string;
  /**
   * ISO 4217 currency code.
   */
  currency: string;
  kind: "money";
}

export interface TemplateMoneyValueOutput {
  /**
   * Decimal amount.
   */
  amount: string;
  /**
   * ISO 4217 currency code.
   */
  currency: string;
  kind: "money";
}

export interface TemplateNotFoundDetails {
  /**
   * The message template that was not found.
   */
  template_id: string;
}

export interface TemplateParam {
  kind: TemplateParamKindParam;
  /**
   * Parameter name, referenced as {{name}} in variant texts.
   */
  name: string;
}

export type TemplateParamKind = "date" | "datetime" | "money" | "text" | (string & {});

export type TemplateParamKindParam = "date" | "datetime" | "money" | "text";

export interface TemplateParamOutput {
  kind: TemplateParamKind;
  /**
   * Parameter name, referenced as {{name}} in variant texts.
   */
  name: string;
}

export interface TemplateRenderedTooLongDetails {
  /**
   * Length of the rendered text.
   */
  length: number;
  /**
   * Maximum message length.
   */
  limit: number;
  /**
   * The variant whose rendered text is too long.
   */
  variant_id: string;
}

export interface TemplateTextValue {
  kind: "text";
  /**
   * The text to insert.
   */
  text: string;
}

export interface TemplateTextValueOutput {
  kind: "text";
  /**
   * The text to insert.
   */
  text: string;
}

/**
 * TemplateVariant is one text variant of a message template.
 */
export interface TemplateVariant {
  /**
   * Variant ID.
   */
  id: string;
  /**
   * Whether the variant is used for sends.
   */
  is_enabled: boolean;
  /**
   * Variant text with {{name}} parameter placeholders.
   */
  text: string;
}

export interface TemplateVariantParam {
  /**
   * The variant's ID, a UUID unique among the organization's template
   * variants; omit it to have one assigned.
   */
  id?: string | null;
  /**
   * Whether the variant is used for sends.
   */
  is_enabled: boolean;
  /**
   * Variant text with {{name}} parameter placeholders.
   */
  text: string;
}

/**
 * TotalMode selects whether a list response counts its rows.
 */
export type TotalMode = "exact" | "none";

export interface UpdateAgentParam {
  /**
   * Outlet to assign the agent to; null removes the assignment.
   */
  outlet_id?: string | null;
}

export interface UpdateBroadcastParam {
  affinity_fallback?: BroadcastAffinityFallbackParam;
  content?: BroadcastContent;
  distribution?: BroadcastDistributionParam;
  interval?: BroadcastInterval;
  /**
   * New broadcast name.
   */
  name?: string;
  /**
   * Recipients not sent by then expire, at most 30 days after the start; null restores the default.
   */
  not_after?: string | null;
  /**
   * Sending does not start before this time; null removes it.
   */
  not_before?: string | null;
  /**
   * Orders the broadcast's messages within the broadcast class, -2 to 2.
   */
  priority_offset?: number;
  send_window?: SendWindow | null;
  /**
   * New sender agents, up to 20; replaces the list. Requires whatsapp.message.create on every sender.
   */
  sender_agent_ids?: string[] | null;
  /**
   * The most broadcast messages each sender sends in a rolling 24 hours, at most 2000.
   */
  sender_daily_limit?: number;
}

/**
 * Weekday names the local date on which a send window occurrence opens.
 */
export type Weekday = "fri" | "mon" | "sat" | "sun" | "thu" | "tue" | "wed" | (string & {});

/**
 * Weekday names the local date on which a send window occurrence opens.
 */
export type WeekdayParam = "fri" | "mon" | "sat" | "sun" | "thu" | "tue" | "wed";
