---
id: cli-development
type: page
title: AIDDbot CLI Development
status: draft
created: 2026-11-24
updated: 2026-11-26
links:
  sources:
    - https://bun.com/docs/pm/cli/pm#pack
  related:
    - aiddbot-cli
    - scaffolding
  supersedes: []
---

# AIDDbot CLI Development

How we build the [AIDDbot CLI](../process/aiddbot-cli.md). Its command form, prerequisite, and contract are in that page.

Status: **draft**. There is no CLI yet. It comes in [M2](../../ROADMAP.md#m2--deterministic-cli), from the deterministic steps that the skills mark in M1.

## Runtime and development

- **Runtime**: latest stable [Bun](https://bun.com/). It is the only runtime and toolchain. [Upgrade guide](https://bun.com/guides/util/upgrade)
- **Language**: TypeScript. Bun runs the source files directly. [Bun TypeScript](https://bun.com/docs/runtime/typescript)
- **Tests**: TypeScript with `bun:test`. [Bun test runner](https://bun.com/docs/test)

| Task | Command |
| --- | --- |
| Run a script from the repository root | `bun run ./packages/cli/src/cli.ts <command> [args]` |
| Lint | None yet. Bun 1.4.5 has no `bun lint`. The project waits for the [Bun linter](https://bun.com/docs/lint) and adds no other tool. |
| Type-check | `bunx tsc --noEmit` (Bun strips types without checking them) |
| Test | `bun test` |

Run the type check and the tests before you close a change to scripts.

## Packaging

The package lives at `packages/cli/`. [Scaffolding](scaffolding.md#layout)

- One npm package with one executable, `aiddbot`, declared in the `bin` field.
- The entry point loads each subcommand **lazily** (`await import(...)`). A call loads only the code of its subcommand.

Reasons: one help screen, one version to pin, one `bin`.

[M3](../PLAN.md#m3--distribution-and-versions) decides if the CLI also ships as compiled binaries.

## Before the first publish

Until the package is on npm, test a skill that needs the CLI with a local package file:

1. In this repository, run `bun pm pack` in `packages/cli/`. It creates `<package>-<x.y.z>.tgz`. [bun pm pack](https://bun.com/docs/pm/cli/pm#pack)
2. Install that file in the test repository without a change to the project manifest. Many projects have no `package.json`. [M3](../PLAN.md#m3--distribution-and-versions) defines the exact steps (finding F6).
3. Record the file name and the repository revision in the evidence of the test.

When the package is published, change the skill call to the [pinned form](../process/aiddbot-cli.md#execution-from-skills).
