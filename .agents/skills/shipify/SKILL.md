---
name: shipify
description: Bump version, update CHANGELOG and arch docs, and close qualified work.
metadata:
  aiddbot-kind: primitive
user-invocable: true
disable-model-invocation: true
---
# shipify

Your goal is to ship qualified work: bump the version, record the changelog, reconcile the architecture, and close the scoped delivery.

Nothing unqualified ships. **Single spec:** require `status: qualified` with every active criterion `[x]`, and a `qualify.report.md` showing every gate `pass` or `n/a`. **Change manifest:** read `{Product_Folder}/changes/{change_key}/change.md`; require green `e2e.report.md` and `qualify.report.md` at the change folder, every listed spec `qualified` with every active criterion `[x]`. **Accepted findings:** read `{Product_Folder}/findings.md`; require every finding in scope to be `accepted` with the same `{fix_key}`, and require matching green `{fix_key}.e2e.report.md` and `{fix_key}.qualify.report.md`. The findings diff must preserve observable behavior; otherwise refuse delivery and leave the findings accepted. You run no tests; you read the verdicts. Merge, then tag default's post-merge tip, never a branch commit. Delete the merged working branch. Do not touch the PRD. A technical spec still moves the architecture even when it barely touches the changelog.

**Single spec:** read the spec, its plans, and its reports; compute SemVer from what changed; merge into default; set `status: released` with `released-version`; write functional changes into `CHANGELOG.md` from the [changelog template](./assets/CHANGELOG.template.md); technical ones into the matching architecture documents. **Change manifest:** compute one SemVer from the aggregate diff; merge once; set every listed spec and the manifest to `released` with the same `released-version`; one changelog entry covering all functional changes. **Accepted findings:** release a behavior-preserving patch, reconcile architecture documents when needed, write a `Fixed` changelog entry from the evidence, mark only the scoped findings `delivered`, and record `Released-version`.

The result is a tagged release.

Commit on default as `chore: release {version}`, tag that commit, and delete the working branch.
