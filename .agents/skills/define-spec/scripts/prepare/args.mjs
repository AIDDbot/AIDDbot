const TYPES = new Set(["feat", "fix", "refactor", "chore"]);
const FLAGS = { "--functional": "functional", "--technical": "technical", "--product": "product", "--base": "base" };

export function parseArgs(argv) {
  if (argv.length < 3) throw new Error("Provide the spec type, slug, and title.");
  const [type, slug, title, ...rest] = argv;
  if (!TYPES.has(type)) throw new Error(`Invalid type: ${type}`);
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) throw new Error(`Slug must be lowercase kebab-case: ${slug}`);
  if (!title.trim() || /[\r\n]/.test(title)) throw new Error("Title must be non-empty and on one line.");
  return { type, slug, title: title.trim(), ...parseFlags(rest) };
}

function parseFlags(args) {
  const options = { functional: 0, technical: 0, product: ".product", base: null };
  const seen = new Set();
  for (let index = 0; index < args.length; index += 2) assignFlag(args, index, options, seen);
  return options;
}

function assignFlag(args, index, options, seen) {
  const name = args[index];
  const value = args[index + 1];
  const key = FLAGS[name];
  if (!key || !value) throw new Error(`Invalid option: ${name}`);
  if (seen.has(key)) throw new Error(`Duplicate option: ${name}`);
  seen.add(key);
  options[key] = ["functional", "technical"].includes(key) ? count(name, value) : value;
}

function count(name, value) {
  if (!/^\d+$/.test(value)) throw new Error(`${name} must be a non-negative integer.`);
  return Number(value);
}
