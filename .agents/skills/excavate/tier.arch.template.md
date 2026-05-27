# {Tier_Name} Architecture — {Product_Name}

## Overview

{One paragraph: role of this tier in the system, key technology, main capabilities.}

## Technology stack

| Area | Choice |
|------|--------|
| Language | {language and version} |
| Framework | {framework and version} |
| Testing | {unit/integration test stack} |
| Storage | {databases, caches, files — or N/A} |
| Security | {auth, secrets, transport — summary} |
| Logging | {logging/monitoring approach} |

### Development workflow

| Step | Command |
|------|---------|
| Init | `{init command or N/A}` |
| Build | `{build command}` |
| Run | `{run/dev command}` |
| Test | `{test command}` |
| Lint | `{lint command or N/A}` |
| Deploy | `{deploy command or N/A}` |

---

## Components

```mermaid
C4Component
  title {Tier_Name} Components

  Container_Boundary({tier_id}, "{Tier_Name}") {
    Component({comp_id}, "{Component name}", "{Stereotype}", "{Responsibility}")
  }

  Rel({comp_a}, {comp_b}, "{Interaction}")
```

### Code organization

**Pattern**: {Layer-based | Feature-based | Hybrid}. {One sentence explaining how folders are organized.}

```text
{source_root}/
├── {folder_or_file}    # {One-line responsibility}
└── {folder_or_file}    # {One-line responsibility}
```

### Shared artifacts

| Path | Purpose |
|------|---------|
| {path/to/shared/artifact} | {What it provides and who uses it.} |

{Note if no shared folder exists and where to create one if needed.}

### Key contracts

{API routes, interfaces, event schemas, DB access patterns, or models exposed to other tiers. Use tables for structured contracts.}

### Dependencies between {features | modules | domains}

```mermaid
graph LR
  {Module_A} -->|{relationship}| {Module_B}
```

### Storage infrastructure

{Connection strategy, pooling, driver configuration, etc. Omit if this tier has no storage responsibility.}

> last updated: {Date of last update, e.g., May 2026}