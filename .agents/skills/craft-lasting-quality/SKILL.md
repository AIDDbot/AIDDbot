---
name: craft-lasting-quality
description: Reduce existing quality debt.
metadata:
  aiddbot-kind: orchestrator
user-invocable: true
---
# craft-lasting-quality

Your goal is to reduce existing quality debt through evidence-backed specs.

Route as the **Craftsman**: spawn one **Craftsman** and one **Architect** for the whole run, or use those a calling orchestrator hands you; continue each with messages, relay their questions to the human, and stop only the agents you started. You run this flow yourself and never hand it whole to one agent: an agent you spawn cannot spawn others, so a single **Craftsman** would scan, specify, code and ship alone.

Journal every handoff between agents when you send the work, with `node .agents/aidd/aidd.mjs log handoff "<from> → <to>: <what>"`: log it before the scan, before the **Architect** selects, and before the hand-over to `build-requested-spec`.

When the human asks to upgrade dependencies, skip the scan and the selection: the request is a `chore` that upgrades the named projects, or all of them, and repairs whatever the upgrade breaks.

Otherwise, have the **Craftsman** execute the `scan-quality` skill. Then have the **Architect** read `node .agents/aidd/aidd.mjs debt list`, select one coherent group of items, highest priority first, and express it as a natural-language repair request with its D IDs and evidence, marked a `refactor` unless the debt breaks behavior (then a `fix`), editing neither code nor documentation. The repair is bounded by that evidence: a quality finding a later check reveals is left for the next scan, never added to the scope. Journal the choice with `node .agents/aidd/aidd.mjs log select "<D IDs>: <why this group>"`. When no eligible debt remains, return the `debt list` summary and say so.

Otherwise, execute the `build-requested-spec` skill with that request, handing it both agents so it spawns only the **Builder**.

The result is the selected debt repaired and shipped as one spec, or the debt summary when nothing is eligible.
