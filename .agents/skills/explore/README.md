# Explore — map the project before anyone builds

`/explore` is the first skill in the AIDD pipeline. It reads a repository and writes
down what the project *is* — its agent rules, its system architecture, its conceptual
data model, and an empty shell for the product requirements document (PRD). It does not
write any application code; it only produces the guide documents everything else builds
on.

Think of it as a Senior Software Architect walking into an existing codebase, reading
the signposts, and drawing the first maps.

## What it's for

Before any feature can be specified, planned, or coded, the project needs a shared,
written understanding of its shape: what agent must obey which rules, which runnable
units (containers) exist, how they relate, and what the domain is about. `/explore`
creates that baseline from evidence already in the repo, and fills the gaps by asking
the human rather than inventing answers.

## When to use it

- At the very start of a project, or when onboarding an existing codebase into AIDD.
- Whenever the high-level maps have drifted so far that they need rebuilding from
  scratch (a `/release` may hand back here when drift is heavy).

It is the entry point of the build pipeline:
`/explore → /extract → /specify → /planify → /codify → /verify → /review → /release`.

## What you give it

- **Required:** the repository tree (the project it should map).

That is all it strictly needs. Everything else it either infers from evidence or asks
you about, one closed-ended question at a time.

## What it produces

- **`{Agents_File}`** — the root agent-rules file (`AGENTS.md` by default, or
  `CLAUDE.md`), kept under 100 lines and concise.
- **`{Product_Folder}/arch/system.arch.md`** — the system architecture at C4 Level 2:
  the list of containers, how they connect, and a **Tier** for each one
  (`front | back | db | e2e | fullstack`).
- **`{Product_Folder}/model/model.schema.md`** — the conceptual model: domain entities
  and their relationships only, deliberately with *no* attributes.
- **`{Product_Folder}/specs/PRD.md`** — the PRD *shell*: a product paragraph and nothing
  more. Category lines are never added here; those are appended later by `/specify`.

All four are guide documents. No application source is ever written by this skill.

## How it behaves (the rules it never breaks)

- **Evidence over invention.** Every key statement must trace to something in the repo
  or to an answer you gave. It does not fabricate facts.
- **Ask, don't assume.** Clarifications are closed-ended questions unless you told it to
  use defaults. When it must fall back to a default, it labels that as an assumption and
  asks you to confirm.
- **One strong default, not a menu.** When it does prescribe something new, it offers a
  single opinionated default rather than a list of options.
- **Observe, never redesign.** It documents what already exists. If it finds
  contradictions, it flags them rather than silently "fixing" the design.
- **Stay out of the source.** It reads the file tree and *guide files*
  (`README.md`, `CHANGELOG.md`, `package.json`, `pom.xml`, `go.mod`) — never the
  application source code. That deeper reading is `/extract`'s job.
- **The PRD shell is created once.** It writes `specs/PRD.md` a single time and never
  appends category lines to it.

## How it works, step by step

1. **Research.** It reads the guide files first, then detects the operating system,
   shell, and remote Git repo; the product and source folders; the problem and solution
   the project addresses; the containers and their tiers; and the domain entities and
   relationships. Wherever evidence is missing it proposes a default and asks you to
   confirm, one closed-ended question at a time — then stops before drafting anything.
2. **Plan.** It maps every placeholder in its four templates to a piece of guide-file
   evidence or one of your answers. Any placeholder with no backing becomes a focused
   yes/no or multiple-choice question. It prepares the PRD's product paragraph, leaving
   the categories empty for `/specify`.
3. **Implement.** It writes the four artifacts, commits them with a
   `docs(explore): …` message, and hands off to `/extract` once per container so each
   container gets documented in depth.

## How you know it worked

- The agent-rules file, `system.arch.md`, `model.schema.md`, and `PRD.md` all exist.
- Every container lists a **Tier**; no template placeholder was left empty; the model
  has entities and relationships but no attributes.
- The PRD has its product paragraph and no fabricated category entries.
- No unresolved assumptions are left dangling.

## Where it hands off

Once the maps are drawn, `/explore` hands each container to `/extract`, which documents
them one at a time.
