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
2. `ADR.md` — architectural decisions (prescriptive in green, descriptive in brown)

## Context

- A tier is a logical group of code that can be run separately; the project's tiers are listed in `AGENTS.md`.

### Prerequisites
- Root `AGENTS.md` exists — run `/establish` first if missing.

### References
- `AGENTS.md` — `{Product_Folder}`, **Starting point**, **Tiers**, **Technology**, **Product**
- Templates in this folder: `system.arch.template.md`, `ADR.template.md`

## Steps

### Step 1: Confirm mode and scope
- [ ] Read the **Starting point** from `AGENTS.md` (greenfield or brownfield) — set by `/establish`, it is the source of truth.
- [ ] Infer whether this is a monorepo with multiple projects or a single project.
> Each project is a container that belongs to a tier (tiers are listed in `AGENTS.md`).

### Step 2: Generate `system.arch.md`
- [ ] Read `system.arch.template.md`.
- [ ] **Greenfield**: propose containers and tech stack aligned with `AGENTS.md`.
- [ ] **Brownfield**: read entry points, config files, and dependency manifests — map containers only, no implementation detail.

### Step 3: Generate `ADR.md`
- [ ] Read `adr.template.md`.
- [ ] **Greenfield**: document foundational decisions being made now (tech stack, API style, structure). Status: `Decided`.
- [ ] **Brownfield**: infer decisions from code evidence. Status: `Inferred`. Flag low-confidence entries.
- [ ] Only decisions that constrain planning — nothing trivial or easily reversible.

## Output
- [ ] Summarize what was written and flag ambiguities.
- [ ] Do not add sections or columns beyond the template. Try to keep them under 100 lines.
- [ ] Write `system.arch.md` and `ADR.md` files under `{Product_Folder}/arch/`.
- [ ] Commit with conventional message (`docs`; scope `product` or area).
- [ ] Suggest next step: `/elaborate` (then `/extract`).

## Verification
- [ ] Mermaid diagrams render; no placeholders remain.
- [ ] Each ADR has decision, rationale, and consequences.
- [ ] `system.arch.md` alone answers: what the system does and how containers are arranged.
- [ ] No leftover `{placeholders}`.