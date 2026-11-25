// Markdown helpers: frontmatter, GitHub heading slugs, sections, tables, and HTML.

export interface Heading {
  level: number;
  text: string;
  slug: string;
  /** Line index in the body. */
  line: number;
}

/** Splits the YAML frontmatter from the Markdown body. */
export function splitFrontmatter(source: string): { yaml: string | null; body: string } {
  const text = source.replace(/^﻿/, "").replace(/\r\n/g, "\n");
  const match = /^---\n([\s\S]*?)\n---\n?/.exec(text);
  if (!match) return { yaml: null, body: text };
  return { yaml: match[1] ?? "", body: text.slice(match[0].length) };
}

/** Plain text of inline Markdown or HTML: no tags, no emphasis marks, no link targets. */
export function plainText(inline: string): string {
  return inline
    .replace(/<[^>]+>/g, "")
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[*_`]/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim();
}

/** GitHub heading slug: lowercase, punctuation removed, each space becomes a hyphen. */
export function githubSlug(text: string): string {
  return plainText(text)
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\p{M}\s_-]/gu, "")
    .replace(/\s/g, "-");
}

/** Assigns unique slugs, as GitHub does: `name`, `name-1`, `name-2`. */
export class SlugCounter {
  private seen = new Map<string, number>();
  next(text: string): string {
    const base = githubSlug(text);
    const count = this.seen.get(base);
    if (count === undefined) {
      this.seen.set(base, 0);
      return base;
    }
    this.seen.set(base, count + 1);
    return `${base}-${count + 1}`;
  }
}

/** ATX headings of the body, outside fenced code blocks, with their GitHub slugs. */
export function headings(body: string): Heading[] {
  const result: Heading[] = [];
  const counter = new SlugCounter();
  let fence: string | null = null;
  body.split("\n").forEach((line, index) => {
    const fenceMatch = /^\s*(```+|~~~+)/.exec(line);
    if (fenceMatch) {
      const mark = fenceMatch[1] ?? "";
      if (fence === null) fence = mark;
      else if (mark.startsWith(fence)) fence = null;
      return;
    }
    if (fence !== null) return;
    const match = /^(#{1,6})\s+(.+?)\s*#*\s*$/.exec(line);
    if (!match) return;
    const text = match[2] ?? "";
    result.push({ level: (match[1] ?? "").length, text: plainText(text), slug: counter.next(text), line: index });
  });
  return result;
}

/** Every anchor of a body: heading slugs and HTML `<a id>` anchors. */
export function anchors(body: string): Set<string> {
  const set = new Set(headings(body).map((h) => h.slug));
  for (const match of body.matchAll(/<a\s+id="([^"]+)"/g)) set.add(match[1] ?? "");
  return set;
}

/** The lines of a heading section: from the heading to the next heading of the same or a higher level. */
export function sectionLines(body: string, slug: string): { heading: Heading; lines: string[] } | null {
  const all = headings(body);
  const index = all.findIndex((h) => h.slug === slug);
  const heading = all[index];
  if (!heading) return null;
  const lines = body.split("\n");
  const next = all.slice(index + 1).find((h) => h.level <= heading.level);
  return { heading, lines: lines.slice(heading.line, next ? next.line : lines.length) };
}

/** Splits one Markdown table row into cells. Pipes inside inline code or escaped pipes stay in the cell. */
export function splitRow(line: string): string[] {
  const trimmed = line.trim().replace(/^\|/, "").replace(/\|$/, "");
  const cells: string[] = [];
  let current = "";
  let inCode = false;
  for (let i = 0; i < trimmed.length; i++) {
    const char = trimmed[i];
    if (char === "\\" && trimmed[i + 1] === "|") {
      current += "|";
      i++;
    } else if (char === "`") {
      inCode = !inCode;
      current += char;
    } else if (char === "|" && !inCode) {
      cells.push(current.trim());
      current = "";
    } else {
      current += char;
    }
  }
  cells.push(current.trim());
  return cells;
}

export interface Table {
  header: string[];
  rows: string[][];
}

/**
 * The first table directly under a heading: after the heading and before the next heading of any level.
 * Returns null when the heading or the table is missing.
 */
export function firstTableUnder(body: string, slug: string): Table | null {
  const all = headings(body);
  const index = all.findIndex((h) => h.slug === slug);
  const heading = all[index];
  if (!heading) return null;
  const lines = body.split("\n");
  const end = all[index + 1]?.line ?? lines.length;
  let start = -1;
  for (let i = heading.line + 1; i < end; i++) {
    if (/^\s*\|/.test(lines[i] ?? "") && /^\s*\|?\s*:?-{3,}/.test(lines[i + 1] ?? "")) {
      start = i;
      break;
    }
  }
  if (start < 0) return null;
  const header = splitRow(lines[start] ?? "");
  const rows: string[][] = [];
  for (let i = start + 2; i < end && /^\s*\|/.test(lines[i] ?? ""); i++) rows.push(splitRow(lines[i] ?? ""));
  return { header, rows };
}

/** The lines of the table row that holds `<a id="anchor">`, with the table header. */
export function anchoredRow(body: string, anchor: string): string[] | null {
  const lines = body.split("\n");
  const index = lines.findIndex((l) => l.includes(`<a id="${anchor}"`));
  if (index < 0 || !/^\s*\|/.test(lines[index] ?? "")) return null;
  let top = index;
  while (top > 0 && /^\s*\|/.test(lines[top - 1] ?? "")) top--;
  return [lines[top] ?? "", lines[top + 1] ?? "", lines[index] ?? ""];
}

/** Text between the H1 and the first `##` heading: the summary of a page. */
export function summaryLines(body: string): string[] {
  const all = headings(body);
  const lines = body.split("\n");
  const h1 = all.find((h) => h.level === 1);
  const next = all.find((h) => h.level > 1);
  return lines.slice(h1 ? h1.line + 1 : 0, next ? next.line : lines.length);
}

/** Markdown to HTML with Bun.markdown. Headings get GitHub slugs. */
export function toHtml(markdown: string): string {
  const html = Bun.markdown.html(markdown, { tables: true, strikethrough: true, tasklists: true });
  const counter = new SlugCounter();
  return html.replace(/<h([1-6])>([\s\S]*?)<\/h\1>/g, (_m, level: string, inner: string) => {
    return `<h${level} id="${counter.next(inner)}">${inner}</h${level}>`;
  });
}

/** Inline Markdown (one table cell) to HTML, with no wrapping paragraph. */
export function inlineHtml(markdown: string): string {
  if (!markdown.trim()) return "";
  return toHtml(markdown)
    .trim()
    .replace(/^<p>([\s\S]*)<\/p>$/, "$1");
}

/** The inline code spans of a cell, such as the document IDs in `` `spec`, `adr` ``. */
export function codeSpans(markdown: string): string[] {
  return [...markdown.matchAll(/`([^`]+)`/g)].map((m) => m[1] ?? "");
}

export function escapeHtml(text: string): string {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
