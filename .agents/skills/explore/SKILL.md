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
- `AGENTS.md` — provides `{Product_Folder}`, `{Source_Folders}`, and detected tiers.

### Output folder
```
{Product_Folder}/
└── arch/
    ├── system.arch.md   # Always generated
    ├── ADR.md           # Always generated
    ├── ER.md            # Always generated (domain model inferred from code)
    ├── back.arch.md     # If backend tier detected
    ├── front.arch.md    # If frontend tier detected
    └── db.arch.md       # If database tier detected (infra, not domain model)
```

### Agent consumption targets
| File | Consumed by |
|------|-------------|
| `system.arch.md` | `planify` — before any cross-tier planning |
| `ADR.md` | `planify` — to avoid contradicting past decisions |
| `ER.md` | `planify` + `codify` — domain model reference for any tier |
| `{tier}.arch.md` | `planify` + `codify` — when working on that tier |

---

## Usage

| Invocation | What runs | Mode file |
|------------|-----------|-----------|
| `/explore` | **Auto** — detects what's missing, runs next logical step | — |
| `/explore system` | Generates `system.arch.md` | `system.mode.md` |
| `/explore adr` | Generates `ADR.md` | `adr.mode.md` |
| `/explore er` | Generates `ER.md` | `er.mode.md` |
| `/explore {tier}` | Generates `{tier}.arch.md` (e.g. `back`, `front`, `db`) | `tier.mode.md` |

### Recommended order
```
system → adr → er → back → front → db
```

### Dependencies between modes
- **system** has no dependencies — always safe to run first.
- **adr**, **er**, and **tier** modes read `system.arch.md` for context if it exists, but can run standalone.

---

## Execution

### With argument → run the requested mode
1. Read `AGENTS.md` → extract `{Product_Folder}` and tiers.
2. Read the corresponding mode file from this skill's folder (e.g. `system.mode.md`).
3. Follow the steps defined in the mode file.

### Without argument → auto mode
1. Read `AGENTS.md` → extract `{Product_Folder}` and detect tiers.
2. Check which files exist under `{Product_Folder}/arch/`.
3. Pick the **first missing** file from this ordered list:
   - `system.arch.md` → read and run `system.mode.md`
   - `ADR.md` → read and run `adr.mode.md`
   - `ER.md` → read and run `er.mode.md`
   - `{tier}.arch.md` for each detected tier (order: back, front, db, others) → read and run `tier.mode.md`
4. If all files exist → report "Architecture is complete" and suggest `/review`.
5. After completing the mode, summarize what was generated and what remains.

---

## Verification (applies to all modes)
- [ ] All Mermaid diagrams render without errors.
- [ ] No placeholder text remains in any file.
- [ ] Every ADR entry has decision + rationale + consequences.
- [ ] A new agent reading only `arch/` can answer: what does this system do, how is it structured, and what must not be changed?
