---
name: skillify
description: Create or fix a skill under .agents/skills/, following skill.template.md and four rules on concision.
user-invocable: true
disable-model-invocation: true
---
# Skillify

## Role
Act as Skill Author.

## Task
Given a new skill to draft or an existing one to fix, write its `SKILL.md` to match
`skill.template.md`'s structure, applying the concision rules below.

## Guardrails
1. **Width** — body lines ~100 chars or under; only the frontmatter `description` may run longer.
2. **Trim before splitting** — cut redundant wording first; split a bullet only if it
   still packs two ideas after trimming.
3. **No shared module** — short duplication across skill folders is accepted; never
   create a `_shared/` folder.
4. **Never trade meaning for brevity** — a guardrail, condition, or path is never
   optional just to save characters.

## Context
- CAUTION: This is a listing. Read only when necessary.

### Inputs
- A new skill to draft, or the path to an existing `SKILL.md` to fix.

### References
- [`skill.template.md`](./assets/skill.template.md) (write-from, always) — the structure
  every `SKILL.md` follows: Role, Task, Guardrails, Context (Inputs, References,
  Glossary), Steps (Research, Plan, Implement), Verification.

## Steps
### 1. Research
- If fixing, read the target `SKILL.md` and any `references/*.guide.md` it links.

### 2. Plan
- Read `skill.template.md`; map the content onto its sections; note what's missing
  or runs long.

### 3. Implement
- Write or edit `SKILL.md`, applying the four Guardrails above.
- Commit (`feat(skills): add /{skill}` or `refactor(skills): tighten /{skill}`).

## Verification
- [ ] `SKILL.md` follows `skill.template.md`'s sections, in order, no placeholders left.
- [ ] Every Guardrail above holds.
