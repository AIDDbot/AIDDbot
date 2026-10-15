# Features

Deliver one spec at a time. Only one spec is open at a time. Each spec has its own branch.

```mermaid
flowchart LR
    Q[Request] --> S[Spec] --> C[Code] --> V{Verify}
    V -->|red: triage| C
    V -->|green| RV[Review] --> RG{Lint and test}
    RG -->|red| V
    RG -->|green| SH[Ship]
```

The Builder tests only what it changes: fewer tests, and each failure near its cause. The verification tests the full system, so a regression shows at its first revision.

## Definition

The Architect turns one request into one spec.

- A spec has a type: `feat`, `fix`, `refactor` or `chore`.
- A spec has three parts: the problem (user stories, business rules, what is out of context), the solution (a short list of what to do in each project), and the verification (the requirements and the expected URLs and APIs).
- Its requirements are in EARS: `R01`, `R02`, … Other records cite them as `S0042-R03`.
- A spec looks forward. It does not list shipped requirements.
- A spec declares each change to the [schemas](../principles/data.md#schemas) and each endpoint.
- The human approves the spec before the code starts. In YOLO mode, the spec is approved when it is written, and it contains only what the request names. The approval commits the spec.

## Coding

The Builder implements the spec in each project that changes.

- Implement the projects from the lower abstraction to the higher.
- Write a plan before the first edit.
- Write the code and its unit tests. Write the necessary acceptance tests in the `e2e` project.
- Each requirement has at least one acceptance test with its identifier.
- Run `lint` and the unit tests of the changed files during the work. A commit needs a green `lint` on the same files.
- Check the acceptance tests of the spec only. Never run the full suites: that is the work of the Craftsman.

## Verification

The Craftsman proves the work. It is a different agent from the Builder.

- First verify the behavior: run the acceptance tests of the spec. Only one run operates at a time.
- Then review the implementation. A failure of security, accessibility, the project rules (such as the layer boundaries) or the schema impact makes the review red. Data integrity, performance and names are debt checks.
- A red verification goes back to the Builder. Stop only for a product question or for acceptance tests that cannot run.
- A review finding does not block. It becomes debt: `high` when it blocks, `low` for the others. A security finding gets one repair.
- The verification runs the regression: all the unit tests and the full acceptance suite. A failure goes to triage. Find its cause and its owner: the code of the spec or the test goes to the Builder, a contradiction with a shipped requirement or a product question goes to the human. The repair stays in the spec, and the failure counts as a red verification.
- Before the release, run the full `lint` and the full test again: a fix of the linter can change behavior.
- At revision 3, a red verification does not block. Its failures become `high` debt.
- Ship the spec when the verification and the regression are green, or at revision 3. Shipping formats the code, updates the schemas, and releases the next version: a `feat` adds a minor version, any other type a patch, and a breaking change a major version.

Skill: [`/build-requested-spec`](../../.agents/skills/build-requested-spec/SKILL.md).

---

← [Foundation](./foundation.md) · [Engineering](./README.md) · [Future](./future.md) →
