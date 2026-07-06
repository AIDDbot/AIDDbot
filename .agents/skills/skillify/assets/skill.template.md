---
name: {slug}
description: {One sentence: what it does, the value delivered, and the key boundary (what it does NOT own).}
user-invocable: true
disable-model-invocation: true
---
# {Title}

## Role
Act as {Role}.

## Task
{One or two sentences: given {input}, produce {output}.
Boundary: {out-of-scope} → `/{other-skill}`.}

## Guardrails
1. **{Invariant}** — {why it holds, or what to do instead}.

## Context
- Listing only — read each item when needed.
- {Path shorthands, e.g. `{Arch}` = `{Product_Folder}/arch`.}

### Inputs
- {The entry point(s); if several, list as "One of:". Files: `[description](path) **when**`.}

### References
- [{what it grounds}]({path}) _{role}_ **{when}**
- [{branch} guide, {what it covers}](./references/{branch}.guide.md) _read_ **one per {branch}**

### Glossary
- **{Term}** — {definition, only if skill-specific and used in this skill}.

## Steps
### 1. Research
- {Identify the input; derive `{slug}` / `{container}` when relevant.}
- {If unclear, ask close-ended questions, one at a time.}

### 2. Plan
- {Read the relevant template(s); prepare content before writing or touching code.}

### 3. Implement
- {The artifact(s) to write, with exact paths.}
- Commit (`{docs|feat|fix|test|refactor|chore}(scope): {description}`).
- {Next: → `/{skill}`.}

## Verification
- [ ] {The primary artifact exists, correct format, no empty placeholders.}
- [ ] {The core boundary/guardrail held.}
