---
name: build-requested-spec
description: Turn a natural-language request into a shipped spec.
metadata:
  aiddbot-kind: orchestrator
user-invocable: true
---
# build-requested-spec

Your goal is to turn a natural-language request into a shipped spec.

```text
1. Architect   define-spec            human approval
2. Builder     implement-project      each project, then e2e
3. Craftsman   verify-behavior        red: repair loop
               review-implementation  findings ship as debt
               ship-spec
```

## Roles

- Route as the **Architect**. Spawn one **Architect**, one **Builder**, and one **Craftsman** for the full run, or use the ones that a calling orchestrator gives you. Continue each one with messages. Relay their questions to the human. Stop only the agents that you started.
- Run this flow yourself. Never give all of it to one agent, because an agent that you spawn cannot spawn other agents.
- Journal `node .agents/aidd/aidd.mjs log handoff "<from> → <to>: <what>"` before each of the three steps and before each repair that you send to the **Builder**. Add `--spec <id>` when the spec exists. Thus the journal times the turn of each agent.

## 1. Define

The **Architect** executes `define-spec` with the request. Relay its proposal to the human. Nothing is built before approval.

## 2. Implement

The **Builder** executes `implement-project`:

- For each affected production project, from lower to higher levels of abstraction.
- Then for the E2E project, when the spec has requirements. Do this also when its Solution lists no E2E work, because each requirement needs its tagged acceptance test.

## 3. Verify, qualify, and ship

The **Craftsman** executes `verify-behavior`. When verification is green, it executes `review-implementation` (the qualification), then `ship-spec`.

| Event | Action |
| --- | --- |
| Verification is red | Send its finding-only report to the **Builder** for repair. Then verify again. |
| The **Builder** cannot reproduce a failure and changes nothing | The **Builder** records the failure and its evidence with `node .agents/aidd/aidd.mjs debt add` before verification starts again. Thus a green retry never hides it. |
| A test tagged with a different spec fails | It is a regression. The **Builder** repairs the production code. |
| A requirement of this spec contradicts that test | Only then is the old requirement obsolete. Unless in YOLO mode, relay this product change to the human first. Then the **Architect** adds `Replaces: {global ID}` to the Problem of the spec, and the **Builder** updates that test. |
| Verification is still red at its third revision | Do not repair again. Continue the delivery: qualify if not done yet, and ship with each unresolved failure and finding recorded as debt. |
| Qualification has findings | Never send them back for repair. They ship as debt. |
| The Security gate fails | Send that report to the **Builder** one time for repair. Then verification and qualification run again. Findings of the second qualification ship as debt. |
| Verification asks a product question | Stop. Relay the question to the human. When it is answered, the **Architect** writes the answer into the spec as a requirement. Then continue from the repair of the **Builder** and verification. |
| Acceptance cannot run at all | Stop the delivery. |

Only a product question or acceptance that cannot run stops the delivery. A failing or missing test is a failure that counts toward the third revision. It is never missing evidence.

The result is one shipped spec, or the reason why it could not ship.
