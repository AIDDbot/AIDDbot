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
- **Nothing unverified ships** — feature: all criteria `[x]`; maintenance: suite green.

## Context

- `{Arch}` = `{Product_Folder}/arch`; `{Rules}` = `{Agents_Folder}/rules`.
- `{Specs}` = `{Product_Folder}/specs/{slug}`.

### Inputs
- One of:
  - **Feature**: [the verified spec, criteria all `[x]`]({Specs}/spec.md)
  - **Maintenance** (no spec): a spec-less fix or structural refactor — patch bump;
    skip the spec parts of the steps.

### References
- _read_ [repo rules and commands]({Agents_File})

### Glossary
- **SemVer** — `major.minor.patch`; the changelog follows Keep a Changelog.
- **Feature doc** — `docs/{feature}.md`: current behavior, one statement per line, each
  noting its spec; kept in lockstep with the e2e suite by this skill.

## Steps
### 1. Research
- Identify the entry (feature | maintenance).
- _read_ [the mode guide, what closing requires](./references/{mode}.guide.md).
- If feature, _read_ [the shipped spec, its plans, and e2e report]({Specs}/spec.md).
- Run the test suite; review what shipped.

### 2. Plan
- Compute `{new_version}` (SemVer) from the change set.
- _read_ [changelog entry shape](./assets/CHANGELOG.template.md).
- Draft the entries (Added/Changed/Fixed/Removed).
- List the human and arch docs that drifted.

### 3. Implement
- Update the canonical version files to `{new_version}`.
- Move `Unreleased` entries under `{new_version}` in `CHANGELOG.md`.
- If feature, _update_ [the living feature doc]({Product_Folder}/docs/{feature}.md) — merge
  shipped behavior; rewritten statements log under *Changed*, new ones under *Added*.
- If first release, _read_ [feature doc template](./assets/feature.doc.template.md)
  and write the feature doc from it.
- If user-facing behavior changed, update `README.md` and docs.
- _update_ [system architecture]({Arch}/system.arch.md) and [domain ER diagram]({Arch}/ER.md);
  if affected, _update_ [container arch and schemas]({Arch}/{container}.arch.md) and
  [container code rules]({Rules}/{container}.rules.md).
- If drift is heavy, → `/extract` instead of hand-patching the arch docs.
- Close per the mode guide (feature: mark the spec `done`; maintenance: none).
- Commit (`chore: release {new_version}`); tag `{new_version}`; merge to the default branch.

## Verification
- [ ] Spec is `done` (feature), or the suite is confirmed green (maintenance).
- [ ] CHANGELOG and version are consistent; the default branch is updated.
- [ ] Arch docs and the feature doc reflect what shipped.
