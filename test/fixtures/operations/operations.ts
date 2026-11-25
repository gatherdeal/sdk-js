// Generated from the GatherDeal public API contracts. Do not edit.

import type { APIPromise, ConditionalRequestOptions, EmptyParams, KeyedRequestOptions, Operation, PagePromise, RequestOptions } from "../../../src/generated/operation.js";
import type * as T from "./types.js";

export type AgentPairingGetParams = {
  agent_id: string;
};
export type AgentPairingGetErrorCode = never;
export const agentsPairingGet = {
  id: "crm.agents.pairing.get",
  method: "GET",
  path: "/v1/agents/{agent_id}/pairing",
  parameters: [
    { member: "agent_id", name: "agent_id", in: "path", required: true, encoding: "scalar" },
  ],
  body: "none",
  success: { status: 200, body: "json", required: ["item", "status"] },
  result: { kind: "resource", key: "item" },
  idempotency: "safe",
  authentication: "required",
  organizationKeys: false,
  errors: [],
  "~types": undefined as unknown as { readonly args: [params: AgentPairingGetParams, options?: RequestOptions]; readonly result: APIPromise<T.Item> },
} as const satisfies Operation<[params: AgentPairingGetParams, options?: RequestOptions], APIPromise<T.Item>, AgentPairingGetErrorCode>;

export type RecipientRemoveParams = {
  broadcast_id: string;
};
export type RecipientRemoveErrorCode = never;
export const broadcastsRecipientsRemove = {
  id: "crm.broadcasts.recipients.remove",
  method: "DELETE",
  path: "/v1/broadcasts/{broadcast_id}/recipients/{recipient_id}",
  positional: "recipient_id",
  parameters: [
    { member: "broadcast_id", name: "broadcast_id", in: "path", required: true, encoding: "scalar" },
  ],
  body: "none",
  success: { status: 204, body: "none", required: [] },
  result: { kind: "void" },
  idempotency: "safe",
  authentication: "required",
  organizationKeys: false,
  errors: [],
  "~types": undefined as unknown as { readonly args: [recipientId: string, params: RecipientRemoveParams, options?: RequestOptions]; readonly result: APIPromise<void> },
} as const satisfies Operation<[recipientId: string, params: RecipientRemoveParams, options?: RequestOptions], APIPromise<void>, RecipientRemoveErrorCode>;

export type BroadcastStartErrorCode = never;
export const broadcastsStart = {
  id: "crm.broadcasts.start",
  method: "POST",
  path: "/v1/broadcasts/{broadcast_id}/start",
  positional: "broadcast_id",
  parameters: [],
  body: "none",
  success: { status: 204, body: "none", required: [] },
  result: { kind: "void" },
  idempotency: "none",
  authentication: "required",
  organizationKeys: false,
  errors: [],
  "~types": undefined as unknown as { readonly args: [broadcastId: string, params?: EmptyParams, options?: RequestOptions]; readonly result: APIPromise<void> },
} as const satisfies Operation<[broadcastId: string, params?: EmptyParams, options?: RequestOptions], APIPromise<void>, BroadcastStartErrorCode>;

export type MessageListParams = {
  chat_id: string;
};
export type MessageListErrorCode = never;
export const chatsMessagesList = {
  id: "crm.chats.messages.list",
  method: "GET",
  path: "/v1/chats/{chat_id}/messages",
  parameters: [
    { member: "chat_id", name: "chat_id", in: "path", required: true, encoding: "scalar" },
  ],
  body: "none",
  success: { status: 200, body: "json", required: ["messages", "status"] },
  result: { kind: "page", key: "messages", pagination: {
    pageParam: "",
    pageSizeParam: "",
    afterParam: "",
    beforeParam: "",
    totalParam: "",
    defaultPageSize: 0,
    maxPageSize: 0,
    maxOffset: 0,
    resultField: "messages",
    itemsField: "data",
    pageField: "",
    pageSizeField: "",
    hasNextPageField: "",
    hasPrevPageField: "",
    nextCursorField: "",
    prevCursorField: "",
    totalItemsField: "",
    totalPagesField: "",
  } },
  idempotency: "safe",
  authentication: "required",
  organizationKeys: false,
  errors: [],
  "~types": undefined as unknown as { readonly args: [params: MessageListParams, options?: RequestOptions]; readonly result: PagePromise<T.Item> },
} as const satisfies Operation<[params: MessageListParams, options?: RequestOptions], PagePromise<T.Item>, MessageListErrorCode>;

