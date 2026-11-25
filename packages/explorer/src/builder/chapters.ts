// Reads the chapter tables of the wiki contract and turns each row into a method element.
import type {
  Element,
  Field,
  Item,
  Kind,
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

const INTENT = "docs/wiki/intent.md";
const CATALOG = "docs/wiki/documentation-catalog.md";

/** The wiki contract: where each table lives and which columns it has. */
export const CONTRACT = {
  types: {
    file: CATALOG,
    anchor: "document-catalog",
    columns: ["ID", "Document", "Life", "Relevance", "Standards", "Purpose"],
  },
  phases: {
    file: INTENT,
    anchor: "lifecycle-phases",
    columns: [
      "#",
      "Phase",
      "AIDDbot helps teams to",
      "Project level",
      "Change level",
    ],
  },
  steps: {
    file: CATALOG,
    anchor: "change-flow",
    columns: ["#", "Step", "Work", "Uses", "Produces"],
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
} as const;

/** Columns that hold document IDs in backticks. */
const ID_COLUMNS = new Set([
  "Project level",
  "Change level",
  "Uses",
  "Produces",
  "Used by",
]);
/** Columns that hold a comma list of element names and document IDs. */
const NAME_COLUMNS = new Set(["Relations", "Set in"]);

/** The wiki breaks the contract. The build stops. */
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
    errors.push({
      file: spec.file,
      message: `table #${spec.anchor} has columns "${actual}", expected "${expected}"`,
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
      (result.doc.type === "glossary" && result.anchor ? terms : sections).push(
        section,
      );
    }
  }
  return { sections, terms };
}

/** Adds the glossary term with the same name as the element, if the glossary has one. */
function ownTerm(element: Element, ctx: Context) {
  const glossary = [...ctx.resolver.byId.values()].find(
    (d) => d.type === "glossary",
  );
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
    return { kind, id, name, order, fields, links: [], sections, terms };
  });
}

export interface Chapters {
  phases: Element[];
  steps: Element[];
  blocks: Element[];
  types: Element[];
  statuses: StatusUse[];
}

/** Reads the five contract tables. Throws a ContractError when the wiki breaks the contract. */
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

  const types = new Set(typeIds(t.types));
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
  for (const step of steps)
    link(
      step,
      phases.find((p) => p.id === step.id),
    );
  for (const element of all)
    for (const f of element.fields)
      for (const r of f.refs) link(element, find(r));

  for (const type of typeElements) {
    const levels = (e: Element, columns: string[]) =>
      e.fields
        .filter((f) => columns.includes(f.column))
        .some((f) => f.refs.some((r) => r.id === type.id));
    const phase = phases.find((p) =>
      levels(p, ["Project level", "Change level"]),
    );
    const step = steps.find((s) => levels(s, ["Produces"]));
    const owner = phase ?? step;
    if (owner) type.owner = ref(owner.kind, owner.id, owner.name);
    type.documents = docs.filter((d) => d.type === type.id).map((d) => d.id);
  }
  for (const element of all) ownTerm(element, ctx);
  // A document type also shows its own catalog section, such as `#spec`.
  const catalogDoc = resolver.byPath.get(CATALOG);
  for (const type of typeElements) {
    if (
      !catalogDoc?.anchors.has(type.id) ||
      type.sections.some((s) => s.anchor === type.id)
    )
      continue;
    const section = linkedSection(catalogDoc, type.id, ctx);
    if (section) type.sections.unshift(section);
  }

  return { phases, steps, blocks, types: typeElements, statuses };
}
