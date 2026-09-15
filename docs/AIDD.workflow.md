# AIDD workflow

AIDDbot has three entrypoints. `/architect-solution-foundation` scaffolds solutions without application or project source code and maps repository architecture. `/build-requested-change` delivers one requested spec. `/craft-lasting-quality` reviews current quality and delivers selected repairs.

When no application or project source code exists, `scaffoldify` selects needed projects, consults the archetype catalog, confirms the selection with the user, and runs the materializer on `chore/scaffold`. Agent configuration and instructions, AIDD product files, harness adapters, and documentation are ignored when checking for source code. Only projects without a suitable or selected archetype receive a minimal scaffold from official tooling or documentation. It commits the scaffold changes and merges into the default branch once all selected scaffolds are complete, with no functional code or additional installation, testing, or documentation tasks. A failed download is reported, not replaced with handwritten code. In every case, `explore` maps the repository and `extract` documents each project.

## Spec delivery

The PRD lists the current requirements in EARS form. The TDR lists open technical debt as one `D{nnnn}` entry per line. Each delivery has one small `S{nnnn}-{slug}` spec folder with `spec.md`, `verification.md`, and `qualification.md`. `counters.yaml` reserves permanent S, F, T, and D IDs.

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

Shipify integrates the approved branch, its code, and its PRD edits together. It removes deprecated requirements only after the required checks pass. It marks the spec shipped and reconciles rules and the TDR where required.

Each spec's reports carry `spec`, `status`, `revision`, `evaluated_commit`, and `updated_at` in frontmatter. Verification is `green` or `red` and records failures. Qualification records findings: `green` means no open findings, `amber` allows minor debt, and `red` blocks delivery. Shipping requires current green verification and green or amber qualification.

Each process permits three automatic evaluations, including the first. A blocking third result stops repairs and returns the reports to the human. Explicit human direction can authorize another three evaluations; the revision counter never resets. Document edits do not count as evaluations.

## Quality review

Craft uses `curate-quality` to read the TDR and qualification evidence. It reads each project's quality configuration and runs the strictest configured lint, complexity analysis, test coverage checks, and other team-configured tools. `quality/review.md` is the dated evidence history for system-wide checks; `TDR.md` is the one-line index of currently open technical debt. The review records commands, results, and threshold violations, distinguishing checks that are not configured from configured checks that could not run. It does not invent tools or thresholds. Confirmed findings promoted to debt link to their detailed qualification or dated review evidence. Repeated observations share one D ID.

For selected repairs, an **Architect** groups one coherent set of current debt entries and expresses it as a natural-language request with its D IDs, without creating delivery artifacts or editing the quality records. `build-requested-change` receives that request and creates the **Architect** that executes `specify`. The resulting ordinary spec records those source IDs. At closure, `shipify` uses `curate-quality` to promote surviving minor findings and remove only TDR entries the shipped repair proves resolved.

## Next

- [Getting started](./getting-started.md)
- [Skills catalog](../.agents/skills/skills.catalog.md)
