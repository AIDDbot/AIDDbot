# AIDD Workflow

```mermaid
flowchart TD
  classDef nd fill:#f8fafc,stroke:#00c4cc,color:#457b9d
  classDef sg fill:#f1f5f9,stroke:#00f2ff,color:#457b9d 

  HUM[HUMAN]

  subgraph P["PRODUCT"]
      SPC["{slug}.spec.md"]:::nd
      PLN["{slug}.{source?}.{tier?}.plan.md"]:::nd
      RPT["{slug}.report.md"]:::nd
  end

  subgraph T["TECHNOLOGY"]
      AGT["AGENTS.md"]:::nd
      SKL["skills/"]:::nd
      RUL["rules/"]:::nd
  end  

  subgraph S["SOLUTION"]
      COD[Source Code]:::nd
      E2E["E2E Tests"]:::nd
  end

  HUM -->|/initialize| AGT
  HUM -->|/specify| SPC
  HUM -->|/planify| PLN
  RPT -->|/planify| PLN
  AGT -.-> SPC  
  SKL & RUL -.-> COD  
  SKL -.-> PLN
  SPC -->|/planify| PLN
  PLN -->|/codify| COD
  COD -->|/verify| E2E
  COD -->|/review| RPT

  class P,T,S sg
```

## Commands

- `/initialize` - Create initial technology documentation (/AGENTS.md and skills/) for a project.

- `/specify` - Create a new specification from a requirement (defines problem, solution, and verification).

- `/planify` - Create a set of implementation plans for a specification or bug-fix (back, front, and data).

- `/codify` - Run the implementation cycle for one specification: generate plans, produce code, and validate with tests.

- `/verify` - Run end-to-end tests to ensure code meets specifications.

- `/review` - Review code for guidelines compliance and best practices.

## Artifacts

### Technology

- `/AGENTS.md` - The entry point for any agent joining the project; defines how agents should operate, including rules, workflows, and artifact conventions.

- `skills/` - Teach your agent how to do things. Make them easy to know when to use.

### Product

- `spec-slug.spec` - A detailed specification (problem, solution, verification) of a feature or technical requirement.

- `spec-slug.tier.plan` - A set of implementation plans derived from a single specification, or bug-fix, defining ordered steps and tasks for each involved tier.

- `slug.report.md` - A report generated during the review process, such as accessibility and compliance reports.
  
### Solution

- `Source Code` - The implementation of the system, including unit tests.

- `E2E Tests` - End-to-end tests that verify the implemented code meets the defined specifications and acceptance criteria.


