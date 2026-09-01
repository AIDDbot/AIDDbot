---
name: design-solution
description: Design a solution architecture for a greenfield project.
---
# design-solution

The goal of this command is to design a solution architecture for a greenfield project.

First, spawn a new **Architect** sub-agent to run the [`/explore`](/.agents/skills/explore/SKILL.md) skill to set the project up and map its containers (deployable and runnable units).

Then, spawn a new **Architect** sub-agent to run the [`/specify`](/.agents/skills/specify/SKILL.md) skill with `kind: technical` to write a new specification for the solution architecture.

Finally, suggest handoff to the **Builder** sub-agent to implement the architecture by running [`/builder-implement`](./builder-implement.command.md) with the architectural specification in hand.
