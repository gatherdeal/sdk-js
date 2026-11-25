import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";
import ts from "typescript-5-0";

test("README TypeScript examples compile with TypeScript 5.0", () => {
  const root = process.cwd();
  const readme = readFileSync(join(root, "README.md"), "utf8");
  const examples = new Map<string, string>();
  for (const match of readme.matchAll(/^```(?:ts|typescript)[ \t]*\r?\n([\s\S]*?)^```[ \t]*\r?$/gm)) {
    const line = readme.slice(0, match.index).split("\n").length + 1;
    examples.set(join(root, `readme-line-${line}.mts`), match[1]!);
  }
  assert.ok(examples.size > 0, "README has no TypeScript examples");
  // Snippets following setup may refer to the client from that example.
  examples.set(
    join(root, "readme-setup.d.ts"),
    'declare const client: import("@gatherdeal/sdk").GatherDeal;',
  );

  const options: ts.CompilerOptions = {
    target: ts.ScriptTarget.ES2022,
    module: ts.ModuleKind.NodeNext,
    strict: true,
    exactOptionalPropertyTypes: true,
    noEmit: true,
    types: [],
    baseUrl: root,
    paths: {
      "@gatherdeal/sdk": ["src/index.ts"],
      "@gatherdeal/sdk/*": ["src/*.ts"],
    },
  };
  const host = ts.createCompilerHost(options);
  const getSourceFile = host.getSourceFile;
  host.getSourceFile = (name, ...args) => {
    const example = examples.get(name);
    return example === undefined
      ? getSourceFile(name, ...args)
      : ts.createSourceFile(name, example, args[0]);
  };
  const program = ts.createProgram([...examples.keys()], options, host);
  const diagnostics = ts.getPreEmitDiagnostics(program);
  assert.ok(diagnostics.length === 0, ts.formatDiagnosticsWithColorAndContext(diagnostics, host));
});
