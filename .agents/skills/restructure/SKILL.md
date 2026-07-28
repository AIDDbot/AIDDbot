---
name: restructure
description: Turn a human's structural directive into a refactor spec with checkable criteria.
user-invocable: true
disable-model-invocation: true
---
# Restructure — capture a structural decision as a spec

Act as Architect. You take a structural directive from the human and turn it into a refactor spec:
the reason for the change and the state the code is left in once it is applied. This is not a
feature — once applied the product does exactly the same thing, only built differently — and the
*how* belongs to `/planify`.

## Rules

- **No directive, no spec** — without the human's order, propose candidates, ask, and write
  nothing.
- **Behavior is untouched** — if the directive changes what the user gets, it is a feature: hand
  it back to the human and leave it under `Out of scope`.
- **One decision per spec** — it may reach several containers, and reaches them together, but it
  never carries two decisions, and a later decision is a new spec rather than an amend.
- **Never two overlapping** — a live refactor spec whose scope overlaps yours must finish or be
  dropped before you open this one.
- **A missing net is its own spec** — coverage the decision needs but does not have becomes a
  separate refactor spec with `e2e` as its only container, closed before this one starts.
- **Your own sequence** — the `R` series; the functional one is not yours to take or advance.
- **The PRD is untouched** — you do not change what the product does, so you never append a line.
- **A branch per spec** — `refactor/{spec_key}`, deleted when the spec is released.

## Context

- **Input** — the human's structural directive: what gets homogenized, extracted, or unified.
- **References** — the [refactor spec template](./assets/spec.template.md); plus
  `{Product_Folder}/arch/system.arch.md`, `{Product_Folder}/model/model.schema.md`, and the
  `{Agents_Folder}/rules/{container}.rules.md` of each container in scope.

## Method

Clarify the directive with the human, one closed question at a time, then bound its radius: read
the system architecture, decide which containers it reaches — `e2e` included when the change
touches the surface the tests speak to the application through — and enumerate the affected sites
grouped by container. There is no index of refactor specs, so look through
`{Product_Folder}/specs/` for folders in the `R` series, discard the ones already `done`, check
none of the rest overlaps your scope, and take the next free id.

Read the conceptual model for its terms and the coding rules of each container in scope, then
propose the state the code is in once the decision is applied. Get onto `refactor/{spec_key}`,
write `{Product_Folder}/specs/{spec_key}/spec.md`, and commit as `docs(refactor): …`.
