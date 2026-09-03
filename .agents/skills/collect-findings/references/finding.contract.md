# Finding contract

Use one heading per finding:

```md
## {finding_id} — {short title}

- Status: pending|accepted|delivered|rejected|stale
- Source: {report path}
- Scope: {paths, containers, specs, or architecture elements}
- Rule: {violated gate, expected state, or accumulated debt}
- Evidence: {observed facts}
- Severity: {only when the source supplies it}
- Fix: {fix_key once accepted for Craft delivery}
- Released-version: {version once delivered}
```

The findings scope is every `accepted` entry with the same `Fix`. Preserve reports as evidence. Change status to `delivered` and write `Released-version` only after the linked delivery is released.
