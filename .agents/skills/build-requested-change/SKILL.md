---
name: build-requested-change
description: Take a natural-language request and deliver the change.
metadata:
  aiddbot-kind: orchestrator
user-invocable: true
disable-model-invocation: false
---
# build-requested-change

**Build Requested Change**

Your goal is to **take a natural-language request and deliver the change.**

First, spawn an **Architect** agent to execute the `specify` skill using the natural-language request, and wait for it to complete and be approved. 

Once approved, spawn a **Builder** agent to execute the `implement-change` skill using the approved spec and PRD delta, and wait for completion.

Then, spawn a **Craftsman** agent to execute the `ship-implementation` skill on the implemented spec, and wait for its result.

In case of a `red` report, below the revisions ceiling, spawn a **Builder** agent to implement a fix using the `implement-change` skill. If the revisions ceiling is exceeded, stop and ask the human.
