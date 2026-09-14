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

- _IF_ the proposed repair requires a different spec scope or requirements:
    - _RETURN_ the required owner decision before editing.
- Execute [implement-change](../implement-change/SKILL.md) on the current spec branch, limited to the supplied repair findings.

_RETURN_ the repair result or blocker.
