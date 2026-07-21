# Review — gate the code against quality standards

`/review` checks the in-scope code against a set of pass/fail quality gates — tooling gates
like lint and type-checking, and checklist gates like accessibility, security, performance,
and clean code. It writes a report with each gate's verdict and routes every failed gate to
a fix. Like `/verify`, it is report-only and never edits code. It plays a Standards
Reviewer: it judges quality, it does not rewrite the work.

## What it's for

Passing the e2e suite proves the behavior is right; it does not prove the code is clean,
safe, or maintainable. `/review` is the quality gate between a verified spec and a release,
and it also serves refactors — when internals are ugly but contracts are intact, the
clean-code gate reports what to fix. Use it after `/verify` reports a spec green, on a
refactor with intact contracts, or on any arbitrary scope (branch changes, files, paths).

Position: it follows `/verify` and hands off to `/release` on a clean pass, or to `/codify`
when any gate fails (behavioral findings route to `/specify`, structural ones to
`/planify`). A red suite hands back to `/verify`.

## In and out

- **Input (required):** a scope — the in-scope spec's code by default, else branch changes,
  files, or paths; it asks the minimum if ambiguous.
- **`specs/{spec_key}/review.report.md`** — a pass/fail verdict for every gate; each failed
  gate lists findings, each with a severity, a kind, and a handoff.

## The rules it never breaks

- **Report-only** — never edits code; failed gates hand off to `/codify`.
- **Green baseline** — the e2e suite is `/verify`'s lane; a red suite hands off to `/verify`.
- **Behavior stays out of scope** — behavioral findings go to `/specify`, structural ones
  to `/planify`.

See [SKILL.md](./SKILL.md) for the exact steps and verification checklist.
