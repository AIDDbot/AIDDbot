# Greenfield mode guide (`/extract`)

Use this guide when the tier has no functional code yet.

## Goal

Prescribe one implementation baseline for the tier from authoritative ecosystem conventions, aligned with `AGENTS.md` decisions.

## Inputs

- `AGENTS.md` (starting point, architecture section, tier/source mapping, technology, product).
- `tier.template.md`.
- Product/system docs referenced from `AGENTS.md` (if available).

## Source hierarchy (highest to lowest authority)

1. `AGENTS.md` architecture decisions for the product.
2. Official language/framework docs and style guides.
3. Stack scaffolding defaults and reference architectures.
4. Community/public rule or skill directories.
5. Model priors (only when no source covers the decision).

## Architecture and domain checklist

- [ ] Prescribe code organization pattern (layer, feature, or hybrid) and folder structure.
- [ ] Define components and responsibilities aligned with the tier container in `AGENTS.md`.
- [ ] Define key contracts exposed to adjacent tiers (APIs/events/interfaces/schemas).
- [ ] Define storage strategy and constraints if the tier owns persistence.
- [ ] Define development commands (init/build/run/test/lint/deploy; `N/A` when inapplicable).
- [ ] Model entities this tier owns or persists from product context.
- [ ] Capture relationship integrity and cross-entity business rules for `/codify`.
- [ ] Omit domain sections for tiers without domain responsibility (for example, e2e).

## Conventions checklist

- [ ] Prescribe naming, artifact roles, wiring, error handling, and testing conventions.
- [ ] Reconcile conflicts by applying this rule: `AGENTS.md` decisions win.
- [ ] Provide one canonical, illustrative example for the tier.
- [ ] Cite the external sources that informed conventions.
- [ ] Add "Known deviations" as baseline notes where relevant.

## Quality bar

- Keep prescriptions specific enough for repeatable implementation.
- Avoid copying external guides verbatim; adapt to product constraints.
- Keep the final `{tier}.md` concise and template-compliant.
