# Archetype Java CLI Briefing

This project is an archetype for building Java command-line interfaces (CLI) using Spring-Shell. 
It provides a structured setup with essential tools and configurations to streamline development.
It includes a simple set of features to serve as a sample and guide for creating your own CLI applications.
It is not intended for production use, but rather as a learning tool and a starting point for your own projects.

## Features

The archetype provides a set of core and sample business features to facilitate the development of CLI applications.

### Core Features

- **Environment Variables**: 
- **Monitoring and Logging**: 

### Business Features

- **Weather Command**: Fetches and displays weather information based on current ip latitude and longitude in when invoked with `--weather`.

## Technology Stack

- **Java 21**: Safety and modern features.
- **Spring Boot**: Comes with opinionated defaults and auto-configuration.

### Tooling and developer dependencies

- **Spring Shell**: Used for writing the CLI application with commands safety.
- **maven 3.9.11**: Helps manage and update dependencies.
- **JUnit 5**: For unit testing and ensuring code quality.

### Libraries and runtime dependencies



### Deprecated dependencies to avoid


### External Services

Used to enhance the functionality of the CLI with external data:

- **IP Geolocation API**: Used for determining the geographical location of the user's IP address. More information can be found at [IP Geolocation API](https://ip-api.com/).
- **Open Meteo API**: Utilized for fetching weather data based on geographical coordinates. More information can be found at [Open Meteo](https://open-meteo.com/).

## Maintenance

- Readme with installation and execution instructions.
- Docs folder with detailed documentation on the CLI's development, features and usage.
- Source code folder structure and organization.
- Java Doc comments for public method and classes.
- Unit tests for public method and classes related to sample features.
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