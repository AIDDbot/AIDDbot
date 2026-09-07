---
name: craft-lasting-quality
description: Craft lasting quality from evidence-backed solution findings.
metadata:
  aiddbot-kind: orchestrator
user-invocable: true
disable-model-invocation: true
---
# craft-lasting-quality

Your goal is to **craft lasting quality** from evidence-backed solution findings.

- Select one behavior-preserving findings scope in this order:
  - A human-named defect or finding.
  - An unfinished `accepted` group.
  - The most important `pending` finding supported by recorded evidence.
  - Normalize new human evidence through [collect-findings](../collect-findings/SKILL.md).
  - Leave behavior-changing findings `pending` and explain why.
- _IF_ no scope was selected:
  - execute [clean-solution](../clean-solution/SKILL.md).
  - execute [collect-findings](../collect-findings/SKILL.md).
  - Select the most important eligible result.
- _IF_ no scope was selected:
  - Report that result.
  - _RETURN_ without creating a branch or changing code.
- Prepare one accepted findings scope on `fix/{fix_key}`.
  - reusing an unfinished compatible scope.
  - Do not proceed over unrelated changes or a divergent branch.
- Execute [fix-defects](../fix-defects/SKILL.md) with that scope.
- Execute [ship-implementation](../ship-implementation/SKILL.md) with the same scope.

_RETURN_ a released remediation with traceable findings.
