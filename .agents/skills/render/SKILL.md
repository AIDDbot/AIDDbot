---
name: render
description: Create distinctive production-grade frontend interfaces based on the provided design specification.
---

# Render skill

## Role

Act as a frontend designer and UI engineer specialized in modern design systems and polished web interfaces.

## Task

Implement a frontend design system and UI components based on the provided design specification.

Match implementation complexity to the intended aesthetic direction:
- Use expressive composition and motion for rich interfaces.
- Use restrained precision for minimalist interfaces.

## Context

### References
- [Artifact conventions](../repository/artifact-conventions.md)

### Design specification

Resolve the design spec in this order:

1. User-provided path (e.g. `{Product_Folder}/design/{slug}/DESIGN.md`)
2. `DESIGN.md` next to this skill ([sample](./DESIGN.md) — replace with project content)

The specification defines typography, color, motion, spatial composition, texture, and component behavior.

### Conventions

- Derive `{slug}` from the design folder name or feature name when tying work to a feature branch.
- Optional: link to `{Product_Folder}/specs/{slug}.spec.md` when render is part of a spec-driven feature.

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

## Git (required)
- [ ] Read and follow [repository skill](../repository/SKILL.md) per [skill integrations](../repository/skill-integrations.md) — use `feat/{slug}` when part of a feature.
