# Render skill documentation

> [!NOTE]
> In agents that do not natively support skills, call them by prefixing with `@` or `#` (e.g. `@render`).

## Sample prompt — standalone UI

```md
> Use the render skill with DESIGN.md at {Product_Folder}/design/checkout/DESIGN.md
> Implement the design system and main checkout UI components.
```

## Optional — spec-driven path

When the design work is part of a larger feature, you may run the builder pipeline first:

```md
> /specify the design system requirements
> /planify the specification
> /codify the plan
> /render using the resulting DESIGN.md or design folder
```

## Review design output

```md
> Use the review skill (quality) on the design implementation.
> Report at {Product_Folder}/reports/{slug}.quality.report.md
> Use repair on findings, then re-review if needed.
```
