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

export interface MapLayout {
  width: number;
  height: number;
  nodes: MapNode[];
  edges: MapEdge[];
  /** The frame of the change flow, around the steps. */
  flow: { x: number; y: number; w: number; h: number } | null;
  /** The band of the building blocks. */
  band: { x: number; y: number; w: number; h: number };
  labels: { x: number; y: number; text: string; cls: string }[];
}

const COL = 150;
const PAD = 30;
const PHASE = { y: 64, w: 132, h: 44 };
const STEP = { y: 176, w: 122, h: 36 };
const DOC = { y: 262, w: 144, h: 26, gap: 34 };
const BLOCK_H = 46;

interface Column {
  phase?: Element;
  step?: Element;
}

/**
 * Columns follow the phase order. A step with the name of a phase shares its column.
 * Another step, such as Close, gets a new column after the column of the step before it.
 */
export function columns(data: ExplorerData): Column[] {
  const cols: Column[] = data.chapters.phases.map((phase) => ({ phase }));
  let last = -1;
  for (const step of data.chapters.steps) {
    const index = cols.findIndex((c) => c.phase?.id === step.id && !c.step);
    if (index >= 0) {
      cols[index] = { ...cols[index], step };
      last = index;
    } else {
      last += 1;
      cols.splice(last, 0, { step });
    }
  }
  return cols;
}

const nodeKey = (n: { kind: Kind; id: string }) => `${n.kind}/${n.id}`;

export function mapLayout(data: ExplorerData): MapLayout {
  const cols = columns(data);
  const width = PAD * 2 + cols.length * COL;
  const cx = (i: number) => PAD + i * COL + COL / 2;
  const nodes: MapNode[] = [];
  const edges: MapEdge[] = [];
  const labels: MapLayout["labels"] = [];
  const byKey = new Map<string, MapNode>();
  const add = (node: MapNode) => {
    nodes.push(node);
    byKey.set(nodeKey(node), node);
  };

  cols.forEach((col, i) => {
    if (col.phase) add({ kind: "phase", id: col.phase.id, label: col.phase.name, x: cx(i) - PHASE.w / 2, y: PHASE.y, w: PHASE.w, h: PHASE.h });
    if (col.step) add({ kind: "step", id: col.step.id, label: col.step.name, x: cx(i) - STEP.w / 2, y: STEP.y, w: STEP.w, h: STEP.h });
  });

  // Phase loop and change flow arrows.
  const right = (n: MapNode) => ({ x: n.x + n.w, y: n.y + n.h / 2 });
  const left = (n: MapNode) => ({ x: n.x, y: n.y + n.h / 2 });
  const chain = (list: Element[], kind: Kind) => {
    for (let i = 0; i + 1 < list.length; i++) {
      const a = byKey.get(`${kind}/${list[i]?.id}`);
      const b = byKey.get(`${kind}/${list[i + 1]?.id}`);
      if (!a || !b) continue;
      const p = right(a);
      const q = left(b);
      edges.push({ from: nodeKey(a), to: nodeKey(b), d: `M${p.x},${p.y} L${q.x - 2},${q.y}`, cls: `edge ${kind}-edge` });
    }
  };
  chain(data.chapters.phases, "phase");
  chain(data.chapters.steps, "step");

  // Feedback: the last phase starts new changes in the first change-level phase.
  const phases = data.chapters.phases;
  const lastPhase = phases.at(-1);
  const firstChange = phases.find((p) => p.fields.find((f) => f.column === "Change level")?.html.replace(/—/g, "").trim());
  const a = lastPhase && byKey.get(`phase/${lastPhase.id}`);
  const b = firstChange && byKey.get(`phase/${firstChange.id}`);
  if (a && b && a !== b) {
    const ax = a.x + a.w / 2;
    const bx = b.x + b.w / 2;
    edges.push({
      from: nodeKey(a),
      to: nodeKey(b),
      d: `M${ax},${a.y} C${ax},${a.y - 46} ${bx},${b.y - 46} ${bx},${b.y - 2}`,
      cls: "edge loop-edge",
    });
    labels.push({ x: (ax + bx) / 2, y: a.y - 42, text: "feedback: new changes", cls: "map-note" });
  }

  // Phase and step with the same name.
  for (const step of data.chapters.steps) {
    const s = byKey.get(`step/${step.id}`);
    const p = byKey.get(`phase/${step.id}`);
    if (s && p) {
      const x = s.x + s.w / 2;
      edges.push({ from: nodeKey(p), to: nodeKey(s), d: `M${x},${p.y + p.h} L${x},${s.y}`, cls: "edge level-edge" });
    }
  }

  // Change flow frame.
  const stepNodes = nodes.filter((n) => n.kind === "step");
  const flow =
    stepNodes.length > 0
      ? (() => {
          const x0 = Math.min(...stepNodes.map((n) => n.x)) - 12;
          const x1 = Math.max(...stepNodes.map((n) => n.x + n.w)) + 12;
          return { x: x0, y: STEP.y - 30, w: x1 - x0, h: STEP.h + 44 };
        })()
      : null;
  if (flow) labels.push({ x: flow.x + flow.w - 10, y: flow.y + 16, text: "Change flow", cls: "map-label end" });
  labels.push({ x: PAD + 4, y: PHASE.y - 18, text: "Lifecycle phases", cls: "map-label" });

  // Document types hang under the phase or step that names them, in table order.
  const stacks = new Map<number, number>();
  let docBottom = DOC.y;
  for (const type of data.chapters.types) {
    const ownerKey = type.owner ? `${type.owner.kind}/${type.owner.id}` : "";
    let index = cols.findIndex((c) =>
      type.owner?.kind === "phase" ? c.phase?.id === type.owner.id : c.step?.id === type.owner?.id,
    );
    if (index < 0) index = cols.length - 1;
    const count = stacks.get(index) ?? 0;
    stacks.set(index, count + 1);
    const node: MapNode = { kind: "type", id: type.id, label: type.id, x: cx(index) - DOC.w / 2, y: DOC.y + count * DOC.gap, w: DOC.w, h: DOC.h };
    add(node);
    docBottom = Math.max(docBottom, node.y + node.h);
    if (count === 0 && ownerKey) {
      const col = cols[index];
      const above = col?.step ? byKey.get(`step/${col.step.id}`) : byKey.get(ownerKey);
      if (above) {
        const x = node.x + node.w / 2;
        edges.push({ from: ownerKey, to: nodeKey(node), d: `M${x},${above.y + above.h} L${x},${node.y}`, cls: "edge doc-edge" });
      }
    }
  }

  // Building blocks form a band below.
  const band = { x: PAD - 10, y: docBottom + 36, w: width - 2 * PAD + 20, h: BLOCK_H + 46 };
  const blocks = data.chapters.blocks;
  const gap = 12;
  const bw = blocks.length > 0 ? (band.w - 20 - gap * (blocks.length - 1)) / blocks.length : 0;
  blocks.forEach((block, i) => {
    add({ kind: "block", id: block.id, label: block.name, x: band.x + 10 + i * (bw + gap), y: band.y + 34, w: bw, h: BLOCK_H });
  });
  labels.push({ x: band.x + 10, y: band.y + 20, text: "Building blocks", cls: "map-label" });

  return { width, height: band.y + band.h + PAD, nodes, edges, flow, band, labels };
}
