# Fetch

Archetypes live in the AIDDbot GitHub org, named `back-{tech}`, `front-{tech}`, `e2e-{tech}`. Domain samples live in `AIDDbot/domain-samples`, one folder per domain. If the human asks for a tech with no matching repo, list what exists (`gh repo list AIDDbot`) and let them choose.

Prefer `bunx`; if it is missing, `npx`. `tiged` has no runtime dependency on the fetched content.

## Inventory

If `.git/` is missing, `git init` first. Then:

- Piece missing → fetch.
- Piece present and intact (has its manifest or briefing) → skip, mark `kept`.
- Piece present but broken or empty → ask before replacing.

`--aidd` never marks `.agents/` as `kept`. Missing → `fetch`. Present → `refresh`.

## Archetypes and domain

```bash
bunx tiged AIDDbot/back-{tech} back
bunx tiged AIDDbot/front-{tech} front
bunx tiged AIDDbot/e2e-{tech} e2e
bunx tiged AIDDbot/domain-samples/{domain} docs/domain
```

## `.agents/` (`--aidd`)

Missing:

```bash
bunx tiged AIDDbot/AIDDbot/.agents .agents
```

Refresh — overwrite collisions, keep local-only files:

```bash
bunx tiged AIDDbot/AIDDbot/.agents .agents.__upstream__
```

Then copy `.agents.__upstream__/` into `.agents/` and delete the staging folder. Use the shell's recursive copy (`cp -R` or `Copy-Item -Recurse`).

## Editor folders (`--aidd`)

After `.agents/` is in place, copy these from the same origin (overwrite collisions):

```bash
bunx tiged AIDDbot/AIDDbot/.claude .claude
bunx tiged AIDDbot/AIDDbot/.cursor/commands .cursor/commands
bunx tiged AIDDbot/AIDDbot/.github/prompts .github/prompts
```

If `CLAUDE.md` is missing at the repository root, write it with a single line: `@AGENTS.md`.

On fetch failure, stop and report which repo or path failed.
