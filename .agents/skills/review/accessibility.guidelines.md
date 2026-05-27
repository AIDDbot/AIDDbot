# Accessibility guidelines

Reference for `/review` (Accessibility section of the unified report). Orchestration (scope, report path, git) lives in [review SKILL](./SKILL.md).

## References

- [Unified review report template](./review.report.template.md)

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

### Perceivable

- **Text alternatives**. Every <img> has meaningful alt text. Decorative images use alt="".
- **Color contrast**. Minimum 4.5:1 for normal text, 3:1 for large text (WCAG AA).
- **Don't rely on color alone**. Use icons, patterns, or text alongside color indicators.
- **Captions and transcripts**. Video has captions. Audio has transcripts.

### Operable

- **Keyboard accessible**. All functionality available via keyboard. No keyboard traps.
- **Focus visible**. Clear focus indicators on all interactive elements.
- **Skip links**. Provide "Skip to main content" for keyboard users.
- **Sufficient time**. Users can extend time limits. No auto-advancing content without controls.

### Understandable

- **Page language**. Set lang attribute on <html>.
- **Consistent navigation**. Same navigation structure across pages.
- **Error identification**. Form errors clearly described and associated with fields.
- **Labels and instructions**. All form inputs have associated labels.

### Robust

- **Valid HTML**. No duplicate IDs. Properly nested elements.
- **ARIA used correctly**. Prefer native elements. ARIA roles match behavior.
- **Name, role, value**. Interactive elements have accessible names and correct roles.


## Report output

Findings use the **Accessibility** tables in [review.report.template.md](./review.report.template.md), written to `{Product_Folder}/reports/{slug}.review.report.md` (same `{slug}` as other pipeline artifacts).
