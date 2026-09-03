---
source: qualify
target: {/shipify | /codify}
scope: {fix_key}
findings:
  - {finding_id}
run: {ISO date}
status: {green | red}
---
# findings qualification report — {fix_key}

## Summary

- Findings scope: {finding_ids}.
- Diff: `fix/{fix_key}` against {default branch base}.
- Findings: {N} · {b} blocker · {m} major · {n} minor.
- Gates: {passed}/{total} pass.

## Gates

| Gate | Verdict | Checked against |
|------|---------|-----------------|
| Accessibility | {pass \| fail} | {what you checked} |
| Security | {pass \| fail} | {what you checked} |
| Performance | {pass \| fail} | {what you checked} |
| Clean-code | {pass \| fail} | {what you checked} |
| Ui | {pass \| fail \| n/a} | {what you checked} |
| Project-rules | {pass \| fail} | {the `{container}.rules.md` files checked} |

## Behavior boundary

{Confirm the diff preserves observable behavior. A behavior change is red and remains outside this delivery scope.}

## Findings

{One entry per violation, ordered by severity.}

### F1: {short title}

- Gate: {crap | mutation | accessibility | security | performance | clean-code | ui | project-rules}
- Where: {container} · {path}:{line}
- Problem: {what fails the gate}
- Fix: {the minimal change}
- Severity: {blocker | major | minor}
- Kind: {mechanical | structural | behavioral}
- Handoff: `/codify` {container}

## Accumulated debt

{Evidence-backed debt that fails no gate. `collect-findings` later records it in the finding ledger.}

### D1: {short title}

- Where: {container} · {path}:{line}
- Problem: {what has decayed}
- Rule: {expected state}
- Evidence: {observed facts}

---

> last updated: {DateTime}
