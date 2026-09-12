# Finding contract

Use one heading per finding:

```md
## {finding_id} — {short title}

- Status: pending|selected|delivered|rejected|stale
- Source: {report path}
- Scope: {paths, containers, specs, or architecture elements}
- Rule: {violated gate, expected state, or accumulated debt}
- Evidence: {observed facts}
- Contract: {active criterion, valid test, or applicable documented rule when the finding violates approved behavior; omit otherwise}
- Severity: {only when the source supplies it}
- Change: {change_key once selected for a Craft batch}
- Released-version: {version once delivered}
```

One repair group contains findings with the same cause and correction. A Craft change references up to five selected groups. Preserve source reports; mark referenced findings `delivered` and write `Released-version` only after that change is released.
