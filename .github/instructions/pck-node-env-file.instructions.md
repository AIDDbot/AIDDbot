---
description: "Node --env-file best practices and usage"
applyTo: "**/*.ts"
---

# Node --env-file Instructions

## Overview

Node supports loading environment variables from files with `--env-file` and `--env-file-if-exists`. Prefer this over `dotenv`.

## Installation & Setup

- No dependency required. Run Node with:
  - `node --env-file=.env ./dist/main.js`
  - Multiple files allowed; later files override earlier ones
  - Comments and quotes supported inside env files

## Core Concepts

- Precedence: process.env overrides values from files
- Security: never commit secrets; use `.env.local` in dev
- Testing: pass `--env-file=test.env` to isolate test config

## Best Practices

- Validate required env vars early (zod)
- Keep defaults in code; env only for overrides/secrets
- Support `--env-file-if-exists` to avoid failures when optional
