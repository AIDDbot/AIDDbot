---
name: establish
description: Set up AIDD + system architecture (C4 L1–L2). Greenfield prescribes; brownfield extracts.
---

# Establish skill

## Role
Senior software engineer / architect.

## Task
- `AGENTS.md` — root; project config + workflow (paths, mode, tech, product, short personality note).
- `{Product_Folder}/arch/system.arch.md` — C4 L2 containers + communication.

## Context
- Mode: **greenfield** (no code) prescribes; **brownfield** (existing code) extracts from code.
- Templates (same folder): [`AGENTS.template.md`](./AGENTS.template.md), [`system.arch.template.md`](./system.arch.template.md).

## Steps

### Step 1: Detect
- [ ] Check root for `AGENTS.md`, `README.md`; classify mode greenfield | brownfield.
- [ ] Confirm AIDD path defaults; infer OS, shell, Git remote.

### Step 2: AGENTS.md
- [ ] Fill `AGENTS.template.md`: product problem + solution, tech, paths, inline personality note.

### Step 3: system.arch.md
- [ ] Fill `system.arch.template.md`: containers + how they communicate (Mermaid). Keep it simple.

## Output
- [ ] Write `AGENTS.md` and `arch/system.arch.md`. No `{placeholders}`; each under 100 lines.
- [ ] Commit (`chore`/`docs`); suggest `/extract`.

## Verification
- [ ] `AGENTS.md` guides the workflow.
- [ ] Mermaid renders; `system.arch.md` alone explains the containers.
