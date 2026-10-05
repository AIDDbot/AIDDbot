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
| {project} | {back-api \| front-web \| cli \| e2e} | `{folder}/` | `{archetype}` \| on demand: {technology} | {one-line responsibility} |

## Technical decisions

- {Only choices that shape the scaffold or the first specs: persistence, integration, deployment target, constraints. None when the archetypes decide it.}
- Basic authentication: {yes, the system has users \| no}.

## Scaffold

Run from the repository root with a clean working tree, for each project:

```bash
npx tiged AIDDbot/{archetype} {folder}
npm install --prefix {folder}
```

{Projects with an archetype made on demand: the official generator and dependency install to run for each, with no functional code.}

## Archetypes made on demand

{For each project whose archetype is made on demand: one link to `.product/archetypes/{project}.AGENTS.md`, the `project.AGENTS.template.md` filled for the chosen technology, which the scaffold copies to `{folder}/AGENTS.md`. Never copy its content here. Omit this section when every project uses a catalog archetype.}
