---
name: architect-system-foundation
description: Set up the foundation architecture for the system.
metadata:
  aiddbot-kind: orchestrator
user-invocable: true
---
# architect-system-foundation

Your goal is to set up the foundation architecture for the system: propose, scaffold, and deliver it green when no code exists, or document it when code does. Rerun it at any time to bring the documentation back in line with the code.

Route as the **Architect**: spawn one **Architect** for the whole run, or use the one a calling orchestrator hands you; continue it with messages, relay its questions to the human, and stop it only if you started it.

Decide whether the system is greenfield or brownfield quickly, from working code alone, ignoring agent configuration, AIDD product files, harness adapters, documentation, and ignored files. Journal the verdict and the approval yourself, once each, never through the **Architect**. Journal the verdict with `node .agents/aidd/aidd.mjs log verdict "<greenfield|brownfield>: <the code that settled it>"`, because the verdict decides the path.

## Greenfield

Have the **Architect** propose the system in `.product/system.md` from [`system.template.md`](./assets/system.template.md) as a solution of typed projects, each `back-api`, `front-web`, `cli`, or `e2e`. Ask in short stages, one closed question at a time, and take whatever the request, `README.md`, or an existing proposal already answers: first the purpose, users, and needs; then the projects; then, for each project, an archetype of its type from [`archetypes.md`](./assets/archetypes.md), taken as written. When the human refuses every archetype of a type, make one on demand: fill [`project.AGENTS.template.md`](./assets/project.AGENTS.template.md) for the technology the human chooses, guided by [`ecosystems.md`](./assets/ecosystems.md), as part of the proposal and before any scaffold. Interactively, never assume a technology: before settling an archetype or a technology, ask about each choice still open (language and runtime, framework, package manager, persistence, and the tool of each tooling slot), offering the catalog archetype or the usual option of `ecosystems.md` first. In YOLO mode, never ask: take the request's choices and the usual option for the rest, and when a chosen tool fails to install or run, fall back to the usual option of its ecosystem and record that change in `.product/system.md` and the project's `AGENTS.md`. Get the human's approval unless in YOLO mode, journal it with `node .agents/aidd/aidd.mjs log approved "system proposal"`, and commit it with `node .agents/aidd/aidd.mjs commit "docs(system): propose {system}"`.

Then, from the repository root in a clean working tree, have the **Architect** run the proposal's scaffold commands on a `chore/foundation` branch created from the default branch, and leave each project in the Blueprint shape before committing it with `node .agents/aidd/aidd.mjs commit "chore(scaffold): add {project}" {folder}`:

- `{source_root}/AGENTS.md` is the archetype's `AGENTS.md` (or the one made on demand) with the system data filled in: purpose and boundary, connections, ports, and variables. It keeps the template's structure, and a `CLAUDE.md` next to it contains only `@AGENTS.md`, for harnesses that do not read `AGENTS.md`.
- A third-party template (`npm create`, `cargo new`) is reorganized into the architecture of that `AGENTS.md`: `main`, `core`, features with their manifest, and `shared`.
- Every archetype sample that cannot work end to end in this system is removed, because removing it now destroys nothing.
- Its dependencies are current: run its `upgrade` command once, because models remember old releases.
- Every tooling slot of that `AGENTS.md` works. When a mandatory slot (`lint`, `unit`, and `start` for runnable projects) is missing, install the usual tool of the stack and record it in that `AGENTS.md` first. Register every slot with `node .agents/aidd/aidd.mjs config set projects.{project} '{"path":"{source_root}","commands":{...}}'`, with `{"na":"<reason>"}` for each slot that does not apply.

Journal `node .agents/aidd/aidd.mjs log scaffolded "<the scaffolded projects>"`. Never run `rule-project` in greenfield. Have the **Architect** execute `outline-system`, then run `node .agents/aidd/aidd.mjs integrate "chore(foundation): scaffold {system}"` from `chore/foundation`. If a scaffold command fails, stop, journal `node .agents/aidd/aidd.mjs log blocked "<reason>"`, commit nothing partial, and return the failure. Never scaffold when working code already exists; when a committed proposal already exists and no code does, run its commands, changing the proposal only when the human asks.

Then deliver the foundation specs in this order, one at a time, by executing `build-requested-spec` with the request "Deliver the foundation spec `{spec}` from `.agents/skills/architect-system-foundation/assets/foundation/{spec}.spec.md`", handing it this **Architect** and one **Builder** and one **Craftsman** you spawn for all four:

1. [`configuration`](./assets/foundation/configuration.spec.md)
2. [`monitoring`](./assets/foundation/monitoring.spec.md)
3. [`health`](./assets/foundation/health.spec.md)
4. [`basic-auth`](./assets/foundation/basic-auth.spec.md), only when the system has users according to its proposal or model; ask the human only when that is unclear.

The foundation closes only green: after the last spec ships, run `node .agents/aidd/aidd.mjs run lint`, `run unit`, and `run acceptance`; when any fails, journal it as `blocked` and return it.

## Brownfield

Documentation comes from reading the code: never run lint, tests, acceptance, or quality, and never add debt, because `scan-quality` owns that. Have the **Architect** execute `outline-system` and then `rule-project` for every project on a `chore/document` branch created from the default branch. After all documentation and project rules are complete, run `node .agents/aidd/aidd.mjs integrate "docs(system): document foundation"` from `chore/document` to commit remaining changes, merge the branch into the default branch, and delete it after a successful merge. If any spec is `in-progress`, stop before documenting, because its branch owns the pending changes, and journal `node .agents/aidd/aidd.mjs log blocked "<reason>"`.

The result is a scaffolded system that ships its foundation specs green, a documented brownfield system, or the reason it could not be.
