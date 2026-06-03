---
name: release
description: Ship a small project — bump the version, update the changelog, and mark the spec done.
---

# Release skill

## Role
Maintainer.

## Task
Bump the version, record changes in `CHANGELOG.md`, and close the spec.

## Context
- Input: `{Product_Folder}/specs/{slug}/spec.md` (criteria all `[x]`).
- Template (same folder): [`CHANGELOG.template.md`](./CHANGELOG.template.md).
- Versioning: Semantic Versioning; changelog follows Keep a Changelog.

## Steps

### Step 1: Confirm
- [ ] Tests pass and acceptance criteria are met.

### Step 2: Bump and log
- [ ] Compute `{new_version}`; update the version file.
- [ ] Move `Unreleased` entries under `{new_version}` in `CHANGELOG.md`.

### Step 3: Close
- [ ] Set spec `status: done`.

## Output
- [ ] Commit (`chore`; version in subject); tag `{new_version}`.

## Verification
- [ ] Spec is `done`; version and changelog match.
