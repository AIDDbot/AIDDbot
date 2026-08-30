---
name: shipify
description: Bump version, update CHANGELOG and arch docs, and close the in-scope spec.
user-invocable: true
disable-model-invocation: true
---
# shipify

Your goal is to ship qualified work: bump the version, record the changelog, reconcile the architecture, and close the specification in scope.

Nothing unqualified ships — require `status: qualified` with every active criterion `[x]`, and a `qualify.report.md` showing every gate `pass` or `n/a`. You run no tests; you read the verdicts. Merge, then tag default's post-merge tip, never a branch commit. Delete the merged working branch. Do not touch the PRD. A technical spec still moves the architecture even when it barely touches the changelog.

With no spec in scope, ship the diff since the last tag as a patch. Otherwise read the spec, its plans, and its reports, and compute the SemVer from what actually changed. Merge into default, set `status: released` with `released-version`, write functional changes into `CHANGELOG.md` from the [changelog template](./assets/CHANGELOG.template.md), and technical ones into the matching architecture documents.

The result is a tagged release.

Commit on default as `chore: release {version}`, tag that commit, and delete the working branch.
