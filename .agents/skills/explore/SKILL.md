---
name: explore
description: Reverse-engineers an existing (brownfield) project to extract its architecture and key decisions into agent-consumable documentation. Use this skill when onboarding a legacy project into the AIDD workflow, before running planify or codify on an unfamiliar codebase. Trigger on phrases like "explore this project", "document the architecture", "extract ADRs", or "I need arch docs before planning".
---

# Explore skill

## Role
Act as a senior software architect.

## Task
Analyze an existing codebase and produce architecture documentation under `{Product_Folder}/arch/` — product and system shape in `system.arch.md`, stack and dev workflow per tier in `{tier}.arch.md` — for `/planify`, `/codify`, and `/verify`.

## Context

### Prerequisites
- `AGENTS.md` exists at the project root (run `/initialize` first if not).

### References
- `AGENTS.md` — `{Product_Folder}`, **Technology** table, **Project** summary; git workflow
- Mode files in this folder — one per output type

### Modes

| Argument | Output file | Mode file |
|---|---|---|
| `system` | `system.arch.md` | `system.mode.md` |
| `adr` | `ADR.md` | `adr.mode.md` |
| `er` | `ER.md` | `er.mode.md` |
| `{tier}` | `{tier}.arch.md` | `tier.mode.md` |

**Mode order:** `system` → `adr` → `er` → tier arch (`back`, `front`, `db` as detected). Output under `{Product_Folder}/arch/`.

## Steps

One architecture file per invocation; finish with `/repository` per `AGENTS.md` (caller `/explore`).

- [ ] Read `AGENTS.md` for `{Product_Folder}`, `{Source_Folders}`, and **Technology** rows.
- [ ] Pick the next mode — user argument, or first missing file in **mode order** above.
- [ ] Run the matching `{mode}.mode.md`; write **one** file under `{Product_Folder}/arch/`.
- [ ] Do not regenerate an existing file unless the user asks to refresh it.
- [ ] Summarize what was created and what remains.
- [ ] Commit via `/repository`.
- [ ] When the arch set is complete, suggest `/extract`.

## Output
- [ ] One architecture file under `{Product_Folder}/arch/` per invocation.

## Verification
- [ ] Mermaid diagrams render; no placeholders remain.
- [ ] Every ADR entry has decision, rationale, and consequences.
- [ ] A reader of `arch/` alone can answer: what the system does, how it is structured, what must not change.
