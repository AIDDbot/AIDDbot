# Brownfield mode guide (`/establish`)

Use this guide when functional code already exists.

## Goal

Capture current system architecture in root `AGENTS.md` at planning level, based on evidence from the codebase and docs.

## Inputs

- `AGENTS.template.md`.
- Existing repository artifacts: entry points, config files, dependency manifests, README/ADRs, and build files.

## Architecture checklist

- [ ] Determine whether the repository is single-project or monorepo; map projects to containers and tiers.
- [ ] Identify container boundaries from entry points and deploy/runtime composition.
- [ ] Describe container responsibilities at C4 L2 level only (no component-level internals).
- [ ] Infer foundational decisions from evidence and record them as `Inferred`.
- [ ] Flag low-confidence mappings explicitly.
- [ ] Document only decisions that constrain future planning; omit trivial or reversible details.
- [ ] Defer component-level structure, contracts, and coding conventions to `/extract`.

## Quality bar

- Statements are evidence-backed and scoped to planning decisions.
- Ambiguities are surfaced clearly rather than guessed.
- `AGENTS.md` remains concise and template-compliant.
