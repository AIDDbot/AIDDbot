---
name: craft-lasting-quality
description: Review current quality and deliver selected repairs.
metadata:
  aiddbot-kind: orchestrator
user-invocable: true
disable-model-invocation: true
---
# craft-lasting-quality

Your goal is to reduce current quality debt with evidence-backed specs.

- _SPAWN_ a _Craftsman_ agent to: 
  - read `{Product_Folder}/quality/findings.md`, 
  - qualification reports from shipped specs, 
  - and `{Product_Folder}/quality/review.md`; 
  - normalize findings with the [finding contract](./references/finding.contract.md).
- _SPAWN_ a _Craftsman_ agent to: 
  - run only team-configured quality tools against the shipped revision. 
  - Confirm actionable results, record their evidence in `quality/review.md`, and deduplicate the index. 
  - Missing tools are not findings or blockers.
- _SPAWN_ an _Architect_ agent to: 
  - recheck selected findings, 
  - remove invalid, obsolete, or duplicate entries with evidence, and 
  - group remaining findings with one coherent repair.
  - _IF_ no eligible group remains:
    - _RETURN_ the quality review.
  - Execute [build-requested-change](../build-requested-change/SKILL.md) for one selected repair spec.

_RETURN_ the shipped repair spec or its concrete blocker.
