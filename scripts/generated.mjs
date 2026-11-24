#!/usr/bin/env node
// Verifies and updates src/generated against generated.lock.json and the
// published index.
//
//   node scripts/generated.mjs check
//     Offline: every file under src/generated matches the lock (path, size,
//     sha256), the lock's set hash matches its file list, and every public id
//     is defined by its service's operations module.
//   node scripts/generated.mjs sync [--out <file>]
//     Fetches the published index. When it differs from the lock, fetches
//     every file of the set, verifies it, then replaces src/generated and the
//     lock. Writes a summary (title, body, changed) as JSON to --out. A missing
//     index (404) is a no-op; any verification failure changes nothing.
//   node scripts/generated.mjs verify-remote
//     Fetches the locked set by its immutable URL and compares every file byte
//     for byte with src/generated.
//   node scripts/generated.mjs notes --from <lock file>
//     Prints release notes from the public-id difference between two locks.
//
// --base <url> replaces the published location, https://docs.gatherdeal.ai/sdk/js.

import { createHash } from "node:crypto";
import { mkdir, readdir, readFile, rm, writeFile, rename } from "node:fs/promises";
import { dirname, join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const GENERATED = join(ROOT, "src", "generated");
const LOCK = join(ROOT, "generated.lock.json");
const DEFAULT_BASE = "https://docs.gatherdeal.ai/sdk/js";
const PATH_PATTERN = /^(?:[a-z0-9_-]+\/)*[a-z0-9_-]+(?:\.[a-z0-9_-]+)*\.ts$/;
const SET_PATTERN = /^sha256:([0-9a-f]{64})$/;
const HEX_PATTERN = /^[0-9a-f]{64}$/;
const ID_PATTERN = /^[a-z0-9_]+(?:\.[a-z0-9_]+)+$/;
const MAX_FILE_BYTES = 8 * 1024 * 1024;

class VerificationError extends Error {}

function fail(message) {
  throw new VerificationError(message);
}

function sha256(bytes) {
  return createHash("sha256").update(bytes).digest("hex");
}

/** The set identity: sha256 of the compact JSON of the sorted file list. */
function setHash(files) {
  const list = files.map((f) => ({ path: f.path, sha256: f.sha256, size: f.size }));
  return `sha256:${sha256(Buffer.from(JSON.stringify(list)))}`;
}

/** Validates the shape of an index and returns it. */
function validateIndex(index) {
  if (typeof index !== "object" || index === null) fail("index is not an object");
  if (index.format_version !== 1) fail(`unsupported format_version ${index.format_version}`);
  if (typeof index.set !== "string" || !SET_PATTERN.test(index.set)) fail("malformed set");
  if (!Array.isArray(index.files) || index.files.length === 0) fail("missing files");
  if (!Array.isArray(index.services) || index.services.length === 0) fail("missing services");
  let previous = "";
  for (const f of index.files) {
    if (typeof f?.path !== "string" || !PATH_PATTERN.test(f.path) || f.path.split("/").includes("..")) {
      fail(`path outside src/generated: ${JSON.stringify(f?.path)}`);
    }
    if (f.path <= previous) fail(`files not sorted or duplicated at ${f.path}`);
    previous = f.path;
    if (typeof f.sha256 !== "string" || !HEX_PATTERN.test(f.sha256)) fail(`malformed sha256 of ${f.path}`);
    if (!Number.isInteger(f.size) || f.size < 0 || f.size > MAX_FILE_BYTES) fail(`malformed size of ${f.path}`);
  }
  if (setHash(index.files) !== index.set) fail("set hash does not match the file list");
  const paths = new Set(index.files.map((f) => f.path));
  for (const s of index.services) {
    if (typeof s?.service !== "string" || !/^[a-z0-9_]+$/.test(s.service)) fail("malformed service name");
    if (typeof s.version !== "string" || !/^v[0-9]+$/.test(s.version)) fail(`malformed version of ${s.service}`);
    if (!Array.isArray(s.public_ids)) fail(`missing public_ids of ${s.service}`);
    for (const id of s.public_ids) {
      if (typeof id !== "string" || !ID_PATTERN.test(id) || !id.startsWith(`${s.service}.`)) {
        fail(`malformed public id ${JSON.stringify(id)}`);
      }
    }
    if (!paths.has(`${s.service}/${s.version}/operations.ts`)) fail(`missing operations of ${s.service}`);
  }
  return index;
}

/** Fails unless every public id of the index is defined by its operations module. */
function checkPublicIds(index, contentOf) {
  for (const s of index.services) {
    const text = contentOf(`${s.service}/${s.version}/operations.ts`).toString("utf8");
    const defined = new Set([...text.matchAll(/^  id: "([^"]+)",$/gm)].map((m) => m[1]));
    for (const id of s.public_ids) if (!defined.has(id)) fail(`public id ${id} is not defined`);
    for (const id of defined) if (!s.public_ids.includes(id)) fail(`operation ${id} is not listed`);
  }
}

async function listFiles(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true, recursive: true })) {
    if (entry.isFile()) out.push(relative(GENERATED, join(entry.parentPath, entry.name)).split(sep).join("/"));
  }
  return out.sort();
}

async function readLock() {
  return validateIndex(JSON.parse(await readFile(LOCK, "utf8")));
}

async function check() {
  const lock = await readLock();
  const local = await listFiles(GENERATED);
  const locked = lock.files.map((f) => f.path);
  if (JSON.stringify(local) !== JSON.stringify(locked)) {
    fail(`src/generated differs from the lock: have ${local.join(", ")}`);
  }
  const contents = new Map();
  for (const f of lock.files) {
    const bytes = await readFile(join(GENERATED, f.path));
    if (bytes.length !== f.size || sha256(bytes) !== f.sha256) fail(`${f.path} does not match the lock`);
    contents.set(f.path, bytes);
  }
  checkPublicIds(lock, (path) => contents.get(path));
  console.log(`src/generated matches ${lock.set}`);
}

