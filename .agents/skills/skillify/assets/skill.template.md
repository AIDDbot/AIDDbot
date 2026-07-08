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
Boundary: {out-of-scope} belongs to `/{other-skill}`.}

## Guardrails
- **{Invariant}** — {structural/scoping guardrail; behavioral guardrails belong in
  the guide when this skill has one}.

## Context

- {Path shorthands, e.g. `{Arch}` = `{Product_Folder}/arch`.}

### Inputs
- {What the caller provides; if several, list as "One of:"; mark `Optional:` when so.
  Files read unconditionally go in Steps as `_read_` bullets, not here.}

### References
- {Ambient grounding only — files that apply throughout, not at one step; else drop
  the section. Items: `_{role}_ [{what it grounds}]({path})`.}

### Glossary
- **{Term}** — {definition, only if skill-specific and used in this skill}.

## Steps
{Every bullet parses as one sentence form of skillify's grammar.
Cite files inline in the step that uses them, one action per bullet:
`{_if_ {cond}, |_for-each_ {x}, }_{read|write|update}_ [{what it grounds}]({path})`.}

### 1. Research
- _ask_ me to clarify the context one question at a time with closed-ended answers.
- {Identify the input; derive `{slug}` / `{container}` when relevant.}
- {_read_ the always-needed inputs and guides.}

### 2. Plan
- {_read_ the output template(s).}
- {Prepare the content for the templates' placeholders before writing or touching code.}

### 3. Implement
- {_write_ the artifact(s), with exact paths.}
- Commit (`{docs|feat|fix|test|refactor|chore}(scope): {description}`).
- {_handoff_ to `/{skill}`.}

## Verification
- [ ] {The primary artifact exists, correct format, no empty placeholders.}
- [ ] {The core boundary/guardrail held.}
