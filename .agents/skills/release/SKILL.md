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
  without a spec, a clean review of the diff since the last tag. Release runs no tests:
  `/codify` owns unit tests, `/verify` owns e2e.
- **Gates green** — a review report in scope must show every gate `pass`; else back to `/codify`.
- **PRD boundary** — shell belongs to `/explore`; category lines belong to `/specify`.
- **Prune on merge** — delete the merged feature branch so its key is free to reuse.
- **Tag the mainline** — merge first; the tag marks default's tip, never a branch commit.

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
- _if_ a spec is in scope:
  - _read_ [spec, plans, and e2e report]({Specs}/spec.md).
  - _require_ `status: verified` and all criteria `[x]`.
- _else_ _review_ the diff since the last tag.
- _if_ a review report is in scope, _read_ [gate report]({Specs}/review.report.md).
- _if_ any gate is not `pass`, _handoff_ to `/codify`.

### 2. Plan
- _compute_ `{new_version}` (SemVer; patch when no spec).
- _read_ [changelog shape](./assets/CHANGELOG.template.md).
- _prepare_ Added / Changed / Fixed / Removed from what shipped.
- _if_ a spec retired criteria this release, _list_ them under `Removed`.
- _note_ arch docs that drifted.

### 3. Implement
- _merge_ the feature branch into default (fast-forward when default has not advanced).
- _update_ version files; move `Unreleased` under `{new_version}` in `CHANGELOG.md`.
- _update_ [system architecture]({Arch}/system.arch.md).
- _update_ [model schema]({Model}/model.schema.md).
- _if_ a non-`db` container drifted, _update_ [container arch]({Arch}/{container}.arch.md).
- _if_ the store drifted, _update_ [relational schema]({Model}/db.schema.md).
- _if_ an API drifted, _update_ [API schema]({Model}/api.schema.md).
- _if_ conventions drifted, _update_ [container rules]({Rules}/{container}.rules.md).
- _if_ drift is heavy, _handoff_ to `/explore` or `/extract`.
- _if_ a spec is in scope, _update_ `status: done` and `released-version: {new_version}`.
- _commit_ the release changes on default (`chore: release {new_version}`).
- _tag_ default at the release commit.
- _delete_ the merged feature branch so its key is free to reuse.

## Verification
- [ ] A spec in scope was `verified`, now `done`; release ran no tests of its own.
- [ ] The review report in scope shows every gate `pass`.
- [ ] CHANGELOG, version, and arch docs match what shipped.
- [ ] The release commit and tag sit on default's post-merge tip, not a branch commit.
- [ ] The merged feature branch was deleted after the merge to default.
