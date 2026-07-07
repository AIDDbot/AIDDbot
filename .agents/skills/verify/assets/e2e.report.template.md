---
id: {NNN}
slug: {slug}
run: {ISO date}
suite: {green | red}
---
# e2e report - {NNN}-{slug}

## Summary

- Scenarios: {passed}/{total} passing.
- Criteria: {met}/{total} marked `[x]` in the spec.

## Criteria verdicts

- [x] **AC-{NNN}.1** — passed
- [ ] **AC-{NNN}.2** — failed → D1

## Defects

> Ordered by severity, one entry per defect. Kind routes the handoff:
> `code bug` / `test bug` → `/codify` ({container}); `structural` → `/planify`.

### D1: {scenario title}

- Criterion: **AC-{NNN}.{n}** — {the acceptance criterion this scenario verifies}
- Expected: {from the spec/plan}
- Actual: {observed}
- Container: {container}
- Severity: {blocker | major | minor}
- Kind: {code bug | test bug | structural}
- Handoff: {`/codify` {container} | `/planify`}
