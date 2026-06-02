# Excavate — Brownfield mode

Excavate structure and contracts from legacy code and documentation.

## `{tier}.arch.md`

- [ ] read ALL source files in the tier's folder **and existing docs (README, ADRs, comments)** to recover intent code alone doesn't show. Detect the code organization pattern; document components, shared artifacts, key contracts, and storage as they exist. Flag low-confidence inferences.

## `ER.md`

- [ ] scan domain models across all tiers; include implicit constraints validated in service code, not just schema.
