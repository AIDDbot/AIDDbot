# AIDD workflow

## Entrypoints

| Need | Command |
| --- | --- |
| Prepare or understand a system | `/architect-system-foundation` |
| Deliver one requested spec | `/build-requested-spec` |
| Review quality and repair debt | `/craft-lasting-quality` |

## Foundation

| Repository | Route | Result |
| --- | --- | --- |
| No application source | `scaffold-system` → `document-system` → `document-project` | Scaffold, dependencies, documentation, rules, and product records |
| Existing application source | `document-system` → `document-project` | Documentation, rules, and missing product records |

Existing product records are preserved. A completed scaffold is merged from `chore/scaffold`.

Foundation documentation records important paths, project boundaries, and product files such as specs, quality records, and counters. A scaffold leaves `.aiddbot/aiddbot.system.json` beside its runner as the system index, initializes the root `package.json` with product name, description, author, and version, and provides root `start` and `test:e2e` delegates when the selected projects expose compatible package scripts. It finishes by installing dependencies and running basic lint only: no tests, warning denial, quality analysis, automatic fixes, or repair. It does not repeat skill routing or commands executed by the models.

## Change delivery

| Stage | Owner | Work |
| --- | --- | --- |
| Define | **Architect** | `define-spec`: scope, branch, spec, PRD proposal, and approval |
| Build | **Builder** | `implement-project` for each affected project: code, unit tests, and any required E2E test changes without E2E execution |
| Prove and ship | **Craftsman** | `verify-acceptance` executes E2E acceptance, then `review-implementation` and `ship-spec` |

Spec state: `draft` → `in-progress` → `verified` → `qualified` → `shipped`.

The PRD owns requirement text. A spec marks each affected requirement as `new`, `changed`, `deprecated`, or `related` and declares its acceptance-test work. Approval is required before implementation unless YOLO mode is active.

Each delivery records high-level events in a human-readable, append-only `journal.log`. Its initial header records the first event's date; event lines begin with the current local time followed by a six-character status: `Info`, `Warn`, or `Error`, padded with spaces for IDE log coloring. Stage, event, project, and revision fields are trimmed, truncated, or right-padded with spaces to six characters, while the final summary stays on one untruncated line. Physical line order is canonical and is never replaced by timestamp sorting.

| Evidence | Passing state | Scope |
| --- | --- | --- |
| Verification | `green` | Acceptance behavior |
| Qualification | `green` or `amber` | Changed-code quality |

`red` returns the findings for repair and both evaluations repeat, up to three revisions. If a current report is still red at revision 3, delivery continues and every unresolved functional or technical failure is recorded in the TDR. Amber findings also enter the TDR. Missing or stale evidence still blocks shipping.

Shipping applies the PRD changes, updates debt, promotes reusable error-prevention lessons into the applicable project rules, and synchronizes one release version across the changelog, spec and tag, the authoritative root `package.json`, and every existing manifest or build file that declares that product version. It does not change dependency, toolchain, schema, API, migration, historical, or independently released component versions. It then integrates the branch.

## Quality review

`craft-lasting-quality` follows:

`inspect-quality` → select coherent debt → `/build-requested-spec`

Commands are classified by their effective behavior, not their script names. During coding, the Builder runs only error-level lint and affected unit tests; it may author E2E tests but does not execute them. The Craftsman executes acceptance tests afterward. Quality review runs configured warning denial, complexity, coverage, strict analysis, full-repository checks, and other hardening.

The latest system evidence replaces `quality/review.md`; open debt remains indexed in `quality/TDR.md`.

See the [skills catalog](../.agents/skills/skills.catalog.md) for the complete inventory and routing.
