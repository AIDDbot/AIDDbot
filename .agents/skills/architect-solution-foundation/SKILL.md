---
name: architect-solution-foundation
description: Scaffold greenfield solutions and map repository architecture.
metadata:
  aiddbot-kind: orchestrator
user-invocable: true
disable-model-invocation: true
---
# architect-solution-foundation

Your goal is to prepare a greenfield foundation and map the solution architecture.

- _IF_ the solution is greenfield:
    - _SPAWN_ a _Builder_ agent to read and execute [scaffoldify](../scaffoldify/SKILL.md); wait for its result.
- _ALWAYS_:
    - _SPAWN_ an _Architect_ agent to:
        - Execute [explore](../explore/SKILL.md) once for the whole repository.
        - Execute [extract](../extract/SKILL.md) for each container.

_RETURN_ the mapped architecture and any prepared foundation.
