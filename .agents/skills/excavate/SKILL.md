---
name: excavate
description: Digs deep into component-level architecture and the domain model for each tier. Greenfield prescribes structure and contracts from model knowledge and ecosystem best practices; brownfield excavates them from legacy code and documentation. Use after /explore, before /extract. Trigger on "excavate this project", "define tier architecture", "document the components", "extract the domain model", "I need component docs".
---

# Excavate skill

## Role
Act as a senior software architect.

## Task
For each tier, produce under `{Product_Folder}/arch/`:
1. `{tier}.arch.md` — C4 L3 components, structure, contracts

After all tiers:
2. `ER.md` — complete domain model

> Mode-aware: greenfield prescribes structure and contracts grounded in stack conventions (name the source); brownfield describes them from legacy code and docs. Coding rules are produced separately by `/extract`.

## Context

- A tier is a logical group of code that can be run separately (e.g. back, front, fullstack, cli, db, e2e); the project's tiers are listed in `AGENTS.md`.

### Prerequisites
- Root `AGENTS.md` exists — run `/establish` first if missing.
- `{Product_Folder}/arch/system.arch.md` exists — run `/explore` first if missing.

### References
- `AGENTS.md` — **Starting point**, tier list, `{Source_Folders}`, **Technology**, **Product**
- `system.arch.md`, `ADR.md` — containers, stack, and foundational decisions
- Templates in this folder: `tier.arch.template.md`, `er.template.md`

## Steps

### Step 1: Confirm mode
- [ ] Read the **Starting point** from `AGENTS.md` — set by `/establish`, the source of truth. Override per tier: a tier with no functional source code is **greenfield** (prescribe); a tier with existing code is **brownfield** (describe from code).
- [ ] Note existing files under `arch/` — skip tiers already documented unless refresh requested.

### Step 2: Pick next tier
- [ ] Process **one tier** per invocation.
- [ ] Use user argument if provided; otherwise pick the first undocumented tier.
- [ ] `all` → queue every missing tier; still one tier per pass, one summary at the end.

### Step 3: Generate `{tier}.arch.md`
- [ ] Read `tier.arch.template.md`.
- [ ] Align with the `system.arch.md` container for this tier (folder, archetype, responsibilities).
- [ ] **Greenfield**: prescribe code organization (layer / feature / hybrid), components, shared artifacts, key contracts, and storage — consistent with ADRs. Ground the prescription in the chosen stack's conventions (official docs, framework scaffolding defaults, a known reference architecture) and **name that source** so `/extract` and `/codify` can follow it; fall back to model priors only when no convention exists. Propose dev commands from the chosen stack (init, build, run, test, lint) even if folders do not exist yet.
- [ ] **Brownfield**: read ALL source files in the tier's folder **and existing docs (README, ADRs, comments)** to recover intent the code alone doesn't show. Detect the actual code organization pattern; document components, shared artifacts, key contracts, and storage infrastructure as they exist. Flag low-confidence inferences.

### Step 4: Generate `ER.md` (after all tiers are done)
- [ ] Read `er.template.md`.
- [ ] **Greenfield**: model entities, fields, constraints, and relationships from the product brief and prescribed tiers.
- [ ] **Brownfield**: scan domain models across all tiers; include implicit constraints validated in service code, not just schema.
- [ ] Include cross-entity business rules agents must enforce during `/codify`.

## Output
- [ ] Summarize what was written and flag open decisions (greenfield) or ambiguities (brownfield).
- [ ] Do not add sections or columns beyond the templates. Try to keep each file under 100 lines.
- [ ] Write `arch/{tier}.arch.md` for the current tier; write `arch/ER.md` only when all tiers are complete.
- [ ] Commit with conventional message (`docs`; scope tier or `product`).
- [ ] If tiers remain: suggest `/excavate {next-tier}`.
- [ ] If all tiers and `ER.md` are done: suggest `/extract` for coding rules.

## Verification
- [ ] Mermaid diagrams render; no placeholders remain.
- [ ] `{tier}.arch.md` alone answers: how this tier is structured and what it exposes.
- [ ] `ER.md` covers every domain entity with fields, types, and constraints.
- [ ] No leftover `{placeholders}`.
