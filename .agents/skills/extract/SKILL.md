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
- [Incremental artifact pattern](./incremental-artifact.md)
- `AGENTS.md` — `{Product_Folder}`, `{Source_Folders}`, product paths, detected tiers
- `{Product_Folder}/arch/{tier}.arch.md` — code organization, shared artifacts, constraints.
- Mode files in this skill's folder — one per output type.

### Modes
Each mode generates one output file and is driven by its corresponding mode file:

| Argument | Output file | Mode file |
|---|---|---|
| `naming` | `naming.rules.md` | `naming.mode.md` |
| `{tier}` | `{tier}.rules.md` | `tier.mode.md` |
| `testing` | `testing.rules.md` | `testing.mode.md` |

Recommended generation order: `naming → back → front → db → testing`

### Output folder

```md
{Product_Folder}/
└── rules/
├── naming.rules.md     # Always generated
├── testing.rules.md    # Always generated
├── back.rules.md       # If backend tier detected
├── front.rules.md      # If frontend tier detected
└── db.rules.md         # If database tier detected
```

## Steps

Follow [incremental artifact pattern](./incremental-artifact.md):

- [ ] Read `AGENTS.md` → extract `{Product_Folder}`, `{Source_Folders}`, and detected tiers.
- [ ] Pick mode: `all` (run every missing mode in order), a named argument, or first missing file (`naming → tiers → testing`).
- [ ] If all rule files exist → report complete and suggest `/specify`. Stop.
- [ ] Execute the selected `{mode}.mode.md` and write one file under `rules/` (repeat for each mode when `all`).
- [ ] Summarize what was generated; for `all`, one combined summary at the end.

## Output
- [ ] One rule file written to `{Product_Folder}/rules/` per mode executed.

## Verification
- [ ] No placeholder text remains in any generated file.
- [ ] Every pattern includes at least one concrete do/don't example extracted from the actual codebase.
- [ ] Deviations from the dominant pattern are explicitly flagged.
- [ ] A new agent reading only `rules/` can write code indistinguishable from existing code in style and structure.

## Git (required)
- [ ] Read and follow [repository skill](../repository/SKILL.md) per [skill integrations](../repository/skill-integrations.md).