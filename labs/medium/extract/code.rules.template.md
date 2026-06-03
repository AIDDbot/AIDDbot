---
description: Coding conventions for {Product_Name}
globs: "{source_glob}"
---
# Code Conventions — {Product_Name}

## Summary

{One paragraph: dominant code style and the key principle to follow.}

## Naming

| Element | Convention | Example |
|---------|------------|---------|
| Folders / Files | {pattern + casing} | `{example}` |
| Types / Classes | {PascalCase} | `{example}` |
| Functions / Variables | {camelCase} | `{example}` |
| Constants | {UPPER_SNAKE} | `{example}` |

## Artifact roles

| Role | Structural rule (one line) |
|------|----------------------------|
| {role} | {dominant pattern for this role} |

**Canonical example**:

```{language}
{Cleanest representative example — ≤ 20 lines; trim imports/boilerplate.}
```

**Avoid**: {2–4 concrete anti-patterns, each with a one-clause reason.}

## Conventions

- **Wiring**: {how components reference each other.}
- **Errors**: {dominant error-handling rule.}
- **Testing**: {placement + naming (e.g. colocated `*.spec.ts`); what to cover.}
