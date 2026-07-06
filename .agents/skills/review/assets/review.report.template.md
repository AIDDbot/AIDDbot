---
scope: {branch | slug | paths}
run: {ISO date}
suite: green
---
# review report - {scope}

## Summary

- Findings: {total} — {n} a11y, {n} security, {n} performance, {n} clean-code.

## Findings

> Ordered by severity, one entry per finding. Kind routes the handoff:
> `mechanical` → `--fix` or `/codify`; `functional` → `/codify` ({container});
> `structural` → `/planify`; `behavioral` → `/modify`.

### F1: {short title}

- Dimension: {a11y | security | performance | clean-code}
- File: {path}:{line}
- Issue: {what violates the checklist}
- Suggestion: {the minimal fix}
- Severity: {blocker | major | minor}
- Kind: {mechanical | functional | structural | behavioral}
- Handoff: {`/codify` {container} | `/planify` | `/modify` | fixed (`--fix`)}
