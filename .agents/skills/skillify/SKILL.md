---
name: skillify
description: Create or fix a skill under .agents/skills/ — the only path to write skills.
user-invocable: true
disable-model-invocation: true
---
# Skillify

## Role
Act as Skill Author.

## Task
Create or fix a skill under `.agents/skills/`. This is the only path that writes skills.
Apply the same rules to its `references/` and `assets/`.

### Guardrails
- **Single door** — never edit a skill outside `/skillify`.
- **Width** — write short sentences under 100 chars; never wrap mid-sentence to fake it.
- **Length** — under 100 sentences per skill; blanks and headings don't count.
- **Grammar** — Steps use skill grammar forms; other sections stay declarative.
- **Composition** — short duplication is fine; prefer composition over duplication.
- **Align docs** — when behavior/paths change, sync catalog, lifecycle, README/LEEME, workflow.

## Context

### Inputs
- [ ] Required: a new skill to draft, or the path to an existing `SKILL.md` to fix.
- [ ] Optional: what changed and why (for a fix).

### References
- _read_ [sentence grammar and examples](./references/grammar.md)
- _read_ [section structure every skill follows](./assets/skill.template.md)
- _read_ [prose structure for the README/LEEME](./assets/leeme.template.md)

### Glossary
- **Align docs** — skill & command README/LEEME, catalog, lifecycle, `docs/AIDD.workflow.md`.

## Steps
### 1. Research
- _ask_ me to clarify the context one question at a time with closed-ended answers.
- _identify_ create vs fix.
- _if_ fixing, _read_ the target `SKILL.md` and every `references/` or `assets/` file it links.
- _if_ creating, _read_ one sibling `SKILL.md` for composition patterns.
- _read_ [skills catalog](../skills.catalog.md) — where the skill sits and what it produces.

### 2. Plan
- _read_ [skill template](./assets/skill.template.md).
- _read_ [sentence grammar](./references/grammar.md).
- _map_ the content onto Role, Task, Guardrails, Context, Steps, Verification.
- _list_ which `references/` and `assets/` files to add or update.
- _if_ behavior or paths change, _list_ which align-docs files to update.

### 3. Implement
- _write_ `SKILL.md` from the template — no placeholders left.
- _write_ any `references/*.guide.md` or `assets/*` the skill needs.
- _link_ those files from the skill only (same skill folder).
- _if_ behavior or paths changed, _update_ the align-docs files.
- _commit_ `feat(skills): add /{skill}` or `refactor(skills): tighten /{skill}`.

## Verification
- [ ] `SKILL.md` follows `skill.template.md` sections, in order, no placeholders left.
- [ ] Steps and References verb bullets parse as skill grammar forms.
- [ ] Sentences are short; no artificial mid-sentence line breaks.
- [ ] Linked `references/` and `assets/` exist and stay in the same skill folder.
- [ ] Align-docs updated when behavior or paths changed; catalog lists the skill.
