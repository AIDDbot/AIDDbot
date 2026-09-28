// `{spec}/control.json`: the versioned process state of one spec, written only by the core (D2).
// Humans read it through `aidd spec show`; nothing else edits it.
import fs from "node:fs";
import path from "node:path";
import { RuleError } from "./cli.mjs";
import { writeAtomic } from "./files.mjs";

export const CONTROL = "control.json";
export const STATES = ["draft", "in-progress", "verified", "qualified", "shipped"];
export const EVALUATION_KINDS = ["verification", "qualification"];
export const EVALUATION_STATUSES = ["green", "amber", "red"];

// The state chain (D8, D24). A red evaluation sends a spec back to in-progress; `qualified`
// means the qualification is closed and shipping is eligible, so only it reaches `shipped`.
const TRANSITIONS = {
  draft: ["in-progress"],
  "in-progress": ["in-progress", "verified", "qualified"],
  verified: ["in-progress", "verified", "qualified"],
  qualified: ["in-progress", "verified", "qualified", "shipped"],
  shipped: [],
};

const KEYS = ["id", "key", "type", "branch", "status", "created_at", "approved", "evaluations", "blocked", "shipped"];
const isObject = (value) => value !== null && typeof value === "object" && !Array.isArray(value);

export const controlFile = (specDir) => path.join(specDir, CONTROL);

export function createControl({ id, key, type, branch }) {
  return { id, key, type, branch, status: "draft", created_at: new Date().toISOString(), approved: null, evaluations: [], blocked: null, shipped: null };
}

/** Throw on the first schema violation; return the value when valid. */
export function validateControl(control) {
  if (!isObject(control)) throw new RuleError("control.json must be a JSON object.");
  const extra = Object.keys(control).find((key) => !KEYS.includes(key));
  if (extra) throw new RuleError(`control.json has an unknown key: ${extra}`);
  if (!/^S\d{4}$/.test(control.id ?? "") || control.key?.split("-")[0] !== control.id) throw new RuleError("control.json id and key do not agree.");
  if (control.branch !== `${control.type}/${control.key}`) throw new RuleError("control.json type, branch, and key do not agree.");
  if (!STATES.includes(control.status)) throw new RuleError(`control.json has an unknown status: ${control.status}`);
  if (!Array.isArray(control.evaluations)) throw new RuleError("control.json evaluations must be a list.");
  for (const entry of control.evaluations) {
    if (!EVALUATION_KINDS.includes(entry?.kind) || !EVALUATION_STATUSES.includes(entry.status) || !Number.isInteger(entry.revision)) {
      throw new RuleError(`control.json has an invalid evaluation: ${JSON.stringify(entry)}`);
    }
  }
  for (const key of ["approved", "blocked", "shipped"]) if (control[key] !== null && !isObject(control[key])) throw new RuleError(`control.json ${key} must be null or an object.`);
  return control;
}

export function readControl(specDir) {
  const file = controlFile(specDir);
  if (!fs.existsSync(file)) throw new RuleError(`Spec control file is missing: ${file}`);
  let value;
  try { value = JSON.parse(fs.readFileSync(file, "utf8")); } catch (error) { throw new RuleError(`${file} is not valid JSON: ${error.message}`); }
  return validateControl(value);
}

export function writeControl(specDir, control) {
  validateControl(control);
  writeAtomic(controlFile(specDir), `${JSON.stringify(control, null, 2)}\n`);
}

/** Move to `next`, rejecting any transition the chain does not allow. */
export function transition(control, next) {
  if (!STATES.includes(next)) throw new RuleError(`Unknown spec state: ${next}`);
  if (!TRANSITIONS[control.status].includes(next)) throw new RuleError(`Illegal spec transition: ${control.status} -> ${next}.`);
  control.status = next;
  return control;
}

/** Reject any state change while the spec is blocked (D23); `aidd spec resume` clears it. */
export function assertNotBlocked(control) {
  if (control.blocked) throw new RuleError(`${control.id} is blocked: ${control.blocked.reason}. Resolve it and run aidd spec resume.`);
}

/** The latest evaluation of one kind, or null. */
export const latestEvaluation = (control, kind) => control.evaluations.filter((entry) => entry.kind === kind).at(-1) ?? null;
