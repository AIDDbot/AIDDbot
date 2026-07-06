---
name: review
description: Audit a code scope for defects (a11y, security, perf) and clean-code/DRY; report findings with handoffs. Report-only unless --fix.
user-invocable: true
disable-model-invocation: true
---
# Review

## Role
Act as Standards Reviewer.

## Task
Evaluate a code scope against the merged checklist (quality + risk) and write the findings
report, each finding with a severity and a handoff. Report-only by default; with `--fix`,
apply the mechanical findings directly.

## Guardrails
1. **Green baseline gate** — refuse to start on a failing suite; run `/verify` first —
   findings on red mix with known defects.
2. **Report-only by default** — no code edits; fixes route to `/codify`. With an explicit
   `--fix`, apply only `mechanical` findings (renames, dead code, extractions) with
   minimal diffs — never touching tests or shared contracts.
3. **Behavior findings are not yours** — a finding whose fix would change observable
   behavior needs a spec: route it to `/specify`; restructuring contracts or component
   boundaries routes to `/planify`.

## Context
- CAUTION: This is a listing. Read only when necessary.
- `{Specs}` = `{Product_Folder}/specs/{slug}`.

### Inputs
- A scope, one of: feature branch changes, plan/spec files, or explicit paths.
- Optional `--fix` — also apply the mechanical findings.
> Ask the minimum questions if the scope is ambiguous.

### References
- [`review.guidelines.md`](./references/review.guidelines.md) (read, always) — a11y,
  security, performance, clean-code/DRY.
- [`review.report.template.md`](./assets/review.report.template.md) (write-from, always).

### Glossary
- **Finding** — a checklist violation in one of the four dimensions.
- **Mechanical finding** — behavior-preserving and locally contained (rename, dead code,
  extraction); the only kind `--fix` may apply, proven by the untouched suite staying green.

## Steps
### 1. Research
- List the files in scope; ask the minimum questions if ambiguous.
- Run the test suite — a green baseline is required (see Guardrails).

### 2. Plan
- Walk each file against the checklist (data flow, trust boundaries, UI surface, I/O,
  structure).
- Collect the findings per dimension, each with severity, kind, and handoff.

### 3. Implement
- Write `{Specs}/review.report.md` from the template when the scope maps to a spec;
  otherwise deliver the findings in chat (or "No findings").
- With `--fix`: apply each mechanical finding with a minimal diff, re-read the file,
  re-run the suite, and mark it `fixed` in the report.
- Commit — `docs(review)` for the report, plus one `refactor(scope)` commit for `--fix`
  changes with a body of one bullet per finding.
- Suggest `/codify` with the report per affected container for the remaining findings,
  `/verify` to re-run after fixes land, then `/release`.

## Verification
- [ ] Every scope file was considered across all four dimensions.
- [ ] Every finding has a dimension, severity, kind, and handoff.
- [ ] No code was edited beyond `--fix` mechanical findings; the suite is green.
