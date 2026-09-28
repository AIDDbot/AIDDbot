// The requirements local to a spec (D16), their acceptance rows, and the shipped behavior
// a spec affects (D17). A requirement's global form is `{spec id}-{local id}`, as `S0042-R03`.
import fs from "node:fs";
import path from "node:path";
import { RuleError } from "./cli.mjs";
import { CONTROL, readControl } from "./control.mjs";
import { specsDir } from "./spec.mjs";

export const DECISIONS = ["preserve", "replace"];
const LOCAL_ID = /^R\d{2}$/;
const GLOBAL_ID = /^(S\d{4})-(R\d{2})$/;

/** Body lines of one `## {name}` section, or null when the section is absent. */
export function section(text, name) {
  const heading = new RegExp(`^## ${name}[ \\t]*$`, "m").exec(text);
  if (!heading) return null;
  const tail = text.slice(heading.index + heading[0].length);
  const next = /^## /m.exec(tail);
  return (next ? tail.slice(0, next.index) : tail).split(/\r?\n/);
}

/** Data rows of the first Markdown table in `lines`, as trimmed cells; the header and separator are skipped. */
function tableRows(lines) {
  const rows = lines.filter((line) => line.trim().startsWith("|"))
    .map((line) => line.trim().replace(/^\||\|$/g, "").split("|").map((cell) => cell.trim()));
  return rows.slice(1).filter((cells) => !cells.every((cell) => /^:?-+:?$/.test(cell)));
}

/** `- **R01**: statement` lines of the Requirements section, as an ordered map of ID to statement. */
export function requirements(text) {
  const result = new Map();
  for (const line of section(text, "Requirements") ?? []) {
    if (!/\*\*R\d+\*\*/.test(line)) continue;
    const match = /^- \*\*(R\d{2})\*\*: (\S.*)$/.exec(line.trim());
    if (!match) throw new RuleError(`Malformed requirement line (expected "- **R01**: statement"): ${line.trim()}`);
    if (result.has(match[1])) throw new RuleError(`Requirement ${match[1]} is repeated.`);
    result.set(match[1], match[2]);
  }
  return result;
}

/** `| R01 | test |` rows of the Verification section: a map of requirement ID to its acceptance tests. */
export function acceptanceRows(text) {
  const lines = section(text, "Verification");
  if (!lines) throw new RuleError("Spec is missing the Verification section.");
  const result = new Map();
  for (const [id, test = ""] of tableRows(lines)) {
    if (!LOCAL_ID.test(id) || !test) throw new RuleError(`Malformed verification row (expected "| R01 | acceptance test |"): | ${id} | ${test} |`);
    result.set(id, [...(result.get(id) ?? []), test]);
  }
  return result;
}

/** `| S0017-R02 | preserve |` rows of the optional Affected behavior section: a map of global ID to decision. */
export function affectedRows(text) {
  const result = new Map();
  for (const [id, decision = ""] of tableRows(section(text, "Affected behavior") ?? [])) {
    if (!GLOBAL_ID.test(id)) throw new RuleError(`Affected behavior row needs a shipped requirement ID such as S0017-R02: ${id}`);
    if (!DECISIONS.includes(decision)) throw new RuleError(`Affected behavior ${id} must be ${DECISIONS.join(" or ")}, not "${decision}".`);
    if (result.has(id)) throw new RuleError(`Affected behavior repeats ${id}.`);
    result.set(id, decision);
  }
  return result;
}

/** Every shipped spec but `exceptId`, with its requirements and the prior behavior it replaced. */
export function shippedSpecs(root, exceptId = null) {
  const specs = specsDir(root);
  if (!fs.existsSync(specs)) return [];
  return fs.readdirSync(specs, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && /^S\d{4}-/.test(entry.name) && !entry.name.startsWith(`${exceptId}-`))
    .map((entry) => path.join(specs, entry.name))
    .filter((dir) => fs.existsSync(path.join(dir, CONTROL)) && readControl(dir).status === "shipped")
    .map((dir) => {
      const text = fs.readFileSync(path.join(dir, "spec.md"), "utf8");
      return { id: path.basename(dir).slice(0, 5), dir, requirements: requirements(text), affected: affectedRows(text) };
    });
}

const hasEarsKeywords = (statement) => /\b(?:IF|WHEN|WHILE|WHERE|SHALL)\b/.test(statement) && !/\b(?:if|when|while|where|shall)\b/.test(statement);

/**
 * Validate the requirement content of one spec and return its requirement IDs.
 * `approved` lists the IDs recorded at approval, which must all survive (D16).
 */
export function checkRequirements(root, text, { id, type, approved = [] }) {
  const own = requirements(text);
  const ids = [...own.keys()];
  if (["feat", "fix"].includes(type) && !ids.length) throw new RuleError(`A ${type} spec needs at least one requirement in its Requirements section.`);
  const numbers = ids.map((key) => Number(key.slice(1))).sort((a, b) => a - b);
  if (numbers.some((number, index) => number !== index + 1)) throw new RuleError(`Requirement IDs must run R01, R02, … without gaps; found ${ids.join(", ")}.`);
  for (const [key, statement] of own) if (!hasEarsKeywords(statement)) throw new RuleError(`Requirement ${key} must use EARS keywords (IF, WHEN, WHILE, WHERE, SHALL), in uppercase only.`);
  const lost = approved.filter((key) => !own.has(key));
  if (lost.length) throw new RuleError(`Approved requirements cannot disappear or be renumbered: ${lost.join(", ")}.`);
  const rows = acceptanceRows(text);
  for (const key of rows.keys()) if (!own.has(key)) throw new RuleError(`Verification row ${key} is not a requirement of this spec.`);
  for (const key of ids) if (!rows.has(key)) throw new RuleError(`Requirement ${key} has no acceptance test in the Verification table.`);
  const affected = affectedRows(text);
  if (affected.size) {
    const shipped = shippedSpecs(root, id);
    const replaced = new Map(shipped.flatMap((spec) => [...spec.affected].filter(([, decision]) => decision === "replace").map(([global]) => [global, spec.id])));
    for (const global of affected.keys()) {
      const [, specId, local] = GLOBAL_ID.exec(global);
      if (specId === id) throw new RuleError(`Affected behavior ${global} cites this spec; list only shipped specs.`);
      if (!shipped.find((spec) => spec.id === specId)?.requirements.has(local)) throw new RuleError(`Affected behavior ${global} is not a requirement of a shipped spec.`);
      if (replaced.has(global)) throw new RuleError(`Affected behavior ${global} was already replaced by ${replaced.get(global)}.`);
    }
  }
  return { requirements: ids, acceptanceRows: [...rows.values()].flat().length, affected: Object.fromEntries(affected) };
}
