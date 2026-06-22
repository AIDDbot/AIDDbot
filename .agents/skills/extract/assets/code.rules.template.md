---
description: Code rules for the {container} container of {Product_Name}
paths: "{source_glob}"
---
# {Container_Name} code rules — {Product_Name}

## Summary

{One paragraph: dominant code style and the one principle that matters most in this container.}

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

## Canonical example

> The cleanest representative unit for this container — copy its shape.

```{language}
{≤ 25 lines; trim imports/boilerplate.}
```

## Conventions

- **Wiring**: {how components reference each other / dependency injection.}
- **Errors**: {dominant error-handling rule.}
- **Testing**: {placement + naming (e.g. colocated `*.spec.ts`); what to cover.}
- **Avoid**: {2–4 concrete anti-patterns, each with a one-clause reason.}

---

> last updated: {DateTime}