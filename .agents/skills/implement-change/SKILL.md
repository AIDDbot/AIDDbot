---
name: implement-change
description: Plan when needed and implement one complete change with current evidence.
metadata:
  aiddbot-kind: worker
user-invocable: false
disable-model-invocation: true
---
# implement-change

Your goal is to implement one complete change without concurrent writers.

- Read its change, related specs, and plan when present.
- _IF_ the change needs ordered work, coordination, migration, or non-trivial reversal:
  - _SPAWN_ a _Builder_ agent to execute [planify](../planify/SKILL.md) once for the complete change.
- _FOR-EACH_ affected container:
  - _SPAWN_ a _Builder_ agent to execute [codify](../codify/SKILL.md) sequentially with the change tasks, criteria, and checks.
- Keep one writer for shared files, the report, and the Git index.

_RETURN_ implemented change, current evidence, and any required replanning.
