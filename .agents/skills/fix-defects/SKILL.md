---
name: fix-defects
description: Repair correctable findings on a change branch and return current evidence needs.
metadata:
  aiddbot-kind: worker
user-invocable: false
disable-model-invocation: true
---
# fix-defects

Your goal is to repair correctable reported findings on the owner branch.

- _IF_ no compatible non-default branch is supplied:
  - _RETURN_ that requirement without writing.
- _IF_ the repair needs coordination, changed criteria, or a new migration/reversal plan:
  - _RETURN_ it to the owner for change or plan revision.
- _FOR-EACH_ affected container:
  - Execute [codify](../codify/SKILL.md) sequentially from the findings.
- Do not repeat identical evidence without a distinct corrective hypothesis.

_RETURN_ repairs and the checks that need refreshing.
