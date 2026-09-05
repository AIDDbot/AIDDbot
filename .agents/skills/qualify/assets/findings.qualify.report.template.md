---
source: qualify
target: {/shipify | /codify | caller}
scope: {fix_key}
findings:
  - {finding_id}
base-revision: {full commit id from the accepted findings}
evaluated-revision: {full commit id}
run: {ISO date}
status: {green | red | blocked}
---
# findings qualification report — {fix_key}

## Summary

- Findings scope: {finding_ids}.
- Diff: `fix/{fix_key}` against {default branch base}.
- Findings: {N} · {b} blocker · {m} major · {n} minor.
- Gates: {passed} pass · {not_applicable} n/a · 6 total.

## Evidence

| Command or check | Result |
|------------------|--------|
| {exact command, inspection, or measurement} | {result and relevant output} |

## Gates

| Gate | Verdict | Checked against |
|------|---------|-----------------|
| Accessibility | {pass \| fail \| n/a \| blocked} | {evidence, or why this gate cannot apply; impediment if blocked} |
| Security | {pass \| fail \| n/a \| blocked} | {evidence, or why this gate cannot apply; impediment if blocked} |
| Performance | {pass \| fail \| n/a \| blocked} | {evidence, or why this gate cannot apply; impediment if blocked} |
| Clean-code | {pass \| fail \| n/a \| blocked} | {evidence, or why this gate cannot apply; impediment if blocked} |
| Ui | {pass \| fail \| n/a \| blocked} | {evidence, or why this gate cannot apply; impediment if blocked} |
| Project-rules | {pass \| fail \| n/a \| blocked} | {rules checked, or why none can apply; impediment if blocked} |

## Behavior boundary

{Confirm the diff preserves observable behavior. A behavior change is red and remains outside this delivery scope.}

## Findings

{One entry per violation, ordered by severity.}

### F1: {short title}

- Gate: {accessibility | security | performance | clean-code | ui | project-rules}
- Where: {container} · {path}:{line}
- Problem: {what fails the gate}
- Fix: {the minimal change}
- Severity: {blocker | major | minor}
- Kind: {mechanical | structural | behavioral}
- Handoff: `/codify` {container}

## Blocker

{For `blocked`, state the unavailable gate, evidence, and caller action. Omit otherwise.}

## Accumulated debt

{Evidence-backed debt that fails no gate. `collect-findings` later records it in the finding ledger.}

### D1: {short title}

- Where: {container} · {path}:{line}
- Problem: {what has decayed}
- Rule: {expected state}
- Evidence: {observed facts}

---

> last updated: {DateTime}
