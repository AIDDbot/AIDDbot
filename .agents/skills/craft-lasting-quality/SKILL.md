---
name: craft-lasting-quality
description: Reduce existing quality debt.
metadata:
  aiddbot-kind: orchestrator
user-invocable: true
---
# craft-lasting-quality

Your goal is to reduce existing quality debt through evidence-backed specs.

```text
upgrade request ────────────────────────────────────┐
1. Craftsman   scan-quality          medium debt    │  only with no open medium debt
2. Architect   select                repair request │
3. you         build-requested-spec  shipped spec  ◄┘
   or Builder  quick repair          integrated       only a group of hardening items
   repeat 2–3 while debt remains, highest priority first, at most 5 specs
   Craftsman   scan-quality, harden  low debt          once, when no high or medium debt remains
```

## Roles

- Route as the **Craftsman**. Use the **Craftsman** and the **Architect** that a calling orchestrator gives you. Otherwise, spawn each one for one repair, when its first step starts, with a fresh context: never fork or copy your conversation into it. Thus no repair inherits the context of the one before. Relay their questions to the human. When a repair ends, also after a failure, stop each agent that you started for it.
- Run this flow yourself. Never give all of it to one agent, because an agent that you spawn cannot spawn other agents. A single **Craftsman** would then scan, specify, code, and ship alone. Never read the skill of a step that you hand off.
- Wait for an agent with the longest timeout that the tool allows: each wait that ends early costs one more turn.
- Journal `node .agents/aidd/aidd.mjs log handoff "<from> → <to>: <what>"` before each scan, before the selection, and before the handover to `build-requested-spec`.

## Upgrade request

When the human asks to upgrade dependencies, skip the scan and the selection. The request is a `chore` that upgrades the named projects, or all projects, and repairs all that the upgrade breaks. Go to step 3, and stop after that one spec.

## 1. Scan

Read `node .agents/aidd/aidd.mjs debt list`. When an open item is `medium`, skip the scan: it would only find that debt again. Otherwise, the **Craftsman** executes `scan-quality` one time. It records only `medium` debt; the review of each spec records the `high` and `low` debt.

At most one scan runs in this run, at its start, so that its findings get their repair in this run. Never scan between two repairs, and never at the end: the review of each repair records the debt that it leaves, and the next run scans the rest. Hardening is the only exception.

## Harden

Hardening is the final polish, such as the warnings of the linter: never spend a repair on it while better work remains. When no `high` or `medium` item remains, the **Craftsman** executes `scan-quality` one time in this run, and you ask it to harden. It records `low` debt, one item for each rule. The selection then repairs it with the other `low` debt.

## 2. Select

The **Architect** reads `node .agents/aidd/aidd.mjs debt list` and selects one group: each eligible item of one type, in all projects. The `fix` group holds each item that breaks behavior, and the `refactor` group holds all others. It selects first the group that holds the item of the highest priority. Each spec costs a full delivery, so never divide a group into more specs. It writes the group as a natural-language repair request:

- With the D IDs and their evidence. Before it selects an item, it checks in the current code that the item still exists, because an earlier repair of this run can remove it. It never selects an item that no longer exists.
- Marked with the type of the group.
- The **Architect** edits no code and no documentation.
- The evidence limits the repair. A quality finding that a later check shows stays for the next scan. Never add it to the scope.

Journal the choice with `node .agents/aidd/aidd.mjs log select "<D IDs>: <why this group>"`.

Before each selection, harden when no `high` or `medium` item remains and this run has not hardened yet. When no eligible debt remains, stop.

## Quick repair

An item of hardening is a warning of one rule: its repair is mechanical and changes no behavior. A full spec costs more than the repair. Thus, when the selected group holds only items of hardening, take this route instead of step 3:

- Create the task branch `chore/{D ID}-{slug}` from the default branch.
- The **Builder** executes `implement-project` for each project of the evidence, with the evidence as its scope.
- Run `node .agents/aidd/aidd.mjs run harden`, `run lint` and `run test` for those projects. When one fails and the **Builder** cannot repair it, keep the item: the next selection gives it a spec.
- Run `node .agents/aidd/aidd.mjs debt remove <id>` for each item, then `node .agents/aidd/aidd.mjs integrate "refactor({project}): {what the repair does}"`.

A quick repair has no review and no release, and it does not count as one of the five specs.

## 3. Build

Execute `build-requested-spec` with the request, approved in advance: a repair of recorded debt needs no human approval, so nobody asks and the approval is journaled as soon as the spec is written. Give it the **Craftsman** and the **Architect**, so that it spawns only the **Builder**.

Then go back to the selection while eligible debt remains: `high` first, then `medium`, then `low`. Stop after five shipped specs, or when a spec ships with an unresolved failure. A human request that names the debt or asks for one repair gets only one.

When you stop, return the summary of `debt list`.

The result is each selected debt group repaired and shipped as one spec, and the debt register that remains.
