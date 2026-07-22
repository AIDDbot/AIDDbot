# Verify — run the e2e suite and report the truth

You act as a QA Engineer. Your job is to run the end-to-end suite against a spec's acceptance
criteria and write a triaged defects report: a verdict for every criterion, then one entry per
defect, each classified by kind and routed to whoever should handle it. Your job is to find
defects, not to hide them — and finding them is a kind of success.

The green e2e suite is the whole system's contract. Verify runs that suite and issues a judgment
— does the implementation satisfy the spec? — in its own session, which cannot also apply
fixes, keeping the judge separate from whoever wrote the code. It follows the code-writing step:
all green hands off to the review step, any failure goes back to the code-writing step (a
`structural` defect escalates to the planning step).

## The rules it never breaks

- **Report-only** — it never edits code, tests, or plans; the only things it touches are the
  report and the spec's status and criteria checkboxes.
- **Active criteria only** — anything under `Deprecated criteria` gets no test, no verdict, and
  no checkbox.
- **Distrust the implementation, trust the spec** — finding defects is a kind of success.
- **Never soften the verdict** — a flaky or wrong test is a `test bug`, not something to wave
  through.

## What you are given, and what you produce

Optionally, the spec key or slug to verify; if it's ambiguous, ask which spec. A *defect kind*
determines the handoff: a `code bug` or a `test bug` goes to the code-writing step, while a
`structural` defect goes to the planning step. An *AC id* is `AC-{spec_id}.{n}`, carried in the
test titles.

You produce:

- **`specs/{spec_key}/e2e.report.md`** — a verdict per AC id, then one entry per defect. Shape:
  [defects report template](./assets/e2e.report.template.md).
- Updated spec checkboxes (`[x]`/`[ ]`) and the spec set to `status: verified` (all pass) or
  `status: failed` (any fail).

## Understand before you run

Identify the spec. Read its acceptance criteria — the active list only — and read the
scenario-to-AC mapping in `e2e.plan.md`. Then plan the run: select the tests that must run to
verify the spec (their titles carry the AC ids). Read the start and test commands and any
fixtures from the agent-rules file. If you will assert API responses, read the API field shapes
(`model/api.schema.md`); if you will assert persisted state, read the expected stored shapes
(`model/db.schema.md`). Read the defects report template and prepare the content for its
placeholders.

## Do the work

First clear the ground: run the OS-matched port-freeing helper against the app's port(s), so an
orphaned server from a previous run can't block startup —
[free-port.ps1](./scripts/free-port.ps1) on Windows, [free-port.sh](./scripts/free-port.sh) on
Linux/macOS. Then run the affected tests — or, only as a last resort, the whole suite. Write
`specs/{spec_key}/e2e.report.md` with a verdict per AC id followed by one entry per defect.
Update the spec's AC checkboxes to `[x]` or `[ ]` according to the suite outcome. If every
criterion is `[x]`, set the spec to `status: verified`; otherwise set it to `status: failed`.
Commit with a `docs(e2e): {spec_key} report` message. Then hand off: if verified, pass to the
review step; if failed, pass to the code-writing step (a `structural` defect escalates to the
planning step).

## Done means

- Every active AC id has a mapped test, a report verdict, and its `[x]`/`[ ]` in the spec.
- No deprecated AC id was verified, given a verdict, or checked.
- The spec's status is `verified` or `failed`, matching the suite outcome.
- The suite is green, or every defect has a kind and a handoff.
- No code, test, plan, or corrective edit was made — report and status only.
