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
| {project} | {api \| web \| cli \| e2e} | `{folder}/` | `{library}/{folder}` | {one-line responsibility} |

## Technical decisions

- {Only choices that shape the scaffold or the first specs: persistence, integration, deployment target, constraints. None when the archetypes decide it.}
- Basic authentication: {yes, the system has users \| no}.

## Scaffold

Run from the repository root with a clean working tree, for each project of the library:

```bash
{the copy command of the archetype in archetypes.md}
npm install --prefix {folder}
```

{Also copy the spec instances and the schema documents of the library: `npx degit AIDDbot/{library}/foundation#{tag} .product/archetypes/foundation` and `npx degit AIDDbot/{library}/model#{tag} .product/model`.}

