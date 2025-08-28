---
description: 'Chalk best practices and usage guidelines'
---

# Chalk Instructions

## Overview

Chalk provides terminal string styling. Version 5+ is ESM-only.

- Import: `import chalk from 'chalk'`
- Chain styles: `chalk.bold.red('Error')`
- Detect color support via `chalk.level` or `supportsColor`

## Installation & Setup

- Install: `npm i chalk`
- ESM only; ensure TypeScript is configured for ES module output
- Respect environment variables: `NO_COLOR`, `FORCE_COLOR`

## Core Concepts

- Styles and nesting: `chalk.bgYellow.black('Warning')`
- Template literals: `` `${chalk.green('ok')}` ``
- stderr: use `chalkStderr` when styling stderr output

## Best Practices

- Keep color optional; fallback to plain text if no color support
- Do not hardcode ANSI codes; use Chalk APIs
- Centralize styling helpers (e.g., success, warn, error)
- Ensure logs are test-friendly; avoid snapshotting raw ANSI
