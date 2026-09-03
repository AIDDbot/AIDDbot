---
name: map-solution
description: Map an existing codebase with explore once, then extract per container.
---
# map-solution

The goal of this workflow is to map the solution architecture.

- Spawn a new **Architect** sub-agent to run the [`explore`](/.agents/skills/explore/SKILL.md) skill to set the project up and map its deployable and runnable containers.
- For every container found during exploration, spawn a new **Architect** sub-agent to run the [`extract`](/.agents/skills/extract/SKILL.md) skill for that container.

Return a short report of the mapped solution.

Suggest `/deliver-requirement` as the next public workflow; see [`deliver-requirement`](/.agents/commands/deliver-requirement.workflow.md).
