---
scope: {spec-key | branch | paths}
run: {ISO date}
suite: {green | red}
---
# review report - {scope}

## Gates

> Each gate is pass or fail. Failed gates list their findings below.

| Gate | Verdict |
|------|---------|
| Lint | {pass \| fail} |
| Types | {pass \| fail} |
| Accessibility | {pass \| fail} |
| Security | {pass \| fail} |
| Performance | {pass \| fail} |
| Clean-code | {pass \| fail} |

## Findings

> One entry per violation under a failed gate, ordered by severity. Kind routes the handoff:
> `mechanical` / `functional` → `/codify` ({container}); `structural` → `/planify`;
> `behavioral` → `/specify`.

### F1: {short title}

- Gate: {lint | types | accessibility | security | performance | clean-code}
- File: {path}:{line}
- Issue: {what fails the gate}
- Suggestion: {the minimal fix}
- Severity: {blocker | major | minor}
- Kind: {mechanical | functional | structural | behavioral}
- Handoff: {`/codify` {container} | `/planify` | `/specify`}
