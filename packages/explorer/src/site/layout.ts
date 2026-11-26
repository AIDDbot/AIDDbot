// Places every element of the maps by rules, from the table order. Nobody draws a map by hand.
import type { Element, ExplorerData, Kind, MapId } from "../shared/types.ts";

/** A box of a map: an element, or the brain box of the overview. */
export interface MapNode {
  /** `kind/id`, such as `step/design`, or `map/brain` for the brain box. */
  key: string;
  kind: Kind | "map";
  id: string;
  label: string;
  /** The address that a click opens. */
  href: string;
  x: number;
  y: number;
  w: number;
  h: number;
  /** Extra classes, such as `required`. */
  extra?: string;
  /** The label in more than one line. */
  lines?: string[];
}

export interface MapEdge {
  from: string;
  to: string;
  d: string;
  cls: string;
}

export interface MapFrame {
  x: number;
  y: number;
  w: number;
  h: number;
  cls: string;
  /** A frame with an address opens it on a click. */
  href?: string;
}

export interface MapLayout {
  map: MapId;
  width: number;
  height: number;
  nodes: MapNode[];
  edges: MapEdge[];
  frames: MapFrame[];
  labels: { x: number; y: number; text: string; cls: string }[];
}

/** The address of each map. */
export const MAP_HREF: Record<MapId, string> = {
  overview: "#/",
  change: "#/map/change",
  brain: "#/map/brain",
  blocks: "#/blocks",
};

/** The name of each map, for the breadcrumbs and the headings. */
export const MAP_LABEL: Record<MapId, string> = {
  overview: "Map",
  change: "Change loop",
  brain: "Project brain",
  blocks: "Building blocks",
};

/** The key of the change loop frame in the `to` field of the zoom edge. */
export const FLOW_KEY = "flow";
/** The key of the brain box of the overview. */
export const BRAIN_KEY = "map/brain";
/** The impact level that the change loop map shows first. */
export const DEFAULT_IMPACT = "medium";

const PAD = 30;
const PHASE = { w: 140, h: 44, col: 200 };
const BRAIN = { w: 128, h: 30, col: 140 };
const STEP = { w: 128, h: 36, col: 170 };
const DOC = { w: 144, h: 26, gap: 34 };
/** A brain type in a row of the detail maps: narrow, with room for two lines. */
const BRAIN_TYPE = { w: 92, h: 42, col: 104 };

const nodeKey = (n: { kind: string; id: string }) => `${n.kind}/${n.id}`;
const elementHref = (n: { kind: string; id: string }) => `#/${n.kind}/${n.id}`;

/** A vertical S-curve from one point to another. */
const vcurve = (x1: number, y1: number, x2: number, y2: number) => {
  const my = (y1 + y2) / 2;
  return `M${x1},${y1} C${x1},${my} ${x2},${my} ${x2},${y2}`;
};

function refsOf(element: Element, column: string) {
  return element.fields.find((f) => f.column === column)?.refs ?? [];
}

/** The parts that every map shares. */
class Builder {
  readonly nodes: MapNode[] = [];
  readonly edges: MapEdge[] = [];
  readonly frames: MapFrame[] = [];
  readonly labels: MapLayout["labels"] = [];
  readonly byKey = new Map<string, MapNode>();
  readonly inner: number;
  readonly width: number;

  constructor(
    readonly map: MapId,
    readonly data: ExplorerData,
    columns: number[],
  ) {
    this.inner = Math.max(...columns, 1);
    this.width = PAD * 2 + this.inner;
  }

  /** The center of item i of n, spread over the full width. */
  spread(i: number, n: number) {
    return PAD + ((i + 0.5) * this.inner) / n;
  }

  add(node: Omit<MapNode, "key">) {
    const full = { ...node, key: nodeKey(node) };
    this.nodes.push(full);
    this.byKey.set(full.key, full);
    return full;
  }

  /** One row of elements, in table order. */
  row(
    list: Element[],
    size: { y: number; w: number; h: number },
    href: (e: Element) => string = elementHref,
    extra?: (e: Element) => string | undefined,
  ) {
    list.forEach((e, i) =>
      this.add({
        kind: e.kind,
        id: e.id,
        label: e.kind === "type" ? e.id : e.name,
        href: href(e),
        x: this.spread(i, list.length) - size.w / 2,
        y: size.y,
        w: size.w,
        h: size.h,
        extra: extra?.(e),
      }),
    );
  }

