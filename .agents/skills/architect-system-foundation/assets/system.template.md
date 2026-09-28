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

```bash
npm create aiddbot -- --name "{System name}" --author "{product author}" --{tier} {archetype} [--{tier}-dir {folder}]
```

{Projects outside the catalog: the official generator to run for each, with no functional code.}
