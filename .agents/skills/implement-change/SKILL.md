---
name: implement-change
description: Coordinate implementation for one spec.
metadata:
  aiddbot-kind: worker
user-invocable: false
disable-model-invocation: true
---
# implement-change

Your goal is to implement one spec or its reported repairs.

- Read its spec, PRD edits, and container rules.
- _FOR-EACH_ affected application container, sequentially:
    - Execute [codify](../codify/SKILL.md) with its spec scope or supplied repair findings.
- _IF_ acceptance tests need writing or repair:
    - Execute [codify](../codify/SKILL.md) with E2E and the relevant scope or findings.

_RETURN_ the implementation result or blocker.
