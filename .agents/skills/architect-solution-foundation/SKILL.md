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
  - If no code at all, is a new greenfield.
  - If basic scaffold with no features, is an scaffolded greenfield.
  - Any other scenario is a legacy brownfield.
- _IF_ is a new greenfield:
  - Execute [design-solution](../design-solution/SKILL.md) passing any received user request.
- Always execute [map-solution](../map-solution/SKILL.md) in any scenario (greenfield or brownfield).

Suggests continue with [build-requested-change workflow](../build-requested-change/SKILL.md) for the first feature.
