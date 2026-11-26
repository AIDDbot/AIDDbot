// Reads the chapter tables of the brain contract and turns each row into a method element.
import type {
  BrainGroup,
  Element,
  Field,
  ImpactLevel,
  Item,
  Kind,
  MapId,
  Problem,
  Ref,
  Section,
  StatusUse,
} from "../shared/types.ts";
import {
  type LinkResolver,
  linkTypeCodes,
  rewriteLinks,
  type SourceDoc,
} from "./documents.ts";
import {
  anchoredRow,
  codeSpans,
  firstTableUnder,
  githubSlug,
  inlineHtml,
  plainText,
  sectionLines,
  summaryLines,
  type Table,
  toHtml,
} from "./markdown.ts";

const INTENT = "docs/product/intent.md";
const CATALOG = "docs/process/documentation-catalog.md";

/** The brain contract: where each table lives and which columns it has. */
export const CONTRACT = {
  types: {
    file: CATALOG,
    anchor: "document-catalog",
    columns: [
      "ID",
      "Document",
      "Life",
      "Form",
      "Relevance",
      "Standards",
      "Purpose",
    ],
  },
  forms: {
    file: CATALOG,
    anchor: "form",
    columns: ["Code", "Form", "Rule"],
  },
  phases: {
    file: INTENT,
    anchor: "lifecycle-phases",
    columns: ["#", "Phase", "Work", "Uses", "Produces"],
  },
  steps: {
    file: CATALOG,
    anchor: "change-flow",
    columns: ["#", "Step", "Work", "Uses", "Produces"],
  },
  impacts: {
    file: CATALOG,
    anchor: "impact-levels",
    columns: ["Impact", "When", "Flow", "Skips", "Adds"],
  },
  blocks: {
    file: INTENT,
    anchor: "building-blocks",
    columns: ["Block", "Role", "Relations"],
  },
  statuses: {
    file: CATALOG,
    anchor: "status-use",
    columns: ["Status", "Meaning", "Set in", "Used by"],
  },
  kinds: {
    file: CATALOG,
    anchor: "kind",
    columns: ["Code", "Kind", "Rule"],
  },
  kindTypes: {
    file: CATALOG,
    anchor: "kind-of-each-type",
    columns: ["Kind", "Document types"],
  },
} as const;

/** The name of the group for a row of the kind table with more than one kind code. */
const BY_SUBJECT = "By subject";

/**
 * The brain types grouped by kind, in the order of the kind table.
 * A row with one kind code is a group named by the Kind tag table. A row with more codes is the By subject group.
 * Types keep the catalog order inside each group.
 */
function brainGroups(
  kinds: Table,
  kindTypes: Table,
  brain: string[],
  types: Set<string>,
  errors: Problem[],
): BrainGroup[] {
  const names = new Map(
    kinds.rows.map((row) => [
      codeSpans(row[0] ?? "")[0] ?? "",
      plainText(row[1] ?? ""),
    ]),
  );
  const where = `table #${CONTRACT.kindTypes.anchor}`;
  const groups: BrainGroup[] = [];
  const placed = new Set<string>();
  for (const row of kindTypes.rows) {
    const codes = codeSpans(row[0] ?? "");
    for (const code of codes)
      if (!names.has(code))
        errors.push({ file: CATALOG, message: `unknown Kind \`${code}\` in ${where}` });
    const ids = codeSpans(row[1] ?? "");
    for (const id of ids)
      if (!types.has(id))
        errors.push({ file: CATALOG, message: `unknown document ID \`${id}\` in ${where}` });
    const single = codes.length === 1 ? (codes[0] as string) : null;
    const members = brain.filter((id) => ids.includes(id) && !placed.has(id));
    for (const id of members) placed.add(id);
    if (members.length === 0) continue;
    groups.push({
      id: single ? single.toLowerCase() : "subject",
      label: single ? (names.get(single) ?? single) : BY_SUBJECT,
      types: members,
    });
  }
  for (const id of brain)
    if (!placed.has(id))
      errors.push({ file: CATALOG, message: `brain type \`${id}\` has no kind in ${where}` });
  return groups;
}

/** Columns that hold document IDs in backticks. */
const ID_COLUMNS = new Set(["Uses", "Produces", "Used by", "Skips", "Adds"]);
/** Columns that hold a comma list of element names and document IDs. */
const NAME_COLUMNS = new Set(["Relations", "Set in"]);

/** The brain breaks the contract. The build stops. */
export class ContractError extends Error {
  constructor(readonly problems: Problem[]) {
    super(problems.map((p) => `${p.file}: ${p.message}`).join("\n"));
    this.name = "ContractError";
  }
}

type TableKey = keyof typeof CONTRACT;

