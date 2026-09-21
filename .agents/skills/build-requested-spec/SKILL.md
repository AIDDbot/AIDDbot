---
name: build-requested-spec
description: Turn a natural-language request into a shipped spec.
metadata:
  aiddbot-kind: orchestrator
user-invocable: true
disable-model-invocation: false
---
# build-requested-spec

**Build Requested Spec**

Your goal is to **turn a natural-language request into a shipped spec.**

Reuse an agent supplied by the caller when available. Otherwise, spawn an **Architect** agent to execute the `define-spec` skill using the natural-language request. Wait for the spec to be approved.

Reuse an implementation agent supplied by the caller when available. Otherwise, spawn a **Builder** agent to implement the approved spec. Have that agent read the spec, its PRD or TDR edits.
Then execute the `implement-project` skill for each affected production project sequentially, from lower to higher levels of abstraction. Use that project's rules and scope or the supplied repair findings. Wait for the whole process to complete.

If the spec assigns _acceptance-test_ creation, update, deletion, or repair, execute `implement-project` for the E2E project with the complete acceptance-test scope. Wait for completion.

Reuse an evaluation agent supplied by the caller when available. Otherwise, spawn a **Craftsman** agent to evaluate and ship the implementation. Have that agent execute the `verify-acceptance` skill. If verification is `green`, execute `review-implementation`. If qualification is `green` or `amber`, execute `ship-spec` and return the shipped spec.

If any of the initial verification or qualification attempts fail, send the reported findings back to the existing implementation agent and apply repairs through `implement-project`. Repeat the verification and qualification process up to 3 times. If the revision ceiling is reached, stop and ask the human.
