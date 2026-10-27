---
name: build-requested-spec
description: Turn a natural-language request, a draft, or a spec made from a debt item, into a shipped spec.
metadata:
  aiddbot-kind: orchestrator
user-invocable: true
---
# build-requested-spec

Your goal is to turn a request into a shipped spec. The request is natural language, a draft of `architect-requested-spec`, or a spec that the core made from a debt item.

## Roles

- Route as the **Architect**. Use the **Architect**, **Builder**, and **Craftsman** from the caller. Otherwise, spawn each agent at its first step with a fresh context. Never copy or fork your conversation. Give each agent the task, the spec ID, and each human decision that the files do not contain.
- Continue agents with messages only in this run and where the harness permits it. Otherwise, spawn a new agent for the next step. Use the files for context. Relay their questions to the human. Stop each agent you started when the run ends, also after a failure.
- Run this flow yourself. Never give the full flow to one agent: an agent you spawn cannot spawn other agents. Never read a skill you hand off. Its agent loads it.
- Wait for an agent with the longest timeout that the tool allows: each wait that ends early costs one more turn.
- Journal `node .agents/aidd/aidd.mjs log handoff "<from> → <to>: <what>"` before each step and each repair you send to the **Builder**. Add `--spec <id>` when the spec exists.

## 1. Define

If a greenfield foundation close is still red, return that failure to the human. Start no spec, even for a feature request.

| Entry | Definition and approval |
| --- | --- |
| Request | The **Architect** executes `define-spec`. Relay its proposal to the human. Build nothing before approval. |
| Draft in `{Product_Folder}/drafts/` | Skip `define-spec`. From the default branch, run the command on its first line. Journal `log approved` at once: `architect-requested-spec` got approval. Delete the draft with `node .agents/aidd/aidd.mjs commit "docs(spec): use draft {slug}" {Product_Folder}/drafts/{slug}.md`. Never change its contents. |
| Spec made by the core from debt | Skip `define-spec`: the item defines it. The core approves it when it makes it: `fix` for high debt, `refactor` for medium debt. |
| Spec made by the core from a spec file | Skip `define-spec`: the file defines it. The caller that gives the file approved it. |

The human answers you, not the **Architect**. When the human approves the spec, journal `node .agents/aidd/aidd.mjs log approved "<title>" --spec <id>` yourself before the **Builder** starts. In YOLO mode, or when the caller approved the request in advance, ask nothing. Journal approval as soon as the spec is complete. The command commits the spec. Until approval, the core refuses other commits, evaluations, and release of the spec.

## 2. Implement

The **Builder** executes `implement-project`:

- For each affected production project, from lower to higher levels of abstraction. Run the affected unit tests, `layers`, and `crap`.
- Then for the E2E project if the spec has requirements or its Solution has E2E work. Each requirement needs a tagged acceptance test, even when the Solution lists no E2E work.
- For a `refactor`, repair only the debt item. Run the check that reported it before you return. Leave findings outside the item for the next scan.

## 3. Verify, qualify, and ship

The **Craftsman** executes these skills in order. Each step checks only its own work. `crap` runs all the unit tests.

| Skill | Spec types | Scope |
| --- | --- | --- |
| `verify-behavior` | `feat`, `fix` | Acceptance tests of the spec |
| `review-implementation` | `feat`, `fix`, `chore` | Read only. Review after verification is green, when the type needs no verification, or at the repair limit of `references/events.md`. |
| `ship-spec` | All types, also `refactor` | The full acceptance suite |

Only `ship-spec` changes `{Product_Folder}/model/` within a spec. Never send schema work to another agent or run `outline-system`. The review needs the schema documents from before the spec.

When a step is not green, read `references/events.md` and act on its row. A step is not green in these conditions: verification is red, the **Builder** cannot reproduce a failure, or qualification has findings. It is also not green when the regression has rows, when a step asks a product question, or when acceptance cannot run.

The result is one shipped spec, or the reason why it could not ship.
