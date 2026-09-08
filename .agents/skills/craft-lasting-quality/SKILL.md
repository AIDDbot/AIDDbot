---
name: craft-lasting-quality
description: Review current quality and deliver one prioritized batch of corrections.
metadata:
  aiddbot-kind: orchestrator
user-invocable: true
disable-model-invocation: true
---
# craft-lasting-quality

Your goal is to review current solution quality and deliver one evidence-backed correction batch.

- Do not accept a human-supplied defect, finding selection, or priority; route requested corrections through `/build-requested-change`.
- _IF_ an unfinished Craft change exists:
  - Resume its fixed finding set without adding newly discovered findings.
- _IF_ no unfinished Craft change exists:
  - Execute [clean-solution](../clean-solution/SKILL.md), then [collect-findings](../collect-findings/SKILL.md).
  - Confirm current evidence and mark obsolete findings `stale`.
  - Group findings with one cause and correction as one repair group.
  - Select up to five eligible groups by severity, then impact and bounded scope.
  - Exclude work that changes product behavior or needs an unsupported contract or product decision.
- _IF_ no eligible group exists:
  - _RETURN_ no eligible findings without a branch or release.
- Execute [scope-change](../scope-change/SKILL.md) to classify one `origin: craft`, `intent: fix` change referencing the fixed batch. Its policy always skips planning and requires one final verification; qualification follows complexity.
- Execute [deliver-change](../deliver-change/SKILL.md) once for the batch.

_RETURN_ one released remediation batch, no eligible findings, or a concrete blocker.
