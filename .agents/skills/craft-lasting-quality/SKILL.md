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
upgrade request ──────────────────────────────────┐
1. Craftsman   scan-quality          debt register │
2. Architect   select                repair request│
3. you         build-requested-spec  shipped spec ◄┘
```

## Roles

- Route as the **Craftsman**. Spawn one **Craftsman** and one **Architect** for the full run, or use the ones that a calling orchestrator gives you. Continue each one with messages. Relay their questions to the human. Stop only the agents that you started.
- Run this flow yourself. Never give all of it to one agent, because an agent that you spawn cannot spawn other agents. A single **Craftsman** would then scan, specify, code, and ship alone.
- Journal `node .agents/aidd/aidd.mjs log handoff "<from> → <to>: <what>"` before the scan, before the selection, and before the handover to `build-requested-spec`.

## Upgrade request

When the human asks to upgrade dependencies, skip the scan and the selection. The request is a `chore` that upgrades the named projects, or all projects, and repairs all that the upgrade breaks. Go to step 3.

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

Execute `build-requested-spec` with the request. Give it the **Craftsman** and the **Architect**, so that it spawns only the **Builder**.

The result is the selected debt repaired and shipped as one spec, or the debt summary when no debt is eligible.
