---
id: explorer-development
type: wiki-page
title: AIDDbot Explorer Development
status: draft
created: 2026-11-25
updated: 2026-11-26
links:
  sources:
    - docs/specs/s0002-web-knowledge-explorer/s0002.spec.md
    - docs/specs/s0003-two-loop-lifecycle/s0003.spec.md
    - docs/specs/s0005-layered-maps/s0005.spec.md
    - docs/specs/s0006-publish-knowledge-explorer/s0006.spec.md
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
| Serve the site at `http://localhost:4173/` and build it again on each change. A change to the builder code restarts the server. | `bun run explorer:dev` |
| Type-check | `bunx tsc --noEmit` in `packages/explorer/` |
| Test | `bun test` in `packages/explorer/` |
| Lint | `bun lint` (see the [open point](#open-points)) |

The build accepts `--root <repository>` and `--out <folder>`. The site works from any folder of a static file server, because all its paths are relative and the views use hash addresses.

## Publication

The [public explorer](https://aiddbot.github.io/AIDDbot/) uses GitHub Pages. The [workflow](../../.github/workflows/pages.yml) installs the locked dependencies, builds the site, and deploys `packages/explorer/dist/`. It runs on a push to `main`. A maintainer can also run it from the Actions tab with `main` selected.

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

The builder reads seven tables. Each one is the first table under a fixed heading. The column names are fixed.

| Table | Heading anchor | Columns |
| --- | --- | --- |
| Lifecycle phases | [`intent.md#lifecycle-phases`](intent.md#lifecycle-phases) | `#`, `Phase`, `Work`, `Uses`, `Produces` |
| Change flow | [`documentation-catalog.md#change-flow`](documentation-catalog.md#change-flow) | `#`, `Step`, `Work`, `Uses`, `Produces` |
| Impact levels | [`documentation-catalog.md#impact-levels`](documentation-catalog.md#impact-levels) | `Impact`, `When`, `Flow`, `Skips`, `Adds` |
| Building blocks | [`intent.md#building-blocks`](intent.md#building-blocks) | `Block`, `Role`, `Relations` |
| Document catalog | [`documentation-catalog.md#document-catalog`](documentation-catalog.md#document-catalog) | `ID`, `Document`, `Life`, `Form`, `Relevance`, `Standards`, `Purpose` |
| Form tag | [`documentation-catalog.md#form`](documentation-catalog.md#form) | `Code`, `Form`, `Rule` |
| Status use | [`documentation-catalog.md#status-use`](documentation-catalog.md#status-use) | `Status`, `Meaning`, `Set in`, `Used by` |

Rules:

- **ID columns.** `Uses`, `Produces`, `Used by`, `Skips`, and `Adds` hold document IDs in backticks. Plain text is allowed next to them, such as "`code`, and docs".
- **Name columns.** `Relations` and `Set in` hold a comma list. Each item is a document ID in backticks, or the name of a phase, a step, or a block. Phase and step names are unique.
- **Links between elements.** Every step links to the phase whose row links to the change flow: Development. No phase name is written in the code. Every reference links both elements.
- **Form.** Each catalog row holds one code of the Form tag table in backticks. A missing `Form` column or an unknown value stops the build.
- **Project brain.** The brain holds every document type with Life `LIVE` and Form `DOC`, in catalog order. No document ID is written in the code.
- **Impact levels.** `Skips` names the document types that the change loop map hides for the level. `Adds` names the document types that it marks as required. The level name is the code in backticks of the `Impact` cell.
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

Code places every element. Nobody draws a map by hand. The information comes in layers: an overview, two detail maps, and the element pages.

| Address | Map | Shows |
| --- | --- | --- |
| `#/` | Overview | The phases, the project brain as one box, and the steps as boxes |
| `#/map/change` | Change loop | The steps, their document types, and the brain band |
| `#/map/brain` | Project brain | The brain document types between the phases and the steps |
| `#/blocks` | Building blocks | A list of the building blocks. It is a view, not a map. |

```text
OVERVIEW   Foundation ──► Development ──► Release ──► Maintenance
                              │ zoom          ▲            │
                              ▼               │  feedback  │
           ┌─ PROJECT BRAIN ──────────────────┴──┐ ◄───────┘
           └─────────────────────────────────────┘
           Analysis ► Design ► Implementation ► Verification ► Close

CHANGE     │ readme  glossary  wiki-page  agents  roadmap  adr  ... │
LOOP       Analysis ► Design ► Implementation ► Verification ► Close
           spec       ...       code             test-report
           [ small | medium | large ]

BRAIN      Foundation  Development  Release  Maintenance
           │ readme  glossary  wiki-page  agents  roadmap  adr  ... │
           Analysis    Design   Implementation   Verification   Close
```

- **Overview.** The phases form the top row, in table order. A dashed arrow, the feedback loop, goes from the last phase to the phase that holds the change flow. The brain is one prominent box with its name only. The steps form the bottom row, in table order, inside a frame. A zoom line goes from the phase that holds the change flow to the frame. A link joins a phase or a step to the brain box when its `Uses` or `Produces` holds a brain document type. An element that reads and writes the brain gets one line with two heads. The overview shows no document type and no building block.
- **Clicks on the overview.** A phase opens its page. The brain box opens the brain map. The change loop frame or a step opens the change loop map.
- **Change loop map.** The brain document types form the top row, in catalog order, under the heading Project brain. The steps form a row below it, under the heading Change loop. The map has no frames. A brain document type ID with a hyphen shows in two lines. Any other document type hangs under the first step that produces it, or else under the first step that uses it. The map always draws the links from the last step to the brain. The links of the other steps show when a person points at the step.
- **Impact filter.** The change loop map has a selector with the levels of the [impact levels](documentation-catalog.md#impact-levels) table. The default is `medium`. A level hides the document types in its `Skips` cell and marks the document types in its `Adds` cell as required.
- **Brain map.** The phases form the top row, the brain document types the middle row, and the steps the bottom row. Each row has a heading: Project loop, Project brain, and Change loop. The map has no frames. An ID with a hyphen shows in two lines, such as `wiki-page`. A person who points at an element sees only its active links: who writes and who reads each brain document type. The arrow heads of these links are larger than the heads of the main arrows.
- **Read and write links.** An element that reads and writes the same brain document type gets one line with two heads, on every map.
- **Blocks view.** It lists every building block in table order, with its role and a link to its page. The header links to it.
- **Parent map.** Each element has one parent map. A phase has the overview. A step has the change loop map. A brain document type has the brain map. Any other document type has the change loop map. A block has the blocks view. The builder sets it from these rules, with no element ID in the code.
- **Breadcrumbs.** An element page shows the path from the overview through the parent map to the element, such as Map › Change loop › Design. Each part is a link.
- **Mini-map.** An element page draws its parent map in small, with the element marked. A click opens that map.
- **Phase page.** The phase diagram shows `Uses` and `Produces`, as the step diagram does. The page of the phase that holds the change flow also shows its steps.

## Site rules

- **Components.** Each part of the screen is one custom element in its own file in `src/site/components/`. There is no UI framework and no shadow DOM, so the global styles apply.
- **Views.** `#/` is the overview. `#/map/change` and `#/map/brain` are the detail maps. `#/blocks` is the blocks view. `#/<kind>/<id>` is an element page, with the kinds `phase`, `step`, `block`, and `type`. `#/doc/<id>` and `#/doc/<id>/<anchor>` are full documents. Any other address shows the not-found view.
- **Theme.** The builder turns the colors and fonts of [DESIGN.md](../../DESIGN.md) into `theme.css`. Dark is the default. The theme button saves the choice in the browser.
- **Fonts.** The `@fontsource` packages give the Latin subsets of Audiowide, Roboto, and Fira Code. The bundler puts them in `styles.css`.
- **Motion.** Diagrams and the map zoom use the Web Animations API. With reduced motion, every diagram shows its final state and a click opens the page with no zoom.
- **Mermaid.** The site loads `mermaid` only when a full document has a Mermaid block.

## Open points

- `bun lint` does not exist in Bun 1.4.5. The command fails with `Script not found "lint"`. [AGENTS.md](../../AGENTS.md#scripts) and [CLI development](cli-development.md) ask for it.
- `Bun.markdown` heading ids are not GitHub slugs. The builder adds its own.
- The logo and the favicon load from the author's site. Offline, the header and the browser tab show no icon.
