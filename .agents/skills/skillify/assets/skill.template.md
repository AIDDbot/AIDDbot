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

- {Path shorthands, e.g. `{Arch}` = `{Product_Folder}/arch`.}

### Inputs
- {The entry point(s); if several, list as "One of:". Files: `[description](path) **when**`.}

### References
- {Ambient grounding only — files that apply throughout, not at one step; else drop
  the section. Items: `_{role}_ [{what it grounds}]({path})`.}

### Glossary
- **{Term}** — {definition, only if skill-specific and used in this skill}.

## Steps
{Cite files inline in the step that uses them:
`{if {cond}, |foreach {x}, }_{role: write-from|follow|update}_ [{what it grounds}]({path})`.}

### 1. Research
- {Identify the input; derive `{slug}` / `{container}` when relevant.}
- {If unclear, ask close-ended questions, one at a time.}

### 2. Plan
- {_write-from_ the output template(s); prepare content before writing or touching code.}

### 3. Implement
- {The artifact(s) to write, with exact paths.}
- Commit (`{docs|feat|fix|test|refactor|chore}(scope): {description}`).
- {Next: → `/{skill}`.}

## Verification
- [ ] {The primary artifact exists, correct format, no empty placeholders.}
- [ ] {The core boundary/guardrail held.}
