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

- Spec slug(s), or none (release all `status: verified` — confirm list with user)
- Optional: bump `major` | `minor` | `patch`; git tag `v{version}` when requested

### References

- `AGENTS.md` — paths
- [spec-status.md](../specify/spec-status.md) — `released` and release frontmatter (only `/release` sets them)
- [Version convention](./version.convention.md)
- [Changelog convention](./changelog.convention.md) · [CHANGELOG template](./CHANGELOG.template.md)

### Prerequisites

- Specs at `status: verified` (or user override)
- No **unresolved** findings in `reports/{slug}.*.report.md` for slugs in scope (rows not marked `resolved` or `skipped`; waived reports may remain on disk)
- Prefer merge `feat/{slug}` to default branch before release (confirm if releasing from feature branch)

## Steps

### Step 1: Clarify scope
- [ ] Resolve `{slug}` list; confirm bump type and tag if ambiguous.

### Step 2: Read current state
- [ ] Specs, version sources ([version convention](./version.convention.md)), `CHANGELOG.md`, `README.md`.

### Step 3: Bump version
- [ ] Compute `{new_version}`; update all canonical version files.

### Step 4: Update CHANGELOG
- [ ] New `## [{new_version}] - {YYYY-MM-DD}` per [changelog convention](./changelog.convention.md).

### Step 5: Update specifications
- [ ] Per released spec (YAML only) per [spec-status.md](../specify/spec-status.md): `status: released`, `released-version`, `released-at`.

### Step 6: Update documentation
- [ ] `README.md` and other version-aware docs when applicable; do not edit `AGENTS.md` unless asked.

### Step 7: Tag and branch (optional)
- [ ] Tag or merge only with user confirmation.

## Output

- [ ] Version bumped; `CHANGELOG.md` updated; released specs marked; docs updated when applicable.

## Verification

- [ ] Semver increased; each released spec has matching `released-version`; `CHANGELOG` has dated section.

## Git
- [ ] Follow [shared/git.md](../shared/git.md) for `/release`.
