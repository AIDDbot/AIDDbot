import fs from "node:fs";
import { EXIT, parseArgs, UsageError } from "../lib/cli.mjs";
import { specFromBranch } from "../lib/git.mjs";
import { findRoot } from "../lib/root.mjs";
import { readSpecFields, resolveSpecDir } from "../lib/spec.mjs";
import { trace } from "../lib/trace.mjs";

/** Trace a spec's requirements to its tagged acceptance tests; exits 1 when the trace is red (D18). */
export default function traceCommand(argv) {
  const { spec: input } = parseArgs(argv, { optional: ["spec"] });
  const root = findRoot();
  const target = input ?? specFromBranch(root);
  if (!target) throw new UsageError("Name a spec, or run from its branch.");
  const { file } = resolveSpecDir(root, target);
  const { id } = readSpecFields(file, ["id"]);
  const result = trace(root, { id, text: fs.readFileSync(file, "utf8") });
  return { body: result, exitCode: result.status === "red" ? EXIT.rule : EXIT.ok };
}
