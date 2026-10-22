// The form of each `AGENTS.md` and the index of each `shared` folder (Halloween D59): `aidd release` checks the one and writes the other.
import fs from "node:fs";
import path from "node:path";
import { aiddbotPath, readJson, relative } from "./core.mjs";

const MAX_LINES = 128;
// The `##` sections of each kind of file, in their order. A section with `?` is optional.
const SKELETONS = {
  root: ["Assistant", "System", "Commands", "Architecture?", "Code?", "Records", "Git"],
  project: ["Purpose", "Technology", "Folders", "Platform", "Project rules?"],
};
const TABLE_SEPARATOR = /^\|[\s:|-]+\|\s*$/;
const SOURCE = /\.(c|m)?[jt]sx?$/;
const NOT_SOURCE = /\.(test|spec)\.|\.d\.ts$/;
const DECLARED = /^export\s+(?:default\s+)?(?:declare\s+)?(?:async\s+)?(?:function\*?|const|let|var|class|type|interface|enum)\s+([A-Za-z_$][\w$]*)/gm;
const LISTED = /^export\s+(?:type\s+)?\{([^}]*)\}/gm;

const projectsOf = (root) => Object.values(readJson(aiddbotPath(root, "config.json"), { projects: {} }).projects ?? {});

/** Each `AGENTS.md` that exists: the root one, and one for each configured project. */
function agentsFiles(root) {
  const files = [{ kind: "root", file: path.join(root, "AGENTS.md") }];
  for (const project of projectsOf(root)) files.push({ kind: "project", file: path.join(root, project.path, "AGENTS.md") });
  return files.filter(({ file }) => fs.existsSync(file));
}

/** The `##` sections of `text`, each with the count of its lines of content: a heading, a table header or its separator is no content. */
function sectionsOf(text) {
  const sections = [];
  for (const line of text.split(/\r?\n/)) {
    const heading = /^##\s+(.+?)\s*$/.exec(line);
    if (heading) {
      sections.push({ name: heading[1], lines: 0 });
      continue;
    }
    const section = sections.at(-1);
    const isContent = section && line.trim() && !line.startsWith("###");
    if (!isContent) continue;
    // A separator row ends a table header: the header above it is no content either.
    if (TABLE_SEPARATOR.test(line)) section.lines--;
    else section.lines++;
  }
  return sections;
}

/** The problems of the sections against their skeleton: an unknown, a missing, an empty or a misplaced one. */
function skeletonProblems(sections, skeleton) {
  const names = skeleton.map((entry) => entry.replace("?", ""));
  const problems = [];
  for (const section of sections) {
    if (!names.includes(section.name)) problems.push(`unknown section "${section.name}" (sections: ${names.join(", ")})`);
    else if (section.lines === 0) problems.push(`empty section "${section.name}": remove it, or write its content`);
  }
  const present = sections.map((section) => section.name).filter((name) => names.includes(name));
  const ordered = names.filter((name) => present.includes(name));
  if (present.join("|") !== ordered.join("|")) problems.push(`sections out of order: ${names.join(", ")}`);
  for (const entry of skeleton) {
    if (!entry.endsWith("?") && !present.includes(entry)) problems.push(`missing section "${entry}"`);
  }
  return problems;
}

/** Each problem of the form of each `AGENTS.md`, as `<path>: <problem>`. */
export function agentsProblems(root) {
  const problems = [];
  for (const { kind, file } of agentsFiles(root)) {
    const text = fs.readFileSync(file, "utf8");
    const lines = text.trimEnd().split(/\r?\n/).length;
    const own = [
      ...(lines > MAX_LINES ? [`${lines} lines, more than ${MAX_LINES}: merge or remove what a check, the code or the root AGENTS.md already gives`] : []),
      ...(text.includes("<!--") ? ["a comment of the template is left: remove each <!-- … -->"] : []),
      ...skeletonProblems(sectionsOf(text), SKELETONS[kind]),
    ];
    problems.push(...own.map((problem) => `${relative(root, file)}: ${problem}`));
  }
  return problems;
}

/** The names that a source file exports. */
function exportsOf(text) {
  const names = [...text.matchAll(DECLARED)].map((match) => match[1]);
  for (const match of text.matchAll(LISTED)) {
    names.push(...match[1].split(",").map((item) => item.trim().split(/\s+as\s+/).at(-1).replace(/^type\s+/, "")).filter(Boolean));
  }
  return [...new Set(names)];
}

// The `shared` folder of a project: in its source, or at its root, as in an `e2e`.
const SHARED_FOLDERS = [["src", "shared"], ["shared"]];

/** Write the index of the `shared` folder of each configured project that has one; return the paths that it wrote. */
export function writeSharedIndexes(root) {
  const written = [];
  for (const project of projectsOf(root)) {
    const shared = SHARED_FOLDERS.map((parts) => path.join(root, project.path, ...parts)).find((folder) => fs.existsSync(folder));
    if (!shared) continue;
    const rows = fs.readdirSync(shared, { recursive: true })
      .map((name) => name.split(path.sep).join("/"))
      .filter((name) => SOURCE.test(name) && !NOT_SOURCE.test(name))
      .sort()
      .map((name) => [name, exportsOf(fs.readFileSync(path.join(shared, name), "utf8"))])
      .filter(([, names]) => names.length)
      .map(([name, names]) => `| \`${name}\` | ${names.map((item) => `\`${item}\``).join(", ")} |`);
    const lines = [
      "# shared",
      "",
      "Each file of `shared` and its exports. Read it before you write a check, a conversion or a format: never write a second version of one. Generated by `aidd release`; do not edit.",
      "",
      "| File | Exports |",
      "| --- | --- |",
      ...rows,
    ];
    const file = path.join(shared, "README.md");
    fs.writeFileSync(file, `${lines.join("\n")}\n`, "utf8");
    written.push(relative(root, file));
  }
  return written;
}
