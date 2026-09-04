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

- Execute [clean-solution](../clean-solution/SKILL.md) command, 
- Execute [collect-findings](../collect-findings/SKILL.md) command. 
- _IF_ no pending findings remain, 
  - Report that result. 
- _IF_ findings require new or changed observable behavior, 
  - Leave it pending and explain that it is outside this skill's contract. 
- _ASK_ for approval of the remaining deduplicated remediation scope unless the prompt includes YOLO.
- _ONCE_ accepted or YOLO, 
  - Derive one `{fix_key}`, mark every scoped finding `accepted` with that `Fix`, and create and checkout `fix/{fix_key}`. 
  - Do not proceed over unrelated changes or an existing divergent branch. 
  - Execute [fix-defects](../fix-defects/SKILL.md) command with the accepted findings, 
  - Execute [ship-implementation](../ship-implementation/SKILL.md) command with the same findings scope. 

_RETURN_ a released remediation with traceable findings.
