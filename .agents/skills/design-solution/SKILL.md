---
name: design-solution
description: Design a solution architecture for a greenfield project.
metadata:
  aiddbot-kind: worker
user-invocable: false
disable-model-invocation: true
---
# design-solution

Your goal is to design a solution architecture for a greenfield project.

- Spawn a new **Architect** sub-agent to run the [explore skill](../explore/SKILL.md) to set the project up and map its deployable and runnable containers.
- Spawn a new **Architect** sub-agent to run the [specify skill](../specify/SKILL.md) with `kind: technical` to write and validate the solution architecture specification. Before specifying, create and checkout `chore/{spec_key}` _ONCE_ the specification key is settled.

Return a short report of the designed solution and validated architecture specification.
