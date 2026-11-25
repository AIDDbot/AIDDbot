import { beforeAll, describe, expect, test } from "bun:test";
import { resolve } from "node:path";
import { readData } from "../src/builder/read.ts";
import { designColors } from "../src/builder/theme.ts";
import type { ExplorerData } from "../src/shared/types.ts";
import { FLOW_KEY, type MapLayout, mapLayout } from "../src/site/layout.ts";
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

describe("map layout (s0003-US1)", () => {
  let data: ExplorerData;
  let layout: MapLayout;
  beforeAll(async () => {
    data = await readData(REPO);
    layout = mapLayout(data);
  });
  const labelsOf = (kind: string) =>
    layout.nodes
      .filter((n) => n.kind === kind)
      .sort((a, b) => a.x - b.x)
      .map((n) => n.label);
  const has = (from: string, to: string, hover = false) =>
    layout.edges.some(
      (e) =>
        e.from === from &&
        e.to === to &&
        e.cls.includes("hover-edge") === hover,
    );

  test("shows every element of the chapter tables once", () => {
    const { phases, steps, blocks, types } = data.chapters;
    expect(layout.nodes.length).toBe(
      phases.length + steps.length + blocks.length + types.length,
    );
    const keys = layout.nodes.map((n) => `${n.kind}/${n.id}`);
    expect(new Set(keys).size).toBe(keys.length);
  });

  test("US1R1: the project loop shows the phases in one row, with feedback to Development", () => {
    const phases = layout.nodes.filter((n) => n.kind === "phase");
    expect(new Set(phases.map((n) => n.y)).size).toBe(1);
    expect(labelsOf("phase")).toEqual([
      "Foundation",
      "Development",
      "Release",
      "Maintenance",
    ]);
    const loop = layout.edges.find((e) => e.cls.includes("loop-edge"));
    expect(loop).toMatchObject({
      from: "phase/maintenance",
      to: "phase/development",
    });
  });

  test("US1R2: the change loop shows the steps in one framed row, zoomed from Development", () => {
    const steps = layout.nodes.filter((n) => n.kind === "step");
    expect(new Set(steps.map((n) => n.y)).size).toBe(1);
    expect(labelsOf("step")).toEqual([
      "Analysis",
      "Design",
      "Implementation",
      "Verification",
      "Close",
    ]);
    const flow = layout.flow;
    if (!flow) throw new Error("no frame");
    for (const n of steps) {
      expect(n.x).toBeGreaterThan(flow.x);
      expect(n.x + n.w).toBeLessThan(flow.x + flow.w);
      expect(n.y).toBeGreaterThan(flow.y);
    }
    expect(
      layout.edges.some(
        (e) =>
          e.from === "phase/development" &&
          e.to === FLOW_KEY &&
          e.cls.includes("zoom-edge"),
      ),
    ).toBe(true);
  });

  test("US1R2: each phase and step name shows once", () => {
    const names = layout.nodes
      .filter((n) => n.kind === "phase" || n.kind === "step")
      .map((n) => n.label);
    expect(new Set(names).size).toBe(names.length);
  });

  test("US1R3: the brain holds the brain types in catalog order, between the two loops", () => {
    const inBrain = layout.nodes.filter(
      (n) =>
        n.kind === "type" &&
        n.y > layout.brain.y &&
        n.y + n.h < layout.brain.y + layout.brain.h,
    );
    expect(inBrain.sort((a, b) => a.x - b.x).map((n) => n.id)).toEqual(
      data.brain,
    );
    for (const id of ["code", "unit-test", "e2e-test", "spec"])
      expect(inBrain.some((n) => n.id === id)).toBe(false);
    const phaseY = layout.nodes.find((n) => n.kind === "phase")?.y ?? 0;
    expect(layout.brain.y).toBeGreaterThan(phaseY);
    expect(layout.brain.y + layout.brain.h).toBeLessThan(layout.flow?.y ?? 0);
  });

  test("s0004-US1R3: the brain band has the label Project brain", () => {
    const label = layout.labels.find((l) => l.text === "Project brain");
    expect(label?.y).toBeGreaterThan(layout.brain.y);
    expect(label?.y).toBeLessThan(layout.brain.y + layout.brain.h);
  });

  test("US1R3: change documents hang under their step", () => {
    const x = (kind: string, id: string) => {
      const n = layout.nodes.find((m) => m.kind === kind && m.id === id);
      return n ? n.x + n.w / 2 : Number.NaN;
    };
    const under: Record<string, string[]> = {
      analysis: ["spec", "feature-file"],
      implementation: ["code", "unit-test", "e2e-test", "check-report"],
      verification: ["test-report", "review-report"],
    };
    for (const [step, ids] of Object.entries(under))
      for (const id of ids) expect(x("type", id)).toBe(x("step", step));
  });

  test("US1R4: the links of the phases and of Close to the brain always show", () => {
    expect(has("step/close", "type/changelog")).toBe(true);
    expect(has("type/changelog", "phase/release")).toBe(true);
    for (const id of ["readme", "glossary", "wiki-page", "agents"])
      expect(has("phase/foundation", `type/${id}`)).toBe(true);
  });

  test("US1R4: the links of the other steps show on pointing", () => {
    expect(has("type/roadmap", "step/analysis", true)).toBe(true);
    expect(has("type/roadmap", "step/analysis")).toBe(false);
  });

  test("a new table row appears with no drawing work", () => {
    const copy = structuredClone(data);
    const first = copy.chapters.blocks[0];
    if (!first) throw new Error("no blocks");
    copy.chapters.blocks.push({ ...first, id: "new-block", name: "New block" });
    expect(mapLayout(copy).nodes.some((n) => n.id === "new-block")).toBe(true);
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
          "accent",
          "verified",
          "warning",
          "danger",
        ])
          pairs.push([prefix + fg, prefix + bg]);
      }
      pairs.push([`${prefix}on-primary`, `${prefix}primary`]);
      pairs.push([`${prefix}on-accent`, `${prefix}accent`]);
    }
    for (const [fg, bg] of pairs) {
      const ratio = contrast(colors[fg] ?? "", colors[bg] ?? "");
      expect({ fg, bg, ok: ratio >= 4.5 }).toEqual({ fg, bg, ok: true });
    }
  });
});
