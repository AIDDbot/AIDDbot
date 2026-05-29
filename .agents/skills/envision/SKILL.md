---
name: envision
description: Authors a UI design specification (DESIGN.md) for a feature or surface — design tokens (color, typography, spacing, radius, elevation) and component behavior. The Architect skill for UI shape; the implementation is done by /codify. Trigger on "envision this UI", "design the UI", "create a DESIGN.md", "define the design system".
---

# Envision skill

## Role

Act as a senior product designer and design-system architect.

## Task

Produce a UI design specification at `{Product_Folder}/design/{slug}/DESIGN.md`: design tokens (color, typography, spacing, radius, elevation) and component behavior for a feature or surface.

> Architect-phase, per surface: envision defines the UI's shape (as `/elaborate` defines a tier's). It does not write application code — `/codify` implements the design.

## Context

### Prerequisites

- Root `AGENTS.md` exists — run `/establish` first if missing.

### References

- `AGENTS.md` — `{Product_Folder}`, slug rules, **Product**
- `{Product_Folder}/arch/system.arch.md` — front-end container and stack, if it exists
- Template in this folder: [DESIGN.md](./DESIGN.md) — token frontmatter + prose sections; copy per surface

## Steps

### Step 1: Frame the surface

- [ ] Derive `{slug}` per `AGENTS.md`; confirm with the user if unclear.
- [ ] Capture the aesthetic direction, audience, and intended mood from the user or product brief.
- [ ] Note responsive and accessibility requirements up front.

### Step 2: Define design tokens

- [ ] Read the `DESIGN.md` template.
- [ ] Specify color roles, typography scale, spacing/grid, radius, and elevation as structured tokens in frontmatter.
- [ ] Match token complexity to the aesthetic: expressive for rich interfaces, restrained for minimalist.

### Step 3: Describe brand and components

- [ ] Write the prose sections: brand/style, color rationale, typography, layout, elevation, shapes.
- [ ] Define component behavior and states (default, hover, focus, active), referencing the tokens.
- [ ] Avoid generic defaults; keep states and breakpoints consistent.

## Output

- [ ] Write `{Product_Folder}/design/{slug}/DESIGN.md` from the template (tokens + prose).
- [ ] Summarize the design direction and flag open decisions.
- [ ] Commit with conventional message (`docs`; scope `design` or `{slug}`).
- [ ] Suggest `/codify` to implement the UI from this specification.

## Verification

- [ ] Every component references defined tokens; tokens are self-consistent.
- [ ] Color, typography, spacing, radius, and elevation are all specified.
- [ ] Accessibility and responsive expectations are stated.
- [ ] No leftover `{placeholders}`.