/** Reads one contract table from its file text. Adds a problem when the anchor, the table, or a column is wrong. */
export function readContractTable(
  key: TableKey,
  body: string | undefined,
  errors: Problem[],
): Table | null {
  const spec = CONTRACT[key];
  if (body === undefined) {
    errors.push({ file: spec.file, message: "file not found" });
    return null;
  }
  const table = firstTableUnder(body, spec.anchor);
  if (!table) {
    errors.push({
      file: spec.file,
      message: `anchor #${spec.anchor} or its table not found`,
    });
    return null;
  }
  const expected = spec.columns.join(" | ");
  const actual = table.header.map(plainText).join(" | ");
  if (expected !== actual) {
    const found = new Set(table.header.map(plainText));
    const missing = spec.columns.filter((c) => !found.has(c));
    const note = missing.length ? ` (missing: ${missing.join(", ")})` : "";
    errors.push({
      file: spec.file,
      message: `table #${spec.anchor} has columns "${actual}", expected "${expected}"${note}`,
    });
    return null;
  }
  return table;
}

/** The document type IDs of the catalog table. */
export function typeIds(table: Table): string[] {
  return table.rows.map(
    (row) => codeSpans(row[0] ?? "")[0] ?? plainText(row[0] ?? ""),
  );
}

interface Context {
  resolver: LinkResolver;
  types: Set<string>;
  errors: Problem[];
  byName: {
    phase: Map<string, string>;
    step: Map<string, string>;
    block: Map<string, string>;
  };
}

function fieldOf(element: Element, column: string): Field | undefined {
  return element.fields.find((f) => f.column === column);
}

/** The code of a tag column of one catalog row, such as `LIVE` or `DOC`. */
function tagOf(table: Table, row: string[], column: string): string {
  const cell = row[table.header.map(plainText).indexOf(column)] ?? "";
  return codeSpans(cell)[0] ?? plainText(cell);
}

/** Checks that each catalog row holds a code of the Form tag table. */
function checkForms(types: Table, forms: Table, errors: Problem[]) {
  const known = new Set(forms.rows.map((row) => codeSpans(row[0] ?? "")[0]));
  for (const row of types.rows) {
    const form = tagOf(types, row, "Form");
    if (known.has(form)) continue;
    const id = codeSpans(row[0] ?? "")[0] ?? "";
    errors.push({
      file: CATALOG,
      message: `unknown Form value \`${form}\` in row \`${id}\` of table #${CONTRACT.types.anchor}`,
    });
  }
}

function ref(kind: Kind, id: string, label: string): Ref {
  return { kind, id, label };
}

/** Refs of one cell. Unknown IDs and names are contract errors. */
function cellRefs(
  column: string,
  markdown: string,
  file: string,
  ctx: Context,
): Ref[] {
  const refs: Ref[] = [];
  const addType = (id: string) => {
    if (ctx.types.has(id)) refs.push(ref("type", id, id));
    else
      ctx.errors.push({
        file,
        message: `unknown document ID \`${id}\` in column "${column}"`,
      });
  };
  if (ID_COLUMNS.has(column)) {
    for (const id of codeSpans(markdown)) addType(id);
  } else if (NAME_COLUMNS.has(column)) {
    for (const item of markdown
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s && s !== "—")) {
      const code = codeSpans(item)[0];
      if (code !== undefined) {
        addType(code);
        continue;
      }
      const name = plainText(item);
      const key = name.toLowerCase();
      const kind = (["phase", "step", "block"] as const).find((k) =>
        ctx.byName[k].has(key),
      );
      if (kind) refs.push(ref(kind, ctx.byName[kind].get(key) ?? "", name));
      else
        ctx.errors.push({
          file,
          message: `unknown element "${name}" in column "${column}"`,
        });
    }
  }
  return refs;
}

/** The comma items of an ID or name column, each with the element it names. */
function cellItems(column: string, markdown: string, refs: Ref[]): Item[] {
  if (!ID_COLUMNS.has(column) && !NAME_COLUMNS.has(column)) return [];
  return markdown
    .split(",")
    .map((s) => s.trim())
    .filter((s) => s && s !== "—")
    .map((item) => {
      const codes = codeSpans(item);
      const name = plainText(item);
      const found = refs.find((r) =>
        r.kind === "type" ? codes.includes(r.id) : r.label === name,
      );
      return found ? { label: name, ref: found } : { label: name };
    });
}

function field(
  column: string,
  markdown: string,
  file: string,
  ctx: Context,
): Field {
  const { html } = rewriteLinks(inlineHtml(markdown), file, ctx.resolver);
  const refs = cellRefs(column, markdown, file, ctx);
  return {
    column,
    html: linkTypeCodes(html, ctx.types),
    refs,
    items: cellItems(column, markdown, refs),
  };
}

