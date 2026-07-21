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
Ship verified work: bump the version, finalize `CHANGELOG.md`, reconcile arch docs,
and close the spec when one is in scope.

### Guardrails
- **Nothing unverified ships** — with a spec, `status: verified` and all criteria `[x]`;
  otherwise suite green.
- **PRD boundary** — shell belongs to `/explore`; category lines belong to `/specify`.

## Context

- `{Arch}` = `{Product_Folder}/arch`.
- `{Model}` = `{Product_Folder}/model`.
- `{Rules}` = `{Agents_Folder}/rules`.
- `{Specs}` = `{Product_Folder}/specs/{spec_key}`.

### Inputs
- [ ] Optional: [verified spec, `status: verified`, criteria all `[x]`]({Specs}/spec.md).

## Steps
### 1. Research
- _read_ [repo rules and commands]({Agents_File}).
- _run_ the test suite.
- _if_ a spec is in scope:
  - _read_ [spec, plans, and e2e report]({Specs}/spec.md).
  - _require_ `status: verified` and all criteria `[x]`.
- _else_ _review_ the diff since the last tag.

### 2. Plan
- _compute_ `{new_version}` (SemVer; patch when no spec).
- _read_ [changelog shape](./assets/CHANGELOG.template.md).
- _prepare_ Added / Changed / Fixed / Removed from what shipped.
- _if_ a spec retired criteria this release, _list_ them under `Removed`.
- _note_ arch docs that drifted.

### 3. Implement
- _update_ version files; move `Unreleased` under `{new_version}` in `CHANGELOG.md`.
- _update_ [system architecture]({Arch}/system.arch.md).
- _update_ [model schema]({Model}/model.schema.md).
- _if_ a non-`db` container drifted, _update_ [container arch]({Arch}/{container}.arch.md).
- _if_ the store drifted, _update_ [relational schema]({Model}/db.schema.md).
- _if_ an API drifted, _update_ [API schema]({Model}/api.schema.md).
- _if_ conventions drifted, _update_ [container rules]({Rules}/{container}.rules.md).
- _if_ drift is heavy, _handoff_ to `/explore` or `/extract`.
- _if_ a spec is in scope, _update_ `status: done` and `released-version: {new_version}`.
- _commit_ the changes (`chore: release {new_version}`); tag; merge to default branch.

## Verification
- [ ] Suite green; spec was `verified` and is now `done` when in scope.
- [ ] CHANGELOG, version, and arch docs match what shipped.
