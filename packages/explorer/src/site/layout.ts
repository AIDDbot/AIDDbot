// Places every element of the map by rules, from the table order. Nobody draws the map by hand.
import type { Element, ExplorerData, Kind } from "../shared/types.ts";

export interface MapNode {
  kind: Kind;
  id: string;
  label: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface MapEdge {
  from: string;
  to: string;
  d: string;
  cls: string;
}

interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface MapLayout {
  width: number;
  height: number;
  nodes: MapNode[];
  edges: MapEdge[];
  /** The frame of the change loop, around the steps. */
  flow: Rect | null;
  /** The band of the project brain, between the two loops. */
  brain: Rect;
  /** The band of the building blocks. */
  band: Rect;
  labels: { x: number; y: number; text: string; cls: string }[];
}

/** The key of the change loop frame in the `to` field of the zoom edge. */
export const FLOW_KEY = "flow";

const PAD = 30;
const PHASE = { y: 84, w: 140, h: 44, col: 200 };
const BRAIN = { y: 172, h: 84, w: 128, col: 140 };
const STEP = { y: 330, w: 128, h: 36, col: 170 };
const DOC = { w: 144, h: 26, gap: 34 };
const BLOCK_H = 46;

const nodeKey = (n: { kind: Kind; id: string }) => `${n.kind}/${n.id}`;

/** A vertical S-curve from one point to another. */
const vcurve = (x1: number, y1: number, x2: number, y2: number) => {
  const my = (y1 + y2) / 2;
  return `M${x1},${y1} C${x1},${my} ${x2},${my} ${x2},${y2}`;
};

export function mapLayout(data: ExplorerData): MapLayout {
  const { phases, steps, types, blocks } = data.chapters;
  const brainTypes = data.brain
    .map((id) => types.find((t) => t.id === id))
    .filter((t) => t !== undefined);
  const inner = Math.max(
    phases.length * PHASE.col,
    steps.length * STEP.col,
    brainTypes.length * BRAIN.col,
  );
  const width = PAD * 2 + inner;
  /** The center of item i of n, spread over the full width. */
  const spread = (i: number, n: number) => PAD + ((i + 0.5) * inner) / n;

  const nodes: MapNode[] = [];
  const edges: MapEdge[] = [];
  const labels: MapLayout["labels"] = [];
  const byKey = new Map<string, MapNode>();
  const add = (node: MapNode) => {
    nodes.push(node);
    byKey.set(nodeKey(node), node);
    return node;
  };
  const row = (
    list: Element[],
    kind: Kind,
    size: { y: number; w: number; h: number },
  ) =>
    list.forEach((e, i) =>
      add({
        kind,
        id: e.id,
        label: kind === "type" ? e.id : e.name,
        x: spread(i, list.length) - size.w / 2,
        y: size.y,
        w: size.w,
        h: size.h,
      }),
    );

  // Project loop: the phases in table order.
  row(phases, "phase", PHASE);
  labels.push({
    x: PAD + 4,
    y: PHASE.y - 22,
    text: "Project loop",
    cls: "map-label",
  });

  // Project brain: a band between the two loops.
  const brain = { x: PAD - 10, y: BRAIN.y, w: inner + 20, h: BRAIN.h };
  row(brainTypes, "type", { y: BRAIN.y + 36, w: BRAIN.w, h: 30 });
  labels.push({
    x: brain.x + 10,
    y: brain.y + 20,
    text: "Project brain",
    cls: "map-label",
  });

  // Change loop: the steps in table order, inside a frame.
  row(steps, "step", STEP);
  const flow =
    steps.length > 0
      ? (() => {
          const stepNodes = nodes.filter((n) => n.kind === "step");
          const x0 = Math.min(...stepNodes.map((n) => n.x)) - 14;
          const x1 = Math.max(...stepNodes.map((n) => n.x + n.w)) + 14;
          return { x: x0, y: STEP.y - 34, w: x1 - x0, h: STEP.h + 50 };
        })()
      : null;
  if (flow)
    labels.push({
      x: flow.x + 10,
      y: flow.y + 18,
      text: "Change loop",
      cls: "map-label",
    });

  // Arrows inside each loop.
  const chain = (list: Element[], kind: Kind) => {
    for (let i = 0; i + 1 < list.length; i++) {
      const a = byKey.get(`${kind}/${list[i]?.id}`);
      const b = byKey.get(`${kind}/${list[i + 1]?.id}`);
      if (!a || !b) continue;
      const y = a.y + a.h / 2;
      edges.push({
        from: nodeKey(a),
        to: nodeKey(b),
        d: `M${a.x + a.w},${y} L${b.x - 2},${y}`,
        cls: `edge ${kind}-edge`,
      });
    }
  };
  chain(phases, "phase");
  chain(steps, "step");

  // Feedback: the last phase starts new changes in the phase that holds the change flow.
  const last = phases.at(-1);
  const a = last && byKey.get(`phase/${last.id}`);
  const b = data.flowPhase ? byKey.get(`phase/${data.flowPhase}`) : undefined;
  if (a && b && a !== b) {
    const ax = a.x + a.w / 2;
    const bx = b.x + b.w / 2;
    edges.push({
      from: nodeKey(a),
      to: nodeKey(b),
      d: `M${ax},${a.y} C${ax},${a.y - 50} ${bx},${b.y - 50} ${bx},${b.y - 2}`,
      cls: "edge loop-edge",
    });
    labels.push({
      x: (ax + bx) / 2,
      y: a.y - 44,
      text: "feedback: new changes",
      cls: "map-note",
    });
  }

  // Zoom: the phase that holds the change flow opens into the change loop frame.
  if (b && flow)
    edges.push({
      from: nodeKey(b),
      to: FLOW_KEY,
      d: `M${b.x},${b.y + b.h} L${flow.x},${flow.y} M${b.x + b.w},${b.y + b.h} L${flow.x + flow.w},${flow.y}`,
      cls: "edge zoom-edge",
    });

  // Links to the brain. Phases and the last step always show them. Other steps show them on pointing.
  const lastStep = steps.at(-1);
  const brainLinks = (element: Element, kind: Kind, above: boolean) => {
    const node = byKey.get(`${kind}/${element.id}`);
    if (!node) return;
    const always = kind === "phase" || element.id === lastStep?.id;
    const cls = `edge brain-edge${always ? "" : " hover-edge"}`;
    const ny = above ? node.y + node.h : node.y;
    for (const [column, writes] of [
      ["Produces", true],
      ["Uses", false],
    ] as const) {
      const refs =
        element.fields.find((f) => f.column === column)?.refs ?? [];
      for (const ref of refs) {
        const doc = byKey.get(`type/${ref.id}`);
        if (!doc || !data.brain.includes(ref.id)) continue;
        const dy = above ? doc.y : doc.y + doc.h;
        // Writes and reads of the same pair run side by side.
        const shift = writes ? -5 : 5;
        const nx = node.x + node.w / 2 + shift;
        const dx = doc.x + doc.w / 2 + shift;
        edges.push(
          writes
            ? {
                from: nodeKey(node),
                to: nodeKey(doc),
                d: vcurve(nx, ny, dx, above ? dy - 2 : dy + 2),
                cls,
              }
            : {
                from: nodeKey(doc),
                to: nodeKey(node),
                d: vcurve(dx, dy, nx, above ? ny + 2 : ny - 2),
                cls,
              },
        );
      }
    }
  };
  for (const phase of phases) brainLinks(phase, "phase", true);
  for (const step of steps) brainLinks(step, "step", false);

  // Other document types hang under their step, in table order.
  const docTop = (flow ? flow.y + flow.h : STEP.y + STEP.h) + 20;
  const stacks = new Map<string, number>();
  let docBottom = docTop;
  for (const type of types) {
    if (data.brain.includes(type.id)) continue;
    const owner = type.owner ? byKey.get(nodeKey(type.owner)) : undefined;
    const ownerKey = owner ? nodeKey(owner) : "";
    const count = stacks.get(ownerKey) ?? 0;
    stacks.set(ownerKey, count + 1);
    const cx = owner ? owner.x + owner.w / 2 : width - PAD - DOC.w / 2;
    const node = add({
      kind: "type",
      id: type.id,
      label: type.id,
      x: cx - DOC.w / 2,
      y: docTop + count * DOC.gap,
      w: DOC.w,
      h: DOC.h,
    });
    docBottom = Math.max(docBottom, node.y + node.h);
    if (count === 0 && owner)
      edges.push({
        from: ownerKey,
        to: nodeKey(node),
        d: `M${cx},${owner.y + owner.h} L${cx},${node.y}`,
        cls: "edge doc-edge",
      });
  }

  // Building blocks form a band below.
  const band = { x: PAD - 10, y: docBottom + 36, w: inner + 20, h: BLOCK_H + 46 };
  const gap = 12;
  const bw =
    blocks.length > 0
      ? (band.w - 20 - gap * (blocks.length - 1)) / blocks.length
      : 0;
  blocks.forEach((block, i) => {
    add({
      kind: "block",
      id: block.id,
      label: block.name,
      x: band.x + 10 + i * (bw + gap),
      y: band.y + 34,
      w: bw,
      h: BLOCK_H,
    });
  });
  labels.push({
    x: band.x + 10,
    y: band.y + 20,
    text: "Building blocks",
    cls: "map-label",
  });

  return {
    width,
    height: band.y + band.h + PAD,
    nodes,
    edges,
    flow,
    brain,
    band,
    labels,
  };
}
