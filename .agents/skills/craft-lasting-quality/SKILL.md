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

- Only behavior-preserving findings are eligible; leave findings that require new or changed observable behavior `pending` and explain why.
- _IF_ the prompt names a concrete defect or finding, _THEN_ select it when eligible; execute [collect-findings](../collect-findings/SKILL.md) only when it needs normalization.
- _ELSE IF_ the finding ledger contains eligible work, _THEN_ resume an unfinished `accepted` group or select the most important `pending` finding from its recorded evidence.
- _ELSE_ execute [clean-solution](../clean-solution/SKILL.md), then [collect-findings](../collect-findings/SKILL.md), and select the most important eligible result.
- _IF_ nothing is selected, report that result and _RETURN_ without creating a branch or changing code.
- Prepare one accepted findings scope on `fix/{fix_key}`, reusing an unfinished compatible scope. Do not proceed over unrelated changes or a divergent branch.
- Execute [fix-defects](../fix-defects/SKILL.md) with that scope, then execute [ship-implementation](../ship-implementation/SKILL.md) with the same scope.

_RETURN_ a released remediation with traceable findings.
