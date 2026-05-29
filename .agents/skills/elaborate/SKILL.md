---
name: elaborate
description: Prescribes component-level architecture, domain model, and coding conventions for greenfield projects — the greenfield counterpart to /excavate and /extract. Trigger on "elaborate this project", "define tier architecture", "prescribe coding rules", "I need arch and rules before the first feature".
---

# Elaborate skill

## Role
Act as a senior software architect and staff engineer.

## Task
For each tier, produce under `{Product_Folder}/`:
1. `arch/{tier}.arch.md` — C4 L3 components, structure, contracts (prescriptive)
2. `rules/{tier}.rules.md` — coding conventions agents must follow (prescriptive)

After all tiers:
3. `arch/ER.md` — complete domain model (prescriptive)

## Context

- A tier is a logical group of code that can be run separately. eg: back-end, front-end, fullstack, e2e, db.

### Prerequisites
- Root `AGENTS.md` exists — run `/establish` first if missing.
- `{Product_Folder}/arch/system.arch.md` exists — run `/explore` first if missing.

### Mode
- **Greenfield only.** If functional source code already exists, stop and suggest `/excavate` and `/extract` instead.

### References
- `AGENTS.md` — tier list, `{Source_Folders}`, `{Rules_Folder}`, **Technology**, **Product**
- `system.arch.md`, `ADR.md` — containers, stack, and foundational decisions
- Templates in this folder: `tier.arch.template.md`, `er.template.md`, `tier.rules.template.md`

## Steps

### Step 1: Read context
- [ ] Read `AGENTS.md` → tiers, paths, product brief, verification strategy.
- [ ] Read `system.arch.md` and `ADR.md` → containers, contracts, decided patterns.
- [ ] Confirm greenfield (no functional application source). If brownfield → stop.
- [ ] Note existing files under `arch/` and `{Rules_Folder}` — skip tiers already documented unless refresh requested.

### Step 2: Pick next tier
- [ ] Process **one tier** per invocation.
- [ ] Use user argument if provided; otherwise pick the first undocumented tier.
- [ ] `all` → queue every missing tier; still one tier per pass, one summary at the end.

### Step 3: Generate `{tier}.arch.md`
- [ ] Read `tier.arch.template.md`.
- [ ] Align with `system.arch.md` container for this tier (folder, archetype, responsibilities).
- [ ] Prescribe code organization (layer / feature / hybrid), components, shared artifacts, key contracts, and storage — consistent with ADRs.
- [ ] Propose dev commands from the chosen stack (init, build, run, test, lint) even if folders do not exist yet.

### Step 4: Generate `{tier}.rules.md`
- [ ] Read `tier.rules.template.md`.
- [ ] Derive `{source_glob}` from the tier's planned source folder (e.g. `api/src/**/*.java`, `web/src/**/*.ts`).
- [ ] Prescribe naming, artifact roles, wiring, error handling, and testing from ADRs + stack conventions.
- [ ] Write **illustrative** canonical examples that embody the prescribed pattern (not copied from existing code).
- [ ] Omit sections that do not apply to this tier (e.g. Testing for db, Wiring for e2e).
- [ ] Under **Known Deviations**, state: no deviations yet — greenfield baseline.

### Step 5: Generate `ER.md` (after all tiers are done)
- [ ] Read `er.template.md`.
- [ ] Model entities, fields, constraints, and relationships from the product brief and prescribed tiers.
- [ ] Include cross-entity business rules agents must enforce during `/codify`.

## Output
- [ ] Summarize what was written and flag open decisions for the user.
- [ ] Do not add sections or columns beyond the templates. Try to keep each file under 100 lines.
- [ ] Write `arch/{tier}.arch.md` and `{Rules_Folder}/{tier}.rules.md` for the current tier; write `arch/ER.md` only when all tiers are complete.
- [ ] Commit with conventional message (`docs`; scope tier or `product`).
- [ ] If tiers remain: suggest `/elaborate {next-tier}`.
- [ ] If all tiers and `ER.md` are done: suggest `/specify` for the first feature.

## Verification
- [ ] Mermaid diagrams render; no placeholders remain.
- [ ] `{tier}.arch.md` alone answers: how this tier will be structured and what it exposes.
- [ ] `{tier}.rules.md` alone answers: how code in this tier must be written.
- [ ] `ER.md` covers every domain entity with fields, types, and constraints.
- [ ] No leftover `{placeholders}`.
