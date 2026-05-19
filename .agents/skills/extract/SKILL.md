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
- `AGENTS.md` — provides `{Product_Folder}`, `{Source_Folders}`, and detected tiers.
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

### Step 1: Read the environment
- [ ] Read `AGENTS.md` → extract `{Product_Folder}`, `{Source_Folders}`, and detected tiers.

### Step 2: Determine what to run
- [ ] If `all` was given → collect all missing files in recommended order and run each mode in sequence without pausing. Skip to Step 3 for each.
- [ ] If a specific argument was given → identify the corresponding mode file and skip to Step 3.
- [ ] If no argument → check which files exist under `{Product_Folder}/rules/` and pick the first missing from the recommended order.
- [ ] If all files exist → report "Conventions are complete" and suggest `/specify` to start the next feature. Stop.

### Step 3: Execute the mode
- [ ] Read the mode file identified in Step 2.
- [ ] Follow all steps defined in it.

### Step 4: Summarize
- [ ] Report what was generated.
- [ ] List remaining rule files not yet produced.
- [ ] If running in `all` mode, present a single summary at the end covering all generated files.

## Output
- [ ] One rule file written to `{Product_Folder}/rules/` per mode executed.

## Verification
- [ ] No placeholder text remains in any generated file.
- [ ] Every pattern includes at least one concrete do/don't example extracted from the actual codebase.
- [ ] Deviations from the dominant pattern are explicitly flagged.
- [ ] A new agent reading only `rules/` can write code indistinguishable from existing code in style and structure.

## Git (required)
- [ ] Read and follow [repository skill](../repository/SKILL.md) per [skill integrations](../repository/skill-integrations.md).