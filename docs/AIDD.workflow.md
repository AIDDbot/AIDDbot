# AIDD Workflow

AIDDbot exposes three entrypoints and uses one adaptive delivery contract.

| Need | Entrypoint | Outcome |
| --- | --- | --- |
| Understand or define architecture | `/architect-solution-foundation` | map, design, or prepare |
| Request product or technical work | `/build-requested-change` | one classified and released change |
| Improve current quality | `/craft-lasting-quality` | one reviewed correction batch |

## Foundation preparation

Technology selection happens one tier at a time, after reading the actual catalog.
For `back`, `front`, `e2e`, and `cli`, the agent offers the catalog archetype and
one alternative verified through official web documentation, with the option to
request another technology or omit the tier. It waits for the user's answer before
moving to the next tier and carries existing explicit choices forward. The final
table records these decisions; it does not replace the individual questions.

When preparing a foundation, `/scaffoldify` determines the required archetypes
for the `back`, `front`, `e2e`, and `cli` tiers selected by `design-solution`,
respecting each tier's chosen language and framework. Catalog defaults do not
restrict those choices: unmatched stacks use current official instructions
researched on the internet. It then materializes the selected tiers
and uses the catalog materializer or official scaffolding tooling per container.
After generation, the agent reconciles the root README, license, and native
manifest, grounding the problem and proposed solution in project context and
authorship in the solution owner's identity. Existing documentation and upstream
attribution are preserved.

This preparation applies only when no application code or scaffold exists.
Both a newly prepared foundation and existing code go through `map-solution`
to establish AIDDbot documentation. Evolution of existing code belongs to
requested delivery, not to foundation design.

## One change contract

Every delivery gets a `change/{change_key}` branch and manifest. A change may reference zero, one, or several specs and optional findings. Specs hold durable behavior or technical policy; the change holds the intervention, workflow, evidence, status, and release.

Classification uses four fields:

- `origin`: `requested` or `craft`
- `kind`: `functional`, `technical`, or `mixed`
- `intent`: `modify` or `fix`
- `complexity`: `simple` or `complex`

The derived stages are fixed by policy:

| Condition | Plan | Verify | Qualify |
| --- | --- | --- | --- |
| Simple | no | by kind/origin | no |
| Fix | no | by kind/origin | if complex |
| Requested technical | by complexity and intent | no | if complex |
| Requested functional or mixed | by complexity and intent | yes | if complex |
| Craft batch | no | yes, once for the batch | if complex |

Simple means one container, at most one durable spec, complete criteria, a known locally reversible solution, and focused automated checks. Architecture, shared contracts, schemas, migrations, dependencies, infrastructure, security, privacy, concurrency, accessibility, performance-sensitive paths, or multiple containers/specs make it complex. Line count does not decide complexity.

When qualification is skipped, implementation records the technical-criterion evidence. A skipped phase produces no green report. Before release, every criterion must have current passing evidence from its assigned owner.

## Requested delivery

`/build-requested-change` classifies the request read-only, reserves its change and optional spec identities, then delegates the complete lifecycle to `deliver-change`. Durable specs pause for validation unless YOLO applies. Simple bounded work may carry its criteria directly in the manifest.

The owner persists the manifest, plans only when required, implements sequentially, runs applicable proof stages, and releases once. Corrections from a human use `intent: fix` and never create a plan.

## Craft delivery

`/craft-lasting-quality` is an autonomous review-and-repair entrypoint. It does not accept human defect evidence, named findings, or human priority. Requested corrections use `/build-requested-change`.

A fresh Craft run executes current quality discovery, normalizes findings, marks stale evidence, groups findings with a shared cause and correction, and selects up to five eligible groups by severity, impact, and bounded scope. Work needing product or unsupported contract decisions stays outside the batch.

The selected findings become one `origin: craft`, `intent: fix` change. It has no plan, one final verification for the entire batch, optional qualification when complex, one integration, one version, and one tag. An interrupted batch resumes its original finding set without adding newly discovered work. No eligible findings means no branch or release.

## Review and repair

`ship-implementation` evaluates only enabled stages. A red report sends correctable defects through planless repair and then repeats classification plus every applicable proof stage for the complete change. A blocked check returns the concrete impediment. Semantic changes invalidate affected evidence.

Once all required evidence is current, the change advances from `in-progress` to `ready`. `/shipify` integrates and marks the change, referenced specs, and referenced findings released together. It can resume an interrupted closure from the recorded release commit without creating another version.

```markdown
pending → in-progress → ready → released
```

## Next

- [Getting started](./getting-started.md)
- [Skills catalog](../.agents/skills/skills.catalog.md)
- [GitHub](https://github.com/AIDDbot/AIDDbot)
