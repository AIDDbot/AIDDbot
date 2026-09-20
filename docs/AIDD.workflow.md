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

Foundation documentation records important paths, project boundaries, and product files such as specs, quality records, and counters. It does not repeat skill routing or commands executed by the models.

## Change delivery

| Stage | Owner | Work |
| --- | --- | --- |
| Define | **Architect** | `define-spec`: scope, branch, spec, PRD proposal, and approval |
| Build | **Builder** | `implement-project` for each affected project: code and required tests |
| Prove and ship | **Craftsman** | `verify-acceptance`, `review-implementation`, and `ship-spec` |

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

`inspect-quality` → select coherent debt → `/build-requested-spec`

Commands are classified by their effective behavior, not their script names. Quality review runs configured warning denial, complexity, coverage, strict analysis, full-repository checks, and other hardening. Regular delivery runs only error-level lint, affected unit tests, acceptance tests, and changed-scope review.

The latest system evidence replaces `quality/review.md`; open debt remains indexed in `quality/TDR.md`.

See the [skills catalog](../.agents/skills/skills.catalog.md) for the complete inventory and routing.
