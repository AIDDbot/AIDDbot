---
name: build-requested-spec
description: Turn a natural-language request into a shipped spec.
metadata:
  aiddbot-kind: orchestrator
user-invocable: true
---
# build-requested-spec

**Build Requested Spec**

Your goal is to **turn a natural-language request into a shipped spec.**

Journal your own routing as **Architect** with `stage: deliver`, and tell every agent that executes a stage to journal with its active agent role. Before routing anything, execute `record-journal` with `event: start`, passing the known harness and model so the day's header identifies the session. Record with `event: reuse` every stage agent you take from the caller instead of spawning, because a reused agent carries the caller's effort and model, not the one this skill asks for.

Reuse an agent supplied by the caller when available. Otherwise, spawn an **Architect** agent with `high` effort to execute the `define-spec` skill using the natural-language request. Wait for the spec to be approved.

Reuse an implementation agent supplied by the caller when available. Otherwise, spawn a **Builder** agent with `medium` effort to implement the approved spec. Have that agent read the spec, its PRD or TDR edits.
Then execute the `implement-project` skill for each affected production project sequentially, from lower to higher levels of abstraction. Use that project's rules and scope or the supplied repair findings. Wait for the whole process to complete.

If the spec assigns _acceptance-test_ creation, update, deletion, or repair, execute `implement-project` for the E2E project with the complete acceptance-test scope. This step authors the tests without executing them. Wait for completion.

Reuse an evaluation agent supplied by the caller when available. Otherwise, spawn a **Craftsman** agent with `high` effort to evaluate and ship the implementation. Have that agent execute `verify-acceptance` first. When verification is `red` before revision 3, send its findings back to the existing implementation agent, apply repairs through `implement-project`, and repeat verification. Do not execute `review-implementation` while that verification is red.

When verification is `green`, execute `review-implementation`. A red qualification before revision 3 returns its findings to the existing implementation agent; after repair, restart at verification. Green or amber qualification ships normally. A verification red at revision 3 proceeds to qualification without repair, then ships with every current unresolved finding as technical debt. A qualification red at revision 3 also ships with its unresolved findings as technical debt. Journal either revision-3 decision with `event: debt` and an amber status, naming what ships unresolved. Missing or stale evidence still stops delivery; journal that stop with `event: blocked` and a red status.

Before returning, stop every sub-agent this skill spawned and every terminal or background process it started. Never stop agents or processes supplied by the caller; the caller stops them. Then close the trace with `record-journal` `event: done`, its status matching the delivered outcome.
