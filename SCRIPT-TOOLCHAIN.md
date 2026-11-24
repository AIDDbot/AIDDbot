# AIDDbot Script Toolchain

Scripts do the deterministic tasks of AIDDbot: document IDs, metadata checks, Git chores, and monitoring logs. Skills and hooks call them. See [INTENT.md](INTENT.md#building-blocks) and [DOCUMENTATION-CATALOG.md](DOCUMENTATION-CATALOG.md).

Status: **draft**.

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

## Prerequisite

Bun must be installed on the user's machine. The README states this. If Bun is missing, a hook fails with a clear message and an install link. It never fails silently.

## Packaging

The proposed package lives at `packages/cli/` in a private Bun workspace. [Scaffolding](SCAFFOLDING.md#cli-and-support-scripts)

- One npm package with **one executable**: `aiddbot`, declared in the `bin` field.
- Each task is a **subcommand**: `aiddbot <group> <action> [args]`.
- The entry point loads each subcommand **lazily** (`await import(...)`). A call loads only the code of its subcommand.

Reasons: one help screen, one version to pin, one `bin`. Routing costs microseconds. Lazy loading keeps startup equal to separate executables.

## Execution from skills and hooks

Skills and hooks call a **pinned version**:

```sh
bunx --bun --package <package>@<x.y.z> aiddbot <command> [args]
```

- `--bun` runs the entry point with Bun. It goes before the executable name.
- `<x.y.z>` is the exact version that ships with the installed skills. Updates are deliberate.
- A pinned version comes from Bun's global cache. There is no registry request on each call. [bunx reference](https://bun.com/docs/pm/bunx)
- Do not use `@latest`. It asks the registry on every run, which is slow, and it runs new versions without review, which is a supply-chain risk.

## Script contract

Every subcommand follows these rules:

| Aspect | Rule |
| --- | --- |
| Input | Arguments and flags only. Hook payloads come on stdin as JSON. No interactive prompts. |
| Output | JSON on stdout, for agents. `--text` gives human-readable output. |
| Errors | A short message on stderr. Exit code `0` = success, `1` = validation failure, `2` = usage or system error. |
| Side effects | Only the files and Git operations that the command states. `--dry-run` shows them without applying them. |
| Portability | Bun and Node APIs only. No Bash or PowerShell commands. Works on Windows, macOS, and Linux. |
| Help | `aiddbot --help` and `aiddbot <command> --help` list arguments, output, and exit codes. |

## Performance budget

- A command called by a hook finishes in **less than 100 ms (p95)** on a warm cache.
- Measure with [hyperfine](https://github.com/sharkdp/hyperfine).

If a hook command misses the budget, apply these fallbacks in this order:

1. The hook calls the installed entry point directly (`bun <path>/cli.ts`). This skips `bunx` resolution.
2. Bundle each hook command with `bun build` into one file.
3. Compile a binary with `bun build --compile`. Last resort: it is large and platform-specific. See the note below.

A long-running server or daemon is out of scope. Hooks are short and independent, and a resident process adds lifecycle complexity.

### Note: compiled binaries

`bun build --compile` creates one executable that contains the Bun runtime and the code. [Bun single-file executables](https://bun.com/docs/bundler/executables)

| Criterion | `bunx` + pinned version | Compiled binary |
| --- | --- | --- |
| User prerequisites | Bun installed | None |
| Startup | Fast | Faster (no resolution; `--bytecode` skips parsing) |
| Size | KB | Tens of MB per platform |
| Publishing | `npm publish` | Multi-platform CI + distribution + signing |
| OS friction | None | macOS Gatekeeper, Windows SmartScreen, antivirus warnings |
| Transparency | Readable source in the cache | Opaque binary |
| Offline | Needs the cache | Always works |

Other points:

- Cross-compilation works from one machine with `--target` (`bun-windows-x64`, `bun-linux-x64`, `bun-linux-arm64`, `bun-darwin-arm64`, `bun-darwin-x64`).
- Dynamic `import()` is bundled only for static paths. Paths computed at runtime are not included.
- Signing binaries costs money and adds CI steps.

Compile only if one of these is true:

1. A hook command misses the budget even with fallbacks 1 and 2.
2. Requiring Bun is a real barrier for users (for example, in courses).

If we compile, distribute through npm with one package per platform in `optionalDependencies` (the esbuild and Biome pattern). Users still install with `npm` or `bun`, and the package manager picks the right binary.

## Commands (provisional)

| Command | Called by | Purpose |
| --- | --- | --- |
| `doc new <type>` | skill | Create a document from its template. Assign an ID according to its document type. |
| `doc validate [path]` | skill, hook | Check `META` frontmatter: required fields, status values, ID format, links. |
| `doc close <id>` | skill | Set a `CHG` document to `done`; list the `LIVE` documents to review. |
| `commit check` | hook | Validate a commit message against Conventional Commits. |
| `log <event>` | hook | Append an event to the AIDDbot monitoring log. |

## Next step

Spike: build `log` as a single command. Measure `bunx` with a pinned version against a direct `bun <path>` call. Record the result as an ADR.
