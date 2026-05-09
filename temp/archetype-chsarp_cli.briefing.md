# Archetype CSharp CLI Briefing

This project is an archetype for building C# command-line interfaces (CLI) using the .NET platform. 
It provides a structured setup with essential tools and configurations to streamline development.
It includes a simple set of features to serve as a sample and guide for creating your own CLI applications.
It is not intended for production use, but rather as a learning tool and a starting point for your own projects.

## Features

The archetype provides a set of core and sample business features to facilitate the development of CLI applications.

### Core Features

- **Environment Variables**: 
- **Monitoring and Logging**: 

### Business Features

- **Weather Command**: Fetches and displays weather information based on current IP-derived latitude and longitude when invoked with `--weather`.

## Technology Stack

- **C# 11**
- **.NET 9**

### Tooling and developer dependencies

- **dotnet SDK (9.x)**: Build and tooling via the dotnet CLI.
- **NuGet**: Package management.
- **Spectre.Console.Cli** or **System.CommandLine**: Libraries for building rich CLI applications and commands.
- **xUnit** (or **NUnit**): Unit testing frameworks.
- **GitHub Actions** (recommended): CI workflows for build and test automation.

### Libraries and runtime dependencies

- HTTP client libraries (HttpClient / System.Net.Http)
- Logging (Microsoft.Extensions.Logging, Serilog)
- Configuration (Microsoft.Extensions.Configuration)
- JSON (System.Text.Json or Newtonsoft.Json)

### Deprecated dependencies to avoid

- Java-specific tools and libraries (Maven, Spring, JUnit) — not applicable for C#/.NET projects.

### External Services

Used to enhance the functionality of the CLI with external data:

- **IP Geolocation API**: Used for determining the geographical location of the user's IP address. More information can be found at [IP Geolocation API](https://ip-api.com/).
- **Open Meteo API**: Utilized for fetching weather data based on geographical coordinates. More information can be found at [Open Meteo](https://open-meteo.com/).

## Maintenance

- Readme with installation and execution instructions.
- Docs folder with detailed documentation on the CLI's development, features and usage.
- Source code folder structure and organization.
- XML documentation comments for public methods and classes.
- Unit tests for public methods and classes related to sample features.
- E2E tests for the CLI commands.
- Intended to be executed on the development environment.

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