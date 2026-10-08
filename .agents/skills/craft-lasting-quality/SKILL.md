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
1. Craftsman   scan-quality          debt register  │
2. Architect   select                repair request │
3. you         build-requested-spec  shipped spec  ◄┘
   repeat 1–3 while eligible debt remains, at most 5 specs
```

## Roles

- Route as the **Craftsman**. Use the **Craftsman** and the **Architect** that a calling orchestrator gives you. Otherwise, spawn each one for one repair, when its first step starts, with a fresh context: never fork or copy your conversation into it. Thus no repair inherits the context of the one before. Relay their questions to the human. When a repair ends, also after a failure, stop each agent that you started for it.
- Run this flow yourself. Never give all of it to one agent, because an agent that you spawn cannot spawn other agents. A single **Craftsman** would then scan, specify, code, and ship alone. Never read the skill of a step that you hand off.
- Journal `node .agents/aidd/aidd.mjs log handoff "<from> → <to>: <what>"` before the scan, before the selection, and before the handover to `build-requested-spec`.

## Upgrade request

When the human asks to upgrade dependencies, skip the scan and the selection. The request is a `chore` that upgrades the named projects, or all projects, and repairs all that the upgrade breaks. Go to step 3, and stop after that one spec.

## 1. Scan

The **Craftsman** executes `scan-quality`.

## 2. Select

The **Architect** reads `node .agents/aidd/aidd.mjs debt list` and selects one coherent group of items, highest priority first. It writes the group as a natural-language repair request:

- With the D IDs and their evidence.
- Marked `refactor`, or `fix` when the debt breaks behavior.
- The **Architect** edits no code and no documentation.
- The evidence limits the repair. A quality finding that a later check shows stays for the next scan. Never add it to the scope.

Journal the choice with `node .agents/aidd/aidd.mjs log select "<D IDs>: <why this group>"`.

When no eligible debt remains, stop. Return the summary of `debt list`, and say that no debt is eligible.

## 3. Build

Execute `build-requested-spec` with the request, approved in advance: a repair of recorded debt needs no human approval, so nobody asks and the approval is journaled as soon as the spec is written. Give it the **Craftsman** and the **Architect**, so that it spawns only the **Builder**.

Then start again from the scan, because each repair changes the evidence. Stop when no eligible debt remains, after five shipped specs, or when a spec ships with an unresolved failure. A human request that names the debt or asks for one repair gets only one.

The result is each selected debt group repaired and shipped as one spec, and the debt summary of `debt list` at the end.
