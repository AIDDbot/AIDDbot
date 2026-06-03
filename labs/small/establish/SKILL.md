---
name: establish
description: Set up rules and architecture document for any given project. Greenfield prescribes; brownfield extracts.
---

# Establish skill

## Role
Senior software engineer / architect.

## Task
Generate the root AGENTS.md and the architecture document for any given project.
- `AGENTS.md` — root config + workflow: paths, tech, product.
- `{Product_Folder}/system.arch.md` — architecture doc: containers, tech stack, ER.

## Context

### Input
- Current codebase.
  - **greenfield** (no code) prescribes; 
  - **brownfield** (existing code) extracts from code.

### Reference

- [`AGENTS.template.md`](./AGENTS.template.md), 
- [`arch.template.md`](./arch.template.md).

## Steps

### Step 1: Explore the project
- [ ] Infer OS, shell, Git remote; confirm path defaults.
- [ ] Check root for `AGENTS.md`, `README.md`, and source code; 
- [ ] Classify mode greenfield | brownfield.
- **greenfield**: elaborate and ask user for details.
- **brownfield**: extract from code.

### Step 2: Generate the root AGENTS.md
- [ ] Fill `AGENTS.template.md`
- Keep it short (less than 100 lines) and actionable

### Step 3: Generate the architecture document
- [ ] Fill `arch.template.md` in one pass over the whole project.
- [ ] Overview and a containers diagram ( C4 Level 1)  
- [ ] For each container add technical details

## Output
- [ ] No `{placeholders}` left;
- [ ] Write `AGENTS.md` and `{Product_Folder}/system.arch.md`. 
- [ ] Commit (`docs`); suggest `/specify`.

## Verification
- [ ] `AGENTS.md` guides the workflow and states how code must be written.
- [ ] `system.arch.md` alone explains containers, components, and entities; Mermaid renders.
