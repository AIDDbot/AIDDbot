// Reads the documents of the content scope: META, anchors, links, and HTML.
import { existsSync } from "node:fs";
import { posix } from "node:path";
import type {
  Doc,
  DocGroup,
  LinkItem,
  Problem,
  TocEntry,
} from "../shared/types.ts";
import {
  anchors,
  escapeHtml,
  headings,
  splitFrontmatter,
  toHtml,
} from "./markdown.ts";

/** Root documents of the content scope. */
export const ROOT_FILES = [
  "README.md",
  "AGENTS.md",
  "PLAN.md",
  "DESIGN.md",
  "CHANGELOG.md",
];

/** Root documents with no META by design, and the document type that the file name gives them. */
export const NO_META_TYPES: Record<string, string> = {
  "README.md": "readme",
  "AGENTS.md": "agent-instructions",
  "CHANGELOG.md": "changelog",
};

const STATUSES = [
  "draft",
  "proposed",
  "accepted",
  "done",
  "superseded",
  "deprecated",
];
const CHANGE_TYPES = ["chore", "refactor", "fix", "feat"];
const DATE = /^\d{4}-\d{2}-\d{2}$/;

/** A document after the first read: enough to resolve links from other documents. */
export interface SourceDoc {
  id: string;
  type: string;
  title: string;
  path: string;
  group: DocGroup;
  body: string;
  anchors: Set<string>;
  meta: Record<string, unknown> | null;
  warnings: string[];
}

/** Lists the files of the content scope, as paths relative to the root, with forward slashes. */
export function contentFiles(
  root: string,
): { path: string; group: DocGroup }[] {
  const files: { path: string; group: DocGroup }[] = [];
  for (const name of ROOT_FILES)
    if (existsSync(posix.join(root, name)))
      files.push({ path: name, group: "root" });
  for (const [folder, group] of [
    ["docs/wiki", "wiki"],
    ["docs/specs", "specs"],
  ] as const) {
    // Specs live in one folder per change: docs/specs/<spec>/spec.md.
    const glob = new Bun.Glob(group === "specs" ? "**/*.md" : "*.md");
    const names = [...glob.scanSync({ cwd: posix.join(root, folder) })]
      .map((name) => name.replaceAll("\\", "/"))
      .sort();
    for (const name of names) files.push({ path: `${folder}/${name}`, group });
  }
  return files;
}

/** Checks the META fields. Returns one message for each problem. */
export function validateMeta(
  meta: Record<string, unknown>,
  knownTypes: Set<string>,
): string[] {
  const problems: string[] = [];
  for (const field of ["id", "type", "title", "status", "created", "updated"]) {
    if (typeof meta[field] !== "string" || !(meta[field] as string).trim())
      problems.push(`META field \`${field}\` is missing`);
  }
  if (
    typeof meta.type === "string" &&
    knownTypes.size > 0 &&
    !knownTypes.has(meta.type)
  ) {
    problems.push(`META type \`${meta.type}\` is not in the document catalog`);
  }
  if (typeof meta.status === "string" && !STATUSES.includes(meta.status)) {
    problems.push(`META status \`${meta.status}\` is not valid`);
  }
  for (const field of ["created", "updated"]) {
    if (typeof meta[field] === "string" && !DATE.test(meta[field] as string)) {
      problems.push(`META field \`${field}\` is not an ISO 8601 date`);
    }
  }
  if (meta.type === "spec" && !CHANGE_TYPES.includes(String(meta.change))) {
    problems.push("META field `change` is missing or not a change type");
  }
  const links = meta.links as Record<string, unknown> | undefined;
  if (!links || typeof links !== "object") {
    problems.push("META field `links` is missing");
  } else {
    for (const list of ["sources", "related", "supersedes"]) {
      if (!Array.isArray(links[list]))
        problems.push(`META field \`links.${list}\` is missing or not a list`);
    }
  }
  return problems;
}

function stem(path: string): string {
  return posix.basename(path).replace(/\..*$/, "");
}

