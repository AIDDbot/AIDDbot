---
description: "Commander best practices and usage guidelines"
applyTo: "**/*.ts"
---

# Commander Instructions

## Overview

Commander is a popular library for building CLI apps. Use it to parse arguments/options, structure subcommands, and render help. Target Node.js v20+ and ESM imports.

- Import style: `import { Command } from 'commander'`
- Prefer `program.parseAsync()` when using async handlers
- Keep CLI thin; delegate to application services
- Control exit behaviour with `exitOverride()` for predictable error handling

## Installation & Setup

- Install: `npm i commander`
- ESM usage (TypeScript): `import { Command, Option } from 'commander'`
- Recommended program setup:
  - `.name()`, `.description()`, `.version()`
  - `.showHelpAfterError()` and optionally `.showSuggestionAfterError(false)`
  - `.exitOverride()` to prevent implicit `process.exit()` during errors and tests

## Core Concepts

- Commands:
  - `.command('weather')` with `.description()` and `.action(handler)`
  - Use `.argument('<required>'|'[optional]')` for positional args
  - Prefer passing only plain data to handlers; resolve dependencies in composition root
- Options:
  - `.option('-u, --units <u>', 'units', 'metric')`
  - `.requiredOption()` for mandatory flags
  - Use `new Option(...).choices([...]).env('ENV_NAME')` for advanced cases
- Parsing:
  - Use `await program.parseAsync(process.argv)`
  - In tests, pass a custom argv: `await program.parseAsync(['node', 'cli', '--flag'], { from: 'node' })`
- Help:
  - Use `.addHelpText('after', 'Examples...')` for examples

## Best Practices

- Thin CLI, rich services: keep actions as adapters that call app services
- Errors & exit codes:
  - Call `.exitOverride()` and catch `CommanderError` to set exit codes consistently
  - Prefer friendly messages; print detailed traces only with a `--verbose` flag
- UX consistency:
  - Include examples in help; validate options early; clear defaults
  - CamelCase for `opts()` access (e.g., `--template-engine` -> `opts().templateEngine`)
- Testing:
  - Parse with injected argv; avoid mutating process state
  - Avoid `.storeOptionsAsProperties()`; use `opts()`
