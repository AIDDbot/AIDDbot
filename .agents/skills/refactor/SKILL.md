---
name: refactor
description: Audit the app for accumulated decay and write a triaged report; never edit — findings route to `/codify`, `/planify`, or `/specify`.
user-invocable: true
disable-model-invocation: true
---
# Refactor

## Role
Act as Codebase Auditor.

## Task
Audit the in-scope code — the whole app by default — for accumulated decay across clarity, UI,
accessibility, structure, and behavior. Write a triaged report. Route each finding to its
pipeline door by kind; never edit.

### Guardrails
- **Report-only** — never edit code; each finding routes to its pipeline door.
- **Whole-app by default** — survey the accumulated system, not one diff; scope down only when asked.
- **Route, never drop** — behavior-preserving and local → `/codify`; structural → `/planify`; behavior-changing → `/specify`.
- **The e2e suite is the line** — a finding whose fix would change what a green test asserts is `/specify`'s, not yours to preserve away.
- **No tests here** — `/codify` owns unit tests and `/verify` owns e2e; the audit runs neither.

## Context

- `{Rules}` = `{Agents_Folder}/rules`.
- `{Refactors}` = `{Product_Folder}/refactors`.

### Inputs
- [ ] Optional: a scope — the whole app by default, or a container or paths.

### References
- _read_ [code-clarity lens](./references/refactor.patterns.md).
- _read_ [UI and accessibility lens](./references/ui.patterns.md).
- _read_ [triage: kinds, routing, severity](./references/triage.md).
- _read_ [report template](./assets/refactor.report.template.md).

### Glossary
- **Finding** — one issue at a file and line, with severity, kind, and handoff.
- **Kind** — `mechanical` | `functional` → `/codify`; `structural` → `/planify`; `behavioral` → `/specify`.
- **Lens** — a catalog the audit scans through: code clarity, UI/a11y, structure, behavior.
- **{slug}** — a short kebab-case name for the pass; groups the report under `{Refactors}/{slug}`.

## Steps
### 1. Research
- _identify_ the scope: the whole app by default, else the given container or paths.
- _if_ the scope is ambiguous, _ask_ the minimum questions.
- _derive_ `{slug}` from the scope or the date.
- _list_ the files in scope.
- _read_ each in-scope container's [rules]({Rules}/{container}.rules.md).

### 2. Plan
- _read_ the [code-clarity](./references/refactor.patterns.md) and [UI/a11y](./references/ui.patterns.md) lenses.
- _read_ [triage](./references/triage.md) and the [report template](./assets/refactor.report.template.md).
- _walk_ each scope file through every lens — clarity, UI, accessibility, structure, behavior.
- _for-each_ finding, _ask_ whether its fix would change what a green e2e test asserts.
- _assign_ each finding a kind and handoff from that answer, plus a severity.
- _escalate_ instead of discarding; drop nothing that fits a lens.
- _prepare_ the content for the template's placeholders.

### 3. Implement
- _write_ `{Refactors}/{slug}/refactor.report.md`.
- _commit_ the changes (`docs(refactor): {slug}`).
- _if_ any finding routes to `/codify`, _handoff_ to `/codify`.
- _if_ any finding routes to `/planify` or `/specify`, _surface_ it to the human.
- _if_ no finding, _reply_ "Nothing to refactor".

## Verification
- [ ] `{Refactors}/{slug}/refactor.report.md` exists, in the template format, no placeholders left.
- [ ] Every finding has a file, a line, a severity, a kind, and a handoff.
- [ ] Kind follows the e2e question: behavior-preserving → `/codify` or `/planify`; behavior-changing → `/specify`.
- [ ] Nothing that fits a lens was dropped; out-of-lens noise was not invented.
- [ ] The report routes findings to `/codify`, `/planify`, and `/specify`, or says nothing to refactor.
