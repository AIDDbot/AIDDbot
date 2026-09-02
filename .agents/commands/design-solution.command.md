---
name: design-solution
description: Design a solution architecture for a greenfield project.
---
# design-solution

The goal of this command is to design a solution architecture for a greenfield project.

- Spawn a new **Architect** sub-agent to run the [`/explore`](/.agents/skills/explore/SKILL.md) skill to set the project up and map its containers (deployable and runnable units).

- Spawn a new **Architect** sub-agent to run the [`/specify`](/.agents/skills/specify/SKILL.md) skill with `kind: technical` to write a new specification for the solution architecture. Before specify, create and checkout `chore/{spec_key}` once the spec key is settled.

Suggest handoff to [`/implement-spec`](./implement-spec.command.md) with the architectural specification in hand.
