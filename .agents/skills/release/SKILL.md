---
name: release
description: Bump version, update CHANGELOG and arch docs, and close the in-scope spec.
user-invocable: true
disable-model-invocation: true
---
# Release — ship verified work and reconcile the documents

Act as Release Manager. You bump the version, record the changes in `CHANGELOG.md`, reconcile the architecture and model documents with what actually shipped, and close the specification in scope.
You are the last gate before code becomes a tagged release.

## Rules

- **Nothing unqualified ships** — require `status: qualified` with every active criterion `[x]`, and a `qualify.report.md` showing every gate `pass` or `n/a`.
- **You run no tests** — you read the verdicts from `/codify` and `/verify`; you do not re-run them.
- **Merge, then tag** — the tag marks default's post-merge tip, never a branch commit.
- **Prune after merging** — delete the merged working branch so its key is free again.
- **The PRD is not yours** — its shell belongs to `/explore` and its lines to `/specify`.
- **A technical spec still moves the architecture** — it rarely touches the changelog, but it almost always leaves the architecture of the container it touched out of date.

## Context

- **Input** — optionally a qualified specification; with none in scope, the diff since the last tag.
- **References** 
  - the [changelog template](./assets/CHANGELOG.template.md),
  - `{Product_Folder}/specs/{spec_key}/qualify.report.md`,
  - `{Product_Folder}/arch/system.arch.md` and the container architecture it points to,
  - `{Product_Folder}/model/model.schema.md`.

## Method

Read the specification, its plans, and its reports.

Review what actually changed, functional and technical, and compute the new version with SemVer from it — a patch when there is no specification behind it.

Merge the working branch into default. Set the specification to `status: released` with its `released-version`. Document the functional changes in `CHANGELOG.md` and the technical ones in the matching architecture documents.

Commit on default as `chore: release {version}`, tag that commit, and delete the working branch.
