---
name: build-requested-spec
description: Turn a natural-language request into a shipped spec.
metadata:
  aiddbot-kind: orchestrator
user-invocable: true
---
# build-requested-spec

Your goal is to turn a natural-language request into a shipped spec.

Route as the **Architect** and delegate as the `## Delegation` section of `AGENTS.md` describes, with a `high`-effort **Architect**, a `medium`-effort **Builder**, and a `high`-effort **Craftsman**. Journal `start` before routing anything, and `done` before returning, with a status matching the outcome.

Have the **Architect** execute the `define-spec` skill with the request, and relay its proposal to the human; nothing is built before approval.

Have the **Builder** execute the `implement-project` skill for each affected production project, from lower to higher levels of abstraction, and then for the E2E project when the spec assigns acceptance-test changes, which it authors without running.

Have the **Craftsman** execute the `verify-acceptance` skill, then `review-implementation` once verification is green, then `ship-spec`. A red report sends its findings to the **Builder** for repair, and verification starts again. A report still red at its third revision is not repaired again: the delivery goes on, qualified if it has not been, and ships with every unresolved failure and finding recorded as technical debt; journal that as `debt`, amber. Only missing or stale evidence stops the delivery; journal it as `blocked`, red.

The result is one shipped spec, or the reason it could not ship.
