---
name: extract
description: Extracts coding conventions from an existing codebase into agent-consumable rule files, one per tier. Use after /excavate to capture how code should be written, not just what exists. Trigger on "extract conventions", "generate coding rules", "I need coding patterns before codifying".
---
 
# Extract skill
 
## Role
 
Act as a senior software engineer performing a code convention audit.
 
## Task
 
Produce one `{tier}.rules.md` per tier under `{Rules_Folder}` (from `AGENTS.md`).
 
## Context
 
### Prerequisites
 
- Root `AGENTS.md` exists.
- `{Product_Folder}/arch/` exists — run `/excavate` first if missing.
### References
 
- `AGENTS.md` — `{Rules_Folder}`, `{Source_Folders}`, **Technology**
- `{Product_Folder}/arch/{tier}.arch.md` when present
- Template in this folder: `tier.rules.template.md`
## Steps
 
### Step 1: Read context
 
- [ ] Read `AGENTS.md` → tier list, `{Rules_Folder}`, `{Source_Folders}`.
- [ ] Read `arch/{tier}.arch.md` for the target tier if it exists.
- [ ] Note existing files under `{Rules_Folder}` — skip tiers already documented unless refresh requested.

### Step 2: Pick tier
 
- [ ] Use user argument if provided; otherwise pick the first undocumented tier.
- [ ] `all` → queue every missing tier; still one file per tier, one summary at the end.

### Step 3: Generate `{tier}.rules.md`
 
- [ ] Read `tier.rules.template.md`.
- [ ] Derive `{source_glob}` from the tier's source folder (e.g. `api/src/**/*.java`, `web/src/**/*.ts`).
- [ ] Glob file names in the tier's folder → classify by artifact role using naming + content heuristics.
- [ ] For each artifact role, read 1-2 representative files. Extract dominant pattern.
- [ ] Detect deviations by skimming structurally different files.
- [ ] Omit sections that don't apply to this tier (e.g. Testing for db, Wiring for e2e).

## Output
 
- [ ] Summarize artifact roles covered and dominant patterns found.
- [ ] Do not add sections or columns beyond the template. Try to keep them under 100 lines.
- [ ] Write `{tier}.rules.md` file under `{Rules_Folder}`.
- [ ] Commit via `/repository`.
- [ ] Suggest next missing tier, or "Conventions are complete" if all done.

## Verification
 
- [ ] Mermaid diagrams render; no placeholders remain.
- [ ] `{tier}.rules.md` alone answers: how this tier is structured and what it exposes.
- [ ] No leftover `{placeholders}`.
