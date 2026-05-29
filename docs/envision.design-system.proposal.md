# Proposal: reposition `/envision` as a project design system

> Status: **reference material only** — not yet decided, not actioned. Source for a future to-do.
> Scope: `/envision`, `DESIGN.md`, and how the design system is consumed by `/codify`.
> The skill is intentionally left untouched until this is decided.

## The problem

`/envision` conflates two different layers of the pipeline.

The shipped template (`.agents/skills/envision/DESIGN.md`, "Totality Festival") is **not** a single screen's design — it's a full **project design system**: global tokens, brand voice, typography strategy, elevation rules. Yet the skill stores it per-feature at `{Product_Folder}/design/{slug}/DESIGN.md` and the catalog calls it "per surface."

That mismatch is the root of the doubt: a **project-wide, write-once reference** is being modeled as a **per-feature artifact**. Those are different layers:

| Layer | Examples today | Cardinality | Phase |
|-------|----------------|-------------|-------|
| Global reference (constrains all future code) | `AGENTS.md`, `SOUL.md`, `{tier}.rules.md`, ADRs | once per project/tier | Architect |
| Per-feature artifact | `{slug}.spec.md`, `{slug}.plan.md` | one per feature | Builder |

A design system belongs in the **top row**. It is the *visual* sibling of `{tier}.rules.md` — "how front-end code must look," as `front.rules.md` is "how front-end code must be written."

## Why NOT fold it into `/establish`

`/establish` generates L1 `AGENTS.md` and **copies `SOUL.md` verbatim** (fixed template, no placeholders). A design system is the opposite:

- Highly project-specific and creative — cannot be copied verbatim like SOUL.
- Needs a different role (product designer) and different verification (token self-consistency, a11y, contrast).
- Conditional — a CLI/back-only project has no UI and shouldn't be forced through it; `/establish` runs for *every* project.

The right sibling is `/extract`, not `/establish`: both are "Architect generates a stable convention doc tailored to this project, consumed at codify time."

## Recommended model

Keep the skill; reposition it from per-surface → **project design system**.

1. **Global storage**, keyed by surface/tier, never by feature `{slug}`:
   - `{Product_Folder}/design/DESIGN.md` (single frontend), or
   - `{Product_Folder}/design/{tier}.design.md` for genuinely distinct frontends (app vs marketing vs admin).
2. **Runs once in the Architect loop**, after `/extract` (front only):
   `/establish -> /explore -> /elaborate -> /extract -> /envision (front only)`
3. **`front.rules.md` cross-references it** so it's discoverable as the visual half of the front rules.

## Answers to the open questions

- **When is it called/read? Like a codify rule?** — Yes. Read at **codify** time for front-tier work, exactly like `{tier}.rules.md`. `codify` already lists `DESIGN.md` as a reference; just point it at the global file instead of `design/{slug}/`.
- **Inject at planify for UI tasks?** — No. `planify` sequences steps and shouldn't carry visual tokens. At most add "design system" to its existing "respect ADRs and arch constraints" line. Tokens are a codify-time reference, not a planning input.
- **A dedicated step to apply the design (generate CSS…)?** — Yes, and it's **not** `/envision`'s job. A design system has two products:
  - **Spec**: `DESIGN.md` (tokens + prose) — source of truth, authored by `/envision`.
  - **Implementation artifact**: the file the app consumes — `tailwind.config`, `:root` CSS custom properties, `theme.ts`, etc.

  Generating the artifact is **code**, so it's a `/codify` job — a *foundational* one-time codify ("implement the design system → emit the theme/tokens file"), treated as the first front-tier feature. Subsequent UI features' `/codify` consume both `DESIGN.md` and the generated theme. No new skill needed for "apply."

## Feature-specific UI

When a single feature needs bespoke component behavior beyond the global system, that belongs in its **spec** (`/specify`) as UI acceptance criteria referencing the global design system — not a separate per-slug `DESIGN.md`. Clean split: **global design system (Architect, once)** vs **feature UI behavior (spec, per feature)**.

## Net recommendation

- Don't delete `/envision`; don't fold it into `/establish`. Reposition it as the front-tier design-system author, sibling to `/extract`, output to a global path keyed by tier.
- Fill the real gap: make design-system *implementation* an explicit foundational `/codify` (`DESIGN.md` → theme/CSS), documented in the catalog loop.

## If actioned later — files to touch

- `.agents/skills/envision/SKILL.md` — re-scope path (global, tier-keyed) and wording (project design system, not per-surface).
- `.agents/skills/codify/SKILL.md` — point `DESIGN.md` reference at the global path.
- `.agents/skills/extract/` (front rules guidance/template) — cross-reference the design system.
- `.agents/AIDD.skills-catalog.md` — fix the loop (`/envision` after `/extract`, front only) and the "UI design" line.
- `docs/architect.pipelines.md` — add `/envision` to the architecture pipeline.
- Root `AGENTS.md` and `README.md` — align per `AGENTS.md` change-alignment rule.
