---
name: map-solution
description: Map an existing codebase with explore once, then extract per container.
metadata:
  aiddbot-kind: worker
user-invocable: false
disable-model-invocation: true
---
# map-solution

GOAL: map the solution architecture.

SPAWN Architect => FOLLOW [explore](../explore/SKILL.md) to set up the project and identify deployable and runnable containers.
FOR EACH container found:
  SPAWN Architect => FOLLOW [extract](../extract/SKILL.md) for container.
RETURN short mapped-solution report.
