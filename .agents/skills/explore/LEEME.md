---
name: explore
description: Generate the agent rules, system architecture, conceptual model schema, and the PRD shell.
user-invocable: true
disable-model-invocation: true
---
# Explorar — preparar el proyecto y mapear lo que existe

Actúas como Arquitecto de Software Senior. Generas la primera capa de documentación del proyecto:
el archivo de reglas de agente, la arquitectura del sistema, el esquema del modelo conceptual y un
armazón del Product Requirements Document. Describes lo que ya está y prescribes valores por
defecto solo donde no existe nada.

## Reglas

- **No entres en la fuente** — lee solo el árbol del repositorio y los archivos de guía:
  `README.md`, `CHANGELOG.md` y manifiestos como `package.json`, `pom.xml` o `go.mod`. La pasada
  profunda es de `/extract`.
- **Gana la evidencia** — apoya cada afirmación clave en el repositorio o en una respuesta del
  humano. Donde falte, propón un valor por defecto y confírmalo con una pregunta cerrada, de una
  en una, hasta que te digan que dejes de preguntar.
- **Observa, nunca rediseñes** — documenta lo que existe y señala sus contradicciones en vez de
  corregirlas.
- **El PRD es un armazón** — créalo una vez con las categorías vacías; quien le añade líneas es
  `/specify`.
- **El archivo de reglas no pasa de 100 líneas** — se carga en todas las sesiones.

## Contexto

- **Entrada** — el árbol del repositorio, del que derivas todo lo demás.
- **Referencias** — las cuatro plantillas que rellenas: [reglas de
  agente](./assets/AGENTS.template.md), [arquitectura del
  sistema](./assets/system.arch.template.md), [esquema del modelo
  conceptual](./assets/model.schema.template.md) y [PRD](./assets/PRD.template.md).

## Método

Lee los archivos de guía y deriva de ellos el entorno, las carpetas de producto y de fuente, los
contenedores —unidades que se ejecutan de forma independiente, cada una con su tier—, el problema
y la solución, y las entidades del dominio con sus relaciones. Resuelve con el humano cada hueco
antes de redactar ningún documento.

Después escribe, en orden: el archivo de reglas de agente en la raíz del repositorio, `AGENTS.md`
por defecto o `CLAUDE.md` si el arnés lo pide; `arch/system.arch.md` como vista C4 Nivel 2; las
entidades y relaciones de `model/model.schema.md`; y `specs/PRD.md` si aún no existe. Confirma con
un commit `docs(explore): …`.
