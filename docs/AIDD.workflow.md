# AIDD Workflow

```mermaid
flowchart TD
  classDef nd fill:#f8fafc,stroke:#00c4cc,color:#457b9d
  classDef sg fill:#f1f5f9,stroke:#00f2ff,color:#457b9d 

  HUM[HUMAN]

  subgraph P["{Product_Folder}"]
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
      COD["Source Code + Unit Tests"]:::nd
      E2E["E2E Tests"]:::nd
      CHL["CHANGELOG.md"]:::nd
  end

  HUM -->|/initialize| AGT
  HUM -->|/explore| ARC
  HUM -->|/extract| RUL
  HUM -->|/specify| SPC
  AGT -.-> SPC  
  AGT -.-> ARC
  RUL -.-> COD  
  SPC -->|/planify| PLN
  ARC -.-> PLN

  PLN -->|/codify| COD
  COD -->|/verify| E2E
  E2E -->|failures| RPT
  COD -->|/review| RPT
  RPT -->|/repair| COD
  COD -->|/release| CHL

  class P,A,S sg
```

## Commands

- `/initialize` - Create initial technology documentation (AGENTS.md and skills/) for a project.

- `/explore` - Reverse-engineer an existing codebase to discover its architecture and infer the ADRs. 

- `/extract` - Extract coding rules from an existing codebase.

- `/specify` - Create a new specification from a requirement (defines problem, solution, and verification).

- `/planify` - Create a set of implementation plans for a specification or bug-fix (back, front, and data).

- `/codify` - Writes the code and unit tests following a plan, or a minor requirement.

- `/verify` - Run end-to-end tests to ensure code meets specifications. On failure, writes a report for `/repair`.

- `/review` - Review code for guideline compliance and best practices.

- `/repair` - Apply fixes from a review or verify report (preferred path for all reported defects).

- `/release` - Update the changelog and mark specifications as released. *(skill stub — content WIP)*

- `/repository` - Git branches and conventional commits. Not a separate pipeline step; every skill that produces artifacts reads and follows it before finishing. `/codify` creates `feat/{slug}` before coding; `/repair` uses `fix/{slug}` only outside an active feature cycle.

## Git workflow

1. **Product artifacts** (`/specify`, `/planify`, `/explore`, `/extract`, `/review`, failed `/verify`) — committed with `docs` (or `chore` for `AGENTS.md`) on the default branch or on `feat/{slug}` once the feature branch exists.
2. **Implementation** (`/codify`) — create `feat/{slug}` first (save any uncommitted work so nothing is lost), then commit code in related groups with `feat` / `test`.
3. **Fixes** (`/repair`) — stay on `feat/{slug}` during a feature cycle; use `fix/{slug}` only for standalone defects not tied to an open feature branch.
4. **Release** (`/release`) — `chore` commits for `CHANGELOG.md` and spec status.

See [repository skill](../.agents/skills/repository/SKILL.md) for branch rules, conventional commit format, and per-skill commit tables.

## Artifacts

Paths below are relative to `{Product_Folder}` (default `.product/`, set in `AGENTS.md`).

### Technology

- `AGENTS.md` - The entry point for any agent joining the project, with product and technology information.

- `skills/` - Teach your agent how to do things. Make them easy to know when to use.

### Product

- `arch/` - Architecture documentation with system and tier-level diagrams and inferred ADRs. 

- `rules/` - Define rules that agents must follow when writing code. Can be linked to agents' custom folder.

- `specs/{slug}.spec.md` - A detailed specification (problem, solution, verification) of a feature or technical requirement.

- `plans/{slug}.{source?}.{tier?}.plan.md` - A set of implementation plans derived from a single specification.

- `reports/{slug}.{type}.report.md` - Findings from `/review` or `/verify` (`{type}`: `quality`, `compliance`, `accessibility`, `verify`). Consumed by `/repair`.

### Solution

- `Source Code + Unit Tests` - The implementation of the system. Unit tests are produced as part of `/codify`, not as a separate step.

- `E2E Tests` - End-to-end tests that verify the implemented code meets the defined specifications and acceptance criteria.

- `CHANGELOG.md` - A log of all notable changes made to the codebase, generated during the release process.
