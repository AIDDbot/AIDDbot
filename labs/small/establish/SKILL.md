---
name: establish
description: Set up AIDD + one architecture doc in a single run (C4 + domain + code rules). Greenfield prescribes; brownfield extracts.
---

# Establish skill

## Role
Senior software engineer / architect.

## Task
Take a tiny project from nothing to "ready to build" in one linear run:
- `AGENTS.md` — root config + workflow: paths, tech, product, code rules, personality note.
- `{Product_Folder}/arch.md` — one architecture doc: containers + components, domain entities, contracts.

## Context
- Mode: **greenfield** (no code) prescribes; **brownfield** (existing code) extracts from code.
- Templates (same folder): [`AGENTS.template.md`](./AGENTS.template.md), [`arch.template.md`](./arch.template.md).
- `{Product_Folder}` = where docs live (`docs/` by default). `{slug}` = short readable id.

## Steps

### Step 1: Detect
- [ ] Check root for `AGENTS.md`, `README.md`, and source code; classify mode greenfield | brownfield.
- [ ] Infer OS, shell, Git remote; confirm path defaults.

### Step 2: AGENTS.md
- [ ] Fill `AGENTS.template.md`: product problem + solution, tech, paths, code rules, personality note.

### Step 3: arch.md
- [ ] Fill `arch.template.md` in one pass over the whole project — no per-tier loop.
- [ ] Capture containers + components (one C4 diagram), domain entities, and key contracts. Keep it simple.

## Output
- [ ] Write `AGENTS.md` and `{Product_Folder}/arch.md`. No `{placeholders}` left; each under 80 lines.
- [ ] Commit (`docs`); suggest `/specify`.

## Verification
- [ ] `AGENTS.md` guides the workflow and states how code must be written.
- [ ] `arch.md` alone explains containers, components, and entities; Mermaid renders.
