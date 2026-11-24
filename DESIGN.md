---
version: alpha
name: AIDDbot
description: Visual identity for AIDDbot documents and diagrams.
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
---

# AIDDbot Design System

## Overview

Use this visual identity for AIDDbot visual outputs: documents and diagrams. Use dark surfaces, clear labels, and blue and green accents. [Testing Inteligente stylesheet](https://github.com/Testing-IA-TrIT/testing-ia-repaso/blob/main/assets/styles.css)

### Brand mark

<img src="https://albertobasalo.dev/logo_2.png" alt="Alberto Basalo icon" width="80" height="80">

Use the original icon beside the text `AIDDbot`. Keep its proportions and colors. [Original PNG](https://albertobasalo.dev/logo_2.png)

Open question: AIDDbot uses the author's icon for now. Decide later if AIDDbot needs its own logo.

## Colors

The tokens without a prefix are the default dark theme. The `light-` tokens are the light theme. Each `light-` token replaces the token with the same name. The brand accents apply in both themes. Use the light theme for documents and print.

- Use `canvas` for the page and `surface` for cards, tables, and code blocks. Pair both with `on-surface` for main text and `muted` for secondary text.
- Draw a 1px `outline` border around cards and tables. `surface` alone is too close to `canvas`.
- Use `primary` blue for links, primary actions, the current step, and keyboard focus. Pair solid blue buttons with `on-primary` text.
- Use the status colors with a text label, never alone:
  - `verified` green for checks that pass.
  - `warning` amber for conflicts, open questions, and risks.
  - `danger` red for failed checks and errors.
- Use `brand-blue` and `brand-green` for decorative accents only. `brand-green` does not have enough contrast for text on the light theme.
- Verify `4.5:1` contrast for regular text and `3:1` for required visual cues. [WCAG 2.2](https://www.w3.org/TR/WCAG22/#distinguishable)

## Typography

- Use `display` (Audiowide) for the wordmark and titles.
- Use Roboto for reading text, controls, tables, and section headings: `headline-md`, `headline-sm`, `body-md`, and `label-sm`.
- Use `code` (Fira Code) for commands, source code, paths, and document IDs. Its ligatures are off, so the reader sees each character.
- Fallback fonts: `system-ui, sans-serif` after Audiowide and Roboto; `ui-monospace, Consolas, monospace` after Fira Code.
- All three fonts use the SIL Open Font License. Host them with the artifact or embed them in exported files.

## Mermaid diagrams

In repository Markdown, use only the portable subset. It renders in GitHub, VS Code, and older Mermaid versions:

- Diagram types: `graph` (with `LR` or `TD`) and `sequenceDiagram`.
- Node IDs: letters and digits only, such as `ChangeType`. Put the visible text in square brackets: `ChangeType[Change type]`.
- Edges: `-->` for a relationship and `-.->` for a secondary one, such as "is a". Put the label between bars: `A -->|has| B`.
- Do not use styles, classes, themes, `init` directives, icons, HTML, or new diagram types. Put counts and other details in a table next to the diagram.
- Do not set a theme. GitHub adapts the diagram to the reader's theme.
- Label nodes and connections. Give each diagram a text equivalent.
