# Version convention

AIDD releases use [Semantic Versioning](https://semver.org/): `MAJOR.MINOR.PATCH`.

## Bump rules

| Bump | When |
|------|------|
| **MAJOR** | Breaking API or behavior changes |
| **MINOR** | New backward-compatible features (default for `/release` of specs) |
| **PATCH** | Backward-compatible bug fixes only |

If the user does not specify, default to **MINOR** when releasing one or more new features; use **PATCH** for fix-only releases.

## Where to read and write the version

Detect the canonical version from the project (first match wins):

1. Path documented in `AGENTS.md` under development workflow or environment.
2. `package.json` → `"version"`
3. `pyproject.toml` → `[project].version`
4. `Cargo.toml` → `[package].version`
5. `VERSION` or `version.txt` at the repository root

Update **every** file that exposes the same product version (e.g. `package.json` and a root `VERSION` file if both exist).

## Git tags

After bumping and committing:

- Create an annotated tag: `git tag -a v{version} -m "Release {version}"`
- Only when the user asks to publish or the project routinely tags releases.
- Never force-update an existing tag without explicit user approval.

## Pre-release identifiers

Use only when the user requests (e.g. `1.4.0-beta.1`). Do not add pre-release suffixes by default.
