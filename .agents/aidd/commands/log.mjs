import { parseArgs, UsageError } from "../lib/cli.mjs";
import { specFromBranch } from "../lib/git.mjs";
import { MODEL_EVENTS, note } from "../lib/journal.mjs";
import { findRoot } from "../lib/root.mjs";

/** Journal one judgment of the model; the core journals every state change on its own (D5). */
export default function log(argv) {
  const args = parseArgs(argv, { positional: ["event", "summary"], flags: { spec: "string", project: "string" } });
  const event = args.event.trim().toLowerCase();
  if (!Object.hasOwn(MODEL_EVENTS, event)) throw new UsageError(`Unknown event: ${args.event}; valid values: ${Object.keys(MODEL_EVENTS).filter((name) => name !== "init").join(", ")}`);
  if (!args.summary.trim()) throw new UsageError("Missing or empty <summary>");
  const root = findRoot();
  const line = note(root, {
    actor: event === "init" ? "aidd" : "model",
    event,
    status: MODEL_EVENTS[event],
    spec: args.spec ?? specFromBranch(root),
    project: args.project,
    summary: args.summary,
  });
  return { line };
}
