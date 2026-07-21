# Specify — capture a feature as a one-page spec

`/specify` turns a feature request into a one-page spec: the problem, the solution as
per-container outcomes, and a numbered list of acceptance criteria. It can also **amend**
an existing spec — and any amend resets the pipeline so nothing ships on stale
assumptions. It plays a Business Analyst: it cares about *what* and *why*, not *how*.

## What it's for

Every change in AIDD is anchored to a spec. Its criteria (`AC-{spec_id}.{n}`) are the
thread that plans, tests, and reports point back to, and `/specify` is the only skill that
creates or edits that thread. Use it to capture a new feature, or to amend a shipped or
in-flight one — including a "bug" that actually changes agreed behavior (one that would
flip a green e2e test). It also owns appending the feature's line to the PRD.

Position: it follows `/extract` and always hands off to `/planify`, because a fresh or
amended spec always needs a (re)plan before any code.

## In and out

- **Input:** a requirement to capture, or an existing `{spec_key}`/`{slug}` to amend plus
  what changed.
- **`specs/{spec_key}/spec.md`** — the spec, `status: pending`, criteria `AC-{spec_id}.{n}`
  all unchecked. Covers problem, user stories, RuleSpeak rules, out-of-scope, a conceptual
  data model (when a model schema exists), and a per-container Solution overview. There is
  no Solution section for e2e.
- **A line in `specs/PRD.md`** — on *create* only, under the feature's category. Amends
  never duplicate it.

## The rules it never breaks

- **Amendable, never forked** — edits in place at any status; no parallel ticket per key.
- **Every amend resets the gate** — sets `pending`, unchecks active criteria, replans.
- **Ids are permanent** — an `AC-{spec_id}.{n}` is never renumbered or reused.
- **Deprecate, never delete** — retired criteria move to `Deprecated criteria`, id kept.
- **PRD is append-only here** — one line on create; never rewrites the shell (`/explore`).

See [SKILL.md](./SKILL.md) for the exact steps and verification checklist.
