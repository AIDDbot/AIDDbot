# Planify — turn a spec into buildable plans

`/planify` converts a spec (or an escalated defect report) into concrete plans: one plan
per affected software container, plus an end-to-end (`e2e.plan.md`) plan that maps every
acceptance criterion to exactly one test scenario. The plans are ordered, actionable, and
grounded in the architecture — ready for `/codify` to implement.

It plays a Senior Software Engineer deciding *how* the work will be done, before any of
it is done.

## What it's for

A spec says what and why; it does not say how. `/planify` bridges that gap. It grounds
every planned step in the container's documented components and contracts, and it turns
the spec's acceptance criteria into an e2e test plan — the executable statement of the
new behavior. When a spec is amended, it replans, using checkpoints to decide what to
keep, redo, or drop.

## When to use it

- After `/specify` creates or amends a spec (always — a `pending` spec must be replanned).
- For a **structural refactor**, which has no spec because behavior does not change; here
  the existing e2e suite is the acceptance criterion and no e2e plan is written.

Position: it follows `/specify` and hands off to `/codify`.

## What you give it

- **Required:** a `pending` spec, a short requirement, or a structural-refactor goal.
- A structural refactor has no spec, because behavior must not change.

## What it produces

- **`{Product_Folder}/specs/{spec_key}/{container}.plan.md`** — one plan per affected
  software container (e2e excluded here), each grounded in that container's architecture
  or the relational schema, with ordered, checkable Implementation Steps.
- **`{Product_Folder}/specs/{spec_key}/e2e.plan.md`** — the end-to-end plan, unless this
  is a structural refactor. It maps every *active* acceptance-criterion id to exactly one
  scenario, written from the spec and shared contracts — never reverse-engineered from
  sibling code.
- It updates the spec to **`status: planned`**.

## How it behaves (the rules it never breaks)

- **Grounded in the arch.** Every step traces to real components and contracts of the
  container; nothing is invented free-floating.
- **Always replan after an amend.** When the spec is `pending` it rewrites plans and
  never skips `/planify` after a create or amend.
- **Checkpoints control carry-forward.** On a replan, each prior step is classified
  `keep`, `redo`, or `drop` *before* Implementation Steps are rewritten.
- **A deprecated criterion drops its scenario.** Its prior scenario is checkpointed
  `drop`, which is what later authorizes `/codify` to delete the corresponding test.
- **Shared contracts are stated identically** in every sibling container plan, word for
  word, so no two plans disagree about the interface between them.

## How it works, step by step

1. **Research.** It identifies the input type, derives the spec ids, reads
   `system.arch.md`, and lists the affected software containers and their solution
   outcomes (e2e excluded). It reads each non-`db` container's architecture and the
   relational schema when a `db` container is involved. If prior plans exist (an
   amend/replan), it reads them. Where things are ambiguous it documents assumptions and
   proceeds best-effort.
2. **Plan.** It reads the container-plan template and, unless this is a structural
   refactor, the e2e-plan template. For each container it fills Checkpoints for prior
   steps (or notes "none — first plan") and prepares Implementation Steps from the
   kept/redone work plus new steps, all unchecked. It reads API and data field shapes
   when touching an API or the store, and states each shared contract identically across
   sibling plans. For the e2e plan it derives scenarios from the spec criteria and
   shared contracts (thinking as a QA engineer, not a developer), maps every active
   criterion to exactly one scenario, checkpoints prior scenarios on replan, and marks
   any deprecated criterion's scenario `drop`.
3. **Implement.** It writes each container plan and (unless structural refactor) the e2e
   plan, updates the spec to `status: planned`, commits with `docs(planify): …`, and
   hands off to `/codify`.

## How you know it worked

- There is one plan per affected software container.
- `e2e.plan.md` is present unless this is a structural refactor.
- Each plan is grounded in its architecture or the relational schema, and is ordered and
  actionable.
- On a replan, Checkpoints cover every prior step and the Implementation Steps match the
  keep/redo decisions.
- The e2e plan maps every active criterion to exactly one scenario, and every deprecated
  criterion's prior scenario is checkpointed `drop`.
- The spec's status is `planned`.

## Where it hands off

To `/codify`, which implements each plan — one run per container, e2e included.
