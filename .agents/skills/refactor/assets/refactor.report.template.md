---
source: refactor
target: /planify
scope: {app | container | paths}
run: {ISO date}
status: {green | red}
---
# refactor report — {scope}

## Summary

- Findings: {N} · {b} blocker · {m} major · {n} minor.
- `status: green` means nothing worth refactoring.

## Lenses

- [x] clarity
- [x] ui
- [x] accessibility
- [x] structure
- [x] behavior

## Findings

> One entry per finding, ordered by severity. Every finding preserves behavior and routes to
> `/planify`. A change that would alter what a green e2e test asserts is not a refactor — flag it
> to the human as a `/specify` feature, do not write it here.

### F1: {short title}

- Source: {clarity | ui | accessibility | structure | behavior}
- Where: {container} · {path}:{line} — {recurrence, if systemic}
- Problem: {what decayed}
- Fix: {the minimal change, or the restructure it needs}
- Severity: {blocker | major | minor}
- Kind: {mechanical | functional | structural}
- Handoff: `/planify`
