---
name: extract
description: Extracts coding conventions and patterns from an existing codebase into agent-consumable rule files. Use this skill after explore to capture how code should be written, not just what exists. Trigger on phrases like "extract conventions", "generate coding rules", or "I need coding patterns before codifying".
---

# Extract skill

## Role
Act as a senior software engineer performing a code convention audit.

## Task
Analyze source code in each tier and produce coding convention files under `{Product_Folder}/rules/`, structured for agent consumption during coding phases.

## Context

### Prerequisites
- `AGENTS.md` exists at the project root.
- `{Product_Folder}/arch/` exists (run `/explore` first if not).

### References
- [Incremental artifact pattern](../shared/incremental-artifact.md) — `/extract` row
- `AGENTS.md` — `{Product_Folder}`, `{Source_Folders}`, tiers
- `{Product_Folder}/arch/{tier}.arch.md` when present
- Mode files in this folder

### Modes

| Argument | Output file | Mode file |
|---|---|---|
| `naming` | `naming.rules.md` | `naming.mode.md` |
| `{tier}` | `{tier}.rules.md` | `tier.mode.md` |
| `testing` | `testing.rules.md` | `testing.mode.md` |

Mode order and completion rules: [incremental-artifact.md](../shared/incremental-artifact.md) (`/extract` row). Output under `{Product_Folder}/rules/` (e.g. `naming.rules.md`, `testing.rules.md`, optional `{tier}.rules.md`).

## Steps

- [ ] Follow [incremental-artifact.md](../shared/incremental-artifact.md) for `/extract` (modes table above).

## Output
- [ ] One rule file under `{Product_Folder}/rules/` per mode executed.

## Verification
- [ ] No placeholders; each pattern has a concrete do/don't from the codebase.
- [ ] Deviations from the dominant pattern are flagged.
- [ ] A reader of `rules/` alone can write code matching existing style and structure.

## Git
- [ ] Follow [shared/git.md](../shared/git.md) for `/extract`.
