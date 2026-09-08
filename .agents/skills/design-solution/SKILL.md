---
name: design-solution
description: Design a new or evolved solution architecture and optionally materialize a new foundation.
metadata:
  aiddbot-kind: worker
user-invocable: false
disable-model-invocation: true
---
# design-solution

Your goal is to **design a new or evolved solution architecture and materialize it only when requested**.

- Inspect existing documentation and application evidence before writing.
- _IF_ identifiable application code exists:
  - Execute [map-solution](../map-solution/SKILL.md) and use that map as the current architecture.
- _IF_ the project documentation foundation is missing:
  - Spawn Architect and execute [explore](../explore/SKILL.md).
- Reuse settled design decisions and show contradictions between documentation and code.
- Resolve technical-spec identity and record the base revision.
- The design owner creates `design/{spec_key}` or compatibly reuses it before the first design write.
- Spawn Architect and execute [specify](../specify/SKILL.md) with fixed `key`, `kind: technical`, and action; keep the owner's branch.
- _IF_ materialization was not requested:
  - _RETURN_ the mapped context and validated technical design without installing a scaffold.
- _IF_ materialization was requested and application files already exist:
  - _RETURN_ the validated design and route its implementation through requested-change delivery.
- Resolve missing material choices and execute [scaffoldify](../scaffoldify/SKILL.md) exactly once.
- Execute [map-solution](../map-solution/SKILL.md) after materialization to reconcile the documented and actual containers.

_RETURN_ the actual outcome: validated technical design, prepared and reconciled foundation, or blocker.
