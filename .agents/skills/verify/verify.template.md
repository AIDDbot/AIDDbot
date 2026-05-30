---
slug: {slug}
verified-on: {date}
status: pending | pass | fail
---
# Verification report — {short description}

> E2E verification for [`spec.md`](./spec.md). Acceptance state lives in the spec; this report is the run summary and the rectify guide.

## Summary

- **Status:** {pending | pass | fail}
- **Criteria:** {passed}/{total} passing
- **Suite:** {test files or feature groups executed}
- **Environment:** {commands to start servers/apps and run the tests}

## Coverage

| Acceptance criterion | Test(s) | Result |
|----------------------|---------|--------|
| {criterion from spec} | {test name} | pass / fail |

## Rectify guide

> Only present when `status: fail`. Each entry tells `/rectify` how to resolve a failure. Remove or trim entries as they are fixed.

### {failing test name}

- **Violated criterion:** {acceptance criterion from spec.md}
- **Expected:** {expected behavior}
- **Actual:** {observed behavior}
- **Suggested fix:** {targeted, minimal change and the likely file(s)}
- **Evidence:** {links to screenshots, traces, tester reports, logs}
