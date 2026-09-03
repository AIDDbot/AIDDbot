---
source: verify
target: {/qualify | /codify}
scope: {fix_key}
findings:
  - {finding_id}
run: {ISO date}
status: {green | red}
---
# e2e regression report — {fix_key}

## Summary

- Findings scope: {finding_ids}.
- Suite: {passed}/{total} scenarios passed.
- Findings: {N} · {b} blocker · {m} major · {n} minor.

## Regression result

{The existing E2E suite is the behavior-preservation contract. No acceptance criteria are added or ticked.}

## Findings

{One entry per functional or test defect, ordered by severity.}

### F1: {scenario title}

- Where: {container}
- Problem: expected {existing behavior} · actual {observed}
- Fix: {the minimal change}
- Severity: {blocker | major | minor}
- Kind: {functional | test}
- Handoff: `/codify` {container}

---

> last updated: {DateTime}
