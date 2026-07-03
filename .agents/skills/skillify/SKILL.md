---
name: skillify
description: Create a new skill or fix an existing one under .agents/skills/, following skill.template.md's structure and conventions.
user-invocable: true
disable-model-invocation: true
---
# Skillify

## Role
Act as Skill Author.

## Task
Given a request to add a new skill or fix an existing one, produce a `SKILL.md` (plus
`references/`/`assets/` if needed) that matches `skill.template.md`, then keep the
skill catalog in sync when this repo keeps one.

## Guardrails
1. **No `_shared/` module** — vocabulary/guardrail duplication across skill folders is
   accepted by design; the only legitimate centralization point is `{Agents_File}`.
2. **Template structure is mandatory** — Role/Task/Guardrails/Context/Steps/Verification,
   in that order; never invent a new top-level section.
3. **Width is a goal, not a rule to break meaning for** — cut redundancy and split dense
   bullets first; never drop a guardrail, condition, or path just to hit ~100 chars.

## Context
- CAUTION: This is a listing. Read only when necessary.

### Inputs
- One of:
  - A request to create a new skill: its name, role, task, and boundary.
  - An existing skill to fix: the path to its `SKILL.md`.
> Ask the minimum questions if the boundary or scope is ambiguous.

### References
- [`skill.template.md`](./assets/skill.template.md) (write-from, always) — the structure
  and conventions every `SKILL.md` follows.
- [`../skills.catalog.md`](../skills.catalog.md) (read, optional) — the skill inventory;
  update it when adding, removing, or rescoping a skill, if this repo keeps one.

Mode guides:
- [`Create Guide`](./references/create.guide.md) (if create) — draft a new skill from scratch.
- [`Fix Guide`](./references/fix.guide.md) (if fix) — tighten an existing skill in place.

### Glossary
- **Mode** — `create` (no existing skill → draft new) or `fix` (existing skill → tighten).

## Steps
### 1. Research
- Identify the mode (create or fix), then read and follow its reference guide.
- For fix mode, read the target `SKILL.md` and every `references/*.guide.md` it links.

### 2. Plan
- Read `skill.template.md`; map the target content onto its sections.
- List the concrete gaps or changes before writing (missing sections, un-tagged
  references, oversized lines, an inline branch heavy enough to extract).

### 3. Implement
- Write or edit `{skill}/SKILL.md` (and `references/*.guide.md` if a branch needs one).
- Update `skills.catalog.md` (and `skills.lifecycle.md` if the SDLC flow changed), when
  this repo keeps them.
- Commit (`feat(skills): add /{skill}` or `refactor(skills): tighten /{skill}`).

## Verification
- [ ] `SKILL.md` follows `skill.template.md`'s sections, in order, with no placeholders left.
- [ ] Body lines are ~100 chars or under; only the frontmatter `description` may run longer.
- [ ] No new `_shared/` module; any local path shorthand stays defined in this file only.
- [ ] The catalog (and lifecycle, if relevant) reflect the change, when this repo keeps them.
