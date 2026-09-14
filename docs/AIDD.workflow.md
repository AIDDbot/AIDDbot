# AIDD workflow

AIDDbot has three entrypoints. `/architect-solution-foundation` maps, designs, or prepares a solution. `/build-requested-change` delivers one requested spec. `/craft-lasting-quality` reviews current quality and delivers selected repairs.

## Spec delivery

The PRD lists the current requirements in EARS form. Each delivery has one small `S{nnnn}-{slug}` spec folder with `spec.md`, `verification.md`, and `qualification.md`. `counters.yaml` reserves permanent S, F, T, and Q IDs.

The spec records Problem, Solution by container, and Verification. It can add, change, deprecate, or reference requirements. Proposed PRD edits live on its branch. The default branch remains the shipped product view.

Builders run `codify` for each affected container and for E2E when acceptance tests need work. Codify runs basic lint and unit tests. Verify executes acceptance tests and writes its report. Qualify writes technical quality evidence and records any non-blocking debt. Both reports must be current before shipping.

Shipify integrates the approved branch, its code, and its PRD edits together. It removes deprecated requirements only after the required checks pass. It marks the spec shipped and updates rules and quality findings where required.

## Quality review

Craft reads open quality findings and qualification evidence. It also runs only the tools configured by the project team. Confirmed tool findings link to the quality review. Repeated observations share one finding ID.

Selected repairs use ordinary specs. A shipped repair removes only the findings it proves resolved. The debt specifier may remove invalid, obsolete, or duplicate findings with evidence recorded in Git.

## Next

- [Getting started](./getting-started.md)
- [Skills catalog](../.agents/skills/skills.catalog.md)
