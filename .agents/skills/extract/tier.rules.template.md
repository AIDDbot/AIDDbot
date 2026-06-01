---
description: {Tier_Name} coding conventions for {Product_Name}
globs: "{source_glob}"
---
# {Tier_Name} Conventions — {Product_Name}

## Summary

{One paragraph: tier technology, dominant code style, and key principle (e.g. "immutable models with factory methods" or "standalone components with signals").}

## Naming

| Element | Convention | Example |
|---------|------------|---------|
| Folders | {pattern + casing} | `{example}` |
| Files | {pattern per role} | `{example}` |
| Types / Classes / Components | {PascalCase} | `{example}` |
| Functions / Methods | {camelCase} | `{example}` |
| Variables / Fields | {camelCase} | `{example}` |
| Constants / Enums | {UPPER_SNAKE / PascalCase} | `{example}` |

## Artifact Roles

{One row per role. Order: model → DTO → repository → service → controller (backend) or model → service → component → form (frontend). Adapt to the tier.}

| Role | Structural rule (one line) |
|------|----------------------------|
| {role} | {dominant pattern for this role} |

**Canonical example** — {most representative role}:

```{language}
{Single cleanest example for the tier — real (brownfield, cite the file) or illustrative (greenfield). ≤ 20 lines; trim imports and boilerplate.}
```

**Avoid**: {2-4 concrete anti-patterns, each with a one-clause reason.}

## Conventions

- **Wiring**: {injection style / how features reference each other — or "See `{tier}.arch.md`".}
- **Errors**: {dominant error-handling rule — or "See `{tier}.arch.md`".}

## Testing

- **Placement & naming**: {colocated / mirrored, file pattern (e.g. `*.spec.ts`) — framework + runner live in `{tier}.arch.md`.}
- **Rules**: {dominant setup/mocking style; what to cover and what to skip — one or two lines.}

## Known Deviations

- `{file}` — {what differs}; expected {dominant pattern}.

{If none: "No deviations detected." On greenfield: "No deviations yet — greenfield baseline."}
