---
name: release
description: >-
  Bumps the project version, updates CHANGELOG.md and README, and marks specs as released. Use when features are verified and ready to ship. Trigger on phrases like "release this", "ship version", "publish release", or after `/verify` passes for one or more specs.
---

# Release skill

## Role

Act as a release manager preparing a versioned, documented shipment.

## Task

Given one or more verified specifications, bump the project version, record changes in `CHANGELOG.md`, update human-facing docs, set spec status to `done`, and commit with conventional message (`chore`).

## Context

### Input

- A spec: `{Product_Folder}/specs/{slug}.spec.md`

### References

- [Version convention](./version.convention.md)
- [Changelog convention](./changelog.convention.md) 
- [CHANGELOG template](./CHANGELOG.template.md)

### Prerequisites

- Specs at `status: in-progress` (or user override)
- Plans associated with the spec are `done`.

## Steps

### Step 1: Clarify scope
- [ ] Read the spec.
- [ ] If incomplete or ambiguous, ask the minimum questions needed.

### Step 2: Bump version
- [ ] Run every test suite to confirm the features are working.
- [ ] Compute `{new_version}`; update all canonical version files.

### Step 3: Update documentation
- [ ] `README.md` and other version-aware docs when applicable; 
- [ ] `AGENTS.md` when something big changed in the technology stack.
- [ ] `arch/{tier}.arch.md` when something changed in the architecture.
- [ ] `rules/{tier}.rules.md` when something changed in the rules.
- [ ] `rules/naming.rules.md` when something changed in the naming conventions.
- [ ] `rules/testing.rules.md` when something changed in the testing conventions.

### Step 4: Update the project history
- [ ] Update the changelog entry for the new version.
- [ ] Update the spec frontmatter to `status: done` and `released-version: {new_version}`.

## Output
- [ ] Commit with conventional message (`chore`; include version in summary).
- [ ] Create a git tag for the new version.
- [ ] Merge the changes into the default branch.

## Verification
- [ ] Spec is `done`.
- [ ] Repository default branch is updated.