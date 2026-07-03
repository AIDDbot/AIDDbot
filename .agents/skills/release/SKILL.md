---
name: release
description: Bump the version, update CHANGELOG and docs, and mark verified specs as done. Also ships spec-less maintenance patches (defect fixes, structural refactors).
user-invocable: true
disable-model-invocation: true
---
# Release

## Role
Act as Release Manager.

## Task
Given a verified spec — or a spec-less maintenance change — bump the version, record changes in `CHANGELOG.md`, update human and architecture docs, and close the spec.

## Context
- CAUTION: This is a listing. Read only when necessary.

### Inputs
- One of:
  - **Feature**: `{Product_Folder}/specs/{slug}/spec.md` with acceptance criteria all `[x]`.
  - **Maintenance** (no spec): a `/modify` defect fix or a structural refactor — patch bump; skip the spec parts of the steps and output.

### References
- The spec, its `{container}.plan.md` plans, and `e2e.report.md` (including annotated deviations) (read, if feature) — what actually shipped.
- Arch docs to reconcile (read, always): `{Product_Folder}/arch/system.arch.md`, `ER.md`, affected `{container}.arch.md`, `db.schema.md` / `api.schema.md`, `{Agents_Folder}/rules/{container}.rules.md`, and the root `{Agents_File}`.
- [`CHANGELOG.template.md`](./assets/CHANGELOG.template.md) (write-from, always) — output file template.

Mode guides:
- [`Feature Guide`](./references/feature.guide.md) (if feature) — verified spec; close it after release.
- [`Maintenance Guide`](./references/maintenance.guide.md) (if maintenance) — spec-less patch; no spec to close.

### Glossary
- **SemVer** — `major.minor.patch`; the changelog follows Keep a Changelog.
- **Maintenance patch** — a spec-less `/modify` fix or structural refactor; patch bump with no spec parts.

## Steps
### 1. Research
- Identify the entry (feature spec or spec-less maintenance change), then read and follow the appropriate reference guide to confirm readiness.
- Run the test suite to confirm; review what shipped.

### 2. Plan
- Compute `{new_version}` (SemVer) from the change set.
- Read `CHANGELOG.template.md` and draft the entries (Added/Changed/Fixed/Removed).
- Identify which human docs and arch docs drifted and need reconciliation.

### 3. Implement
- Update the canonical version files to `{new_version}`.
- Move `Unreleased` entries under `{new_version}` in `CHANGELOG.md`; update `README.md`/docs when user-facing behavior changed.
- Reconcile the drifted arch docs against what shipped; skip what didn't change, and for heavy drift suggest re-running `/extract` (brownfield) on the affected containers instead of hand-patching.
- Follow the reference guide's closing step (feature: mark the spec `done`; maintenance: none).
- Commit (`chore`; version in subject); tag `{new_version}`; merge to the default branch.

## Verification
- [ ] Spec is `done` (feature) or the suite is confirmed green (maintenance); CHANGELOG and version are consistent; the default branch is updated.
- [ ] Arch docs reflect every notable change introduced by this release.
