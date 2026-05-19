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
- [Incremental artifact pattern](../repository/incremental-artifact.md)
- [Artifact conventions](../repository/artifact-conventions.md)
- `AGENTS.md` — provides `{Product_Folder}`, `{Source_Folders}`, and detected tiers.
- Mode files in this skill's folder — one per output type.

### Modes
Each mode generates one output file and is driven by its corresponding mode file:

| Argument | Output file | Mode file |
|---|---|---|
| `system` | `system.arch.md` | `system.mode.md` |
| `adr` | `ADR.md` | `adr.mode.md` |
| `er` | `ER.md` | `er.mode.md` |
| `{tier}` | `{tier}.arch.md` | `tier.mode.md` |

Recommended generation order: `system → adr → er → back → front → db`

### Output folder

```md
{Product_Folder}/
└── arch/
├── system.arch.md   # Always generated
├── ADR.md           # Always generated
├── ER.md            # Always generated
├── back.arch.md     # If backend tier detected
├── front.arch.md    # If frontend tier detected
└── db.arch.md       # If database tier detected
```

## Steps

Follow [incremental artifact pattern](../repository/incremental-artifact.md):

- [ ] Read `AGENTS.md` → extract `{Product_Folder}`, `{Source_Folders}`, and detected tiers.
- [ ] Pick mode: argument, or first missing file in recommended order (`system → adr → er → tiers`).
- [ ] If all arch files exist → report complete and suggest `/extract`. Stop.
- [ ] Execute the selected `{mode}.mode.md` and write one file under `arch/`.
- [ ] Summarize what was generated and what remains.

## Output
- [ ] One architecture file written to `{Product_Folder}/arch/` per invocation.

## Verification
- [ ] All Mermaid diagrams render without errors.
- [ ] No placeholder text remains in any generated file.
- [ ] Every ADR entry has decision, rationale, and consequences.
- [ ] A new agent reading only `arch/` can answer: what does this system do, how is it structured, and what must not be changed?

## Git (required)
- [ ] Read and follow [repository skill](../repository/SKILL.md) per [skill integrations](../repository/skill-integrations.md).