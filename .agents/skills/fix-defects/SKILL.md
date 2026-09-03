---
name: fix-defects
description: Fix defects described by a review or code-hygiene report.
metadata:
  aiddbot-kind: worker
user-invocable: false
disable-model-invocation: true
---
# fix-defects

Your goal is to fix defects described by a report.

- _IF_ invoked during `deliver-spec` or `deliver-change`, keep the active working branch.
- _IF_ invoked by a hygiene skill while on the default branch, create and checkout `fix/{slug}` from the report scope.
- Spawn a new **Builder** sub-agent to run the [codify skill](../codify/SKILL.md) with the defect report in hand.
- Limit changes to the reported defects and their necessary tests.

Return a short report of the defects fixed.
