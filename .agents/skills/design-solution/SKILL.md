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
- Resolve the technical spec identity and have this delivery owner establish or compatibly reuse `chore/{spec_key}` from the recorded base.
- Spawn a new **Architect** sub-agent to run the [specify](../specify/SKILL.md) skill with the fixed `key`, `kind: technical`, and action. The sub-agent keeps the branch it receives.

_RETURN_ a short report of the designed solution and validated architecture specification.
