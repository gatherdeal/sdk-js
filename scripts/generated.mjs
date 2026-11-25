#!/usr/bin/env node
// Verifies and updates src/generated against generated.lock.json and the
// published index.
//
//   node scripts/generated.mjs check
//     Offline: every file under src/generated matches the lock (path, size,
//     sha256), the lock's set hash matches its file list, and every public id
//     is defined by its service's operations module.
//   node scripts/generated.mjs sync [--from-dir <dir>] [--out <file>]
//     Fetches the published index. When it differs from the lock, fetches
//     every file of the set, verifies it, then replaces src/generated and the
//     lock. Writes a summary (title, body, changed) as JSON to --out. A missing
//     index (404) is a no-op; any verification failure changes nothing.
//     --from-dir reads and verifies a local generated set instead.
//   node scripts/generated.mjs verify-remote
//     Fetches the locked set by its immutable URL and compares every file byte
//     for byte with src/generated.
//   node scripts/generated.mjs notes --from <lock file>
//     Prints release notes from the public-id difference between two locks.
//
// --base <url> replaces the published location, https://docs.gatherdeal.ai/sdk/js.

import { createHash } from "node:crypto";
import { lstat, mkdir, readdir, readFile, rm, writeFile, rename } from "node:fs/promises";
import { dirname, join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const GENERATED = join(ROOT, "src", "generated");
const LOCK = join(ROOT, "generated.lock.json");
const DEFAULT_BASE = "https://docs.gatherdeal.ai/sdk/js";
const PATH_PATTERN = /^(?:operation\.ts|[a-z0-9_]+\/v[0-9]+\/(?:types|operations|errors|index)\.ts)$/;
const SERVICE_FILES = ["types.ts", "operations.ts", "errors.ts", "index.ts"];
const SET_PATTERN = /^sha256:([0-9a-f]{64})$/;
const HEX_PATTERN = /^[0-9a-f]{64}$/;
const ID_PATTERN = /^[a-z0-9_]+(?:\.[a-z0-9_]+)+$/;
const MAX_FILE_BYTES = 8 * 1024 * 1024;
const MAX_SET_BYTES = 32 * 1024 * 1024;
const MAX_FILES = 200;
const MAX_INDEX_BYTES = 1024 * 1024;
const DOWNLOAD_TIMEOUT_MS = 5 * 60 * 1000;
const INDEX_KEYS = ["format_version", "set", "services", "files"];
const SERVICE_KEYS = ["service", "version", "contract_sha256", "public_ids"];
const FILE_KEYS = ["path", "sha256", "size"];

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

function exactKeys(value, keys, what) {
  if (typeof value !== "object" || value === null || Array.isArray(value)) fail(`${what} is not an object`);
  const actual = Object.keys(value);
  if (actual.length !== keys.length || !keys.every((k) => Object.hasOwn(value, k))) {
    fail(`${what} must have exactly the fields ${keys.join(", ")}`);
  }
}

/** Validates an index against the closed schema and returns it. */
function validateIndex(index) {
  exactKeys(index, INDEX_KEYS, "index");
  if (index.format_version !== 1) fail(`unsupported format_version ${index.format_version}`);
  if (typeof index.set !== "string" || !SET_PATTERN.test(index.set)) fail("malformed set");
  if (!Array.isArray(index.files) || index.files.length === 0) fail("missing files");
  if (index.files.length > MAX_FILES) fail(`more than ${MAX_FILES} files`);
  if (!Array.isArray(index.services) || index.services.length === 0) fail("missing services");
  let previous = "";
  let total = 0;
  for (const f of index.files) {
    exactKeys(f, FILE_KEYS, "file entry");
    if (typeof f?.path !== "string" || !PATH_PATTERN.test(f.path) || f.path.split("/").includes("..")) {
      fail(`path outside src/generated: ${JSON.stringify(f?.path)}`);
    }
    if (f.path <= previous) fail(`files not sorted or duplicated at ${f.path}`);
    previous = f.path;
    if (typeof f.sha256 !== "string" || !HEX_PATTERN.test(f.sha256)) fail(`malformed sha256 of ${f.path}`);
    if (!Number.isInteger(f.size) || f.size < 0 || f.size > MAX_FILE_BYTES) fail(`malformed size of ${f.path}`);
    total += f.size;
  }
  if (total > MAX_SET_BYTES) fail(`set larger than ${MAX_SET_BYTES} bytes`);
  if (setHash(index.files) !== index.set) fail("set hash does not match the file list");
  const paths = new Set(index.files.map((f) => f.path));
  const services = new Set();
  const expected = new Set(["operation.ts"]);
  const ids = new Set();
  for (const s of index.services) {
    exactKeys(s, SERVICE_KEYS, "service entry");
    if (typeof s.service !== "string" || !/^[a-z0-9_]+$/.test(s.service)) fail("malformed service name");
    if (typeof s.version !== "string" || !/^v[0-9]+$/.test(s.version)) fail(`malformed version of ${s.service}`);
    if (services.has(`${s.service}/${s.version}`)) fail(`duplicate service ${s.service} ${s.version}`);
    services.add(`${s.service}/${s.version}`);
    if (typeof s.contract_sha256 !== "string" || !HEX_PATTERN.test(s.contract_sha256)) {
      fail(`malformed contract_sha256 of ${s.service}`);
    }
    if (!Array.isArray(s.public_ids)) fail(`missing public_ids of ${s.service}`);
    for (const id of s.public_ids) {
      if (typeof id !== "string" || !ID_PATTERN.test(id) || !id.startsWith(`${s.service}.`)) {
        fail(`malformed public id ${JSON.stringify(id)}`);
      }
      if (ids.has(id)) fail(`duplicate public id ${id}`);
      ids.add(id);
    }
    for (const file of SERVICE_FILES) expected.add(`${s.service}/${s.version}/${file}`);
  }
  for (const path of expected) if (!paths.has(path)) fail(`missing ${path}`);
  for (const path of paths) if (!expected.has(path)) fail(`unexpected file ${path}`);
  return index;
}

/** The canonical text of an index: known fields only, in a fixed order. */
function canonical(index) {
  const value = {
    format_version: index.format_version,
    set: index.set,
    services: index.services.map((s) => ({
      service: s.service,
      version: s.version,
      contract_sha256: s.contract_sha256,
      public_ids: s.public_ids,
    })),
    files: index.files.map((f) => ({ path: f.path, sha256: f.sha256, size: f.size })),
  };
  return `${JSON.stringify(value, null, 2)}\n`;
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

/** Regular files under dir; fails on symlinks and other non-regular entries. */
async function listFiles(dir) {
  if (!(await lstat(dir)).isDirectory()) fail(`${relative(ROOT, dir)} is not a directory`);
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true, recursive: true })) {
    const path = relative(dir, join(entry.parentPath, entry.name)).split(sep).join("/");
    if (entry.isDirectory()) continue;
    if (!entry.isFile()) fail(`${path} is not a regular file`);
    out.push(path);
  }
  return out.sort();
}