  /** Arrows from each element of the list to the next one. */
  chain(list: Element[]) {
    for (let i = 0; i + 1 < list.length; i++) {
      const a = this.byKey.get(nodeKey(list[i] as Element));
      const b = this.byKey.get(nodeKey(list[i + 1] as Element));
      if (!a || !b) continue;
      const y = a.y + a.h / 2;
      this.edges.push({
        from: a.key,
        to: b.key,
        d: `M${a.x + a.w},${y} L${b.x - 2},${y}`,
        cls: `edge ${a.kind}-edge`,
      });
    }
  }

  /** The frame around the steps of the change loop. */
  stepFrame(href?: string): MapFrame | null {
    const steps = this.nodes.filter((n) => n.kind === "step");
    if (steps.length === 0) return null;
    const first = steps[0] as MapNode;
    const x0 = Math.min(...steps.map((n) => n.x)) - 14;
    const x1 = Math.max(...steps.map((n) => n.x + n.w)) + 14;
    const frame = {
      x: x0,
      y: first.y - 34,
      w: x1 - x0,
      h: first.h + 50,
      cls: "flow-frame",
      href,
    };
    this.frames.push(frame);
    this.label(frame.x + 10, frame.y + 18, "Change loop");
    return frame;
  }

  label(x: number, y: number, text: string, cls = "map-label") {
    this.labels.push({ x, y, text, cls });
  }

  /** The phases in one row, with the feedback arrow to the phase that holds the change flow. */
  phaseRow(y: number, feedback: boolean) {
    const { phases } = this.data.chapters;
    this.row(phases, { y, ...PHASE });
    this.label(PAD + 4, y - 22, "Project loop");
    this.chain(phases);
    const flow = this.flowPhase();
    const last = phases.at(-1);
    const a = last && this.byKey.get(nodeKey(last));
    if (!feedback || !a || !flow || a === flow) return;
    const ax = a.x + a.w / 2;
    const bx = flow.x + flow.w / 2;
    this.edges.push({
      from: a.key,
      to: flow.key,
      d: `M${ax},${a.y} C${ax},${a.y - 50} ${bx},${flow.y - 50} ${bx},${flow.y - 2}`,
      cls: "edge loop-edge",
    });
    this.label((ax + bx) / 2, a.y - 44, "feedback loop", "map-note");
  }

  flowPhase(): MapNode | undefined {
    return this.data.flowPhase
      ? this.byKey.get(`phase/${this.data.flowPhase}`)
      : undefined;
  }

  /** The zoom line from the phase that holds the change flow to the frame. */
  zoom(frame: MapFrame | null) {
    const b = this.flowPhase();
    if (!b || !frame) return;
    this.edges.push({
      from: b.key,
      to: FLOW_KEY,
      d: `M${b.x},${b.y + b.h} L${frame.x},${frame.y} M${b.x + b.w},${b.y + b.h} L${frame.x + frame.w},${frame.y}`,
      cls: "edge zoom-edge",
    });
  }

  /**
   * The links between an element and the brain. `target` gives the node of a brain type.
   * An element above the brain links from its bottom edge, an element below from its top edge.
   */
  brainLinks(
    element: Element,
    above: boolean,
    always: boolean,
    target: (typeId: string) => MapNode | undefined,
  ) {
    const node = this.byKey.get(nodeKey(element));
    if (!node) return;
    const cls = `edge brain-edge${always ? "" : " hover-edge"}`;
    const ny = above ? node.y + node.h : node.y;
    // One line for each brain type: an arrow for a write or a read, two heads for both.
    const roles = new Map<string, { doc: MapNode; writes: boolean; reads: boolean }>();
    for (const [column, writes] of [
      ["Produces", true],
      ["Uses", false],
    ] as const) {
      for (const ref of refsOf(element, column)) {
        if (!this.data.brain.includes(ref.id)) continue;
        const doc = target(ref.id);
        if (!doc) continue;
        const role = roles.get(doc.key) ?? { doc, writes: false, reads: false };
        if (writes) role.writes = true;
        else role.reads = true;
        roles.set(doc.key, role);
      }
    }
    for (const { doc, writes, reads } of roles.values()) {
      const nx = node.x + node.w / 2;
      // A wide box takes the link at the x of the element.
      const wide = doc.w > BRAIN.col * 2;
      const dx = wide ? nx : doc.x + doc.w / 2;
      const dy = above ? doc.y : doc.y + doc.h;
      const gap = above ? 2 : -2;
      const both = writes && reads;
      this.edges.push(
        writes
          ? {
              from: node.key,
              to: doc.key,
              d: vcurve(nx, both ? ny + gap : ny, dx, dy - gap),
              cls: `${cls}${both ? " both" : ""}`,
            }
          : {
              from: doc.key,
              to: node.key,
              d: vcurve(dx, dy, nx, ny + gap),
              cls,
            },
      );
    }
  }

