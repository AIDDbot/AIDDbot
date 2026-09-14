---
name: architect-solution-foundation
description: Understand, design, or prepare a solution architecture from repository evidence.
metadata:
  aiddbot-kind: orchestrator
user-invocable: true
disable-model-invocation: true
---
# architect-solution-foundation

Your goal is to understand, design, or prepare a solution architecture.

- _IF_ the request includes design,
  -  _SPAWN_ an _Architect_ agent to:
    - clarify the solution name, problem, intended users, solution, containers, and technology decisions.
- _IF_ an executable foundation is requested, 
  - _SPAWN_ a _Builder_ agent to read and execute [scaffoldify](../scaffoldify/SKILL.md).
- _ALWAYS_ after design or materialization,
  - _SPAWN_ an _Architect_ agent to:
    - execute [explore](../explore/SKILL.md) once for the whole repository
    - and [extract](../extract/SKILL.md) for each container.

_RETURN_ the design or mapped architecture and prepared foundation.
