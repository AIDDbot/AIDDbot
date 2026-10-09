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

- Route as the **Architect**. Use the **Architect**, the **Builder**, and the **Craftsman** that a calling orchestrator gives you. Otherwise, spawn each one when its first step starts, with a fresh context: never fork or copy your conversation into it. The handoff gives the task, the spec ID, and each human decision that no file holds yet.
- Continue an agent with messages only in this run, and only where the harness permits it. Otherwise, spawn a new one for the next step: the files hold all that it needs. Relay their questions to the human. When the run ends, also after a failure, stop each agent that you started.
- Run this flow yourself. Never give all of it to one agent, because an agent that you spawn cannot spawn other agents. Never read the skill of a step that you hand off: the agent that executes it loads it.
- Wait for an agent with the longest timeout that the tool allows: each wait that ends early costs one more turn.
- Journal `node .agents/aidd/aidd.mjs log handoff "<from> → <to>: <what>"` before each of the three steps and before each repair that you send to the **Builder**. Add `--spec <id>` when the spec exists. Thus the journal times the turn of each agent.

## 1. Define

Start no spec on a greenfield system whose foundation close is red and not repaired: return that failure to the human, also when the human asked for features.

The **Architect** executes `define-spec` with the request. Relay its proposal to the human. Nothing is built before approval.

The human answers you, not the **Architect**. When the human approves the spec, journal `node .agents/aidd/aidd.mjs log approved "<title>" --spec <id>` yourself, before the **Builder** starts. In YOLO mode, or when a calling orchestrator approved the request in advance, ask nothing and journal it as soon as the spec is written. That command commits the spec. Until then, the core refuses each other commit, evaluation, and release of the spec.

## 2. Implement

The **Builder** executes `implement-project`:

- For each affected production project, from lower to higher levels of abstraction.
- Then for the E2E project, when the spec has requirements. Do this also when its Solution lists no E2E work, because each requirement needs its tagged acceptance test.

## 3. Verify, qualify, and ship

The **Craftsman** executes `verify-behavior`. When verification is green, it executes `review-implementation` (the qualification), then `ship-spec`.

Within a spec, only `ship-spec` changes `{Product_Folder}/model/`: never send schema work to another agent, and never run `outline-system`, because the review reads the schema documents as they were before the spec.

| Event | Action |
| --- | --- |
| Verification is red | Send its finding-only report to the **Builder** for repair. Then verify again. |
| The **Builder** cannot reproduce a failure and changes nothing | The **Builder** records the failure and its evidence with `node .agents/aidd/aidd.mjs debt add` before verification starts again. Thus a green retry never hides it. |
| A test tagged with a different spec fails | It is a regression. The **Builder** repairs the production code. |
| A requirement of this spec contradicts that test | Only then is the old requirement obsolete. Unless in YOLO mode, relay this product change to the human first. Then the **Architect** adds `Replaces: {global ID}` to the Problem of the spec, and the **Builder** updates that test and tags it with the requirement of this spec that replaces the old one. |
| Verification is still red at its third revision | Do not repair again. Continue the delivery: qualify if not done yet, and ship with each unresolved failure and finding recorded as debt. |
| Qualification has findings | Never send them back for repair. They ship as debt. |
| The Security gate fails | Send that report to the **Builder** one time for repair. Then verification and qualification run again. Findings of the second qualification ship as debt. |
| Verification asks a product question | Stop. Relay the question to the human. When it is answered, the **Architect** writes the answer into the spec as a requirement. Then continue from the repair of the **Builder** and verification. |
| Acceptance cannot run at all | Stop the delivery. |

Only a product question or acceptance that cannot run stops the delivery. A failing or missing test is a failure that counts toward the third revision. It is never missing evidence.

The result is one shipped spec, or the reason why it could not ship.
