// One diagram template for each element kind. The tables fill them, so a new row gets its diagram.
import type { Element, ExplorerData, Item, Ref } from "../shared/types.ts";
import { elementHref, fieldOf, stepsFor } from "./data.ts";
import { defs, fit, svg } from "./svg.ts";

const W = 760;

interface Box {
  x: number;
  y: number;
  w: number;
  h: number;
}

class Canvas {
  readonly root: SVGSVGElement;
  private height = 0;

  constructor(label: string) {
    this.root = svg(
      "svg",
      { class: "diagram", role: "group", "aria-label": label },
      defs(),
    );
  }

  /** A box. With a ref, the box links to the page of that element. */
  chip(box: Box, label: string, step: number, cls: string, ref?: Ref): Box {
    const isType = ref?.kind === "type" || cls.includes("type");
    const shape = svg("rect", {
      x: box.x,
      y: box.y,
      width: box.w,
      height: box.h,
      rx: isType ? 6 : 10,
    });
    const text = svg(
      "text",
      {
        x: box.x + box.w / 2,
        y: box.y + box.h / 2,
        "text-anchor": "middle",
        "dominant-baseline": "central",
      },
      fit(label, box.w, isType ? 7.2 : 7.5),
    );
    const title = svg("title", {}, label);
    const kindCls = ref ? ` ${ref.kind}` : "";
    const node = ref
      ? svg(
          "a",
          {
            href: elementHref(ref),
            class: `node ${cls}${kindCls}`,
            "data-step": step,
          },
          title,
          shape,
          text,
        )
      : svg(
          "g",
          { class: `node ${cls}`, "data-step": step },
          title,
          shape,
          text,
        );
    this.root.append(node);
    this.height = Math.max(this.height, box.y + box.h);
    return box;
  }

  edge(
    d: string,
    step: number,
    cls = "",
    label?: { x: number; y: number; text: string },
  ) {
    this.root.append(
      svg("path", {
        class: `edge ${cls}`,
        d,
        "data-step": step,
        "marker-end": "url(#arrow)",
      }),
    );
    if (label) this.text(label.x, label.y, label.text, step, "edge-label");
  }

  text(
    x: number,
    y: number,
    text: string,
    step: number,
    cls = "diagram-label",
    anchor = "start",
  ) {
    this.root.append(
      svg(
        "text",
        { x, y, class: cls, "data-step": step, "text-anchor": anchor },
        text,
      ),
    );
    this.height = Math.max(this.height, y + 6);
  }

  done(): SVGSVGElement {
    this.root.setAttribute("viewBox", `0 0 ${W} ${this.height + 16}`);
    return this.root;
  }
}

const rightOf = (b: Box) => ({ x: b.x + b.w, y: b.y + b.h / 2 });
const leftOf = (b: Box) => ({ x: b.x, y: b.y + b.h / 2 });
const curve = (a: { x: number; y: number }, b: { x: number; y: number }) => {
  const dx = (b.x - a.x) / 2;
  return `M${a.x},${a.y} C${a.x + dx},${a.y} ${b.x - dx},${b.y} ${b.x - 2},${b.y}`;
};

function neighbours(list: Element[], element: Element) {
  const i = list.findIndex((e) => e.id === element.id);
  return { prev: list[i - 1], next: list[i + 1] };
}

const asRef = (e: Element): Ref => ({ kind: e.kind, id: e.id, label: e.name });

/** Lays out a row of item chips from x0, wrapping at the width. */
function itemRow(
  c: Canvas,
  items: Item[],
  x0: number,
  y: number,
  step: number,
): number {
  let x = x0;
  let row = y;
  if (items.length === 0) {
    c.text(x0, y + 18, "—", step, "diagram-muted");
    return y + 28;
  }
  items.forEach((item, i) => {
    const w = Math.min(220, Math.max(96, item.label.length * 8 + 24));
    if (x + w > W - 10) {
      x = x0;
      row += 38;
    }
    c.chip(
      { x, y: row, w, h: 28 },
      item.label,
      step + i * 0.5,
      item.ref ? "chip" : "chip plain",
      item.ref,
    );
    x += w + 10;
  });
  return row + 28;
}

