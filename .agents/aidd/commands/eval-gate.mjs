import { EXIT, parseArgs } from "../lib/cli.mjs";
import { readControl } from "../lib/control.mjs";
import { gate } from "../lib/gate.mjs";
import { findRoot } from "../lib/root.mjs";
import { resolveSpecDir } from "../lib/spec.mjs";

/** Exit 0 when the evidence permits shipping, 1 otherwise; the JSON lists every blocker. */
export default function evalGate(argv) {
  const { spec: input } = parseArgs(argv, { positional: ["spec"] });
  const root = findRoot();
  const { dir } = resolveSpecDir(root, input);
  const body = gate(root, dir, readControl(dir));
  return { body, exitCode: body.eligible ? EXIT.ok : EXIT.rule };
}
