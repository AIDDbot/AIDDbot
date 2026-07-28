---
name: restructure
description: Turn a human's structural directive into a refactor spec with checkable criteria.
user-invocable: true
disable-model-invocation: true
---
# Restructure — capture a structural decision as a spec

Act as Architect. You take a structural directive from the human and turn it into a
specification. In it you write, concisely and formally, the reason for the change and the state
the code is left in once it is applied.

This is not a feature: once applied, the product does exactly the same thing, only built
differently. You capture the *what*, the *why*, and how far it reaches; the *how* belongs to the
planning step. You own the status and metadata in the spec's front-matter.

## Rules

- **No directive, no spec** — without the human's order, propose candidates, ask, and write nothing.
- **Every spec is identifiable** — a unique sequential number from your own `R001`, `R002`…
  series, a category, a slug naming the decision rather than a container, and context tags; you
  mark it `kind: refactor`.
- **One decision per spec** — it may reach several containers, and reaches them together, but it
  never carries two decisions.
- **Never two overlapping** — a live refactor spec whose scope overlaps yours must finish or be
  dropped before you open this one.
- **Behavior is untouched** — if the directive changes what the user gets, it is a feature: hand
  it back to the human.
- **The suite changes shape, never verdict** — a plan may rewrite *how* a test reaches its
  result, never *what* it asserts; no live functional criterion stops holding.
- **A missing net is its own spec** — coverage the decision needs but does not have becomes a
  separate refactor spec with `e2e` as its only container, closed before this one starts.
- **Every criterion names its judge** — the verification step when the suite proves it, otherwise
  one of the quality gates; the first criterion is always suite non-regression.
- **The PRD is untouched** — you do not change what the product does, so you never append a line.
- **A branch per spec** — each spec has its own branch, deleted when it is released.

## Context

- **Required input** — the human's structural directive: what gets homogenized, extracted, or
  unified. If you do not have one, do not invent it.
- **References** — the [refactor spec template](./assets/spec.template.md); plus
  `arch/system.arch.md`, `model/model.schema.md`, and the `rules/{container}.rules.md` of each
  container in scope.

## Research

Ask the human to clarify the context, one closed question at a time. Start from the directive and
bound its radius: read the system architecture and decide which containers it reaches, `e2e`
included when the change touches the surface the tests speak to the application through. Then
enumerate the affected sites, grouped by container — every place the decision reaches, not a list
of defects.

Check that no live refactor spec already overlaps that scope. There is no index to consult, so
look through `specs/` for folders in the `R` series and discard the ones already `done`. Derive
`{spec_id}` as the next free `R` id, and with it the key `{spec_id}-{slug}`.

## Plan

Prepare the content against the spec template. Read the conceptual model so you use the same
terms, the system document to propose the destination container by container, and the coding
rules of each container in scope.

Prepare the why — what hurts today for not having taken this decision — the index of affected
sites, and what stays out of scope. Then propose the state the code is in once the decision is
applied, and list the criteria that prove it. If a criterion fits no judge, sharpen it or drop it.

## Implement

Get onto the right branch: stay on `refactor/{spec_key}` if you are mid-cycle, or cut a fresh one
from current default, first deleting any stale branch a previous release left behind. Then write
or update `specs/{spec_key}/spec.md` with `kind: refactor` and `status: pending`, numbering the
criteria `AC-{spec_id}.{n}`, all unchecked.

Commit as `docs(refactor): …`. Then hand over to the planning step. If the directive turned out
to be a feature, or there was no structural decision in it, write no spec and say so.

## Verification

- [ ] A human directive existed; nothing was written without one.
- [ ] `specs/{spec_key}/spec.md` exists with `kind: refactor`, in the right format, no placeholders.
- [ ] The spec holds one structural decision, and its affected sites are listed per container.
- [ ] Criteria are numbered `AC-{spec_id}.{n}`; the first is suite non-regression and the rest name their judge.
- [ ] `{spec_id}` is the next free `R` id and the functional sequence is untouched.
- [ ] Behavior is untouched; anything that would change it sits in `Out of scope` and was surfaced.
- [ ] `e2e` appears among the affected containers only when the decision reaches the test surface.
- [ ] No other live refactor spec overlaps this scope.
- [ ] No PRD line was appended and no line of code was edited.
- [ ] The repository sits on a `refactor/{spec_key}` branch cut from current default.