/** First read of one document. */
export function readSource(
  path: string,
  group: DocGroup,
  knownTypes: Set<string>,
  text: string,
): SourceDoc {
  const { yaml, body } = splitFrontmatter(text);
  const warnings: string[] = [];
  let meta: Record<string, unknown> | null = null;
  const fixedType = NO_META_TYPES[path];
  if (yaml !== null) {
    try {
      const parsed = Bun.YAML.parse(yaml) as Record<string, unknown>;
      meta =
        (path === "DESIGN.md"
          ? (parsed?.aiddbot as Record<string, unknown>)
          : parsed) ?? null;
      if (meta === null)
        warnings.push("META is missing under the `aiddbot` key");
    } catch (error) {
      warnings.push(`META is not valid YAML: ${(error as Error).message}`);
    }
  } else if (!fixedType) {
    warnings.push("META is missing");
  }
  if (meta) warnings.push(...validateMeta(meta, knownTypes));
  if (
    meta &&
    group === "wiki" &&
    typeof meta.id === "string" &&
    meta.id !== stem(path)
  ) {
    warnings.push(`META id \`${meta.id}\` does not match the file name`);
  }
  const h1 = headings(body).find((h) => h.level === 1);
  const id = typeof meta?.id === "string" ? meta.id : (fixedType ?? stem(path));
  const type =
    typeof meta?.type === "string"
      ? meta.type
      : (fixedType ?? (group === "specs" ? "spec" : "wiki-page"));
  const title =
    typeof meta?.title === "string"
      ? meta.title
      : (h1?.text ?? posix.basename(path));
  return {
    id,
    type,
    title,
    path,
    group,
    body,
    anchors: anchors(body),
    meta,
    warnings,
  };
}

export type Resolved =
  | { kind: "external"; href: string }
  | { kind: "internal"; doc: SourceDoc; anchor: string; href: string }
  | { kind: "outside"; path: string }
  | { kind: "broken"; reason: string };

/** Resolves the links between documents of the content scope. */
export class LinkResolver {
  readonly byPath = new Map<string, SourceDoc>();
  readonly byId = new Map<string, SourceDoc>();

  constructor(
    private readonly root: string,
    docs: SourceDoc[],
  ) {
    for (const doc of docs) {
      this.byPath.set(doc.path, doc);
      if (!this.byId.has(doc.id)) this.byId.set(doc.id, doc);
    }
  }

  /** Resolves `href`, written in the document at `from`. */
  resolve(href: string, from: string): Resolved {
    if (/^[a-z][a-z0-9+.-]*:/i.test(href)) return { kind: "external", href };
    const [rawPath = "", rawAnchor = ""] = href.split("#");
    const anchor = decodeURIComponent(rawAnchor);
    const target = rawPath
      ? posix.normalize(
          posix.join(posix.dirname(from), decodeURIComponent(rawPath)),
        )
      : from;
    const doc = this.byPath.get(target);
    if (doc) {
      if (
        anchor &&
        !doc.anchors.has(anchor) &&
        !doc.anchors.has(anchor.toLowerCase())
      ) {
        return {
          kind: "broken",
          reason: `anchor \`#${anchor}\` not found in ${doc.path}`,
        };
      }
      return { kind: "internal", doc, anchor, href: docHref(doc.id, anchor) };
    }
    if (target.startsWith(".."))
      return {
        kind: "broken",
        reason: `${href} points outside the repository`,
      };
    if (existsSync(posix.join(this.root, target)))
      return { kind: "outside", path: target };
    return { kind: "broken", reason: `${href} not found` };
  }
}

export function docHref(id: string, anchor = ""): string {
  return anchor ? `#/doc/${id}/${anchor}` : `#/doc/${id}`;
}

