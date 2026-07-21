# Review — gate the code against quality standards

`/review` checks the in-scope code against a set of pass/fail quality gates — tooling
gates like lint and type-checking, and checklist gates like accessibility, security,
performance, and clean code. It writes a report with each gate's verdict and routes every
failed gate to a fix. Like `/verify`, it is report-only and never edits code.

It plays a Standards Reviewer: it judges quality, it does not rewrite the work.

## What it's for

Passing the e2e suite proves the behavior is right; it does not prove the code is clean,
safe, or maintainable. `/review` is the quality gate between a verified spec and a
release. It also serves refactors: when internals are ugly but contracts are intact, the
clean-code gate reports what to fix.

## When to use it

- After `/verify` reports a spec green, to gate its code before release.
- On a refactor with intact contracts, to report clean-code violations.
- On an arbitrary scope — branch changes, files, or paths — when you want a quality gate.

Position: it follows `/verify` and hands off to `/release` on a clean pass, or to
`/codify` when any gate fails.

## What you give it

- **Required:** a scope. By default this is the in-scope spec's code; alternatively branch
  changes, specific files, or paths. If the scope is ambiguous it asks the minimum needed.

## What it produces

- **`{Product_Folder}/specs/{spec_key}/review.report.md`** — a pass/fail verdict for every
  gate. Each failed gate lists its findings, each finding carrying a severity, a kind, and
  a handoff.

## How it behaves (the rules it never breaks)

- **Report-only.** It never edits code; failed gates hand off to `/codify`.
- **Green baseline.** The e2e suite is `/verify`'s lane — if the suite is red, `/review`
  hands off to `/verify` rather than proceeding.
- **Behavior stays out of scope.** Behavioral findings route to `/specify` and structural
  ones to `/planify`; `/review` itself judges quality, not what the system should do.

## How it works, step by step

1. **Research.** It identifies the scope (the in-scope spec's code by default, else the
   given input), asking the minimum if ambiguous. It runs the test suite; if it's red it
   hands off to `/verify`. It lists the files in scope.
2. **Plan.** It reads the gate definitions and the report template, runs the linter and
   type checker for the tooling gates, and — for any tooling complaint that is a false
   positive — tunes the rule rather than recording a failure. It walks each scope file
   against every checklist gate (data flow, trust boundaries, UI, I/O), records each
   gate's verdict, and for every failed gate captures findings with severity, kind, and
   handoff.
3. **Implement.** It writes the gate report, commits with `docs(review): …`, and hands
   off: to `/codify` if any gate failed, otherwise to `/release`.

## How you know it worked

- Every gate has a pass/fail verdict for the scope.
- Every failed gate lists findings with severity, kind, and handoff.
- The report routes failures to `/codify` and a clean pass to `/release`.

## Where it hands off

- **A red suite →** `/verify` (that's its lane, not `/review`'s).
- **Any gate failed →** `/codify` to fix (with behavioral findings routed to `/specify`,
  structural ones to `/planify`).
- **All gates pass →** `/release`.
