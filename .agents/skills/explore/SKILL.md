---
name: explore
description: Documents the system architecture of a project. In greenfield, prescribes containers and foundational decisions. In brownfield, extracts them from the codebase. Trigger on "explore this project", "document the architecture", "I need arch docs before planning".
---

# Explore skill

## Role
Act as a senior software architect.

## Task
Produce two files under `{Product_Folder}/arch/`:
1. `system.arch.md` — C4 L2 containers and inter-container communication
2. `ADR.md` — architectural decisions

> Mode-aware: greenfield prescribes containers and decisions grounded in an established reference architecture (name the source); brownfield describes them from existing code and docs.

## Context

- A tier is a logical group of code that can be run separately (e.g. back, front, fullstack, cli, db, e2e); the project's tiers are listed in `AGENTS.md`.

### Prerequisites
- Root `AGENTS.md` exists — run `/establish` first if missing.

### References
- `AGENTS.md` — `{Product_Folder}`, **Starting point**, **Tiers**, **Technology**, **Product**
- Templates in this folder: `system.arch.template.md`, `adr.template.md`

## Steps

### Step 1: Confirm mode and scope
- [ ] Read the **Starting point** from `AGENTS.md` (greenfield/brownfield) — set by `/establish`, the source of truth. Applied whole-system here; no per-tier override at this level.
- [ ] Infer whether this is a monorepo with multiple projects or a single project.
> Each project is a container that belongs to a tier (tiers are listed in `AGENTS.md`).

### Step 2: Generate `system.arch.md`
- [ ] Read `system.arch.template.md`.
- [ ] **Greenfield**: prescribe containers and tech stack aligned with `AGENTS.md`, grounded in an established reference architecture for the domain; name the source so ADRs can cite it.
- [ ] **Brownfield**: read entry points, config files, dependency manifests, and existing docs (README) — map containers only, no implementation detail. Flag low-confidence mappings.

### Step 3: Generate `ADR.md`
- [ ] Read `adr.template.md`.
- [ ] **Greenfield**: document foundational decisions being made now (tech stack, API style, structure); cite the reference architecture or guide that drove each. Status: `Decided`.
- [ ] **Brownfield**: infer decisions from code evidence. Status: `Inferred`. Flag low-confidence entries.
- [ ] Only decisions that constrain planning — nothing trivial or easily reversible.

## Output
- [ ] Summarize what was written and flag ambiguities.
- [ ] Do not add sections or columns beyond the template. Try to keep them under 100 lines.
- [ ] Write `system.arch.md` and `ADR.md` files under `{Product_Folder}/arch/`.
- [ ] Commit with conventional message (`docs`; scope `product` or area).
- [ ] Suggest next step: `/excavate` (then `/extract`).

## Verification
- [ ] Mermaid diagrams render; no placeholders remain.
- [ ] Each ADR has decision, rationale, and consequences.
- [ ] `system.arch.md` alone answers: what the system does and how containers are arranged.
- [ ] No leftover `{placeholders}`.