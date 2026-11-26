// Loads the data file once and finds elements and documents in it.
import type { Doc, Element, ExplorerData, Kind, Ref } from "../shared/types.ts";

let pending: Promise<ExplorerData> | null = null;

/** Loads `data.json` from the folder of the page. */
export function loadData(): Promise<ExplorerData> {
  pending ??= fetch("./data.json").then((response) => {
    if (!response.ok) throw new Error(`data.json: HTTP ${response.status}`);
    return response.json() as Promise<ExplorerData>;
  });
  return pending;
}

export const KIND_LABEL: Record<Kind, string> = {
  phase: "Lifecycle phase",
  step: "Change step",
  block: "Building block",
  type: "Document type",
};

export function allElements(data: ExplorerData): Element[] {
  const { phases, steps, blocks, types } = data.chapters;
  return [...phases, ...steps, ...blocks, ...types];
}

export function findElement(
  data: ExplorerData,
  kind: string,
  id: string,
): Element | undefined {
  return allElements(data).find((e) => e.kind === kind && e.id === id);
}

export function findDoc(data: ExplorerData, id: string): Doc | undefined {
  return data.docs.find((d) => d.id === id);
}

export function key(ref: { kind: Kind; id: string }): string {
  return `${ref.kind}/${ref.id}`;
}

export function elementHref(ref: { kind: Kind; id: string }): string {
  return `#/${ref.kind}/${ref.id}`;
}

export function fieldOf(element: Element, column: string) {
  return element.fields.find((f) => f.column === column);
}

/** The steps that use or produce a document type. */
export function stepsFor(
  data: ExplorerData,
  typeId: string,
  column: "Uses" | "Produces",
): Ref[] {
  return data.chapters.steps
    .filter((s) => fieldOf(s, column)?.refs.some((r) => r.id === typeId))
    .map((s) => ({ kind: s.kind, id: s.id, label: s.name }));
}

export function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
