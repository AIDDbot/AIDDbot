import { beforeAll, describe, expect, test } from "bun:test";
import { resolve } from "node:path";
import { readData } from "../src/builder/read.ts";
import { designColors } from "../src/builder/theme.ts";
import type { Element, ExplorerData } from "../src/shared/types.ts";
import { elementCrumbs } from "../src/site/breadcrumbs.ts";
import { allElements, key } from "../src/site/data.ts";
import {
  BRAIN_KEY,
  brainLayout,
  changeLayout,
  DEFAULT_IMPACT,
  FLOW_KEY,
  MAP_HREF,
  type MapLayout,
  mapLayout,
  overviewLayout,
} from "../src/site/layout.ts";
import { parseRoute } from "../src/site/router.ts";

const REPO = resolve(import.meta.dir, "..", "..", "..");

describe("router", () => {
  test("parses the hash addresses", () => {
    expect(parseRoute("")).toEqual({ view: "map", map: "overview" });
    expect(parseRoute("#/")).toEqual({ view: "map", map: "overview" });
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

  test("s0005: parses the map and blocks addresses", () => {
    expect(parseRoute("#/map/change")).toEqual({ view: "map", map: "change" });
    expect(parseRoute("#/map/brain")).toEqual({ view: "map", map: "brain" });
    expect(parseRoute("#/blocks")).toEqual({ view: "blocks" });
    expect(parseRoute("#/map/other").view).toBe("not-found");
    expect(parseRoute("#/map/change/extra").view).toBe("not-found");
    expect(parseRoute("#/blocks/extra").view).toBe("not-found");
  });
});

let data: ExplorerData;
beforeAll(async () => {
  data = await readData(REPO);
});

const labelsOf = (layout: MapLayout, kind: string) =>
  layout.nodes
    .filter((n) => n.kind === kind)
    .sort((a, b) => a.x - b.x)
    .map((n) => n.label);
const hasEdge = (layout: MapLayout, from: string, to: string, hover = false) =>
  layout.edges.some(
    (e) =>
      e.from === from && e.to === to && e.cls.includes("hover-edge") === hover,
  );
/** The one line between two boxes, in either direction. */
const lineOf = (layout: MapLayout, a: string, b: string) =>
  layout.edges.find(
    (e) => (e.from === a && e.to === b) || (e.from === b && e.to === a),
  );
const nodeOf = (layout: MapLayout, k: string) =>
  layout.nodes.find((n) => n.key === k);
const STEPS = ["Analysis", "Design", "Implementation", "Verification", "Close"];
const PHASES = ["Foundation", "Development", "Release", "Maintenance"];

describe("overview (s0005-US1)", () => {
  let layout: MapLayout;
  beforeAll(() => {
    layout = overviewLayout(data);
  });

  test("US1R1: shows the phases in one row, the brain as one box, and the steps as boxes", () => {
    const phases = layout.nodes.filter((n) => n.kind === "phase");
    expect(new Set(phases.map((n) => n.y)).size).toBe(1);
    expect(labelsOf(layout, "phase")).toEqual(PHASES);
    const steps = layout.nodes.filter((n) => n.kind === "step");
    expect(new Set(steps.map((n) => n.y)).size).toBe(1);
    expect(labelsOf(layout, "step")).toEqual(STEPS);
    const boxes = layout.nodes.filter((n) => n.kind === "map");
    expect(boxes.length).toBe(1);
    expect(boxes[0]?.label).toBe("PROJECT BRAIN");
  });

  const boxLinks = (k: string) =>
    layout.edges.filter(
      (e) =>
        (e.from === k && e.to === BRAIN_KEY) ||
        (e.to === k && e.from === BRAIN_KEY),
    );

  test("US1R1: shows no document type and no building block", () => {
    expect(layout.nodes.some((n) => n.kind === "type")).toBe(false);
    expect(layout.nodes.some((n) => n.kind === "block")).toBe(false);
  });

  test("US1R1: keeps the feedback arrow, the step frame, and the zoom line", () => {
    expect(layout.edges.find((e) => e.cls.includes("loop-edge"))).toMatchObject(
      { from: "phase/maintenance", to: "phase/development" },
    );
    const frame = layout.frames.find((f) => f.cls === "flow-frame");
    if (!frame) throw new Error("no frame");
    for (const n of layout.nodes.filter((m) => m.kind === "step")) {
      expect(n.x).toBeGreaterThan(frame.x);
      expect(n.x + n.w).toBeLessThan(frame.x + frame.w);
      expect(n.y).toBeGreaterThan(frame.y);
    }
    expect(
      layout.edges.some(
        (e) => e.from === "phase/development" && e.to === FLOW_KEY,
      ),
    ).toBe(true);
  });

  test("US1R1: links a phase or a step to the brain box when it uses or produces a brain type", () => {
    for (const e of [...data.chapters.phases, ...data.chapters.steps]) {
      const touches = (column: string) =>
        e.fields
          .find((f) => f.column === column)
          ?.refs.some((r) => data.brain.includes(r.id)) ?? false;
      expect({ e: e.id, linked: boxLinks(key(e)).length > 0 }).toEqual({
        e: e.id,
        linked: touches("Uses") || touches("Produces"),
      });
    }
  });

  test("an element that reads and writes the brain gets one line with two heads", () => {
    for (const e of [...data.chapters.phases, ...data.chapters.steps]) {
      const touches = (column: string) =>
        e.fields
          .find((f) => f.column === column)
          ?.refs.some((r) => data.brain.includes(r.id)) ?? false;
      const links = boxLinks(key(e));
      expect(links.length).toBeLessThanOrEqual(1);
      const both = touches("Uses") && touches("Produces");
      expect({ e: e.id, both: links[0]?.cls.includes("both") ?? false }).toEqual(
        { e: e.id, both },
      );
    }
    expect(boxLinks("step/analysis")[0]?.cls).toContain("both");
  });

  test("US1R2: the brain box opens the brain map, the steps and frame the change loop map, a phase its page", () => {
    expect(nodeOf(layout, BRAIN_KEY)?.href).toBe("#/map/brain");
    expect(nodeOf(layout, "step/design")?.href).toBe("#/map/change");
    expect(layout.frames.find((f) => f.cls === "flow-frame")?.href).toBe(
      "#/map/change",
    );
    expect(nodeOf(layout, "phase/release")?.href).toBe("#/phase/release");
  });
});

describe("change loop map (s0005-US2)", () => {
  let layout: MapLayout;
  beforeAll(() => {
    layout = changeLayout(data);
  });
  const types = (l: MapLayout) =>
    l.nodes.filter((n) => n.kind === "type").map((n) => n.id);

  test("US2R1: shows the steps in table order, with no phase row and no building block", () => {
    expect(labelsOf(layout, "step")).toEqual(STEPS);
    expect(layout.nodes.some((n) => n.kind === "phase")).toBe(false);
    expect(layout.nodes.some((n) => n.kind === "block")).toBe(false);
  });

  test("US2R1: the brain row holds the brain types in catalog order, above the steps", () => {
    const stepY = nodeOf(layout, "step/analysis")?.y ?? 0;
    const above = layout.nodes.filter((n) => n.kind === "type" && n.y < stepY);
    expect(new Set(above.map((n) => n.y)).size).toBe(1);
    expect(above.sort((x, y) => x.x - y.x).map((n) => n.id)).toEqual(
      data.brain,
    );
  });

  test("uses headings and no frames, and breaks brain IDs at the hyphen", () => {
    expect(layout.frames).toEqual([]);
    expect(
      layout.labels.filter((l) => l.cls === "map-heading").map((l) => l.text),
    ).toEqual(["Project brain", "Change loop"]);
    expect(nodeOf(layout, "type/domain-model")?.lines).toEqual([
      "domain",
      "model",
    ]);
  });

  test("US2R1: change documents hang under their step", () => {
    const x = (k: string) => {
      const n = nodeOf(layout, k);
      return n ? n.x + n.w / 2 : Number.NaN;
    };
    const under: Record<string, string[]> = {
      analysis: ["spec", "feature-file"],
      implementation: ["code", "unit-test", "e2e-test", "check-report"],
      verification: ["test-report", "review-report"],
    };
    for (const [step, ids] of Object.entries(under))
      for (const id of ids) expect(x(`type/${id}`)).toBe(x(`step/${step}`));
  });

  test("US2R1: Close always shows its links to the brain, other steps on pointing", () => {
    expect(hasEdge(layout, "step/close", "type/changelog")).toBe(true);
    expect(lineOf(layout, "type/roadmap", "step/analysis")?.cls).toContain(
      "hover-edge",
    );
  });

  test("US2R2: medium is the default and shows every document type", () => {
    expect(DEFAULT_IMPACT).toBe("medium");
    for (const id of ["feature-file", "e2e-test", "test-report"])
      expect(types(layout)).toContain(id);
    expect(layout.nodes.some((n) => n.extra?.includes("required"))).toBe(
      false,
    );
  });

  test("US2R2: small hides what it skips", () => {
    const small = changeLayout(data, "small");
    for (const id of ["feature-file", "e2e-test", "test-report"])
      expect(types(small)).not.toContain(id);
    for (const id of ["spec", "code"]) expect(types(small)).toContain(id);
  });

  test("US2R2: large marks what it adds as required", () => {
    const large = changeLayout(data, "large");
    expect(nodeOf(large, "type/review-report")?.extra).toContain("required");
    expect(nodeOf(large, "type/spec")?.extra).toBeUndefined();
  });
});

describe("brain map (s0005-US2)", () => {
  let layout: MapLayout;
  beforeAll(() => {
    layout = brainLayout(data);
  });

  test("US2R3: brain types in catalog order in the middle, phases above, steps below", () => {
    const types = layout.nodes.filter((n) => n.kind === "type");
    expect(new Set(types.map((n) => n.y)).size).toBe(1);
    expect(types.sort((a, b) => a.x - b.x).map((n) => n.id)).toEqual(
      data.brain,
    );
    expect(labelsOf(layout, "phase")).toEqual(PHASES);
    expect(labelsOf(layout, "step")).toEqual(STEPS);
    const y = (kind: string) =>
      layout.nodes.find((n) => n.kind === kind)?.y ?? Number.NaN;
    expect(y("phase")).toBeLessThan(y("type"));
    expect(y("type")).toBeLessThan(y("step"));
    expect(layout.nodes.some((n) => n.kind === "block")).toBe(false);
  });

  test("uses headings and no frames, and breaks long IDs at the hyphen", () => {
    expect(layout.frames).toEqual([]);
    expect(
      layout.labels.filter((l) => l.cls === "map-heading").map((l) => l.text),
    ).toEqual(["Project loop", "Project brain", "Change loop"]);
    expect(nodeOf(layout, "type/wiki-page")?.lines).toEqual(["wiki", "page"]);
    expect(nodeOf(layout, "type/design-system")?.lines).toEqual([
      "design",
      "system",
    ]);
    expect(nodeOf(layout, "type/readme")?.lines).toEqual(["readme"]);
  });

  test("US2R3: pointing at changelog shows Close writes it and Release reads it", () => {
    expect(hasEdge(layout, "step/close", "type/changelog", true)).toBe(true);
    const release = lineOf(layout, "type/changelog", "phase/release");
    expect(release?.cls).toContain("hover-edge");
    // Release reads and writes the changelog: one line with two heads.
    expect(release?.cls).toContain("both");
  });
});

describe("parent map (s0005-US3)", () => {
  const element = (kind: string, id: string): Element => {
    const e = allElements(data).find((x) => x.kind === kind && x.id === id);
    if (!e) throw new Error(`no ${kind}/${id}`);
    return e;
  };
  const path = (kind: string, id: string) =>
    elementCrumbs(element(kind, id)).map((c) => [c.label, c.href]);

  test("US3R1: the breadcrumbs go from the overview through the parent map", () => {
    expect(path("step", "design")).toEqual([
      ["Map", "#/"],
      ["Change loop", "#/map/change"],
      ["Design", "#/step/design"],
    ]);
    expect(path("type", "glossary")).toEqual([
      ["Map", "#/"],
      ["Project brain", "#/map/brain"],
      ["glossary", "#/type/glossary"],
    ]);
    expect(path("type", "spec")[1]).toEqual(["Change loop", "#/map/change"]);
    expect(path("phase", "foundation")).toEqual([
      ["Map", "#/"],
      ["Foundation", "#/phase/foundation"],
    ]);
    expect(path("block", "skills")).toEqual([
      ["Map", "#/"],
      ["Building blocks", "#/blocks"],
      ["Skills", "#/block/skills"],
    ]);
  });

  test("US3R2: the parent map of each element draws the element", () => {
    for (const e of allElements(data)) {
      const layout = mapLayout(data, e.parent);
      expect({ key: key(e), drawn: Boolean(nodeOf(layout, key(e))) }).toEqual({
        key: key(e),
        drawn: true,
      });
    }
    expect(MAP_HREF[element("type", "glossary").parent]).toBe("#/map/brain");
    expect(MAP_HREF[element("type", "spec").parent]).toBe("#/map/change");
  });

  test("a new table row appears with no drawing work", () => {
    const copy = structuredClone(data);
    const first = copy.chapters.blocks[0];
    if (!first) throw new Error("no blocks");
    copy.chapters.blocks.push({ ...first, id: "new-block", name: "New block" });
    expect(
      mapLayout(copy, "blocks").nodes.some((n) => n.id === "new-block"),
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
