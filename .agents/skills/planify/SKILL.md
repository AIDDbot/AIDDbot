---
name: planify
description: Generates implementation plan files from a spec. Use this skill when the user wants to break down a spec, into actionable implementation steps. Trigger on phrases like "planify this", "create a plan for", "break this down", or whenever a spec is ready to be planned before coding.
---

# Planify skill

## Role
Act as a senior analyst.

## Task
Given a spec produce one or more implementation plan files — one per tier — that break the solution into ordered, actionable steps ready for coding.

## Context

### Input
- The spec file: `{Product_Folder}/specs/{slug}/spec.md` 

### Prerequisites
- Root `AGENTS.md` with its **Architecture** section — run `/establish` if missing.
- `{Rules_Folder}/{tier}.md` for the tiers in scope — run `/extract` if missing.

### References

- System architecture and decisions in the **Architecture** section of root `AGENTS.md`
- Tier architecture, domain entities, and conventions at `{Rules_Folder}/{tier}.md`
- [Plan template](./plan.template.md)

### Plan naming convention

`{Product_Folder}/specs/{slug}/{tier?}.plan.md` 
- Plans live inside the spec's own folder, alongside `spec.md`.
- `{slug}`: the slug of the spec or derived from the input (carried by the folder name and the plan frontmatter).
- `{tier?}`: `back` | `front` | `db` | `fullstack` | omit (e.g. `back.plan.md`, or `plan.md` when no tier applies).

## Steps

### Step 1: Understand the input
- [ ] If incomplete or ambiguous, document assumptions and proceed with best-effort.

### Step 2: Start the feature branch (idempotent)
- [ ] Commit any pending work with a conventional message before branching.
- [ ] Work on feature branch `feat/{slug}`; create it from the default branch if missing.
- [ ] Set the spec `status: in-progress` if not already (planning is the start of feature work; plans live on this branch).

### Step 3: Identify tiers
- [ ] Tiers: `back`, `front`, `db`, or fullstack. 
- [ ] Choose the tiers from the spec and go one by one.

### Step 4: Draft the implementation steps for the tier
- [ ] Per tier: ordered steps with titles, descriptions, and paths; traceable to input.
- [ ] Do not add extra steps or task for testing or documentation.
- [ ] Respect the decisions and architecture constraints recorded in `AGENTS.md` and `{Rules_Folder}/{tier}.md`.
- [ ] Frontmatter: 
  - `slug` matches `{slug}`
  - `tier` is `back` | `front` | `db` | `fullstack` | omit
  - `status` is `pending`

## Output
- [ ] Write the plan file(s) under `{Product_Folder}/specs/{slug}/{tier?}.plan.md`
- [ ] Suggest `/codify` to write the code for the implementation steps.

## Verification
- [ ] On branch `feat/{slug}`; spec is `in-progress`.
- [ ] Each plan is complete, ordered, and actionable without extra context.
- [ ] Frontmatter `slug` matches the `{slug}` folder name; status is `pending`.