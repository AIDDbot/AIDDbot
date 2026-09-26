#!/usr/bin/env node
import { prepareSpec } from "./prepare/flow.mjs";

try {
  prepareSpec(process.argv.slice(2));
} catch (error) {
  process.stderr.write(`${error.message}\n`);
  process.exitCode = 1;
}
