#!/usr/bin/env node
// Commit remaining task changes, merge the current task branch into the default branch, and delete it.
import { execFileSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));

function fail(message) {
  process.stderr.write(`${message}\nUsage: node .agents/skills/scaffold-system/scripts/git-integrate.mjs <commit-message> [--base <branch>]\n`);
  process.exit(2);
}

function git(root, args, options = {}) {
  try {
    return execFileSync("git", args, {
      cwd: root,
      encoding: "utf8",
      stdio: options.quiet ? ["ignore", "pipe", "ignore"] : ["ignore", "pipe", "inherit"],
    }).trim();
  } catch (error) {
    if (!options.allowFailure) throw new Error(`git ${args.join(" ")} failed${error.status ? ` (exit ${error.status})` : ""}`);
    return null;
  }
}

function parseArgs(argv) {
  if (!argv[0] || argv[0].startsWith("--")) fail("Missing commit message.");
  let base = null;
  for (let index = 1; index < argv.length; index += 1) {
    if (argv[index] !== "--base" || !argv[index + 1] || base) fail(`Unexpected argument: ${argv[index]}`);
    base = argv[++index];
  }
  return { message: argv[0], base };
}

function resolveTarget(root, requestedBase) {
  const source = git(root, ["branch", "--show-current"], { quiet: true });
  if (!source || source === requestedBase) fail("Run this script from a named task branch, not the default branch or detached HEAD.");
  const branches = git(root, ["branch", "--format=%(refname:short)"], { quiet: true }).split(/\r?\n/);
  const remote = git(root, ["symbolic-ref", "--quiet", "--short", "refs/remotes/origin/HEAD"], { quiet: true, allowFailure: true });
  const inferred = remote?.startsWith("origin/") ? remote.slice(7) : branches.includes("main") ? "main" : branches.includes("master") ? "master" : null;
  const base = requestedBase ?? inferred;
  if (!base || !branches.includes(base)) fail(`Could not resolve a local default branch${requestedBase ? ` named ${requestedBase}` : ""}; pass --base <branch>.`);
  if (source === base) fail("The task branch cannot be the default branch.");
  return { source, base };
}

function integrate(root, source, base, message) {
  if (git(root, ["status", "--porcelain"], { quiet: true })) {
    git(root, ["add", "-A"]);
    git(root, ["commit", "-m", message]);
  }
  if (git(root, ["rev-parse", "--verify", `refs/heads/${base}`], { quiet: true }) === git(root, ["rev-parse", "--verify", `refs/heads/${source}`], { quiet: true })) {
    fail("There are no task commits to integrate.");
  }
  git(root, ["switch", base]);
  try {
    git(root, ["merge", "--no-ff", "--no-edit", source]);
  } catch (error) {
    git(root, ["merge", "--abort"], { quiet: true, allowFailure: true });
    git(root, ["switch", source], { quiet: true, allowFailure: true });
    throw new Error(`Commit was created on ${source}, but merge into ${base} failed. The branch was preserved. ${error.message}`);
  }
  git(root, ["branch", "-d", source]);
}

try {
  const { message, base: requestedBase } = parseArgs(process.argv.slice(2));
  const root = git(SCRIPT_DIR, ["rev-parse", "--show-toplevel"], { quiet: true });
  const { source, base } = resolveTarget(root, requestedBase);
  integrate(root, source, base, message);
  process.stdout.write(`Integrated ${source} into ${base} and deleted ${source}.\n`);
} catch (error) {
  process.stderr.write(`${error.message}\n`);
  process.exitCode = 1;
}
