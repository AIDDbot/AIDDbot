import { parseArgs, RuleError } from "../lib/cli.mjs";
import { currentBranch, defaultBranch, git, isClean, mergeInto } from "../lib/git.mjs";
import { noteQuietly } from "../lib/journal.mjs";
import { findRoot } from "../lib/root.mjs";

/** Commit remaining task changes, merge the current task branch into the default branch, and delete it. */
export default function integrate(argv) {
  const { message, base: requested } = parseArgs(argv, { positional: ["message"], flags: { base: "string" } });
  const root = findRoot();
  const source = currentBranch(root);
  if (!source || source === requested) throw new RuleError("Run this command from a named task branch, not the default branch or detached HEAD.");
  const base = defaultBranch(root, requested ?? null);
  if (source === base) throw new RuleError("The task branch cannot be the default branch.");
  const committed = !isClean(root);
  if (committed) {
    git(root, ["add", "-A"]);
    git(root, ["commit", "-m", message]);
  }
  if (git(root, ["rev-parse", "--verify", `refs/heads/${base}`], { quiet: true }) === git(root, ["rev-parse", "--verify", `refs/heads/${source}`], { quiet: true })) {
    throw new RuleError("There are no task commits to integrate.");
  }
  mergeInto(root, source, base, "Commit");
  git(root, ["branch", "-d", source]);
  noteQuietly(root, { event: "integrated", summary: `${source} -> ${base} · ${message}` });
  return { source, base, committed, deleted: source };
}
