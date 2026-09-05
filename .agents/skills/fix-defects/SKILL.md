---
name: fix-defects
description: Fix defects or accepted findings on the active working branch.
metadata:
  aiddbot-kind: worker
user-invocable: false
disable-model-invocation: true
---
# fix-defects

_GOAL_: fix correctable reported defects or accepted findings on the delivery owner's branch.

_DO-NOT_ create or switch branches.
_IF_ owner did not supply compatible non-default working branch:
  _RETURN_ that requirement without writing.
SPLIT multi-container report by container.
_FOR-EACH_ part, _SEQUENTIALLY_:
  _SPAWN_ Builder => _FOLLOW_ [codify](../codify/SKILL.md).
_LIMIT_ changes to reported defects and necessary tests.
_IF_ check is blocked _OR_ required criterion changes:
  _RETURN_ it to caller; _DO-NOT_ classify it as code defect.
_DO-NOT_ repeat repair against identical evidence UNLESS next attempt has distinct corrective hypothesis.
_RETURN_ short report of fixes, container, and review-meaningful evidence or hypothesis.
