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

- _IF_ the request includes design:
    - _SPAWN_ an _Architect_ agent to:
        - Clarify the solution name, problem, and intended users.
        - _IF_ the solution is greenfield:
            - Run `node .agents/skills/scaffoldify/scripts/materialize.mjs --list` before proposing containers or technologies.
            - Use the catalogued archetypes as the initial proposal.
            - _IF_ proposing a non-catalogued alternative:
                - Justify it with a concrete need the catalog does not cover or an explicit user preference.
        - Define the solution, containers, and technology decisions.
- _IF_ an executable foundation is requested:
    - _SPAWN_ a _Builder_ agent to read and execute [scaffoldify](../scaffoldify/SKILL.md).
- _ALWAYS_ after design or materialization:
    - _SPAWN_ an _Architect_ agent to:
        - Execute [explore](../explore/SKILL.md) once for the whole repository.
        - Execute [extract](../extract/SKILL.md) for each container.

_RETURN_ the design or mapped architecture and prepared foundation.
