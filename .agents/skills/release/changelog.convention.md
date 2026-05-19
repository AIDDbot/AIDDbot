# Changelog convention

Follow [Keep a Changelog](https://keepachangelog.com/) for `CHANGELOG.md` at the repository root.

## Structure

```markdown
# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/),
and this project adheres to [Semantic Versioning](https://semver.org/).

## [Unreleased]

### Added
### Changed
### Fixed
### Removed

## [1.4.0] - 2026-05-19

### Added
- Feature title from spec slug (link to `.product/specs/{slug}.spec.md` when helpful)

## [1.3.0] - 2026-04-01
...
```

## Writing a release entry

1. Move items from `## [Unreleased]` into a new `## [{version}] - {YYYY-MM-DD}` section.
2. Group bullets under `Added`, `Changed`, `Fixed`, `Removed` as appropriate.
3. Derive bullets from:
   - Specs being released (title from spec H1, slug in parentheses).
   - Conventional commits since the previous release tag or the last `CHANGELOG` version heading.
4. Write for humans: what changed and why it matters, not a raw commit dump.
5. Leave `## [Unreleased]` empty (or with placeholder subsections) after the release.

## New projects

If `CHANGELOG.md` does not exist, create it using [CHANGELOG.template.md](./CHANGELOG.template.md).
