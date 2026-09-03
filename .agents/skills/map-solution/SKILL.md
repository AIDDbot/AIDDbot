---
name: map-solution
description: Map an existing codebase with explore once, then extract per container.
metadata:
  aiddbot-kind: orchestrator
user-invocable: true
disable-model-invocation: true
---
# map-solution

Your goal is to map the solution architecture.

- Spawn a new **Architect** sub-agent to run the [explore skill](../explore/SKILL.md) to set the project up and map its deployable and runnable containers.
- For every container found during exploration, spawn a new **Architect** sub-agent to run the [extract skill](../extract/SKILL.md) for that container.

Return a short report of the mapped solution.

Suggest `/deliver-requirement` as the next public skill; see [deliver-requirement](../deliver-requirement/SKILL.md).
