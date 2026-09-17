# AIDD skills catalog

Every executable capability is an Agent Skill. This catalog owns routing.

## Delivery policy

The PRD is the current list of requirements. The TDR at `quality/TDR.md` is the one-line index of open technical debt. A spec owns one small delivery, its proposed PRD edits, and its evidence. `counters.yaml` reserves permanent S, F, T, and D IDs. `explore` initializes all three records from exact empty templates so example entries cannot become product data.

`specify` owns the complete definition transaction: it scopes the request, chooses the delivery type, reserves the branch and IDs, writes the spec and proposed PRD edits together, and obtains approval. The PRD alone owns functional EARS requirement text. Specs reference requirement IDs as `new`, `changed`, `deprecated`, or `related` to create, update, delete, or retain acceptance tests.

Every spec advances from `draft` to `shipped` only with approval and current passing evidence. Missing, pending, failed, blocked, or stale evidence prevents shipping.

`/codify` writes code, basic lint, and unit tests. `/verify` writes acceptance evidence. `/qualify` writes qualification evidence and may record non-blocking quality debt. `/shipify` reconciles that known debt without running quality-discovery tooling; system-wide lint, complexity, coverage, and other configured checks belong to `/craft-lasting-quality`. Each system review replaces `quality/review.md` with the current checks and open review-backed findings; Git retains earlier snapshots.

Each evaluated spec has `verification.md` (`green` or `red`) and `qualification.md` (`green`, `amber`, or `red`), with spec ID, evaluation counter, evaluated commit, and update time. Qualification blocks only on security, accessibility, applicable project restrictions, and explicit technical criteria from the spec. Other evidenced findings are `debt` and amber. Shipping requires current green verification and green or amber qualification. After three evaluations per process, unresolved blockers require human direction; counters persist across resumptions. Verification records failures; qualification records findings.

## Public orchestrators

| Skill | Outcome |
| --- | --- |
| [`/architect-solution-foundation`](./architect-solution-foundation/SKILL.md) | Scaffold when no project source code exists, then map repository architecture |
| [`/build-requested-change`](./build-requested-change/SKILL.md) | Deliver one requested spec |
| [`/craft-lasting-quality`](./craft-lasting-quality/SKILL.md) | Review quality and deliver selected repairs |

## Internal workers

| Skill | Composition |
| --- | --- |
| [`implement-change`](./implement-change/SKILL.md) | Coordinate implementation for one spec |
| [`ship-implementation`](./ship-implementation/SKILL.md) | Refresh evidence and ship one spec |

## Public primitives

| Area | Skills |
| --- | --- |
| Context | [`/explore`](./explore/SKILL.md), [`/extract`](./extract/SKILL.md), [`/scaffoldify`](./scaffoldify/SKILL.md) |
| Capture | [`/specify`](./specify/SKILL.md) |
| Build | [`/codify`](./codify/SKILL.md) |
| Prove | [`/verify`](./verify/SKILL.md), [`/qualify`](./qualify/SKILL.md), [`/curate-quality`](./curate-quality/SKILL.md) |
| Ship | [`/shipify`](./shipify/SKILL.md) |
| Meta | [`/skillify`](./skillify/SKILL.md) |

`/skillify` maintains concise instructional prose for every skill. Composed flows name **Architect**, **Builder**, or **Craftsman** assignments explicitly and invoke backticked skill names through native discovery, which delays loading their instructions until execution reaches them.

## Routing

`scaffoldify` fetches selected catalogued archetypes or creates minimal scaffolds for explicit exceptions on `chore/scaffold`, commits its changes, and merges into the default branch when complete. It adds no functional implementation or follow-up installation, testing, or documentation rewriting.

`/architect-solution-foundation` runs `scaffoldify` whenever no application or project source code exists, ignoring AIDD, agent, harness, and documentation files during that check. It then always runs `explore` for the repository and `extract` for each project. `explore` creates missing `counters.yaml`, `specs/PRD.md`, and `quality/TDR.md` deterministically without replacing existing records. `scaffoldify` owns needs clarification, catalog-based selection, confirmation, and materialization. Requested work enters `/build-requested-change`, which delegates the complete definition transaction to `specify` before implementation. `/craft-lasting-quality` has a **Craftsman** execute `curate-quality`, asks an **Architect** to select one coherent group of TDR entries and express it as an evidence-backed natural-language repair request, then passes that request to `build-requested-change`. At closure, `shipify` directly reconciles known qualification findings and resolved source D IDs with the TDR; it does not execute `curate-quality` or discover additional debt. The receiving flow creates the **Architect** that executes `specify`; the selecting **Architect** does not define the spec or edit the PRD or TDR. Architecture work remains non-release unless executable evolution is requested.
