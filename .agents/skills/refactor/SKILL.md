---
name: refactor
description: Report behavior-preserving refactor opportunities in changed code; never edit — `/codify` applies.
user-invocable: true
disable-model-invocation: true
---
# Refactor

## Role
Act as Refactoring Reviewer.

## Task
Scan the in-scope code for complexity that hurts clarity, judged against a refactoring catalog.
Write a report of behavior-preserving opportunities. Route every opportunity to `/codify`.

### Guardrails
- **Report-only** — never edit code; opportunities apply via `/codify`.
- **Preserve behavior** — every opportunity keeps inputs, outputs, side effects, and errors identical; if unsure, drop it.
- **Scope to what changed** — default to the changed code or the named container; no drive-by refactors.
- **Convention over preference** — refactor toward the project's rules and neighbors, not external taste.
- **No tests here** — `/codify` owns unit tests and `/verify` owns e2e; refactor runs neither.

## Context

- `{Rules}` = `{Agents_Folder}/rules`.
- `{Refactors}` = `{Product_Folder}/refactors`.

### Inputs
- [ ] Required: a scope — the changed code by default, or a container or paths.

### References
- _read_ [refactoring patterns](./references/refactor.patterns.md) — what to look for.
- _read_ [report template](./assets/refactor.report.template.md).

### Glossary
- **Opportunity** — one refactor at a file and line, with the change and a behavior-preserving note.
- **Pattern** — a concrete complexity signal from the catalog (e.g. deep nesting, a generic name).
- **{slug}** — a short kebab-case name for the pass; groups the report under `{Refactors}/{slug}`.

## Steps
### 1. Research
- _identify_ the scope: the changed code by default, else the given container or paths.
- _if_ the scope is ambiguous, _ask_ the minimum questions.
- _derive_ `{slug}` from the scope — the container name or a short label.
- _list_ the files in scope.
- _read_ each in-scope container's [rules]({Rules}/{container}.rules.md).

### 2. Plan
- _read_ [refactoring patterns](./references/refactor.patterns.md).
- _read_ [report template](./assets/refactor.report.template.md).
- _walk_ each scope file for the catalog patterns — structure, naming, redundancy.
- _for-each_ opportunity, _capture_ file and line, the pattern, the minimal change, and why behavior holds.
- _drop_ any opportunity whose behavior preservation is uncertain.
- _prepare_ the content for the template's placeholders.

### 3. Implement
- _write_ `{Refactors}/{slug}/refactor.report.md`.
- _commit_ the changes (`docs(refactor): {slug}`).
- _if_ the report lists any opportunity, _handoff_ to `/codify`.
- _else_ _reply_ "Nothing to refactor".

## Verification
- [ ] `{Refactors}/{slug}/refactor.report.md` exists, in the template format, no placeholders left.
- [ ] Every opportunity has a file, a line, a pattern, a minimal change, and a behavior-preserving note.
- [ ] No opportunity changes inputs, outputs, side effects, or error behavior.
- [ ] Scope stayed on the changed code or the named container; no drive-by findings.
- [ ] The report routes opportunities to `/codify`, or says there is nothing to refactor.
