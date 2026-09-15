---
name: craft-lasting-quality
description: Reduce existing quality debt.
metadata:
  aiddbot-kind: orchestrator
user-invocable: true
disable-model-invocation: true
---
# craft-lasting-quality

**Craft Lasting Quality**

Your goal is to **reduce existing quality debt** using evidence-backed specifications.

First, spawn a **Craftsman** agent to execute the `curate-quality` skill for a system review, and wait for its result.

Next, spawn an **Architect** agent to select one coherent group of current findings for repair. Have the **Architect** express that group as a natural-language repair request with its IDs and supporting evidence, without editing the quality records, defining a spec, editing the PRD, reserving IDs, or creating a branch.

If no eligible findings remain, return the quality review directly. Otherwise, execute the `build-requested-change` skill with the natural-language repair request. That flow creates the **Architect** responsible for executing `specify` and formally defining the delivery.

Finally, return the quality review when no repair is eligible, or the shipped repair spec and its changelog entry. Return any concrete blocker instead of claiming completion.
