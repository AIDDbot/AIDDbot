# AIDD workflow

AIDDbot has three entrypoints. `/architect-solution-foundation` maps, designs, or prepares a solution. `/build-requested-change` delivers one requested spec. `/craft-lasting-quality` reviews current quality and delivers selected repairs.

## Spec delivery

The PRD lists the current requirements in EARS form. Each delivery has one small `S{nnnn}-{slug}` spec folder with `spec.md`, `verification.md`, and `qualification.md`. `counters.yaml` reserves permanent S, F, T, and Q IDs.

The Architect follows `specify` to formalize the request, propose a solution by container, and update the PRD. If the user requests YOLO or the active mode is YOLO, the proposal is approved. Otherwise, `specify` asks the human and waits before implementation.

The PRD owns durable requirement text. Functional requirements use EARS conditions and observable responses. The spec references those IDs and records their delivery impact:

| Requirement change | PRD edit | Acceptance-test work |
| --- | --- | --- |
| `new` | Add a requirement with a new ID | Create coverage |
| `changed` | Replace the text under the same ID | Update expectations; create missing coverage explicitly |
| `deprecated` | Keep the line until verified shipping, then remove it | Delete obsolete tests/assertions and verify the removal outcome |
| `related` | Preserve the current requirement | Retain and run regression coverage; repair gaps when needed |

The spec links each requirement change to its acceptance test and expected result. Proposed PRD edits live on the spec branch; the default branch remains the shipped product view.

Builders run `codify` for each affected container and for E2E when acceptance tests need work. Codify runs basic lint and unit tests. Verify executes acceptance tests and writes its report. Qualify writes technical quality evidence and records any non-blocking debt. Both reports must be current before shipping.

The Builder applies every declared test action, including deletions. Verify reconciles requirement IDs, the test diff, and executed evidence; a passing suite with missing coverage or an unperformed action blocks delivery.

Shipify integrates the approved branch, its code, and its PRD edits together. It removes deprecated requirements only after the required checks pass. It marks the spec shipped and updates rules and quality findings where required.

## Quality review

Craft reads open quality findings and qualification evidence. It also runs only the tools configured by the project team. Confirmed tool findings link to the quality review. Repeated observations share one finding ID.

Selected repairs use ordinary specs. A shipped repair removes only the findings it proves resolved. The debt specifier may remove invalid, obsolete, or duplicate findings with evidence recorded in Git.

## Next

- [Getting started](./getting-started.md)
- [Skills catalog](../.agents/skills/skills.catalog.md)
