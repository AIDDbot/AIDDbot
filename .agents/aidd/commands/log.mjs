import { parseArgs, UsageError } from "../lib/cli.mjs";
import { specFromBranch } from "../lib/git.mjs";
import { AGENT_LABELS, appendEvent, clean, detectHarness } from "../lib/journal.mjs";
import { findRoot } from "../lib/root.mjs";

const FLAGS = { agent: "string", spec: "string", project: "string", revision: "string", harness: "string", model: "string", role: "string" };

export default function log(argv) {
  const args = parseArgs(argv, { positional: ["skill", "event", "status", "summary"], flags: FLAGS });
  const event = clean("<event>", args.event, true);
  let summary = clean("<summary>", args.summary, true);
  if (event.toLowerCase() === "spawn") {
    // Each role's model is fixed in its harness agent definition (npm run adapt), so only the role varies.
    const role = clean("--role", args.role, true);
    if (!AGENT_LABELS[role] || role === "Direct") throw new UsageError(`Invalid --role: ${role}\nValid values: Architect, Builder, Craftsman`);
    summary = `${role} · ${summary}`;
  }
  const root = findRoot();
  const line = appendEvent(root, {
    skill: args.skill,
    event,
    status: args.status.trim().toLowerCase(),
    summary,
    agent: args.agent !== undefined ? clean("--agent", args.agent, true) : "Direct",
    spec: args.spec !== undefined ? clean("--spec", args.spec) : specFromBranch(root) ?? "-",
    project: clean("--project", args.project),
    revision: clean("--revision", args.revision),
    harness: args.harness !== undefined ? clean("--harness", args.harness) : detectHarness(),
    model: clean("--model", args.model),
  });
  return { line };
}
