---
name: design-solution
description: Design a solution architecture for a greenfield project.
metadata:
  aiddbot-kind: worker
user-invocable: false
disable-model-invocation: true
---
# design-solution

Your goal is to **design a solution architecture** for a greenfield project.

- Spawn a new **Architect** sub-agent to run the [explore](../explore/SKILL.md) skill to set the project up and map its deployable and runnable containers.
- Spawn a new **Architect** sub-agent to run the [specify](../specify/SKILL.md) skill with `kind: technical` to write and validate the solution architecture specification, and create and checkout `chore/{spec_key}`.

_RETURN_ a short report of the designed solution and validated architecture specification.
