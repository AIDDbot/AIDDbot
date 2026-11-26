---
id: explorer-development
type: page
title: AIDDbot Explorer Development
status: draft
created: 2026-11-25
updated: 2026-11-26
links:
  sources:
    - docs/product/specs/s0002-web-knowledge-explorer/s0002.spec.md
    - docs/product/specs/s0003-two-loop-lifecycle/s0003.spec.md
    - docs/product/specs/s0005-layered-maps/s0005.spec.md
    - docs/product/specs/s0006-publish-knowledge-explorer/s0006.spec.md
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

How we build the [knowledge explorer](../product/glossary.md#knowledge-explorer), a static web site that presents the AIDDbot process to people. It reads original documents from the project brain. It stays in this repository. [`s0002`](../product/specs/s0002-web-knowledge-explorer/s0002.spec.md)

Status: **draft**.

## Commands

Run them from the repository root. The explorer is the only package, so there is no Bun workspace yet. [Scaffolding](scaffolding.md#when-each-folder-appears)

| Task | Command |
| --- | --- |
| Install the explorer dependencies (once) | `bun run explorer:install` |
| Build the site in `packages/explorer/dist/` | `bun run explorer:build` |
| Build and publish the site to GitHub Pages | `bun run explorer:publish` |
| Serve the site at `http://localhost:4173/` and build it again on each change. A change to the builder code restarts the server. | `bun run explorer:dev` |
| Type-check | `bunx tsc --noEmit` in `packages/explorer/` |
| Test | `bun test` in `packages/explorer/` |
| Lint | None yet (see the [open point](#open-points)) |

The build accepts `--root <repository>` and `--out <folder>`. The site works from any folder of a static file server, because all its paths are relative and the views use hash addresses.

## Publication

Push the changes you want to publish to `main`. When you want to update the [public explorer](https://aiddbot.github.io/AIDDbot/), run `bun run explorer:publish` from the repository root. The script needs Git access to push to `origin`. It fetches `origin/main`, installs the locked dependencies, and builds that commit in a temporary checkout on your machine.

The push to `gh-pages` starts the deployment. That branch holds the generated site. Its commit message records the source commit. In **Settings → Pages**, GitHub Pages uses **Deploy from a branch**, with `gh-pages` and `/(root)` selected. The `.nojekyll` file tells Pages to serve the generated files as they are. [GitHub Pages publishing source](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site#publishing-from-a-branch)

## Folders

```text
packages/explorer/
├── package.json            # Pinned dependencies and the build, dev, and test scripts
├── tsconfig.json
├── src/
│   ├── build.ts            # Entry point of the build
│   ├── dev.ts              # Development server
│   ├── publish.ts          # Builds a source commit and pushes the site to gh-pages
│   ├── shared/types.ts     # The data file format, shared by the builder and the site
│   ├── builder/            # Runs on Bun: reads the documents and writes the site
│   └── site/               # Runs in the browser: HTML, CSS, and custom elements
├── test/                   # bun:test tests
└── dist/                   # Build output. Git ignores it.
```

## Brain contract

The builder reads seven tables. Each one is the first table under a fixed heading. The column names are fixed.

| Table | Heading anchor | Columns |
| --- | --- | --- |
| Lifecycle phases | [`intent.md#lifecycle-phases`](../product/intent.md#lifecycle-phases) | `#`, `Phase`, `Work`, `Uses`, `Produces` |
| Change flow | [`documentation-catalog.md#change-flow`](../process/documentation-catalog.md#change-flow) | `#`, `Step`, `Work`, `Uses`, `Produces` |
| Impact levels | [`documentation-catalog.md#impact-levels`](../process/documentation-catalog.md#impact-levels) | `Impact`, `When`, `Flow`, `Skips`, `Adds` |
| Building blocks | [`intent.md#building-blocks`](../product/intent.md#building-blocks) | `Block`, `Role`, `Relations` |
| Document catalog | [`documentation-catalog.md#document-catalog`](../process/documentation-catalog.md#document-catalog) | `ID`, `Document`, `Life`, `Form`, `Relevance`, `Standards`, `Purpose` |
| Form tag | [`documentation-catalog.md#form`](../process/documentation-catalog.md#form) | `Code`, `Form`, `Rule` |
| Status use | [`documentation-catalog.md#status-use`](../process/documentation-catalog.md#status-use) | `Status`, `Meaning`, `Set in`, `Used by` |

Rules:

- **ID columns.** `Uses`, `Produces`, `Used by`, `Skips`, and `Adds` hold document IDs in backticks. Plain text is allowed next to them, such as "`code`, and docs".
- **Name columns.** `Relations` and `Set in` hold a comma list. Each item is a document ID in backticks, or the name of a phase, a step, or a block. Phase and step names are unique.
- **Links between elements.** Every step links to the phase whose row links to the change flow: Development. No phase name is written in the code. Every reference links both elements.
- **Form.** Each catalog row holds one code of the Form tag table in backticks. A missing `Form` column or an unknown value stops the build.
- **Project brain.** The brain map shows the original document types in catalog order. Use rows with Form `DOC` and without the `LLMWIKI` standard. This includes change documents. Life still determines which types can have a step as their owner on the change map.
- **Impact levels.** `Skips` names the document types that the change loop map hides for the level. `Adds` names the document types that it marks as required. The level name is the code in backticks of the `Impact` cell.
- **Sections.** A relative link in a row cell adds the linked section to the page of the element. A link to a glossary anchor adds a glossary term. The page also shows the glossary term with the ID or the name of the element, and, for a document type, the catalog section with its ID, such as `#spec`.
- **Errors.** A missing heading or table, a renamed or missing column, an unknown document ID, an unknown Form value, or an unknown name stops the build. The error names the file and the problem.
- **Smaller problems.** A missing or invalid `META`, a broken relative link, or an unknown `links` value does not stop the build. The build lists each one with its file. The document shows a warning.

A change to these headings or columns needs a change to the builder in the same commit. [Page rules](../process/knowledge-wiki.md#page-rules)

## Content scope

| Group | Files |
| --- | --- |
| Process | `docs/process/*.md` |
| Product | `docs/product/*.md` |
| Technology | `docs/technology/*.md` |
| Root | `README.md`, `AGENTS.md`, `ROADMAP.md`, `DESIGN.md`, `CHANGELOG.md` |
| Specs | `docs/product/specs/**/*.md` |

- The folder gives the [Kind](../process/documentation-catalog.md#kind) of a page. Specs and their change documents have kind `PRODUCT`.
- The explorer does not read `docs/wiki/`. The wiki is the agent map of the brain, and the explorer is the map for people. A link to `docs/wiki/index.md` shows as outside the explorer.
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

CHANGE     │ readme  glossary  page  agents  roadmap  adr  ... │
LOOP       Analysis ► Design ► Implementation ► Verification ► Close
           spec       ...       code             test-report
           [ small | medium | large ]

BRAIN      Foundation  Development  Release  Maintenance
           │ readme  glossary  page  agents  roadmap  spec  ... │
           Analysis    Design   Implementation   Verification   Close
```

- **Overview.** The phases form the top row, in table order. A dashed arrow, the feedback loop, goes from the last phase to the phase that holds the change flow. The brain is one prominent box with its name only. The steps form the bottom row, in table order, inside a frame. A zoom line goes from the phase that holds the change flow to the frame. A link joins a phase or a step to the brain box when its `Uses` or `Produces` holds a brain document type. An element that reads and writes the brain gets one line with two heads. The overview shows no document type and no building block.
- **Clicks on the overview.** A phase opens its page. The brain box opens the brain map. The change loop frame or a step opens the change loop map.
- **Change loop map.** The brain document types with no owning step form the top row in catalog order. The steps form the next row. Change documents and other outputs hang under the first step that produces them, or else under the first step that uses them. Living brain document types have no owning step. The map always draws the links from the last step to the top row. Other links to that row show when a person points at a step.
- **Impact filter.** The change loop map has a selector with the levels of the [impact levels](../process/documentation-catalog.md#impact-levels) table. The default is `medium`. A level hides the document types in its `Skips` cell and marks the document types in its `Adds` cell as required.
- **Brain map.** The phases form the top row, the brain document types the middle row, and the steps the bottom row. Each row has a heading: Project loop, Project brain, and Change loop. The map has no frames. An ID with a hyphen shows in two lines, such as `feature-file`. A person who points at an element sees only its active links: who writes and who reads each brain document type. The arrow heads of these links are larger than the heads of the main arrows.
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

- No linter runs yet. Bun 1.4.5 has no `bun lint`, and the project waits for the Bun linter. [CLI development](cli-development.md)
- `Bun.markdown` heading ids are not GitHub slugs. The builder adds its own.
- The logo and the favicon load from the author's site. Offline, the header and the browser tab show no icon.
