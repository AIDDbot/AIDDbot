# Extract — document one container in depth

`/extract` takes a single container that `/explore` identified and writes the detailed
technical documentation for it: its architecture (or, for a database, its relational
schema), the code rules an agent must follow inside it, and — when it exposes an API —
the API's shapes. It runs once per container.

It plays the same Senior Software Architect, but now zoomed in from the system map to
one runnable unit, reading the actual source.

## What it's for

`/explore` draws the system at a high level but deliberately never opens the source.
`/extract` fills that in for one container at a time: what the container is made of
(its C4 Level 3 components), the conventions code must follow there, and the exact
shapes of any API it exposes. This is the layer plans and code later depend on.

## When to use it

- Right after `/explore`, once per container, to flesh out each unit.
- Whenever a container's architecture, schema, rules, or API docs have drifted and need
  rebuilding from the source (a `/release` with heavy drift may route back here).

Position in the pipeline: it follows `/explore` and precedes `/specify`.

## What you give it

- **Required:** the `system.arch.md` and the root agent-rules file, both from
  `/explore`.
- **Optional:** which container to document. If you don't name one and it's ambiguous,
  it asks.

Note on scope: a `fullstack` container counts as **one** container — its Front and Back
are documented together.

## What it produces

For the one container in scope:

- **`{Product_Folder}/arch/{container}.arch.md`** — the container architecture, when the
  tier is *not* `db`.
- **`{Product_Folder}/model/db.schema.md`** — the relational schema, when the tier *is*
  `db`.
- **`{Product_Folder}/model/api.schema.md`** — the API schema, when the container exposes
  an API (endpoints are merged into any existing file rather than duplicated).
- **`{Agents_Folder}/rules/{container}.rules.md`** — the code rules and naming
  conventions for the container, with front-matter adapted to the harness.
- It also **updates the container's Detail link** in `system.arch.md` to point at the
  artifact it just wrote.

## How it behaves (the rules it never breaks)

- **One container per run.** It documents exactly one unit (`fullstack` = Front + Back
  together, still one).
- **Evidence over invention.** Key statements trace to repo evidence or to your answers;
  it never fabricates facts or requirements.
- **Ask, don't assume.** Clarifications are closed-ended unless you asked for defaults;
  fallbacks are labeled as assumptions and confirmed with you.
- **One strong default, not a menu**, when it must prescribe something new.
- **Observe, never redesign.** It documents what exists and flags contradictions rather
  than reworking the design.
- **Document what exists; prescribe only into a vacuum.** Defaults are proposed only
  where nothing exists yet.

## How it works, step by step

1. **Research.** It reads the root agent rules and `system.arch.md`, selects the target
   container and its tier, and — if the container is ambiguous or unnamed — asks which
   one. It then reads the container's folder, its guide files, and representative source
   files, asking any needed clarifications one closed-ended question at a time.
2. **Plan.** Based on the tier it reads the right template — relational-schema template
   for `db`, container-arch template otherwise — plus the API-schema template if the
   container exposes an API. It maps every placeholder to source evidence or an explicit
   answer, and turns any gap into a focused question.
3. **Implement.** It writes the schema or architecture doc, updates the Detail link in
   `system.arch.md`, writes the container's code-rules file, and writes the API schema
   if applicable. It commits with `docs(extract): …`. If more containers remain it hands
   off to another `/extract`; when none remain it hands off to `/specify`.

## How you know it worked

- The container's code-rules file exists, with no empty placeholders.
- The architecture doc exists when the tier is not `db`; the relational schema exists
  when the tier is `db`.
- The API schema exists when — and only when — the container exposes an API.
- The Detail link in `system.arch.md` points at the artifact just written.
- No unresolved assumptions remain.

## Where it hands off

To the next `/extract` if containers are still undocumented, otherwise onward to
`/specify` to begin capturing features.
