# Finding contract

Use one heading per finding:

```md
## {finding_id} — {short title}

- Status: pending|accepted|delivered|rejected|stale
- Source: {report path or human proposal}
- Scope: {paths, containers, specs, or architecture elements}
- Rule: {violated gate, expected state, or proposal}
- Evidence: {observed facts}
- Severity: {only when the source supplies it}
- Delivery: {spec key or change key when accepted}
```

Preserve reports as evidence. Change status to `delivered` only after the linked delivery is released.
