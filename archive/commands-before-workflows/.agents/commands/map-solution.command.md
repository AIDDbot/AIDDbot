---
name: map-solution
description: Map an existing codebase — /explore once, then /extract per container.
---
# map-solution

The goal of this command is to map the solution architecture.

- Spawn a new **Architect** sub-agent to run the [`/explore`](/.agents/skills/explore/SKILL.md) skill to set the project up and map its containers (deployable and runnable units).
- Spawn a new **Architect** sub-agent for every container found during the exploration to run the [`/extract`](/.agents/skills/extract/SKILL.md) skill for that container.

Suggest handoff to [`/specify-feature`](./specify-feature.command.md) to write a specification for a feature.
