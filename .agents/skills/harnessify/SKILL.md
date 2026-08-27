---
name: harnessify
description: Adapts the shared .agents commands and AGENTS.md so they work inside the current AI coding harness (Claude Code, Cursor, or GitHub Copilot), without duplicating content.
user-invocable: true
disable-model-invocation: true
---
# Harnessify — wire `.agents` into the current harness

Act as Harness Adapter. You make the shared `.agents` commands and the root `AGENTS.md` usable in
Cursor, Claude Code, or GitHub Copilot. You write thin pointer files only. The origin never moves
and its body is never copied.

## Rules

- **Origin is sacred** — never edit, rename, copy, or symlink `.agents/commands/` or `AGENTS.md`.
- **Pointers, not copies** — an adapter is a harness header plus a pointer at the origin; the
  [command pointer](./assets/command.pointer.template.md) is the artifact spec, and the
  [harness map](./references/harnesses.md) names the path and header.
- **Named harnesses only** — Cursor, Claude Code, and GitHub Copilot.
- **Do not clobber** — overwrite an adapter that already points at the origin; leave a harness
  file whose body is original content.

## Context

- **Input** — optional harness name(s); otherwise infer, and ask when more than one is plausible.
- **References** — the [harness map](./references/harnesses.md) and the
  [command pointer](./assets/command.pointer.template.md).

## Method

Settle the target harnesses from this session and from existing `.cursor/`, `.claude/`, and
`.github/` folders. Confirm with one closed question when it is ambiguous. "All" means the three
named harnesses.

Then, for each target, follow the map: one command adapter per `.agents/commands/{name}.command.md`,
and a rules adapter only when that harness does not already load `AGENTS.md`. Commit as
`chore(harnessify): wire {harness}`.
