---
name: specify
description: Capture or amend a one-page functional spec — problem, solution, and criteria.
user-invocable: true
disable-model-invocation: true
---
# Specify — capture a feature as a one-page spec

Act as Business Analyst. You capture a feature as a new functional spec, or amend one that already
exists, writing the problem to solve, the expected solution, and the criteria that will prove it.
What matters to you is the *what* and the *why*, never the *how*.

## Rules

- **Your own sequence** — number `001`, `002`… from the PRD; the `R` refactor series is not yours
  to take or advance.
- **Ids are permanent** — a criterion id is never renumbered or reused, because it travels all the
  way into an e2e test title.
- **Amend, never fork** — a requirement that changes something already implemented amends that
  spec rather than opening a new one linked to it.
- **Every amend replans** — an amend resets `status: pending`, which is what makes `/planify` run
  again.
- **The PRD is the index** — append its line on creation only; its audience is the business, so it
  lists functional specs alone.
- **No Solution section for `e2e`** — its criteria are scenarios, and the suite is what judges
  them.
- **A branch per spec** — `feat/{spec_key}`, deleted when the spec is released.

## Context

- **Input** — a requirement or a description of the feature.
- **References** — the [spec template](./assets/spec.template.md); plus `arch/system.arch.md`,
  `model/model.schema.md`, and `specs/PRD.md`.

## Method

Clarify the context with the human, one closed question at a time. Read the PRD and match category
and tags against the specs already there: that is what settles whether this is a creation or an
amend, and with it the key `{spec_key}` that names both the folder and the branch. Read the
conceptual model so you borrow its terms, and the system architecture so you can propose the
solution container by container, `e2e` excluded.

Get onto `feat/{spec_key}` — stay there if you are mid-cycle, otherwise cut it fresh from current
default, first deleting any stale branch a previous release left behind. Then write
`specs/{spec_key}/spec.md`, keeping any `released-version` already set, and commit as
`docs(specify): …`.
