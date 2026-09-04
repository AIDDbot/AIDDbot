---
name: fix-defects
description: Fix defects or accepted findings on the active working branch.
metadata:
  aiddbot-kind: worker
user-invocable: false
disable-model-invocation: true
---
# fix-defects

Your goal is to **fix defects or accepted findings** described by a report.

- _IF_ your are in a default branch, switch to a new fix branch before proceeding.
- Spawn a new **Builder** sub-agent to run the [codify skill](../codify/SKILL.md) with the defect report or accepted findings in hand.
- Limit changes to the reported defects and their necessary tests.

_RETURN_ a short report of the defects fixed.
