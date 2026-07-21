---
name: review
description: Gate a code scope against pass/fail quality gates and report each verdict.
user-invocable: true
disable-model-invocation: true
---
# Review

## Role
Act as Standards Reviewer.

## Task
Gate the in-scope code against a set of pass/fail quality gates — tooling and checklist.
Write a gate report with each gate's verdict. Route every failed gate to a fix.

### Guardrails
- **Report-only** — never edit code; failed gates hand off to `/codify`.
- **Green baseline** — the e2e suite is `/verify`'s lane; a red suite hands off to `/verify`.
- **Behavior stays out** — behavioral findings go to `/specify`, structural ones to `/planify`.

## Context

- `{Specs}` = `{Product_Folder}/specs/{spec_key}`.

### Inputs
- [ ] Required: a scope — the in-scope spec's code by default; or branch changes, files, paths.

### Glossary
- **Gate** — a pass/fail check the scope must clear; a failure becomes a finding.
- **Finding** — one violation under a failed gate, with severity, kind, and handoff.

## Steps
### 1. Research
- _identify_ the scope: the in-scope spec's code by default, else the given input.
- _if_ the scope is ambiguous, _ask_ the minimum questions.
- _run_ the test suite.
- _if_ red, _handoff_ to `/verify`.
- _list_ the files in scope.

### 2. Plan
- _read_ [gate definitions](./references/review.gates.md).
- _read_ [gate report template](./assets/review.report.template.md).
- _run_ the linter and type checker for the tooling gates.
- _if_ a defect is a false positive, _tune_ the rule; _else_ _record_ a gate failure.
- _walk_ each scope file against every checklist gate — data flow, trust boundaries, UI, I/O.
- _record_ each gate's verdict.
- _for-each_ failed gate, _capture_ its findings with severity, kind, and handoff.
- _prepare_ the content for the template's placeholders.

### 3. Implement
- _write_ `{Specs}/review.report.md`.
- _commit_ the changes (`docs(review): {description}`).
- _if_ any gate failed, _handoff_ to `/codify`; _else_ _handoff_ to `/release`.

## Verification
- [ ] Every gate has a pass/fail verdict for the scope.
- [ ] Every failed gate lists findings with severity, kind, and handoff.
- [ ] The report routes failures to `/codify` and a clean pass to `/release`.
