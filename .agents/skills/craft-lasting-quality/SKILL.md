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

First, spawn a **Craftsman** agent to execute the `inspect-quality` skill for a system review, and wait for its result.

Next, spawn an **Architect** agent to select one coherent group of current debt entries for repair and express it as a natural-language request with its D IDs and supporting evidence. Do not edit the quality records, define a spec, edit the PRD, reserve IDs, or create a branch during selection.

If no eligible debt remains, return the quality review directly. Otherwise, execute the `build-requested-spec` skill with the natural-language repair request. Supply the selection agent for specification and the inspection agent for evaluation so that flow reuses both and spawns only the missing implementation agent.