function sectionHtml(markdown: string, from: SourceDoc, ctx: Context): string {
  return linkTypeCodes(
    rewriteLinks(toHtml(markdown), from.path, ctx.resolver).html,
    ctx.types,
  );
}

/** The section, glossary term, or page summary that a link points to. */
export function linkedSection(
  doc: SourceDoc,
  anchor: string,
  ctx: Context,
): Section | null {
  if (!anchor) {
    return {
      title: doc.title,
      html: sectionHtml(summaryLines(doc.body).join("\n"), doc, ctx),
      docId: doc.id,
      anchor: "",
    };
  }
  const section = sectionLines(doc.body, anchor);
  if (section) {
    return {
      title: section.heading.text,
      html: sectionHtml(section.lines.slice(1).join("\n"), doc, ctx),
      docId: doc.id,
      anchor,
    };
  }
  const row = anchoredRow(doc.body, anchor);
  if (row) {
    const title = plainText(row[2]?.split("|")[1] ?? anchor);
    return {
      title,
      html: sectionHtml(row.join("\n"), doc, ctx),
      docId: doc.id,
      anchor,
    };
  }
  return null;
}

function rowSections(
  row: string[],
  file: string,
  ctx: Context,
): { sections: Section[]; terms: Section[] } {
  const sections: Section[] = [];
  const terms: Section[] = [];
  const seen = new Set<string>();
  for (const cell of row) {
    for (const match of cell.matchAll(/\[[^\]]*\]\(([^)\s]+)\)/g)) {
      const result = ctx.resolver.resolve(match[1] ?? "", file);
      if (result.kind !== "internal") continue;
      const key = `${result.doc.id}#${result.anchor}`;
      if (seen.has(key)) continue;
      seen.add(key);
      const section = linkedSection(result.doc, result.anchor, ctx);
      if (!section) continue;
      (result.doc.id === "glossary" && result.anchor ? terms : sections).push(
        section,
      );
    }
  }
  return { sections, terms };
}

/** Adds the glossary term with the same name as the element, if the glossary has one. */
function ownTerm(element: Element, ctx: Context) {
  const glossary = ctx.resolver.byId.get("glossary");
  if (!glossary) return;
  for (const anchor of [element.id, element.id.replace(/s$/, "")]) {
    if (!glossary.anchors.has(anchor)) continue;
    if (
      element.terms.some((t) => t.docId === glossary.id && t.anchor === anchor)
    )
      return;
    const term = linkedSection(glossary, anchor, ctx);
    if (term) element.terms.unshift(term);
    return;
  }
}

function elements(
  kind: Kind,
  table: Table,
  file: string,
  nameColumn: number,
  ctx: Context,
  idOf?: (row: string[]) => string,
) {
  return table.rows.map((row, order): Element => {
    const name = plainText(row[nameColumn] ?? "");
    const id = idOf ? idOf(row) : githubSlug(name);
    const fields = table.header.map((column, i) =>
      field(plainText(column), row[i] ?? "", file, ctx),
    );
    const { sections, terms } = rowSections(row, file, ctx);
    return {
      kind,
      id,
      name,
      order,
      fields,
      links: [],
      sections,
      terms,
      parent: "overview",
    };
  });
}

/** The map that holds an element: the rules of the parent map. */
export function parentMap(kind: Kind, id: string, brain: string[]): MapId {
  if (kind === "phase") return "overview";
  if (kind === "block") return "blocks";
  if (kind === "type" && brain.includes(id)) return "brain";
  return "change";
}

export interface Chapters {
  phases: Element[];
  steps: Element[];
  blocks: Element[];
  types: Element[];
  statuses: StatusUse[];
  impacts: ImpactLevel[];
  /** The original document types of the project brain, in catalog order. */
  brain: string[];
  /** The brain types grouped by kind. */
  brainGroups: BrainGroup[];
  /** The phase whose row links to the change flow. It holds the steps. */
  flowPhase: string | null;
}

