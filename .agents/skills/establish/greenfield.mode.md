# Greenfield mode guide (`/establish`)

Use this guide when there is no functional code yet.

## Goal

Define a planning-constraining system architecture baseline in root `AGENTS.md` from the product brief and authoritative references.

## Inputs

- `AGENTS.template.md`.
- Product brief from `README.md` or user input.
- Known constraints from environment/repo context.

## Architecture checklist

- [ ] Determine whether the target is a single project or monorepo; map each project to a container and tier.
- [ ] Prescribe container boundaries and responsibilities at C4 L2 level only.
- [ ] Select stack per container (language/framework/runtime/storage/integration style).
- [ ] Ground choices in a reference architecture and name the source.
- [ ] Record foundational decisions that constrain planning as `Decided` (for example: stack, API style, structure approach).
- [ ] Keep decisions directional and stable; avoid trivial or quickly reversible choices.
- [ ] Defer component-level structure and contracts to `/extract`.

## Quality bar

- Architecture is specific enough to guide planning and prevent contradictory implementations.
- No implementation-level detail in container descriptions.
- `AGENTS.md` stays concise and template-compliant.
