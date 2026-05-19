---
name: release
description: >-
  Bumps the project version, updates CHANGELOG.md and README, and marks specs as
  released. Use when features are verified and ready to ship. Trigger on phrases
  like "release this", "ship version", "publish release", or after /verify passes
  for one or more specs.
---

# Release skill

## Role

Act as a release manager preparing a versioned, documented shipment.

## Task

Given one or more verified specifications, bump the project version, record changes in `CHANGELOG.md`, update human-facing docs, set spec status to `released`, and commit via `/repository`.

## Context

### Input

One of the following:

- A spec slug `{slug}` — release that feature only.
- Multiple slugs — release them in one version bump.
- No slug — release every spec with `status: verified` (ask the user to confirm the list).

Optional:

- Bump type: `major` | `minor` | `patch` (default per [version convention](./version.convention.md)).
- Create git tag `v{version}` (only when the user asks or project convention requires it).

### References

- [Spec status lifecycle](../specify/spec-status.md) — frontmatter fields and allowed transitions.
- [Version convention](./version.convention.md) — semver rules and where to bump.
- [Changelog convention](./changelog.convention.md) — `CHANGELOG.md` format and entries.
- [CHANGELOG template](./CHANGELOG.template.md) — bootstrap when missing.
- [Repository skill](../repository/SKILL.md) — commit on default or release branch.

### Prerequisites

- Specs to release have `status: verified` (or user explicitly overrides).
- `/verify` has passed for each slug; no open blocking `{slug}.verify.report.md` unless waived by the user.
- No unresolved blocking review reports for slugs in scope (`{slug}.quality.report.md`, etc.) unless waived by the user.
- Implementation is merged or ready on the default branch (or user confirms releasing from `feat/{slug}`).

## Steps

### Step 1: Clarify scope

- [ ] Identify `{slug}` list from input or scan `{Product_Folder}/specs/*.spec.md` for `status: verified`.
- [ ] If none qualify, report which specs exist and their statuses; stop unless the user overrides.
- [ ] Confirm bump type (`major` | `minor` | `patch`) when ambiguous.
- [ ] Ask whether to create git tag `v{version}` if not stated.

### Step 2: Read current state

- [ ] Read each spec’s frontmatter and acceptance section.
- [ ] Read current version from sources in [version convention](./version.convention.md).
- [ ] Read `CHANGELOG.md` or create from [CHANGELOG.template.md](./CHANGELOG.template.md).
- [ ] Read `README.md` for version strings, feature lists, or “Unreleased” sections to update.

### Step 3: Bump version

- [ ] Compute `{new_version}` from current version and bump type.
- [ ] Update all version sources listed in [version convention](./version.convention.md).

### Step 4: Update CHANGELOG

- [ ] Add `## [{new_version}] - {YYYY-MM-DD}` per [changelog convention](./changelog.convention.md).
- [ ] Move relevant `## [Unreleased]` items into the new section.
- [ ] Add bullets for each released spec (feature name, slug, notable behavior).
- [ ] Include fix-only items when releasing a patch.

### Step 5: Update specifications

For each released `{slug}.spec.md`:

- [ ] Set `status: released`.
- [ ] Set `released-version: {new_version}`.
- [ ] Set `released-at: {YYYY-MM-DD}` (today, ISO format).
- [ ] Follow [spec status lifecycle](../specify/spec-status.md); do not alter spec body unless the user asked.

### Step 6: Update documentation

- [ ] Update `README.md` when it references version, released features, or roadmap items tied to these slugs.
- [ ] Update other user-facing docs only if they explicitly track version or feature state (do not drive-by edit).
- [ ] Do not modify `AGENTS.md` unless the user asked.

### Step 7: Tag and branch (optional)

- [ ] If requested: `git tag -a v{new_version} -m "Release {new_version}"` on the commit that contains the release.
- [ ] If releasing from `feat/{slug}`: suggest merging to the default branch before or after tag; do not merge without user confirmation.

## Output

- [ ] Version bumped in all canonical version files.
- [ ] `CHANGELOG.md` updated with `{new_version}` entry.
- [ ] Each released spec has `status: released` and `released-version` / `released-at` set.
- [ ] `README.md` (and other targeted docs) reflect the release when applicable.

## Verification

- [ ] New version is strictly greater than the previous version (semver).
- [ ] Every spec in scope has `status: released` and matching `released-version`.
- [ ] `CHANGELOG.md` has a dated section for `{new_version}` and an empty or reset `## [Unreleased]`.
- [ ] No spec was released without `verified` status unless the user explicitly waived it.

## Git (required)

- [ ] Read and follow [repository skill](../repository/SKILL.md) per [skill integrations](../repository/skill-integrations.md).
