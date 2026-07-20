---
name: {slug}
description: {what it does in one sentence}
user-invocable: true
disable-model-invocation: true
---
# {Title}

## Role
Act as {Role}

## Task
{One or two sentences explaining the goal of the skill.}

### Guardrails
- [ ] {**guardrail**}:{explaining the guardrail}

## Context

- {Path shorthands, e.g. `{Arch}` = `{Product_Folder}/arch`.}

### Inputs
- [ ] Required: {what the caller must provide}
- [ ] Optional: {what the caller may provide}

### References
- {files that apply throughout the skill}

### Glossary
- **{Term}** — {definition, only if skill-specific and used in this skill}.

## Steps

### 1. Research
- {_read_ the always-needed inputs and guides.}
- _ask_ me to clarify the context one question at a time with closed-ended answers.

### 2. Plan
- {_read_ the output template(s).}
- {Prepare the content for the templates' placeholders before writing or touching code.}

### 3. Implement
- {_write_ the artifact(s), with exact paths.}
- _commit_ the changes (`{docs|feat|fix|test|refactor|chore}(scope): {description}`).
- {_handoff_ to `/{skill}`.}

## Verification
- [ ] {The primary artifact exists, correct format, no empty placeholders.}
- [ ] {The core goal of the skill is achieved.}
