# Brownfield mode guide (`/extract`)

Use this guide when the tier already has functional code.

## Goal

Extract the dominant real-world implementation patterns from the existing tier and codify them as rules for planning and coding.

## Inputs

- `AGENTS.md` (starting point, architecture section, tier/source mapping, technology, product).
- `tier.template.md`.
- Tier source files and existing docs in or near the tier (README, ADRs, code comments).

## Discovery checklist

- [ ] Read the tier's source files and supporting docs before deciding patterns.
- [ ] Detect actual code organization pattern (layer, feature, hybrid, or variant).
- [ ] Inventory component boundaries and responsibilities as implemented.
- [ ] Identify key contracts (APIs/events/interfaces/models/schemas) in real use.
- [ ] Identify storage strategy and constraints, including behavior in service code.
- [ ] Extract domain entities and constraints as implemented.
- [ ] Capture relationship integrity and cross-entity business rules enforced in code.
- [ ] Omit domain sections for tiers with no domain responsibility (for example, e2e).

## Conventions extraction checklist

- [ ] Classify files by artifact role using file names and structure.
- [ ] Read 1-2 representative files per role to determine dominant conventions.
- [ ] Detect meaningful deviations by sampling structurally different files.
- [ ] Produce one canonical example using a real trimmed snippet pattern.
- [ ] Describe anti-patterns as concrete, observable deviations.
- [ ] Flag low-confidence inferences explicitly.

## Decision rule

- Document what exists; do not redesign in this step.
- If evidence conflicts with `AGENTS.md` decisions, note the discrepancy and preserve observed behavior in the tier rules.

## Quality bar

- Prefer evidence-backed statements over assumptions.
- Keep the final `{tier}.md` concise, actionable, and template-compliant.
