---
name: fix-defects
description: Fix defects or accepted findings on the active working branch.
metadata:
  aiddbot-kind: worker
user-invocable: false
disable-model-invocation: true
---
# fix-defects

GOAL: fix correctable reported defects or accepted findings on the delivery owner's branch.

DO NOT create or switch branches.
IF owner did not supply compatible non-default working branch:
  RETURN that requirement without writing.
SPLIT multi-container report by container.
FOR EACH part, SEQUENTIALLY:
  SPAWN Builder => FOLLOW [codify](../codify/SKILL.md).
LIMIT changes to reported defects and necessary tests.
IF check is blocked OR required criterion changes:
  RETURN it to caller; DO NOT classify it as code defect.
DO NOT repeat repair against identical evidence UNLESS next attempt has distinct corrective hypothesis.
RETURN short report of fixes, container, and review-meaningful evidence or hypothesis.
