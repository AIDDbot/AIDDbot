# Specify — capture a feature as a one-page spec

`/specify` turns a feature request into a single-page specification: the problem it
solves, the solution in terms of per-container outcomes, and a numbered list of
acceptance criteria. It can also **amend** an existing spec — and any amend resets the
work back to the start of the pipeline so nothing ships on stale assumptions.

It plays a Business Analyst: it cares about *what* and *why*, not *how*.

## What it's for

Every change in AIDD is anchored to a spec — one page that states the problem, sketches
the solution per container, and lists checkable acceptance criteria with stable ids.
Those criteria (`AC-{spec_id}.{n}`) are the thread that plans, tests, and reports all
point back to. `/specify` is the only skill that creates or edits that thread.

## When to use it

- To capture a new feature or requirement as a spec.
- To amend an already-shipped or in-flight feature — including a "bug" that actually
  requires changing agreed behavior (i.e. one that would flip a green e2e test).
- It also owns appending the feature's line to the PRD index.

Position: it follows `/extract` in the build pipeline and hands off to `/planify`. An
amend can be entered at *any* status and always forces a full replan.

## What you give it

- **Required:** a requirement or feature description, **or**
- an existing spec (its `{spec_key}` or `{slug}`) to amend, plus a note of what changed.

## What it produces

- **`{Product_Folder}/specs/{spec_key}/spec.md`** — the one-page spec, with `status:
  pending` and criteria numbered `AC-{spec_id}.{n}`, all unchecked.
- **A line in `{Product_Folder}/specs/PRD.md`** — on *create* only, appended under the
  feature's category (creating the category heading if it's new). Amends never duplicate
  this line.

The spec covers: problem, user stories, RuleSpeak rules, out-of-scope notes, a
conceptual data model (when a model schema exists), a Solution overview with one section
per software container, and verification criteria for e2e. There is deliberately **no**
Solution section for e2e.

## How it behaves (the rules it never breaks)

- **Amendable, never forked.** An existing spec is edited in place at any status; it
  never invents a parallel ticket for the same `{spec_key}`.
- **Every amend resets the gate.** An amend sets `status: pending`, unchecks all active
  criteria, and always hands off to `/planify` to replan (software containers and e2e).
- **Ids are permanent.** An `AC-{spec_id}.{n}` is never renumbered or reused — plans and
  tests point at it.
- **Deprecate, never delete.** A retired criterion moves to a `Deprecated criteria`
  section, keeping its id, with a date and reason. It is never removed outright.
- **The PRD is append-only here.** On create it appends one line; it never rewrites the
  shell (that belongs to `/explore`), and on amend it does not duplicate the line.

## How it works, step by step

1. **Research.** It asks clarifying closed-ended questions, reads the PRD to spot overlap
   by category and tags, and decides create vs amend. On create it derives the slug and
   the next sequential `{spec_id}`; on amend it resolves the existing spec and keeps its
   ids. It reads `system.arch.md` and lists the software containers the feature touches
   (e2e excluded). If the PRD is missing, it hands off to `/explore` first.
2. **Plan.** It reads the spec template and, if present, the model schema, then prepares
   the problem, user stories, RuleSpeak rules, out-of-scope, the conceptual data model,
   the per-container solution overview, and the e2e verification criteria. On create it
   also prepares the PRD line.
3. **Implement.** On the default branch it first creates a `feat/{spec_key}` branch.
   On create it writes the spec with `status: pending` and numbers the criteria. On amend
   it updates the spec to `pending`, unchecks active criteria, adds new criteria with the
   next unused id, moves no-longer-applicable criteria to `Deprecated criteria` (with date
   and reason), and preserves `released-version`. On create it appends the PRD line. It
   commits with `docs: …` and hands off to `/planify`.

## How you know it worked

- The spec exists, correctly formatted, with no empty placeholders.
- Criteria are checkable and numbered `AC-{spec_id}.{n}`, with no id renumbered or reused.
- After create or amend, all active criteria are unchecked (`[ ]`).
- Any retired criterion sits under `Deprecated criteria` with its id, a date, and a reason.
- Solution sections describe outcomes, not implementation details, and there is no e2e
  Solution section.
- Status is `pending`; an amend did not duplicate the PRD line; on create the PRD lists
  the spec under a category.

## Where it hands off

Always to `/planify` — because a fresh or amended spec always needs a (re)plan before any
code is written.
