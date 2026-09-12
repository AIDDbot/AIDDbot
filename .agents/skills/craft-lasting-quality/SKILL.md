---
name: craft-lasting-quality
description: Review current quality and deliver one prioritized correction batch.
metadata:
  aiddbot-kind: orchestrator
user-invocable: true
disable-model-invocation: true
---
# craft-lasting-quality

Your goal is to **review solution quality and deliver one evidence-backed correction batch**.

## Collect findings

- The `{Product_Folder}/findings.md` records durable unresolved findings.
- _SPAWN_ a _Craftsman_ agent to read Findings in `changes/*/report.md`, including accumulated debt, and report unresolved evidence.
- _SPAWN_ a _Craftsman_ agent to run available complexity, coverage, and strict-lint checks.
- Normalize durable evidence into `{Product_Folder}/findings.md` with the [finding contract](./references/finding.contract.md). Deduplicate identical scope and rule; retain source links.

## Select and fix

- Select up to five open repair groups by severity, impact, and bounded scope. Exclude behavior changes and stale evidence.
- _IF_ no eligible finding remains:
  - _RETURN_ the quality report without a change.
- Execute [build-requested-change](../build-requested-change/SKILL.md) with the fixed source set.
- After release, mark only its linked findings resolved.

_RETURN_ the released batch or its concrete blocker.
