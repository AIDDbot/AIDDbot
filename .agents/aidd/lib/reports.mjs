// Finding-only evaluation reports (`verification.md`, `qualification.md`) and
// how their presence and metadata back the latest journaled evaluation.
import fs from "node:fs";
import path from "node:path";
import { read } from "./frontmatter.mjs";

export const REPORTS = { verification: "verification.md", qualification: "qualification.md" };
export const KIND_BY_STAGE = { verify: "verification", qualify: "qualification" };

const PLACEHOLDERS = {
  verification: ["{ID or technical outcome}", "{Test or check}", "{Fail or blocked}", "{Observed output or link}"],
  qualification: ["{failed blocking gate or technical criterion}", "{Observed violation}", "{Observed facts or link}", "{short title}", "{paths or projects}", "{gate, technical criterion, or none}", "{blocking | debt}"],
};

function section(report, heading) {
  const start = report.indexOf(`${heading}\n`);
  if (start < 0) return "";
  const tail = report.slice(start + heading.length);
  const next = /^## /m.exec(tail);
  return next ? tail.slice(0, next.index) : tail;
}

function tableRows(text, header) {
  return text.split(/\r?\n/).filter((line) => line.startsWith("|") && !/^\|\s*:?-{2,}/.test(line) && !line.includes(header));
}

/** A non-green report must be filled in and hold at least one finding. */
export function validateFindings(kind, report) {
  const remaining = PLACEHOLDERS[kind].find((placeholder) => report.includes(placeholder));
  if (remaining) throw new Error(`Replace report template placeholder: ${remaining}`);
  if (kind === "verification") {
    if (!tableRows(section(report, "## Failures"), "Requirement / outcome").length) throw new Error("## Failures must contain a finding row.");
  } else if (!tableRows(section(report, "## Failed controls"), "| Control |").length && !/^### .+$/m.test(report)) {
    throw new Error("Qualification report must contain a failed control or a finding.");
  }
}

function metadata(report) {
  try {
    const fields = read(report, "Report");
    return { spec: fields.spec, status: fields.status, revision: fields.revision };
  } catch {
    return {};
  }
}

/**
 * Whether the report on disk agrees with a journaled evaluation:
 * absent for green, present with matching spec/status/revision otherwise.
 */
export function reportEvidence(specDir, kind, evaluation, specId) {
  const file = path.join(specDir, REPORTS[kind]);
  const stage = kind === "verification" ? "verify" : "qualify";
  if (!evaluation) return { ok: false, file, reason: `No journaled ${stage} evaluation` };
  if (evaluation.status === "green") return fs.existsSync(file)
    ? { ok: false, file, reason: `Green ${stage} requires the report to be absent` }
    : { ok: true, file, reason: "green evaluation; report absent" };
  if (!fs.existsSync(file)) return { ok: false, file, reason: `${evaluation.status} ${stage} requires a finding-only report` };
  const found = metadata(fs.readFileSync(file, "utf8"));
  if (found.spec !== specId || found.status !== evaluation.status || found.revision !== evaluation.revision) {
    const shown = [found.spec, found.status, found.revision].map((value) => value ?? "missing").join("/");
    return { ok: false, file, reason: `Report metadata (${shown}) does not match journal (${specId}/${evaluation.status}/${evaluation.revision})` };
  }
  return { ok: true, file, reason: `report matches ${evaluation.status} revision ${evaluation.revision}` };
}
