---
name: establish
description: Establishes the AIDD project environment and generates root AGENTS.md and SOUL.md. Use this skill when setting up a new project or onboarding an existing one into the AIDD workflow. Trigger on phrases like "Establish yourself in this codebase", "initialize the project", "set up agents", "create AGENTS.md", or at the start of any new AIDD project setup.
---

# Establish skill

## Role

Act as a senior software engineer.

## Task

- Create or update root `AGENTS.md` with instructions for the whole SDLC workflow.
- Copy root `SOUL.md` from the fixed skill template (personality, git rules, and boundaries — no placeholders).

## Context

- A tier is a logical group of code that can be run separately. eg: back, front, fullstack, cli, e2e, db.

### References

- [Agents Instructions template](./AGENTS.template.md)
- [Soul template](./SOUL.md) — copy verbatim to project root

## Steps

### Step 1: Establishing the project

- [ ] Check for existing `AGENTS.md`, `SOUL.md`, `CLAUDE.md`, `README.md`, `CHANGELOG.md` at the project root.
- [ ] Classify **greenfield** (empty no functional code) vs **brownfield** (legacy features and versions)

### Step 2: Confirm environment values

- [ ] Propose **AIDD path defaults** and ask the user to confirm or override.
- [ ] Infer **OS**, **Shell**, **Git** remote URL, and **Git Branch** default from the repo and environment.
- [ ] Shallow-scan the folder tree 
- [ ] Draft a layout with the actual files and folders and a short description of each.

### Step 3: Define Product

- [ ] From README or user input, fill **Product** brief problem and solution descriptions. 
- [ ] Draft a system context diagram (based on C4Context diagram level 1)
- [ ] Infer or propose an e2e testing strategy

## Output

- [ ] Summarize what was written and flag ambiguities.
- [ ] Write `AGENTS.md` at the project root following the template structure.
- [ ] Copy [SOUL.md](./SOUL.md) to the project root unchanged (overwrite only if the user confirms or the file is missing).
- [ ] Do not add sections or columns beyond the AGENTS template. Try to keep `AGENTS.md` under 100 lines.
- [ ] Commit with conventional message (`chore`).
- [ ] Suggest `/explore`, then `/elaborate` and `/extract`.

## Verification

- [ ] Mermaid diagrams render; no placeholders remain in `AGENTS.md`.
- [ ] `SOUL.md` exists at the project root and matches the establish skill template.
- [ ] `AGENTS.md` serves as a guide for the entire SDLC workflow.
- [ ] No leftover `{placeholders}` in `AGENTS.md`.
