# Design skill documentation

> [!NOTE]
> In your agents do not natively support skills, call them by prefixing with @ or #. Ex `@design` or `#design`. 

## Sample prompt to invoke the skill

### Implement design system

```md
> Use the design skill and the specify skill to write clear specifications for the design system implementation requirements.
> Use the planify skill to create a plan to implement the specifications for the design system.
> Use the codify skill to implement the plan to implement the design system.
```

### Review design system

```md
> Use the review skill to review the design system of the current project, and generate a report at {Product_Folder}/reports/design.quality.report.md.
> Use the repair skill to fix the issues found in the report.
```
