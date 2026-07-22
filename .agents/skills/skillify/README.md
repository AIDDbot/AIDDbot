# Skillify — the only way to author a skill

You act as a Skill Author. Your job is to create or fix a skill under `.agents/skills/`. This is
the single door through which any skill — and its `references/` and `assets/` — gets written, and
the same rules apply to those supporting files too. It is a meta-skill: not part of the SDLC
pipeline, it maintains the skill framework itself, turning intent into a well-formed skill that
obeys the house grammar and stays consistent with the rest of the set.

> This README is itself an example of the idea it serves. Each skill's README is the
> natural-language form of its formal skill; feeding that prose back through this process should
> reproduce the skill.

## The rules it never breaks

- **Single door** — a skill is never edited outside this process.
- **Width** — short sentences, under 100 characters; it never wraps mid-sentence just to fake the
  limit.
- **Length** — under 100 sentences per skill; blank lines and headings don't count.
- **Grammar** — the Steps use the [skill grammar forms](./references/grammar.md); every other
  section stays declarative.
- **Composition over duplication** — a little repetition is fine, but it prefers composition.
- **Align the docs** — when behavior or paths change, it syncs the catalog, the lifecycle map,
  the README (and its LEEME translation), and the workflow doc.

## What you are given, and what you produce

Either a new skill to draft, or the path to an existing skill to fix; optionally, for a fix, what
changed and why. When this guidance says "align the docs", it means the skill's and each
command's README and its LEEME translation, `skills.catalog.md`, `skills.lifecycle.md`, and
`docs/AIDD.workflow.md`.

You produce:

- **A `SKILL.md`** written from the [skill template](./assets/skill.template.md), with no
  placeholders left.
- **Any `references/*.guide.md` or `assets/*`** the skill needs, linked only from that same
  skill's folder.
- **Updated align-docs** — README and its LEEME translation, catalog, lifecycle map, and
  workflow — when behavior or paths change.

## Understand before you write

Ask the human to clarify the context, one closed-ended question at a time. Work out whether this
is a create or a fix. If fixing, read the target skill and every `references/` or `assets/` file
it links. If creating, read one sibling skill for its composition patterns. Read the
[skills catalog](../skills.catalog.md) to see where this skill sits and what it produces.

Then plan against the two guides: the [skill template](./assets/skill.template.md) that gives the
section structure, and the [sentence grammar](./references/grammar.md) the Steps must follow. Map
the content onto the standard sections — Role, Task, Guardrails, Context, Steps, Verification.
List which `references/` and `assets/` files you need to add or update. If behavior or paths are
changing, list which align-docs files must change too.

## Write it

Write the skill from the template, leaving no placeholders behind. Write any reference guides or
assets the skill needs, and link them only from that same skill's folder. If behavior or paths
changed, update the align-docs files. Commit with a message that fits the change — for example
`feat(skills): add /{skill}` for a new skill, or `refactor(skills): tighten /{skill}` for a fix.

## Done means

- The skill follows the template's sections, in order, with no placeholders left.
- The Steps and the References verb bullets parse as valid skill grammar forms.
- Sentences are short, with no artificial mid-sentence line breaks.
- The linked `references/` and `assets/` exist and stay inside the same skill folder.
- The align-docs are updated whenever behavior or paths changed, and the catalog lists the skill.
