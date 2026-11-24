// Generated from the GatherDeal public API contracts. Do not edit.

import * as op from "./operations.js";

/** The whatsapp API, version v1. */
export const service = {
  name: "whatsapp",
  version: "v1",
  baseURL: "https://api.gatherdeal.ai/whatsapp",
} as const;

/** Operations by member path. */
export const operations = {
  agents: {
    /**
     * Create Agent
     *
     * Requires the permissions `whatsapp.agent.create`.
     *
     * Organization API keys are not accepted.
     */
    create: op.agentsCreate,
    /**
     * Delete Agent
     *
     * Requires the permissions `whatsapp.agent.delete`.
     *
     * Organization API keys are not accepted.
     */
    delete: op.agentsDelete,
    /**
     * Fetch Agent
     *
     * Requires the permissions `whatsapp.agent.read`.
     *
     * Organization API keys are not accepted.
     */
    get: op.agentsGet,
    /**
     * Fetch Agents
     *
     * Requires the permissions `whatsapp.agent.read`.
     *
     * Organization API keys are not accepted.
     */
    list: op.agentsList,
    /**
     * Fetch Agent Pairing
     *
     * Requires the permissions `whatsapp.agent.create`.
     *
     * Organization API keys are not accepted.
     */
    pairing: op.agentsPairing,
    /**
     * Update Agent
     *
     * Requires the permissions `whatsapp.agent.update`.
     *
     * Organization API keys are not accepted.
     */
    update: op.agentsUpdate,
  },
  broadcastSuppressions: {
    /**
     * Add Broadcast Suppressions
     *
     * Requires the permissions `whatsapp.broadcast.write`.
     */
    add: op.broadcastSuppressionsAdd,
    /**
     * Delete Broadcast Suppression
     *
     * Requires the permissions `whatsapp.broadcast.write`.
     */
    delete: op.broadcastSuppressionsDelete,
    /**
     * Fetch Broadcast Suppressions
     *
     * Requires the permissions `whatsapp.broadcast.read`.
     */
    list: op.broadcastSuppressionsList,
  },
  broadcasts: {
    /**
     * Cancel Broadcast
     *
     * Requires the permissions `whatsapp.broadcast.write`.
     */
    cancel: op.broadcastsCancel,
    /**
     * Create Broadcast
     *
     * Requires the permissions `whatsapp.broadcast.write`, `whatsapp.message.create`.
     */
    create: op.broadcastsCreate,
    /**
     * Broadcast Path
     *
     * Requires the permissions `whatsapp.broadcast.read`.
     */
    get: op.broadcastsGet,
    /**
     * Fetch Broadcasts
     *
     * Requires the permissions `whatsapp.broadcast.read`.
     */
    list: op.broadcastsList,
    /**
     * Pause Broadcast
     *
     * Requires the permissions `whatsapp.broadcast.write`.
     */
    pause: op.broadcastsPause,
    recipients: {
      /**
       * Add Broadcast Recipients
       *
       * Requires the permissions `whatsapp.broadcast.write`.
       */
      add: op.broadcastsRecipientsAdd,
      /**
       * Delete Broadcast Recipient
       *
       * Requires the permissions `whatsapp.broadcast.write`.
       */
      delete: op.broadcastsRecipientsDelete,
      /**
       * Fetch Broadcast Recipients
       *
       * Requires the permissions `whatsapp.broadcast.read`.
       */
      list: op.broadcastsRecipientsList,
    },
    /**
     * Resume Broadcast
     *
     * Requires the permissions `whatsapp.broadcast.write`, `whatsapp.message.create`.
     */
    resume: op.broadcastsResume,
    /**
     * Start Broadcast
     *
     * Requires the permissions `whatsapp.broadcast.write`, `whatsapp.message.create`.
     */
    start: op.broadcastsStart,
    /**
     * Update Broadcast
     *
     * Requires the permissions `whatsapp.broadcast.write`, `whatsapp.message.create`.
     */
    update: op.broadcastsUpdate,
  },
  chatMessages: {
    /**
     * Fetch Chat Message
     *
     * Requires one of the permissions `whatsapp.inbound.read`, `whatsapp.message.read`.
     */
    get: op.chatMessagesGet,
    /**
     * Poll Chat Messages
     *
     * Requires one of the permissions `whatsapp.inbound.read`, `whatsapp.message.read`.
     */
    list: op.chatMessagesList,
  },
  chats: {
    /**
     * Chat Path
     *
     * Requires the permissions `whatsapp.inbound.read`.
     */
    get: op.chatsGet,
    /**
     * Fetch Chats
     *
     * Requires the permissions `whatsapp.inbound.read`.
     */
    list: op.chatsList,
    /**
     * Fetch Chat Messages
     *
     * Requires one of the permissions `whatsapp.inbound.read`, `whatsapp.message.read`.
     */
    messages: op.chatsMessages,
  },
  messageTemplates: {
    /**
     * Create Message Template
     *
     * Requires the permissions `whatsapp.template.write`.
     */
    create: op.messageTemplatesCreate,
    /**
     * Delete Message Template
     *
     * Requires the permissions `whatsapp.template.delete`.
     */
    delete: op.messageTemplatesDelete,
    /**
     * Fetch Message Template
     *
     * Requires one of the permissions `whatsapp.message.create`, `whatsapp.template.read`.
     */
    get: op.messageTemplatesGet,
    /**
     * Fetch Message Templates
     *
     * Requires one of the permissions `whatsapp.message.create`, `whatsapp.template.read`.
     */
    list: op.messageTemplatesList,
    /**
     * Preview Message Template
     *
     * Requires one of the permissions `whatsapp.message.create`, `whatsapp.template.read`.
     */
    preview: op.messageTemplatesPreview,
    /**
     * Update Message Template
     *
     * Requires the permissions `whatsapp.template.write`.
     */
    update: op.messageTemplatesUpdate,
  },
  messages: {
    /**
     * Create Message
     *
     * Requires the permissions `whatsapp.message.create`.
     */
    create: op.messagesCreate,
    /**
     * Fetch Message
     *
     * Requires the permissions `whatsapp.message.read`.
     */
    get: op.messagesGet,
    /**
     * Fetch Messages
     *
     * Requires the permissions `whatsapp.message.read`.
     */
    list: op.messagesList,
  },
} as const;
