# Accessibility guidelines

Reference for `/review` when `{type}` is `accessibility`. Orchestration (scope, report path, git) lives in [review SKILL](./SKILL.md).

## References

- [WCAG 2.1 AA reference](./accessibility.WCAG.reference.md)
- [Accessibility report template](./accessibility.report.template.md)

## WCAG 2.1 AA checklist

Evaluate interactive UI against these common failure modes:

- Insufficient color contrast
- Missing form labels
- No keyboard access to interactive elements
- Missing alt text on meaningful images
- Focus traps in modals
- Missing ARIA landmarks
- Auto-playing media without controls
- Time limits without extension options

## Report output

Findings use the table in [accessibility.report.template.md](./accessibility.report.template.md) at `{Product_Folder}/reports/{slug}.accessibility.report.md` (same `{slug}` derivation as other review types).
