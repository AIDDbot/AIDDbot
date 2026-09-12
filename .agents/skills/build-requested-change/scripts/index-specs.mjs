#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const [mode = "print", productFolder = ".product"] = process.argv.slice(2);
if (!['print', 'write'].includes(mode)) {
  process.stderr.write('Usage: index-specs.mjs [print|write] [product-folder]\n');
  process.exit(1);
}
const specs = path.resolve(productFolder, 'specs');
const target = path.join(specs, 'PRD.md');
const escape = (value) => value.replaceAll('|', '\\|').replaceAll('\n', ' ').trim();
const rows = fs.existsSync(specs) ? fs.readdirSync(specs, { withFileTypes: true })
  .filter((entry) => entry.isFile() && /^[FT]\d{3,}-.+\.md$/.test(entry.name))
  .sort((a, b) => a.name.localeCompare(b.name))
  .map((entry) => {
    const file = path.join(specs, entry.name);
    const text = fs.readFileSync(file, 'utf8');
    const title = text.match(/^#\s+(.+)$/m)?.[1]?.trim() || entry.name.replace(/\.md$/, '');
    const scope = text.match(/^## Scope\s*\r?\n+([\s\S]*?)(?=^## |$)/m)?.[1].trim();
    if (!scope) process.stderr.write('WARN ' + entry.name + ': missing Scope\n');
    return '| [' + escape(title) + '](./' + entry.name + ') | ' + escape(scope || 'Scope missing — inspect this spec before selecting it.') + ' |';
  }) : [];
const output = ['# PRD', '', '<!-- Generated from specs. Edit each spec Scope, then regenerate. -->', '', '| Spec | Scope |', '| --- | --- |', ...rows, ''].join('\n');
if (mode === 'write') {
  fs.mkdirSync(specs, { recursive: true });
  if (!fs.existsSync(target) || fs.readFileSync(target, 'utf8') !== output) fs.writeFileSync(target, output);
} else process.stdout.write(output);
