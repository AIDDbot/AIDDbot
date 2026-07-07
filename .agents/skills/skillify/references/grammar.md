# Skill grammar

Every body bullet in a `SKILL.md` parses as exactly one sentence form below.
One symbol, one meaning; one idea, one syntax.

## Sentence forms

| Form | Syntax |
|------|--------|
| Action | `<Verb> <object>.` — one action per bullet |
| File action | `_read_ \| _update_ [what it grounds](path)` |
| Condition | `If <cond>, <action>.` — optionally `; else <action>.` |
| Iteration | `Foreach <x>, <action>.` |
| Abort | `If <cond>, stop: → /skill.` |
| Handoff | `→ /skill` — optionally `per <x>`, `then /next` |
| Commit | ``Commit (`type(scope): {description}`).`` |
| Guardrail cite | `Apply **Name**.` |

Forms compose left to right: `If <cond>, foreach <x>, _read_ [...](...)`.

## Rules

- `→` means hand off to a skill — nothing else. For cause or effect in prose, use words.
- Conditions always read `If <cond>, <action>.` — never `<cond>: <action>`,
  `<cond>? <action>`, or `<cond> → <action>`.
- A bare file action always runs; the `If <cond>,` prefix is the only way to make
  a read or update conditional.
- No blockquotes — a `>` note is either a Condition bullet in Steps or a Guardrail.
- Handoffs close their step; each branch is its own Condition bullet.
- A glossary term defined in several skills is copied verbatim, never paraphrased —
  drift must show in a plain diff.

## Guides

`references/*.guide.md` files follow the same sentence forms and rules, plus:

- Open with a title and one goal-or-scope sentence.
- Guardrails are bold-named and citable, like `SKILL.md`'s; a guardrail shared across
  guides keeps its bold name verbatim (the tail may vary).
- Tier guides list outputs as `` Write `{output}` from [template](path). `` under
  **Templates**, then priorities under **Focus** — no arrows: `→` stays handoff-only.
