import fs from "node:fs";
import path from "node:path";

export function repositoryRoot(start) {
  let current = path.resolve(start);
  while (true) {
    if (fs.existsSync(path.join(current, ".aiddbot")) && fs.existsSync(path.join(current, ".product"))) return current;
    const parent = path.dirname(current);
    if (parent === current) return null;
    current = parent;
  }
}

export function readSpec(root, input) {
  const specsRoot = path.join(root, ".product", "specs");
  let specDir = path.isAbsolute(input) || fs.existsSync(path.resolve(input)) ? path.resolve(input) : path.join(specsRoot, input);
  if (!path.isAbsolute(input) && /^S\d{4}$/.test(input) && fs.existsSync(specsRoot)) {
    const match = fs.readdirSync(specsRoot, { withFileTypes: true }).find((entry) => entry.isDirectory() && entry.name.startsWith(`${input}-`));
    if (match) specDir = path.join(specsRoot, match.name);
  }
  if (!fs.existsSync(specDir)) throw new Error(`Spec directory not found: ${specDir}`);
  const file = fs.statSync(specDir).isDirectory() ? path.join(specDir, "spec.md") : specDir;
  if (!fs.existsSync(file)) throw new Error(`Spec file not found: ${file}`);
  const content = fs.readFileSync(file, "utf8");
  const frontmatter = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(content)?.[1] ?? "";
  const id = /^id:\s*(S\d{4})\s*$/m.exec(frontmatter)?.[1] ?? /\b(S\d{4})\b/.exec(path.basename(path.dirname(file)))?.[1];
  if (!id) throw new Error(`Could not determine spec ID from ${file}`);
  return { id, dir: path.dirname(file), file, frontmatter };
}
