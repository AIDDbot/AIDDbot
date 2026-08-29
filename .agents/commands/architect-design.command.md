---
name: architect-map
description: Architect (A) — design a solution architecture for a greenfield project.
agent: architect
---
# architect-design

Your goal is to design a solution architecture for a greenfield project.

First read and follow [`/explore`](/.agents/skills/explore/SKILL.md) to set the project up and map its containers (deployable and runnable units).

Read and follow [`/specify`](/.agents/skills/specify/SKILL.md) with `kind: technical` to write a new specification for the solution architecture.

The result is the architectural documentation, and a specification to scaffold the solution architecture.

Suggest handoff to Builder to implement the architecture by running [`/builder-implement`](./builder-implement.command.md) with the architectural specification in hand.

