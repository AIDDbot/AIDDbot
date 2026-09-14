---
description: Restrictions for the {container} container of {Product_Name}
paths: "{source_glob}"
glob: "{source_glob}"
applyTo: "{source_glob}"
---
# {Container_Name} rules — {Product_Name}

## Problem

{Why this container exists and its boundary.}

## Solution

- **Source**: `{source_root}/`
- **Language**: {language}
- **Framework**: {framework}
- **Testing**: {testing strategy}

### Dependencies

- **Depends on**: {sibling containers / external systems it depends on}
- **Used by**: {sibling containers / external systems that depend on it}
- **Libraries**: {main libraries this container uses}

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

## Verification

Functional and quality checks

- `{command}` — {what it checks}

---

> last updated: {DateTime}
