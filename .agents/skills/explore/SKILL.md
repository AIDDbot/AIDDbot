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

## Context

### Prerequisites
- Root `AGENTS.md` exists — run `/establish` first if missing.

### References
- `AGENTS.md` — `{Product_Folder}`, **Starting point**, **Tiers**, **Technology**, **Product**
- Templates in this folder: `system.arch.template.md`, `adr.template.md`

## Steps

### Step 1: Confirm mode and scope
- [ ] Read **Starting point** from `AGENTS.md` (greenfield/brownfield); applied whole-system, no per-tier override.
- [ ] Infer whether this is a monorepo with multiple projects or a single project.
> Each project is a container that belongs to a tier (tiers are listed in `AGENTS.md`).

### Step 2: Generate `system.arch.md`
- [ ] Read `system.arch.template.md`.
- [ ] **Greenfield**: prescribe containers and stack per `AGENTS.md`, grounded in a reference architecture; name the source so ADRs can cite it.
- [ ] **Brownfield**: from entry points, configs, dependency manifests, and README — map containers only, no implementation detail. Flag low-confidence mappings.

### Step 3: Generate `ADR.md`
- [ ] Read `adr.template.md`.
- [ ] **Greenfield**: document foundational decisions being made now (tech stack, API style, structure); cite the named source per decision. Status: `Decided`.
- [ ] **Brownfield**: infer decisions from code evidence. Status: `Inferred`. Flag low-confidence entries.
- [ ] Only decisions that constrain planning — nothing trivial or easily reversible.

## Output
- [ ] Summarize what was written; flag ambiguities.
- [ ] No sections/columns beyond the template; keep files under 100 lines.
- [ ] Write `system.arch.md` and `ADR.md` under `{Product_Folder}/arch/`.
- [ ] Commit (`docs`; scope `product` or area).
- [ ] Suggest `/excavate` (then `/extract`).

## Verification
- [ ] Mermaid renders; no placeholders remain.
- [ ] Each ADR has decision, rationale, and consequences.
- [ ] `system.arch.md` alone answers: what the system does and how containers are arranged.