// `aidd agents check`: the form of each `AGENTS.md`. `aidd agents index`: the index of each `shared` folder. `aidd release` runs both.
import { RuleError, UsageError } from "../lib/core.mjs";
import { agentsProblems, writeSharedIndexes } from "../lib/agents.mjs";

export default function agents(root, [action]) {
  if (action === "check") {
    const problems = agentsProblems(root);
    if (problems.length) throw new RuleError(`AGENTS.md has ${problems.length} problem(s): ${problems.join("; ")}`);
    return { problems };
  }
  if (action === "index") return { written: writeSharedIndexes(root) };
  throw new UsageError("Give an action: aidd agents check | aidd agents index.");
}
