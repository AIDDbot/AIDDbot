---
name: architect-system-foundation
description: Set up the foundation architecture for the system.
metadata:
  aiddbot-kind: orchestrator
user-invocable: true
---
# architect-system-foundation

Your goal is to set up the foundation architecture for the system: propose and scaffold it when no code exists, then document it. Rerun it at any time to bring the documentation back in line with the code.

Route as the **Architect**: spawn one **Architect** for the whole run, or use the one a calling orchestrator hands you; continue it with messages, relay its questions to the human, and stop it only if you started it.

Decide whether the system is greenfield or brownfield from working code alone, ignoring agent configuration, AIDD product files, harness adapters, documentation, and ignored files. Journal the verdict and the approval yourself, once each, never through the **Architect**. Journal the verdict with `node .agents/aidd/aidd.mjs log verdict "<greenfield|brownfield>: <the code that settled it>"`, because the verdict decides whether this run proposes or documents.

For a greenfield system, have the **Architect** propose it in `.product/system.md` from [`system.template.md`](./assets/system.template.md) and scaffold it once approved. Ask in short stages, one closed question at a time, and take whatever the request, `README.md`, or an existing proposal already answers: first the purpose, users, and needs; then the projects and technology. Offer projects from [`archetypes.md`](./assets/archetypes.md), taking each archetype's stack as written; propose something else only when no archetype fits a concrete need or the human asks for it. Get the human's approval unless in YOLO mode, journal it with `node .agents/aidd/aidd.mjs log approved "system proposal"`, and commit it with `node .agents/aidd/aidd.mjs commit "docs(system): propose {system}"`. Then run the proposal's scaffold commands yourself from the repository root in a clean working tree, journal `node .agents/aidd/aidd.mjs log scaffolded "<the scaffolded projects>"`, and continue into the brownfield path below in the same run. When a committed proposal already exists and no code does, run its commands, changing the proposal only when the human asks. If a scaffold command fails, stop, journal `node .agents/aidd/aidd.mjs log blocked "<reason>"`, commit nothing partial, and return the failure. Never scaffold when working code already exists.

For a brownfield system, documentation comes from reading the code: never run lint, tests, acceptance, or quality, and never add debt, because `scan-quality` owns that. Have the **Architect** execute `outline-system` and then `rule-project` for every project on a `chore/document` branch created from the default branch. After all documentation and project rules are complete, run `node .agents/aidd/aidd.mjs integrate "docs(system): document foundation"` from `chore/document` to commit remaining changes, merge the branch into the default branch, and delete it after a successful merge. If any spec is `in-progress`, stop before documenting, because its branch owns the pending changes, and journal `node .agents/aidd/aidd.mjs log blocked "<reason>"`.

The result is a scaffolded and documented system, or the reason it could not be.
