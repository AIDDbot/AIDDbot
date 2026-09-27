import { execFileSync } from "node:child_process";
import { RuleError } from "./cli.mjs";

/**
 * Run git in `cwd` and return trimmed stdout.
 * `quiet` hides git's stderr; `allowFailure` returns null instead of throwing.
 */
export function git(cwd, args, { quiet = false, allowFailure = false } = {}) {
  try {
    return execFileSync("git", args, {
      cwd, encoding: "utf8", windowsHide: true,
      stdio: ["ignore", "pipe", quiet ? "ignore" : "inherit"],
    }).trim();
  } catch (error) {
    if (allowFailure) return null;
    throw new RuleError(`git ${args.join(" ")} failed${error.status ? ` (exit ${error.status})` : ""}`);
  }
}

/** Current branch name, or "" on a detached HEAD. */
export function currentBranch(root) {
  return git(root, ["branch", "--show-current"], { quiet: true });
}

export function localBranches(root) {
  return git(root, ["branch", "--format=%(refname:short)"], { quiet: true }).split(/\r?\n/).filter(Boolean);
}

/** The local default branch: `requested` when given, else origin/HEAD, else main, else master. */
export function defaultBranch(root, requested = null) {
  const branches = localBranches(root);
  const remote = git(root, ["symbolic-ref", "--quiet", "--short", "refs/remotes/origin/HEAD"], { quiet: true, allowFailure: true });
  const inferred = remote?.startsWith("origin/") ? remote.slice(7) : branches.includes("main") ? "main" : branches.includes("master") ? "master" : null;
  const base = requested ?? inferred;
  if (!base || !branches.includes(base)) throw new RuleError(`Could not resolve a local default branch${requested ? ` named ${requested}` : ""}; pass --base <branch>.`);
  return base;
}

/** True when the working tree has no staged, unstaged, or untracked changes. */
export function isClean(root) {
  return git(root, ["status", "--porcelain", "--untracked-files=all"], { quiet: true }) === "";
}

export const SPEC_BRANCH = /^(?:feat|fix|refactor|chore)\/(S\d{4})-.+$/;

/** The spec ID encoded in the current branch, or null. */
export function specFromBranch(root) {
  const branch = git(root, ["branch", "--show-current"], { quiet: true, allowFailure: true });
  return SPEC_BRANCH.exec(branch ?? "")?.[1] ?? null;
}
