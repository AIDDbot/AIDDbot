---
name: skillify
description: Create or fix a skill under .agents/skills/, following skill.template.md and the concision rules.
user-invocable: true
disable-model-invocation: true
---
# Skillify

## Role
Act as Skill Author.

## Task
Given a new skill to draft or an existing one to fix, write its `SKILL.md`
Apply the same rules to its reference files.

### Guardrails
- **Width** — sentences and body lines under 100 chars
- **Length** — under 50 sentences per skill; blanks and headings don't count
- **Grammar** — every body bullet parses as one sentence form of the skill grammar
- **Composition** — short duplication is acceptable but favor composition over duplication.

## Context

### Inputs
- [ ] Required: A new skill to draft, or the path to an existing `SKILL.md` to fix.

### References
- _read_ [sentence grammar and examples](./references/grammar.md)

## Steps
### 1. Research
- _if_ fixing, _read_ the target `SKILL.md` and any `references/*.guide.md` it links.

### 2. Plan
- _read_ [section structure every skill follows](./assets/skill.template.md).
- _map_ the content onto its sections.

### 3. Implement
- _write_ `SKILL.md` and any `references/*.guide.md`.
- _commit_ the changes `feat(skills): add /{skill}` or `refactor(skills): tighten /{skill}`.

## Verification
- [ ] `SKILL.md` follows `skill.template.md`'s sections, in order, no placeholders left.
- [ ] Every body bullet parses as one sentence form of the grammar.

