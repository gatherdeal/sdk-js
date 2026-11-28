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
     * Create an agent.
     *
     * Requires the permissions `whatsapp.agent.create`.
     *
     * Organization API keys are not accepted.
     */
    create: op.agentsCreate,
    /**
     * Delete an agent.
     *
     * Requires the permissions `whatsapp.agent.delete`.
     *
     * Organization API keys are not accepted.
     */
    delete: op.agentsDelete,
    /**
     * Get an agent.
     *
     * Requires the permissions `whatsapp.agent.read`.
     *
     * Organization API keys are not accepted.
     */
    get: op.agentsGet,
    /**
     * List agents.
     *
     * Requires the permissions `whatsapp.agent.read`.
     *
     * Organization API keys are not accepted.
     *
     * Use `for await` to iterate over all results.
     */
    list: op.agentsList,
    pairing: {
      /**
       * Get an agent pairing.
       *
       * Requires the permissions `whatsapp.agent.create`.
       *
       * Organization API keys are not accepted.
       */
      get: op.agentsPairingGet,
    },
    /**
     * Update an agent.
     *
     * Requires the permissions `whatsapp.agent.update`.
     *
     * Organization API keys are not accepted.
     *
     * Pass the revision from `whatsapp.agents.get` as the `ifMatch` request option. A stale revision fails with `PRECONDITION_FAILED`: read again, reapply the change, and retry.
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
     * List broadcast suppressions.
     *
     * Requires the permissions `whatsapp.broadcast.read`.
     *
     * Use `for await` to iterate over all results.
     */
    list: op.broadcastSuppressionsList,
    /**
     * Delete Broadcast Suppression
     *
     * Removes a suppression entry. Recipients it already suppressed stay suppressed.
     *
     * Requires the permissions `whatsapp.broadcast.write`.
     */
    remove: op.broadcastSuppressionsRemove,
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
     * Create a broadcast.
     *
     * Requires the permissions `whatsapp.broadcast.write`, `whatsapp.message.send`.
     */
    create: op.broadcastsCreate,
    /**
     * Get a broadcast.
     *
     * Requires the permissions `whatsapp.broadcast.read`.
     */
    get: op.broadcastsGet,
    /**
     * List broadcasts.
     *
     * Requires the permissions `whatsapp.broadcast.read`.
     *
     * Use `for await` to iterate over all results.
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
       * List broadcast recipients.
       *
       * Requires the permissions `whatsapp.broadcast.read`.
       *
       * Use `for await` to iterate over all results.
       */
      list: op.broadcastsRecipientsList,
      /**
       * Delete Broadcast Recipient
       *
       * Removes a recipient from a draft broadcast.
       *
       * Requires the permissions `whatsapp.broadcast.write`.
       */
      remove: op.broadcastsRecipientsRemove,
    },
    /**
     * Resume Broadcast
     *
     * Resumes a paused broadcast; it becomes scheduled or running again. A sender that is no longer usable is marked lost.
     *
     * Requires the permissions `whatsapp.broadcast.write`, `whatsapp.message.send`.
     */
    resume: op.broadcastsResume,
    /**
     * Start Broadcast
     *
     * Starts a draft broadcast: it becomes scheduled until not_before, then running. Content, senders and recipients cannot change afterwards.
     *
     * Requires the permissions `whatsapp.broadcast.write`, `whatsapp.message.send`.
     */
    start: op.broadcastsStart,
    /**
     * Update a broadcast.
     *
     * Requires the permissions `whatsapp.broadcast.write`, `whatsapp.message.send`.
     */
    update: op.broadcastsUpdate,
  },
  chatMessages: {
    /**
     * Get a chat message.
     *
     * Requires one of the permissions `whatsapp.chat.read`, `whatsapp.message.read`.
     */
    get: op.chatMessagesGet,
    /**
     * List chat message feeds.
     *
     * Requires one of the permissions `whatsapp.chat.read`, `whatsapp.message.read`.
     */
    list: op.chatMessagesList,
  },
  chats: {
    /**
     * Get a chat.
     *
     * Requires the permissions `whatsapp.chat.read`.
     */
    get: op.chatsGet,
    /**
     * List chats.
     *
     * Requires the permissions `whatsapp.chat.read`.
     *
     * Use `for await` to iterate over all results.
     */
    list: op.chatsList,
    messages: {
      /**
       * List chat messages.
       *
       * Requires one of the permissions `whatsapp.chat.read`, `whatsapp.message.read`.
       *
       * Use `for await` to iterate over all results.
       */
      list: op.chatsMessagesList,
    },
  },
  messageTemplates: {
    /**
     * Create a message template.
     *
     * Requires the permissions `whatsapp.message_template.write`.
     */
    create: op.messageTemplatesCreate,
    /**
     * Delete a message template.
     *
     * Requires the permissions `whatsapp.message_template.delete`.
     */
    delete: op.messageTemplatesDelete,
    /**
     * Get a message template.
     *
     * Requires one of the permissions `whatsapp.message.send`, `whatsapp.message_template.read`.
     */
    get: op.messageTemplatesGet,
    /**
     * List message templates.
     *
     * Requires one of the permissions `whatsapp.message.send`, `whatsapp.message_template.read`.
     *
     * Use `for await` to iterate over all results.
     */
    list: op.messageTemplatesList,
    /**
     * Preview Message Template
     *
     * Requires one of the permissions `whatsapp.message.send`, `whatsapp.message_template.read`.
     */
    preview: op.messageTemplatesPreview,
    /**
     * Replace Message Template
     *
     * Requires the permissions `whatsapp.message_template.write`.
     */
    replace: op.messageTemplatesReplace,
  },
  messages: {
    /**
     * Create a message.
     *
     * Requires the permissions `whatsapp.message.send`.
     */
    create: op.messagesCreate,
    /**
     * Get a message.
     *
     * Requires the permissions `whatsapp.message.read`.
     */
    get: op.messagesGet,
    /**
     * List messages.
     *
     * Requires the permissions `whatsapp.message.read`.
     *
     * Use `for await` to iterate over all results.
     */
    list: op.messagesList,
  },
} as const;
