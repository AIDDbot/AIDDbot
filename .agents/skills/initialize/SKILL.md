---
name: initialize
description: Initializes the AIDD project environment and generates the main AGENTS.md instructions file. Use this skill when setting up a new project or onboarding an existing one into the AIDD workflow. Trigger on phrases like "initialize the project", "set up agents", "create AGENTS.md", or at the start of any new AIDD project setup.
---

# Initialize skill

## Role
Act as a senior software engineer.

## Task
Generate or update the main agent instructions file `AGENTS.md` at the project root: AIDD paths, workflow rules, tier index, and pointers to architecture docs — not full stack or product detail (those belong in `{Product_Folder}/arch/` from `/explore`).

## Context

### References
- [Agents Instructions template](./AGENTS.template.md)

### AIDD path defaults
- `{Agents_Folder}`: `.agents/`
- `{Product_Folder}`: `.product/`
- `{Business_Domain_Language}`: `English` (or detected language)

## Steps

### Step 1: Survey the project
- [ ] Check if `AGENTS.md` or `CLAUDE.md` already exists at the project root.
- [ ] Read `README.md`, `CHANGELOG.md`, and any other relevant files at the root.
- [ ] Scan the folder tree (shallow) to detect source structure and likely tiers.
- [ ] Determine whether this is a **greenfield** (no existing code) or **brownfield** (existing codebase) project.
- [ ] Confirm `{Agents_Folder}/skills/` exists (copy from [AIDDbot](https://github.com/AIDDbot/AIDDbot) if missing). Deep architecture belongs in `/explore` after this skill — not here.

### Step 2: Confirm AIDD paths
- [ ] Propose defaults from **AIDD path defaults** above; ask the user to confirm or override each value before writing `AGENTS.md`.

### Step 3: Define tiers index
- [ ] **Brownfield**: propose one row per tier — display name, `{source_folder}/`, and `arch/{tier_slug}.arch.md` (e.g. Backend → `back/` → `arch/back.arch.md`). Ask the user to confirm or correct.
- [ ] **Greenfield**: ask the user for planned tiers and source folders; propose slugs for arch filenames.
- [ ] Do **not** capture language versions, frameworks, dev commands, or source tree layout in `AGENTS.md` — `/explore` writes those to `arch/`.

### Step 4: Project summary (AGENTS only)
- [ ] Set `{Product_Name}` and a **one-line** summary under **Project** (from README or user input).
- [ ] Propose up to 5 key features for the user to confirm — they will be written to `arch/system.arch.md` by `/explore system`, not duplicated in `AGENTS.md`.
- [ ] On brownfield, note confirmed features in the chat so `/explore system` can use them; on greenfield, features can wait until code exists.

## Output
- [ ] Create or update `AGENTS.md` at the project root following the Agents Instructions template.
- [ ] Replace all placeholders with actual values.
- [ ] Keep `AGENTS.md` concise: workflow, paths, tier index, pointer to `arch/system.arch.md` — no per-tier stack or dev-command blocks.
- [ ] If brownfield, suggest `/explore` (start with `system`, then tiers) and `/extract` before building features.

## Verification
- [ ] All AIDD paths are set.
- [ ] `{Agents_Folder}/skills/` is present.
- [ ] **Project** has name and one-line summary with arch pointer.
- [ ] **Tiers** table lists every tier with source folder and `arch/{tier}.arch.md` path.
- [ ] No **Technology** section or per-tier stack prose in `AGENTS.md`.
