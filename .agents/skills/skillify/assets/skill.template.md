---
name: {slug}
description: {what it does in one sentence}
user-invocable: true
disable-model-invocation: true
---
# {Title}

## Role
Act as {Role}.

## Task
{One or two short sentences explaining the goal of the skill.}

### Guardrails
- **{guardrail}** — {one short sentence explaining the invariant}.

## Context

- {Path shorthands, e.g. `{Arch}` = `{Product_Folder}/arch`.}

### Inputs
- [ ] Required: {what the caller must provide}.
- [ ] Optional: {what the caller may provide}.

### References
- _read_ [{label}](./assets/{file}) — {when it applies}.

### Glossary
- **{Term}** — {definition, only if skill-specific and used in this skill}.

## Steps

### 1. Research
- _ask_ me to clarify the context one question at a time with closed-ended answers.
- _read_ {always-needed inputs and guides}.

### 2. Plan
- _read_ [{output template}](./assets/{template}).
- _prepare_ the content for the template placeholders before writing.

### 3. Implement
- _write_ {the artifact(s), with exact paths}.
- _commit_ the changes (`{docs|feat|fix|test|refactor|chore}(scope): {description}`).
- _handoff_ to `/{skill}`.

## Verification
- [ ] {The primary artifact exists, correct format, no empty placeholders.}
- [ ] {The core goal of the skill is achieved.}
