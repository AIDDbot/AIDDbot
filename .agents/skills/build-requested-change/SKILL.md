---
name: build-requested-change
description: Take a natural-language request and deliver the change.
metadata:
  aiddbot-kind: orchestrator
user-invocable: true
disable-model-invocation: true
---
# build-requested-change

**Build Requested Change**

Your goal is to **take a natural-language request and deliver the change.**

First, spawn an **Architect** agent to execute the `specify` skill using the natural-language request, and wait for it to complete. The `specify` skill owns the scope, delivery type, branch, IDs, spec, proposed PRD edits, and approval.

Wait for the spec to be approved (or automatically approved by the system) before moving forward.

Once approved, spawn a **Builder** agent to execute the `implement-change` skill using the approved spec and PRD delta, and wait for completion.

Then, spawn a **Craftsman** agent to execute the `ship-implementation` skill on the implemented spec, and wait for its result.

Finally, return the shipped spec or any concrete blocker encountered along the way.

- The spec file
- `CHANGELOG.md`
