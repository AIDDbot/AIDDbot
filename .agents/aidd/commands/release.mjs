import { parseArgs, RuleError, UsageError } from "../lib/cli.mjs";
import { currentBranch, defaultBranch, git, isClean, mergeInto, SPEC_BRANCH } from "../lib/git.mjs";
import { readControl, transition, writeControl } from "../lib/control.mjs";
import { noteQuietly } from "../lib/journal.mjs";
import { findRoot } from "../lib/root.mjs";
import { resolveSpecDir } from "../lib/spec.mjs";
import { writeIndex } from "../lib/spec-index.mjs";

const SEMVER = /^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?(?:\+[0-9A-Za-z.-]+)?$/;

/** The tag name for `version`, following the prefix existing tags use; null when the repository has no tags. */
function tagFor(root, version) {
  const tags = git(root, ["tag", "--list"], { quiet: true }).split(/\r?\n/).filter(Boolean);
  if (!tags.length) return null;
  const prefixes = new Set(tags.filter((tag) => /^v?\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/.test(tag)).map((tag) => tag.startsWith("v") ? "v" : ""));
  if (prefixes.size > 1) throw new RuleError("Existing semantic-version tags use mixed prefixes; normalize them before release.");
  return `${prefixes.values().next().value ?? "v"}${version}`;
}

/**
 * Mark the spec shipped, regenerate the spec index, commit the prepared release on the spec
 * branch, merge it into the default branch, tag it, and delete the branch.
 */
export default function release(argv) {
  const { version, base: requested } = parseArgs(argv, { positional: ["version"], flags: { base: "string" } });
  if (!SEMVER.test(version)) throw new UsageError(`Invalid semantic version: ${version}`);
  const root = findRoot();
  const source = currentBranch(root);
  const spec = SPEC_BRANCH.exec(source)?.[1];
  if (!spec) throw new RuleError(`Current branch is not a spec branch: ${source || "(detached HEAD)"}`);
  const base = defaultBranch(root, requested ?? null);
  if (source === base) throw new RuleError("The spec branch cannot be the default branch.");
  if (isClean(root)) throw new RuleError("There are no release changes to commit.");
  const tag = tagFor(root, version);
  if (tag && git(root, ["rev-parse", "--verify", `refs/tags/${tag}`], { quiet: true, allowFailure: true })) throw new RuleError(`Release tag already exists: ${tag}`);
  const { dir } = resolveSpecDir(root, spec);
  const control = transition(readControl(dir), "shipped");
  control.blocked = null;
  control.shipped = { version, at: new Date().toISOString() };
  writeControl(dir, control);
  writeIndex(root);
  git(root, ["add", "-A"]);
  git(root, ["commit", "-m", `chore(release): ${version}`]);
  mergeInto(root, source, base, "Release commit");
  if (tag) git(root, ["tag", "-a", tag, "-m", `Release ${version}`]);
  git(root, ["branch", "-d", source]);
  noteQuietly(root, { event: "shipped", spec, summary: `${version}${tag ? ` · tag ${tag}` : ""}` });
  noteQuietly(root, { event: "integrated", spec, summary: `${source} -> ${base}` });
  return { spec, version, base, tag, deleted: source };
}
