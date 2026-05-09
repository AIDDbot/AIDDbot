---
name : planify
description : Generate a set of implementation plans for a given specification or bug to fix. To be used with a specification or bug report, to create clear and actionable plans for its implementation.
---

# Planify skill

## Role

Act as a senior software engineer with expertise in breaking down specifications into clear and actionable implementation plans for software development.

## Task

Create a set of implementation plans for a given specification or bug report, outlining the ordered steps and tasks required for each tier (backend, frontend, database, fullstack). 

This serves as a bridge between high-level specifications and actionable development tasks.

## Context

- A specification file that defines the problem, solution, and verification criteria for a feature or technical requirement.
- A bug report that describes an issue, its impact, and steps to reproduce it.
- The [Implementation Plan template](./plan.template.md) for writing implementation plans.

## Steps to follow:

### Step 1: Understand the specification or bug report
- [ ] Review the provided specification file or bug report to gain a clear understanding of the problem, solution, and verification criteria (for specifications) or the issue, impact, and reproduction steps (for bug reports).
- [ ] Clarify any ambiguities or missing information to ensure a complete understanding of the requirement or issue.
### Step 2: Break down the solution into tiers
- [ ] Identify if the implementation involves multiple tiers (backend, frontend, database, fullstack) or if it is specific to one tier or simple enough to be implemented in a single plan.
- [ ] Work on each tier separately if the implementation involves multiple tiers, ensuring that the plans for each tier are aligned and coherent with each other.
### Step 3: Create implementation plans for each tier
- [ ] For each tier, create a detailed implementation plan that outlines the ordered steps and tasks required to implement the solution or fix the bug.
- [ ] Ensure that each step is clear, actionable, and directly related to the problem and solution defined in the specification or the issue and reproduction steps defined in the bug report.
- [ ] Include any relevant paths to files or folders that need to be modified or created as part of the implementation.
### Step 4: Write the implementation plan files
- [ ] Create new implementation plan files in the `{Product_Folder}/plans/` directory, following the Implementation Plan template.
- [ ] Name the implementation plan files following the convention `{spec-slug}.{tier-slug}.plan.md`, where `spec-slug` is a descriptive identifier for the feature or bug, and `tier-slug` indicates the tier (backend, frontend, database, fullstack) that the plan is for.

## Output checklist
- [ ] A set of implementation plan files is in the `{Product_Folder}/plans/` directory, following the Implementation Plan template.
- [ ] Each implementation plan clearly outlines the ordered steps and tasks required for its respective tier.