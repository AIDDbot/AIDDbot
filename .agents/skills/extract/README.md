# Extract — document one container in depth

`/extract` takes a single container that `/explore` identified and writes its detailed
technical documentation: its architecture (or, for a database, its relational schema), the
code rules an agent must follow inside it, and — when it exposes an API — the API's shapes.
It runs once per container, playing the same Senior Software Architect zoomed in from the
system map to one runnable unit, now reading the actual source.

## What it's for

`/explore` draws the system but never opens the source; `/extract` fills that in one
container at a time: its C4 Level 3 components, the conventions its code must follow, and
the exact shapes of any API it exposes — the layer plans and code later depend on. Use it
right after `/explore`, once per container, or to rebuild a container's docs when they've
drifted from the source.

Position: it follows `/explore` and precedes `/specify`. A `fullstack` container counts as
**one** — its Front and Back are documented together.

## In and out

- **Input (required):** `system.arch.md` and the root agent-rules file, both from
  `/explore`. **Optional:** which container to document (it asks if ambiguous).
- **`arch/{container}.arch.md`** — the container architecture, when the tier is not `db`.
- **`model/db.schema.md`** — the relational schema, when the tier *is* `db`.
- **`model/api.schema.md`** — the API schema, when it exposes an API (endpoints merged, not
  duplicated).
- **`rules/{container}.rules.md`** — the code rules and naming conventions, front-matter
  adapted to the harness.
- It also updates the container's **Detail** link in `system.arch.md`.

## The rules it never breaks

- **One container per run** — `fullstack` = Front + Back together, still one.
- **Evidence over invention** — never fabricates facts or requirements.
- **Ask, don't assume** — closed-ended clarifications; fallbacks labeled and confirmed.
- **One strong default, not a menu** when it must prescribe.
- **Observe, never redesign** — documents what exists; prescribes only into a vacuum.

See [SKILL.md](./SKILL.md) for the exact steps and verification checklist.
