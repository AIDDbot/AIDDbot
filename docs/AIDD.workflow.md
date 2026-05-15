# AIDD Workflow

```mermaid
flowchart TD
  classDef nd fill:#f8fafc,stroke:#00c4cc,color:#457b9d
  classDef sg fill:#f1f5f9,stroke:#00f2ff,color:#457b9d 

  HUM[HUMAN]

  subgraph P["PRODUCT"]
      SPC["specs/"]:::nd
      PLN["plans/"]:::nd
      RPT["reports/"]:::nd
      ARC["arch/"]:::nd
      RUL["rules/"]:::nd
  end

  subgraph A["AGENTS"]
      AGT["AGENTS.md"]:::nd
      SKL["skills/"]:::nd
  end  

  subgraph S["SOLUTION"]
      COD[Source Code]:::nd
      E2E["E2E Tests"]:::nd
  end

  HUM -->|/initialize| AGT
  HUM -->|/explore| ARC
  HUM -->|/extract| RUL
  HUM -->|/specify| SPC
  RPT -->|/planify| PLN
  AGT -.-> SPC  
  AGT -.-> ARC
  RUL -.-> COD  
  SPC -->|/planify| PLN
  ARC -.-> PLN

  PLN -->|/codify| COD
  COD -->|/verify| E2E
  COD -->|/review| RPT
  E2E -.-> RPT 

  class P,A,S sg
```

## Commands

- `/initialize` - Create initial technology documentation (AGENTS.md and skills/) for a project.

- `/explore` - Reverse-engineer an existing codebase to discover its architecture and infer the ADRs. 

- `/extract` - Extract coding rules from an existing codebase.

- `/specify` - Create a new specification from a requirement (defines problem, solution, and verification).

- `/planify` - Create a set of implementation plans for a specification or bug-fix (back, front, and data).

- `/codify` - Writes the code and unit tests following a plan, or a minor requirement.

- `/verify` - Run end-to-end tests to ensure code meets specifications.

- `/review` - Review code for guideline compliance and best practices.

## Artifacts

### Technology

- `AGENTS.md` - The entry point for any agent joining the project, with product and technology information.

- `skills/` - Teach your agent how to do things. Make them easy to know when to use.

### Product

- `arch/` - Architecture documentation with system and tier-level diagrams and inferred ADRs. 

- `rules/` - Define rules that agents must follow when writing code. Can be linked to agents' custom folder.

- `specs/{slug}.spec.md` - A detailed specification (problem, solution, verification) of a feature or technical requirement.

- `plans/{slug}.{source?}.{tier?}.plan.md` - A set of implementation plans derived from a single specification, or a report of a bug-fix.

- `reports/{slug}.report.md` - A report generated during the review process, such as accessibility and compliance reports.

### Solution

- `Source Code` - The implementation of the system, including unit tests.

- `E2E Tests` - End-to-end tests that verify the implemented code meets the defined specifications and acceptance criteria.