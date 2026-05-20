---
name: initialize
description: Initializes the AIDD project environment and generates the main AGENTS.md instructions file. Use this skill when setting up a new project or onboarding an existing one into the AIDD workflow. Trigger on phrases like "initialize the project", "set up agents", "create AGENTS.md", or at the start of any new AIDD project setup.
---

# Initialize skill

## Role

Act as a senior software engineer.

## Task

Generate or update the main agent instructions file `AGENTS.md` at the project root: AIDD paths, workflow rules, a slim **Technology** table per tier, and pointers to architecture docs. Full product and structural detail belong in `{Product_Folder}/arch/` from `/explore`.

## Context

### References

- [Agents Instructions template](./AGENTS.template.md)

### AIDD path defaults

- `{Agents_Folder}`: `.agents/`
- `{Product_Folder}`: `.product/`
- `{Business_Domain_Language}`: `English` (or detected language)

### Technology table (AGENTS only)

One row per tier. Columns only: **Folder**, **Language**, **Framework**, **Build**, **Run**, **Test**. Include app tiers (`back`, `front`, …), **E2E** when present, and **DB** when schema/migrations exist. Omit rows for tiers that do not apply.

## Steps

### Step 1: Survey the project

- [ ] Check if `AGENTS.md` or `CLAUDE.md` already exists at the project root.
- [ ] Read `README.md`, `CHANGELOG.md`, and any other relevant files at the root.
- [ ] Scan the folder tree (shallow) to detect tiers: app roots, `tests/` or dedicated E2E folder, `db/` or migrations folder.
- [ ] Determine whether this is a **greenfield** (no existing code) or **brownfield** (existing codebase) project.
- [ ] Confirm `{Agents_Folder}/skills/` exists (copy from [AIDDbot](https://github.com/AIDDbot/AIDDbot) if missing). Deep architecture belongs in `/explore` after this skill — not here.

### Step 2: Confirm AIDD paths

- [ ] Propose defaults from **AIDD path defaults** above; ask the user to confirm or override each value before writing `AGENTS.md`.

### Step 3: Define Technology rows

- [ ] **Brownfield**: from manifests and README, propose one row per tier with folder, language, framework, and build/run/test commands. Ask the user to confirm or correct.
- [ ] **Greenfield**: ask the user for planned tiers and fill the table from their answers (commands may be `TBD` until tooling exists).
- [ ] Add an **E2E** row when the project has E2E tests (often `tests/` or `e2e/`).
- [ ] Add a **DB** row when migrations or schema live in-repo (use `—` for Run when N/A).
- [ ] Do **not** add storage, security, lint, deploy, init, or source-tree sections to `AGENTS.md`.

### Step 4: Project summary (AGENTS only)

- [ ] Set `{Product_Name}` and a **one-line** summary under **Project** (from README or user input).
- [ ] Propose up to 5 key features for the user to confirm — they go to `arch/system.arch.md` via `/explore system`, not into `AGENTS.md`.
- [ ] On brownfield, note confirmed features in the chat for `/explore system`.

## Output

- [ ] Create or update `AGENTS.md` at the project root following the Agents Instructions template.
- [ ] Replace all placeholders with actual values.
- [ ] **Technology** table lists every tier with folder, language, framework, build, run, and test only.
- [ ] If brownfield, suggest `/explore` (start with `system`, then tiers) and `/extract` before building features.

## Verification

- [ ] All AIDD paths are set.
- [ ] `{Agents_Folder}/skills/` is present.
- [ ] **Project** has name and one-line summary with arch pointer.
- [ ] **Technology** has one row per real tier (including E2E and DB when applicable); no extra columns or prose per tier.
