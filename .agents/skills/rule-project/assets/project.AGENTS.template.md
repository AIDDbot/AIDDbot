<!--
The technical data of one existing project, from repository evidence.
Keep the sections, their order and their headings: the other skills find their data by them. Write short lists and tables, not prose. Remove these comments.
Leave out each line that the Common stack of the root AGENTS.md gives.
-->
# {Project_Name} — {project_type}

This file gives the data of this project. Do not explore the code to learn the setup.

## 1 · Purpose and boundary

- **Owns**: {what the project owns}
- **Never**: {what the project never does}

## 2 · Technology

- **Language**: {language and version}
- **Runtime / framework**: {runtime and framework}
- **Main dependencies**: {library — role}
- **Package manager**: {package manager}

## 3 · Tooling

<!-- The commands that `rule-project` registers with `aidd config set`. A slot without a clear command is `n/a` with its reason. -->

| Slot | Blocks | Command | Tool |
| --- | --- | --- | --- |
| `lint` | Yes | `{command}` | {tool} |
| `format` | No | `{command}` | {tool} |
| `upgrade` | No | `{command}` | {tool} |
| `unit` | Yes | `{command}` | {tool} |
| `start` | No | `{command}` | {tool} |
| `acceptance` | Yes | `{command}` | {tool} |
| `quality` | No | `{command}` | {tool} |

## 4 · Architecture

<!-- The pattern that the code really follows. Write each layer boundary that no linter checks as a rule: the review checks it in the diff. -->

**Pattern**: {Layer-based | Feature-based | Hybrid}

- {layer or part} — {responsibility} — {what it may import}

## 5 · Folder structure

```text
{source_root}/
├── {folder_or_file}    # {one-line responsibility}
└── {folder_or_file}    # {one-line responsibility}
```

### Shared primitives

<!-- The helpers that two or more features use. `ship-spec` adds new ones. A helper of one feature gets no row. -->

| Primitive | Contract | Path |
| --- | --- | --- |
| {name(args)} | {contract} | {path} |

## 6 · Coding rules

### Technology rules

- {rule of the stack that the code follows — reason}

### Project rules

<!-- `ship-spec` adds lessons from shipped specs. Keep each row: the code cannot make it again. -->

| Rule | Scope | Origin |
| --- | --- | --- |

## 7 · Connections

- **Needs**: {sibling projects or external systems}
- **Gives to**: {sibling projects or external systems}
- **Port**: `PORT` = {default}
- **Environment variables**: `{NAME}` — {purpose}
