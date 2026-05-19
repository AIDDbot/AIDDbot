# Spec status lifecycle

Every `{Product_Folder}/specs/{slug}.spec.md` file carries `status` in YAML frontmatter. Skills update it as work progresses; only `/release` sets `released`.

## Frontmatter fields

```yaml
---
spec-slug: {slug}
status: draft
released-version:
released-at:
---
```

| Field | Set by | Description |
|-------|--------|-------------|
| `spec-slug` | `/specify` | Short identifier; must match filename `{slug}` |
| `status` | Multiple skills | Current lifecycle state (see below) |
| `released-version` | `/release` | Semver when shipped, e.g. `1.4.0` |
| `released-at` | `/release` | ISO date `YYYY-MM-DD` when shipped |

Leave `released-version` and `released-at` empty until `/release`.

## Status values

| Status | Meaning | Set by |
|--------|---------|--------|
| `draft` | Spec written; not yet planned | `/specify` |
| `planned` | Implementation plan(s) exist | `/planify` |
| `in-progress` | Code implementation underway | `/codify` |
| `verified` | E2E tests pass for acceptance criteria | `/verify` |
| `released` | Shipped in a versioned release | `/release` |
| `cancelled` | Will not be implemented | Human or agent when scope is dropped |

## Transitions

```mermaid
stateDiagram-v2
  [*] --> draft: specify
  draft --> planned: planify
  planned --> in-progress: codify
  in-progress --> verified: verify (pass)
  in-progress --> in-progress: repair + verify
  verified --> released: release
  draft --> cancelled
  planned --> cancelled
  verified --> cancelled
```

- Do not set `released` without a successful `/verify` unless the user explicitly overrides.
- Do not regress `released` specs to earlier statuses without user confirmation.

## Updating frontmatter

Preserve all body content. Only change YAML keys. Example after verify:

```yaml
status: verified
```

Example after release:

```yaml
status: released
released-version: 1.4.0
released-at: 2026-05-19
```
