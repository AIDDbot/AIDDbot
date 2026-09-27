// Arguments, JSON output, and the fixed exit codes of the core (D1):
// 0 success, 1 rejected by a rule, 2 incorrect usage, 3 nothing configured to run (D6).
export const EXIT = { ok: 0, rule: 1, usage: 2, unavailable: 3 };

export class UsageError extends Error {}
export class RuleError extends Error {}
/** No project has the requested command kind configured; never invented, only reported (D6). */
export class UnavailableError extends Error {}

/**
 * Parse `argv` against a declared shape.
 * - `positional`: required names, in order; `optional`: trailing optional names.
 * - `flags`: `{ name: "string" | "int" | "boolean" }`, written `--name value` or `--name`.
 */
export function parseArgs(argv, { positional = [], optional = [], flags = {} } = {}) {
  const values = {};
  const words = [];
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (!arg.startsWith("--")) { words.push(arg); continue; }
    const name = arg.slice(2);
    const kind = flags[name];
    if (!kind) throw new UsageError(`Unknown option: ${arg}`);
    if (Object.hasOwn(values, name)) throw new UsageError(`Duplicate option: ${arg}`);
    if (kind === "boolean") { values[name] = true; continue; }
    const value = argv[index + 1];
    if (value === undefined || value.startsWith("--")) throw new UsageError(`Option ${arg} needs a value.`);
    index += 1;
    if (kind === "int") {
      if (!/^\d+$/.test(value)) throw new UsageError(`${arg} must be a non-negative integer.`);
      values[name] = Number(value);
    } else values[name] = value;
  }
  if (words.length < positional.length) throw new UsageError(`Missing argument: <${positional[words.length]}>`);
  if (words.length > positional.length + optional.length) throw new UsageError(`Unexpected argument: ${words[positional.length + optional.length]}`);
  [...positional, ...optional].forEach((name, index) => { if (index < words.length) values[name] = words[index]; });
  return values;
}

export function emit(result) {
  process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
}

/** Run one command handler, print its JSON result, and map errors to exit codes. */
export async function run(handler, argv, usage) {
  try {
    const result = await handler(argv);
    if (result !== undefined) emit(result.body ?? result);
    return result?.exitCode ?? EXIT.ok;
  } catch (error) {
    const code = error instanceof UsageError ? EXIT.usage : error instanceof UnavailableError ? EXIT.unavailable : EXIT.rule;
    emit({ ok: false, error: error.message });
    process.stderr.write(`${error.message}\n${code === EXIT.usage && usage ? `Usage: ${usage}\n` : ""}`);
    return code;
  }
}
