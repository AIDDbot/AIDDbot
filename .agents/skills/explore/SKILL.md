---
name: explore
description: Reverse-engineers an existing (brownfield) project to extract its architecture and key decisions into agent-consumable documentation. Use this skill when onboarding a legacy project into the AIDD workflow, before running planify or codify on an unfamiliar codebase. Trigger on phrases like "explore this project", "document the architecture", "extract ADRs", or "I need arch docs before planning".
---

# Explore skill

## Role

Act as a senior software architect.

## Task

- Analyze a brownfield codebase.
- Write architecture docs under `{Product_Folder}/arch/` 
- One output file per invocation — follow the matching `*.mode.md` in this folder.

## Context

### Prerequisites

- Root `AGENTS.md` exists — run `/initialize` first if missing.

### References

- `AGENTS.md` — `{Product_Folder}`, **Technology**, **Product**, git rules
- Mode files in this folder — one per output type

### Modes (ordered by priority)

| Argument | Output | Mode instructions |
|---|---|---|
| `system` | `system.arch.md` | [system.mode.md](./system.mode.md) |
| `adr` | `ADR.md` | [adr.mode.md](./adr.mode.md) |
| `er` | `ER.md` | [er.mode.md](./er.mode.md) |
| `{tier}` | `{tier}.arch.md` | [tier.mode.md](./tier.mode.md) |

## Steps

### Step 1: Read context

- [ ] Read `AGENTS.md` — `{Product_Folder}`, `{Source_Folders}`, **Technology** rows, **Product**.
- [ ] Note existing files under `{Product_Folder}/arch/`.

### Step 2: Pick mode

- [ ] Use the user argument, or the first missing file in **mode order**.
- [ ] Skip files that already exist unless the user asks to refresh.

### Step 3: Generate

- [ ] Open the matching `{mode}.mode.md` and its template.
- [ ] Fill the template from the codebase — no leftover `{placeholders}`.
- [ ] Write exactly one file under `{Product_Folder}/arch/`.

### Step 4: Finish

- [ ] Summarize what was written and what remains.
- [ ] Commit via `/repository` skill.
- [ ] When the arch set is complete, suggest `/extract`.

## Output

- [ ] One file under `{Product_Folder}/arch/` per invocation (see **Modes**).

## Verification

- [ ] Mermaid diagrams render; no placeholders remain.
- [ ] Each ADR entry has decision, rationale, and consequences.
- [ ] `arch/` alone answers: what the system does, how it is structured, what must not change.
