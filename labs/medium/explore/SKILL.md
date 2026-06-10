---
name: explore
description: Set up rules and architecture document for the current project. Greenfield prescribes; brownfield extracts.
user-invocable: true
disable-model-invocation: true
---
# Explore skill

Explores the project to generate basic architecture documentation.

## Role
Act as a senior software architect.

## Task
Generate the root `AGENTS.md` and the system architecture document, acting as a senior architect.

## Context

### Input
- Existing codebase at the repo root, if any.

### References
- CAUTION: Read ONLY ONE (green or brown) 
- Mode guides (read the one that matches the project's starting mode):
  - [`mode.greenfield.md`](./references/mode.greenfield.md) — no code; prescribe defaults, ask the user.
  - [`mode.brownfield.md`](./references/mode.brownfield.md) — existing code; extract facts.

### Assets
- [`AGENTS.template.md`](./assets/AGENTS.template.md), 
- [`system.arch.template.md`](./assets/system.arch.template.md).

### Glossary
- **Container** — a runnable unit in `system.arch.md` (`back`, `front`, `db`...). 
- **Mode** — `greenfield` (no code → prescribe) or `brownfield` (code exists → extract).

## Steps
### Step 1: Setup
- Infer OS, shell, Git remote. 
- Check root for `AGENTS.md`, `README.md`, and source code. 
- Classify as **greenfield | brownfield**, then read and follow the matching `mode.*.md`.

### Step 2: AGENTS.md
- Fill `AGENTS.template.md`. 
- Keep it short (< 100 lines) and actionable.
- Ask the minimum clarifying questions.

### Step 3: Architecture
- Fill `system.arch.template.md` in one pass.
- Containers diagram (C4 L2) with per-container details.
- Entity-relationship diagram (no attributes/constraints).

## Output
- Write `CLAUDE.md` 
- Write `{Product_Folder}/arch/system.arch.md`.
- Commit (`docs`); suggest `/extract`.

## Verification
- [ ] `CLAUDE.md` exists, is well formatted, and has no `{placeholders}` left.
- [ ] `{Product_Folder}/arch/system.arch.md` exists, is well formatted, and has no `{placeholders}` left.
