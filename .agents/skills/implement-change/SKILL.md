---
name: implement-change
description: Coordinate implementation for one spec.
metadata:
  aiddbot-kind: worker
user-invocable: false
disable-model-invocation: true
---
# implement-change

Your goal is to implement one spec without concurrent writers.

- Read its spec, PRD edits, and container rules.
- _FOR-EACH_ affected container:
  - Execute [codify](../codify/SKILL.md) sequentially. 
- _IF_ acceptance tests need writing or repair,
  - Execute [codify](../codify/SKILL.md) with E2E.
- Keep one writer for shared files and the Git index.

_RETURN_ implemented spec.
