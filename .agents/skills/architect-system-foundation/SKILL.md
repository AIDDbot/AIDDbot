---
name: architect-system-foundation
description: Set up the foundation architecture for the system.
metadata:
  aiddbot-kind: orchestrator
user-invocable: true
---
# architect-system-foundation

Your goal is to set up the foundation architecture for the system: scaffold it when no code exists, then document it. Rerun it at any time to bring the documentation back in line with the code.

Route as the **Architect**. Spawn one **Architect**, plus one **Builder** when a scaffold is needed, once for the whole run, and continue each with messages; spawn a replacement only when the harness cannot continue an agent or its context runs out. Use the agents a calling orchestrator hands you instead of spawning your own. Sub-agents never ask the human: relay their questions and proposals yourself. Before returning, stop the agents and processes you started, never your caller's.

Decide whether the system is greenfield or brownfield from working code alone, ignoring agent configuration, AIDD product files, harness adapters, documentation, and ignored files. Journal it with `node .agents/aidd/aidd.mjs log verdict "<greenfield|brownfield>: <the code that settled it>"`, because a brownfield verdict skips the scaffold and the journal is the only place that decision survives.

For a greenfield system, have the **Builder** execute the `scaffold-system` skill first; it integrates `chore/scaffold` into the default branch when the scaffold is complete. Then, in every case, have the **Architect** execute `outline-system` and then `rule-project` for every project on a `chore/document` branch created from the default branch. After all documentation and project rules are complete, run `node .agents/aidd/aidd.mjs git integrate "docs(system): document foundation"` from `chore/document` to commit remaining changes, merge the branch into the default branch, and delete it after a successful merge. If any spec is `in-progress`, stop before documenting, because its branch owns the pending changes, and journal `node .agents/aidd/aidd.mjs log blocked "<reason>"`.

The result is a documented system, scaffolded first when it had no code.
