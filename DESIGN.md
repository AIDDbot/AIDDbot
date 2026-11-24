---
version: alpha
name: AIDDbot
description: Visual identity for AIDDbot web pages, documents, slides, and diagrams.
aiddbot:
  id: design-system-0001
  type: design-system
  title: AIDDbot Design System
  status: draft
  date: "2026-11-24"
  links:
    sources:
      - https://github.com/google-labs-code/design.md/blob/0.4.0/docs/spec.md
      - https://github.com/Testing-IA-TrIT/testing-ia-repaso/blob/main/assets/styles.css
      - https://albertobasalo.dev/logo_2.png
      - https://www.w3.org/TR/WCAG22/
      - https://mermaid.js.org/config/theming.html
    related: []
    supersedes: []
colors:
  canvas: "#040711"
  surface: "#111A31"
  outline: "#334166"
  on-surface: "#E8ECF8"
  muted: "#9AA5C4"
  primary: "#60A5FA"
  on-primary: "#040711"
  verified: "#4ADE80"
  warning: "#FBBF24"
  danger: "#F87171"
  brand-blue: "#3B82F6"
  brand-green: "#22C55E"
  light-canvas: "#F8FAFC"
  light-surface: "#FFFFFF"
  light-outline: "#CBD5E1"
  light-on-surface: "#0F172A"
  light-muted: "#475569"
  light-primary: "#1D4ED8"
  light-on-primary: "#FFFFFF"
  light-verified: "#15803D"
  light-warning: "#B45309"
  light-danger: "#B91C1C"
typography:
  display:
    fontFamily: Audiowide
    fontSize: 2rem
    fontWeight: 400
    lineHeight: 1.2
  headline-md:
    fontFamily: Roboto
    fontSize: 1.5rem
    fontWeight: 500
    lineHeight: 1.3
  headline-sm:
    fontFamily: Roboto
    fontSize: 1.25rem
    fontWeight: 500
    lineHeight: 1.4
  body-md:
    fontFamily: Roboto
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.6
  label-sm:
    fontFamily: Roboto
    fontSize: 0.875rem
    fontWeight: 500
    lineHeight: 1.4
  code:
    fontFamily: Fira Code
    fontSize: 0.9375rem
    fontWeight: 400
    lineHeight: 1.6
    fontFeature: '"liga" 0, "calt" 0'
spacing:
  xs: 0.25rem
  sm: 0.5rem
  md: 1rem
  lg: 1.5rem
  xl: 3rem
rounded:
  md: 0.5rem
  full: 9999px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.md}"
    padding: 0.5rem 1rem
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.md}"
    padding: "{spacing.lg}"
  code-block:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    typography: "{typography.code}"
    rounded: "{rounded.md}"
    padding: "{spacing.md}"
  status-verified:
    textColor: "{colors.verified}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.full}"
  status-warning:
    textColor: "{colors.warning}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.full}"
  status-danger:
    textColor: "{colors.danger}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.full}"
  status-neutral:
    textColor: "{colors.muted}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.full}"
---

# AIDDbot Design System

## Overview

