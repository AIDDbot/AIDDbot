// Data shared by the builder (writes data.json) and the site (reads it).

/** The kind of a method element. Each kind is one chapter of the explorer. */
export type Kind = "phase" | "step" | "block" | "type";

/** The maps of the explorer. `blocks` is the blocks view. */
export type MapId = "overview" | "change" | "brain" | "blocks";

/** A link from one element to another element. */
export interface Ref {
  kind: Kind;
  id: string;
  label: string;
}

/** One cell of a chapter table, rendered to HTML. */
export interface Field {
  column: string;
  html: string;
  /** Elements that the cell names: document IDs in backticks, phase, step, or block names. */
  refs: Ref[];
  /** ID and name columns only: the comma items of the cell, each with the element it names. */
  items: Item[];
}

export interface Item {
  label: string;
  ref?: Ref;
}

/** A wiki section, a glossary term, or a page summary that a row links to. */
export interface Section {
  title: string;
  html: string;
  docId: string;
  anchor: string;
}

/** One row of a chapter table. */
export interface Element {
  kind: Kind;
  id: string;
  name: string;
  /** Position in its table, from 0. */
  order: number;
  fields: Field[];
  /** Every element linked to this one, in both directions. */
  links: Ref[];
  sections: Section[];
  terms: Section[];
  /** Document types only: the step under which the type hangs on the map. Brain types have none. */
  owner?: Ref;
  /** Document types only: the documents of the content scope with this type. */
  documents?: string[];
  /** The map that holds the element. The breadcrumbs and the mini-map use it. */
  parent: MapId;
}

/** One row of the impact levels table. */
export interface ImpactLevel {
  id: string;
  /** Document types that the level does not write. The change loop map hides them. */
  skips: string[];
  /** Document types that the level adds. The change loop map marks them as required. */
  adds: string[];
}

/** One row of the status use table. */
export interface StatusUse {
  status: string;
  meaningHtml: string;
  setIn: Ref[];
  usedBy: string[];
}

export interface TocEntry {
  level: number;
  id: string;
  text: string;
}

export interface LinkItem {
  label: string;
  /** A site address (`#/doc/...`), an external URL, or empty for plain text. */
  href: string;
  external: boolean;
}

export type DocGroup =
  | "process"
  | "product"
  | "technology"
  | "root"
  | "specs";

/** A full document of the content scope. */
export interface Doc {
  id: string;
  type: string;
  title: string;
  path: string;
  group: DocGroup;
  meta: Record<string, string> | null;
  html: string;
  toc: TocEntry[];
  related: LinkItem[];
  sources: LinkItem[];
  warnings: string[];
}

export interface Problem {
  file: string;
  message: string;
}

export interface ExplorerData {
  generated: string;
  chapters: {
    phases: Element[];
    steps: Element[];
    blocks: Element[];
    types: Element[];
  };
  statuses: StatusUse[];
  /** The impact levels, in table order. */
  impacts: ImpactLevel[];
  /** The document types of the project brain, in catalog order. */
  brain: string[];
  /** The ID of the phase that holds the change flow. */
  flowPhase: string | null;
  docs: Doc[];
  problems: Problem[];
}
