import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));

export function findRoot() {
  let current = path.resolve(HERE, "..", "..", "..", "..", "..");
  while (true) {
    if (fs.existsSync(path.join(current, ".aiddbot")) && fs.existsSync(path.join(current, ".git"))) return current;
    const parent = path.dirname(current);
    if (parent === current) return null;
    current = parent;
  }
}

export function git(root, args) {
  return execFileSync("git", args, { cwd: root, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim();
}

export function baseBranch(root, requested) {
  const branches = git(root, ["branch", "--format=%(refname:short)"]).split(/\r?\n/);
  let remote = "";
  try { remote = git(root, ["symbolic-ref", "--quiet", "--short", "refs/remotes/origin/HEAD"]); } catch { /* Use conventional names. */ }
  const inferred = remote.startsWith("origin/") ? remote.slice(7) : branches.includes("main") ? "main" : branches.includes("master") ? "master" : null;
  const base = requested ?? inferred;
  if (!base || !branches.includes(base)) throw new Error(`Could not resolve local base branch${requested ? ` ${requested}` : ""}.`);
  return base;
}
