---
source: qualify
target: {/shipify | /codify}   # green → /shipify · red → /codify
scope: {spec_key}
run: {ISO date}
status: {green | red}
---
# qualify report — {scope}

## Summary

- Findings: {N} · {b} blocker · {m} major · {n} minor.
- Gates: {passed}/{total} pass.

## Gates

| Gate | Verdict | Checked against |
|------|---------|-----------------|
| Accessibility | {pass \| fail} | {what you checked it against} |
| Security | {pass \| fail} | {what you checked it against} |
| Performance | {pass \| fail} | {what you checked it against} |
| Clean-code | {pass \| fail} | {what you checked it against} |
| Ui | {pass \| fail \| n/a} | {what you checked it against} |
| Project-rules | {pass \| fail} | {the `{container}.rules.md` files you checked} |

## Criteria

{Technical specs only — omit this section for a functional spec.}

| Criterion | Judge | Verdict |
|-----------|-------|---------|
| AC-{spec_id}.{n} | {gate named by the criterion} | {pass \| fail} |

## Findings

{One entry per violation, ordered by severity.}

### F1: {short title}

- Gate: {crap | mutation | accessibility | security | performance | clean-code | ui | project-rules}
- Where: {container} · {path}:{line}
- Problem: {what fails the gate}
- Fix: {the minimal change, or the plan/spec it needs}
- Severity: {blocker | major | minor}
- Kind: {mechanical | functional | structural | behavioral}
- Handoff: {`/codify` {container} | `/planify` | `/specify`}

## Accumulated debt

{Evidence-backed debt that fails no gate. `collect-findings` later records it in the finding ledger.}

### D1: {short title}

- Where: {container} · {path}:{line}
- Problem: {what has decayed}
- Rule: {expected state}
- Evidence: {observed facts}

---

> last updated: {DateTime}
