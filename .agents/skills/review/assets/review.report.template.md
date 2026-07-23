---
source: review
target: {/release | /codify}   # green → /release · red → /codify
scope: {spec_key | branch | paths}
run: {ISO date}
status: {green | red}
---
# review report — {scope}

## Summary

- Findings: {N} · {b} blocker · {m} major · {n} minor.
- Gates: {passed}/{total} pass.

## Gates

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

- Source: {lint | types | accessibility | security | performance | clean-code}
- Where: {container} · {path}:{line}
- Problem: {what fails the gate}
- Fix: {the minimal change, or the plan/spec it needs}
- Severity: {blocker | major | minor}
- Kind: {mechanical | functional | structural | behavioral}
- Handoff: {`/codify` {container} | `/planify` | `/specify`}