export type ItemCreateParams = T.CreateItemParam;
export type ItemCreateResponse = {
  id: string;
};
export type ItemCreateErrorCode = never;
export const itemsCreate = {
  id: "crm.items.create",
  method: "POST",
  path: "/v1/items",
  parameters: [],
  body: "required",
  success: { status: 201, body: "json", required: ["id", "status"] },
  result: { kind: "object" },
  idempotency: "keyed",
  authentication: "required",
  organizationKeys: false,
  errors: [],
  "~types": undefined as unknown as { readonly args: [params: ItemCreateParams, options?: KeyedRequestOptions]; readonly result: APIPromise<ItemCreateResponse> },
} as const satisfies Operation<[params: ItemCreateParams, options?: KeyedRequestOptions], APIPromise<ItemCreateResponse>, ItemCreateErrorCode>;

export type ItemGetErrorCode = never;
export const itemsGet = {
  id: "crm.items.get",
  method: "GET",
  path: "/v1/items/{id}",
  positional: "id",
  parameters: [],
  body: "none",
  success: { status: 200, body: "json", required: ["item", "status"] },
  result: { kind: "resource", key: "item" },
  idempotency: "safe",
  authentication: "required",
  organizationKeys: false,
  errors: [],
  "~types": undefined as unknown as { readonly args: [id: string, params?: EmptyParams, options?: RequestOptions]; readonly result: APIPromise<T.Item> },
} as const satisfies Operation<[id: string, params?: EmptyParams, options?: RequestOptions], APIPromise<T.Item>, ItemGetErrorCode>;

export type ItemUpdateErrorCode = never;
export const itemsUpdate = {
  id: "crm.items.update",
  method: "PATCH",
  path: "/v1/items/{id}",
  positional: "id",
  parameters: [],
  body: "none",
  success: { status: 204, body: "none", required: [] },
  result: { kind: "void" },
  idempotency: "none",
  conditional: { read: "crm.items.get" },
  authentication: "required",
  organizationKeys: false,
  errors: [],
  "~types": undefined as unknown as { readonly args: [id: string, params: EmptyParams | undefined, options: ConditionalRequestOptions]; readonly result: APIPromise<void> },
} as const satisfies Operation<[id: string, params: EmptyParams | undefined, options: ConditionalRequestOptions], APIPromise<void>, ItemUpdateErrorCode>;

export type LegacyAgentPairingErrorCode = never;
export const legacyAgentsPairing = {
  id: "crm.legacy_agents.pairing",
  method: "GET",
  path: "/v1/legacy-agents/{agent_id}/pairing",
  positional: "agent_id",
  parameters: [],
  body: "none",
  success: { status: 200, body: "json", required: ["item", "status"] },
  result: { kind: "resource", key: "item" },
  idempotency: "safe",
  authentication: "required",
  organizationKeys: false,
  errors: [],
  "~types": undefined as unknown as { readonly args: [agentId: string, params?: EmptyParams, options?: RequestOptions]; readonly result: APIPromise<T.Item> },
} as const satisfies Operation<[agentId: string, params?: EmptyParams, options?: RequestOptions], APIPromise<T.Item>, LegacyAgentPairingErrorCode>;

export type LegacyChatMessagesErrorCode = never;
export const legacyChatsMessages = {
  id: "crm.legacy_chats.messages",
  method: "GET",
  path: "/v1/legacy-chats/{chat_id}/messages",
  positional: "chat_id",
  parameters: [],
  body: "none",
  success: { status: 200, body: "json", required: ["messages", "status"] },
  result: { kind: "page", key: "messages", pagination: {
    pageParam: "",
    pageSizeParam: "",
    afterParam: "",
    beforeParam: "",
    totalParam: "",
    defaultPageSize: 0,
    maxPageSize: 0,
    maxOffset: 0,
    resultField: "messages",
    itemsField: "data",
    pageField: "",
    pageSizeField: "",
    hasNextPageField: "",
    hasPrevPageField: "",
    nextCursorField: "",
    prevCursorField: "",
    totalItemsField: "",
    totalPagesField: "",
  } },
  idempotency: "safe",
  authentication: "required",
  organizationKeys: false,
  errors: [],
  "~types": undefined as unknown as { readonly args: [chatId: string, params?: EmptyParams, options?: RequestOptions]; readonly result: PagePromise<T.Item> },
} as const satisfies Operation<[chatId: string, params?: EmptyParams, options?: RequestOptions], PagePromise<T.Item>, LegacyChatMessagesErrorCode>;
