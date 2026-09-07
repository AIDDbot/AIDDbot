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

- Spawn Architect and execute [explore](../explore/SKILL.md) to set up the project and identify deployable and runnable containers.
- _FOR-EACH_ container found:
  - Spawn Architect and execute [extract](../extract/SKILL.md) for that container.

_RETURN_ short mapped-solution report.
