# Security guidelines

Reference for `/review` (Security section of the unified report). Orchestration and report path: [review SKILL](./SKILL.md).

## Checklist

- [ ] User input validated and sanitized
- [ ] SQL queries use parameterization
- [ ] Authentication and authorization checked on protected paths and actions
- [ ] Secrets not hardcoded
- [ ] Error messages do not leak sensitive information
