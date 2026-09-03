---
name: implement-spec
description: Plan and implement a validated specification.
metadata:
  aiddbot-kind: worker
user-invocable: false
disable-model-invocation: true
---
# implement-spec

Your goal is to implement a validated specification.

- Read the specification and keep the delivery worker's active working branch.
- **Planning phase** — for every affected container:
  - Spawn a new **Builder** sub-agent to run the [planify skill](../planify/SKILL.md).
  - For a functional specification, include one additional plan for the `e2e` suite.
  - Execute all container plans in parallel.
- _ONCE_ all plans are available, start implementation.
- **Implementation phase** — for every plan:
  - Spawn a new **Builder** sub-agent to run the [codify skill](../codify/SKILL.md).
  - Execute all plans in parallel.

Return a short report of the implemented specification.
