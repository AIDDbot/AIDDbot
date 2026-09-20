# AIDD workflow

## Entrypoints

| Need | Command |
| --- | --- |
| Prepare or understand a solution | `/architect-solution-foundation` |
| Deliver one change | `/build-requested-change` |
| Review quality and repair debt | `/craft-lasting-quality` |

## Foundation

| Repository | Route | Result |
| --- | --- | --- |
| No application source | `scaffoldify` → `explore` → `extract` | Scaffold, dependencies, documentation, rules, and product records |
| Existing application source | `explore` → `extract` | Documentation, rules, and missing product records |

Existing product records are preserved. A completed scaffold is merged from `chore/scaffold`.

## Change delivery

| Stage | Owner | Work |
| --- | --- | --- |
| Define | **Architect** | `specify`: scope, branch, spec, PRD proposal, and approval |
| Build | **Builder** | `implement-spec`: code and required tests |
| Prove and ship | **Craftsman** | `ship-implementation`: verify, qualify, and release |

Spec state: `draft` → `in-progress` → `verified` → `qualified` → `shipped`.

The PRD owns requirement text. A spec marks each affected requirement as `new`, `changed`, `deprecated`, or `related` and declares its acceptance-test work. Approval is required before implementation unless YOLO mode is active.

| Evidence | Passing state | Scope |
| --- | --- | --- |
| Verification | `green` | Acceptance behavior |
| Qualification | `green` or `amber` | Changed-code quality |

`red` blocks delivery. Amber debt is recorded in the TDR. A third unresolved red report requires human direction.

Shipping applies the PRD changes, updates debt and changelog records, and integrates the branch.

## Quality review

`craft-lasting-quality` follows:

`audit-quality` → select coherent debt → `/build-requested-change`

It runs the strict configured lint, complexity, coverage, and other system-wide checks. Regular change delivery runs only basic lint, unit tests, acceptance tests, and changed-scope review.

The latest system evidence replaces `quality/review.md`; open debt remains indexed in `quality/TDR.md`.

See the [skills catalog](../.agents/skills/skills.catalog.md) for the complete inventory and routing.
