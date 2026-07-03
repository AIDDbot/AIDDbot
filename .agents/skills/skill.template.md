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
<!-- Whenever a path prefix (e.g. `{Product_Folder}/arch`) appears below, define a short local alias here,
     e.g. `- {Arch} = {Product_Folder}/arch.` Goal is line width, not just character count — do it even for
     a single use below. Local to this file only — never touches {Agents_File}. -->

### Inputs
- {The entry point(s). When there are several, list them as "One of:" and note how each selects a different mode/path.}
> {Optional note: a precondition, a related entry route, or "Ask the minimum questions if ambiguous."}

### References
<!-- Grounding docs to read AND templates to write output from — both are "read when necessary".
     Tag each with its role — (read) for grounding, (write-from) for templates — AND its cardinality:
       always      — read unconditionally, every run.
       if {cond}   — read only when a specific, checkable condition holds (mode, container kind, scope).
       optional    — read opportunistically if it exists / helps; its absence is fine.
     e.g. `path (read, always)`, `path (write-from, if {container} owns persistence)`, `path (read, optional)`. -->
- {`path or link` (read, always|if {cond}|optional) — what it grounds.}
- [`{name}.template.md`](./assets/{name}.template.md) (write-from, always|if {cond}) — output file template.
> {Optional: "Run `/{skill}` first if missing."}

<!-- Default pattern for any skill with a heavy inline branch (mode, first-run/resume, route A/B...):
     extract each branch to its own references/{branch}.guide.md instead of writing it inline in Steps.
     A guide file is a flat goal statement + bullet list, with its own "## Guardrails" for invariants
     that only apply to that branch (skill-wide invariants stay in the top-level Guardrails, if any).
     SKILL.md's Steps stay a thin classifier + dispatcher: identify the branch, read and follow its guide.
     Skip this split when both branches together are only a few short lines — the indirection isn't worth it. -->
Mode guides (tag each `(if {mode})` — exactly one is read per run, chosen by the classifier in Step 1):
- [`Greenfield Guide`](./references/greenfield.guide.md) (if greenfield) — {no code; prescribes}.
- [`Brownfield Guide`](./references/brownfield.guide.md) (if brownfield) — {existing code; extracts}.

### Glossary
<!-- Optional. Define ONLY terms with a precise, skill-specific meaning.
     Do not re-define cross-skill terms (Container, {slug}, Tier...) — those live once in the consumer {Agents_File}.
     Short vocabulary/guardrail duplication ACROSS skills is accepted as-is: each skill folder is a self-contained,
     copyable unit, so a shared `_shared/` module would introduce coupling that doesn't exist today. If a term
     ever hurts enough to fix, the only legitimate path is centralizing it in {Agents_File} — never a new shared folder. -->
- **{Term}** — {definition}.

## Steps
### 1. Research
- {Identify the input/entry point and derive `{slug}` (and `{container}` when relevant).}
- {Read the grounding references; classify the mode if applicable.}

### 2. Plan
- {Read the relevant `*.template.md` template(s).}
- {Prepare the content / decisions before writing or touching code; ask essential closed-ended questions only if needed.}

### 3. Implement
- {The concrete artifact(s) to write — exact paths with `{placeholders}` — or the edits to apply.}
- {Status/bookkeeping updates (spec status, checkboxes, frontmatter stamps) when applicable.}
- Commit the changes (`{docs|feat|fix|test|refactor|chore}{(scope)}: {description}`).
- Suggest handoff to the `/{next-skill}` skill.

## Verification
- [ ] {The primary artifact exists, is in the correct format, and contains no empty placeholders.}
- [ ] {The core boundary/guardrail held (nothing out of scope was changed; status is consistent).}
- [ ] {The skill's success condition is met (suite green, criteria checkable, etc.).}
