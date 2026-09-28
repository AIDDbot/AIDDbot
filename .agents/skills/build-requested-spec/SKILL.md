---
name: build-requested-spec
description: Turn a natural-language request into a shipped spec.
metadata:
  aiddbot-kind: orchestrator
user-invocable: true
---
# build-requested-spec

Your goal is to turn a natural-language request into a shipped spec.

Route as the **Architect**. Spawn one **Architect**, one **Builder**, and one **Craftsman** once for the whole run, and continue each with messages; spawn a replacement only when the harness cannot continue an agent or its context runs out. Use the agents a calling orchestrator hands you instead of spawning your own. Sub-agents never ask the human: relay their questions and proposals yourself. Before returning, stop the agents and processes you started, never your caller's.

Have the **Architect** execute the `define-spec` skill with the request, and relay its proposal to the human; nothing is built before approval.

Have the **Builder** execute the `implement-project` skill for each affected production project, from lower to higher levels of abstraction, and then for the E2E project when the spec assigns acceptance-test changes, which it authors without running.

Have the **Craftsman** execute the `verify-behavior` skill, then `review-implementation` once verification is green, then `ship-spec`. A red recorded evaluation sends its finding-only report to the **Builder** for repair, and verification starts again. A verification still red at its third revision is not repaired again: the delivery goes on, qualified if it has not been, and ships with every unresolved failure and finding recorded as technical debt. Only a product question from verification or missing or stale evidence stops the delivery, with the spec blocked by `node .agents/aidd/aidd.mjs spec block <spec-directory> "<reason>"`. Relay the question to the human; once answered, have the **Architect** write the answer into the spec, as a requirement or an `Affected behavior` row, and run `node .agents/aidd/aidd.mjs spec resume <spec-directory> "<resolution>"`, then continue from the Builder's repair and verification.

The result is one shipped spec, or the reason it could not ship.
