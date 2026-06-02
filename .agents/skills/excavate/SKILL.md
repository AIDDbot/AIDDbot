---
name: excavate
description: Document tier components (C4 L3) + domain ER. Greenfield prescribes; brownfield excavates from code.
---

# Excavate skill

## Role
Senior software architect.

## Task
- `{Product_Folder}/arch/{tier}.arch.md` — C4 L3 components, structure, contracts (per tier).
- `{Product_Folder}/arch/ER.md` — complete domain model (after all tiers).

## Context
- Prereq: `AGENTS.md`, `arch/system.arch.md` (run `/establish`, `/explore` if missing).
- `AGENTS.md` — **Starting mode**, tiers, `{Source_Folders}`, **Technology**, **Product**.
- `system.arch.md`, `ADR.md` — containers, stack, foundational decisions.
- Templates: `tier.arch.template.md`, `er.template.md`.
- Mode files (read the one for **Starting mode**): [greenfield](./greenfield.mode.md) | [brownfield](./brownfield.mode.md).

## Steps

### Step 1: Confirm mode
- [ ] Read **Starting mode**; override per tier: no code → greenfield; existing code → brownfield.
- [ ] Read the matching mode file. Skip tiers already documented unless refresh requested.

### Step 2: Pick tier
- [ ] Use the user argument; else first undocumented tier. `all` → every missing tier, one per pass.

### Step 3: `{tier}.arch.md`
- [ ] Read `tier.arch.template.md`; align with its `system.arch.md` container (folder, role).
- [ ] Follow the mode file's `{tier}.arch.md` guidance.

### Step 4: `ER.md` (after all tiers)
- [ ] Read `er.template.md`; follow the mode file's `ER.md` guidance.
- [ ] Capture relationship integrity + cross-entity rules (one list) to enforce during `/codify`.

## Output
- [ ] Write `arch/{tier}.arch.md`; write `arch/ER.md` only when all tiers complete.
- [ ] No sections/columns beyond templates; no `{placeholders}`; keep each file under 100 lines.
- [ ] Summarize; flag open decisions/ambiguities. Commit (`docs`; scope tier/`product`).
- [ ] Tiers remain → suggest `/excavate {next-tier}`; all done → suggest `/extract`.

## Verification
- [ ] Mermaid renders.
- [ ] `{tier}.arch.md` alone answers how the tier is structured and what it exposes.
- [ ] `ER.md` covers every entity with fields, types, constraints.
