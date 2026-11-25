import assert from "node:assert/strict";

const variable = "GATHERDEAL_API_KEY";
assert.notEqual(Deno.permissions.querySync({ name: "env", variable }).state, "granted");

// Observe attempts before loading the package, even if the SDK catches them.
const attempts = [];
for (const [object, method] of [
  [Deno.env, "get"],
  [Deno.env, "toObject"],
  [Deno.permissions, "request"],
  [Deno.permissions, "requestSync"],
]) {
  object[method] = () => {
    attempts.push(method);
    throw new Error(`unexpected Deno ${method}`);
  };
}

const { GatherDeal } = await import("@gatherdeal/sdk");
assert.throws(() => new GatherDeal(), /^Error: GatherDeal: set apiKey, accessToken or GATHERDEAL_API_KEY/);
assert.deepEqual(attempts, []);
console.log("deno: no environment read or permission request");
