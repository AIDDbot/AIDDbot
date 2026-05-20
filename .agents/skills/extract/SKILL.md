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
- `AGENTS.md` — `{Product_Folder}`, `{Source_Folders}`, tiers, git workflow
- `{Product_Folder}/arch/{tier}.arch.md` when present
- Mode files in this folder

### Modes

| Argument | Output file | Mode file |
|---|---|---|
| `naming` | `naming.rules.md` | `naming.mode.md` |
| `{tier}` | `{tier}.rules.md` | `tier.mode.md` |
| `testing` | `testing.rules.md` | `testing.mode.md` |

**Mode order:** `naming` → tier rules (`back`, `front`, `db` as detected) → `testing`. Output under `{Product_Folder}/rules/`.

## Steps

One rule file per mode unless the user requests `all` (then run every missing mode in order, one combined summary at the end). Finish with `/repository` per `AGENTS.md` (caller `/extract`).

- [ ] Read `AGENTS.md` and relevant `arch/{tier}.arch.md` files.
- [ ] Pick the next mode — user argument, `all`, or first missing file in **mode order** above.
- [ ] Run the matching `{mode}.mode.md`; write **one** file under `{Product_Folder}/rules/` (or all missing modes when `all`).
- [ ] Do not regenerate an existing file unless the user asks to refresh it.
- [ ] Summarize what was created and what remains (one summary when `all`).
- [ ] Commit via `/repository`.
- [ ] When the rules set is complete, suggest `/specify`.

## Output
- [ ] One rule file under `{Product_Folder}/rules/` per mode executed.

## Verification
- [ ] No placeholders; each pattern has a concrete do/don't from the codebase.
- [ ] Deviations from the dominant pattern are flagged.
- [ ] A reader of `rules/` alone can write code matching existing style and structure.
