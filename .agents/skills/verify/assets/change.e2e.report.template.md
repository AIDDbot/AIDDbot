---
source: verify
target: {/qualify | /codify}   # green → /qualify · red → /codify
scope: {change_key}
run: {ISO date}
status: {green | red}
specs:
  - {spec_key}
  - {spec_key}
---
# e2e report — {change_key}

## Summary

- Findings: {N} · {b} blocker · {m} major · {n} minor.
- Scenarios: {passed}/{total} · Criteria: {met}/{total} marked `[x]` across {N} specs.

## Criteria

### {spec_key}

- [x] **AC-{spec_id}.1** — pass
- [ ] **AC-{spec_id}.2** — fail → F1

### {spec_key}

- [x] **AC-{spec_id}.1** — pass

## Findings

{One entry per defect, ordered by severity.}

### F1: {scenario title}

- Source: **AC-{spec_id}.{n}** ({spec_key}) — {the acceptance criterion this scenario verifies}
- Where: {container}
- Problem: expected {from the spec/plan} · actual {observed}
- Fix: {the minimal change}
- Severity: {blocker | major | minor}
- Kind: {functional | test}
- Handoff: `/codify` {container}

---

> last updated: {DateTime}
