// Turns the colors and fonts of DESIGN.md into CSS variables.
import { splitFrontmatter } from "./markdown.ts";

interface Typography {
  fontFamily?: string;
  fontSize?: string;
  fontWeight?: number;
  lineHeight?: number;
}

const FALLBACK: Record<string, string> = {
  "Fira Code": "ui-monospace, Consolas, monospace",
};

function family(name = "system-ui"): string {
  return `"${name}", ${FALLBACK[name] ?? "system-ui, sans-serif"}`;
}

/** CSS with one variable per color token: dark theme by default, light theme with `data-theme="light"`. */
export function themeCss(designMd: string): string {
  const { yaml } = splitFrontmatter(designMd);
  if (yaml === null) throw new Error("DESIGN.md: frontmatter not found");
  const design = Bun.YAML.parse(yaml) as { colors?: Record<string, string>; typography?: Record<string, Typography> };
  const colors = design.colors ?? {};
  const dark: string[] = [];
  const light: string[] = [];
  for (const [name, value] of Object.entries(colors)) {
    if (name.startsWith("light-")) light.push(`  --${name.slice(6)}: ${value};`);
    else dark.push(`  --${name}: ${value};`);
  }
  const type: string[] = [];
  for (const [name, t] of Object.entries(design.typography ?? {})) {
    type.push(`  --font-${name}: ${family(t.fontFamily)};`);
    if (t.fontSize) type.push(`  --size-${name}: ${t.fontSize};`);
    if (t.fontWeight) type.push(`  --weight-${name}: ${t.fontWeight};`);
    if (t.lineHeight) type.push(`  --line-${name}: ${t.lineHeight};`);
  }
  return [
    "/* Generated from DESIGN.md by the explorer builder. Do not edit. */",
    `:root {\n  color-scheme: dark;\n${dark.join("\n")}\n${type.join("\n")}\n}`,
    `:root[data-theme="light"] {\n  color-scheme: light;\n${light.join("\n")}\n}`,
    "",
  ].join("\n\n");
}

/** The color tokens of DESIGN.md, for the contrast checks. */
export function designColors(designMd: string): Record<string, string> {
  const { yaml } = splitFrontmatter(designMd);
  return ((yaml ? Bun.YAML.parse(yaml) : {}) as { colors?: Record<string, string> }).colors ?? {};
}
