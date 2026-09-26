import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const TEMPLATE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..", "assets", "spec.template.md");

export function parseCounters(text) {
  const values = {};
  for (const key of ["spec", "functional", "technical", "debt"]) {
    const matches = [...text.matchAll(new RegExp(`^${key}:\\s*(\\d+)\\s*$`, "gm"))];
    if (matches.length !== 1) throw new Error(`Counters must contain exactly one numeric ${key} field.`);
    values[key] = Number(matches[0][1]);
  }
  return values;
}

export function reserveCounters(text, counters, options, specNumber) {
  const increments = { spec: specNumber, functional: counters.functional + options.functional, technical: counters.technical + options.technical };
  return Object.entries(increments).reduce((result, [key, value]) => replaceCounter(result, key, value), text);
}

function replaceCounter(text, key, value) {
  return text.replace(new RegExp(`^${key}:\\s*\\d+\\s*$`, "m"), `${key}: ${value}`);
}

export function writeCounters(file, contents) {
  const temporary = `${file}.${process.pid}.tmp`;
  fs.writeFileSync(temporary, contents, "utf8");
  fs.renameSync(temporary, file);
}

export function writeSpec(product, options, identity) {
  const template = fs.readFileSync(TEMPLATE, "utf8");
  const content = template.replaceAll("S0001", identity.id).replaceAll("{slug}", options.slug)
    .replaceAll("{title}", options.title).replace(/^type: feat/m, `type: ${options.type}`)
    .replaceAll("{DateTime}", new Date().toISOString());
  const file = path.join(product, "specs", identity.key, "spec.md");
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content, "utf8");
  return file;
}

export function makeId(kind, number) {
  return `${kind}${String(number).padStart(4, "0")}`;
}
