# Verify — run the e2e suite and report the truth

`/verify` runs the end-to-end suite against a spec's acceptance criteria and writes a
triaged defects report: a verdict for every criterion, plus one entry per defect, each
classified by kind and routed to the skill that should handle it. It is strictly
report-only — it never edits code, tests, or plans.

It plays a QA Engineer whose job is to find defects, not to hide them.

## What it's for

The green e2e suite is the contract of the whole system. `/verify` is the skill that
actually runs that suite and renders judgment: does the implementation satisfy the spec?
By keeping verification in its own session — one that cannot also apply fixes — it keeps
the person judging separate from the person who wrote the code.

## When to use it

- After `/codify` finishes an e2e run or a fix, to check whether the criteria are met.
- Any time you need an honest verdict on a spec's current state.

Position: it follows `/codify`; it hands off to `/review` when everything passes or back
to `/codify` when anything fails.

## What you give it

- **Optional:** the spec (`{spec_key}` or `{slug}`) to verify. If it's ambiguous, it asks.

## What it produces

- **`{Product_Folder}/specs/{spec_key}/e2e.report.md`** — a verdict per acceptance-
  criterion id, followed by one entry per defect.
- Updated **spec checkboxes** (`[x]`/`[ ]`) reflecting the suite outcome.
- The spec set to **`status: verified`** (all criteria pass) or **`status: failed`**
  (any criterion fails).

## How it behaves (the rules it never breaks)

- **Report-only.** It never edits code, tests, or plans, and never applies a fix. It
  touches only the report and the spec's status/criteria.
- **Active criteria only.** Anything under `Deprecated criteria` gets no test, no verdict,
  and no checkbox.
- **Distrust the implementation, trust the spec.** Finding defects is a form of success,
  not a failure of the run.
- **Never soften the verdict.** A flaky or wrong test is reported as a `test bug`, not
  waved through.

## How it works, step by step

1. **Research.** It identifies the spec (asking if ambiguous), reads the active
   acceptance criteria, and reads the scenario-to-criterion mapping in `e2e.plan.md`.
2. **Plan.** It selects the tests that must run (their titles carry the criterion ids),
   reads the start/test commands and fixtures from the agent-rules file, and reads API or
   data field shapes when it must assert responses or persisted state. It reads the
   defects-report template and prepares its content.
3. **Implement.** It runs the affected tests (or all tests as a last resort), writes the
   report with a verdict per criterion and one entry per defect, and updates the spec's
   checkboxes from the outcome. If every criterion passes it sets `status: verified` and
   hands off to `/review`; otherwise it sets `status: failed` and hands off to `/codify`.
   It commits with `docs(e2e): {spec_key} report`.

## How you know it worked

- Every active criterion has a mapped test, a report verdict, and its checkbox in the spec.
- No deprecated criterion was verified, given a verdict, or checked.
- The spec's status is `verified` or `failed`, matching the suite outcome.
- The suite is green, or every defect carries a kind and a handoff.
- No code, test, plan, or corrective edit was made — report and status only.

## Where it hands off

- **All green →** `/review`, to gate the code's quality.
- **Any failure →** `/codify`, with each defect triaged: `code bug` and `test bug` go to
  `/codify`; a `structural` defect escalates to `/planify`.
