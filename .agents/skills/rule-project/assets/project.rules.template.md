---
description: Restrictions for the {project} project of {Product_Name}
paths: "{source_glob}"
glob: "{source_glob}"
applyTo: "{source_glob}"
---
# {Project_Name} rules — {Product_Name}

## Problem

{Why this project exists and its boundary.}

## System

- **Source**: `{source_root}/`
- **Language**: {language}
- **Framework**: {framework}
- **Testing**: {testing strategy}

### Dependencies

- **Depends on**: {sibling projects / external systems it depends on}
- **Used by**: {sibling projects / external systems that depend on it}
- **Libraries**: {main libraries this project uses}

### Code organization

**Pattern**: {Layer-based | Feature-based | Hybrid}.

```text
{source_root}/
├── {folder_or_file}    # {one-line responsibility}
└── {folder_or_file}    # {one-line responsibility}
```
### Coding rules

| Rule | Scope | Reason |
| --- | --- | --- |
| {project-specific non-automatable rule} | `{path or glob}` | {evidence or decision} |

---

> last updated: {DateTime}
