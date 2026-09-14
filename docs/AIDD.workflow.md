# AIDD workflow

AIDDbot has three entrypoints. `/architect-solution-foundation` scaffolds greenfield solutions and maps repository architecture. `/build-requested-change` delivers one requested spec. `/craft-lasting-quality` reviews current quality and delivers selected repairs.

For greenfield solutions, `scaffoldify` selects needed projects, consults the archetype catalog, confirms the selection with the user, and runs the materializer on `chore/scaffold`. Only projects without a suitable or selected archetype receive a minimal scaffold from official tooling or documentation. It commits the scaffold changes and merges into the default branch once all selected scaffolds are complete, with no functional code or additional installation, testing, or documentation tasks. A failed download is reported, not replaced with handwritten code. In every case, `explore` maps the repository and `extract` documents each project.

## Spec delivery

The PRD lists the current requirements in EARS form. Each delivery has one small `S{nnnn}-{slug}` spec folder with `spec.md`, `verification.md`, and `qualification.md`. `counters.yaml` reserves permanent S, F, T, and Q IDs.

The Architect follows `specify` to formalize the request, propose a solution by project, and update the PRD. If the user requests YOLO or the active mode is YOLO, the proposal is approved. Otherwise, `specify` asks the human and waits before implementation.

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

Shipify integrates the approved branch, its code, and its PRD edits together. It removes deprecated requirements only after the required checks pass. It marks the spec shipped and updates rules and quality findings where required.

Each spec's reports carry `spec`, `status`, `revision`, `evaluated_commit`, and `updated_at` in frontmatter. Verification is `green` or `red` and records failures. Qualification records findings: `green` means no open findings, `amber` allows minor debt, and `red` blocks delivery. Shipping requires current green verification and green or amber qualification.

Each process permits three automatic evaluations, including the first. A blocking third result stops repairs and returns the reports to the human. Explicit human direction can authorize another three evaluations; the revision counter never resets. Document edits do not count as evaluations.

## Quality review

Craft reads open quality findings and qualification evidence. It reads each project's quality configuration and runs the strictest configured lint, complexity analysis, test coverage checks, and other team-configured tools. The review records commands, results, and threshold violations, distinguishing checks that are not configured from configured checks that could not run. It does not invent tools or thresholds. Confirmed tool findings link to the quality review. Repeated observations share one finding ID.

Selected repairs use ordinary specs. A shipped repair removes only the findings it proves resolved. The debt specifier may remove invalid, obsolete, or duplicate findings with evidence recorded in Git.

## Next

- [Getting started](./getting-started.md)
- [Skills catalog](../.agents/skills/skills.catalog.md)
