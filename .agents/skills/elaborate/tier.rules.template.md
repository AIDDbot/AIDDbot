---
description: {Tier_Name} coding conventions for {Product_Name}
globs: "{source_glob}"
---
# {Tier_Name} Conventions — {Product_Name}

## Summary

{One paragraph: tier technology, prescribed code style, and key principle (e.g. "immutable models with factory methods" or "standalone components with signals").}

---

## Naming

### Folders
- **Pattern**: {feature-based / layer-based / hybrid}
- **Casing**: {kebab-case / camelCase / snake_case}
- **Examples**: `{example1}`, `{example2}`

### Files
- **{role}**: `{pattern}` — `{example1}`, `{example2}`

### Language Elements
- **Classes / Records / Components**: {PascalCase} — `{example}`
- **Interfaces / Types**: {PascalCase} — `{example}`
- **Methods / Functions**: {camelCase} — `{example}`
- **Variables / Fields**: {camelCase} — `{example}`
- **Constants**: {UPPER_SNAKE / camelCase} — `{example}`
- **Enums / Enum members**: {PascalCase / UPPER_SNAKE} — `{example}`

---

## Artifact Roles

{Repeat one section per artifact role. Order: model → DTO → enum → exception → repository → service → controller (backend) or model → service → component → form (frontend). Adapt to the tier.}

### {Role_Name}

**Dominant pattern**: {One sentence describing the structural pattern.}

**Canonical example** (prescribed):
```{language}
{Illustrative snippet — cleanest example of this role. 10-25 lines. Trim imports and boilerplate.}
```

**Anti-pattern**:
- {Concrete thing NOT to do — with reason.}

---

## Wiring and Dependencies

{If already documented in `{tier}.arch.md`, write: "See `{tier}.arch.md` — {section}." Otherwise document: injection style, how features/modules reference each other.}

## Error Handling

{If already documented in `{tier}.arch.md`, write: "See `{tier}.arch.md` — {section}." Otherwise document: dominant error handling pattern.}

---

## Testing

### Infrastructure
- **Framework**: {test framework + version}
- **Runner**: {command}
- **Placement**: {colocated / separate folder / mirrored structure}
- **File naming**: `{pattern}` (e.g. `*.spec.ts`, `*Test.java`)

### Patterns
- **Setup**: {TestBed / MockMvc / fixtures / beforeEach — prescribed approach}
- **Mocking**: {what to mock and how}
- **Assertions**: {framework and style}

### Canonical Test Example

(prescribed):
```{language}
{Illustrative test snippet — setup + act + assert. 15-30 lines.}
```

### Coverage by Artifact Role

| Role | Tested | Scope |
|------|--------|-------|
| {role} | Yes / No | {happy path / + edge cases / + error cases} |

### What NOT to Test
- {Patterns explicitly not tested and why.}

---

## Known Deviations

No deviations yet — greenfield baseline. Record file-specific exceptions here as the codebase evolves.
