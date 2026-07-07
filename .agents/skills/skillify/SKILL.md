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
Given a new skill to draft or an existing one to fix, write its `SKILL.md` to match
`skill.template.md`, applying the concision rules below.

## Guardrails
- **Width** — sentences and body lines under 100 chars; only the frontmatter
  `description` may run longer.
- **Budget** — under 50 sentences per skill; blanks and headings don't count.
- **Say it once** — each caution lives in Guardrails only; Task and Steps may cite it
  by its bold name, never restate it.
- **Grammar** — every body bullet parses as one sentence form of the skill grammar;
  one symbol, one meaning (`→` is handoff only).
- **Placement** — Inputs lists only what the caller provides (`Optional:` when so);
  files read unconditionally are `_read_` bullets in Steps; References keeps only
  ambient grounding that applies throughout the run.
- **No shared module** — short duplication across skill folders beats a `_shared/` folder.
- **Never trade meaning for brevity** — a guardrail, condition, or path never drops
  just to save characters.

## Context

### Inputs
- A new skill to draft, or the path to an existing `SKILL.md` to fix.

### References
- _read_ [sentence forms and notation rules](./references/grammar.md)

## Steps
### 1. Research
- If fixing, read the target `SKILL.md` and any `references/*.guide.md` it links.

### 2. Plan
- _read_ [section structure every skill follows](./assets/skill.template.md).
- Map the content onto its sections; note gaps and overruns.

### 3. Implement
- Write or edit `SKILL.md` and any `references/*.guide.md`, applying the Guardrails above.
- Commit (`feat(skills): add /{skill}` or `refactor(skills): tighten /{skill}`).

## Verification
- [ ] `SKILL.md` follows `skill.template.md`'s sections, in order, no placeholders left.
- [ ] Every body bullet parses as one sentence form of the grammar.
- [ ] Every Guardrail above holds.
