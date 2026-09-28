import fs from "node:fs";
import { parseArgs, RuleError } from "../lib/cli.mjs";
import { currentBranch, defaultBranch, git, mergeInto, SPEC_BRANCH } from "../lib/git.mjs";
import { readControl, transition, writeControl } from "../lib/control.mjs";
import { gate } from "../lib/gate.mjs";
import { noteQuietly } from "../lib/journal.mjs";
import { findRoot } from "../lib/root.mjs";
import { resolveSpecDir, specTitle } from "../lib/spec.mjs";
import { writeIndex } from "../lib/spec-index.mjs";
import { currentVersion, nextVersion, writeChangelog, writeVersions } from "../lib/version.mjs";

/** The tag name for `version`, following the prefix existing tags use, `v` by default. */
function tagFor(root, version) {
  const tags = git(root, ["tag", "--list"], { quiet: true }).split(/\r?\n/).filter(Boolean);
  const prefixes = new Set(tags.filter((tag) => /^v?\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/.test(tag)).map((tag) => tag.startsWith("v") ? "v" : ""));
  if (prefixes.size > 1) throw new RuleError("Existing semantic-version tags use mixed prefixes; normalize them before release.");
  return `${prefixes.values().next().value ?? "v"}${version}`;
}

/**
 * Apply the shipping gate, compute the next version from the spec type (D37), write it into the
 * version files (D38) and the changelog, mark the spec shipped, regenerate the spec index, commit
 * on the spec branch, merge into the default branch, tag, and delete the branch.
 */
export default function release(argv) {
  const { major, base: requested } = parseArgs(argv, { flags: { major: "boolean", base: "string" } });
  const root = findRoot();
  const source = currentBranch(root);
  const spec = SPEC_BRANCH.exec(source)?.[1];
  if (!spec) throw new RuleError(`Current branch is not a spec branch: ${source || "(detached HEAD)"}`);
  const base = defaultBranch(root, requested ?? null);
  if (source === base) throw new RuleError("The spec branch cannot be the default branch.");
  const { dir, file } = resolveSpecDir(root, spec);
  const current = readControl(dir);
  const verdict = gate(root, dir, current);
  if (!verdict.eligible) throw new RuleError(`${spec} cannot ship: ${verdict.blockers.join(" ")}`);
  const previous = currentVersion(root);
  const version = nextVersion(previous, current.type, Boolean(major));
  const tag = tagFor(root, version);
  if (git(root, ["rev-parse", "--verify", `refs/tags/${tag}`], { quiet: true, allowFailure: true })) throw new RuleError(`Release tag already exists: ${tag}`);
  const title = specTitle(fs.readFileSync(file, "utf8"), current.key);
  const files = writeVersions(root, version);
  writeChangelog(root, { version, type: current.type, title, id: current.id, key: current.key });
  const control = transition(current, "shipped");
  control.shipped = { version, at: new Date().toISOString() };
  writeControl(dir, control);
  writeIndex(root);
  git(root, ["add", "-A"]);
  git(root, ["commit", "-m", `chore(release): ${version}`]);
  mergeInto(root, source, base, "Release commit");
  git(root, ["tag", "-a", tag, "-m", `Release ${version}`]);
  git(root, ["branch", "-d", source]);
  noteQuietly(root, { event: "shipped", spec, summary: `${previous} -> ${version}, tag ${tag}` });
  noteQuietly(root, { event: "integrated", spec, summary: `${source} -> ${base}` });
  return { spec, previous, version, files, changelog: "CHANGELOG.md", base, tag, deleted: source };
}
