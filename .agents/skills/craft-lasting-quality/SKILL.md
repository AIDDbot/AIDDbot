---
name: craft-lasting-quality
description: Craft lasting quality from evidence-backed solution findings.
metadata:
  aiddbot-kind: orchestrator
user-invocable: true
disable-model-invocation: true
---
# craft-lasting-quality

Your goal is to **maintain solution quality from current, evidence-backed findings**.

- _IF_ the user supplies new defect evidence:
  - Execute [collect-findings](../collect-findings/SKILL.md) before selection.
- _IF_ the user explicitly requests a current quality review:
  - Execute [clean-solution](../clean-solution/SKILL.md) and then [collect-findings](../collect-findings/SKILL.md), even when findings already exist; preserve any accepted unfinished scope.
- Select one eligible scope in this order: a human-named finding, an unfinished `accepted` group, then the most important evidence-backed `pending` finding.
- Confirm that each selected finding still exists. Mark obsolete evidence `stale` and select again.
- An eligible repair either preserves observable behavior or restores an approved contract backed by an active criterion, valid test, or applicable documented rule. Leave a requested contract change or an unsupported expected behavior `pending` and return its need for specification.
- _IF_ no eligible scope was selected and no current review has run:
  - Execute [clean-solution](../clean-solution/SKILL.md), then [collect-findings](../collect-findings/SKILL.md), and select again.
- _IF_ no eligible scope was selected:
  - _RETURN_ no eligible findings without creating a branch or changing code.
- Accept the selected pending findings, assign or reuse one `fix_key`, record the base revision, and create or compatibly reuse `fix/{fix_key}`. Do not proceed over unrelated changes or divergence.
- Execute [fix-defects](../fix-defects/SKILL.md), then [ship-implementation](../ship-implementation/SKILL.md) with the same accepted scope.

_RETURN_ the actual outcome: released remediation, no eligible findings, need for specification, or concrete blocker.
