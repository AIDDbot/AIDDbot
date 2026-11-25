import { describe, expect, test } from "bun:test";
import {
  anchors,
  firstTableUnder,
  githubSlug,
  headings,
  sectionLines,
  splitFrontmatter,
  splitRow,
  toHtml,
} from "../src/builder/markdown.ts";

describe("githubSlug", () => {
  test("follows the GitHub rules", () => {
    expect(githubSlug("Metadata (`META`)")).toBe("metadata-meta");
    expect(githubSlug("H3 · Deterministic CLI")).toBe("h3--deterministic-cli");
    expect(githubSlug("What is a wiki page")).toBe("what-is-a-wiki-page");
    expect(githubSlug("[Link](x.md) text")).toBe("link-text");
  });
});

describe("headings", () => {
  test("skips fenced code and numbers duplicates", () => {
    const body = "# A\n\n```md\n## Not a heading\n```\n\n## Same\n\n## Same\n";
    expect(headings(body).map((h) => h.slug)).toEqual(["a", "same", "same-1"]);
  });

  test("anchors include HTML anchors", () => {
    expect(anchors('## Terms\n\n| <a id="spec"></a>Spec |').has("spec")).toBe(true);
  });
});

describe("tables", () => {
  test("splitRow keeps pipes in inline code", () => {
    expect(splitRow("| `a | b` | c \\| d |")).toEqual(["`a | b`", "c | d"]);
  });

  test("firstTableUnder reads only the table under the heading", () => {
    const body = "## One\n\nText.\n\n| A | B |\n| --- | --- |\n| 1 | 2 |\n\n## Two\n\n| C |\n| --- |\n| 3 |\n";
    expect(firstTableUnder(body, "one")).toEqual({ header: ["A", "B"], rows: [["1", "2"]] });
    expect(firstTableUnder(body, "missing")).toBeNull();
  });

  test("firstTableUnder does not read a table under the next heading", () => {
    expect(firstTableUnder("## One\n\nNo table.\n\n## Two\n\n| A |\n| --- |\n| 1 |\n", "one")).toBeNull();
  });
});

describe("sections and HTML", () => {
  test("sectionLines stops at a heading of the same level", () => {
    const body = "## A\n\ntext\n\n### A1\n\nmore\n\n## B\n";
    expect(sectionLines(body, "a")?.lines.join("\n")).toBe("## A\n\ntext\n\n### A1\n\nmore\n");
  });

  test("toHtml adds GitHub heading ids", () => {
    expect(toHtml("## H3 · Deterministic CLI")).toContain('id="h3--deterministic-cli"');
  });

  test("splitFrontmatter separates YAML and body", () => {
    expect(splitFrontmatter("---\nid: x\n---\n# T\n")).toEqual({ yaml: "id: x", body: "# T\n" });
    expect(splitFrontmatter("# T\n").yaml).toBeNull();
  });
});
