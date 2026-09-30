# {System name}

> Author: {product author} · approved: {YYYY-MM-DD}

## Purpose

{The problem the system solves, and why now.}

## Users and needs

| User | Needs |
| --- | --- |
| {role} | {what they must be able to do} |

## Projects

| Project | Folder | Archetype | Responsibility |
| --- | --- | --- | --- |
| {front \| back \| e2e \| cli} | `{folder}/` | `{tier}-{archetype}` \| {technology outside the catalog} | {one-line responsibility} |

## Technical decisions

- {Only choices that shape the scaffold or the first specs: persistence, integration, deployment target, constraints. None when the archetypes decide it.}

## Scaffold

Run from the repository root with a clean working tree:

```bash
npx tiged AIDDbot/{tier}-{archetype} {folder}
bun install --cwd {folder}
node .agents/aidd/aidd.mjs commit "chore(scaffold): add {tier}-{archetype}, ..."
```

{Projects outside the catalog: the official generator to run for each, with no functional code.}
