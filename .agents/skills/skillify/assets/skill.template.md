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
{One paragraph: given {input}, produce {output}, and the key boundary — hand off to
`/{other-skill}` for what it doesn't own.}

## Guardrails
1. **{Invariant}** — {why it holds, or what to do instead}.

## Context
- CAUTION: This is a listing. Read only when necessary.

### Inputs
- {The entry point(s); if several, list as "One of:".}

### References
- {`path or link`} (read | write-from, always | if {cond} | optional) — {what it grounds}.

Mode guides, if the skill branches heavily (one is read per run):
- [`{Branch} Guide`](./references/{branch}.guide.md) (if {branch}) — {what it covers}.

### Glossary
- **{Term}** — {definition, only if skill-specific}.

## Steps
### 1. Research
- {Identify the input and derive `{slug}` / `{container}` when relevant.}
- Ask the user for any additional context. One question at a time.With close-ended questions.

### 2. Plan
- {Read the relevant template(s); prepare content before writing or touching code.}

### 3. Implement
- {The artifact(s) to write, with exact paths.}
- Commit (`{docs|feat|fix|test|refactor|chore}(scope): {description}`).

## Verification
- [ ] {The primary artifact exists, in the correct format, no empty placeholders.}
- [ ] {The core boundary/guardrail held.}
