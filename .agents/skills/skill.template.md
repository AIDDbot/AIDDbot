---
name: {slug}
description: {One sentence — what the skill does and the value it delivers. Mention the entry points/inputs and the key boundary (what it does NOT own). This is the external blurb shown in the catalog/invocation; keep purpose detail here, not duplicated below.}
user-invocable: true
disable-model-invocation: true
---
# {Title}

## Role
Act as {Role}.

## Task
{One paragraph: given {input}, produce {output}, with the key constraint/boundary. State what this skill owns and what it explicitly does not (hand off to `/{other-skill}`). This replaces the old one-line summary — don't restate it elsewhere.}

## Guardrails
<!-- Optional but recommended for any skill that changes code or status. Always-on invariants — NOT optional reading. Numbered, imperative. -->
1. **{Invariant}** — {why it holds / what to do instead}.

## Context
- CAUTION: This is a listing. Read only when necessary.

### Inputs
- {The entry point(s). When there are several, list them as "One of:" and note how each selects a different mode/path.}
> {Optional note: a precondition, a related entry route, or "Ask the minimum questions if ambiguous."}

### References
<!-- Grounding docs to read AND templates to write output from — both are "read when necessary".
     Tag each so the author knows its role: (read) for grounding, (write-from) for templates. -->
- {`path or link` (read) — what it grounds and when to read it.}
- [`{name}.template.md`](./assets/{name}.template.md) (write-from) — output file template.
> {Optional: "Run `/{skill}` first if missing."}

<!-- Optional sub-form for skills that branch by mode (greenfield/brownfield). -->
Mode guides:
- [`Greenfield Guide`](./references/greenfield.guide.md) — {no code; prescribes}.
- [`Brownfield Guide`](./references/brownfield.guide.md) — {existing code; extracts}.

### Glossary
<!-- Optional. Define ONLY terms with a precise, skill-specific meaning.
     Do not re-define cross-skill terms (Container, {slug}, Tier...) — those live once in the consumer {Agents_File}. -->
- **{Term}** — {definition}.

## Steps
### Step 1: Research
- {Identify the input/entry point and derive `{slug}` (and `{container}` when relevant).}
- {Read the grounding references; classify the mode if applicable.}

### Step 2: Plan
- {Read the relevant `*.template.md` template(s).}
- {Prepare the content / decisions before writing or touching code; ask essential closed-ended questions only if needed.}

### Step 3: Implement the Output
- {The concrete artifact(s) to write — exact paths with `{placeholders}` — or the edits to apply.}
- {Status/bookkeeping updates (spec status, checkboxes, frontmatter stamps) when applicable.}
- Commit the changes (`{docs|feat|fix|test|refactor|chore}{(scope)}: {description}`).
- Suggest handoff to the `/{next-skill}` skill.

## Verification
- [ ] {The primary artifact exists, is in the correct format, and contains no empty placeholders.}
- [ ] {The core boundary/guardrail held (nothing out of scope was changed; status is consistent).}
- [ ] {The skill's success condition is met (suite green, criteria checkable, etc.).}
