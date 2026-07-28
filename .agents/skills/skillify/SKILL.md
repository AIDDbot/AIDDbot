---
name: skillify
description: Create or fix a skill under .agents/skills/ — the only path to write skills.
user-invocable: true
disable-model-invocation: true
---
# Skillify — the only way to write a skill

Act as Skill Author. You create or fix a skill under `.agents/skills/` — and its `references/`
and `assets/` — turning intent into a well-formed skill, faithful to the house prose and
consistent with the rest of the set.

You are the single door through which any skill gets written, and a meta-skill: you maintain the
framework itself instead of taking part in the SDLC pipeline. This file is its own example —
running this prose back through the process should reproduce the skill.

## Rules

- **Single door** — never edit a skill outside this process.
- **Prose, not pseudocode** — write instructions an agent reads, never a formal grammar of
  marked-up verbs; the spirit of the tool is natural language.
- **Width** — short sentences, under 100 characters; never break one mid-way to fake the limit.
- **Length** — under 100 sentences per skill; blank lines and headings do not count.
- **Composition over duplication** — a little repetition is fine, but prefer to compose.
- **Both twins or neither** — a skill is its `SKILL.md` and its `LEEME.md`; never leave the
  Spanish twin behind.
- **Align the docs** — when behavior or paths change, sync the `SKILL.md` and `LEEME.md` of every
  affected skill, the `.command.md` and `.LEEME.md` of every affected command,
  `skills.catalog.md`, `skills.lifecycle.md`, and `docs/AIDD.workflow.md`.

## Context

- **Required input** — a new skill to draft, or the path to an existing `SKILL.md` to fix.
- **Optional input** — what changed and why, for a fix.
- **References** — the [skill template](./assets/skill.template.md) for the English `SKILL.md`
  and the [LEEME template](./assets/leeme.template.md) for its Spanish twin; both carry the same
  format rules.

## Research

Ask the human to clarify the context, one closed question at a time. From that decide whether
this is a creation — a new skill to draft — or a fix to an existing one.

If you are fixing, read the target skill, its Spanish twin, and every `references/` or `assets/`
file they link. If you are creating, read a sibling skill for its composition patterns. Either
way, read the [skills catalog](../skills.catalog.md) to see where this skill fits and what it
produces.

## Plan

Plan against the two templates Context listed: they share one skeleton and one set of format
rules, so the English and Spanish files differ in language only, never in structure or content.

Map the content onto the standard sections and list which `references/` and `assets/` files to
add or update. If behavior or paths change, list the align-docs to touch as well.

## Implement

Write `SKILL.md` from the template with no placeholders left, then `LEEME.md` as its Spanish
twin. Add any `references/*.md` or `assets/*` the skill needs, linked from its own folder only;
and, when behavior or paths changed, the align-docs.

Close with a fitting commit: `feat(skills): add /{skill}` for a new skill, or
`refactor(skills): tighten /{skill}` for a fix.

## Verification

- [ ] `SKILL.md` follows the template sections, in order, with no placeholders left.
- [ ] `LEEME.md` matches it section for section; the two differ in language only.
- [ ] Sentences are short prose, with no artificial mid-sentence line breaks.
- [ ] Linked `references/` and `assets/` exist and stay inside that same skill's folder.
- [ ] The align-docs are updated when behavior or paths changed, and the catalog lists the skill.
