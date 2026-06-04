---
name: release
description: Ship a small project — bump the version, update the changelog, and mark the spec done.
---

# Release skill

## Role
Maintainer.

## Task
Bump the version, record changes in `CHANGELOG.md`, sync the architecture docs if they drifted, and close the spec.

## Context
- Input: `{Product_Folder}/specs/{slug}/spec.md` (criteria all `[x]`).
- Template (same folder): [`CHANGELOG.template.md`](./CHANGELOG.template.md).
- Arch docs: `system.arch.md` (containers, tech stack, ER) and `AGENTS.md`.
- Versioning: Semantic Versioning; changelog follows Keep a Changelog.

## Steps

### Step 1: Confirm
- [ ] Tests pass and acceptance criteria are met.

### Step 2: Bump and log
- [ ] Compute `{new_version}`; update the version file.
- [ ] Move `Unreleased` entries under `{new_version}` in `CHANGELOG.md`.

### Step 3: Sync arch docs
- [ ] If the feature noticeably changed architecture (new/removed container, tech stack, data model/ER, or workflow paths), update `system.arch.md` (and `AGENTS.md` if needed) to match. 
- Skip if nothing notable changed.

### Step 4: Close
- [ ] Set spec `status: done`.

## Output
- [ ] Commit (`chore`; version in subject); tag `{new_version}`.

## Verification
- [ ] Spec is `done`; version and changelog match.
- [ ] Arch docs reflect any notable change introduced by the release.
