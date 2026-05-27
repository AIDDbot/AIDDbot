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

## Steps

### Step 1: Establishing the project

- [ ] Check for existing `AGENTS.md` or `CLAUDE.md`, `README.md`, `CHANGELOG.md` at the project root.
- [ ] Classify **greenfield** (empty no functional code) vs **brownfield** (legacy features and versions)

### Step 2: Confirm environment values

- [ ] Propose **AIDD path defaults** and ask the user to confirm or override.
- [ ] Infer **OS**, **Shell**, **Git** remote URL, and **Git Branch** default from the repo and environment.
- [ ] Shallow-scan the folder tree and draft a layout with the actual files and folders.

### Step 3: Define Product

- [ ] From README or user input, fill **Product** brief description. 
- [ ] List top 5 key features, scope, and out of scope items.

### Step 4: Technology

- [ ] Infer the technology stack from the project context.
- [ ] Draft a short description of the technology stack based on context. Clarify with user.
- [ ] For each physical tier, infer the language, framework, development workflow.
- [ ] Add **E2E-testing** / **Database** sections when applicable.
- [ ] Do not add storage, security, lint, deploy, or per-tier prose beyond the template.


## Output

- [ ] Write `AGENTS.md` at the project root following the template structure.
- [ ] Do not add sections or columns beyond the template. Try to keep it under 100 lines.
- [ ] Suggest `/explore` to start the architecture documentation process.

## Verification

- [ ] `AGENTS.md` exists and is under 100 lines.
- [ ] All template placeholders replaced.
- [ ] **Environment** lists paths, OS, shell, git remote, and default branch.
- [ ] **Product** has description, key features (≤5), **Scope**, and **Out of scope** filled.
- [ ] **Technology** has stack sentence + one row per real tier (**Tier** column + E2E/DB when applicable).
- [ ] No sections absent from or added beyond [AGENTS.template.md](./AGENTS.template.md).
