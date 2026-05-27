# Performance guidelines

Reference for `/review` (Performance section of the unified report). Orchestration and report path: [review SKILL](./SKILL.md).

## Checklist

- [ ] No N+1 queries
- [ ] Database queries indexed where needed
- [ ] Large lists paginated or streamed
- [ ] Expensive operations cached when appropriate
- [ ] No blocking I/O in hot paths
