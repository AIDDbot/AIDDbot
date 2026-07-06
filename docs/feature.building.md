# Building a feature

From idea to release in six steps. One skill per step, one artifact per step, one
question at each gate. The [full picture](./AIDD.diagrams.md) has the details — this is
the happy path.

```mermaid
flowchart TD
  classDef sk fill:#f8fafc,stroke:#00c4cc,color:#457b9d
  classDef ar fill:#f8fafc,stroke:#cbd5e1,color:#94a3b8

  S1["1 · /specify — the what"]:::sk
  S2["2 · /planify — the how"]:::sk
  S3["3 · /codify — build it<br/>once per container, e2e too"]:::sk
  S4["4 · /verify — prove it"]:::sk
  S5["5 · /review — polish it"]:::sk
  S6["6 · /release — ship it"]:::sk

  S1 --> S2 --> S3 --> S4 --> S5 --> S6

  S1 -.-> A1["spec.md<br/>problem + acceptance criteria"]:::ar
  S2 -.-> A2["one plan per container<br/>+ e2e.plan.md"]:::ar
  S3 -.-> A3["code + unit tests<br/>+ e2e suite"]:::ar
  S4 -.-> A4["e2e.report.md<br/>green, or defects + handoffs"]:::ar
  S5 -.-> A5["review.report.md"]:::ar
  S6 -.-> A6["CHANGELOG + tag<br/>docs/{feature}.md updated"]:::ar
```

1. **`/specify`** — a one-page ticket: the problem, expected results per container, and
   testable acceptance criteria. No technology, no steps.
2. **`/planify`** — one plan per affected container, grounded in the architecture docs.
   The e2e plan maps one test scenario to each acceptance criterion.
3. **`/codify`** — one run per plan; sessions can run in parallel. The e2e suite is
   built like any other container (its tests stay red until the features land — that's
   expected).
4. **`/verify`** — runs the suite and reports. It never fixes: defects go back to
   `/codify`, each with a handoff.
5. **`/review`** — audits the scope (a11y, security, performance, clean code) and
   reports findings.
6. **`/release`** — bumps the version, updates the changelog and the feature doc,
   closes the spec.

## When the suite is red

Verify reports, codify fixes, verify re-runs — until green.

```mermaid
flowchart LR
  classDef sk fill:#f8fafc,stroke:#00c4cc,color:#457b9d

  COD["/codify fixes"]:::sk --> VER["/verify runs"]:::sk
  VER -->|defects reported| COD
  VER -->|green| ON["→ /review → /release"]:::sk
```

## The prompts, end to end

```markdown
/specify riders can rate a trip 1 to 5 stars
/planify the specification
/codify the api plan
/codify the web plan
/codify the e2e plan
/verify the feature
/codify the e2e report          (only if defects)
/verify the feature             (until green)
/review the feature branch
/release
```
