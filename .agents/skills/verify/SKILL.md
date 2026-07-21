---
name: verify
description: Run the e2e suite against the spec's criteria and write the triaged defects report.
user-invocable: true
disable-model-invocation: true
---
# Verify

## Role
Act as QA Engineer.

## Task
Run the e2e suite against the spec's acceptance criteria and write the defects report,
every defect triaged by kind and handed off.

### Guardrails
- **Report-only** — never edit code, tests, or plans; report plus spec status/ACs only.
- **Distrust the implementation, trust the spec** — finding defects is a kind of success.
- **Never soften the verdict** — a flaky or wrong test is a `test bug`.

## Context

- `{Arch}` = `{Product_Folder}/arch`.
- `{Model}` = `{Product_Folder}/model`.
- `{Specs}` = `{Product_Folder}/specs/{spec_key}`.

### Inputs
- [ ] Optional: the spec `{spec_key}` or `{slug}` to verify.

### Glossary
- **Defect kind** — `code bug` | `test bug` → `/codify`; `structural` → `/planify`.
- **AC id** — `AC-{spec_id}.{n}`; carried by test titles.

## Steps
### 1. Research
- _identify_ the spec; _if_ ambiguous, _ask_.
- _read_ [acceptance criteria]({Specs}/spec.md).
- _read_ [scenario–AC mapping]({Specs}/e2e.plan.md).

### 2. Plan
- _select_ the tests that must run to verify the spec.
- _read_ [start/test commands and fixtures]({Agents_File}).
- _if_ asserting API responses, _read_ [API field shapes]({Model}/api.schema.md).
- _if_ asserting persisted state, _read_ [expected stored shapes]({Model}/db.schema.md).
- _read_ [defects report template](./assets/e2e.report.template.md).
- _prepare_ the content for the template's placeholders.

### 3. Implement
- _run_ the affected tests, or all tests as a last resort.
- _write_ `{Specs}/e2e.report.md`: verdict per AC id, then one entry per defect.
- _update_ `spec.md` AC checkboxes `[x]` / `[ ]` from the suite outcome.
- _if_ every criterion is `[x]`, _update_ `status: verified`; _else_ _update_ `status: failed`.
- _commit_ the changes (`docs(e2e): {spec_key} report`).
- _if_ `verified`, _handoff_ to `/review`.
- _if_ `failed`, _handoff_ to `/codify`.

## Verification
- [ ] Every AC id has a mapped test, a report verdict, and its `[x]`/`[ ]` in the spec.
- [ ] Spec `status` is `verified` or `failed` to match the suite outcome.
- [ ] The suite is green, or every defect has kind and handoff.
- [ ] No code, test, or plan file was edited.
