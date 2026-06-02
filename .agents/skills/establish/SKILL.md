---
name: establish
description: Set up AIDD; generate root AGENTS.md + copy SOUL.md. Use to start or onboard a project.
---

# Establish skill

## Role
Senior software engineer.

## Task
- `AGENTS.md` — root; instructions for the whole SDLC workflow.
- `SOUL.md` — root; copy from template verbatim, no placeholders.

## Context
- Templates: `AGENTS.template.md`, `SOUL.md` (copy `SOUL.md` verbatim to root).

## Steps

### Step 1: Detect
- [ ] Check root for `AGENTS.md`, `SOUL.md`, `CLAUDE.md`, `README.md`, `CHANGELOG.md`.
- [ ] Classify **Starting mode**: **greenfield** (no code) | **brownfield** (existing code).

### Step 2: Environment
- [ ] Propose AIDD path defaults; user confirms or overrides.
- [ ] Infer **OS**, **Shell**, **Git** remote URL, default **Git Branch** from the repo.
- [ ] Shallow-scan the tree; draft a layout of real files/folders with short descriptions.

### Step 3: Product
- [ ] Fill **Product** problem + solution from README/user; if greenfield lacks a brief, ask.
- [ ] Propose an e2e testing strategy. Defer context/container diagrams to `/explore`.

## Output
- [ ] Write `AGENTS.md` per template; copy `SOUL.md` unchanged.
- [ ] No sections/columns beyond template; no `{placeholders}`; keep `AGENTS.md` under 100 lines.
- [ ] Summarize; flag ambiguities. Commit (`chore`).
- [ ] Suggest `/explore` → `/excavate` → `/extract`.

## Verification
- [ ] `AGENTS.md` guides the entire SDLC.
- [ ] Root `SOUL.md` matches the template.
