import { beforeAll, describe, expect, test } from "bun:test";
import { resolve } from "node:path";
import { readData } from "../src/builder/read.ts";
import { designColors } from "../src/builder/theme.ts";
import type { ExplorerData } from "../src/shared/types.ts";
import { columns, mapLayout } from "../src/site/layout.ts";
import { parseRoute } from "../src/site/router.ts";

const REPO = resolve(import.meta.dir, "..", "..", "..");

describe("router", () => {
  test("parses the hash addresses", () => {
    expect(parseRoute("")).toEqual({ view: "map" });
    expect(parseRoute("#/")).toEqual({ view: "map" });
    expect(parseRoute("#/phase/design")).toEqual({
      view: "element",
      kind: "phase",
      id: "design",
    });
    expect(parseRoute("#/doc/glossary/spec")).toEqual({
      view: "doc",
      id: "glossary",
      anchor: "spec",
    });
    expect(parseRoute("#/doc/s0002")).toEqual({
      view: "doc",
      id: "s0002",
      anchor: "",
    });
    expect(parseRoute("#/nothing/here").view).toBe("not-found");
    expect(parseRoute("#/phase/design/extra").view).toBe("not-found");
  });
});

describe("map layout (US1R2)", () => {
  let data: ExplorerData;
  beforeAll(async () => {
    data = await readData(REPO);
  });

  test("shows every element of the chapter tables", () => {
    const layout = mapLayout(data);
    const { phases, steps, blocks, types } = data.chapters;
    expect(layout.nodes.length).toBe(
      phases.length + steps.length + blocks.length + types.length,
    );
  });

  test("places phases and steps left to right in table order", () => {
    const layout = mapLayout(data);
    for (const kind of ["phase", "step", "block"] as const) {
      const xs = layout.nodes.filter((n) => n.kind === kind).map((n) => n.x);
      expect(xs).toEqual([...xs].sort((a, b) => a - b));
    }
  });

  test("puts a step under the phase with its name, and Close in its own column", () => {
    const cols = columns(data);
    const design = cols.find((c) => c.phase?.id === "design");
    expect(design?.step?.id).toBe("design");
    const close = cols.findIndex((c) => c.step?.id === "close");
    expect(cols[close]?.phase).toBeUndefined();
    expect(cols[close - 1]?.step?.id).toBe("verification");
  });

  test("a new table row appears with no drawing work", () => {
    const copy = structuredClone(data);
    const first = copy.chapters.blocks[0];
    if (!first) throw new Error("no blocks");
    copy.chapters.blocks.push({ ...first, id: "new-block", name: "New block" });
    expect(mapLayout(copy).nodes.some((n) => n.id === "new-block")).toBe(true);
  });

  test("draws the links between elements", () => {
    const layout = mapLayout(data);
    expect(
      layout.edges.some(
        (e) => e.from === "phase/foundation" && e.to === "phase/analysis",
      ),
    ).toBe(true);
    expect(
      layout.edges.some(
        (e) => e.from === "step/verification" && e.to === "step/close",
      ),
    ).toBe(true);
    expect(
      layout.edges.some(
        (e) => e.from === "phase/maintenance" && e.to === "phase/analysis",
      ),
    ).toBe(true);
  });
});

/** WCAG 2.2 contrast ratio. */
function contrast(a: string, b: string): number {
  const lum = (hex: string) => {
    const [r, g, b2] = [1, 3, 5].map((i) => {
      const c = parseInt(hex.slice(i, i + 2), 16) / 255;
      return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
    }) as [number, number, number];
    return 0.2126 * r + 0.7152 * g + 0.0722 * b2;
  };
  const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x) as [number, number];
  return (hi + 0.05) / (lo + 0.05);
}

describe("colors (US2R2)", () => {
  test("text pairs of both themes have a contrast of at least 4.5:1", async () => {
    const colors = designColors(
      await Bun.file(resolve(REPO, "DESIGN.md")).text(),
    );
    const pairs: [string, string][] = [];
    for (const prefix of ["", "light-"]) {
      for (const bg of ["canvas", "surface"]) {
        for (const fg of [
          "on-surface",
          "muted",
          "primary",
          "verified",
          "warning",
          "danger",
        ])
          pairs.push([prefix + fg, prefix + bg]);
      }
      pairs.push([`${prefix}on-primary`, `${prefix}primary`]);
    }
    for (const [fg, bg] of pairs) {
      const ratio = contrast(colors[fg] ?? "", colors[bg] ?? "");
      expect({ fg, bg, ok: ratio >= 4.5 }).toEqual({ fg, bg, ok: true });
    }
  });
});
