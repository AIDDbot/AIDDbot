---
source: verify
target: {/qualify | /codify | caller}
scope: {fix_key}
findings:
  - {finding_id}
base-revision: {full commit id from the accepted findings}
evaluated-revision: {full commit id}
run: {ISO date}
status: {green | red | blocked}
---
# e2e regression report — {fix_key}

## Summary

- Findings scope: {finding_ids}.
- Suite: {passed}/{total} scenarios passed.
- Findings: {N} · {b} blocker · {m} major · {n} minor.

## Regression result

{The existing E2E suite is the behavior-preservation contract. No acceptance criteria are added or ticked.}

## Evidence

| Command or check | Result |
|------------------|--------|
| {exact command or preparation check} | {exit/result and relevant output} |

## Findings

{One entry per functional or test defect, ordered by severity.}

### F1: {scenario title}

- Where: {container}
- Problem: expected {existing behavior} · actual {observed}
- Fix: {the minimal change}
- Severity: {blocker | major | minor}
- Kind: {functional | test}
- Handoff: `/codify` {container}

## Blocker

{For `blocked`, state the unavailable check, evidence, and caller action. Omit otherwise.}

---

> last updated: {DateTime}
