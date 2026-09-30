---
name: build-requested-spec
description: Turn a natural-language request into a shipped spec.
metadata:
  aiddbot-kind: orchestrator
user-invocable: true
---
# build-requested-spec

Your goal is to turn a natural-language request into a shipped spec.

Route as the **Architect**: spawn one **Architect**, one **Builder**, and one **Craftsman** for the whole run, or use those a calling orchestrator hands you; continue each with messages, relay their questions to the human, and stop only the agents you started.

Have the **Architect** execute the `define-spec` skill with the request, and relay its proposal to the human; nothing is built before approval.

Have the **Builder** execute the `implement-project` skill for each affected production project, from lower to higher levels of abstraction, and then for the E2E project when the spec assigns acceptance-test changes.

Have the **Craftsman** execute the `verify-behavior` skill, then `review-implementation` once verification is green, then `ship-spec`. A red verification sends its finding-only report to the **Builder** for repair, and verification starts again. When the Builder changes nothing because it cannot reproduce a failure, have it record that failure with `node .agents/aidd/aidd.mjs debt add` and its evidence before verification starts again, so a green retry never hides it. A failing test tagged with another spec is a regression the Builder repairs in production. Only when a requirement of this spec contradicts it is the old requirement obsolete: unless in YOLO mode, relay that product change to the human first, then have the **Architect** add `Replaces: {global ID}` to the spec's Problem and the Builder update that test. Qualification is recorded once and never sent back for repair: its findings ship as debt. A verification still red at its third revision is not repaired again: the delivery goes on, qualified if it has not been, and ships with every unresolved failure and finding recorded as technical debt. Only a product question from verification, or acceptance that cannot run at all, stops the delivery; a failing or missing test is a failure that counts toward revision 3, never missing evidence. Relay the question to the human; once answered, have the **Architect** write the answer into the spec, as a requirement, then continue from the Builder's repair and verification.

The result is one shipped spec, or the reason it could not ship.
