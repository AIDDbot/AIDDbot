---
scope: {container | paths}
run: {ISO date}
---
# refactor report - {scope}

## Opportunities

> One entry per refactor, ordered by impact. All apply via `/codify` ({container}).
> Every entry must preserve behavior exactly.

### R1: {short title}

- Pattern: {deep-nesting | long-function | nested-ternary | flag-param | generic-name | duplication | dead-code | needless-wrapper | over-engineering | ...}
- File: {path}:{line}
- Now: {what makes it harder to read than it should be}
- Change: {the minimal refactor}
- Preserves behavior: {why inputs, outputs, side effects, and errors stay identical}
- Handoff: `/codify` {container}
