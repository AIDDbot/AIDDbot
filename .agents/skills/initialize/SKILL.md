---
name: initialize
description: Initializes the SDD project environment and generates the main AGENTS.md instructions file. Use this skill when setting up a new project or onboarding an existing one into the SDD workflow. Trigger on phrases like "initialize the project", "set up agents", "create AGENTS.md", or at the start of any new SDD project setup.
---

# Initialize skill

## Role
Act as a senior software engineer.

## Task
Generate or update the main agent instructions file `AGENTS.md` at the project root, capturing SDD paths, product overview, and technical stack.

## Context

### References
- [Agents Instructions template](./AGENTS.template.md)

### SDD path defaults
- `{Agents_Folder}`: `.agents/`
- `{Product_Folder}`: `.product/`

## Steps

### Step 1: Explore the project
- [ ] Check if `AGENTS.md` or `CLAUDE.md` already exists at the project root.
- [ ] Read `README.md`, `CHANGELOG.md`, and any other relevant files at the root.
- [ ] Explore the folder tree to detect source structure, tiers, languages, and frameworks.
- [ ] Determine whether this is a **greenfield** (no existing code) or **brownfield** (existing codebase) project.

### Step 2: Confirm SDD paths
- [ ] Propose the default SDD paths and ask the user to confirm or override:
  - `{Agents_Folder}`: `.agents/`
  - `{Product_Folder}`: `.product/`
  - `{Business_Domain_Language}`: detected or ask the user.

### Step 3: Define source paths and stack
- [ ] **Brownfield**: propose `{Source_Folders}`, tiers, languages, frameworks, and tooling based on exploration. Ask the user to confirm or correct.
- [ ] **Greenfield**: ask the user to define `{Source_Folders}` and propose a stack for confirmation.
- [ ] For each tier, capture: language and version, frameworks and libraries, testing/storage/security/monitoring solutions, and workflow commands (init, build, run, test, lint, deploy).

### Step 4: Define product overview
- [ ] Propose or ask for:
  - [ ] A brief description of the product.
  - [ ] Up to 5 key product features.

## Output
- [ ] Create or update `AGENTS.md` at the project root following the Agents Instructions template.
- [ ] Replace all placeholders with actual values.
- [ ] Keep `AGENTS.md` under 100 concise lines.

## Verification
- [ ] All SDD paths are set.
- [ ] Product overview is defined.
- [ ] Technical stack is defined for each tier.