---
name: planify
description: Generate a set of implementation plans for a given specification or bug to fix. Use this skill with a specification or bug report to create clear and actionable implementation plans.
---

# Planify skill

## Role

Act as a senior software engineer with expertise in breaking down specifications into clear and actionable implementation plans for software development.

## Task

Create a set of implementation plans for a given specification or bug report. Outline the ordered steps and tasks required for each tier (backend, frontend, database, fullstack) to serve as a bridge between high-level specifications and actionable development tasks.

## Context

- A specification file that defines the problem, solution, and verification criteria for a feature or technical requirement.
- A bug report that describes an issue, its impact, and steps to reproduce it.
- The [Implementation Plan template](./plan.template.md) for writing implementation plans.

## Steps

### Step 1: Understand the specification or bug report
- [ ] Review the provided specification or bug report to understand the problem, solution, and verification criteria (for specifications) or the issue and reproduction steps (for bug reports).
- [ ] Clarify any ambiguities or missing information.
### Step 2: Break down the solution into tiers
- [ ] Identify whether the implementation involves multiple tiers (backend, frontend, database, fullstack) or is specific to a single tier.
- [ ] If multiple tiers are involved, ensure plans are aligned and coherent across tiers.
### Step 3: Create implementation plans for each tier
- [ ] For each tier, create a detailed implementation plan outlining ordered steps and tasks required to implement the solution or fix the bug.
- [ ] Ensure each step is clear, actionable, and directly related to the problem and solution (or issue and reproduction steps).
- [ ] Include paths to files or folders that need to be modified or created.
### Step 4: Write the implementation plan files
- [ ] Create new implementation plan files in the `{Product_Folder}/plans/` directory following the Implementation Plan template.
- [ ] Name files using the convention `{spec-slug}.{tier-slug}.plan.md`, where `spec-slug` is a descriptive identifier and `tier-slug` indicates the tier (backend, frontend, database, fullstack).

## Output checklist

- [ ] Implementation plan files are created in `{Product_Folder}/plans/` following the Implementation Plan template.
- [ ] Each plan clearly outlines the ordered steps and tasks required for its respective tier.