async function readLock() {
  const text = await readFile(LOCK, "utf8");
  const lock = validateIndex(JSON.parse(text));
  if (canonical(lock) !== text) fail("generated.lock.json is not in canonical form");
  return lock;
}

async function check() {
  const lock = await readLock();
  const local = await listFiles(GENERATED);
  const locked = lock.files.map((f) => f.path);
  if (JSON.stringify(local) !== JSON.stringify(locked)) {
    fail(`src/generated differs from the lock: have ${local.join(", ")}`);
  }
  await readSet(lock, (path) => readLocalFile(GENERATED, path));
  console.log(`src/generated matches ${lock.set}`);
}

const downloads = AbortSignal.timeout(DOWNLOAD_TIMEOUT_MS);

/** Fetches url, reading at most limit bytes; fails on a longer body or after the download time limit. */
async function fetchBytes(url, limit) {
  const response = await fetch(url, { redirect: "error", cache: "no-store", signal: downloads });
  if (!response.ok) {
    await response.body?.cancel();
    return { status: response.status };
  }
  const chunks = [];
  let length = 0;
  for await (const chunk of response.body ?? []) {
    length += chunk.length;
    if (length > limit) fail(`${url}: body exceeds ${limit} bytes`);
    chunks.push(chunk);
  }
  return { status: response.status, bytes: Buffer.concat(chunks) };
}

