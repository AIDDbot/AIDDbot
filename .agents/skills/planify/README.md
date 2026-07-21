# Planify — turn a spec into buildable plans

`/planify` converts a spec (or an escalated defect report) into concrete plans: one per
affected software container, plus an `e2e.plan.md` that maps every acceptance criterion to
exactly one test scenario. The plans are ordered, actionable, and grounded in the
architecture — ready for `/codify`. It plays a Senior Software Engineer deciding *how* the
work will be done, before any of it is done.

## What it's for

A spec says what and why, not how; `/planify` bridges that gap. It grounds every step in
the container's documented components and contracts, and turns the acceptance criteria
into an e2e plan — the executable statement of the new behavior. When a spec is amended it
replans, using checkpoints to decide what to keep, redo, or drop.

Use it after `/specify` (always — a `pending` spec must be replanned), or for a
**structural refactor**, which has no spec because behavior does not change: there the
existing e2e suite is the acceptance criterion and no e2e plan is written.

Position: it follows `/specify` and hands off to `/codify`, one run per container.

## In and out

- **Input:** a `pending` spec, a short requirement, or a structural-refactor goal.
- **`specs/{spec_key}/{container}.plan.md`** — one plan per affected software container
  (e2e excluded), grounded in that container's arch or the relational schema, with ordered,
  checkable Implementation Steps.
- **`specs/{spec_key}/e2e.plan.md`** — unless structural refactor; maps every *active*
  criterion to exactly one scenario, written from the spec and shared contracts, never
  reverse-engineered from sibling code.
- Updates the spec to `status: planned`.

## The rules it never breaks

- **Grounded in the arch** — every step traces to real components and contracts.
- **Always replan after an amend** — a `pending` spec means rewrite the plans.
- **Checkpoints control carry-forward** — each prior step is `keep`/`redo`/`drop` before
  Implementation Steps are rewritten.
- **A deprecated criterion drops its scenario** — checkpointed `drop`, which authorizes
  `/codify` to delete the test.
- **Shared contracts are stated identically** across sibling plans, word for word.

See [SKILL.md](./SKILL.md) for the exact steps and verification checklist.
