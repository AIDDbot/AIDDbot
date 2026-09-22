---
name: craft-lasting-quality
description: Reduce existing quality debt.
metadata:
  aiddbot-kind: orchestrator
user-invocable: true
---
# craft-lasting-quality

**Craft Lasting Quality**

Your goal is to **reduce existing quality debt** using evidence-backed specifications.

Journal your own routing as **Craftsman** with `stage: craft`, and tell every agent, including those reused by `build-requested-spec`, to journal with its active agent role. Before inspecting anything, execute `record-journal` with `event: start`, passing the known harness and model so the day's header identifies the session.

First, spawn a **Craftsman** agent with `high` effort to execute the `inspect-quality` skill for a system review, and wait for its result.

Next, spawn an **Architect** agent with `low` effort to select one coherent group of current debt entries for repair and express it as a natural-language request with its D IDs and supporting evidence. Do not edit code nor documentation, just express the request.

Journal the outcome of that selection with `event: select`, naming the chosen D IDs. If no eligible debt remains, journal it with an amber status saying so and return the quality review directly. 

Otherwise, execute the `build-requested-spec` skill with the natural-language repair request. Reuse these agents to spawn only the missing implementation agent.

Before returning, stop every sub-agent this skill spawned and every terminal or background process it started. Never stop agents or processes supplied by the caller; the caller stops them. Then close the trace with `record-journal` `event: done`, its status matching the outcome.
