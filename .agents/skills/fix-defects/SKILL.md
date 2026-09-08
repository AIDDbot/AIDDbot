---
name: fix-defects
description: Fix correctable evidence for a change without creating a plan.
metadata:
  aiddbot-kind: worker
user-invocable: false
disable-model-invocation: true
---
# fix-defects

Your goal is to fix correctable reported defects or selected Craft findings on the change owner's branch.

- Do not create or switch branches.
- _IF_ the owner did not supply a compatible non-default working branch:
  - _RETURN_ that requirement without writing.
- Split a multi-container report by container.
- _FOR-EACH_ part:
  - Spawn Builder and execute [codify](../codify/SKILL.md) sequentially from the finding evidence without a plan artifact.
- Limit changes to reported defects and necessary tests.
- _IF_ a check is blocked or a required criterion changes:
  - Do not classify it as a code defect.
  - _RETURN_ it to the caller.
- Do not repeat repair against identical evidence unless the next attempt has a distinct corrective hypothesis.

_RETURN_ fixes, container, and evidence needed to repeat every applicable proof stage for the complete change.
