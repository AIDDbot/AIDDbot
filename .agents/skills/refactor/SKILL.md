---
name: refactor
description: Turn a human's structural directive into a non-functional spec with checkable criteria.
user-invocable: true
disable-model-invocation: true
---
# Refactor

## Role
Act as Architect.

## Task
Turn the human's structural directive into a non-functional spec: what the code must look like
once the decision is applied, and how each part of it is checked. Never edit code.

### Guardrails
- **No directive, no spec** — without the human's order, propose candidates and ask; write nothing.
- **Report-only** — never edit code; the rest of the cycle plans and applies the change.
- **One decision per spec** — it may cross containers, and crosses them together; it may not
  carry two decisions.
- **Never two overlapping** — a live non-functional spec whose scope overlaps yours must finish
  or be dropped first.
- **Own series** — ids run `N001`, `N002`…; never take a number from the feature sequence or
  advance it.
- **Behavior is untouched** — if the directive changes what the user gets, it is a feature:
  hand it back to the human.
- **The e2e suite may change shape, never verdict** — rewrite *how* a test reaches the result;
  never *what* it asserts. No live functional criterion stops holding.
- **New tests only as characterization** — a new e2e is admitted only if it asserts behavior
  that already exists and nothing covered, written before anything is touched.
- **Checkable criteria** — the first is suite non-regression, judged by `/verify`; the rest name
  the review gate that judges them, drawn from the closed list.
- **Out of the PRD** — never append a line; it catalogs features only.

## Context

- `{Arch}` = `{Product_Folder}/arch`.
- `{Rules}` = `{Agents_Folder}/rules`.
- `{Specs}` = `{Product_Folder}/specs/{spec_key}`.

### Inputs
- [ ] Required: a structural directive — what to homogenize, extract, or unify.

### References
- _read_ [non-functional spec template](./assets/spec.template.md) — its `gate:` field carries
  the closed list criteria name.

### Glossary
- **{spec_key}** — `{spec_id}-{slug}`; an `N`-series id plus a slug naming the decision, not the
  container; folder and branch name.
- **AC id** — `AC-{spec_id}.{n}`; referenced by plans, gates, and reports.
- **Affected sites** — every place the decision reaches, grouped by container; includes what is
  fine today but must change to fit.
- **Characterization test** — an e2e asserting behavior that already exists, written as a net
  before the change.

## Steps
### 1. Research
- _require_ a directive from the human; _else_ _propose_ candidates, _ask_, and _stop_.
- _read_ [system architecture]({Arch}/system.arch.md).
- _list_ the containers the decision reaches, `e2e` included if it reaches the test surface.
- _enumerate_ the affected sites, grouped by container — not defects, but every place the
  decision reaches.
- _list_ `specs/` folders in the `N` series; _discard_ those `done`.
- _if_ a live non-functional spec overlaps this scope, _stop_ and _say so_.
- _derive_ `{spec_id}` as the next free `N` id, `{slug}` from the decision, and `{spec_key}`.

### 2. Plan
- _read_ each in-scope container's [rules]({Rules}/{container}.rules.md).
- _prepare_ the why — what hurts today for not having taken this decision.
- _prepare_ the what — the state the code is in once applied, in checkable terms.
- _prepare_ criteria: the first is suite non-regression; the rest describe the resulting
  structure, each naming its gate from the closed list.
- _if_ a criterion fits no gate, _sharpen_ it or _drop_ it.
- _move_ to `Out of scope` anything the directive brushes that would change behavior, and
  _surface_ it to the human.

### 3. Implement
- _if_ already on `refactor/{spec_key}`, _keep_ it — an in-flight cycle stays on its branch.
- _if_ on the default branch:
  - _require_ default is current.
  - _create_ branch `refactor/{spec_key}` from default.
- _write_ `{Specs}/spec.md` with `kind: non-functional`, its non-functional `category`, and
  `status: pending`.
- _number_ criteria `AC-{spec_id}.{n}`, all `[ ]`.
- _commit_ the changes (`docs(refactor): {description}`).
- _handoff_ to `/planify`.
- _if_ the directive was a feature, or there was no structural decision, _write_ no spec and
  _say so_.

## Verification
- [ ] A human directive existed; nothing was written without one.
- [ ] `{Specs}/spec.md` exists with `kind: non-functional`, template format, no placeholders.
- [ ] The spec holds one structural decision, and its affected sites are listed per container.
- [ ] Criteria are numbered `AC-{spec_id}.{n}`; the first is suite non-regression and the rest
      name a gate from the closed list.
- [ ] `{spec_id}` is the next free `N` id and the feature sequence is untouched.
- [ ] Behavior is untouched; what would change it sits in `Out of scope` and was surfaced.
- [ ] No new e2e asserts behavior that did not already exist.
- [ ] No other live non-functional spec overlaps this scope.
- [ ] No PRD line was appended and no line of code was edited.
