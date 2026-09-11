---
name: architect-solution-foundation
description: Understand, design, or prepare a solution architecture from repository evidence.
metadata:
  aiddbot-kind: orchestrator
user-invocable: true
disable-model-invocation: true
---
# architect-solution-foundation

Your goal is to **understand, design, or prepare a solution architecture**.

- Infer if current solution is a legacy brownfield or a new greenfield.
- _IF_ is a legacy brownfield:
  - Execute [map-solution](../map-solution/SKILL.md).
- _IF_ is a new greenfield:
  - Execute [design-solution](../design-solution/SKILL.md) without materialization.
- _IF_ the user wants an executable foundation:
  - Execute [design-solution](../design-solution/SKILL.md) with materialization requested.