async function fetchBytes(url) {
  const response = await fetch(url, { redirect: "error", cache: "no-store" });
  if (!response.ok) {
    await response.body?.cancel();
    return { status: response.status };
  }
  return { status: response.status, bytes: Buffer.from(await response.arrayBuffer()) };
}

async function fetchSet(index) {
  const hex = SET_PATTERN.exec(index.set)[1];
  const files = new Map();
  for (const f of index.files) {
    const { status, bytes } = await fetchBytes(`${base()}/sets/${hex}/${f.path}`);
    if (bytes === undefined) fail(`${f.path}: HTTP ${status}`);
    if (bytes.length !== f.size) fail(`${f.path}: size ${bytes.length}, want ${f.size}`);
    if (sha256(bytes) !== f.sha256) fail(`${f.path}: sha256 mismatch`);
    files.set(f.path, bytes);
  }
  checkPublicIds(index, (path) => files.get(path));
  return files;
}

function publicIds(index) {
  return new Set(index.services.flatMap((s) => s.public_ids));
}

function diff(before, after) {
  const was = publicIds(before);
  const now = publicIds(after);
  const services = (index) => new Set(index.services.map((s) => `${s.service}/${s.version}`));
  return {
    added: [...now].filter((id) => !was.has(id)).sort(),
    removed: [...was].filter((id) => !now.has(id)).sort(),
    removedServices: [...services(before)].filter((s) => !services(after).has(s)).sort(),
    addedServices: [...services(after)].filter((s) => !services(before).has(s)).sort(),
  };
}

function summarize(before, after) {
  const d = diff(before, after);
  const parts = [];
  if (d.added.length > 0) parts.push(`add ${d.added.length === 1 ? d.added[0] : `${d.added.length} operations`}`);
  if (d.removed.length > 0) {
    parts.push(`remove ${d.removed.length === 1 ? d.removed[0] : `${d.removed.length} operations`}`);
  }
  const title = parts.length > 0 ? `feat(generated): ${parts.join(", ")}` : "chore(generated): update API modules";
  const lines = [];
  const needsReview = d.removed.length > 0 || d.removedServices.length > 0;
  if (needsReview) lines.push("**Needs review:** operations or services were removed.", "");
  for (const s of d.addedServices) lines.push(`- Added service ${s}`);
  for (const s of d.removedServices) lines.push(`- Removed service ${s}`);
  for (const id of d.added) lines.push(`- Added \`${id}\``);
  for (const id of d.removed) lines.push(`- Removed \`${id}\``);
  if (lines.length === 0) lines.push("- Updated types and descriptors; no operations added or removed.");
  lines.push("", `Set: \`${after.set}\``);
  return { title, body: lines.join("\n"), needsReview };
}

async function sync(out) {
  const result = { changed: false, title: "", body: "", needsReview: false };
  const lock = await readLock();
  const lockBytes = await readFile(LOCK);
  const { status, bytes } = await fetchBytes(`${base()}/index.json`);
  if (status === 404) {
    console.log("no published index; nothing to do");
  } else if (bytes === undefined) {
    fail(`index.json: HTTP ${status}`);
  } else {
    const index = validateIndex(JSON.parse(bytes.toString("utf8")));
    if (bytes.equals(lockBytes)) {
      console.log(`up to date at ${lock.set}`);
    } else {
      const files = await fetchSet(index);
      const staging = join(ROOT, "src", ".generated-staging");
      await rm(staging, { recursive: true, force: true });
      for (const [path, content] of files) {
        await mkdir(dirname(join(staging, path)), { recursive: true });
        await writeFile(join(staging, path), content);
      }
      await rm(GENERATED, { recursive: true, force: true });
      await rename(staging, GENERATED);
      await writeFile(LOCK, bytes);
      Object.assign(result, { changed: true }, summarize(lock, index));
      console.log(`updated to ${index.set}`);
    }
  }
  if (out !== undefined) await writeFile(out, JSON.stringify(result));
}

async function verifyRemote() {
  await check();
  const lock = await readLock();
  const files = await fetchSet(lock);
  for (const f of lock.files) {
    if (!files.get(f.path).equals(await readFile(join(GENERATED, f.path)))) fail(`${f.path} differs from the published set`);
  }
  console.log(`src/generated is byte-identical to the published set ${lock.set}`);
}

async function notes(from) {
  const lock = await readLock();
  const before = from === undefined ? { services: [] } : validateIndex(JSON.parse(await readFile(from, "utf8")));
  const d = diff(before, lock);
  const lines = [];
  for (const id of d.added) lines.push(`- Added \`${id}\``);
  for (const id of d.removed) lines.push(`- Removed \`${id}\``);
  if (lines.length === 0) lines.push("- No operations added or removed.");
  console.log(["## API operations", "", ...lines].join("\n"));
}

function base() {
  return (option("--base") ?? DEFAULT_BASE).replace(/\/+$/, "");
}

function option(name) {
  const i = process.argv.indexOf(name);
  return i === -1 ? undefined : process.argv[i + 1];
}

const commands = {
  check: () => check(),
  sync: () => sync(option("--out")),
  "verify-remote": () => verifyRemote(),
  notes: () => notes(option("--from")),
};

const command = commands[process.argv[2]];
if (command === undefined) {
  console.error("usage: generated.mjs check | sync [--out file] | verify-remote | notes [--from lock] [--base url]");
  process.exit(2);
}
try {
  await command();
} catch (error) {
  console.error(error instanceof VerificationError ? `verification failed: ${error.message}` : error);
  process.exit(1);
}
