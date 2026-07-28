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

> The list is closed. Lint, types, and build are not gates — they are the entry precondition; if
> any is red the scope goes back without a single gate opened. `Ui` applies to frontend scope only.

| Gate | Verdict | Checked against |
|------|---------|-----------------|
| Accessibility | {pass \| fail} | {what you checked it against} |
| Security | {pass \| fail} | {what you checked it against} |
| Performance | {pass \| fail} | {what you checked it against} |
| Clean-code | {pass \| fail} | {what you checked it against} |
| Ui | {pass \| fail \| n/a} | {what you checked it against} |
| Project-rules | {pass \| fail} | {the `{container}.rules.md` files you checked} |

## Criteria

> Refactor specs only — omit this section for a functional spec, whose criteria belong to
> `verify`. This table is the acceptance verdict of a refactor spec: one row per active
> criterion, judged by the gate the criterion names. Mirror each verdict as `[x]` / `[ ]` in the
> spec itself. A gate can pass overall and still leave its criterion unmet.

| Criterion | Judge | Verdict |
|-----------|-------|---------|
| AC-{spec_id}.{n} | {gate named by the criterion} | {pass \| fail} |

## Findings

> One entry per violation under a failed gate — or under an unmet criterion — ordered by
> severity. Kind routes the handoff: `mechanical` / `functional` → `/codify` ({container});
> `structural` → `/planify`; `behavioral` → `/specify`, as a functional spec.

### F1: {short title}

- Gate: {accessibility | security | performance | clean-code | ui | project-rules}
- Where: {container} · {path}:{line}
- Problem: {what fails the gate}
- Fix: {the minimal change, or the plan/spec it needs}
- Severity: {blocker | major | minor}
- Kind: {mechanical | functional | structural | behavioral}
- Handoff: {`/codify` {container} | `/planify` | `/specify`}

## Accumulated decay

> What only shows by adding several specs together, invisible in this diff. It fails no gate —
> note it here as a candidate for its own refactor spec.

- {what decayed, and where}
