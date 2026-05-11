# WCAG 2.1 AA Quick Reference

## Perceivable

- **Text alternatives**. Every <img> has meaningful alt text. Decorative images use alt="".
- **Color contrast**. Minimum 4.5:1 for normal text, 3:1 for large text (WCAG AA).
- **Don't rely on color alone**. Use icons, patterns, or text alongside color indicators.
- **Captions and transcripts**. Video has captions. Audio has transcripts.

## Operable

- **Keyboard accessible**. All functionality available via keyboard. No keyboard traps.
- **Focus visible**. Clear focus indicators on all interactive elements.
- **Skip links**. Provide "Skip to main content" for keyboard users.
- **Sufficient time**. Users can extend time limits. No auto-advancing content without controls.

## Understandable

- **Page language**. Set lang attribute on <html>.
- **Consistent navigation**. Same navigation structure across pages.
- **Error identification**. Form errors clearly described and associated with fields.
- **Labels and instructions**. All form inputs have associated labels.

## Robust

- **Valid HTML**. No duplicate IDs. Properly nested elements.
- **ARIA used correctly**. Prefer native elements. ARIA roles match behavior.
- **Name, role, value**. Interactive elements have accessible names and correct roles.