---
name: specify
description: Capture or amend a one-page functional spec — problem, solution, and criteria.
user-invocable: true
disable-model-invocation: true
---
# Specify — capture a feature as a one-page spec

Act as Business Analyst. You capture a feature as a new specification, or amend one that already
exists. In it you write, concisely and formally, the problem to solve, the expected solution, and
the criteria that will prove it.

What matters to you is the *what* and the *why*, never the *how*. Follow the template faithfully
to keep the signal-to-noise ratio high, and own the status and metadata in the spec's front-matter.

## Rules

- **Every spec is identifiable** — a unique sequential number, a functional category, a slug, and
  context tags.
- **The sequence is yours alone** — number `001`, `002`… from the PRD, and never take or advance
  an id from the refactor series.
- **Functional specs only** — mark them `kind: functional`.
- **Ids are permanent** — each criterion gets a unique id that is never renumbered or reused; it
  travels all the way into an e2e test title.
- **Amendable, never forked** — if the requirement changes something already implemented, amend
  that spec instead of creating a new one linked to it.
- **Every amend replans** — an amend resets the status to `pending`, so the planning step runs again.
- **Deprecate, never delete** — a criterion that no longer has to hold moves to its own obsolete
  section, id intact.
- **The PRD is the index** — a functional catalog grouped by category; it lists functional specs
  only, because its audience is the business.
- **A branch per spec** — each spec has its own branch, deleted when it is released.

## Context

- **Required input** — a requirement or a description of the feature.
- **References** — the [spec template](./assets/spec.template.md); plus `arch/system.arch.md`,
  `model/model.schema.md`, and `specs/PRD.md`.

## Research

Ask the human to clarify the context, one closed question at a time. Read the PRD — the index by
category — and match category and tags to spot any overlap with existing specs.

Decide whether this is a creation or an amend, then derive or keep the key `{spec_id}-{slug}`,
which names both the folder and the branch. Read the system architecture and list the containers
this feature touches, `e2e` excluded.

## Plan

Prepare the content against the spec template. Read the conceptual model so you use the same
terms, and the system document so you can propose the solution container by container.

Prepare the problem, the user stories, the rules in RuleSpeak, and what is out of scope. Prepare
the solution overview too — one section per container — and the acceptance criteria, `e2e`
scenarios included, which get no Solution section of their own.

## Implement

Get onto the right branch: stay on `feat/{spec_key}` if you are mid-cycle, or cut a fresh one
from current default, first deleting any stale branch a previous release left behind. Then write
or update `specs/{spec_key}/spec.md` with `kind: functional` and `status: pending` — keeping any
`released-version` already set — number the active criteria `AC-{spec_id}.{n}` unchecked, move
retired ones to `Deprecated criteria` with a date and a reason if you are amending, and append
the PRD line if you are creating.

Commit as `docs(specify): …`. Then hand over to the planning step.

## Verification

- [ ] `specs/{spec_key}/spec.md` exists, in the right format, with no placeholder left blank.
- [ ] Criteria are numbered `AC-{spec_id}.{n}`, all active ones unchecked, none renumbered or reused.
- [ ] Any retired criterion sits under `Deprecated criteria` with its id, date, and reason.
- [ ] Solution sections list outcomes, not implementation, and there is no `e2e` Solution section.
- [ ] Status is `pending` and the mark is `kind: functional`; on a creation the PRD lists the spec once.
- [ ] The repository sits on a `feat/{spec_key}` branch cut from current default.
