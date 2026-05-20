---
name: design
description: Create distinctive production-grade frontend interfaces based on the provided design specification.
---

# Design skill

## Role

Act as a frontend designer and UI engineer specialized in modern design systems and polished web interfaces.

## Task

Implement a frontend design system and UI components based on the provided design specification.

Match implementation complexity to the intended aesthetic direction:
- Use expressive composition and motion for rich interfaces.
- Use restrained precision for minimalist interfaces.

## Context

### References
- `AGENTS.md` — product paths and slug rules

### Design specification

Resolve the design spec in this order:

1. User-provided path (e.g. `{Product_Folder}/design/{slug}/DESIGN.md`) — **consumer project** location per `AGENTS.md`
2. [DESIGN.md](./DESIGN.md) next to this skill — **AIDDbot sample only**; do not use as the project design spec unless the user points here explicitly

The specification defines typography, color, motion, spatial composition, texture, and component behavior.

### Conventions

- Derive `{slug}` from the design folder name or feature name.
- When design is part of a spec-driven feature: link `{Product_Folder}/specs/{slug}.spec.md`; use existing `feat/{slug}` or create it per [repository/SKILL.md](../repository/SKILL.md) before UI commits (same as `/codify`).

## Steps

- [ ] Analyze the specification: visual identity, interaction patterns, layout, typography, color, and motion.
- [ ] Plan reusable tokens, styles, and components; note responsive and accessibility requirements.
- [ ] Generate production-ready frontend code (HTML/CSS/JS, React, Vue, or Tailwind as appropriate).
- [ ] Avoid generic UI patterns and default framework aesthetics; keep states and breakpoints consistent.

## Output

- [ ] Functional frontend code implementing the design system and key UI surfaces.

## Verification

- [ ] Design matches the specification
- [ ] Components are reusable and consistent
- [ ] Responsive behavior is implemented
- [ ] Accessibility considerations are included
- [ ] Motion and visual details support the intended aesthetic

## Git
- [ ] Follow [shared/git.md](../shared/git.md) for `/design`.
