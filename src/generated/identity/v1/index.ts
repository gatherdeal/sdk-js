// Generated from the GatherDeal public API contracts. Do not edit.

import * as op from "./operations.js";

/** The identity API, version v1. */
export const service = {
  name: "identity",
  version: "v1",
  baseURL: "https://api.gatherdeal.ai/identity",
} as const;

/** Operations by member path. */
export const operations = {
  outlets: {
    /**
     * Get an outlet.
     *
     * Requires the permissions `identity.outlet.read`.
     *
     * Credentials are optional.
     */
    get: op.outletsGet,
    /**
     * List outlets.
     *
     * Lists the outlets visible to the caller.
     *
     * Requires the permissions `identity.outlet.read`.
     *
     * Credentials are optional.
     *
     * Use `for await` to iterate over all results.
     */
    list: op.outletsList,
  },
} as const;
