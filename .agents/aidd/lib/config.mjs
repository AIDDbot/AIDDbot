// `.aiddbot/config.json`: versioned, written only by the core (D6).
// Schema: { projects: { <name>: { path, commands: { lint, unit, acceptance, quality[] }, ports?: [], acceptanceReport? } } }
// Optional `release: { versionFiles: [] }` lists the JSON files that carry the product version (D38).
// `acceptanceReport` is the project-relative path of the Playwright JSON report of `acceptance` (D27).
import fs from "node:fs";
import path from "node:path";
import { writeAtomic } from "./files.mjs";
import { AIDDBOT } from "./paths.mjs";

export const CONFIG_FILE = `${AIDDBOT}/config.json`;
export const EMPTY_CONFIG = Object.freeze({ projects: {} });

const PROJECT_NAME = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const COMMAND_KINDS = { lint: "string", unit: "string", acceptance: "string", quality: "list" };
export const RUN_KINDS = Object.keys(COMMAND_KINDS);

const isObject = (value) => value !== null && typeof value === "object" && !Array.isArray(value);
const nonEmpty = (value) => typeof value === "string" && value.trim() !== "";

function unknownKeys(value, allowed, where) {
  const extra = Object.keys(value).filter((key) => !allowed.includes(key));
  if (extra.length) throw new Error(`Unknown key ${where ? `${where}.` : ""}${extra[0]}; allowed: ${allowed.join(", ")}.`);
}

function validateCommands(commands, where) {
  if (!isObject(commands)) throw new Error(`${where} must be an object.`);
  unknownKeys(commands, Object.keys(COMMAND_KINDS), where);
  for (const [kind, shape] of Object.entries(COMMAND_KINDS)) {
    if (!Object.hasOwn(commands, kind)) continue;
    const value = commands[kind];
    const ok = shape === "list" ? Array.isArray(value) && value.every(nonEmpty) : nonEmpty(value);
    if (!ok) throw new Error(`${where}.${kind} must be ${shape === "list" ? "a list of non-empty commands" : "a non-empty command"}.`);
  }
}

const isInsidePath = (value) => nonEmpty(value) && !path.isAbsolute(value) && !value.includes("\\") && !value.split("/").includes("..");

const isPort = (value) => Number.isInteger(value) && value > 0 && value <= 65535;

function validatePorts(ports, where) {
  if (!Array.isArray(ports) || !ports.every(isPort)) throw new Error(`${where} must be a list of TCP ports (1-65535).`);
}

/** Throw on the first schema violation; return the value when valid. */
export function validateConfig(config) {
  if (!isObject(config)) throw new Error("Configuration must be a JSON object.");
  unknownKeys(config, ["projects", "release"], "");
  if (Object.hasOwn(config, "release")) {
    if (!isObject(config.release)) throw new Error("release must be an object.");
    unknownKeys(config.release, ["versionFiles"], "release");
    const files = config.release.versionFiles;
    if (!Array.isArray(files) || !files.length || !files.every(isInsidePath) || !files.every((file) => file.endsWith(".json"))) {
      throw new Error("release.versionFiles must be a non-empty list of repository-relative JSON files.");
    }
  }
  if (!isObject(config.projects)) throw new Error("projects must be an object.");
  for (const [name, project] of Object.entries(config.projects)) {
    const where = `projects.${name}`;
    if (!PROJECT_NAME.test(name)) throw new Error(`Project name must be lowercase kebab-case: ${name}`);
    if (!isObject(project)) throw new Error(`${where} must be an object.`);
    unknownKeys(project, ["path", "commands", "ports", "acceptanceReport"], where);
    if (!isInsidePath(project.path)) throw new Error(`${where}.path must be a relative path with forward slashes inside the repository.`);
    if (!isObject(project.commands)) throw new Error(`${where}.commands must be an object.`);
    validateCommands(project.commands, `${where}.commands`);
    if (Object.hasOwn(project, "ports")) validatePorts(project.ports, `${where}.ports`);
    if (Object.hasOwn(project, "acceptanceReport")) {
      if (!project.commands.acceptance) throw new Error(`${where}.acceptanceReport needs an acceptance command.`);
      if (!isInsidePath(project.acceptanceReport)) throw new Error(`${where}.acceptanceReport must be a relative path with forward slashes inside the project.`);
    }
  }
  return config;
}

export const configText = (config) => `${JSON.stringify(config, null, 2)}\n`;

export function readConfig(root) {
  const file = path.join(root, ...CONFIG_FILE.split("/"));
  if (!fs.existsSync(file)) throw new Error(`${CONFIG_FILE} is missing; run aiddbot init.`);
  let value;
  try { value = JSON.parse(fs.readFileSync(file, "utf8")); } catch (error) { throw new Error(`${CONFIG_FILE} is not valid JSON: ${error.message}`); }
  return validateConfig(value);
}

export function writeConfig(root, config) {
  validateConfig(config);
  writeAtomic(path.join(root, ...CONFIG_FILE.split("/")), configText(config));
}
