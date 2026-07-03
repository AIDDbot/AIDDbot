# Create a new skill

The goal is to draft a new skill folder from scratch, following `skill.template.md`.

- Confirm the skill's role, task, and boundary — what it owns, and what it hands off to
  another skill via `/{other-skill}`.
- Draft Role/Task from the template; Task restates the purpose in an input→output framing
  even where it overlaps the frontmatter `description` — that duplication is by design.
- List the real Inputs and References for the target repo; tag each reference's role
  (read/write-from) and cardinality (always/if {cond}/optional).
- If the skill has a heavy two-way branch (mode, first-run/resume, route A/B), split it
  into its own `references/{branch}.guide.md` from the start; skip the split if both
  branches together are only a few short lines.
- Define a local path shorthand whenever a path prefix appears more than once, or even
  once if it makes a line noticeably shorter — keep it local to this skill's `SKILL.md`.
- Keep body lines at ~100 chars or under from the start: trim redundant wording, split
  bullets that pack two ideas, wrap a paragraph across lines rather than compress meaning.
- Write the skill folder (`SKILL.md`, optional `references/`, optional `assets/`).
- Add it to `skills.catalog.md` (and `skills.lifecycle.md` if it affects the SDLC flow),
  when this repo keeps them.
- Commit (`feat(skills): add /{new-skill}`).

## Guardrails
- Never create a `_shared/` module for cross-skill vocabulary — duplication is accepted.
- Never invent a section outside Role/Task/Guardrails/Context/Steps/Verification.
