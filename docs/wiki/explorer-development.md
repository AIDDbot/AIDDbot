---
id: explorer-development
type: wiki-page
title: AIDDbot Explorer Development
status: draft
created: 2026-11-25
updated: 2026-11-25
links:
  sources:
    - docs/specs/s0002-web-knowledge-explorer/s0002.spec.md
    - docs/specs/s0003-two-loop-lifecycle/s0003.spec.md
    - https://bun.com/docs/bundler
    - https://developer.mozilla.org/en-US/docs/Web/API/Web_components
  related:
    - knowledge-wiki
    - documentation-catalog
    - intent
    - cli-development
    - scaffolding
  supersedes: []
---

# AIDDbot Explorer Development

How we build the [knowledge explorer](glossary.md#knowledge-explorer): a static web site that tells the story of AIDDbot to people. It reads the AIDDbot documents and never edits them. It does not ship. [`s0002`](../specs/s0002-web-knowledge-explorer/s0002.spec.md)

Status: **draft**.

## Commands

Run them from the repository root. The explorer is the only package, so there is no Bun workspace yet. [Scaffolding](scaffolding.md#when-each-folder-appears)

| Task | Command |
| --- | --- |
| Install the explorer dependencies (once) | `bun run explorer:install` |
| Build the site in `packages/explorer/dist/` | `bun run explorer:build` |
| Serve the site at `http://localhost:4173/` and build it again on each change | `bun run explorer:dev` |
| Type-check | `bunx tsc --noEmit` in `packages/explorer/` |
| Test | `bun test` in `packages/explorer/` |
| Lint | `bun lint` (see the [open point](#open-points)) |

The build accepts `--root <repository>` and `--out <folder>`. The site works from any folder of a static file server, because all its paths are relative and the views use hash addresses.

## Folders

```text
packages/explorer/
├── package.json            # Pinned dependencies and the build, dev, and test scripts
├── tsconfig.json
├── src/
│   ├── build.ts            # Entry point of the build
│   ├── dev.ts              # Development server
│   ├── shared/types.ts     # The data file format, shared by the builder and the site
│   ├── builder/            # Runs on Bun: reads the documents and writes the site
│   └── site/               # Runs in the browser: HTML, CSS, and custom elements
├── test/                   # bun:test tests
└── dist/                   # Build output. Git ignores it.
```

## Wiki contract

The builder reads six tables. Each one is the first table under a fixed heading. The column names are fixed.

| Table | Heading anchor | Columns |
| --- | --- | --- |
| Lifecycle phases | [`intent.md#lifecycle-phases`](intent.md#lifecycle-phases) | `#`, `Phase`, `Work`, `Uses`, `Produces` |
| Change flow | [`documentation-catalog.md#change-flow`](documentation-catalog.md#change-flow) | `#`, `Step`, `Work`, `Uses`, `Produces` |
| Building blocks | [`intent.md#building-blocks`](intent.md#building-blocks) | `Block`, `Role`, `Relations` |
| Document catalog | [`documentation-catalog.md#document-catalog`](documentation-catalog.md#document-catalog) | `ID`, `Document`, `Life`, `Form`, `Relevance`, `Standards`, `Purpose` |
| Form tag | [`documentation-catalog.md#form`](documentation-catalog.md#form) | `Code`, `Form`, `Rule` |
| Status use | [`documentation-catalog.md#status-use`](documentation-catalog.md#status-use) | `Status`, `Meaning`, `Set in`, `Used by` |

Rules:

- **ID columns.** `Uses`, `Produces`, and `Used by` hold document IDs in backticks. Plain text is allowed next to them, such as "`code`, and docs".
- **Name columns.** `Relations` and `Set in` hold a comma list. Each item is a document ID in backticks, or the name of a phase, a step, or a block. Phase and step names are unique.
- **Links between elements.** Every step links to the phase whose row links to the change flow: Development. No phase name is written in the code. Every reference links both elements.
- **Form.** Each catalog row holds one code of the Form tag table in backticks. A missing `Form` column or an unknown value stops the build.
- **Project brain.** The brain holds every document type with Life `LIVE` and Form `DOC`, in catalog order. No document ID is written in the code.
- **Sections.** A relative link in a row cell adds the linked section to the page of the element. A link to a glossary anchor adds a glossary term. The page also shows the glossary term with the ID or the name of the element, and, for a document type, the catalog section with its ID, such as `#spec`.
- **Errors.** A missing heading or table, a renamed or missing column, an unknown document ID, an unknown Form value, or an unknown name stops the build. The error names the file and the problem.
- **Smaller problems.** A missing or invalid `META`, a broken relative link, or an unknown `links` value does not stop the build. The build lists each one with its file. The document shows a warning.

A change to these headings or columns needs a change to the builder in the same commit. [Page rules](knowledge-wiki.md#page-rules)

## Content scope

| Group | Files |
| --- | --- |
| Wiki | `docs/wiki/*.md` |
| Root | `README.md`, `AGENTS.md`, `PLAN.md`, `DESIGN.md`, `CHANGELOG.md` |
| Specs | `docs/specs/**/*.md` |

- `README.md`, `AGENTS.md`, and `CHANGELOG.md` have no `META` by design. Their type comes from the file name: `readme`, `agents`, and `changelog`.
- `DESIGN.md` keeps its `META` under the `aiddbot` key.
- A link to another file of the repository, such as `LICENSE` or a folder, shows as plain text with an "outside the explorer" mark.

## Map rules

Code places every element. Nobody draws the map by hand. The map has three rows: the project loop, the project brain, and the change loop. The building blocks form a band below.

```text
PROJECT    Foundation ──► Development ──► Release ──► Maintenance
                              ▲    │ zoom     ▲            │
                              └────┼──────────┼── feedback ┘
BRAIN     │ readme  glossary  wiki-page  roadmap  adr  ...  changelog │
CHANGE     Analysis ► Design ► Implementation ► Verification ► Close
           spec       adr       code             test-report
```

- **Project loop.** The phases form the top row, in table order. A dashed arrow goes from the last phase to the phase that holds the change flow.
- **Change loop.** The steps form the bottom row, in table order, inside a frame. A zoom line goes from the phase that holds the change flow to the frame.
- **Brain.** The brain is a band between the two loops, with the brain document types in catalog order.
- **Document types.** A brain document type sits only on the brain. Any other document type hangs under the first step that produces it, or else under the first step that uses it.
- **Links to the brain.** The map always draws the links between the phases and the brain, and the links from the last step to the brain. The links of the other steps show when a person points at the step.
- **Phase page.** The phase diagram shows `Uses` and `Produces`, as the step diagram does. The page of the phase that holds the change flow also shows its steps.

## Site rules

- **Components.** Each part of the screen is one custom element in its own file in `src/site/components/`. There is no UI framework and no shadow DOM, so the global styles apply.
- **Views.** `#/` is the map. `#/<kind>/<id>` is an element page, with the kinds `phase`, `step`, `block`, and `type`. `#/doc/<id>` and `#/doc/<id>/<anchor>` are full documents. Any other address shows the not-found view.
- **Theme.** The builder turns the colors and fonts of [DESIGN.md](../../DESIGN.md) into `theme.css`. Dark is the default. The theme button saves the choice in the browser.
- **Fonts.** The `@fontsource` packages give the Latin subsets of Audiowide, Roboto, and Fira Code. The bundler puts them in `styles.css`.
- **Motion.** Diagrams and the map zoom use the Web Animations API. With reduced motion, every diagram shows its final state and a click opens the page with no zoom.
- **Mermaid.** The site loads `mermaid` only when a full document has a Mermaid block.

## Open points

- `bun lint` does not exist in Bun 1.4.5. The command fails with `Script not found "lint"`. [AGENTS.md](../../AGENTS.md#scripts) and [CLI development](cli-development.md) ask for it.
- `Bun.markdown` heading ids are not GitHub slugs. The builder adds its own.
- The logo loads from the author's site. Offline, the header shows no icon.
