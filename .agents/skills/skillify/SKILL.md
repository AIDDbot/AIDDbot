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
1. **Width** — sentences and body lines under 100 chars; only the frontmatter
   `description` may run longer.
2. **Budget** — under 50 sentences per skill; blanks and headings don't count.
3. **Say it once** — each caution lives in Guardrails only; Task and Steps may cite it
   (`Guardrail 1`), never restate it.
4. **Notation** — `→ /skill` = handoff. References read `**when** _role_ [description](path)`;
   file inputs read `[description](path) **when**`; role ∈ `write-from | follow | update`;
   when ∈ `always | if {cond} | foreach {x}`.
5. **No shared module** — short duplication across skill folders beats a `_shared/` folder.
6. **Never trade meaning for brevity** — a guardrail, condition, or path never drops
   just to save characters.

## Context
- Listing only — read each item when needed.

### Inputs
- A new skill to draft, or the path to an existing `SKILL.md` to fix.

### References
- **always** _write-from_ [section structure every skill follows](./assets/skill.template.md)

## Steps
### 1. Research
- If fixing, read the target `SKILL.md` and any `references/*.guide.md` it links.

### 2. Plan
- Read `skill.template.md`; map the content onto its sections; note gaps and overruns.

### 3. Implement
- Write or edit `SKILL.md`, applying the Guardrails above.
- Commit (`feat(skills): add /{skill}` or `refactor(skills): tighten /{skill}`).

## Verification
- [ ] `SKILL.md` follows `skill.template.md`'s sections, in order, no placeholders left.
- [ ] Every Guardrail above holds.
