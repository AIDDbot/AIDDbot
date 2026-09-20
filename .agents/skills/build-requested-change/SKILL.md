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

Once approved, spawn a **Builder** agent to read the spec, its PRD or TDR edits, and the affected project rules. Have the **Builder** execute the `codify` skill for each affected production project sequentially, from lower to higher levels of abstraction, using that project's scope or the supplied repair findings. If the spec assigns acceptance-test creation, update, deletion, or repair, have the same **Builder** execute `codify` for the E2E project with the complete acceptance-test scope. Wait for completion and return any missing work as a blocker.

Then, spawn a **Craftsman** agent to execute the `verify` skill on the implemented spec. If verification is `green`, have the same **Craftsman** execute `qualify`. If qualification is `green` or `amber`, have the **Craftsman** execute `shipify` and return the shipped spec.

If verification or qualification is `red` and its revision count is below 3, spawn a **Builder** agent to apply the reported repairs through `codify`, following the same project order and E2E rules. Then spawn a **Craftsman** agent and repeat evaluation from `verify`. If the revision ceiling is reached, stop and ask the human.
