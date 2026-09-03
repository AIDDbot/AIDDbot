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

Read and execute [collect-findings](../collect-findings/SKILL.md) before running discovery. _IF_ the prompt requests quality checks, read and execute [clean-solution](../clean-solution/SKILL.md), then collect findings again. _IF_ it requests drift checks, read and execute [clean-drift](../clean-drift/SKILL.md), then collect findings again. Record a refactoring proposal as a finding; do not call it a defect without evidence.

_IF_ no pending findings remain, report that result. Otherwise present the deduplicated remediation scope for approval unless the prompt includes YOLO. _ONCE_ accepted, read and execute [deliver-work](../deliver-work/SKILL.md) with the accepted findings as the requested change. Mark findings `delivered` only after release; retain interrupted or failed work as pending with its evidence.

The result is released remediation with traceable findings.
