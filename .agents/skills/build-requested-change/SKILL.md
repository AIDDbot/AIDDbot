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

First, spawn an **Architect** agent to review the PRD, project rules, and existing findings. The **Architect** will define a single coherent scope, determine its delivery type, identify requirements to change, deprecate, or preserve, and reserve the necessary spec and requirement IDs before creating or resuming the working branch.

Then, have it execute the `specify` skill using the request, scope, and spec ID.

Wait for the spec to be approved (or automatically approved by the system) before moving forward.

Once approved, spawn a **Builder** agent to execute the `implement-change` skill using the approved spec and PRD delta, and wait for completion.

Then, spawn a **Craftsman** agent to execute the `ship-implementation` skill on the implemented spec, and wait for its result.

Finally, return the shipped spec or any concrete blocker encountered along the way.

- The spec file
- `CHANGELOG.md`
