---
source: verify
target: {/qualify | /codify | caller}
scope: {change_key}
base-revision: {full commit id from the manifest}
evaluated-revision: {full commit id}
run: {ISO date}
status: {green | red | blocked}
specs:
  - {spec_key}
  - {spec_key}
---
# e2e report — {change_key}

## Summary

- Findings: {N} · {b} blocker · {m} major · {n} minor.
- Scenarios: {passed}/{total} · Functional criteria: {met}/{total} marked `[x]` across {N} specs.

## Evidence

| Command or check | Result |
|------------------|--------|
| {exact command or preparation check} | {exit/result and relevant output} |

## Criteria

{Functional specs only. Technical criteria remain for `/qualify`.}

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

## Blocker

{For `blocked`, state the unavailable check, evidence, and caller action. Omit otherwise.}

---

> last updated: {DateTime}
