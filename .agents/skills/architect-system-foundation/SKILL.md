---
name: architect-system-foundation
description: Set up the foundation architecture for the system.
metadata:
  aiddbot-kind: orchestrator
user-invocable: true
---
# architect-system-foundation

Your goal is to set up the foundation architecture for the system: scaffold it when no code exists, then document it. Rerun it at any time to bring the documentation back in line with the code.

Route as the **Architect** and delegate as the `## Delegation` section of `AGENTS.md` describes, with a `medium`-effort **Builder** and a `medium`-effort **Architect**. Journal `start` before reading the repository, and `done` before returning, with a status matching the outcome.

Decide whether the system is greenfield or brownfield from working code alone, ignoring agent configuration, AIDD product files, harness adapters, documentation, and ignored files. Journal the decision as `verdict`, naming the code that settled it, because a brownfield verdict skips the scaffold and the journal is the only place that decision survives.

For a greenfield system, have the **Builder** execute the `scaffold-system` skill first. Then, in every case, have the **Architect** execute `document-system` and then `document-project` for every project, on a `chore/document` branch from the default branch that is merged back and deleted when done. If any spec is `in-progress`, stop before documenting, because its branch owns the pending changes, and journal `blocked`, red.

The result is a documented system, scaffolded first when it had no code.
