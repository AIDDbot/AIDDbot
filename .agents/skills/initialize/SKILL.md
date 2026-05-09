---
name: initialize
description: Initialize the project environment for agents. Define project paths and product and technical overview. Use this skill to generate or update the main agents instructions file.
---

# Initialize the project environment

## Role

Act as a senior software engineer with expertise in setting up development environments for coding agents.

## Task

Define project paths and context for the agent workflow.
Generate or update the main agents instructions file `/AGENTS.md` at the project root.

## Context

- The [Agents Instructions template](./AGENTS.template.md) for the main instructions file.

## Steps

### Step 1: Define environment
- [ ] Ask the user to confirm or set each path individually, one at a time, in the following order:
  - {Agents_Folder}: The folder for agent-related files. Example: './.agents'.
  - {Product_Folder}: The folder for product-related files. Example: './.product'.
  - {Source_Folders}: The array of source code folders. Example: ['/src'] or ['/back', '/front'].
  - {Business_Domain_Language}: The language and documentation language. Example: 'English' or 'Spanish'.

### Step 2: Explore current project state
- [ ] Check if an instructions file like `AGENTS.md` or `CLAUDE.md` already exists at the project root.
- [ ] Read files that may contain relevant information, such as `README.md` and `CHANGELOG.md`.
- [ ] Check whether this is a legacy project with existing code or a new project without code.
- [ ] If this is a brand new project, skip to Step 3.
- [ ] Explore the folder tree and file names for clues about project structure and context.

### Step 3: Define product overview
- [ ] Ask the user, or propose for confirmation:
  - [ ] A brief description of the product.
  - [ ] A short list (5 items max) of key product features.

### Step 4: Define system architecture and technology stack
- [ ] Detect or propose physical tiers (for example: frontend, backend, database).
- [ ] For each tier, define:
  - [ ] Main programming language and version.
  - [ ] Frameworks and libraries used in the project.
  - [ ] Testing, storage, security, and monitoring solutions and strategies.
  - [ ] Development workflow commands for init, build, run, test, lint, and deploy.
  - [ ] Folder structure and naming conventions for source code.
- [ ] Ask the user to confirm or modify the proposed architecture and stack details.

## Output
- [ ] Create or update `AGENTS.md` following the Agents Instructions template.
- [ ] Ensure all placeholders are replaced with actual values.
- [ ] Keep the final `AGENTS.md` under 100 concise sentences.

## Verification

- [ ] `AGENTS.md` is created or updated.
- [ ] Placeholders are set.
- [ ] Product overview is clearly defined.
- [ ] Technical details are defined for each tier.