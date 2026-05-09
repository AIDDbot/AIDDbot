# Archetype Node CLI Briefing

This project is an archetype for building Node.js command-line interfaces (CLI) using TypeScript. 
It provides a structured setup with essential tools and configurations to streamline development.
It includes a simple set of features to serve as a sample and guide for creating your own CLI applications.
It is not intended for production use, but rather as a learning tool and a starting point for your own projects.

## Features

The archetype provides a set of core and sample business features to facilitate the development of CLI applications.

### Core Features

- **Environment Variables**: Supports loading environment variables from `.env` files, keeping them secret from git history.
- **Monitoring and Logging**: Integrated with `console` for logging and monitoring CLI operations.

### Business Features

- **Help Command**: Provides usage instructions and available commands when invoked with `--help`.
- **Weather Command**: Fetches and displays weather information based on current ip latitude and longitude in when invoked with `--weather`.

## Technology Stack
- **TypeScript Support**: Built using TypeScript, providing type safety and modern JavaScript features.
- **Configuration Files**: Comes with configuration files for TypeScript, ESLint, and Prettier, ensuring code quality and consistency.
- **Testing Framework**: Set up with modern Node Built-in test runner, no other dependencies required.
- **Command-Line Interface**: Includes a basic CLI setup that can be extended with additional commands and options.

### Tooling and developer dependencies

- **Node.js modern V24**: The runtime environment for executing the CLI, but with modern V24 SOTA features.
- **TypeScript**: Used for writing the CLI application with type safety.
- **ESLint**: Integrated for linting and code quality checks.
- **Prettier**: Used for code formatting.
- **npm-check-updates**: Helps manage and update dependencies.
 
All dependencies must be updatable to the latest version, and the project should be compatible with Node.js V24 LTS versions.

### Libraries and runtime dependencies

- **Chalk** for colorful terminal output [Chalk](https://github.com/chalk/chalk)
- **Commander** for building command-line interfaces [Commander](https://github.com/tj/commander.js)
- **Zod** for schema validation [Zod](https://github.com/colinhacks/zod)

### Deprecated dependencies to avoid

- ~~dotenv~~: Use Built-in Node.js `--env-file=.env` instead
- ~~jest~~: Use Node.js built-in test runner instead `node:test` and `node:assert/strict`
- ~~node-fetch~~: Use Node.js built-in `fetch` instead
- ~~nodemon~~: Use `node --watch` instead for watching file changes
- ~~tsc~~: Run TypeScript files directly with `node --disable-warning=ExperimentalWarning main.ts`

### External Services

Used to enhance the functionality of the CLI with external data:

- **IP Geolocation API**: Used for determining the geographical location of the user's IP address. More information can be found at [IP Geolocation API](https://ip-api.com/).
- **Open Meteo API**: Utilized for fetching weather data based on geographical coordinates. More information can be found at [Open Meteo](https://open-meteo.com/).

## Maintenance

- Readme with installation and execution instructions.
- Docs folder with detailed documentation on the CLI's development, features and usage.
- Source code folder structure and organization.
- Jsdoc comments for public functions and classes.
- Unit tests for public functions and classes related to sample features.
- E2E tests for the CLI commands.
- Just to be executed on the development environment.

---

- **Author**: Alberto Basalo
  - [X/@albertobasalo](https://x.com/albertobasalo)
  - [LinkedIn](https://www.linkedin.com/in/albertobasalo/)
  - [GitHub](https://github.com/albertobasalo)
  - [Sitio personal](https://albertobasalo.dev)
  - [Cursos en Español en AI code Academy](https://aicode.academy)
- **Project**: AIDDbot
  - [AIDDbot.com blog](https://aiddbot.com)
  - [GitHub/AIDDbot org](https://github.com/AIDDbot)
  - [GitHub/AIDDbot/ArchetypeNodeCLI repo](https://github.com/AIDDbot/ArchetypeNodeCLI)