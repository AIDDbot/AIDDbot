---
source: qualify
target: {/shipify | /codify | caller}
scope: {spec_key}
base-revision: {full commit id from the spec}
evaluated-revision: {full commit id}
run: {ISO date}
status: {green | red | blocked}
---
# qualify report — {scope}

## Summary

- Findings: {N} · {b} blocker · {m} major · {n} minor.
- Gates: {passed} pass · {not_applicable} n/a · 6 total.

## Evidence

| Command or check | Result |
|------------------|--------|
| {exact command, inspection, or measurement} | {result and relevant output} |

## Gates

| Gate | Verdict | Checked against |
|------|---------|-----------------|
| Accessibility | {pass \| fail \| n/a} | {evidence, or why this gate cannot apply} |
| Security | {pass \| fail \| n/a} | {evidence, or why this gate cannot apply} |
| Performance | {pass \| fail \| n/a} | {evidence, or why this gate cannot apply} |
| Clean-code | {pass \| fail \| n/a} | {evidence, or why this gate cannot apply} |
| Ui | {pass \| fail \| n/a} | {evidence, or why this gate cannot apply} |
| Project-rules | {pass \| fail \| n/a} | {rules checked, or why none can apply} |

## Criteria

{Technical specs only — omit this section for a functional spec.}

| Criterion | Method | Evidence | Verdict |
|-----------|--------|----------|---------|
| AC-{spec_id}.{n} | {method from spec} | {observed result} | {pass \| fail \| blocked} |

## Findings

{One entry per violation, ordered by severity.}

### F1: {short title}

- Gate: {accessibility | security | performance | clean-code | ui | project-rules}
- Where: {container} · {path}:{line}
- Problem: {what fails the gate}
- Fix: {the minimal change, or the plan/spec it needs}
- Severity: {blocker | major | minor}
- Kind: {mechanical | functional | structural | behavioral}
- Handoff: {`/codify` {container} | `/planify` | `/specify`}

## Blocker

{For `blocked`, state the unavailable gate or criterion, evidence, and caller action. Omit otherwise.}

## Accumulated debt

{Evidence-backed debt that fails no gate. `collect-findings` later records it in the finding ledger.}

### D1: {short title}

- Where: {container} · {path}:{line}
- Problem: {what has decayed}
- Rule: {expected state}
- Evidence: {observed facts}

---

> last updated: {DateTime}
