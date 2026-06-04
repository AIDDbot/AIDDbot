---
name: release
description: Ship a small change by bumping the version, updating the changelog, and marking the spec done.
---

# Release skill

## Role
Release manager.

## Task
Bump the version, record changes, sync the architecture docs if they drifted, and close the spec.

## Context
### Input
- `{Product_Folder}/specs/{slug}/spec.md` (criteria all `[x]`).
### References
- `CHANGELOG.template.md`.
- `{Product_Folder}/system.arch.md` (run `/establish` if missing).

## Steps

### Step 1: Confirm
- [ ] Tests pass and acceptance criteria are met.

### Step 2: Bump and log
- [ ] Compute `{new_version}`; update the version file.
- [ ] Move `Unreleased` entries under `{new_version}` in `CHANGELOG.md`.

### Step 3: Sync arch docs
- [ ] If the feature noticeably changed architecture (containers, tech stack, data models/ER, or workflow paths), 
  - Update `system.arch.md` (and `AGENTS.md` if needed) to match. 
  - Skip if nothing notable changed.

### Step 4: Close
- [ ] Set spec `status: done`.

## Output
- [ ] Commit (`chore`; version in subject).
- [ ] Tag `{new_version}`.

## Verification
- [ ] Spec is `done`; version and changelog match.
- [ ] Arch docs reflect any notable change introduced by the release.
