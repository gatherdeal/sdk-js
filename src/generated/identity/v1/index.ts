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
     * Fetch Outlet By ID
     *
     * Requires the permissions `identity.outlet.read`.
     *
     * Credentials are optional.
     */
    get: op.outletsGet,
    /**
     * Fetch Outlets
     *
     * Lists the outlets visible to the caller.
     *
     * Requires the permissions `identity.outlet.read`.
     *
     * Credentials are optional.
     */
    list: op.outletsList,
  },
} as const;
