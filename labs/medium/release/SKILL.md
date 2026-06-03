---
name: release
description: Bump the version, update CHANGELOG and docs, and mark verified specs as done.
---

# Release skill

## Role
Release manager.

## Task
Given verified spec(s), bump the version, record changes in `CHANGELOG.md`, update human docs, and close the spec.

## Context
- Input: `{Product_Folder}/specs/{slug}/spec.md` (acceptance criteria all `[x]`).
- Template (same folder): [`CHANGELOG.template.md`](./CHANGELOG.template.md).
- Versioning: Semantic Versioning (`major.minor.patch`); changelog follows Keep a Changelog.

## Steps

### Step 1: Confirm
- [ ] Spec is `in-progress` with criteria passing; run the test suite to confirm.

### Step 2: Bump and document
- [ ] Compute `{new_version}`; update canonical version files.
- [ ] Move `Unreleased` entries under `{new_version}` in `CHANGELOG.md` (Added/Changed/Fixed/Removed).
- [ ] Update `README.md`/docs when user-facing behavior changed.

### Step 3: Close
- [ ] Set spec `status: done`, `released-version: {new_version}`.

## Output
- [ ] Commit (`chore`; version in subject); tag `{new_version}`; merge to default branch.

## Verification
- [ ] Spec is `done`; CHANGELOG and version are consistent; default branch updated.
