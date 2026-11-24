---
id: aiddbot-cli
type: wiki-page
title: AIDDbot CLI
status: draft
created: 2026-11-24
updated: 2026-11-24
links:
  sources:
    - https://bun.com/docs/pm/bunx
  related:
    - intent
    - cli-development
  supersedes: []
---

# AIDDbot CLI

Scripts do the deterministic tasks of AIDDbot, such as document IDs, metadata checks, and Git chores. Skills call them. See [building blocks](intent.md#building-blocks).

Status: **draft**. There is no CLI yet.

## Command form

All scripts ship in one executable, `aiddbot`. Each task is a subcommand: `aiddbot <group> <action> [args]`.

## Prerequisite

Bun must be installed on the user's machine. The README states this. If Bun is missing, the skill shows a clear message and an install link. It never fails silently.

This prerequisite is under review. Teams that do not use JavaScript may not have Bun. Compiled binaries can remove it.

## Execution from skills

Skills call a **pinned version**:

```sh
bunx --bun --package <package>@<x.y.z> aiddbot <command> [args]
```

- `--bun` runs the entry point with Bun. It goes before the executable name.
- `<x.y.z>` is the exact version that ships with the skills. Updates are deliberate.
- A pinned version comes from Bun's global cache. There is no registry request on each call. [bunx reference](https://bun.com/docs/pm/bunx)
- Do not use `@latest`. It asks the registry on every run, which is slow, and it runs new versions without review, which is a supply-chain risk.

## Script contract

Every subcommand follows these rules:

| Aspect | Rule |
| --- | --- |
| Input | Arguments and flags only. No interactive prompts. |
| Output | JSON on stdout, for agents. `--text` gives human-readable output. |
| Errors | A short message on stderr. Exit code `0` = success, `1` = validation failure, `2` = usage or system error. |
| Side effects | Only the files and Git operations that the command states. `--dry-run` shows them without applying them. |
| Portability | Bun and Node APIs only. No Bash or PowerShell commands. Works on Windows, macOS, and Linux. |
| Stack | Works in any project stack. Reads and writes documents and Git only. Does not need the project manifest or build tool. |
| Help | `aiddbot --help` and `aiddbot <command> --help` list arguments, output, and exit codes. |

## Candidate commands

Add a command for each deterministic step that a skill marks.

| Command | Purpose |
| --- | --- |
| `doc new <type>` | Create a document from its template. Assign an ID according to its document type. |
| `doc validate [path]` | Check `META` frontmatter: required fields, status values, ID format, links. Warn when `updated` is older than the last commit of the file. |
| `doc close <id>` | Set a `CHG` document to `done`; list the `LIVE` documents to review. |
| `commit check` | Validate a commit message against Conventional Commits. |
