---
name: craft-lasting-quality
description: Reduce existing quality debt.
metadata:
  aiddbot-kind: orchestrator
user-invocable: true
---
# craft-lasting-quality

Your goal is to reduce existing quality debt through evidence-backed specs.

Route as the **Craftsman** and delegate as the `## Delegation` section of `AGENTS.md` describes, with a `high`-effort **Craftsman** and a `high`-effort **Architect**; the Architect gets `high` because it will also define the repair spec. Journal `start` before inspecting anything, and `done` before returning, with a status matching the outcome.

Have the **Craftsman** execute the `inspect-quality` skill. Then have the **Architect** select one coherent group of current debt entries and express it as a natural-language repair request with its D IDs and evidence, editing neither code nor documentation. Journal the choice as `select`, naming the D IDs. When no eligible debt remains, journal that as amber and return the quality review.

Otherwise, execute the `build-requested-spec` skill with that request, handing it both agents so it spawns only the **Builder**.

The result is the selected debt repaired and shipped as one spec, or the current quality review when nothing is eligible.
