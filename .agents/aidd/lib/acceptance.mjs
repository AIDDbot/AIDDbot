// The Playwright JSON report of an acceptance run (D27) and the triage of its failures
// (D20–D22). The core gathers the facts and proposes a disposition; the model chooses only
// where judgment is needed, and a failure is pre-existing only when recorded debt cites it (D21).
import fs from "node:fs";
import path from "node:path";
import { defaultBranch, git } from "./git.mjs";
import { productPath, relative } from "./paths.mjs";
import { affectedRows, shippedSpecs } from "./requirements.mjs";

// Dispositions a verification report may record, and those left to the model's judgment.
export const DISPOSITIONS = ["spec", "replaced", "pre-existing", "regression", "compatibility", "ambiguous"];
export const JUDGMENT = ["regression", "compatibility", "ambiguous"];
// A pre-existing failure is already recorded debt, so it never counts against the spec nor enters its report.
export const REPORTED = DISPOSITIONS.filter((disposition) => disposition !== "pre-existing");
// Playwright writes the JSON report here whatever its configuration says.
export const REPORT_ENV = "PLAYWRIGHT_JSON_OUTPUT_FILE";

const TOKEN = /@?(S\d{4}-R\d{2})\b/g;
const ANSI = /\u001b\[[0-9;]*m/g;
const MAX_ERROR = 300;

export const reportFile = (root, project) => path.join(root, project.path, project.acceptanceReport);

/** Every test outcome in the report: its title chain, file, line, requirement tags, status, and first error line. */
export function outcomes(report) {
  const rootDir = report.config?.rootDir ?? "";
  const list = [];
  const walk = (suite, chain) => {
    const titles = suite.title && suite.title !== suite.file ? [...chain, suite.title] : chain;
    for (const spec of suite.specs ?? []) {
      const title = [...titles, spec.title].join(" › ");
      const tags = new Set([...(spec.tags ?? []).map((tag) => `@${tag.replace(/^@/, "")}`), title].flatMap((text) => [...text.matchAll(TOKEN)].map((match) => match[1])));
      for (const test of spec.tests ?? []) {
        const failed = (test.results ?? []).find((result) => result.error || result.errors?.length);
        const message = failed?.error?.message ?? failed?.errors?.[0]?.message ?? "";
        list.push({
          test: title, file: path.resolve(rootDir, spec.file ?? suite.file ?? ""), line: spec.line ?? null,
          tags: [...tags], status: test.status, project: test.projectName || null,
          error: message.replace(ANSI, "").split(/\r?\n/).find((line) => line.trim())?.trim().slice(0, MAX_ERROR) ?? null,
        });
      }
    }
    for (const child of suite.suites ?? []) walk(child, titles);
  };
  for (const suite of report.suites ?? []) walk(suite, []);
  return list;
}

/** Repository files changed on this branch: committed since the merge-base, uncommitted, or new. */
function changedFiles(root) {
  const base = defaultBranch(root, null);
  const mergeBase = git(root, ["merge-base", base, "HEAD"], { quiet: true, allowFailure: true });
  const tracked = mergeBase ? git(root, ["diff", "--name-only", mergeBase], { quiet: true, allowFailure: true }) ?? "" : "";
  const untracked = git(root, ["ls-files", "--others", "--exclude-standard"], { quiet: true, allowFailure: true }) ?? "";
  return new Set(`${tracked}\n${untracked}`.split(/\r?\n/).filter(Boolean));
}

/** Open debt lines of the TDR, one per item: `- **D0001**: …`. */
function debtLines(root) {
  const file = productPath(root, "quality", "TDR.md");
  if (!fs.existsSync(file)) return [];
  return fs.readFileSync(file, "utf8").split(/\r?\n/).map((line) => /\*\*(D\d{4})\*\*/.exec(line) && { id: /\*\*(D\d{4})\*\*/.exec(line)[1], line }).filter(Boolean);
}

/**
 * Triage the failures of one run for the spec `spec` ({ id, text }), or for no spec.
 * Each failure carries its facts and either a proposed `disposition` or the `choices` left to the model.
 */
export function triage(root, spec, failures) {
  const own = spec ? `${spec.id}-` : null;
  const affected = spec ? affectedRows(spec.text) : new Map();
  const replaced = new Set([...affected].filter(([, decision]) => decision === "replace").map(([global]) => global));
  for (const shipped of shippedSpecs(root, spec?.id)) for (const [global, decision] of shipped.affected) if (decision === "replace") replaced.add(global);
  const changed = changedFiles(root);
  const debt = debtLines(root);
  return failures.map((failure) => {
    const file = relative(root, failure.file);
    const citing = debt.filter((item) => failure.tags.some((tag) => item.line.includes(tag)) || item.line.includes(file)).map((item) => item.id);
    const facts = {
      test: failure.test, file, line: failure.line, error: failure.error,
      requirements: failure.tags, owners: [...new Set(failure.tags.map((tag) => tag.slice(0, 5)))],
      changedInBranch: changed.has(file), debt: citing,
      affected: Object.fromEntries(failure.tags.filter((tag) => affected.has(tag)).map((tag) => [tag, affected.get(tag)])),
    };
    if (own && failure.tags.some((tag) => tag.startsWith(own))) return { ...facts, disposition: "spec" };
    if (failure.tags.some((tag) => replaced.has(tag))) return { ...facts, disposition: "replaced" };
    if (citing.length) return { ...facts, disposition: "pre-existing" };
    return { ...facts, disposition: null, choices: JUDGMENT };
  });
}
