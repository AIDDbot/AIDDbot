---
name: excavate
description: Extracts component-level architecture and domain model from an existing codebase. Brownfield only. Trigger on "excavate this project", "document the tiers", "I need component docs", "extract the domain model".
---

# Excavate skill

## Role
Act as a senior software architect.

## Task
Produce under `{Product_Folder}/arch/`:
1. `{tier}.arch.md` — one file per tier (C4 L3 components, structure, contracts)
2. `ER.md` — complete domain model

## Context

- A tier is a logical group of code that can be run separately. eg: back-end, front-end, fullstack, e2e, db.

### Prerequisites
- `AGENTS.md` exists — run `/establish` first if missing.
- `system.arch.md` exists — run `/explore` first if missing.

### References
- `AGENTS.md` — tier list, `{Source_Folders}`
- `system.arch.md` — cross-tier context
- Templates in this folder: `tier.arch.template.md`, `ER.template.md`

## Steps

### Step 1: Read context
- [ ] Read `AGENTS.md` → tier list and source folders.
- [ ] Read `system.arch.md` → inter-container contracts and tech stack.
- [ ] Note existing files under `{Product_Folder}/arch/` — skip tiers already documented unless refresh requested.

### Step 2: Pick next tier
- [ ] Process one tier per invocation.
- [ ] Use user argument if provided; otherwise pick the first undocumented tier.

### Step 3: Generate `{tier}.arch.md`
- [ ] Read `tier.arch.template.md`.
- [ ] Read ALL source files in the tier's folder.
- [ ] Detect code organization pattern (layer-based / feature-based / hybrid).
- [ ] Document components, shared artifacts, key contracts, and storage infrastructure.

### Step 4: Generate `ER.md` (after all tiers are done)
- [ ] Read `er.template.md`.
- [ ] Scan domain models across all tiers: entities, fields, constraints, relationships.
- [ ] Include implicit constraints validated in service code, not just schema.

## Output
- [ ] Summarize what was written and flag ambiguities.
- [ ] Do not add sections or columns beyond the template. Try to keep them under 100 lines.
- [ ] Write `{tier}.arch.md` and `ER.md` files under `{Product_Folder}/arch/`.
- [ ] Commit via `/repository`.
- [ ] If tiers remain: suggest `/excavate {next-tier}`.
- [ ] If all done: suggest `/extract`.

## Verification
- [ ] Mermaid diagrams render; no placeholders remain.
- [ ] `{tier}.arch.md` alone answers: how this tier is structured and what it exposes.
- [ ] `ER.md` covers every domain entity with fields, types, and constraints.
- [ ] No leftover `{placeholders}`.