# AIDDbot Knowledge Wiki

The wiki is the living knowledge of the project, for people and agents. Agents keep it up to date from sources. It follows [Karpathy's LLM Wiki pattern](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f). See [INTENT.md](INTENT.md) and [DOCUMENTATION-CATALOG.md](DOCUMENTATION-CATALOG.md).

Status: **draft**.

## Model

Three layers:

| Layer | What | Rule |
| --- | --- | --- |
| **Sources** | Frozen change documents (`spec`, `impl-plan`, `review-report`…), ADRs, decision notes, raw files, external URLs. | Never edited by the wiki. Cited by the wiki. |
| **Wiki** | Synthesis pages: what the project knows now. | Maintained by agents. Every claim cites a source. |
| **Schema** | The wiki skill and these conventions. | Tells agents how to ingest, answer, and review. |

The wiki **synthesizes**; it does not **copy**. One fact has one home.

### What is a wiki page

Prose `LIVE` documents that hold project knowledge are wiki pages:

`glossary` · `business-rules` · `domain-model` · `vision` · `process-model` · `quality-attrs` · `architecture` · `er-model` · `runbook` · `tech-debt` · `wiki-page` (any other topic)

These `LIVE` documents stay **outside** the wiki, because tools or conventions need them in a fixed place. The wiki links to them:

| Document | Why outside |
| --- | --- |
| `agent-instructions`, `readme`, `changelog` | Fixed names at the repository root. |
| `conventions` | Read by agents and tools at the start of every task. |
| `api-contract`, `event-contract`, `data-schema` | Machine-readable formats used by tools. |
| `gherkin` | Executable; lives with the tests. |
| `design-system` | Usually lives with the UI code (for example, Storybook). |
| `adr` | Immutable record; a source, not a synthesis. |

## Repository layout

```text
<project-root>/
├── AGENTS.md            # points agents to docs/wiki/index.md
├── README.md
├── CHANGELOG.md
└── docs/
    ├── wiki/
    │   ├── index.md     # catalog of pages
    │   ├── log.md       # append-only history of wiki operations
    │   ├── glossary.md
    │   ├── business-rules.md
    │   ├── domain-model.md
    │   └── <topic>.md
    ├── specs/           # spec, impl-plan, review-report (CHG, sources)
    ├── adr/             # adr (sources)
    ├── decisions/       # decision-note (sources)
    └── raw/             # imported files: transcripts, notes, articles (sources)
```

The folders under `docs/` other than `wiki/` are provisional. The catalog will fix them.

## Page rules

- **Flat folder.** All pages live in `docs/wiki/`. Add subfolders only when the index becomes hard to read.
- **Metadata.** Each page starts with `META` frontmatter. A wiki page's `id` is its file name without `.md` (for example, `glossary`), because there is only one page per topic.
- **Synthesis first.** The page starts with a short summary of the current state. Details follow.
- **Citations.** Every claim links to its source with a relative Markdown link. A claim without a source is marked `(unverified)`.
- **Conflicts.** When sources disagree, the page shows both with their citations under a `> [!warning] Conflict` callout. A person decides.
- **Links.** Standard relative Markdown links only, such as `[Orders](orders.md)`. No wikilinks.

## index.md

One line per page, grouped by `type`:

```markdown
## Domain
- [Glossary](glossary.md) — shared terms for people, agents, and code
- [Orders](orders.md) — order lifecycle, states, and rules
```

Agents read the index first. Then they open only the pages they need.

## log.md

Append-only. One entry per operation, newest last. The fixed prefix makes the file easy to search with `grep`:

```markdown
## [2026-11-24] ingest | spec-0007 — Add order cancellation
- Updated: orders.md, business-rules.md, glossary.md
- Conflicts: none
```

Operations: `ingest`, `answer`, `review`.

## Operations

All three operations are part of **one AIDDbot skill**.

### 1. Ingest a source

Triggers:

- **Automatic**: when a change closes (`aiddbot doc close <id>`), the skill ingests its `spec` and related documents.
- **Manual**: a person gives a file from `docs/raw/`, a project document, or a URL.

Steps:

1. Read the source.
2. Find related pages in `index.md`.
3. Update those pages, or create new ones, with citations.
4. Mark conflicts with existing claims.
5. Update `index.md` and append to `log.md`.

### 2. Answer a question

1. Read `index.md`, then the relevant pages.
2. Check the original sources where needed.
3. Answer with citations. State uncertainty.
4. If the answer adds knowledge, offer to save it as a page (`answer` entry in `log.md`).

### 3. Review the wiki

Check, then fix what the sources support. Flag the rest for a person.

- Claims with no source, or with sources that no longer say it.
- Conflicts between pages.
- Pages missing from `index.md`, and orphan pages.
- Broken links and invalid `META`: run `aiddbot doc validate docs/wiki` ([SCRIPT-TOOLCHAIN.md](SCRIPT-TOOLCHAIN.md#commands-provisional)).

## Sources

- **`docs/raw/` is immutable.** Files are added, never edited or deleted.
- Cite project documents in place. Do not copy them to `docs/raw/`.
- Cite external references by URL. Save a local copy only when the page may change or disappear; record the original URL and capture date in its frontmatter.

## Access

- **Agents**: `agent-instructions` says: "For project knowledge, start at `docs/wiki/index.md`."
- **People**: any Markdown editor. On GitHub, links work as they are.

### Optional: Obsidian

Open the project root as a vault, so Obsidian sees the wiki and its sources. [Open a folder as a vault](https://help.obsidian.md/vault)

Under **Settings → Files and links**: [Link settings](https://help.obsidian.md/settings#Files%20and%20links)

- **Use Wikilinks**: off.
- **New link format**: relative path to file.

[Backlinks](https://help.obsidian.md/plugins/backlinks) and the [graph view](https://help.obsidian.md/plugins/graph) work with standard Markdown links.
