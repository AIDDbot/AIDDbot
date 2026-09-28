// Traceability between requirements and acceptance tests (D18, D19). A test cites a requirement
// with a token such as `@S0042-R03` in its title, or in the title of a `describe` in its file.
import fs from "node:fs";
import path from "node:path";
import { readConfig } from "./config.mjs";
import { relative } from "./paths.mjs";
import { affectedRows, requirements, shippedSpecs } from "./requirements.mjs";

const SOURCE = /\.(?:[cm]?[jt]s|[jt]sx)$/;
const SKIPPED_DIRS = new Set(["node_modules", "dist", "build", "coverage", "test-results", "playwright-report", "blob-report"]);
const TOKEN = /@(S\d{4}-R\d{2})\b/g;
// `test(`, `it(`, `describe(`, and their modifiers such as `test.describe.serial(` or `test.only(`, with a literal title.
const DECLARATION = /\b((?:test|it|describe)(?:\.(?:describe|only|skip|fixme|fail|slow|serial|parallel))*)\s*\(\s*(['"`])((?:\\.|(?!\2)[^\\])*)\2/g;

function sourceFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return entry.name.startsWith(".") || SKIPPED_DIRS.has(entry.name) ? [] : sourceFiles(full);
    return SOURCE.test(entry.name) ? [full] : [];
  });
}

/** Every test and describe title of the acceptance projects, with the requirement tokens it carries. */
export function acceptanceTitles(root) {
  const projects = Object.values(readConfig(root).projects).filter((project) => project.commands.acceptance);
  const titles = [];
  for (const project of projects) {
    for (const file of sourceFiles(path.join(root, project.path))) {
      const text = fs.readFileSync(file, "utf8");
      for (const match of text.matchAll(DECLARATION)) {
        titles.push({
          file: relative(root, file),
          line: text.slice(0, match.index).split("\n").length,
          kind: match[1].includes("describe") ? "describe" : "test",
          title: match[3],
          tags: [...match[3].matchAll(TOKEN)].map((token) => token[1]),
        });
      }
    }
  }
  return { projects: projects.length, titles };
}

/**
 * Trace one spec: red when a requirement of it has no test, a token cites no known requirement
 * or a replaced one, or a shipped requirement nobody replaced is left without tests.
 */
export function trace(root, { id, text }) {
  const shipped = shippedSpecs(root, id);
  const known = new Set([...requirements(text).keys()].map((local) => `${id}-${local}`));
  for (const spec of shipped) for (const local of spec.requirements.keys()) known.add(`${spec.id}-${local}`);
  const replaced = new Map([...affectedRows(text)].filter(([, decision]) => decision === "replace").map(([global]) => [global, id]));
  for (const spec of shipped) for (const [global, decision] of spec.affected) if (decision === "replace") replaced.set(global, spec.id);

  const { projects, titles } = acceptanceTitles(root);
  const coverage = new Map();
  const problems = [];
  for (const title of titles) {
    for (const tag of title.tags) {
      const where = `${title.file}:${title.line}`;
      if (!known.has(tag)) problems.push(`@${tag} at ${where} cites no requirement of this spec or of a shipped spec.`);
      else if (replaced.has(tag)) problems.push(`@${tag} at ${where} cites a requirement replaced by ${replaced.get(tag)}; update or remove the test.`);
      coverage.set(tag, [...(coverage.get(tag) ?? []), where]);
    }
  }
  for (const global of known) {
    if (coverage.has(global) || replaced.has(global)) continue;
    problems.push(global.startsWith(`${id}-`) ? `${global} has no acceptance test tagged @${global}.` : `${global} of a shipped spec has no acceptance test left; restore it or replace the requirement.`);
  }
  const taggedFiles = new Set(titles.filter((title) => title.kind === "describe" && title.tags.length).map((title) => title.file));
  const untagged = titles.filter((title) => title.kind === "test" && !title.tags.length && !taggedFiles.has(title.file)).map((title) => `${title.file}:${title.line} ${title.title}`);
  return {
    spec: id,
    status: problems.length ? "red" : "green",
    acceptanceProjects: projects,
    problems,
    coverage: Object.fromEntries([...coverage].filter(([global]) => global.startsWith(`${id}-`))),
    warnings: untagged.length ? { untagged } : {},
  };
}
