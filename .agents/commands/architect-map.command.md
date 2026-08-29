---
name: architect-map
description: Architect (A) — document an existing codebase top to bottom; /explore once, then /extract per container.
agent: architect
---
# architect-map

Your goal is to generate a architectural documentation of the codebase.

First read and follow [`/explore`](/.agents/skills/explore/SKILL.md) to set the project up and map its containers (deployable and runnable units).
Then read and follow [`/extract`](/.agents/skills/extract/SKILL.md) once per container in parallel, documenting them one at a time.

The result is the architectural documentation, created or brought up to date.

Suggest handoff to Architect to define a new feature specification by running [`/architect-feature`](./architect-feature.command.md).

