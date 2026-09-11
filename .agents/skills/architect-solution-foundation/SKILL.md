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

- Infer the requested outcome from intent and repository evidence; clarify only material ambiguity.
- Treat existing documentation as evidence, never as permission to scaffold.
- Never scaffold over application files, unresolved conflicts, or unrelated changes.
- _IF_ the user wants to understand an existing solution:
  - Execute [map-solution](../map-solution/SKILL.md).
- _IF_ the user wants a new or evolved architecture:
  - Execute [design-solution](../design-solution/SKILL.md) without materialization.
- _IF_ the user wants an executable foundation:
  - Execute [design-solution](../design-solution/SKILL.md) with materialization requested.
