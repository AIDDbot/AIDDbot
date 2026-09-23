# Three human entrypoints characterization

Captured before the public-surface reduction on 2026-09-03.

Historical snapshot: the current ABC entrypoints are listed in the skills catalog.

| Former entrypoint | Observed contract | New owner |
| --- | --- | --- |
| `/map-solution` | Architect explores once and extracts every container | `map-solution` worker under `/establish-solution` |
| `/design-solution` | Architect explores and validates a technical architecture specification | `design-solution` worker under `/establish-solution` |
| `/scaffold-workshop` | Selects catalogued archetypes, installs, smoke-tests, and commits | `scaffold-workshop` worker after greenfield design |
| `/deliver-requirement` | Scopes one specification or a coordinated change and ships it | public facade over `deliver-work` |
| `/clean-solution` | Finds CRAP, coverage, and lint defects and previously fixed them directly | discovery worker producing durable findings |
| `/clean-drift` | Finds qualification-report decay and drift and previously fixed it directly | discovery worker producing durable findings |

The extracted `deliver-work` boundary is exactly the former requirement flow
after receipt of a requirement: `scope-feature`, then `deliver-spec` or
`deliver-change`. This preserves the existing approval, YOLO, branch,
parallelism, retry, verification, qualification, and release behavior.

An empty or documentation-only repository is greenfield. Substantive
application code is brownfield. A partial generated workspace is ambiguous and
requires a material routing decision before scaffold or architecture changes.
Greenfield design validates architecture before catalogued technology choices;
scaffold materializes it on that branch, and mapping reconciles the generated
containers with the design.

`{Product_Folder}/findings.md` is the durable handoff ledger. Each finding
carries an identifier, source, scope, rule or expected state, evidence, optional
source-provided severity, status, and delivery reference. Discovery retains
evidence and never changes application code. Only release closes an accepted
finding as delivered.
