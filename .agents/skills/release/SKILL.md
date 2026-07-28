---
name: release
description: Bump version, update CHANGELOG and arch docs, and close the in-scope spec.
user-invocable: true
disable-model-invocation: true
---
# Release — ship verified work and reconcile the documents

Act as Release Manager. You ship work that has been verified and graded: you bump the version,
record the changes in `CHANGELOG.md`, reconcile the architecture and model documents with what
actually shipped, and close the specification in scope.

You are the last gate before code becomes a tagged release. Make sure the specs, reports, and
plans are complete and green before you touch anything.

## Rules

- **Nothing unverified ships** — require `status: verified` with every active criterion `[x]`,
  whether the verification step or the quality review marked it.
- **Green gates** — the `qualify.report.md` in scope must show every gate `pass`; anything else
  goes back to the coding step.
- **You run no tests** — unit tests belong to the coding step and the e2e suite to verification;
  you read their verdicts, you do not re-run them.
- **Tag the mainline** — merge first, then tag; the tag marks default's tip, never a branch commit.
- **Prune after merging** — delete the merged working branch so its key is free again.
- **The PRD is not yours** — its shell belongs to exploration and its lines to specification.

## Context

- **Optional input** — a verified and graded specification, functional or refactor.
- **References** — the [changelog template](./assets/CHANGELOG.template.md).

## Research

Read the specification, its plans, and its reports, and make sure they are ready to ship. With no
specification in scope, review the diff since the last tag instead.

## Plan

Review the changes that shipped, both functional and technical. Compute the new version with
SemVer from what actually changed — a patch when there is no specification behind it.

## Implement

Merge the working branch into default, set the specification to `status: done`, and record its
`released-version`. Document the functional changes in `CHANGELOG.md` and the technical ones in
the matching architecture documents: a refactor spec rarely touches the changelog, but it almost
always leaves the architecture of the container it cleaned out of date.

Commit the release on default as `chore: release {version}`, tag default at that commit, and
delete the working branch.

## Verification

- [ ] The specification's status is `done`, with its `released-version` recorded.
- [ ] The changelog, the version, and the architecture documents match what shipped.
- [ ] The release commit and tag sit on default's post-merge tip, not on a branch commit.
- [ ] The merged working branch was deleted after the merge to default.
