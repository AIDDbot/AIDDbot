// Reads the whole content scope into the explorer data.
import { posix } from "node:path";
import type { ExplorerData, Problem } from "../shared/types.ts";
import {
  CONTRACT,
  ContractError,
  readContractTable,
  readChapters,
  typeIds,
} from "./chapters.ts";
import {
  contentFiles,
  LinkResolver,
  readSource,
  renderDoc,
} from "./documents.ts";
import { splitFrontmatter } from "./markdown.ts";

/** Reads the documents of `root`. Throws a ContractError when the brain breaks the contract. */
export async function readData(root: string): Promise<ExplorerData> {
  const files = contentFiles(root);
  const texts = new Map<string, string>();
  for (const file of files)
    texts.set(file.path, await Bun.file(posix.join(root, file.path)).text());

  // The catalog gives the known document types, which the META check needs.
  const errors: Problem[] = [];
  const catalogText = texts.get(CONTRACT.types.file);
  const catalog = readContractTable(
    "types",
    catalogText === undefined ? undefined : splitFrontmatter(catalogText).body,
    errors,
  );
  if (!catalog) throw new ContractError(errors);
  const knownTypes = new Set(typeIds(catalog));

  const sources = files.map((f) =>
    readSource(f.path, f.group, knownTypes, texts.get(f.path) ?? ""),
  );
  const problems: Problem[] = [];
  const ids = new Map<string, string>();
  for (const source of sources) {
    const other = ids.get(source.id);
    if (other)
      problems.push({
        file: source.path,
        message: `document ID \`${source.id}\` is also used by ${other}`,
      });
    else ids.set(source.id, source.path);
  }

  const resolver = new LinkResolver(root, sources);
  const bodies = new Map(sources.map((s) => [s.path, s.body]));
  const chapters = readChapters(bodies, resolver, sources);
  const docs = sources.map((s) => renderDoc(s, resolver, knownTypes, problems));

  return {
    generated: new Date().toISOString(),
    chapters: {
      phases: chapters.phases,
      steps: chapters.steps,
      blocks: chapters.blocks,
      types: chapters.types,
    },
    statuses: chapters.statuses,
    impacts: chapters.impacts,
    brain: chapters.brain,
    flowPhase: chapters.flowPhase,
    docs,
    problems,
  };
}
