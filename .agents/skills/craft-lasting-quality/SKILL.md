---
name: craft-lasting-quality
description: Craft lasting quality from evidence-backed solution findings.
metadata:
  aiddbot-kind: orchestrator
user-invocable: true
disable-model-invocation: true
---
# craft-lasting-quality

Your goal is to turn durable solution findings into released remediation.

Read and execute [clean-solution](../clean-solution/SKILL.md), then [collect-findings](../collect-findings/SKILL.md) once. Do not accept unreported structural requests.

_IF_ no pending findings remain, report that result. Leave any finding that needs new or changed observable behavior pending and explain that it is outside this skill's contract. Present the remaining deduplicated remediation scope for approval unless the prompt includes YOLO.

_ONCE_ accepted, derive one `{fix_key}`, mark every scoped finding `accepted` with that `Fix`, and create and checkout `fix/{fix_key}`. Do not proceed over unrelated changes or an existing divergent branch. Read and execute [fix-defects](../fix-defects/SKILL.md) with the accepted findings, then read and execute [ship-implementation](../ship-implementation/SKILL.md) with the same findings scope. Keep interrupted work accepted with its branch and evidence; only release marks it delivered.

The result is released remediation with traceable findings.
