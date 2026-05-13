# {Tier_Name} Conventions — {Product_Name}

## Summary

{One paragraph: tier technology, dominant code style, and key principle (e.g. "immutable models with factory methods" or "standalone components with signals").}

## Artifact Roles

{Repeat one section per artifact role detected. Order: model -> DTO -> enum -> exception -> repository -> service -> controller (backend) or model -> service -> component -> form (frontend). Adapt to the tier.}

### {Role_Name}

**Dominant pattern**: {One sentence describing the structural pattern.}

**Canonical example** (from `{file_name}`):
```{language}
{Real code snippet — the cleanest example of this role from the codebase. Keep it short: 10-25 lines. Trim imports and boilerplate.}
```

**Anti-pattern**:
- {Concrete thing NOT to do — with reason.}

{End of repeated section.}

## Wiring and Dependencies

{If already documented in `{tier}.arch.md`, write: "See `{tier}.arch.md` — Restricciones / Dependencias." Otherwise:}
- {How dependencies are injected: constructor, inject(), @Autowired, etc.}
- {How modules/features reference each other.}

## Error Handling

{If already documented in `{tier}.arch.md`, write: "See `{tier}.arch.md` — Restricciones." Otherwise:}
- {Dominant error handling pattern: domain exceptions, error adapters, try/catch, HTTP error mapping, etc.}

## Known Deviations

- `{file}` — {What differs}. Expected: {What the dominant pattern would be}.

{If no deviations found, write: "No deviations from the dominant pattern were detected."}
