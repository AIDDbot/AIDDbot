---
name: specify
description: Capture a functional or refactor spec — problem or decision, solution, and criteria.
user-invocable: true
disable-model-invocation: true
---
# Specify — capture a change as a one-page spec

The caller names the kind — `functional` or `refactor` — you never classify it. When the kind is
`functional`, act as Business Analyst: capture a feature (or amend one) as problem, solution, and
criteria; the *what* and the *why*, never the *how*. When the kind is `refactor`, act as Architect:
turn a structural directive into a refactor spec — the reason and the state the code is left in;
behavior stays the same, and the *how* belongs to `/planify`.

## Rules

- **Kind is given** — the command or the human names `functional` or `refactor`; if neither did,
  ask once and stop until you have it.
- **Two series, never crossed** — functional draws `F001`, `F002`…; refactor draws `R001`,
  `R002`…; neither advances the other.
- **Ids are permanent** — a criterion id is never renumbered or reused; it travels into e2e titles
  and reports.
- **Kind rules win** — obey the reference for the kind you were given; do not borrow the other
  kind's habits (amend, PRD, overlap, e2e Solution).

## Context

- **Input** — the kind, plus a requirement or amend target (`functional`), or a structural
  directive (`refactor`).
- **References** — [functional rules](./references/functional.md) and its
  [spec template](./assets/spec.template.md); [refactor rules](./references/refactor.md) and its
  [refactor spec template](./assets/refactor.spec.template.md); plus
  `{Product_Folder}/arch/system.arch.md`, `{Product_Folder}/model/model.schema.md`, and — for
  functional — `{Product_Folder}/specs/PRD.md`, or — for refactor — the
  `{Agents_Folder}/rules/{container}.rules.md` of each container in scope.

## Method

Load the reference and template for the given kind. Clarify with the human, one closed question
at a time, until the key `{spec_key}` = `{spec_id}-{slug}` is settled. Read the system
architecture and the kind's other inputs from its reference, then get onto the branch that kind
owns, write `{Product_Folder}/specs/{spec_key}/spec.md`, and commit as `docs(specify): …`.
