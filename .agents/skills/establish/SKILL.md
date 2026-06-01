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

### References

- [Agents Instructions template](./AGENTS.template.md)
- [Soul template](./SOUL.md) — copy verbatim to project root

## Steps

### Step 1: Establish the project

- [ ] Check for existing `AGENTS.md`, `SOUL.md`, `CLAUDE.md`, `README.md`, `CHANGELOG.md` at the root.
- [ ] Classify **Starting point**: **greenfield** (no functional code) or **brownfield** (existing code).

### Step 2: Confirm environment values

- [ ] Propose **AIDD path defaults**; ask the user to confirm or override.
- [ ] Infer **OS**, **Shell**, **Git** remote URL, and default **Git Branch** from the repo/environment.
- [ ] Shallow-scan the folder tree; draft a layout of actual files/folders, each with a short description.

### Step 3: Define Product

- [ ] Fill **Product** problem and solution from README or user input; on greenfield with no brief, ask rather than invent.
- [ ] Draft a system context diagram (C4 level 1).
- [ ] Propose an e2e testing strategy.

## Output

- [ ] Summarize what was written; flag ambiguities.
- [ ] Write `AGENTS.md` at the root per the template.
- [ ] Copy `SOUL.md` to the root unchanged.
- [ ] No sections/columns beyond the template; keep `AGENTS.md` under 100 lines.
- [ ] Commit (`chore`).
- [ ] Suggest `/explore`, then `/excavate` and `/extract`.

## Verification

- [ ] Mermaid renders; no placeholders remain in `AGENTS.md`.
- [ ] `SOUL.md` exists at the root, matching the skill template.
- [ ] `AGENTS.md` guides the entire SDLC workflow.
