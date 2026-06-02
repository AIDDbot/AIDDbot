---
name: establish
description: Establishes the AIDD project environment and generates root AGENTS.md (including system architecture and key decisions) and SOUL.md. Use this skill when setting up a new project or onboarding an existing one into the AIDD workflow. Trigger on phrases like "Establish yourself in this codebase", "initialize the project", "set up agents", "create AGENTS.md", or at the start of any new AIDD project setup.
---

# Establish skill

## Role

Act as a senior software engineer and architect.

## Task

- Create or update root `AGENTS.md` with the project environment, product brief, **and the system architecture** (C4 L2 containers + the decisions that constrain planning).
- Copy root `SOUL.md` from the fixed skill template (personality, git rules, and boundaries — no placeholders).

## Context

### References

- [Agents Instructions template](./AGENTS.template.md)
- [Soul template](./SOUL.md) — copy verbatim to project root
- [Greenfield mode guide](./greenfield.mode.md)
- [Brownfield mode guide](./brownfield.mode.md)

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
- [ ] Propose an e2e testing strategy.

### Step 4: Define Architecture

- [ ] Infer whether this is a monorepo with multiple projects or a single project; each project is a container that belongs to a **Tier**.
- [ ] Read and follow only the selected mode guide:
  - `greenfield.mode.md` when the starting point is greenfield.
  - `brownfield.mode.md` when the starting point is brownfield.
- [ ] Only document decisions that constrain planning — nothing trivial or easily reversible. Defer component-level structure and contracts to `/extract`.

## Output

- [ ] Summarize what was written; flag ambiguities (brownfield) or open decisions (greenfield).
- [ ] Write `AGENTS.md` at the root per the template (environment, product, and architecture).
- [ ] Copy `SOUL.md` to the root unchanged.
- [ ] No sections/columns beyond the template; keep `AGENTS.md` under 140 lines.
- [ ] Commit (`chore`).
- [ ] Suggest `/extract` to define per-tier conventions and the domain model.

## Verification

- [ ] No placeholders remain in `AGENTS.md`; Mermaid renders.
- [ ] `SOUL.md` exists at the root, matching the skill template.
- [ ] `AGENTS.md` alone answers: what the system does, how containers are arranged, and which decisions constrain planning.
