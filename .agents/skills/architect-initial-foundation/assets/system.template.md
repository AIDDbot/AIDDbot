# {System name}

> Author: {product author} · Website: {author website} · approved: {YYYY-MM-DD}

<!-- With no author in the request: `AIDDbot` and `https://aiddbot.com`. The `about` page shows them. -->

## Purpose

{The problem the system solves, and why now.}

## Users and needs

| User | Needs |
| --- | --- |
| {role} | {what they must be able to do} |

## Projects

| Project | Type | Folder | Archetype | Responsibility |
| --- | --- | --- | --- | --- |
| {project} | {api \| web \| cli \| e2e} | `{folder}/` | {archetype name} | {one-line responsibility} |

## Technical decisions

- {Only choices that shape the scaffold or the first specs: persistence, integration, deployment target, constraints. None when the archetype decides it.}
- Basic authentication: {yes, the system has users \| no}.

## Scaffold

Copy the whole archetype at its tag into a temporary folder, as the scaffold of `architect-initial-foundation` says, then install one time at the root:

```bash
{the copy command of the archetype in archetypes.md}
npm ci
```

