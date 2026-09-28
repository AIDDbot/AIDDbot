// Locating a spec and reading its identity.
import fs from "node:fs";
import path from "node:path";
import { productPath } from "./paths.mjs";
import { requireFields } from "./frontmatter.mjs";

export const SPEC_TYPES = ["feat", "fix", "refactor", "chore"];

export const specsDir = (root) => productPath(root, "specs");

/** Lowercase kebab-case, the shape of a spec slug and of its domain. */
export const isSlug = (value) => /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value ?? "");

/**
 * Resolve a spec ID (`S0001`), a spec directory, or a `spec.md` path to its directory.
 * Relative paths resolve from the working directory first, then from the repository root.
 */
export function resolveSpecDir(root, input) {
  const specs = specsDir(root);
  let target = null;
  if (/^S\d{4}$/.test(input) && fs.existsSync(specs)) {
    const match = fs.readdirSync(specs, { withFileTypes: true }).find((entry) => entry.isDirectory() && entry.name.startsWith(`${input}-`));
    if (match) target = path.join(specs, match.name);
  }
  target ??= [path.resolve(input), path.resolve(root, input), path.join(specs, input)].find((candidate) => fs.existsSync(candidate)) ?? path.resolve(root, input);
  if (!fs.existsSync(target)) throw new Error(`Spec directory not found: ${target}`);
  const dir = fs.statSync(target).isDirectory() ? target : path.dirname(target);
  const file = path.join(dir, "spec.md");
  if (!fs.existsSync(file)) throw new Error(`Spec file not found: ${file}`);
  return { dir, file };
}

/** Read the spec's frontmatter, requiring the given fields. */
export function readSpecFields(file, keys) {
  return requireFields(fs.readFileSync(file, "utf8"), keys, "Spec");
}
