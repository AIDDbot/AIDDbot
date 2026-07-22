# UI and accessibility lens

The UI, design-system, and accessibility catalog `/refactor` scans the frontend through.
Align to the project's design system — its tokens, spacing, and type scale — not an external
or "AI" aesthetic. Route each finding via [triage](./triage.md).

## Principles
- Design system over taste — use the project's tokens, spacing scale, and type scale.
- Semantic first — real elements (`button`, `nav`, `label`) before ARIA patches.
- Content-first layouts — structure follows the content, not a template.

## Avoid the AI aesthetic
| Pattern | Signal | Change |
|---------|--------|--------|
| Safe purple/indigo | every screen looks identical | the project's real palette |
| Excessive gradients | visual noise off the system | flat or subtle, system-matched |
| Max rounding everywhere | one radius for all corners | the system's radius hierarchy |
| Oversized uniform padding | flat hierarchy, wasted space | the spacing scale |
| Shadow-heavy depth | shadows compete with content | subtle or none unless specified |
| Stock card grids | information priority ignored | a purpose-driven layout |

## Design system
| Pattern | Signal | Change |
|---------|--------|--------|
| Magic values | `13px`, `2.3rem` off-scale | a value on the spacing scale |
| Raw hex color | `#3b82f6` inline | a semantic token (`--color-primary`) |
| Skipped heading level | `h1` → `h3` | an ordered hierarchy, no skips |
| Heading style on non-heading | visual-only heading | a real element or body style |

## Accessibility (WCAG AA)
| Pattern | Signal | Change |
|---------|--------|--------|
| Non-semantic control | `div` with a click handler | a `button` or `a` |
| Icon-only control | no accessible name | `aria-label` or visible text |
| Unlabeled input | no `label`/`for` pair | an associated `<label>` or `aria-label` |
| Missing focus state | keyboard user gets lost | a visible `:focus-visible` style |
| Color-only meaning | red/green with no text | add an icon, text, or pattern |
| Low contrast | under 4.5:1 (3:1 for large) | raise to the ratio |

## Structure and states
| Pattern | Signal | Change |
|---------|--------|--------|
| Missing empty state | blank screen on no data | a meaningful empty state |
| Missing error state | silent failure | an error state with retry |
| Missing loading state | layout jump or spinner-for-content | a skeleton or busy state |
| Not responsive | breaks at 320 / 768 / 1024 / 1440 | a mobile-first, fluid layout |
| Giant component | 200+ lines, many jobs | split into focused pieces |

## Component architecture
Reuse signals. A pure extraction that renders identical DOM is `/codify`; a look that must
change to unify pages is `/specify`.

| Pattern | Signal | Change |
|---------|--------|--------|
| Repeated markup | the same ~5+ line block in 2+ places, only data differs | extract one shared component |
| Uncomponentized page | a page inlines large self-contained regions (header, card grid, form) | compose named components |
| Ad-hoc component | a concept (button, badge, modal, card) re-built per file | one shared component |
| Inline loop template | a big markup literal built inside a `.map`/loop | extract an item component |

## Out of scope (not a finding)
- Restyling to personal taste over the project's design system.
- Adding a framework or dependency the project does not use.
- Speculative components no page renders.
