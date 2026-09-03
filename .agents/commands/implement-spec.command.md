---
name: implement-spec
description: Plan and implement a validated specification.
---
# implement-spec

The goal of this internal command is to implement a validated specification.

- Read the specification and keep the delivery command's active working branch.

- **Planning phase** — for every affected container:
  - Spawn a new **Builder** sub-agent to run the [`planify`](/.agents/skills/planify/SKILL.md) skill.
  - For a functional specification, include one additional plan for the `e2e` suite.
  - Execute all container plans in parallel.

- _ONCE_ all plans are available, start implementation.

- **Implementation phase** — for every plan:
  - Spawn a new **Builder** sub-agent to run the [`codify`](/.agents/skills/codify/SKILL.md) skill.
  - Execute all plans in parallel.

Return a short report of the implemented specification.
