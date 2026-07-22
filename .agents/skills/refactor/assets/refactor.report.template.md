---
scope: {app | container | paths}
run: {ISO date}
---
# refactor report - {scope}

## Findings

> One entry per finding, ordered by severity. Kind routes the handoff:
> `mechanical` / `functional` → `/codify` ({container}); `structural` → `/planify`;
> `behavioral` → `/specify`.

### F1: {short title}

- Lens: {clarity | ui | accessibility | structure | behavior}
- File: {path}:{line} — {and how many places it recurs, if systemic}
- Issue: {what decayed}
- Change: {the minimal fix, or the plan/spec it needs}
- Preserves behavior: {yes for /codify and /planify; no — describe the change — for /specify}
- Severity: {blocker | major | minor}
- Kind: {mechanical | functional | structural | behavioral}
- Handoff: {`/codify` {container} | `/planify` | `/specify`}
