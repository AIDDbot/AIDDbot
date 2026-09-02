---
name: shipify
description: Bump version, update CHANGELOG and arch docs, and close the in-scope spec or change.
user-invocable: true
disable-model-invocation: true
---
# shipify

Your goal is to ship qualified work: bump the version, record the changelog, reconcile the architecture, and close the specification or coordinated change in scope.

Nothing unqualified ships. **Single spec:** require `status: qualified` with every active criterion `[x]`, and a `qualify.report.md` showing every gate `pass` or `n/a`. **Change manifest:** read `{Product_Folder}/changes/{change_key}/change.md`; require green `e2e.report.md` and `qualify.report.md` at the change folder, every listed spec `qualified` with every active criterion `[x]`. You run no tests; you read the verdicts. Merge, then tag default's post-merge tip, never a branch commit. Delete the merged working branch. Do not touch the PRD. A technical spec still moves the architecture even when it barely touches the changelog.

With no spec or manifest in scope, ship the diff since the last tag as a patch. **Single spec:** read the spec, its plans, and its reports; compute SemVer from what changed; merge into default; set `status: released` with `released-version`; write functional changes into `CHANGELOG.md` from the [changelog template](./assets/CHANGELOG.template.md); technical ones into the matching architecture documents. **Change manifest:** compute one SemVer from the aggregate diff; merge once; set every listed spec and the manifest to `released` with the same `released-version`; one changelog entry covering all functional changes.

The result is a tagged release.

Commit on default as `chore: release {version}`, tag that commit, and delete the working branch.
