---
name: architect-solution-foundation
description: Understand, design, or prepare a solution architecture from repository evidence.
metadata:
  aiddbot-kind: orchestrator
user-invocable: true
disable-model-invocation: true
---
# architect-solution-foundation

Your goal is to **understand, design, or prepare a solution architecture** from the user's intent and repository evidence.

- Resolve the requested outcome: understand what exists, design a new or evolved architecture, or prepare an executable foundation. Infer it when the request is clear; ask only when the choice changes the material result.
- _IF_ the outcome is to understand an identifiable existing solution:
  - Execute [map-solution](../map-solution/SKILL.md).
- _IF_ the outcome is to design a new solution or an evolution:
  - Execute [design-solution](../design-solution/SKILL.md) without materialization.
- _IF_ the outcome is to prepare an executable foundation:
  - Execute [design-solution](../design-solution/SKILL.md) with materialization requested.
- Treat repository contents as evidence and constraints. Existing documentation may be an architecture to reuse or reconcile; it is not permission to scaffold.
- Never scaffold over application files, unresolved conflicts, or unrelated changes.

_RETURN_ the actual outcome: mapped architecture, validated design, prepared foundation, or a concrete ambiguity or blocker.
