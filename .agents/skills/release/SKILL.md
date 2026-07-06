---
name: release
description: Bump the version, update CHANGELOG/docs, close verified specs. Also ships spec-less maintenance patches.
user-invocable: true
disable-model-invocation: true
---
# Release

## Role
Act as Release Manager.

## Task
Given a verified spec or a spec-less maintenance change: bump the version, record the
changes in `CHANGELOG.md`, update docs, and close the spec.

## Guardrails
1. **Nothing unverified ships** — feature: all criteria `[x]`; maintenance: suite green.

## Context
- Listing only — read each item when needed.
- `{Arch}` = `{Product_Folder}/arch`; `{Rules}` = `{Agents_Folder}/rules`.
- `{Specs}` = `{Product_Folder}/specs/{slug}`.

### Inputs
- One of:
  - **Feature**: [the verified spec, criteria all `[x]`]({Specs}/spec.md)
  - **Maintenance** (no spec): a spec-less fix or structural refactor — patch bump;
    skip the spec parts of the steps.

### References
- **if feature** _follow_ [the shipped spec, its plans, and e2e report]({Specs}/spec.md)
- **always** _update_ [system architecture]({Arch}/system.arch.md)
- **always** _update_ [domain ER diagram]({Arch}/ER.md)
- **if affected** _update_ [container arch and schemas]({Arch}/{container}.arch.md)
- **if affected** _update_ [container code rules]({Rules}/{container}.rules.md)
- **if feature** _update_ [living feature doc]({Product_Folder}/docs/{feature}.md)
- **always** _follow_ [repo rules and commands]({Agents_File})
- **always** _write-from_ [changelog entry shape](./assets/CHANGELOG.template.md)
- **if first release of the feature** _write-from_
  [feature doc template](./assets/feature.doc.template.md)
- **foreach {mode}** _follow_ [mode guide, what closing requires](./references/{mode}.guide.md)

### Glossary
- **SemVer** — `major.minor.patch`; the changelog follows Keep a Changelog.
- **Feature doc** — `docs/{feature}.md`: current behavior, one statement per line, each
  noting its spec; kept in lockstep with the e2e suite by this skill.

## Steps
### 1. Research
- Identify the entry (feature | maintenance); read and follow its mode guide.
- Run the test suite; review what shipped.

### 2. Plan
- Compute `{new_version}` (SemVer) from the change set.
- Read `CHANGELOG.template.md`; draft the entries (Added/Changed/Fixed/Removed).
- List the human and arch docs that drifted.

### 3. Implement
- Update the canonical version files to `{new_version}`.
- Move `Unreleased` entries under `{new_version}` in `CHANGELOG.md`.
- Feature: merge shipped behavior into `docs/{feature}.md` — rewritten statements log
  under *Changed*, new ones under *Added*.
- Update `README.md`/docs when user-facing behavior changed.
- Reconcile drifted arch docs; heavy drift → re-run `/extract` instead of hand-patching.
- Close per the mode guide (feature: mark the spec `done`; maintenance: none).
- Commit (`chore`, version in subject); tag `{new_version}`; merge to the default branch.

## Verification
- [ ] Spec is `done` (feature), or the suite is confirmed green (maintenance).
- [ ] CHANGELOG and version are consistent; the default branch is updated.
- [ ] Arch docs and the feature doc reflect what shipped.