Use this visual identity for every AIDDbot visual output: web pages, documents, slides, and diagrams. Help readers follow how software work moves between people, agents, and tools. Use dark surfaces, clear labels, and blue and green accents. [Testing Inteligente stylesheet](https://github.com/Testing-IA-TrIT/testing-ia-repaso/blob/main/assets/styles.css)

### Brand mark

<img src="https://albertobasalo.dev/logo_2.png" alt="Alberto Basalo icon" width="80" height="80">

Use the original icon beside the text `AIDDbot` in headers, on title slides, and as the favicon. Keep its proportions and colors. Place it on a dark neutral tile in light layouts. [Original PNG](https://albertobasalo.dev/logo_2.png). Add a local copy to the repository when an artifact needs it offline.

Use empty alternative text when adjacent text names the brand. Give an icon-only home link the accessible name `AIDDbot home`.

Open question: AIDDbot uses the author's icon for now. Decide later if AIDDbot needs its own logo.

## Colors

The tokens without a prefix are the default dark theme. The `light-` tokens are the light theme. Each `light-` token replaces the token with the same name. The brand accents apply in both themes.

- Use `canvas` for the page and `surface` for cards, tables, and code blocks. Pair both with `on-surface` for main text and `muted` for secondary text.
- Draw a 1px `outline` border around cards and tables. `surface` alone is too close to `canvas`.
- Use `muted` for the borders of inputs and other controls. It meets the `3:1` contrast for required visual cues.
- Use `primary` blue for links, primary actions, the current step, and keyboard focus. Pair solid blue buttons with `on-primary` text.
- Use the status colors with a text label, never alone:
  - `verified` green for checks that pass.
  - `warning` amber for conflicts, open questions, and risks.
  - `danger` red for failed checks and errors.
- Use `brand-blue` and `brand-green` for decorative accents only. `brand-green` does not have enough contrast for text on the light theme.

## Typography

- Use `display` (Audiowide) for the wordmark, page titles, slide titles, and short feature headings.
- Use Roboto for reading text, controls, tables, and section headings: `headline-md`, `headline-sm`, `body-md`, and `label-sm`.
- Use `code` (Fira Code) for commands, source code, paths, and document IDs. Its ligatures are off, so the reader sees each character.
- Fallback fonts: `system-ui, sans-serif` after Audiowide and Roboto; `ui-monospace, Consolas, monospace` after Fira Code.
- All three fonts use the SIL Open Font License. Host them with the artifact or embed them in exported files.

## Layout

Let the content determine the layout. Use `spacing.sm` between related controls, `spacing.md` inside compact panels, `spacing.lg` between groups, and `spacing.xl` for page and slide margins. Use a single column on narrow screens.

## Shapes

Use `rounded.md` for buttons, cards, code blocks, and the tile behind the brand mark. Use `rounded.full` for status labels.

## Components

- **Actions.** Give the main action a solid blue button. Underline links in running text. Show keyboard focus on all controls.
- **Status labels.** Use `status-verified`, `status-warning`, `status-danger`, or `status-neutral`, always with visible text. Use `status-neutral` for `Planned` and `Example`.
- **Walkthroughs and diagrams.** Mark the current step in blue and give it a text label. Label nodes and connections. Provide a text equivalent for each diagram.
- **Motion.** Animate state changes and handoffs when the reader acts. Respect `prefers-reduced-motion` and show the same change with a static cue.

## Formats

| Format | Theme | Rules |
| --- | --- | --- |
| Web pages | Dark by default. Light when the reader prefers it. | Follow all sections above. |
| Slides | Dark. | 16:9 at 1920×1080. Double every type size: body text is 32px. One idea per slide. Put the brand mark on the title slide only. Embed the fonts when you export to `.pptx` or `.pdf`. |
| Documents and print | Light. | Use the `light-` tokens. Keep `display` for the document title only. |
| Diagrams | The theme of the host. | See below. |

### Mermaid diagrams

In repository Markdown, use only the portable subset. It renders in GitHub, Obsidian, VS Code, and older Mermaid versions:

- Diagram types: `graph` (with `LR` or `TD`) and `sequenceDiagram`.
- Node IDs: letters and digits only, such as `ChangeType`. Put the visible text in square brackets: `ChangeType[Change type]`.
- Edges: `-->` for a relationship and `-.->` for a secondary one, such as "is a". Put the label between bars: `A -->|has| B`.
- Do not use styles, classes, themes, `init` directives, icons, HTML, or new diagram types. Put counts and other details in a table next to the diagram.

In repository Markdown, do not set a theme. GitHub adapts the diagram to the reader's theme. In the explorer, slides, and exported documents, use the `base` theme with these variables ([Mermaid theming](https://mermaid.js.org/config/theming.html)):

```text
%%{init: {"theme": "base", "themeVariables": {
  "darkMode": true,
  "background": "#040711",
  "primaryColor": "#111A31",
  "primaryTextColor": "#E8ECF8",
  "primaryBorderColor": "#60A5FA",
  "secondaryColor": "#111A31",
  "secondaryBorderColor": "#22C55E",
  "tertiaryColor": "#040711",
  "lineColor": "#9AA5C4",
  "fontFamily": "Roboto, system-ui, sans-serif"
}}}%%
```

For the light theme, use the matching `light-` values and set `darkMode` to `false`.

## Do's and Don'ts

- Use one primary action per view or slide. Use opaque surfaces behind reading content.
- Do not use color as the only signal. Pair every status color with a text label.
- Verify `4.5:1` contrast for regular text and `3:1` for required visual cues. [WCAG 2.2](https://www.w3.org/TR/WCAG22/#distinguishable)
- Check the mark at header and favicon sizes. Test keyboard focus, narrow screens, and reduced motion. Record the results in the [UI checklist](DOCUMENTATION-CATALOG.md#fragment-catalog).

## Change history

- v5. Link the brand mark to its original URL; the local copy was removed.
- v4. Define the portable Mermaid subset for repository Markdown.
- v3. Follow the DESIGN.md 0.4.0 schema: flat color names for the light theme, one font family per token, component tokens. Extend the scope to documents, slides, and Mermaid diagrams. Add `warning`, `danger`, and `outline` colors, a fuller type scale, and format rules.
- v2. Move the guide to the root and express design tokens in the open DESIGN.md format.
- v1. Define the shared typography, palette, brand mark, and UI review checks.
