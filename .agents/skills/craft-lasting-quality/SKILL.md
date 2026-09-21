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

Use the journal flow `craft` and pass it to every agent and to `build-requested-spec`.

First, spawn a **Craftsman** agent to execute the `inspect-quality` skill for a system review, and wait for its result.

Next, spawn an **Architect** agent to select one coherent group of current debt entries for repair and express it as a natural-language request with its D IDs and supporting evidence. Do not edit code nor documentation, just express the request.

If no eligible debt remains, return the quality review directly. 

Otherwise, execute the `build-requested-spec` skill with the natural-language repair request. Reuse these agents to spawn only the missing implementation agent.

Before returning, stop every sub-agent this skill spawned and every terminal or background process it started. Never stop agents or processes supplied by the caller; the caller stops them.
