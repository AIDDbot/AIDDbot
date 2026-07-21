# Explore — map the project before anyone builds

`/explore` is the first skill in the AIDD pipeline. It reads a repository and writes down
what the project *is* — its agent rules, its system architecture, its conceptual data
model, and an empty PRD shell — without writing any application code. Think of it as a
Senior Software Architect walking into a codebase, reading the signposts, and drawing the
first maps.

## What it's for

Before anything can be specified, planned, or coded, the project needs a shared, written
understanding of its shape: which rules an agent must obey, which containers exist and how
they relate, and what the domain is about. `/explore` builds that baseline from evidence
already in the repo and fills gaps by asking, not inventing. Use it at the start of a
project, when onboarding an existing codebase, or when the high-level maps have drifted so
far they need rebuilding.

Position: it's the entry point —
`/explore → /extract → /specify → /planify → /codify → /verify → /review → /release` —
and hands each container to `/extract`.

## In and out

- **Input:** the repository tree.
- **`{Agents_File}`** — the root agent-rules file (`AGENTS.md` or `CLAUDE.md`), under 100
  lines.
- **`arch/system.arch.md`** — the C4 Level 2 architecture: containers, how they connect,
  and a **Tier** each (`front | back | db | e2e | fullstack`).
- **`model/model.schema.md`** — the conceptual model: domain entities and relationships
  only, no attributes.
- **`specs/PRD.md`** — the PRD *shell*: a product paragraph and nothing more. Category
  lines are appended later by `/specify`.

## The rules it never breaks

- **Evidence over invention** — every key statement traces to the repo or to your answer.
- **Ask, don't assume** — closed-ended questions; fallbacks are labeled and confirmed.
- **One strong default, not a menu** when it must prescribe something new.
- **Observe, never redesign** — documents what exists and flags contradictions.
- **Stay out of the source** — reads the tree and guide files only; deeper reading is
  `/extract`'s job.
- **The PRD shell is created once** — never appends category lines to it.

See [SKILL.md](./SKILL.md) for the exact steps and verification checklist.
