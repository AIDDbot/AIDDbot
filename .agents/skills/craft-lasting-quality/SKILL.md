---
name: craft-lasting-quality
description: Review current quality and deliver one prioritized batch of corrections.
metadata:
  aiddbot-kind: orchestrator
user-invocable: true
disable-model-invocation: true
---
# craft-lasting-quality

Your goal is to **review solution quality and deliver one evidence-backed correction batch**.

- Do not accept human-supplied defects, finding selections, or priorities.
- Resume any unfinished Craft change with its fixed finding set.
- _IF_ no unfinished Craft change exists:
  - Execute [clean-solution](../clean-solution/SKILL.md), then [collect-findings](../collect-findings/SKILL.md).
  - Confirm evidence, mark obsolete findings `stale`, and group findings sharing one cause and correction.
  - Select up to five groups by severity, impact, then bounded scope. Exclude behavior changes, unsupported contracts, and unresolved product decisions.
- _IF_ no eligible group exists:
  - _RETURN_ no eligible findings without a branch or release.
- Execute [scope-change](../scope-change/SKILL.md) for the fixed batch with `origin: craft` and `intent: fix`, then [deliver-change](../deliver-change/SKILL.md) once.
