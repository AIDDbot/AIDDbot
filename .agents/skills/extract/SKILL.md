---
name: extract
description: Extracts coding conventions and patterns from an existing codebase into agent-consumable rule files. Use this skill after discover to capture how code should be written, not just what exists. Trigger on phrases like "extract this project", "extract conventions", "generate coding rules", or "I need coding patterns before codifying".
---

# Extract skill

## Role
Act as a senior software engineer performing a code convention audit.

## Task
Analyze source code in each tier and produce coding convention files under `{Product_Folder}/rules/`, structured for agent consumption during coding phases.

## Context

### Prerequisites
- `AGENTS.md` exists at the project root.
- `{Product_Folder}/arch/` exists (run `/discover` first if not). Architecture docs provide the structural context; this skill extracts the coding patterns.

### References
- `AGENTS.md` — provides `{Product_Folder}`, `{Source_Folders}`, and detected tiers.
- `{Product_Folder}/arch/{tier}.arch.md` — code organization, shared artifacts, constraints.

### Output folder
```
{Product_Folder}/
└── rules/
    ├── naming.rules.md     # Always generated — cross-tier naming conventions
    ├── testing.rules.md    # Always generated — test patterns per tier
    ├── back.rules.md       # If backend tier detected
    ├── front.rules.md      # If frontend tier detected
    └── db.rules.md         # If database tier detected
```

### Agent consumption targets
| File | Consumed by |
|------|-------------|
| `naming.rules.md` | `codify` — before creating any new file |
| `testing.rules.md` | `codify` — when writing unit tests |
| `{tier}.rules.md` | `codify` — when writing code for that tier |

---

## Usage

| Invocation | What runs | Mode file |
|------------|-----------|-----------|
| `/extract` | **Auto** — detects what's missing, runs next logical step | — |
| `/extract all` | **Batch** — runs all missing modes in sequence without pausing | — |
| `/extract naming` | Generates `naming.rules.md` | `naming.mode.md` |
| `/extract testing` | Generates `testing.rules.md` | `testing.mode.md` |
| `/extract {tier}` | Generates `{tier}.rules.md` (e.g. `back`, `front`, `db`) | `tier.mode.md` |

### Recommended order
```
naming → back → front → db → testing
```

### Dependencies between modes
- **naming** has no dependencies — always safe to run first.
- **tier** modes benefit from `naming.rules.md` existing (to avoid duplication) but can run standalone.
- **testing** should run last — it references patterns from tier rules.

---

## Execution

### With argument → run the requested mode
1. Read `AGENTS.md` → extract `{Product_Folder}` and tiers.
2. Read the corresponding mode file from this skill's folder (e.g. `naming.mode.md`).
3. Follow the steps defined in the mode file.

### Without argument → auto mode
1. Read `AGENTS.md` → extract `{Product_Folder}` and detect tiers.
2. Check which files exist under `{Product_Folder}/rules/`.
3. Pick the **first missing** file from this ordered list:
   - `naming.rules.md` → read and run `naming.mode.md`
   - `{tier}.rules.md` for each detected tier (order: back, front, db, others) → read and run `tier.mode.md`
   - `testing.rules.md` → read and run `testing.mode.md`
4. If all files exist → report "Conventions are complete" and suggest `/codify`.
5. After completing the mode, summarize what was generated and what remains.

### With `all` argument → batch mode
1. Read `AGENTS.md` → extract `{Product_Folder}` and detect tiers.
2. Check which files exist under `{Product_Folder}/rules/`.
3. For each missing file in the ordered list (naming → tiers → testing):
   - Read and execute the corresponding mode file.
   - Do NOT pause or ask for confirmation between modes.
4. After all modes complete, present a single summary: files generated, deviations found, and suggest `/codify`.

---

## Verification (applies to all modes)
- [ ] No placeholder text remains in any file.
- [ ] Every pattern includes at least one concrete do/don't example extracted from the actual codebase.
- [ ] Deviations from the dominant pattern are explicitly flagged.
- [ ] A new agent reading only `rules/` can write code that is indistinguishable from existing code in style and structure.
