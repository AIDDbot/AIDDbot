---
name: implement-change
description: Coordinate and implement one complete change with current evidence.
metadata:
  aiddbot-kind: worker
user-invocable: false
disable-model-invocation: true
---
# implement-change

Your goal is to implement one complete change without concurrent writers.

- Read its change and related specs. Resolve dependencies and shared contracts before implementation.
- _FOR-EACH_ affected container:
  - Execute [codify](../codify/SKILL.md) sequentially with its relevant scope, specs, and technology context. Include E2E as a container when it needs test writing.
- Keep one writer for shared files, the report, and the Git index.

_IF_ migration, reversal, or interruption requires a decision that cannot be recovered from code, specs, report, or Git:
  - Record a brief note in the change before the dependent action.

_RETURN_ implemented change and current evidence.
