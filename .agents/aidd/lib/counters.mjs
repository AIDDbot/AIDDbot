// `.aiddbot/counters.yaml`: the single source of record IDs (D9). Requirement IDs are
// local to their spec (D16), so only specs and debt are counted (D25).
import { writeAtomic } from "./files.mjs";
import { aiddbotPath } from "./paths.mjs";

export const COUNTER_KEYS = ["spec", "debt"];

export const countersFile = (root) => aiddbotPath(root, "counters.yaml");

export function parseCounters(text) {
  const values = {};
  for (const key of COUNTER_KEYS) {
    const matches = [...text.matchAll(new RegExp(`^${key}:\\s*(\\d+)\\s*$`, "gm"))];
    if (matches.length !== 1) throw new Error(`Counters must contain exactly one numeric ${key} field.`);
    values[key] = Number(matches[0][1]);
  }
  return values;
}

/** Replace the given counters in `text`, keeping every other line untouched. */
export function setCounters(text, values) {
  return Object.entries(values).reduce((result, [key, value]) => result.replace(new RegExp(`^${key}:[ \\t]*\\d+[ \\t]*$`, "m"), `${key}: ${value}`), text);
}

export function writeCounters(root, text) {
  writeAtomic(countersFile(root), text);
}

export function makeId(kind, number) {
  return `${kind}${String(number).padStart(4, "0")}`;
}
