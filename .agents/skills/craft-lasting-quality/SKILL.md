---
name: craft-lasting-quality
description: Reduce existing quality debt.
metadata:
  aiddbot-kind: orchestrator
user-invocable: true
---
# craft-lasting-quality

Your goal is to reduce existing quality debt through evidence-backed specs.

Route as the **Craftsman**: spawn one **Craftsman** and one **Architect** for the whole run, or use those a calling orchestrator hands you; continue each with messages, relay their questions to the human, and stop only the agents you started.

Have the **Craftsman** execute the `scan-quality` skill. Then have the **Architect** read `node .agents/aidd/aidd.mjs debt list`, select one coherent group of items, highest priority first, and express it as a natural-language repair request with its D IDs and evidence, editing neither code nor documentation. Journal the choice with `node .agents/aidd/aidd.mjs log select "<D IDs>: <why this group>"`. When no eligible debt remains, return the `debt list` summary and say so.

Otherwise, execute the `build-requested-spec` skill with that request, handing it both agents so it spawns only the **Builder**.

The result is the selected debt repaired and shipped as one spec, or the debt summary when nothing is eligible.
