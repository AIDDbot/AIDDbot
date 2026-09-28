---
name: architect-system-foundation
description: Set up the foundation architecture for the system.
metadata:
  aiddbot-kind: orchestrator
user-invocable: true
---
# architect-system-foundation

Your goal is to set up the foundation architecture for the system: propose it when no code exists, then document it once it is scaffolded. Rerun it at any time to bring the documentation back in line with the code.

Route as the **Architect**. Spawn one **Architect** once for the whole run and continue it with messages; spawn a replacement only when the harness cannot continue it or its context runs out. Use the agent a calling orchestrator hands you instead of spawning your own. Sub-agents never ask the human: relay their questions and proposals yourself. Before returning, stop the agents and processes you started, never your caller's.

Decide whether the system is greenfield or brownfield from working code alone, ignoring agent configuration, AIDD product files, harness adapters, documentation, and ignored files. Journal it with `node .agents/aidd/aidd.mjs log verdict "<greenfield|brownfield>: <the code that settled it>"`, because the verdict decides whether this run proposes or documents.

For a greenfield system, have the **Architect** propose it in `.product/system.md` from [`system.template.md`](./assets/system.template.md) and stop there: AIDDbot never scaffolds. Ask in short stages, one closed question at a time, and take whatever the request, `README.md`, or an existing proposal already answers: first the purpose, users, and needs; then the projects and technology. Offer projects from the live catalog of `npx create-aiddbot --list`, taking each archetype's description as its stack; propose something else only when no archetype fits a concrete need or the human asks for it, and without network name only the tiers. Get the human's approval unless in YOLO mode, then commit it as `docs(system): propose {system}` and return the proposal's scaffold command for the human to run in a clean working tree. When a committed proposal already exists and no code does, return its command again, changing the proposal only when the human asks.

For a brownfield system, have the **Architect** execute `outline-system` and then `rule-project` for every project on a `chore/document` branch created from the default branch. After all documentation and project rules are complete, run `node .agents/aidd/aidd.mjs git integrate "docs(system): document foundation"` from `chore/document` to commit remaining changes, merge the branch into the default branch, and delete it after a successful merge. If any spec is `in-progress`, stop before documenting, because its branch owns the pending changes, and journal `node .agents/aidd/aidd.mjs log blocked "<reason>"`.

The result is an approved system proposal with its scaffold command, or a documented system.
