import fs from "node:fs";
import path from "node:path";

export const REPORTS = { verification: "verification.md", qualification: "qualification.md" };

export function validateFindings(kind, report) {
  rejectPlaceholders(kind, report);
  if (kind === "verification") requireTableRows(report, "## Failures", "Requirement / outcome");
  else requireQualificationFinding(report);
}

function rejectPlaceholders(kind, report) {
  const placeholders = kind === "verification"
    ? ["{ID or technical outcome}", "{Test or check}", "{Fail or blocked}", "{Observed output or link}"]
    : ["{failed blocking gate or technical criterion}", "{Observed violation}", "{Observed facts or link}", "{short title}", "{paths or projects}", "{gate, technical criterion, or none}", "{blocking | debt}"];
  const remaining = placeholders.find((placeholder) => report.includes(placeholder));
  if (remaining) throw new Error(`Replace report template placeholder: ${remaining}`);
}

function section(report, heading) {
  const start = report.indexOf(`${heading}\n`);
  if (start < 0) return "";
  const tail = report.slice(start + heading.length);
  const next = /^## /m.exec(tail);
  return next ? tail.slice(0, next.index) : tail;
}

function tableRows(text, header) {
  return text.split(/\r?\n/).filter((line) => line.startsWith("|")
    && !/^\|\s*:?-{2,}/.test(line) && !line.includes(header));
}

function requireTableRows(report, heading, header) {
  if (!tableRows(section(report, heading), header).length) throw new Error(`${heading} must contain a finding row.`);
}

function requireQualificationFinding(report) {
  const controls = tableRows(section(report, "## Failed controls"), "| Control |");
  if (!controls.length && !/^### .+$/m.test(report)) throw new Error("Qualification report must contain a failed control or a finding.");
}

export function checkPriorVerification(specDir, specId, verification) {
  if (!verification) throw new Error("Qualification has no journaled verification evidence.");
  const file = path.join(specDir, REPORTS.verification);
  if (verification.status === "Info") {
    if (fs.existsSync(file)) throw new Error("Green verification must have no report before qualification.");
    return;
  }
  if (verification.status !== "Error" || Number(verification.revision) < 3) {
    throw new Error("Qualification requires green verification or red verification at revision 3 or later.");
  }
  if (!fs.existsSync(file)) throw new Error("Red verification at revision 3 or later requires its current findings report.");
  checkReportMatch(file, specId, verification);
}

function checkReportMatch(file, specId, event) {
  const report = fs.readFileSync(file, "utf8");
  const id = /^spec:\s*(S\d{4})\s*$/m.exec(report)?.[1];
  const status = /^status:\s*(green|amber|red)\s*$/m.exec(report)?.[1];
  const revision = /^revision:\s*(\d+)\s*$/m.exec(report)?.[1];
  if (id !== specId || status !== "red" || revision !== event.revision) throw new Error("Verification report does not match the latest red revision 3+ journal event.");
  validateFindings("verification", report);
}
