# AIDDbot Documentation Explorer

The explorer is a web guide for people who want to use or build AIDDbot. It shows how the parts fit together, how a change moves through the project, and where to read the details. See [project intent](INTENT.md).

Status: **draft**. This document states the intent only. Implementation comes later, in its own spec.

## Why

The Markdown documents are complete, but they are long and reference each other. A reader must open several files to see how one change moves from start to end. GitHub and [Obsidian](KNOWLEDGE-WIKI.md#optional-obsidian) show the files and their links, but not the flow.

## Audience

| Reader | Goal |
| --- | --- |
| Team or student who wants to **use** AIDDbot | Understand what people, agents, skills, hooks, and scripts do, and how a change moves from spec to close. |
| Contributor who wants to **build** AIDDbot | Find the current state of the project, the next step, and the documents to read before a change. |

## What it shows

- An overview of AIDDbot and its current state.
- A guided walkthrough of one change: specify, plan, build and review, close.
- A map of the building blocks and how they work together.
- The change profiles and the documents each one needs.
- The project progress: [dogfooding](DOGFOODING.md) stages and findings.

The maps use the relationships of the [ontology](ONTOLOGY.md) and link to the [glossary](GLOSSARY.md) terms.

## Principles

1. **A guide, not a second source.** One fact has one home ([wiki model](KNOWLEDGE-WIKI.md#model)). The explorer summarizes and links to the source documents.
2. **Show the real state.** Mark what is available and what is planned.
3. **Visual and accessible.** Diagrams and animation help the reader. Every view also works with a keyboard, on narrow screens, and with reduced motion. Apply [DESIGN.md](DESIGN.md).
4. **Built with AIDDbot.** The explorer follows the same spec-first flow that it explains.

## Pending: implementation

These are proposals from a first discussion. They are not decisions yet. Confirm them in the explorer's first `feat` spec, after [plan phase 2](PLAN.md#phase-2--complete-the-first-change) produces the spec template.

**Two layers.**

- **Data**: the build reads the repository Markdown on every run. No copies.
- **Tour content**: the agent writes the tour, maps, and order as data files that reference source sections. A check script flags them for review when those sections change.

**Proposals.**

| Topic | Proposal | Reason |
| --- | --- | --- |
| Scope | A web guide for AIDDbot only. Keep it open to a later `aiddbot explore` command for other projects. | Smallest useful scope. |
| Build stack | A custom [Astro](https://astro.build/) site, not a documentation theme. | Reads Markdown in place, supports interactive parts and animation, outputs static HTML, and runs on Bun. |
| Distribution | GitHub Pages, deployed by GitHub Actions on every push to `main`. | No cost. The site matches the repository. |
| Updates | CI rebuilds and flags stale tour content. The skill that closes a change updates it. | Scripts do the deterministic part; skills do the part that needs judgment. |

**Ontology use.**

- In the building blocks map, glossary terms name the nodes and ontology relationships label the connections.
- A document view answers one question: *Which wiki pages cite this spec?* It follows the Markdown citations in reverse and links back to the source section at the displayed revision.
- Use document IDs to identify documents, and paths with section anchors to navigate. Show a `links.related` entry as **related to**. Show a link to evidence as **cites**. [Metadata](DOCUMENTATION-CATALOG.md#metadata-meta)
- Add a relationship to the ontology when it answers a recurring question.

Options set aside: a Bun script that generates one HTML file, Starlight or VitePress, a single-page app that reads Markdown at runtime, and other hosting (own domain, npm package, release zip).

**Open questions.**

1. Confirm the proposed location `packages/explorer/` and the shared Bun workspace in the first explorer spec. [Scaffolding](SCAFFOLDING.md#proposed-layout)
2. Format of the tour content: YAML, JSON, or MDX.
3. Mermaid diagrams: render at build time or in the browser.
4. Confirm the proposal to keep the stale-content check in `packages/explorer/scripts/`. [Script layout](SCAFFOLDING.md#cli-and-support-scripts)
5. Does GitHub Pages need a public repository?
6. Do we build a quick HTML prototype first to validate the visual style?

## Change history

- v9: move the detailed ontology uses from the ontology to the pending implementation proposals.
- v8: use the ontology for the building blocks map and propose navigation from a spec to its wiki citations.
- v7: link the proposed app location and build scripts to the repository scaffolding.
- v6: add pending implementation proposals and open questions.

- v5: link to the shared design system at the repository root.
- v4: reduced to intent: purpose, audience, content, and principles. Implementation details move to a later spec.
- v3: adopt the shared AIDDbot web style guide and its review checks.
- v2: reading paths for **Use** and **Build**; principles; building blocks in each walkthrough step; project progress view; release slices; out-of-scope list; build checks for sources; next step aligned with dogfooding; open questions.
- v1: initial draft of the explorer scope, views, content rules, and first release checks.
