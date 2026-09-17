# AIDD workflow

AIDDbot has three entrypoints. `/architect-solution-foundation` scaffolds solutions without application or project source code and maps repository architecture. `/build-requested-change` delivers one requested spec. `/craft-lasting-quality` reviews current quality and delivers selected repairs.

When no application or project source code exists, `scaffoldify` selects needed projects, consults the archetype catalog, confirms the selection with the user, and runs the materializer on `chore/scaffold`. Agent configuration and instructions, AIDD product files, harness adapters, and documentation are ignored when checking for source code. Only projects without a suitable or selected archetype receive a minimal scaffold from official tooling or documentation. It commits the scaffold changes and merges into the default branch once all selected scaffolds are complete, with no functional code or additional installation, testing, or documentation tasks. A failed download is reported, not replaced with handwritten code. In every case, `explore` maps the repository and `extract` documents each project.

## Spec delivery

During foundation setup, `explore` creates missing `counters.yaml`, `specs/PRD.md`, and `quality/TDR.md` from exact empty templates without replacing existing documents. The PRD then lists the current requirements in EARS form. The TDR lists open technical debt as one `D{nnnn}` entry per line. Each delivery has one small `S{nnnn}-{slug}` spec folder with `spec.md`, `verification.md`, and `qualification.md`. `counters.yaml` reserves permanent S, F, T, and D IDs.

The Architect follows `specify`, which owns the complete definition transaction. It scopes the natural-language request, chooses the delivery type, reserves the branch and IDs, proposes a solution by project, writes the spec and proposed PRD edits together, and obtains approval. Requirement text exists only in the PRD; the spec references its IDs and records their delivery and verification impact. If the user requests YOLO or the active mode is YOLO, the proposal is approved. Otherwise, `specify` asks the human and waits before implementation.

The PRD owns durable requirement text. Functional requirements use EARS conditions and observable responses. The spec references those IDs and records their delivery impact:

| Requirement change | PRD edit | Acceptance-test work |
| --- | --- | --- |
| `new` | Add a requirement with a new ID | Create coverage |
| `changed` | Replace the text under the same ID | Update expectations; create missing coverage explicitly |
| `deprecated` | Keep the line until verified shipping, then remove it | Delete obsolete tests/assertions and verify the removal outcome |
| `related` | Preserve the current requirement | Retain and run regression coverage; repair gaps when needed |

The spec links each requirement change to its acceptance test and expected result. Proposed PRD edits live on the spec branch; the default branch remains the shipped product view.

Builders run `codify` for each affected project and for E2E when acceptance tests need work. Codify runs basic lint and unit tests. Verify executes acceptance tests and writes its report. Qualify writes technical quality evidence and records any non-blocking debt. Both reports must be current before shipping.

The Builder applies every declared test action, including deletions. Verify reconciles requirement IDs, the test diff, and executed evidence; a passing suite with missing coverage or an unperformed action blocks delivery.

Shipify integrates the approved code and PRD when evidence passes. It records qualification findings classified as `debt` in the TDR but does not run strict lint, complexity, coverage, or other quality-discovery tools. See [`shipify`](../.agents/skills/shipify/SKILL.md) for its exact contract.

Each spec's reports carry `spec`, `status`, `revision`, `evaluated_commit`, and `updated_at` in frontmatter. Verification is `green` or `red` and records failures. Qualification blocks only on security, accessibility, applicable project restrictions, and explicit technical criteria from the spec. `Green` means no findings, `amber` contains only `debt`, and `red` contains a `blocking` gate failure. Shipping requires current green verification and green or amber qualification.

Each process permits three automatic evaluations, including the first. A blocking third result stops repairs and returns the reports to the human. Explicit human direction can authorize another three evaluations; the revision counter never resets. Document edits do not count as evaluations.

## Quality review

`craft-lasting-quality` is the only normal flow that runs strict configured lint, complexity, coverage, and other quality tools. Each run replaces `quality/review.md` with a current snapshot only after all checks finish, while Git retains its history. Open review-backed debts remain in that snapshot as confirmed or not revalidated. The flow updates the TDR and sends one coherent debt repair through the ordinary spec flow. See [`craft-lasting-quality`](../.agents/skills/craft-lasting-quality/SKILL.md) and [`curate-quality`](../.agents/skills/curate-quality/SKILL.md) for their exact contracts.

## Next

- [Getting started](./getting-started.md)
- [Skills catalog](../.agents/skills/skills.catalog.md)
