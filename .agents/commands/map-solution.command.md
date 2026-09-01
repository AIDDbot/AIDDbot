---
name: map-solution
description: Architect (A) — document an existing codebase top to bottom; /explore once, then /extract per container.
agent: architect
---
# map-solution

The goal of this command is to map the solution architecture.

- Spawn a new **Architect** sub-agent to run the [`/explore`](/.agents/skills/explore/SKILL.md) skill to set the project up and map its containers (deployable and runnable units).
- Spawn a new **Architect** sub-agent for every container found during the exploration, and run the [`/extract`](/.agents/skills/extract/SKILL.md) skill for each container.

Suggest handoff to the run the specify feature command to write a specification for the feature.