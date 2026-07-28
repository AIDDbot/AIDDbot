---
source: qualify
target: {/release | /codify}   # green → /release · red → /codify
scope: {spec_key | branch | paths}
run: {ISO date}
status: {green | red}
---
# qualify report — {scope}

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

## Criteria

> Non-functional specs only — omit this section for a functional spec, whose criteria belong to
> `/verify`. This table is the acceptance verdict of a non-functional spec: one row per active
> criterion, judged by the gate the criterion names. Mirror each verdict as `[x]` / `[ ]` in the
> spec itself. A gate can pass overall and still leave its criterion unmet.

| Criterion | Gate | Verdict |
|-----------|------|---------|
| AC-{spec_id}.{n} | {gate named by the criterion} | {pass \| fail} |

## Findings

> One entry per violation under a failed gate — or under an unmet criterion — ordered by
> severity. Kind routes the handoff: `mechanical` / `functional` → `/codify` ({container});
> `structural` → `/planify`; `behavioral` → `/specify`, as a functional spec.

### F1: {short title}

- Source: {lint | types | accessibility | security | performance | clean-code}
- Where: {container} · {path}:{line}
- Problem: {what fails the gate}
- Fix: {the minimal change, or the plan/spec it needs}
- Severity: {blocker | major | minor}
- Kind: {mechanical | functional | structural | behavioral}
- Handoff: {`/codify` {container} | `/planify` | `/specify`}
