import fs from "node:fs";
import path from "node:path";

function field(report, name, pattern) {
  return new RegExp(`^${name}:\\s*${pattern}\\s*$`, "mi").exec(report)?.[1];
}

export function reportEvidence(specDir, kind, evaluation) {
  const file = path.join(specDir, `${kind === "verify" ? "verification" : "qualification"}.md`);
  if (!evaluation) return { ok: false, file, reason: `No journaled ${kind} evaluation` };
  if (evaluation.status === "green") return fs.existsSync(file)
    ? { ok: false, file, reason: `Green ${kind} requires the report to be absent` }
    : { ok: true, file, reason: "green evaluation; report absent" };
  if (!fs.existsSync(file)) return { ok: false, file, reason: `${evaluation.status} ${kind} requires a finding-only report` };
  const report = fs.readFileSync(file, "utf8");
  const metadata = [field(report, "spec", "(S\\d{4})"), field(report, "status", "(green|amber|red)"), field(report, "revision", "(\\d+)")];
  if (metadata[0] !== evaluation.spec || metadata[1] !== evaluation.status || metadata[2] !== evaluation.revision) {
    return { ok: false, file, reason: `Report metadata (${metadata.map((value) => value ?? "missing").join("/")}) does not match journal (${evaluation.spec}/${evaluation.status}/${evaluation.revision})` };
  }
  return { ok: true, file, reason: `report matches ${evaluation.status} revision ${evaluation.revision}` };
}
