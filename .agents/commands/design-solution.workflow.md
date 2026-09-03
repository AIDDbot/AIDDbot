---
name: design-solution
description: Design a solution architecture for a greenfield project.
---
# design-solution

The goal of this workflow is to design a solution architecture for a greenfield project.

- Spawn a new **Architect** sub-agent to run the [`explore`](/.agents/skills/explore/SKILL.md) skill to set the project up and map its deployable and runnable containers.
- Spawn a new **Architect** sub-agent to run the [`specify`](/.agents/skills/specify/SKILL.md) skill with `kind: technical` to write and validate the solution architecture specification. Before specifying, create and checkout `chore/{spec_key}` _ONCE_ the specification key is settled.

Return a short report of the designed solution and validated architecture specification.

Suggest `/deliver-requirement` as the next public workflow with the validated architecture specification in hand; see [`deliver-requirement`](/.agents/commands/deliver-requirement.workflow.md).
