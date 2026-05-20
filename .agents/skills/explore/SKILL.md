---
name: explore
description: Reverse-engineers an existing (brownfield) project to extract its architecture and key decisions into agent-consumable documentation. Use this skill when onboarding a legacy project into the AIDD workflow, before running planify or codify on an unfamiliar codebase. Trigger on phrases like "explore this project", "document the architecture", "extract ADRs", or "I need arch docs before planning".
---

# Explore skill

## Role
Act as a senior software architect.

## Task
Analyze an existing codebase and produce architecture documentation under `{Product_Folder}/arch/`, structured for agent consumption during planning and coding phases.

## Context

### Prerequisites
- `AGENTS.md` exists at the project root (run `/initialize` first if not).

### References
- [Incremental artifact pattern](../shared/incremental-artifact.md) — `/explore` row
- `AGENTS.md` — `{Product_Folder}`, `{Source_Folders}`, tiers
- Mode files in this folder — one per output type

### Modes

| Argument | Output file | Mode file |
|---|---|---|
| `system` | `system.arch.md` | `system.mode.md` |
| `adr` | `ADR.md` | `adr.mode.md` |
| `er` | `ER.md` | `er.mode.md` |
| `{tier}` | `{tier}.arch.md` | `tier.mode.md` |

Mode order and completion rules: [incremental-artifact.md](../shared/incremental-artifact.md) (`/explore` row). Output under `{Product_Folder}/arch/` (e.g. `system.arch.md`, `ADR.md`, `ER.md`, optional `{tier}.arch.md`).

## Steps

- [ ] Follow [incremental-artifact.md](../shared/incremental-artifact.md) for `/explore` (modes table above).

## Output
- [ ] One architecture file under `{Product_Folder}/arch/` per invocation.

## Verification
- [ ] Mermaid diagrams render; no placeholders remain.
- [ ] Every ADR entry has decision, rationale, and consequences.
- [ ] A reader of `arch/` alone can answer: what the system does, how it is structured, what must not change.