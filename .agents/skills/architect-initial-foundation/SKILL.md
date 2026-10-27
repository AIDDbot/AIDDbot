---
name: architect-initial-foundation
description: Set up the foundation architecture for the system.
metadata:
  aiddbot-kind: orchestrator
user-invocable: true
---
# architect-initial-foundation

Your goal is to set up the foundation architecture for the system. When no code exists, propose it from an archetype of the catalog, found it, and close it green. When code exists, document it. You can run this skill again at any time to align the documentation with the code.

## Roles

- Route as the **Architect**. Spawn one **Architect** for the full run, or use the one that a calling orchestrator gives you. Continue it with messages. Relay its questions to the human. Stop it only if you started it.
- Spawn the **Architect** with a fresh context: never fork or copy your conversation into it. The handoff gives the task and each human decision that no file holds yet. Never read the skill of a step that you hand off. When the run ends, also after a failure, stop the **Architect** if you started it.
- Wait for an agent with the longest timeout that the tool allows: each wait that ends early costs one more turn.
- Each time you send work to an agent, journal `node .agents/aidd/aidd.mjs log handoff "<from> → <to>: <what>"`.
- You journal `verdict` and `blocked` yourself, never through the **Architect**.

## Verdict

Decide quickly, from working code only. Ignore agent configuration, AIDD product files, harness adapters, documentation, and ignored files. Code exists → brownfield. No code → greenfield. Journal it one time with `node .agents/aidd/aidd.mjs log verdict "<greenfield|brownfield>: <the code that settled it>"`.

## Greenfield

An archetype is a library: its projects, technology, foundation specs, code, tests and schema documents come with it, and its own gate proved them. Take it as it is. Never build, change, document, or check again what it ships. When no archetype fits, stop: never make one.

| Step | Who | What |
| --- | --- | --- |
| Propose | **Architect** | Read `references/propose.md`. The result is an approved `.product/system.md`, committed on `chore/foundation`. |
| Found | you | Run `node .agents/aidd/aidd.mjs found <archetype>` from `chore/foundation`. The core copies the archetype at its pinned tag, sets the identity of the system, registers the projects, installs, and commits. |
| Close | you | For each project that is not `e2e`, run `node .agents/aidd/aidd.mjs run test --project <project>`. The acceptance suite runs first with the first business spec. |
| Outline | **Architect** | Execute `outline-system`, only for the root `AGENTS.md`: the archetype gives each project `AGENTS.md` and the schema documents. |
| Integrate | you | Run `node .agents/aidd/aidd.mjs integrate "chore(foundation): found {system}"` from `chore/foundation`. |

When `found` or the close fails, it is a defect of the environment or of the archetype:

1. Journal `blocked`.
2. Return the failure.
3. Never repair it in the system, and never start a business spec, also when the human asked for features.

The result of the greenfield ends with the summary of `node .agents/aidd/aidd.mjs debt list`.

## Brownfield

- If a spec is `in-progress`, stop before you document, because its branch owns the pending changes. Journal `blocked`.
- Get the documentation from the code only. Never run lint, tests, acceptance, or quality. Never add debt, because `scan-quality` owns it.
- Create the `chore/document` branch from the default branch. There, the **Architect** executes `outline-system`, then `rule-project` for each project.
- When all documentation and project rules are complete, run `node .agents/aidd/aidd.mjs integrate "docs(system): document foundation"` from `chore/document`. It commits the remaining changes, merges the branch into the default branch, and deletes the branch after a successful merge.

The result is one of three outcomes. It is a system founded from an archetype that closes green, or a documented brownfield system. Otherwise, it is the reason why neither was possible.
