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

- [ ] From README or user input, fill **Product** brief problem and solution descriptions. 
- [ ] Draft a system context diagram (based on C4Context diagram level 1)

## Output

- [ ] Summarize what was written and flag ambiguities.
- [ ] Write `AGENTS.md` at the project root following the template structure.
- [ ] Do not add sections or columns beyond the template. Try to keep it under 100 lines.
- [ ] Commit via `/repository`.
- [ ] Suggest `/explore` to start the architecture documentation process.

## Verification

- [ ] Mermaid diagrams render; no placeholders remain.
- [ ] `AGENTS.md` serves as a guide for the entire SDLC workflow.
- [ ] No leftover `{placeholders}`.