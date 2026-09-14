---
name: fix-defects
description: Repair correctable findings on a spec branch and return evidence needs.
metadata:
  aiddbot-kind: worker
user-invocable: false
disable-model-invocation: true
---
# fix-defects

Your goal is to repair correctable findings on the owner branch.

- _IF_ no compatible non-default branch is supplied:
  - _RETURN_ that requirement without writing.
- _IF_ the repair changes spec scope or requirements:
  - _RETURN_ it to the owner for a spec decision.
- _FOR-EACH_ affected container:
  - Execute [codify](../codify/SKILL.md) sequentially from the findings.

_RETURN_ repairs and checks that need refreshing.
