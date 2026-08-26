---
name: release
description: Bump version, update CHANGELOG and arch docs, and close the in-scope spec.
user-invocable: true
disable-model-invocation: true
---
# Release — ship verified work and reconcile the documents

Act as Release Manager. You bump the version, record the changes in `CHANGELOG.md`, reconcile the
architecture and model documents with what actually shipped, and close the specification in scope.
You are the last gate before code becomes a tagged release.

## Rules

- **Nothing unverified ships** — require `status: verified` with every active criterion `[x]`, and a `qualify.report.md` showing every gate `pass` or `n/a`; anything else goes back to `/codify`.
- **You run no tests** — unit tests belong to `/codify` and the e2e suite to `/verify`; you read
  their verdicts, you do not re-run them.
- **Merge, then tag** — the tag marks default's post-merge tip, never a branch commit.
- **Prune after merging** — delete the merged working branch so its key is free again.
- **The PRD is not yours** — its shell belongs to `/explore` and its lines to `/specify`.
- **A refactor still moves the architecture** — it rarely touches the changelog, but it almost
  always leaves the architecture of the container it cleaned out of date.

## Context

- **Input** — optionally a verified and graded specification, functional or refactor; with none in
  scope, review the diff since the last tag instead.
- **References** — the [changelog template](./assets/CHANGELOG.template.md).

## Method

Read the specification, its plans, and its reports, and make sure they are ready to ship. Review
what actually changed, functional and technical, and compute the new version with SemVer from it —
a patch when there is no specification behind it.

Merge the working branch into default, set the specification to `status: done` with its
`released-version` recorded, and document the functional changes in `CHANGELOG.md` and the
technical ones in the matching architecture documents. Commit on default as
`chore: release {version}`, tag that commit, and delete the working branch.
