# {Tier_Name} Architecture — {Product_Name}

## Overview

{One paragraph: role of this tier in the system, key technology, main capabilities.}

## C4 Diagram — Components

```mermaid
C4Component
  title {Tier_Name} Components

  Container_Boundary({tier_id}, "{Tier_Name}") {
    Component({comp_id}, "{Component name}", "{Stereotype}", "{Responsibility}")
  }

  Rel({comp_a}, {comp_b}, "{Interaction}")
```

## Code organization

**Pattern**: {Layer-based | Feature-based | Hybrid}. {One sentence explaining how folders are organized.}

```text
{source_root}/
├── {folder_or_file}    # {One-line responsibility}
└── {folder_or_file}    # {One-line responsibility}
```

**New code must follow this pattern**: {One sentence summarizing the convention for new code.}

## Shared artifacts

| Path | Purpose |
|------|---------|
| {path/to/shared/artifact} | {What it provides and who uses it.} |

{Note if no shared folder exists and where to create one if needed.}

## Key contracts

{API routes, interfaces, event schemas, DB access patterns, or models exposed to other tiers. Use tables for structured contracts.}

## Dependencies between {features | modules | domains}

```mermaid
graph LR
  {Module_A} -->|{relationship}| {Module_B}
```

- {Prose explanation of key dependency relationships.}

## Constraints

- {Hard constraint — what this tier must never do or always do.}

{--- db tier only sections below — omit for other tiers ---}

## Storage infrastructure

{Connection strategy, pooling, driver configuration, etc.}

## Naming conventions

{Table/collection naming, column naming, index naming, constraint naming patterns.}

## Migration strategy

{How schema changes are managed: tool (Flyway, Liquibase, Prisma, etc.), workflow, versioning.}
