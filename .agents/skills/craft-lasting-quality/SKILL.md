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

- _IF_ the prompt identifies a concrete defect or finding,
  - _THEN_ use it as the human-prioritized remediation scope. If it is not yet recorded, execute [collect-findings](../collect-findings/SKILL.md) with that instruction as current defect evidence and use the normalized finding.
- _ELSE_ inspect the durable finding ledger before running new checks.
  - _IF_ one compatible `accepted` group is unfinished, _THEN_ resume its existing `Fix` first.
  - _ELSE IF_ eligible `pending` findings exist, _THEN_ select the most important compatible scope using only recorded severity and evidence; never invent product priority.
- _IF_ no eligible recorded scope exists,
  - _THEN_ execute [clean-solution](../clean-solution/SKILL.md), then execute [collect-findings](../collect-findings/SKILL.md) with its current report.
  - _THEN_ select the human-named finding, when present, or the most important eligible `pending` scope using recorded severity and evidence.
- _IF_ no eligible finding remains, report that result and _RETURN_ without creating a branch or changing code.
- _IF_ a selected finding requires new or changed observable behavior, leave it `pending`, explain that it is outside this skill's contract, and continue with the next eligible finding; _IF_ none remains, _RETURN_.
- _TREAT_ this invocation and any human-named priority as authorization to remediate the selected scope; do not request a separate scope approval.
- _ONCE_ a scope is selected,
  - Reuse its accepted `{fix_key}` or derive one `{fix_key}`, record the default-branch base, and mark every newly scoped finding `accepted` with that `Fix` and `Base-revision`.
  - Create or compatibly resume `fix/{fix_key}`. Do not proceed over unrelated changes or an existing divergent branch.
  - Execute [fix-defects](../fix-defects/SKILL.md) with the accepted findings.
  - Execute [ship-implementation](../ship-implementation/SKILL.md) with the same findings scope.

_RETURN_ a released remediation with traceable findings.
