# Skill grammar

Every body bullet in a `SKILL.md` parses as exactly one sentence form below.
One symbol, one meaning; one idea, one syntax.

## Sentence forms

| Form | Syntax |
|------|--------|
| Action | `<Verb> <object>.` — one action per bullet |
| File action | `_read_ \| _write_ \| _update_ [what](path)` |
| Ask | `_ask_ me to clarify ...` |
| Condition | `_if_ <cond>, <action>.` — optionally `; else <action>.` |
| Iteration | `_for_each_ <x>, <action>.` |
| Abort | `` _if_ <cond>, stop; _handoff_ to `/skill`. `` |
| Handoff | `` _handoff_ to `/skill` `` — optionally `per <x>`, `or stop` |
| Commit | ``Commit (`type(scope): {description}`).`` |
| Guardrail cite | `Apply **Name**.` |

Forms compose left to right: `_if_ <cond>, _for_each_ <x>, _read_ [...](...)`.

## Rules

- `→` never appears in `SKILL.md` Steps or in `references/*.guide.md`; `skills.catalog.md`,
  `skills.lifecycle.md`, and output templates under `assets/` may use it as flow notation.
- Conditions always read `_if_ <cond>, <action>.` — never `If <cond>,`,
  `<cond>: <action>`, `<cond>? <action>`, or `<cond> → <action>`.
- A bare file action always runs; the `_if_ <cond>,` prefix is the only way to make
  a read or update conditional.
- No blockquotes — a `>` note is either a Condition bullet in Steps or a Guardrail.
- Commit and handoff are separate bullets; a handoff still closes its step.
- A glossary term defined in several skills is copied verbatim, never paraphrased —
  drift must show in a plain diff.

## Guides

`references/*.guide.md` files follow the same sentence forms and rules, plus:

- One guide per skill — no per-tier/variant files; variants become `##`/`###` sections
  inside it (see `extract.guide.md`'s `## Tiers`).
- Open with a title, then `## Guardrails` — before the goal sentence.
- The shared evidence guardrail set is bold-named, citable, and kept byte-identical
  across guides that reuse it: **Evidence wins**, **Never invent requirements**,
  **One strong default**, **Observe, don't reform**, **Internals are out of your scope**.
- After Guardrails: one goal sentence, then the bullets; variant sections nest `_if_`
  bullets under a `##`/`###` heading, one action per bullet, no arrows.
