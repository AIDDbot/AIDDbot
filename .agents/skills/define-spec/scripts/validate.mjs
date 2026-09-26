#!/usr/bin/env node
import { validateSpec } from "./validate/flow.mjs";

try {
  validateSpec(process.argv.slice(2));
} catch (error) {
  process.stderr.write(`${error.message}\n`);
  process.exitCode = 1;
}
