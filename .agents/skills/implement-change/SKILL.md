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
- _IF_ the spec assigns acceptance-test creation, updates, deletion, or repair:
    - Execute [codify](../codify/SKILL.md) with E2E and the complete acceptance-test change scope or findings.
- Reconcile the implementation and test diff with every action in the approved spec; return missing work as a blocker.

_RETURN_ the implementation result or blocker.
