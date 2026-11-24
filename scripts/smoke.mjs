#!/usr/bin/env node
// Packs the SDK, installs the tarball into a fresh project and runs it in each
// runtime.
//
//   node scripts/smoke.mjs [runtime...] [--tarball file] [--chromium-executable path]
//
// Runtimes: node, bun, deno, types, tests, workerd, chromium. Without
// arguments every runtime runs and a missing one is skipped with a message; a
// named runtime that is missing fails. workerd and chromium use the locked
// harness dependencies in smoke/ (npm ci --prefix smoke). tests runs the unit
// tests that use only the public API against the installed package.
import { execFileSync, spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { copyFile, cp, mkdir, mkdtemp, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const ALL = ["node", "bun", "deno", "types", "tests", "workerd", "chromium"];
const harness = createRequire(join(ROOT, "smoke", "package.json"));

const args = process.argv.slice(2);
function option(name) {
  const i = args.indexOf(name);
  if (i === -1) return undefined;
  const [, value] = args.splice(i, 2);
  return value;
}
const tarballArg = option("--tarball");
const chromiumExecutable = option("--chromium-executable");
const requested = args.length > 0 ? args : ALL;
for (const r of requested) if (!ALL.includes(r)) throw new Error(`unknown runtime ${r}`);
const required = args.length > 0;

function has(command) {
  return spawnSync(command, ["--version"], { stdio: "ignore" }).status === 0;
}

function resolvable(specifier) {
  try {
    harness.resolve(specifier);
    return true;
  } catch {
    return false;
  }
}

async function chromiumAvailable() {
  if (!resolvable("playwright-core")) return "playwright-core is not installed (npm ci --prefix smoke)";
  if (chromiumExecutable !== undefined) return existsSync(chromiumExecutable) ? true : `${chromiumExecutable} not found`;
  const { chromium } = await import(pathToFileURL(harness.resolve("playwright-core")).href);
  return existsSync(chromium.executablePath()) ? true : "no Chromium for playwright-core (npx playwright-core install chromium)";
}

/** Compiles the unit tests, keeps those that import only public entry points, and runs them on the package. */
async function runPublicTests(consumer) {
  const compiled = join(work, "compiled");
  run(process.execPath, [join(ROOT, "node_modules", "typescript", "bin", "tsc"), "-p", join(ROOT, "tsconfig.test.json"), "--outDir", compiled], ROOT);
  const target = join(consumer, "build", "test");
  await mkdir(target, { recursive: true });
  await cp(join(ROOT, "test", "fixtures"), join(consumer, "test", "fixtures"), { recursive: true });
  const entries = { "../src/index.js": "@gatherdeal/sdk", "../src/crm.js": "@gatherdeal/sdk/crm", "../src/identity.js": "@gatherdeal/sdk/identity", "../src/whatsapp.js": "@gatherdeal/sdk/whatsapp" };
  const kept = [];
  for (const name of await readdir(join(compiled, "test"))) {
    if (!name.endsWith(".js")) continue;
    let text = await readFile(join(compiled, "test", name), "utf8");
    for (const [from, to] of Object.entries(entries)) text = text.replaceAll(`"${from}"`, `"${to}"`);
    if (text.includes('"../src/') || text.includes("generated.mjs")) continue;
    await writeFile(join(target, name), text);
    if (name.endsWith(".test.js")) kept.push(join("build", "test", name));
  }
  if (kept.length === 0) throw new Error("no public-API tests found");
  console.log(`tests on the package: ${kept.join(", ")}`);
  run(process.execPath, ["--test", ...kept], consumer);
}

const work = await mkdtemp(join(tmpdir(), "gatherdeal-sdk-smoke-"));
const run = (command, argv, cwd = work) => execFileSync(command, argv, { cwd, stdio: "inherit" });
const results = [];
let failed = false;

try {
  let tarball = tarballArg === undefined ? undefined : resolve(tarballArg);
  if (tarball === undefined) {
    run("npm", ["pack", "--pack-destination", work], ROOT);
    const { version } = JSON.parse(await readFile(join(ROOT, "package.json"), "utf8"));
    tarball = join(work, `gatherdeal-sdk-${version}.tgz`);
  }
  const consumer = join(work, "consumer");
  await mkdir(consumer);
  await writeFile(
    join(consumer, "package.json"),
    JSON.stringify({ private: true, type: "module", dependencies: { "@gatherdeal/sdk": `file:${tarball}` } }),
  );
  await writeFile(
    join(consumer, "tsconfig.json"),
    JSON.stringify({
      compilerOptions: {
        target: "es2022",
        module: "nodenext",
        lib: ["es2022", "dom"],
        types: [],
        strict: true,
        exactOptionalPropertyTypes: true,
        noUncheckedIndexedAccess: true,
        noEmit: true,
        skipLibCheck: false,
      },
      files: ["consumer-types.ts"],
    }),
  );
  for (const f of ["consumer.mjs", "consumer-types.ts"]) await copyFile(join(ROOT, "smoke", f), join(consumer, f));
  run("npm", ["install", "--no-audit", "--no-fund", "--ignore-scripts", "--no-package-lock"], consumer);
  const installed = join(consumer, "node_modules", "@gatherdeal", "sdk");

  const runtimes = {
    node: { available: () => true, run: () => run(process.execPath, ["consumer.mjs"], consumer) },
    bun: { available: () => has("bun") || "bun is not installed", run: () => run("bun", ["consumer.mjs"], consumer) },
    deno: {
      available: () => has("deno") || "deno is not installed",
      run: () => {
        run("deno", ["run", "--allow-net", "--allow-read", "consumer.mjs"], consumer);
        run("deno", ["check", "consumer-types.ts"], consumer);
      },
    },
    types: {
      available: () => true,
      run: () => run(process.execPath, [join(ROOT, "node_modules", "typescript", "bin", "tsc"), "-p", "tsconfig.json"], consumer),
    },
    tests: { available: () => true, run: () => runPublicTests(consumer) },
    workerd: {
      available: () => resolvable("miniflare") || "miniflare is not installed (npm ci --prefix smoke)",
      run: () => run(process.execPath, [join(ROOT, "smoke", "workerd.mjs"), installed], ROOT),
    },
    chromium: {
      available: chromiumAvailable,
      run: () =>
        run(
          process.execPath,
          [join(ROOT, "smoke", "chromium.mjs"), installed, ...(chromiumExecutable ? ["--executable", chromiumExecutable] : [])],
          ROOT,
        ),
    },
  };

  for (const name of requested) {
    const runtime = runtimes[name];
    const available = await runtime.available();
    if (available !== true) {
      results.push(`${name}: ${required ? "FAILED" : "skipped"} (${available})`);
      failed ||= required;
      continue;
    }
    try {
      await runtime.run();
      results.push(`${name}: ok`);
    } catch {
      results.push(`${name}: FAILED`);
      failed = true;
    }
  }
} finally {
  await rm(work, { recursive: true, force: true });
}

console.log(["", "smoke results:", ...results.map((r) => `  ${r}`)].join("\n"));
process.exit(failed ? 1 : 0);