/** Reads the contract tables. Throws a ContractError when the brain breaks the contract. */
export function readChapters(
  bodies: Map<string, string>,
  resolver: LinkResolver,
  docs: SourceDoc[],
): Chapters {
  const errors: Problem[] = [];
  const tables = Object.fromEntries(
    (Object.keys(CONTRACT) as TableKey[]).map((key) => [
      key,
      readContractTable(key, bodies.get(CONTRACT[key].file), errors),
    ]),
  ) as Record<TableKey, Table | null>;
  if (errors.length > 0) throw new ContractError(errors);
  const t = tables as Record<TableKey, Table>;

  checkForms(t.types, t.forms, errors);
  const types = new Set(typeIds(t.types));
  const standardsColumn = t.types.header.map(plainText).indexOf("Standards");
  const brainRows = t.types.rows.filter(
    (row) =>
      tagOf(t.types, row, "Form") === "DOC" &&
      !codeSpans(row[standardsColumn] ?? "").includes("LLMWIKI"),
  );
  const brain = brainRows.map((row) => tagOf(t.types, row, "ID"));
  const groups = brainGroups(t.kinds, t.kindTypes, brain, types, errors);
  const livingBrain = new Set(
    brainRows
      .filter((row) => tagOf(t.types, row, "Life") === "LIVE")
      .map((row) => tagOf(t.types, row, "ID")),
  );
  const names = (table: Table, column: number) =>
    new Map(
      table.rows.map((row) => [
        plainText(row[column] ?? "").toLowerCase(),
        githubSlug(plainText(row[column] ?? "")),
      ]),
    );
  const ctx: Context = {
    resolver,
    types,
    errors,
    byName: {
      phase: names(t.phases, 1),
      step: names(t.steps, 1),
      block: names(t.blocks, 0),
    },
  };

  const typeElements = elements(
    "type",
    t.types,
    CATALOG,
    1,
    ctx,
    (row) => codeSpans(row[0] ?? "")[0] ?? "",
  );
  for (const element of typeElements) element.name = element.id;
  const phases = elements("phase", t.phases, INTENT, 1, ctx);
  const steps = elements("step", t.steps, CATALOG, 1, ctx);
  const blocks = elements("block", t.blocks, INTENT, 0, ctx);

  const statuses: StatusUse[] = t.statuses.rows.map((row) => {
    const status = codeSpans(row[0] ?? "")[0] ?? plainText(row[0] ?? "");
    const setIn = cellRefs("Set in", row[2] ?? "", CATALOG, ctx);
    const usedBy = cellRefs("Used by", row[3] ?? "", CATALOG, ctx).map(
      (r) => r.id,
    );
    return {
      status,
      meaningHtml: field("Meaning", row[1] ?? "", CATALOG, ctx).html,
      setIn,
      usedBy,
    };
  });

  const impacts: ImpactLevel[] = t.impacts.rows.map((row) => {
    const ids = (column: "Skips" | "Adds", cell: string | undefined) =>
      cellRefs(column, cell ?? "", CATALOG, ctx).map((r) => r.id);
    return {
      id: codeSpans(row[0] ?? "")[0] ?? plainText(row[0] ?? ""),
      skips: ids("Skips", row[3]),
      adds: ids("Adds", row[4]),
    };
  });

  if (errors.length > 0) throw new ContractError(errors);

  // Links in both directions.
  const all = [...phases, ...steps, ...blocks, ...typeElements];
  const find = (r: Ref) => all.find((e) => e.kind === r.kind && e.id === r.id);
  const link = (a: Element, b: Element | undefined) => {
    if (!b || a === b) return;
    if (!a.links.some((l) => l.kind === b.kind && l.id === b.id))
      a.links.push(ref(b.kind, b.id, b.name));
    if (!b.links.some((l) => l.kind === a.kind && l.id === a.id))
      b.links.push(ref(a.kind, a.id, a.name));
  };
  for (const list of [phases, steps])
    list.forEach((e, i) => link(e, list[i + 1]));
  // The phase whose row links to the change flow holds every step.
  const catalogDoc = resolver.byPath.get(CATALOG);
  const flowPhase = phases.find((p) =>
    p.sections.some(
      (s) => s.docId === catalogDoc?.id && s.anchor === CONTRACT.steps.anchor,
    ),
  );
  for (const step of steps) link(step, flowPhase);
  for (const element of all)
    for (const f of element.fields)
      for (const r of f.refs) link(element, find(r));

  // The change map hangs change documents and other outputs under their step.
  for (const type of typeElements) {
    const names = (e: Element, column: string) =>
      fieldOf(e, column)?.refs.some((r) => r.id === type.id) ?? false;
    const owner = livingBrain.has(type.id)
      ? undefined
      : (steps.find((s) => names(s, "Produces")) ??
        steps.find((s) => names(s, "Uses")));
    if (owner) type.owner = ref(owner.kind, owner.id, owner.name);
    type.documents = docs.filter((d) => d.type === type.id).map((d) => d.id);
  }
  for (const element of all) {
    element.parent = parentMap(element.kind, element.id, brain);
    ownTerm(element, ctx);
  }
  // A document type also shows its own catalog section, such as `#spec`.
  for (const type of typeElements) {
    if (
      !catalogDoc?.anchors.has(type.id) ||
      type.sections.some((s) => s.anchor === type.id)
    )
      continue;
    const section = linkedSection(catalogDoc, type.id, ctx);
    if (section) type.sections.unshift(section);
  }

  return {
    phases,
    steps,
    blocks,
    types: typeElements,
    statuses,
    impacts,
    brain,
    brainGroups: groups,
    flowPhase: flowPhase?.id ?? null,
  };
}
