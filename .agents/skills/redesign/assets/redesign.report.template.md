---
scope: {container | paths}
run: {ISO date}
---
# redesign report - {scope}

## Opportunities

> One entry per redesign, ordered by impact. All apply via `/codify` ({container}).
> Every entry must preserve the functional behavior the e2e suite asserts.

### D1: {short title}

- Pattern: {ai-aesthetic | magic-value | raw-color | heading-order | non-semantic-control | unlabeled-input | missing-focus | color-only | low-contrast | empty-state | error-state | loading-state | not-responsive | giant-component | ...}
- File: {path}:{line}
- Now: {what falls short of the design system or WCAG}
- Change: {the minimal redesign}
- Preserves behavior: {why the functional flow the e2e suite asserts stays identical}
- Handoff: `/codify` {container}