/** Rewrites the links of rendered HTML. Returns the new HTML and the broken links. */
export function rewriteLinks(
  html: string,
  from: string,
  resolver: LinkResolver,
): { html: string; broken: string[] } {
  const broken: string[] = [];
  const out = html.replace(
    /<a href="([^"]*)"([^>]*)>([\s\S]*?)<\/a>/g,
    (_m, href: string, rest: string, inner: string) => {
      const decoded = href.replace(/&amp;/g, "&");
      const result = resolver.resolve(decoded, from);
      switch (result.kind) {
        case "external":
          return `<a href="${href}"${rest} target="_blank" rel="noopener">${inner}</a>`;
        case "internal":
          return `<a href="${result.href}"${rest}>${inner}</a>`;
        case "outside":
          return `<span class="outside" title="${escapeHtml(result.path)} is outside the explorer">${inner} <small>outside the explorer</small></span>`;
        case "broken":
          broken.push(result.reason);
          return `<span class="broken" title="Broken link: ${escapeHtml(decoded)}">${inner}</span>`;
      }
    },
  );
  return { html: out, broken };
}

/** Links inline code that names a document type, such as `<code>spec</code>`, to its page. Skips links and code blocks. */
export function linkTypeCodes(html: string, typeIds: Set<string>): string {
  return html
    .split(/(<a\b[\s\S]*?<\/a>|<pre[\s\S]*?<\/pre>)/)
    .map((part) =>
      /^<(a|pre)\b/.test(part)
        ? part
        : part.replace(/<code>([a-z0-9-]+)<\/code>/g, (m, id: string) =>
            typeIds.has(id) ? `<a class="ref" href="#/type/${id}">${m}</a>` : m,
          ),
    )
    .join("");
}

function linkItem(
  value: string,
  resolver: LinkResolver,
  from: string,
): { item: LinkItem; problem?: string } {
  if (/^https?:/i.test(value))
    return {
      item: {
        label: value.replace(/^https?:\/\//, ""),
        href: value,
        external: true,
      },
    };
  const byId = resolver.byId.get(value);
  if (byId)
    return {
      item: { label: byId.title, href: docHref(byId.id), external: false },
    };
  const result = resolver.resolve(value, "index.md");
  if (result.kind === "internal")
    return {
      item: { label: result.doc.title, href: result.href, external: false },
    };
  if (result.kind === "outside")
    return { item: { label: value, href: "", external: false } };
  return {
    item: { label: value, href: "", external: false },
    problem: `META link \`${value}\` in ${from} is not a known document or file`,
  };
}

/** Second read: HTML, table of contents, META links, and warnings. */
export function renderDoc(
  source: SourceDoc,
  resolver: LinkResolver,
  typeIds: Set<string>,
  problems: Problem[],
): Doc {
  const rendered = rewriteLinks(toHtml(source.body), source.path, resolver);
  const warnings = [
    ...source.warnings,
    ...rendered.broken.map((b) => `Broken link: ${b}`),
  ];
  const links = (source.meta?.links ?? {}) as Record<string, unknown>;
  const related: LinkItem[] = [];
  const sources: LinkItem[] = [];
  for (const [list, target] of [
    ["related", related],
    ["sources", sources],
  ] as const) {
    const values = Array.isArray(links[list]) ? (links[list] as unknown[]) : [];
    for (const value of values) {
      const { item, problem } = linkItem(String(value), resolver, source.path);
      target.push(item);
      if (problem) warnings.push(problem);
    }
  }
  for (const message of warnings) problems.push({ file: source.path, message });
  const toc: TocEntry[] = headings(source.body)
    .filter((h) => h.level === 2 || h.level === 3)
    .map((h) => ({ level: h.level, id: h.slug, text: h.text }));
  const meta: Record<string, string> | null = source.meta
    ? Object.fromEntries(
        ["id", "type", "change", "status", "created", "updated"]
          .filter((k) => source.meta?.[k] !== undefined)
          .map((k) => [k, String(source.meta?.[k])]),
      )
    : null;
  return {
    id: source.id,
    type: source.type,
    title: source.title,
    path: source.path,
    group: source.group,
    meta,
    html: linkTypeCodes(rendered.html, typeIds),
    toc,
    related,
    sources,
    warnings,
  };
}
