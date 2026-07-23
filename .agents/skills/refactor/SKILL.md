---
name: refactor
description: Audit the app for accumulated decay and write a triaged report; never edit — every finding routes to `/planify`.
user-invocable: true
disable-model-invocation: true
---
# Refactor

## Role
Act as Codebase Auditor.

## Task
Audit the in-scope code — the whole app by default — for accumulated decay across clarity, UI,
accessibility, structure, and behavior. Write a triaged report. Hand every finding to `/planify`;
never edit.

### Guardrails
- **Report-only** — never edit code; every finding hands off to `/planify`.
- **Whole-app by default** — survey the accumulated system, not one diff; scope down only when asked.
- **One door** — every finding preserves behavior and routes to `/planify`, which plans the cleanup.
- **The e2e suite is the line** — if a fix would change what a green test asserts, it is not a
  refactor: flag it to the human as a `/specify` feature, do not write it as a finding.
- **No tests here** — `/codify` owns unit tests and `/verify` owns e2e; the audit runs neither.

## Context

- `{Rules}` = `{Agents_Folder}/rules`.
- `{Refactors}` = `{Product_Folder}/refactors`.
- `{Work}` = `{Refactors}/{slug}` — this pass's folder; mirrors a spec's `specs/{spec_key}/`.

### Inputs
- [ ] Optional: a scope — the whole app by default, or a container or paths.

### References
- _read_ [code-clarity lens](./references/refactor.patterns.md).
- _read_ [UI and accessibility lens](./references/ui.patterns.md).
- _read_ [triage: kinds, routing, severity](./references/triage.md).
- _read_ [report template](./assets/refactor.report.template.md).

### Glossary
- **Finding** — one issue at a file and line, with severity and kind; always hands off to `/planify`.
- **Kind** — `mechanical` | `functional` | `structural`; classifies the decay (informs `/planify`).
- **Lens** — a catalog the audit scans through: code clarity, UI/a11y, structure, behavior.
- **{slug}** — a short kebab-case name for the pass; groups the pass under `{Work}`.

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
- _if_ it would, _drop_ it from the report and _surface_ it to the human as a `/specify` feature.
- _else_ _assign_ it a kind and a severity; its handoff is always `/planify`.
- _drop_ nothing else that fits a lens.
- _prepare_ the content for the template's placeholders.

### 3. Implement
- _write_ `{Work}/refactor.report.md`.
- _commit_ the changes (`docs(refactor): {slug}`).
- _if_ any findings, _handoff_ to `/planify`.
- _if_ no finding, _reply_ "Nothing to refactor".

## Verification
- [ ] `{Work}/refactor.report.md` exists, in the template format, no placeholders left.
- [ ] Every finding has a file, a line, a severity, and a kind.
- [ ] Every finding preserves behavior and hands off to `/planify`; a behavior-changing item was
      surfaced as a `/specify` feature, not written as a finding.
- [ ] Nothing that fits a lens was dropped; out-of-lens noise was not invented.
- [ ] The report routes every finding to `/planify`, or says nothing to refactor.
