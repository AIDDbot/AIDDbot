# Craftsman pipelines

Paths below are under `{Product_Folder}` (default `.product/`).

## Review and repair

Use `/repair` for every row in `/review` or `/verify` reports (no severity tiers — if it is in the report, fix it). Review repairs preserve behavior unless fixing a defect; verify repairs may change behavior to meet acceptance criteria.

```mermaid
flowchart TD  
  HUM[HUMAN]
  RPT["reports/{slug}.{type}.report.md"]:::nd
  COD[Source Code]:::nd
  VFY["/verify"]:::nd

  HUM -->|/review or failed /verify| RPT
  RPT -->|/repair| COD
  COD --> VFY

  classDef nd fill:#f8fafc,stroke:#00c4cc,color:#457b9d
```

Git: [shared/git.md](../.agents/skills/shared/git.md) and [skill-integrations.md](../.agents/skills/repository/skill-integrations.md).

## Release

Requires specs at `status: verified`. Sets `released`, bumps semver, updates `CHANGELOG.md` and targeted docs. **Merge `feat/{slug}` to the default branch** before release unless the user confirms releasing from the feature branch.

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