  /**
   * One link between an element and the brain box of the overview.
   * An element that reads and writes the brain gets one line with two heads.
   */
  boxLink(element: Element, above: boolean, box: MapNode) {
    const node = this.byKey.get(nodeKey(element));
    if (!node) return;
    const touches = (column: string) =>
      refsOf(element, column).some((r) => this.data.brain.includes(r.id));
    const writes = touches("Produces");
    const reads = touches("Uses");
    if (!writes && !reads) return;
    const x = node.x + node.w / 2;
    const ny = above ? node.y + node.h : node.y;
    const by = above ? box.y : box.y + box.h;
    const gap = above ? 2 : -2;
    const both = writes && reads;
    this.edges.push(
      writes
        ? {
            from: node.key,
            to: box.key,
            d: `M${x},${both ? ny + gap : ny} L${x},${by - gap}`,
            cls: `edge brain-edge box-edge${both ? " both" : ""}`,
          }
        : {
            from: box.key,
            to: node.key,
            d: `M${x},${by} L${x},${ny + gap}`,
            cls: "edge brain-edge box-edge",
          },
    );
  }

  /** Breaks the label of each document type drawn so far at its first hyphen. */
  splitTypes() {
    for (const node of this.nodes)
      if (node.kind === "type") node.lines = splitId(node.label);
  }

  result(height: number): MapLayout {
    return {
      map: this.map,
      width: this.width,
      height,
      nodes: this.nodes,
      edges: this.edges,
      frames: this.frames,
      labels: this.labels,
    };
  }
}

function brainTypes(data: ExplorerData): Element[] {
  return data.brain
    .map((id) => data.chapters.types.find((t) => t.id === id))
    .filter((t) => t !== undefined);
}

/** Level 0: the phases, the brain as one box, and the steps as boxes. */
export function overviewLayout(data: ExplorerData): MapLayout {
  const { phases, steps } = data.chapters;
  const b = new Builder("overview", data, [
    phases.length * PHASE.col,
    steps.length * STEP.col,
  ]);
  b.phaseRow(84, true);

  const box = b.add({
    kind: "map",
    id: "brain",
    label: MAP_LABEL.brain.toUpperCase(),
    href: MAP_HREF.brain,
    x: PAD - 10,
    y: 180,
    w: b.inner + 20,
    h: 52,
  });

  b.row(steps, { y: 320, ...STEP }, () => MAP_HREF.change);
  const frame = b.stepFrame(MAP_HREF.change);
  b.chain(steps);
  b.zoom(frame);

  for (const phase of phases) b.boxLink(phase, true, box);
  for (const step of steps) b.boxLink(step, false, box);

  return b.result((frame ? frame.y + frame.h : 356) + PAD);
}

/** The impact level with this name, or the default level. */
export function impactLevel(data: ExplorerData, impact?: string) {
  return (
    data.impacts.find((l) => l.id === impact) ??
    data.impacts.find((l) => l.id === DEFAULT_IMPACT)
  );
}

