---
name: initialize
description: Initializes the AIDD project environment and generates the main AGENTS.md instructions file. Use this skill when setting up a new project or onboarding an existing one into the AIDD workflow. Trigger on phrases like "initialize the project", "set up agents", "create AGENTS.md", or at the start of any new AIDD project setup.
---

# Initialize skill

## Role

Act as a senior software engineer.

## Task

Create or update root `AGENTS.md` from [AGENTS.template.md](./AGENTS.template.md): paths, layout, git rules, artifact patterns, implementation-context table, spec-status frontmatter example, **Technology** (short stack description + per-tier table), and **Product** (description + key features). Do not add sections or columns beyond the template.

## Context

### References

- [Agents Instructions template](./AGENTS.template.md)

### AIDD path defaults

- `{Agents_Folder}`: `.agents/`
- `{Product_Folder}`: `.product/`
- `{Business_Domain_Language}`: `English` (or detected language)

### Technology (AGENTS only)

One short stack sentence under **Technology**, then one row per tier. Columns only: **Folder**, **Language**, **Framework**, **Build**, **Run**, **Test**. Include app tiers (`back`, `front`, …), **E2E** when `e2e/` or other E2E root exists, **DB** when migrations/schema live in-repo. Omit non-applicable tiers; use `—` when a command does not apply (e.g. DB run).

## Steps

### Step 1: Survey the project

- [ ] Check for existing `AGENTS.md` or `CLAUDE.md` at the project root.
- [ ] Read `README.md`, `CHANGELOG.md`, and shallow-scan the tree for `{Agents_Folder}/skills/`, `{Product_Folder}/`, tier roots, `e2e/` (or `tests/`), and `db/` / migrations.
- [ ] Classify **greenfield** vs **brownfield**.
- [ ] If `{Agents_Folder}/skills/` is missing, copy from [AIDDbot](https://github.com/AIDDbot/AIDDbot). Architecture depth belongs in `/explore` after initialize — not in this step.

### Step 2: Confirm environment values

- [ ] Propose **AIDD path defaults** and ask the user to confirm or override: `{Agents_Folder}`, `{Product_Folder}`, `{Source_Folders}`, `{Business_Domain_Language}`.
- [ ] Propose **OS**, **Shell**, **Git** remote URL, and **Git Branch** default from the repo and environment; confirm with the user.

### Step 3: Technology

- [ ] **Brownfield**: from manifests and README, draft the stack sentence and one table row per tier; user confirms or corrects.
- [ ] **Greenfield**: ask planned tiers and stack; commands may be `TBD` until tooling exists.
- [ ] Add **E2E** / **DB** rows when applicable (see **Technology** above).
- [ ] Do not add storage, security, lint, deploy, or per-tier prose beyond the template.

### Step 4: Product

- [ ] From README or user input, fill **Product**: short description and each `{key feature N}` placeholder in the template.
- [ ] On brownfield, note the same features in chat as input for `/explore system` (full detail still goes to `{Product_Folder}/arch/` later).

## Output

- [ ] Write `AGENTS.md` at the project root by copying the template structure and replacing every `{placeholder}`.
- [ ] **Layout** tree: set `{Project_Root}` to the repo root label (e.g. project folder name or `.`); use real folder names for `{Agents_Folder}`, `{Product_Folder}`, `{Source_Folders}`, and `e2e/` only when that folder exists.
- [ ] Copy **Implementation context (brownfield)**, **Spec status** YAML block, **Principles**, and static tables verbatim except resolved paths.
- [ ] If brownfield, suggest `/explore` (start with `system`, then tiers) and `/extract` before feature work.

## Verification

- [ ] All template placeholders replaced (including **Behavior** slug/language rules).
- [ ] `{Agents_Folder}/skills/` is present.
- [ ] **Environment** lists paths, OS, shell, git remote, and default branch.
- [ ] **Technology** has stack sentence + one row per real tier (E2E/DB when applicable); no extra columns.
- [ ] **Product** has description and all key-feature bullets filled.
- [ ] No sections absent from or added beyond [AGENTS.template.md](./AGENTS.template.md).
