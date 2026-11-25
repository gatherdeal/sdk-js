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
    pairing: {
      /**
       * Fetch Agent Pairing
       *
       * Requires the permissions `whatsapp.agent.create`.
       *
       * Organization API keys are not accepted.
       */
      get: op.agentsPairingGet,
    },
    /**
     * Update Agent
     *
     * Requires the permissions `whatsapp.agent.update`.
     *
     * Organization API keys are not accepted.
     *
     * Pass `if_match` as the revision at `/agent/revision` in the result of `whatsapp.agents.get`, unchanged. A stale revision fails with `PRECONDITION_FAILED`: read again, reapply the change, and retry.
     */
    update: op.agentsUpdate,
  },
  broadcastSuppressions: {
    /**
     * Add Broadcast Suppressions
     *
     * Adds numbers to the organization's broadcast suppression list; broadcasts skip them from then on. A number already on the list is counted as a duplicate.
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
     * Cancels a broadcast in any state but completed, a draft included. Every recipient not yet sent becomes canceled; a send already in flight still settles.
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
     * Pauses a scheduled or running broadcast. Messages not yet handed to WhatsApp are recalled and their recipients wait again.
     *
     * Requires the permissions `whatsapp.broadcast.write`.
     */
    pause: op.broadcastsPause,
    recipients: {
      /**
       * Add Broadcast Recipients
       *
       * Adds recipients to a draft broadcast. A number the broadcast already has is counted as a duplicate (the first wins) and not added again.
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
     * Resumes a paused broadcast; it becomes scheduled or running again. A sender that is no longer usable is marked lost.
     *
     * Requires the permissions `whatsapp.broadcast.write`, `whatsapp.message.create`.
     */
    resume: op.broadcastsResume,
    /**
     * Start Broadcast
     *
     * Starts a draft broadcast: it becomes scheduled until not_before, then running. Content, senders and recipients cannot change afterwards.
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
    messages: {
      /**
       * Fetch Chat Messages
       *
       * Requires one of the permissions `whatsapp.inbound.read`, `whatsapp.message.read`.
       */
      list: op.chatsMessagesList,
    },
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
     * Replace Message Template
     *
     * Requires the permissions `whatsapp.template.write`.
     */
    replace: op.messageTemplatesReplace,
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
