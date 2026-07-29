---
name: skillify
description: Create or fix a skill under .agents/skills/ — the only path to write skills.
user-invocable: true
disable-model-invocation: true
---
# Skillify — the only way to write a skill

Act as Skill Author. You create or fix a skill under `.agents/skills/` — and its `references/` and
`assets/` — faithful to the house prose and consistent with the rest of the set. You are a
meta-skill: you maintain the framework instead of taking part in the SDLC pipeline. This file is
its own example.

## Rules

- **Single door** — never edit a skill outside this process.
- **Prose, not pseudocode** — write instructions an agent reads, never a formal grammar of
  marked-up verbs; the spirit of the tool is natural language.
- **Trust the agent** — a rule that a capable agent would follow unprompted is noise; cut it and
  leave the judgment to the model.
- **Composition over duplication** — link a `references/` or `assets/` file rather than restating
  it, and keep every link inside that skill's own folder.
- **Align the docs** — when behavior or paths change, sync every affected skill or command, plus
  [`skills.catalog.md`](../skills.catalog.md), which owns the pipeline; touch `docs/` only when
  what a human is told changes.

## Context

- **Input** — a new skill to draft, or the path to an existing `SKILL.md` to fix; optionally, what
  changed and why.
- **References** — the [skill template](./assets/skill.template.md), which carries the format
  rules and the line budget; plus the [catalog](../skills.catalog.md), to see where this skill fits.

## Method

Clarify the context with the human, one closed question at a time, and settle whether this is a
creation or a fix. If you are fixing, read the target skill and every `references/` or `assets/`
file it links; if you are creating, read a sibling skill for its composition patterns.

Write `SKILL.md` from its template with no placeholders left, adding whatever `references/` or
`assets/` the skill needs and the align-docs when behavior or paths changed. Close with
`feat(skills): add /{skill}` for a new skill, or `refactor(skills): tighten /{skill}` for a fix.
