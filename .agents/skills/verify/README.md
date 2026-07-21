# Verify — run the e2e suite and report the truth

`/verify` runs the end-to-end suite against a spec's acceptance criteria and writes a
triaged defects report: a verdict for every criterion, plus one entry per defect,
classified by kind and routed to the skill that should handle it. It is strictly
report-only — it never edits code, tests, or plans. It plays a QA Engineer whose job is to
find defects, not hide them.

## What it's for

The green e2e suite is the contract of the whole system. `/verify` runs that suite and
renders judgment — does the implementation satisfy the spec? — in its own session that
cannot also apply fixes, keeping the judge separate from the author. Use it after `/codify`
finishes an e2e run or a fix, or any time you need an honest verdict on a spec's state.

Position: it follows `/codify`; all-green hands off to `/review`, any failure back to
`/codify` (a `structural` defect escalates to `/planify`).

## In and out

- **Input (optional):** the spec (`{spec_key}` or `{slug}`) to verify; it asks if
  ambiguous.
- **`specs/{spec_key}/e2e.report.md`** — a verdict per criterion id, then one entry per
  defect.
- Updated spec checkboxes (`[x]`/`[ ]`) and the spec set to `status: verified` (all pass)
  or `status: failed` (any fail).

## The rules it never breaks

- **Report-only** — never edits code, tests, or plans; touches only the report and spec
  status/criteria.
- **Active criteria only** — anything under `Deprecated criteria` gets no test, verdict, or
  checkbox.
- **Distrust the implementation, trust the spec** — finding defects is a form of success.
- **Never soften the verdict** — a flaky or wrong test is a `test bug`, not waved through.

See [SKILL.md](./SKILL.md) for the exact steps and verification checklist.
