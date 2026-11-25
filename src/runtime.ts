/** True in a page, a web worker or a service worker. */
export function isBrowserLike(): boolean {
  const g = globalThis as { document?: unknown; importScripts?: unknown };
  return typeof g.document !== "undefined" || typeof g.importScripts === "function";
}

/** Reads the default API key in runtimes with safe environment access. */
export function readAPIKey(): string | undefined {
  if (isBrowserLike() || globalThis.navigator?.userAgent === "Cloudflare-Workers") return undefined;

  const variable = "GATHERDEAL_API_KEY";
  const runtime = globalThis as {
    Deno?: {
      permissions: { querySync(descriptor: { name: "env"; variable: string }): { state: string } };
      env: { get(variable: string): string | undefined };
    };
    process?: {
      versions?: { node?: string; bun?: string };
      env?: Record<string, string | undefined>;
    };
  };
  const deno = runtime.Deno;
  if (deno !== undefined) {
    return deno.permissions.querySync({ name: "env", variable }).state === "granted" ? deno.env.get(variable) : undefined;
  }
  const process = runtime.process;
  if (process?.versions?.node || process?.versions?.bun) return process.env?.[variable];
  return undefined;
}

/** A random version 4 UUID. */
export function randomId(): string {
  const c = globalThis.crypto;
  if (typeof c.randomUUID === "function") return c.randomUUID();
  const b = c.getRandomValues(new Uint8Array(16));
  b[6] = (b[6]! & 0x0f) | 0x40;
  b[8] = (b[8]! & 0x3f) | 0x80;
  const hex = Array.from(b, (x) => x.toString(16).padStart(2, "0")).join("");
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

/** The compact JSON text of value as unpadded base64url of its UTF-8 bytes. */
export function base64UrlJson(value: unknown): string {
  const bytes = new TextEncoder().encode(JSON.stringify(value));
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

/** Resolves after ms, or rejects with the signal's reason when it aborts first. */
export function sleep(ms: number, signal?: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      reject(signal.reason);
      return;
    }
    const onAbort = () => {
      clearTimeout(timer);
      reject(signal!.reason);
    };
    const timer = setTimeout(() => {
      signal?.removeEventListener("abort", onAbort);
      resolve();
    }, ms);
    signal?.addEventListener("abort", onAbort, { once: true });
  });
}

/** Freezes value and every object reachable from it; returns value. */
export function deepFreeze<T>(value: T): T {
  if (typeof value === "object" && value !== null && !Object.isFrozen(value)) {
    Object.freeze(value);
    for (const key of Reflect.ownKeys(value)) deepFreeze((value as Record<PropertyKey, unknown>)[key]);
  }
  return value;
}
