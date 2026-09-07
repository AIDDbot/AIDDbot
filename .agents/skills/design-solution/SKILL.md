---
name: design-solution
description: Design a solution architecture for a greenfield project.
metadata:
  aiddbot-kind: worker
user-invocable: false
disable-model-invocation: true
---
# design-solution

Your goal is to **design and materialize a greenfield solution foundation**.

- Spawn Architect and execute [explore](../explore/SKILL.md).
- On first write:
  - Replace init seed with complete project rules.
  - Create empty architecture, model, and PRD shells.
- Resolve technical-spec identity.
- From recorded base, delivery owner creates `chore/{spec_key}` or compatibly reuses it.
- Spawn Architect and execute [specify](../specify/SKILL.md) with fixed `key`, `kind: technical`, and action.
  - Keep the received branch.
- Confirm missing material choices.
- Execute [scaffoldify](../scaffoldify/SKILL.md) exactly once using validated design.
  - Do not skip scaffoldification because repository is empty or a scaffold is implied.
- Execute [map-solution](../map-solution/SKILL.md) after materialization to reconcile documented containers with selected design.

_RETURN_ scaffolded solution, reconciled architecture, and technical specification.
