---
name: release
description: Bump version, update CHANGELOG and arch docs, and close the in-scope spec.
user-invocable: true
disable-model-invocation: true
---
# Release

## Role
Act as Release Manager.

## Task
Ship verified work: bump the version, finalize `CHANGELOG.md`, reconcile arch docs, and
close the spec when one is in scope.

Boundary: the PRD belongs to `/specify`.

## Guardrails
- **Nothing unverified ships** — with a spec, all criteria `[x]`; otherwise suite green.

## Context

- `{Arch}` = `{Product_Folder}/arch`.
- `{Rules}` = `{Agents_Folder}/rules`.
- `{Specs}` = `{Product_Folder}/specs/{NNN}-{slug}`.

### Inputs
- `Optional:` [verified spec, criteria all `[x]`]({Specs}/spec.md)

## Steps
### 1. Research
- _read_ [repo rules and commands]({Agents_File}).
- Run the test suite.
- _if_ a spec is in scope, _read_ [spec, plans, and e2e report]({Specs}/spec.md); else
  review the diff since the last tag.

### 2. Plan
- Compute `{new_version}` (SemVer; patch when no spec).
- _read_ [changelog shape](./assets/CHANGELOG.template.md).
- Prepare the content for the template's placeholders.
- Draft Added / Changed / Fixed / Removed from what shipped.
- Note arch docs that drifted.

### 3. Implement
- Set version files; move `Unreleased` under `{new_version}` in `CHANGELOG.md`.
- _update_ [system architecture]({Arch}/system.arch.md) and [domain ER diagram]({Arch}/ER.md);
  _if_ affected, _update_ [container arch]({Arch}/{container}.arch.md) and
  [container rules]({Rules}/{container}.rules.md).
- _if_ drift is heavy, _handoff_ to `/extract`.
- _if_ a spec is in scope, set `status: done` and `released-version: {new_version}`.
- Commit (`chore: release {new_version}`); tag `{new_version}`; merge to default branch.

## Verification
- [ ] Suite green; spec `done` when in scope.
- [ ] CHANGELOG, version, and arch docs match what shipped.
