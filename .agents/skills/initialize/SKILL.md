---
name: initialize
description: Initializes the AIDD project environment and generates the main AGENTS.md instructions file. Use this skill when setting up a new project or onboarding an existing one into the AIDD workflow. Trigger on phrases like "initialize the project", "set up agents", "create AGENTS.md", or at the start of any new AIDD project setup.
---

# Initialize skill

## Role

Act as a senior software engineer.

## Task

- Create or update root `AGENTS.md` with instructions for the whole SDLC workflow.

## Context

### References

- [Agents Instructions template](./AGENTS.template.md)

### AIDD path defaults

- `{Agents_Folder}`: `.agents/`
- `{Product_Folder}`: `.product/`
- `{Rules_Folder}`: `{Agents_Folder}/rules/` (or user override)
- `{Business_Domain_Language}`: `English` (or detected language)

## Steps

### Step 1: Survey the project

- [ ] Check for existing `AGENTS.md` or `CLAUDE.md` at the project root.
- [ ] Read `README.md`, `CHANGELOG.md`, and shallow-scan the folder tree.
- [ ] Classify **greenfield** vs **brownfield**.
- [ ] If `{Agents_Folder}/skills/` is missing, copy from [AIDDbot](https://github.com/AIDDbot/AIDDbot). 

### Step 2: Confirm environment values

- [ ] Propose **AIDD path defaults** and ask the user to confirm or override.
- [ ] Infer **OS**, **Shell**, **Git** remote URL, and **Git Branch** default from the repo and environment.

### Step 3: Technology

- [ ] **Brownfield**: from manifests and README, draft the stack sentence and one table row per tier
- [ ] **Greenfield**: ask planned tiers and stack; commands may be `TBD` until tooling exists.
- [ ] Add **E2E-testing** / **DB** rows when applicable .
- [ ] Do not add storage, security, lint, deploy, or per-tier prose beyond the template.

### Step 4: Product

- [ ] From README or user input, fill **Product** brief description. 
- [ ] List top 5 key features, scope, and out of scope items.

## Output

- [ ] Write `AGENTS.md` at the project root follow template structure and replace every `{placeholder}`.
- [ ] Suggest `/explore` (start with `system`, then tiers).
- [ ] Do not add sections or columns beyond the template.

## Verification

- [ ] All template placeholders replaced.
- [ ] `{Agents_Folder}/skills/` is present.
- [ ] **Environment** lists paths, OS, shell, git remote, and default branch.
- [ ] **Technology** has stack sentence + one row per real tier (**Tier** column + E2E/DB when applicable).
- [ ] **Product** has description, key features (≤5), **Scope**, and **Out of scope** filled.
- [ ] No sections absent from or added beyond [AGENTS.template.md](./AGENTS.template.md).
