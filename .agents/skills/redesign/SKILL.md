---
name: redesign
description: Report UI/design-system and accessibility opportunities in frontend code; never edit — `/codify` applies.
user-invocable: true
disable-model-invocation: true
---
# Redesign

## Role
Act as UI Redesign Reviewer.

## Task
Scan the in-scope frontend code for UI, design-system, and accessibility gaps, judged against a
redesign catalog. Write a report of opportunities that preserve functional behavior. Route every one to `/codify`.

### Guardrails
- **Report-only** — never edit code; opportunities apply via `/codify`.
- **Preserve behavior** — polish look, structure, and a11y, not what the app does; keep the contract the e2e suite asserts; if unsure, drop it.
- **Frontend scope** — default to the frontend container or the named paths; no backend or drive-by changes.
- **Design system over taste** — align to the project's tokens, spacing, and type scale, not an external or "AI" aesthetic.
- **No tests here** — `/codify` owns unit tests and `/verify` owns e2e; redesign runs neither.

## Context

- `{Rules}` = `{Agents_Folder}/rules`.
- `{Redesigns}` = `{Product_Folder}/redesigns`.

### Inputs
- [ ] Required: a scope — the frontend container by default, or paths.

### References
- _read_ [redesign patterns](./references/redesign.patterns.md) — what to look for.
- _read_ [report template](./assets/redesign.report.template.md).

### Glossary
- **Opportunity** — one redesign at a file and line, with the change and a behavior-preserving note.
- **Pattern** — a concrete UI or a11y signal from the catalog (e.g. missing focus state, raw hex color).
- **{slug}** — a short kebab-case name for the pass; groups the report under `{Redesigns}/{slug}`.

## Steps
### 1. Research
- _identify_ the scope: the frontend container by default, else the given paths.
- _if_ the scope is ambiguous, _ask_ the minimum questions.
- _derive_ `{slug}` from the scope — the container name or a short label.
- _list_ the files in scope.
- _read_ the frontend container's [rules]({Rules}/{container}.rules.md).

### 2. Plan
- _read_ [redesign patterns](./references/redesign.patterns.md).
- _read_ [report template](./assets/redesign.report.template.md).
- _walk_ each scope file for the catalog patterns — design system, accessibility, responsive, states, component reuse.
- _for-each_ opportunity, _capture_ file and line, the pattern, the minimal change, and why behavior holds.
- _drop_ any opportunity whose behavior preservation is uncertain.
- _prepare_ the content for the template's placeholders.

### 3. Implement
- _write_ `{Redesigns}/{slug}/redesign.report.md`.
- _commit_ the changes (`docs(redesign): {slug}`).
- _if_ the report lists any opportunity, _handoff_ to `/codify`.
- _else_ _reply_ "Nothing to redesign".

## Verification
- [ ] `{Redesigns}/{slug}/redesign.report.md` exists, in the template format, no placeholders left.
- [ ] Every opportunity has a file, a line, a pattern, a minimal change, and a behavior-preserving note.
- [ ] No opportunity changes the functional behavior the e2e suite asserts.
- [ ] Scope stayed on the frontend container or named paths; no drive-by findings.
- [ ] The report routes opportunities to `/codify`, or says there is nothing to redesign.
