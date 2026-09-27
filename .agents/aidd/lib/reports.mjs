// Finding-only evaluation reports (`verification.md`, `qualification.md`). They carry no
// metadata: `control.json` records each evaluation and whether it requires its report (D2).
import fs from "node:fs";
import path from "node:path";

export const REPORTS = { verification: "verification.md", qualification: "qualification.md" };

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

/**
 * Whether the report on disk agrees with the latest recorded evaluation of its kind:
 * absent when the evaluation requires none, present and filled in when it does.
 */
export function reportEvidence(specDir, kind, evaluation) {
  const file = path.join(specDir, REPORTS[kind]);
  if (!evaluation) return { ok: false, file, reason: `No recorded ${kind}` };
  if (!evaluation.report) return fs.existsSync(file)
    ? { ok: false, file, reason: `${evaluation.status} ${kind} requires the report to be absent` }
    : { ok: true, file, reason: `${evaluation.status} revision ${evaluation.revision}; report absent` };
  if (!fs.existsSync(file)) return { ok: false, file, reason: `${evaluation.status} ${kind} requires its finding-only report` };
  try {
    validateFindings(kind, fs.readFileSync(file, "utf8"));
  } catch (error) {
    return { ok: false, file, reason: error.message };
  }
  return { ok: true, file, reason: `${evaluation.status} revision ${evaluation.revision}; report present` };
}
