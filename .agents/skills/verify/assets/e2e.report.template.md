---
source: verify
target: {/qualify | /codify}   # green → /qualify · red → /codify
scope: {spec_key}
run: {ISO date}
status: {green | red}
---
# e2e report — {spec_key}

## Summary

- Findings: {N} · {b} blocker · {m} major · {n} minor.
- Scenarios: {passed}/{total} · Criteria: {met}/{total} marked `[x]`.

## Criteria

- [x] **AC-{spec_id}.1** — pass
- [ ] **AC-{spec_id}.2** — fail → F1

## Findings

{One entry per defect, ordered by severity.}

### F1: {scenario title}

- Source: **AC-{spec_id}.{n}** — {the acceptance criterion this scenario verifies}
- Where: {container}
- Problem: expected {from the spec/plan} · actual {observed}
- Fix: {the minimal change}
- Severity: {blocker | major | minor}
- Kind: {functional | test}
- Handoff: `/codify` {container}

---

> last updated: {DateTime}