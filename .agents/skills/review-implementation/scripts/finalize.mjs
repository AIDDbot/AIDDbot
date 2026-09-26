#!/usr/bin/env node
import { finalizeEvaluation } from "../../verify-behavior/scripts/evaluation.mjs";

try {
  finalizeEvaluation("qualification", process.argv.slice(2));
} catch (error) {
  process.stderr.write(`${error.message}\n`);
  process.exitCode = 1;
}