/** The shared template of phases and steps: neighbours on top, `Uses` on the left, `Produces` on the right. */
function flowDiagram(
  element: Element,
  list: Element[],
  label: string,
  parent?: Element,
): { c: Canvas; center: Box; bottom: number } {
  const c = new Canvas(`Diagram of the ${element.name} ${label}`);
  const { prev, next } = neighbours(list, element);
  const uses = fieldOf(element, "Uses")?.items ?? [];
  const produces = fieldOf(element, "Produces")?.items ?? [];
  const rows = Math.max(uses.length, produces.length, 1);
  const top = 70;
  const centerY = top + (rows * 40) / 2 - 25;
  const center = c.chip(
    { x: W / 2 - 80, y: centerY, w: 160, h: 50 },
    element.name,
    0,
    `center ${element.kind}`,
  );
  if (prev) {
    c.chip(
      { x: 30, y: 14, w: 130, h: 28 },
      `◄ ${prev.name}`,
      1,
      "side",
      asRef(prev),
    );
  }
  if (next) {
    c.chip(
      { x: W - 160, y: 14, w: 130, h: 28 },
      `${next.name} ►`,
      1,
      "side",
      asRef(next),
    );
  }
  if (parent)
    c.chip(
      { x: W / 2 - 95, y: 14, w: 190, h: 28 },
      `Phase: ${parent.name}`,
      1,
      "chip",
      asRef(parent),
    );
  c.text(30, top - 8, "Uses", 2);
  c.text(W - 30, top - 8, "Produces", 3, "diagram-label", "end");
  uses.forEach((item, i) => {
    const b = c.chip(
      { x: 30, y: top + i * 40, w: 170, h: 30 },
      item.label,
      2 + i * 0.3,
      item.ref ? "chip" : "chip plain",
      item.ref,
    );
    c.edge(curve(rightOf(b), leftOf(center)), 2.2 + i * 0.3);
  });
  produces.forEach((item, i) => {
    const b = c.chip(
      { x: W - 200, y: top + i * 40, w: 170, h: 30 },
      item.label,
      3.5 + i * 0.3,
      item.ref ? "chip" : "chip plain",
      item.ref,
    );
    c.edge(curve(rightOf(center), leftOf(b)), 3.3 + i * 0.3, "accent");
  });
  if (uses.length === 0) c.text(30, top + 18, "—", 2, "diagram-muted");
  if (produces.length === 0)
    c.text(W - 30, top + 18, "—", 3, "diagram-muted", "end");
  return { c, center, bottom: Math.max(top + rows * 40, center.y + center.h) };
}

function phaseDiagram(data: ExplorerData, phase: Element): SVGSVGElement {
  const { c, center, bottom } = flowDiagram(phase, data.chapters.phases, "phase");
  if (phase.id === data.flowPhase) {
    // The phase that holds the change flow opens into its steps.
    const steps = data.chapters.steps;
    const y = bottom + 50;
    c.edge(`M${W / 2},${center.y + center.h} L${W / 2},${y - 2}`, 4, "dashed");
    c.text(30, y - 10, "Steps of each change", 4);
    const w = (W - 60 - 10 * (steps.length - 1)) / Math.max(1, steps.length);
    steps.forEach((step, i) => {
      const box = c.chip(
        { x: 30 + i * (w + 10), y, w, h: 34 },
        step.name,
        4.5 + i * 0.3,
        "chip",
        asRef(step),
      );
      if (i > 0)
        c.edge(
          `M${box.x - 10},${y + 17} L${box.x - 2},${y + 17}`,
          4.5 + i * 0.3,
        );
    });
  }
  return c.done();
}

function stepDiagram(data: ExplorerData, step: Element): SVGSVGElement {
  const parent = data.chapters.phases.find((p) => p.id === data.flowPhase);
  return flowDiagram(step, data.chapters.steps, "step", parent).c.done();
}

