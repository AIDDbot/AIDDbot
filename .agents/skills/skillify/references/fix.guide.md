# Fix or tighten an existing skill

The goal is to bring an existing skill in line with `skill.template.md`, without
changing what it does.

- Read the target `SKILL.md` and every `references/*.guide.md` it links, in full.
- Diff its structure against `skill.template.md`; note missing sections, un-tagged
  references, or an inline branch heavy enough to extract.
- Define a local path shorthand for any repeated (or single, if it helps width) path
  prefix; keep it local to this file — never touch the target repo's `{Agents_File}`.
- Tighten body lines to ~100 chars: cut real redundancy first (a phrase already covered
  elsewhere), then split bullets that pack two ideas, then wrap a paragraph — never drop
  a guardrail, condition, or path just to hit the width.
- Extract a heavy inline branch into its own `references/{branch}.guide.md` when it runs
  more than a few lines; leave short branches inline.
- Re-read the full diff once before committing — confirm every guardrail, condition, and
  placeholder survived, and that no shorthand was applied where the underlying value
  actually varies (e.g. a wildcard search across slugs is not one bound slug).
- Commit (`refactor(skills): tighten /{skill}`).

## Guardrails
- Never create a `_shared/` module — short duplication across skill folders is accepted.
- Never trade meaning for width — a guardrail, condition, or path is never optional.
