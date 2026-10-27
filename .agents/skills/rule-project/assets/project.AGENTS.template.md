<!--
The data of one existing project, from repository evidence: a map, not a manual. The root AGENTS.md gives what all projects share: never copy it here.
Keep the sections and their order. Write short lists and tables, not prose. Remove each comment and each empty section. `aidd release` refuses a file over 128 lines, with a comment, or with an empty section.
-->
# {Project_Name} — {project_type}

## Purpose

- **Owns**: {what the project owns}
- **Never**: {what the project never does}

## Technology

<!-- The slots are the commands that `rule-project` records with `aidd config set`. A slot without a clear command is `n/a` with its reason. -->

- **Stack**: {language and version}; {runtime and framework}; {package manager}.
- **Dependencies**: {library — role}
- **Slots**: `test` `{command}`; `test:spec` `{command | n/a: reason}`; `start` `{command}`; `layers` `{command | n/a: reason}`; `crap` `{command | n/a: reason}`; `upgrade` `{command}`.

## Folders

<!-- The pattern that the code really follows: each part, its path, and what it may import. When a `src/shared/` folder exists, `aidd release` writes its index in `src/shared/README.md`. -->

| Part | Path | Responsibility | May import |
| --- | --- | --- | --- |
| {layer or part} | `{path}` | {one-line responsibility} | {parts} |

## Platform

<!-- The contract of the project, then one line for each technical concern of its platform. A change replaces the line of its concern; never add a line for a feature. -->

- **Needs**: {sibling projects or external systems}. **Gives to**: {sibling projects or external systems}.
- **Port**: `PORT` = {default}. **Variables**: `{NAME}` — {purpose}.
- {concern}: {what it owns, in one line}

## Project rules

<!-- The rules of the stack that the code follows, and the lessons that `ship-spec` adds: each with its reason. -->

- {rule — reason}
