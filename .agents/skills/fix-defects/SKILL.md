---
name: fix-defects
description: Fix defects or accepted findings on the active working branch.
metadata:
  aiddbot-kind: worker
user-invocable: false
disable-model-invocation: true
---
# fix-defects

Your goal is to fix correctable defects or accepted findings described by a report on the delivery owner's branch.

Never create or switch branches. If the owner did not supply a compatible non-default working branch, return that requirement without writing. Split a multi-container report by container and send each part sequentially to a Builder following [codify](../codify/SKILL.md). Limit changes to the reported defects and their necessary tests.

Do not treat a blocked check or a required criterion change as a code defect. Return it to the caller. Do not repeat a repair against identical evidence unless the next attempt has a distinct corrective hypothesis.

The result is a short report of the fixes, their container, and the evidence or hypothesis that makes another review meaningful.