/** Level 1: the steps, the document types of each step, and the brain band, filtered by impact level. */
export function changeLayout(
  data: ExplorerData,
  impact: string = DEFAULT_IMPACT,
): MapLayout {
  const { steps, types } = data.chapters;
  const level = impactLevel(data, impact);
  const shown = (t: Element) => !level?.skips.includes(t.id);
  const required = (t: Element) =>
    level?.adds.includes(t.id) ? "required" : undefined;
  const brain = brainTypes(data).filter((type) => !type.owner && shown(type));
  const brainIds = new Set(brain.map((type) => type.id));
  const b = new Builder("change", data, [
    steps.length * STEP.col,
    brain.length * BRAIN_TYPE.col,
  ]);

  // Project brain: a row above the steps, under its heading.
  const typeY = 50;
  b.label(PAD + 4, typeY - 22, MAP_LABEL.brain, "map-heading");
  b.row(brain, { y: typeY, ...BRAIN_TYPE }, undefined, required);
  b.splitTypes();

  // Change loop: the steps in table order, under its heading.
  const stepY = typeY + BRAIN_TYPE.h + 116;
  b.label(PAD + 4, stepY - 22, MAP_LABEL.change, "map-heading");
  b.row(steps, { y: stepY, ...STEP });
  b.chain(steps);

  // Links to the brain. The last step always shows them. Other steps show them on pointing.
  const last = steps.at(-1);
  for (const step of steps)
    b.brainLinks(step, false, step.id === last?.id, (id) =>
      b.byKey.get(`type/${id}`),
    );

  // Other document types hang under their step, in table order.
  const docTop = stepY + STEP.h + 24;
  const stacks = new Map<string, number>();
  let docBottom = docTop;
  for (const type of types) {
    if (brainIds.has(type.id) || !shown(type)) continue;
    const owner = type.owner ? b.byKey.get(nodeKey(type.owner)) : undefined;
    const ownerKey = owner?.key ?? "";
    const count = stacks.get(ownerKey) ?? 0;
    stacks.set(ownerKey, count + 1);
    const cx = owner ? owner.x + owner.w / 2 : b.width - PAD - DOC.w / 2;
    const node = b.add({
      kind: "type",
      id: type.id,
      label: type.id,
      href: elementHref(type),
      x: cx - DOC.w / 2,
      y: docTop + count * DOC.gap,
      w: DOC.w,
      h: DOC.h,
      extra: required(type),
    });
    docBottom = Math.max(docBottom, node.y + node.h);
    if (count === 0 && owner)
      b.edges.push({
        from: ownerKey,
        to: node.key,
        d: `M${cx},${owner.y + owner.h} L${cx},${node.y}`,
        cls: "edge doc-edge",
      });
  }

  return b.result(docBottom + PAD);
}

/** Level 1: the brain types between the phases above and the steps below. Headings, no frames. */
export function brainLayout(data: ExplorerData): MapLayout {
  const { phases, steps } = data.chapters;
  const brain = brainTypes(data);
  const b = new Builder("brain", data, [
    phases.length * PHASE.col,
    steps.length * STEP.col,
    brain.length * BRAIN_TYPE.col,
  ]);
  b.phaseRow(64, false);

  const typeY = 64 + PHASE.h + 96;
  b.label(PAD + 4, typeY - 22, MAP_LABEL.brain);
  // A long ID breaks into two lines at its first hyphen, such as `wiki-page`.
  b.row(brain, { y: typeY, ...BRAIN_TYPE });
  b.splitTypes();

  const stepY = typeY + BRAIN_TYPE.h + 116;
  b.label(PAD + 4, stepY - 22, MAP_LABEL.change);
  b.row(steps, { y: stepY, ...STEP });
  b.chain(steps);

  // Section names are headings on this map.
  for (const l of b.labels) if (l.cls === "map-label") l.cls = "map-heading";

  const target = (id: string) => b.byKey.get(`type/${id}`);
  for (const phase of phases) b.brainLinks(phase, true, false, target);
  for (const step of steps) b.brainLinks(step, false, false, target);

  return b.result(stepY + STEP.h + PAD);
}

/** An ID in one or two lines: it breaks at the first hyphen. */
export function splitId(id: string): string[] {
  const at = id.indexOf("-");
  return at > 0 ? [id.slice(0, at), id.slice(at + 1)] : [id];
}

/** The blocks in one row. Only the mini-map of a block page draws it. */
export function blocksLayout(data: ExplorerData): MapLayout {
  const { blocks } = data.chapters;
  const b = new Builder("blocks", data, [blocks.length * BRAIN.col]);
  b.row(blocks, { y: 40, w: BRAIN.col - 16, h: 46 });
  b.label(PAD + 4, 24, MAP_LABEL.blocks);
  return b.result(40 + 46 + PAD);
}

/** The layout of a map. */
export function mapLayout(
  data: ExplorerData,
  map: MapId = "overview",
  impact?: string,
): MapLayout {
  switch (map) {
    case "change":
      return changeLayout(data, impact);
    case "brain":
      return brainLayout(data);
    case "blocks":
      return blocksLayout(data);
    default:
      return overviewLayout(data);
  }
}
