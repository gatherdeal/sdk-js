import { readdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript-5-0";

const dist = fileURLToPath(new URL("../dist/", import.meta.url));
const entries = ["index", "crm", "identity", "whatsapp", "internal"];
const declarations = new Set(
  (await readdir(dist, { recursive: true })).filter((file) => file.endsWith(".d.ts")).sort().map((file) => join(dist, file)),
);

// Use the consumer-floor compiler's parser to edit only module specifiers,
// including inline import types. Keep each reference inside the mirrored tree.
function commonJSDeclaration(file, source) {
  const ast = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true);
  if (ast.parseDiagnostics.length > 0) {
    throw new Error(`${file}: ${ts.flattenDiagnosticMessageText(ast.parseDiagnostics[0].messageText, "\n")}`);
  }
  if (ast.referencedFiles.length > 0) throw new Error(`${file}: unexpected declaration path reference`);

  const edits = [];
  function visit(node) {
    let specifier;
    if (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) {
      specifier = node.moduleSpecifier;
    } else if (ts.isExternalModuleReference(node)) {
      specifier = node.expression;
    } else if (ts.isImportTypeNode(node)) {
      if (!ts.isLiteralTypeNode(node.argument)) throw new Error(`${file}: expected a literal import type`);
      specifier = node.argument.literal;
    } else if (ts.isModuleDeclaration(node) && ts.isStringLiteral(node.name)) {
      specifier = node.name;
    }

    if (specifier !== undefined) {
      const name = specifier.text;
      if (!ts.isStringLiteral(specifier) || !/^(?:\.\.?\/).*\.js$/.test(name) ||
          !declarations.has(resolve(dirname(file), `${name.slice(0, -3)}.d.ts`))) {
        throw new Error(`${file}: unexpected module specifier ${specifier.getText(ast)}`);
      }
      edits.push({ start: specifier.getStart(ast), end: specifier.end, text: JSON.stringify(`${name.slice(0, -3)}.cjs`) });
    }
    ts.forEachChild(node, visit);
  }
  visit(ast);

  // Work back to front so earlier source offsets stay valid.
  for (const { start, end, text } of edits.reverse()) {
    source = source.slice(0, start) + text + source.slice(end);
  }
  return source;
}

for (const file of declarations) {
  const source = await readFile(file, "utf8");
  await writeFile(file.replace(/\.d\.ts$/, ".d.cts"), commonJSDeclaration(file, source));
}

for (const entry of entries) {
  const specifier = `./${entry}.js`;
  const esm = await import(new URL(`../dist/${entry}.js`, import.meta.url));
  const names = Object.keys(esm).sort();
  const lines = ['"use strict";', 'Object.defineProperty(exports, "__esModule", { value: true });'];
  const load = `require(${JSON.stringify(specifier)});`;
  lines.push(names.length === 0 ? load : `const esm = ${load}`);
  for (const name of names) {
    const property = /^[$A-Z_a-z][$\w]*$/.test(name) ? `.${name}` : `[${JSON.stringify(name)}]`;
    lines.push(`exports${property} = esm${property};`);
  }
  await writeFile(join(dist, `${entry}.cjs`), `${lines.join("\n")}\n`);
}
