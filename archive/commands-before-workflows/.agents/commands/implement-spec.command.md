---
name: implement-spec
description: Take an existing validated spec to implement it.
---
# implement-spec

The goal of this command is to take an existing validated spec and implement it.

- Read the specification. Create and checkout `feat/{spec_key}` for a functional spec or `chore/{spec_key}` for a technical spec.

- Spawn a new **Builder** sub-agent to run the [`/planify`](/.agents/skills/planify/SKILL.md) skill once per affected container. For a functional spec, one more run for the `e2e` suite. Do this phase in parallel; ie, spawn as many sub-agents as there are affected containers.

- _ONCE_ all the sub-agents have finished, spawn a new **Builder** sub-agent to run the [`/codify`](/.agents/skills/codify/SKILL.md) skill to write the code (with unit tests) of each plan. Do this phase in parallel; ie, spawn as many sub-agents as there are plans to codify.

- _ONCE_ all the sub-agents have finished, run the [`/review-implementation`](/.agents/commands/review-implementation.command.md) command for this specification implementation.

Return a short report of the implementation reviewed.