async function readSet(index, load) {
  const files = new Map();
  for (const f of index.files) {
    const bytes = await load(f.path, f.size);
    if (bytes.length !== f.size) fail(`${f.path}: size ${bytes.length}, want ${f.size}`);
    if (sha256(bytes) !== f.sha256) fail(`${f.path}: sha256 mismatch`);
    files.set(f.path, bytes);
  }
  checkPublicIds(index, (path) => files.get(path));
  return files;
}

async function readLocalFile(dir, path, limit = MAX_FILE_BYTES) {
  const filename = join(dir, path);
  const stat = await lstat(filename);
  if (!stat.isFile()) fail(`${path} is not a regular file`);
  if (stat.size > limit) fail(`${path}: body exceeds ${limit} bytes`);
  return readFile(filename);
}

function fetchSet(index) {
  const hex = SET_PATTERN.exec(index.set)[1];
  return readSet(index, async (path, size) => {
    const { status, bytes } = await fetchBytes(`${base()}/sets/${hex}/${path}`, size);
    if (bytes === undefined) fail(`${path}: HTTP ${status}`);
    return bytes;
  });
}

async function localSet(dir) {
  const paths = await listFiles(dir);
  const bytes = await readLocalFile(dir, "index.json", MAX_INDEX_BYTES);
  const index = validateIndex(JSON.parse(bytes.toString("utf8")));
  const allowed = ["index.json", ...index.files.map((f) => f.path)].sort();
  if (JSON.stringify(paths) !== JSON.stringify(allowed)) fail("local directory differs from index.json");
  const files = await readSet(index, (path, size) => readLocalFile(dir, path, size));
  return { index, files };
}

async function remoteSet(lock) {
  const { status, bytes } = await fetchBytes(`${base()}/index.json`, MAX_INDEX_BYTES);
  if (status === 404) return undefined;
  if (bytes === undefined) fail(`index.json: HTTP ${status}`);
  const index = validateIndex(JSON.parse(bytes.toString("utf8")));
  const files = canonical(index) === canonical(lock) ? undefined : await fetchSet(index);
  return { index, files };
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

async function sync(out, fromDir) {
  const result = { changed: false, title: "", body: "", needsReview: false };
  const lock = await readLock();
  const set = fromDir === undefined ? await remoteSet(lock) : await localSet(fromDir);
  if (set === undefined) {
    console.log("no published index; nothing to do");
  } else if (canonical(set.index) === canonical(lock)) {
    console.log(`up to date at ${lock.set}`);
  } else {
    const staging = join(ROOT, "src", ".generated-staging");
    await rm(staging, { recursive: true, force: true });
    for (const [path, content] of set.files) {
      await mkdir(dirname(join(staging, path)), { recursive: true });
      await writeFile(join(staging, path), content);
    }
    await rm(GENERATED, { recursive: true, force: true });
    await rename(staging, GENERATED);
    await writeFile(LOCK, canonical(set.index));
    Object.assign(result, { changed: true }, summarize(lock, set.index));
    console.log(`updated to ${set.index.set}`);
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
  if (i === -1) return undefined;
  const value = process.argv[i + 1];
  if (value === undefined || value.startsWith("--")) fail(`${name} requires a value`);
  return value;
}

const commands = {
  check: () => check(),
  sync: () => sync(option("--out"), option("--from-dir")),
  "verify-remote": () => verifyRemote(),
  notes: () => notes(option("--from")),
};

const command = commands[process.argv[2]];
if (command === undefined) {
  console.error("usage: generated.mjs check | sync [--from-dir dir] [--out file] | verify-remote | notes [--from lock] [--base url]");
  process.exit(2);
}
try {
  await command();
} catch (error) {
  console.error(error instanceof VerificationError ? `verification failed: ${error.message}` : error);
  process.exit(1);
}
