# AIDDbot Script Toolchain

Scripts do the deterministic tasks of AIDDbot, such as document IDs, metadata checks, and Git chores. Skills call them. See [INTENT.md](INTENT.md#building-blocks).

Status: **draft**. There is no CLI yet. The first command comes in [H2](PLAN.md#h2--repeat-and-extract), only if the findings justify it.

## Runtime and development

- **Runtime**: latest stable [Bun](https://bun.com/). It is the only runtime and toolchain. [Upgrade guide](https://bun.com/guides/util/upgrade)
- **Language**: TypeScript. Bun runs the source files directly. [Bun TypeScript](https://bun.com/docs/runtime/typescript)
- **Tests**: TypeScript with `bun:test`. [Bun test runner](https://bun.com/docs/test)

| Task | Command |
| --- | --- |
| Run a script from the repository root | `bun run ./packages/cli/src/cli.ts <command> [args]` |
| Lint | `bun lint` ([Bun linter](https://bun.com/docs/lint)) |
| Type-check | `bunx tsc --noEmit` (Bun strips types without checking them) |
| Test | `bun test` |

Run the lint, type check, and tests before you close a change to scripts.

## Prerequisite

Bun must be installed on the user's machine. The README states this. If Bun is missing, the skill shows a clear message and an install link. It never fails silently.

## Packaging

The package lives at `packages/cli/`. [Scaffolding](SCAFFOLDING.md#layout)

- One npm package with **one executable**: `aiddbot`, declared in the `bin` field.
- Each task is a **subcommand**: `aiddbot <group> <action> [args]`.
- The entry point loads each subcommand **lazily** (`await import(...)`). A call loads only the code of its subcommand.

Reasons: one help screen, one version to pin, one `bin`.

## Execution from skills

Skills call a **pinned version**:

```sh
bunx --bun --package <package>@<x.y.z> aiddbot <command> [args]
```

- `--bun` runs the entry point with Bun. It goes before the executable name.
- `<x.y.z>` is the exact version that ships with the skills. Updates are deliberate.
- A pinned version comes from Bun's global cache. There is no registry request on each call. [bunx reference](https://bun.com/docs/pm/bunx)
- Do not use `@latest`. It asks the registry on every run, which is slow, and it runs new versions without review, which is a supply-chain risk.

### Before the first publish

Until the package is on npm, test a skill that needs the CLI with a local package file:

1. In this repository, run `bun pm pack` in `packages/cli/`. It creates `<package>-<x.y.z>.tgz`. [bun pm pack](https://bun.com/docs/pm/cli/pm#pack)
2. In the test repository, install that file as a development dependency: `bun add -d <path>/<package>-<x.y.z>.tgz`.
3. In the copied skill, call `bunx --bun aiddbot <command> [args]`. `bunx` runs the installed package. The version is the one in the file.
4. Record the file name and the repository revision in the evidence of the test.

When the package is published, change the skill call to the pinned form above. Prefer skills that do not need the CLI in H3; this procedure applies only if a skill depends on it.

## Script contract

Every subcommand follows these rules:

| Aspect | Rule |
| --- | --- |
| Input | Arguments and flags only. No interactive prompts. |
| Output | JSON on stdout, for agents. `--text` gives human-readable output. |
| Errors | A short message on stderr. Exit code `0` = success, `1` = validation failure, `2` = usage or system error. |
| Side effects | Only the files and Git operations that the command states. `--dry-run` shows them without applying them. |
| Portability | Bun and Node APIs only. No Bash or PowerShell commands. Works on Windows, macOS, and Linux. |
| Help | `aiddbot --help` and `aiddbot <command> --help` list arguments, output, and exit codes. |

## Candidate commands

Add a command only when the [rule of three](PLAN.md#dogfooding-rules) asks for it.

| Command | Purpose |
| --- | --- |
| `doc new <type>` | Create a document from its template. Assign an ID according to its document type. |
| `doc validate [path]` | Check `META` frontmatter: required fields, status values, ID format, links. |
| `doc close <id>` | Set a `CHG` document to `done`; list the `LIVE` documents to review. |
| `commit check` | Validate a commit message against Conventional Commits. |
