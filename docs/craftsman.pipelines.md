# Craftsman pipelines

Paths below are under `{Product_Folder}` (default `.product/`).

## Review and repair

Use `/repair` for every row in `/review` or `/verify` reports (no severity tiers — if it is in the report, fix it). Review repairs preserve behavior unless fixing a defect; verify repairs may change behavior to meet acceptance criteria.

After `/repair`: re-run `/verify` when the report type is `verify`; re-run `/review` on the same scope when the report came from `/review` (or run `/verify` if acceptance criteria may have changed).

```mermaid
flowchart TD  
  HUM[HUMAN]
  RPT["reports/{slug}.{type}.report.md"]:::nd
  COD[Source Code]:::nd
  RRV["/review again"]:::nd
  VFY["/verify"]:::nd

  HUM -->|/review or failed /verify| RPT
  RPT -->|/repair| COD
  COD -->|verify report| VFY
  COD -->|review report| RRV

  classDef nd fill:#f8fafc,stroke:#00c4cc,color:#457b9d
```

Git: `AGENTS.md` and [skill-integrations.md](../.agents/skills/repository/skill-integrations.md).

## Release

Requires specs at `status: verified`. Procedure and prerequisites: [`/release` skill](../.agents/skills/release/SKILL.md).

```mermaid
flowchart TD  
  HUM[HUMAN]
  FEAT["feat/{slug}"]:::nd
  MAIN["default branch"]:::nd
  SPC["specs/{slug}.spec.md"]:::nd
  CHL["CHANGELOG.md"]:::nd

  FEAT -->|merge| MAIN
  HUM -->|/release| CHL
  HUM -->|/release| SPC
  
  classDef nd fill:#f8fafc,stroke:#00c4cc,color:#457b9d
```

Blocking checks: unresolved findings in reports for slugs in scope (see `/release` skill).