function blockDiagram(_data: ExplorerData, block: Element): SVGSVGElement {
  const c = new Canvas(`Diagram of the ${block.name} building block`);
  const items = fieldOf(block, "Relations")?.items ?? [];
  const groups: { title: string; verb: string; items: Item[] }[] = [
    {
      title: "Blocks",
      verb: "uses",
      items: items.filter((i) => i.ref?.kind === "block"),
    },
    {
      title: "Phases and steps",
      verb: "runs in",
      items: items.filter(
        (i) => i.ref?.kind === "phase" || i.ref?.kind === "step",
      ),
    },
    {
      title: "Documents",
      verb: "touches",
      items: items.filter((i) => i.ref?.kind === "type"),
    },
  ].filter((g) => g.items.length > 0);
  // Each group is one row of chips on the right. One arrow goes from the block to each row.
  const x0 = 300;
  let y = 30;
  const rows: {
    y: number;
    bottom: number;
    group: (typeof groups)[number];
    step: number;
  }[] = [];
  groups.forEach((group, gi) => {
    const step = 1 + gi * 1.5;
    c.text(x0, y, group.title, step);
    const bottom = itemRow(c, group.items, x0, y + 10, step + 0.3);
    rows.push({ y: y + 10, bottom, group, step });
    y = bottom + 34;
  });
  const top = 30;
  const height = Math.max(50, y - 34 - top);
  const center = c.chip(
    { x: 24, y: top + height / 2 - 25, w: 170, h: 50 },
    block.name,
    0,
    "center block",
  );
  for (const row of rows) {
    const target = { x: x0 - 12, y: row.y + 14 };
    c.edge(curve(rightOf(center), target), row.step, "", {
      x: x0 - 64,
      y: target.y - 12,
      text: row.group.verb,
    });
  }
  if (groups.length === 0)
    c.text(x0, 70, "No relations in the table.", 1, "diagram-muted");
  return c.done();
}

const items = (refs: Ref[]): Item[] =>
  refs.map((r) => ({ label: r.label, ref: r }));

function typeDiagram(data: ExplorerData, type: Element): SVGSVGElement {
  const c = new Canvas(`Diagram of the status cycle of ${type.id}`);
  const statuses = data.statuses.filter((s) => s.usedBy.includes(type.id));
  let y = 30;
  if (statuses.length === 0) {
    c.chip({ x: 30, y, w: 200, h: 44 }, type.id, 0, "center type");
    c.text(
      250,
      y + 27,
      "No status: this document type has no META.",
      1,
      "diagram-muted",
    );
    y += 70;
  } else {
    c.text(30, 20, "Status cycle", 0);
    // The statuses follow the table order. After `accepted`, each later status is an end: they branch.
    const accepted = statuses.findIndex((s) => s.status === "accepted");
    const line = accepted >= 0 ? statuses.slice(0, accepted + 1) : statuses;
    const ends = accepted >= 0 ? statuses.slice(accepted + 1) : [];
    const boxes: Box[] = [];
    line.forEach((s, i) => {
      const b = c.chip(
        { x: 30 + i * 190, y: 36, w: 140, h: 40 },
        s.status,
        i * 1.2,
        "status",
      );
      boxes.push(b);
      if (i > 0) {
        const prev = boxes[i - 1] as Box;
        c.edge(
          `M${prev.x + prev.w},${prev.y + 20} L${b.x - 2},${b.y + 20}`,
          i * 1.2 - 0.4,
        );
      }
      const set = s.setIn.map((r) => r.label).join(", ");
      c.text(
        b.x + b.w / 2,
        b.y + b.h + 18,
        `set in ${set}`,
        i * 1.2 + 0.3,
        "edge-label",
        "middle",
      );
    });
    const last = boxes.at(-1) as Box;
    ends.forEach((s, i) => {
      const x = last.x + 190;
      const b = c.chip(
        { x, y: 36 + i * 64, w: 140, h: 40 },
        s.status,
        line.length * 1.2 + i,
        "status",
      );
      c.edge(curve(rightOf(last), leftOf(b)), line.length * 1.2 + i - 0.4);
      c.text(
        b.x + b.w / 2,
        b.y + b.h + 18,
        `set in ${s.setIn.map((r) => r.label).join(", ")}`,
        line.length * 1.2 + i + 0.3,
        "edge-label",
        "middle",
      );
    });
    y = 36 + Math.max(1, ends.length) * 64 + 20;
  }
  const step0 = statuses.length * 1.2 + 1;
  const rows: [string, Item[]][] = [
    ["Produced in", items(stepsFor(data, type.id, "Produces"))],
    ["Used in", items(stepsFor(data, type.id, "Uses"))],
  ];
  if (data.brain.includes(type.id))
    rows.unshift(["On the map", [{ label: "Project brain" }]]);
  else if (type.owner)
    rows.unshift(["On the map under", items([type.owner])]);
  rows.forEach(([title, refs], i) => {
    c.text(30, y + 18, title, step0 + i);
    itemRow(
      c,
      refs,
      200,
      y,
      step0 + i,
    );
    y += 42;
  });
  return c.done();
}

export function diagram(data: ExplorerData, element: Element): SVGSVGElement {
  switch (element.kind) {
    case "phase":
      return phaseDiagram(data, element);
    case "step":
      return stepDiagram(data, element);
    case "block":
      return blockDiagram(data, element);
    case "type":
      return typeDiagram(data, element);
  }
}
