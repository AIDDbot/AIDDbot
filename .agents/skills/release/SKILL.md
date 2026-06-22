---
name: release
description: Bump the version, update CHANGELOG and docs, and mark verified specs as done. Also ships spec-less maintenance patches (defect fixes, structural refactors).
user-invocable: true
disable-model-invocation: true
---

# Release skill

## Role
Release manager.

## Task
Given verified spec(s) — or a spec-less maintenance change — bump the version, record changes in `CHANGELOG.md`, update human docs, and close the spec.

## Context
### Input
- One of:
  - **Feature**: `{Product_Folder}/specs/{slug}/spec.md` (acceptance criteria all `[x]`).
  - **Maintenance** (no spec): a `/modify` defect fix or a structural refactor — patch bump; skip the spec parts of Steps 1 and 4.

### Assets
- [`CHANGELOG.template.md`](./assets/CHANGELOG.template.md).

### Conventions
- Semantic Versioning (`major.minor.patch`); changelog follows Keep a Changelog.

## Steps

### Step 1: Confirm
- [ ] Feature: spec is `in-progress` with criteria passing. Maintenance: the existing e2e suite is green, untouched.
- [ ] Run the test suite to confirm.

### Step 2: Bump and document
- [ ] Compute `{new_version}`; update canonical version files.
- [ ] Move `Unreleased` entries under `{new_version}` in `CHANGELOG.md` (Added/Changed/Fixed/Removed).
- [ ] Update `README.md`/docs when user-facing behavior changed.

### Step 3: Sync arch docs
- [ ] Reconcile architecture docs against the spec, plans, and e2e report (including annotated deviations):
  - `{Product_Folder}/arch/system.arch.md` — containers diagram and table.
  - `{Product_Folder}/arch/ER.md` — domain entities and relationships.
  - Affected `{Product_Folder}/arch/{container}.arch.md` — components, contracts, schemas.
  - `{Agents_Folder}/rules/{container}.rules.md` — only if a convention changed.
  - Root `{Agents_File}` — only if commands or paths changed.
- [ ] Skip when nothing notable changed; for heavy drift, suggest re-running `/extract` (brownfield) on the affected containers instead of hand-patching.

### Step 4: Close (feature only)
- [ ] Set spec `status: done`, `released-version: {new_version}`.
- [ ] If the spec has `amends: {old-slug}`, stamp `superseded-by: {slug}` in the old spec's frontmatter (frontmatter only — never touch its body or criteria).

## Output
- [ ] Commit (`chore`; version in subject); tag `{new_version}`; merge to default branch.

## Verification
- [ ] Spec is `done` (feature) or suite confirmed green (maintenance); CHANGELOG and version are consistent; default branch updated.
- [ ] Arch docs reflect any notable change introduced by this release.
