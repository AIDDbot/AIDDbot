# AIDDbot Knowledge Wiki

The wiki is the living knowledge of a project, for people and agents. Agents keep it up to date from sources. It follows [Karpathy's LLM Wiki pattern](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f). See [INTENT.md](INTENT.md) and [DOCUMENTATION-CATALOG.md](DOCUMENTATION-CATALOG.md).

Status: **draft**. The wiki and its index start when there is durable knowledge that has no home yet. In AIDDbot, the foundational documents at the root hold the knowledge for now.

## Model

Three layers:

| Layer | What | Rule |
| --- | --- | --- |
| **Sources** | Closed specs and other change documents, ADRs, raw files, external URLs. | Never edited by the wiki. Cited by the wiki. |
| **Wiki** | Synthesis pages: what the project knows now. | Maintained by agents. Every claim cites a source. |
| **Schema** | The wiki rules in this document. | Tells agents how to ingest, answer, and review. |

The wiki **synthesizes**; it does not **copy**. One fact has one home.

### What is a wiki page

A wiki page is a prose `LIVE` document about one topic.

These `LIVE` documents stay **outside** the wiki, because tools or conventions need them in a fixed place. The wiki links to them:

| Document | Why outside |
| --- | --- |
| `agent-instructions`, `readme`, `changelog` | Fixed names at the repository root. |
| `design-system` | Lives with the UI code or in a shared guide. AIDDbot uses [DESIGN.md](DESIGN.md) at the repository root. |
| `adr` | Immutable record; a source, not a synthesis. |

## Repository layout

```text
<project-root>/
├── AGENTS.md            # points agents to docs/wiki/index.md
└── docs/
    ├── wiki/
    │   ├── index.md     # catalog of pages
    │   └── <topic>.md
    ├── specs/           # specs and other change documents (sources)
    ├── adr/             # ADRs (sources)
    └── raw/             # imported files: transcripts, notes, articles (sources)
```

Git records the history of the wiki.

## Page rules

- **Flat folder.** All pages live in `docs/wiki/`. Add subfolders only when the index becomes hard to read.
- **Metadata.** Each page starts with `META` frontmatter. A wiki page's `id` is its file name without `.md` (for example, `glossary`), because there is only one page per topic.
- **Synthesis first.** The page starts with a short summary of the current state. Details follow.
- **Citations.** Every claim links to its source with a relative Markdown link. A claim without a source is marked `(unverified)`.
- **Conflicts.** When sources disagree, the page shows both with their citations under a `> [!warning] Conflict` callout. A person decides.
- **Links.** Use only standard relative Markdown links, such as `[Glossary](glossary.md)`.

## index.md

One line per page, grouped by `type`:

```markdown
## Domain
- [Glossary](glossary.md) — shared terms for people, agents, and code
```

Agents read the index first. Then they open only the pages they need.

## Operations

### 1. Ingest a source

A person or an agent gives a closed spec, a file from `docs/raw/`, a project document, or a URL.

1. Read the source.
2. Find related pages in `index.md`.
3. Update those pages, or create new ones, with citations.
4. Mark conflicts with existing claims.
5. Update `index.md`.

### 2. Answer a question

1. Read `index.md`, then the relevant pages.
2. Check the original sources where needed.
3. Answer with citations. State uncertainty.
4. If the answer adds knowledge, offer to save it as a page.

### 3. Review the wiki

Check, then fix what the sources support. Flag the rest for a person.

- Claims with no source, or with sources that no longer say it.
- Conflicts between pages.
- Pages missing from `index.md`, and orphan pages.
- Broken links and invalid `META`.

## Sources

- **`docs/raw/` is immutable.** Files are added, never edited or deleted.
- Cite project documents in place. Do not copy them to `docs/raw/`.
- Cite external references by URL. Save a local copy only when the page may change or disappear; record the original URL and capture date in its frontmatter.

## Access

- **Agents**: `agent-instructions` says: "For project knowledge, start at `docs/wiki/index.md`."
- **People**: any Markdown editor. On GitHub, links work as they are.

## Deferred

These ideas wait for a real need. See the [future ideas](PLAN.md#future-ideas).

- A `log.md` of wiki operations. Git is the history.
- Automatic ingest when a change closes.
- `META` validation with the AIDDbot CLI.
