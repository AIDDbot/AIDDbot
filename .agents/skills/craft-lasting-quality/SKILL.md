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

## Collect Findings

- The `{Product_Folder}/arch/crap.findings.md` is the normalized list of all findings.

### Search for technical debt
- _SPAWN_ a _Craftsman_ agent to
  - Read every `qualify.report.md`, accumulated-debt entry.
  - Report any pending technical debt not yet addressed or already in the `{Product_Folder}/arch/crap.findings.md`.
### Review current code quality
- _SPAWN_ a _Craftsman_ agent to
  - Run available complexity, coverage, and strict-lint checks.
  - Report each CRAP violation, insufficient-coverage, warning, or error with evidence.
### Save findings to be reviewed
  - Normalize durable evidence into `{Product_Folder}/arch/crap.findings.md` using the [finding contract](./references/finding.contract.md).
  - Retain source links and evidence.
  - Deduplicate only findings with identical violated state and scope.
  - Infer finding priority.
  - Keep `pending`, `selected`, `delivered`, `rejected`, and `stale` distinct.

## Select the Top Findings
- Review status and priorities, exclude behavior changes, and mark stale findings.
- Select up to five pending findings sorted by severity, impact, then bounded scope. 

_IF_ no eligible pending findings remain, _RETURN_ the quality report without creating a change.

## Fix the Findings
- Execute [build-requested-change](../build-requested-change/SKILL.md) for the top findings batch
- Ensure change with `origin: craft` and `intent: fix`
- Once the batch is released, mark the findings as `delivered`.

_RETURN_ the released batch or its concrete blocker.
