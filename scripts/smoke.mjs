#!/usr/bin/env node
// Packs the SDK, installs the tarball into a fresh project and runs it in each
// runtime.
//
//   node scripts/smoke.mjs [runtime...] [--tarball file] [--chromium-executable path]
//
// Runtimes: node, bun, deno, types, workerd, chromium. Without arguments every
// runtime runs and a missing one is skipped with a message; a named runtime
// that is missing fails.
import { execFileSync, spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { copyFile, mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const ALL = ["node", "bun", "deno", "types", "workerd", "chromium"];

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
    import.meta.resolve(specifier);
    return true;
  } catch {
    return false;
  }
}

async function chromiumAvailable() {
  if (!resolvable("playwright-core")) return "playwright-core is not installed";
  if (chromiumExecutable !== undefined) return existsSync(chromiumExecutable) ? true : `${chromiumExecutable} not found`;
  const { chromium } = await import("playwright-core");
  return existsSync(chromium.executablePath()) ? true : "no Chromium for playwright-core (npx playwright-core install chromium)";
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
    workerd: {
      available: () => resolvable("miniflare") || "miniflare is not installed",
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
      runtime.run();
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
