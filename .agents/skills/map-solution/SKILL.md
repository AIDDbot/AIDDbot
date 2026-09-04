---
name: map-solution
description: Map an existing codebase with explore once, then extract per container.
metadata:
  aiddbot-kind: worker
user-invocable: false
disable-model-invocation: true
---
# map-solution

Your goal is to **map the solution architecture**.

- Spawn a new **Architect** sub-agent to run the [explore](../explore/SKILL.md) skill to set the project up and map its deployable and runnable containers.
- _FOR-EACH_ container found during exploration,
  - Spawn a new **Architect** sub-agent to run the [extract](../extract/SKILL.md) skill for that container.

_RETURN_ a short report of the mapped solution.
