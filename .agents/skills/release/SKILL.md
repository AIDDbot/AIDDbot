---
name: Release
description: Bump the version, update CHANGELOG and docs, and mark verified specs as done. Also ships spec-less maintenance patches (defect fixes, structural refactors).
user-invocable: true
disable-model-invocation: true
---
# Release

Bump the version, record changes, sync docs, and close verified specs.

## Role
Act as Release Manager.

## Task
Given a verified spec — or a spec-less maintenance change — bump the version, record changes in `CHANGELOG.md`, update human and architecture docs, and close the spec.

## Context
- CAUTION: This is a listing. Read only when necessary.

### Input
- One of:
  - **Feature**: `{Product_Folder}/specs/{slug}/spec.md` with acceptance criteria all `[x]`.
  - **Maintenance** (no spec): a `/modify` defect fix or a structural refactor — patch bump; skip the spec parts of the steps and output.

### References
- The spec, its `{container}.plan.md` plans, and `e2e.report.md` (including annotated deviations) — what actually shipped.
- Arch docs to reconcile: `{Product_Folder}/arch/system.arch.md`, `ER.md`, affected `{container}.arch.md`, `db.schema.md` / `api.schema.md`, `{Agents_Folder}/rules/{container}.rules.md`, and the root `{Agents_File}`.

### Resources
Templates for output files:
- [`CHANGELOG.template.md`](./assets/CHANGELOG.template.md).

### Glossary
- **SemVer** — `major.minor.patch`; the changelog follows Keep a Changelog.
- **Maintenance patch** — a spec-less `/modify` fix or structural refactor; patch bump with no spec parts.

## Steps
### Step 1: Research
- Confirm readiness: a feature spec is `in-progress` with all criteria passing, or a maintenance e2e suite is green and untouched.
- Run the test suite to confirm; review the spec, plans, and e2e report to see what shipped.

### Step 2: Plan the Content
- Compute `{new_version}` (SemVer) from the change set.
- Read `CHANGELOG.template.md` and draft the entries (Added/Changed/Fixed/Removed).
- Identify which human docs and arch docs drifted and need reconciliation.

## Implementation Output
- Update the canonical version files to `{new_version}`.
- Move `Unreleased` entries under `{new_version}` in `CHANGELOG.md`; update `README.md`/docs when user-facing behavior changed.
- Reconcile the drifted arch docs against the spec, plans, and e2e report; skip what didn't change, and for heavy drift suggest re-running `/extract` (brownfield) on the affected containers instead of hand-patching.
- Feature only: set spec `status: done`, `released-version: {new_version}`; if it has `amends: {old-slug}`, stamp `superseded-by: {slug}` in the old spec's frontmatter (frontmatter only — never its body or criteria).
- Commit (`chore`; version in subject); tag `{new_version}`; merge to the default branch.

## Verification
- [ ] Spec is `done` (feature) or the suite is confirmed green (maintenance); CHANGELOG and version are consistent; the default branch is updated.
- [ ] Arch docs reflect every notable change introduced by this release.
