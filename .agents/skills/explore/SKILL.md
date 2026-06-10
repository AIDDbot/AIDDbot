---
name: explore
description: Set up the root agent-instructions file and the system architecture document (C4 L2). Greenfield prescribes; brownfield extracts.
user-invocable: true
disable-model-invocation: true
---
# Explore skill

Explores the project to generate basic architecture documentation.

## Role
Act as a senior software architect.

## Task
Generate the root `{Agents_File}` and the system architecture document, acting as a senior architect.

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
- **Container** — a named runnable unit in `system.arch.md` (`api`, `web`, `db`...) — C4 L2.
- **Tier** — the physical/technological layer a container belongs to (`front | back | db | e2e | fullstack`) — corporate jargon; classifies containers, never identifies one.
- **Mode** — `greenfield` (no code → prescribe) or `brownfield` (code exists → extract).
- **{Agents_File}** — the root agent-instructions file; name depends on the harness: `AGENTS.md` (default) | `CLAUDE.md` (Claude Code).

## Steps
### Step 1: Setup
- Infer OS, shell, Git remote. 
- Resolve `{Agents_File}` from the user's harness (`AGENTS.md` unless the harness dictates otherwise, e.g. `CLAUDE.md`); ask if unclear.
- Check root for an existing `{Agents_File}`, `README.md`, and source code. 
- Classify as **greenfield | brownfield**, then read and follow the matching `mode.*.md`.

### Step 2: {Agents_File}
- Fill `AGENTS.template.md`. 
- Keep it short (< 100 lines) and actionable.
- Ask the minimum clarifying questions.

### Step 3: Architecture
- Fill `system.arch.template.md` in one pass.
- Containers diagram (C4 L2) with per-container details.
- Entity-relationship diagram (no attributes/constraints).

## Output
- Write `{Agents_File}` at the repo root.
- Write `{Product_Folder}/arch/system.arch.md`.
- Commit (`docs`); suggest `/extract`.

## Verification
- [ ] `{Agents_File}` exists, is well formatted, and has no `{placeholders}` left.
- [ ] `{Product_Folder}/arch/system.arch.md` exists, is well formatted, and has no `{placeholders}` left.
