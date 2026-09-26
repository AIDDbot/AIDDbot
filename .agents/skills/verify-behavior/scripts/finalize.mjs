#!/usr/bin/env node
import { finalizeEvaluation } from "./evaluation.mjs";

try {
  finalizeEvaluation("verification", process.argv.slice(2));
} catch (error) {
  process.stderr.write(`${error.message}\n`);
  process.exitCode = 1;
}
