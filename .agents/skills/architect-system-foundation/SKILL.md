---
name: architect-system-foundation
description: Set up the foundation architecture for the system.
metadata:
  aiddbot-kind: orchestrator
user-invocable: true
---
# architect-system-foundation

Your goal is to set up the foundation architecture for the system. When no code exists, propose it, scaffold it, and deliver it green. When code exists, document it. You can run this skill again at any time to align the documentation with the code.

```text
verdict
├── greenfield
│   ├── propose    approved system.md
│   ├── scaffold   each project, then outline-system and integrate
│   └── deliver    foundation specs, then green check
└── brownfield
    └── outline-system, rule-project, integrate
```

## Roles

- Route as the **Architect**. Spawn one **Architect** for the full run, or use the one that a calling orchestrator gives you. Continue it with messages. Relay its questions to the human. Stop it only if you started it.
- Spawn the **Builder** at the first scaffold. Spawn one **Craftsman** for all the foundation specs. Use the same **Builder** for all of them.
- Each time you send work to an agent, journal `node .agents/aidd/aidd.mjs log handoff "<from> → <to>: <what>"`.
- You journal `verdict`, `approved`, `scaffolded`, and `blocked` yourself, never through the **Architect**.

## Verdict

Decide quickly, from working code only. Ignore agent configuration, AIDD product files, harness adapters, documentation, and ignored files. Code exists → brownfield. No code → greenfield. Journal it one time with `node .agents/aidd/aidd.mjs log verdict "<greenfield|brownfield>: <the code that settled it>"`.

## Greenfield

Do the three phases in sequence. Before each phase, read its reference. The paths are relative to this skill folder.

| Phase | Reference | Result |
| --- | --- | --- |
| Propose | `references/propose.md` | An approved `.product/system.md`, committed on `chore/foundation`. |
| Scaffold | `references/scaffold.md` | Each project scaffolded, shaped, and with its tooling registered; the system outlined and integrated. |
| Deliver | `references/deliver.md` | The foundation specs shipped, and the system green. |

Never scaffold when working code exists.

## Brownfield

- If a spec is `in-progress`, stop before you document, because its branch owns the pending changes. Journal `blocked`.
- Get the documentation from the code only. Never run lint, tests, acceptance, or quality. Never add debt, because `scan-quality` owns it.
- Create the `chore/document` branch from the default branch. There, the **Architect** executes `outline-system`, then `rule-project` for each project.
- When all documentation and project rules are complete, run `node .agents/aidd/aidd.mjs integrate "docs(system): document foundation"` from `chore/document`. It commits the remaining changes, merges the branch into the default branch, and deletes the branch after a successful merge.

The result is a scaffolded system that ships its foundation specs green, a documented brownfield system, or the reason why this was not possible.
