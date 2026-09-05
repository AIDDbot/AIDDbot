---
name: map-solution
description: Map an existing codebase with explore once, then extract per container.
metadata:
  aiddbot-kind: worker
user-invocable: false
disable-model-invocation: true
---
# map-solution

_GOAL_: map the solution architecture.

_SPAWN_ Architect => _FOLLOW_ [explore](../explore/SKILL.md) to set up the project and identify deployable and runnable containers.
_FOR-EACH_ container found:
  _SPAWN_ Architect => _FOLLOW_ [extract](../extract/SKILL.md) for container.
_RETURN_ short mapped-solution report.
