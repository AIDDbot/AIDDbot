#!/usr/bin/env node
// Commit a prepared spec release, merge it to the default branch, tag it, and remove its branch.
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));

function fail(message) {
  process.stderr.write(`${message}\nUsage: node git-release.mjs <version> [--base <branch>]\n`);
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
  if (!argv.length) fail("Missing release version.");
  const version = argv[0];
  if (!/^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?(?:\+[0-9A-Za-z.-]+)?$/.test(version)) fail(`Invalid semantic version: ${version}`);
  let base = null;
  for (let index = 1; index < argv.length; index += 1) {
    if (argv[index] !== "--base" || !argv[index + 1] || base) fail(`Unexpected argument: ${argv[index]}`);
    base = argv[++index];
  }
  return { version, base };
}

function tagForRelease(root, version) {
  const tags = git(root, ["tag", "--list"], { quiet: true }).split(/\r?\n/).filter(Boolean);
  if (tags.length === 0) return null;
  const versionTags = tags.filter((tag) => /^v?\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/.test(tag));
  const prefixes = new Set(versionTags.map((tag) => tag.startsWith("v") ? "v" : ""));
  if (prefixes.size > 1) throw new Error("Existing semantic-version tags use mixed prefixes; normalize them before release.");
  return `${prefixes.values().next().value ?? "v"}${version}`;
}

function resolveTarget(root, requestedBase) {
  const source = git(root, ["branch", "--show-current"], { quiet: true });
  const specMatch = /^(?:feat|fix|refactor|chore)\/(S\d{4})-.+$/.exec(source);
  if (!specMatch) fail(`Current branch is not a spec branch: ${source || "(detached HEAD)"}`);
  const branches = git(root, ["branch", "--format=%(refname:short)"], { quiet: true }).split(/\r?\n/);
  const remote = git(root, ["symbolic-ref", "--quiet", "--short", "refs/remotes/origin/HEAD"], { quiet: true, allowFailure: true });
  const inferred = remote?.startsWith("origin/") ? remote.slice(7) : branches.includes("main") ? "main" : branches.includes("master") ? "master" : null;
  const base = requestedBase ?? inferred;
  if (!base || !branches.includes(base)) fail(`Could not resolve a local default branch${requestedBase ? ` named ${requestedBase}` : ""}; pass --base <branch>.`);
  if (source === base) fail("The spec branch cannot be the default branch.");
  return { source, base, specId: specMatch[1] };
}

function checkReleaseState(root, source, version) {
  if (!git(root, ["status", "--porcelain"], { quiet: true })) fail("There are no release changes to commit.");
  const tag = tagForRelease(root, version);
  if (tag && git(root, ["rev-parse", "--verify", `refs/tags/${tag}`], { quiet: true, allowFailure: true })) fail(`Release tag already exists: ${tag}`);
  return tag;
}

function commitAndMerge(root, source, base, version) {
  git(root, ["add", "-A"]);
  git(root, ["commit", "-m", `chore(release): ${version}`]);
  git(root, ["switch", base]);
  try { git(root, ["merge", "--no-ff", "--no-edit", source]); }
  catch (error) {
    git(root, ["merge", "--abort"], { quiet: true, allowFailure: true });
    git(root, ["switch", source], { quiet: true, allowFailure: true });
    throw new Error(`Release commit was created on ${source}, but merge into ${base} failed. The branch was preserved. ${error.message}`);
  }
}

function main(argv) {
  const { version, base: requestedBase } = parseArgs(argv);
  const root = git(SCRIPT_DIR, ["rev-parse", "--show-toplevel"], { quiet: true });
  const { source, base, specId } = resolveTarget(root, requestedBase);
  const tag = checkReleaseState(root, source, version);
  commitAndMerge(root, source, base, version);
  if (tag) git(root, ["tag", "-a", tag, "-m", `Release ${version}`]);
  git(root, ["branch", "-d", source]);
  process.stdout.write(`Released ${specId} ${version} into ${base}${tag ? ` as ${tag}` : ""}; deleted ${source}.\n`);
}

try {
  main(process.argv.slice(2));
} catch (error) {
  process.stderr.write(`${error.message}\n`);
  process.exitCode = 1;
}
