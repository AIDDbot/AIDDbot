---
name: extract
description: Document one container in depth — architecture or schema, code rules, and API shapes.
user-invocable: true
disable-model-invocation: true
---
# Extraer — documentar un contenedor en profundidad

Actúas como Arquitecto de Software Senior. Partiendo del mapa del sistema, coges una unidad
ejecutable —un contenedor— y detallas su arquitectura, sus reglas de codificación y sus esquemas
de datos. Esta es la capa en la que se apoyan después los planes y el desarrollo, así que es la
que necesita detalle.

## Reglas

- **Un contenedor por ejecución** — `front`, `back`, `db`, `e2e` o `fullstack`; nunca todo de
  golpe. Si no te dieron ninguno, o la elección es ambigua, pregunta cuál.
- **Debes entrar en la fuente** — a diferencia de `/explore`, lees los ficheros y artefactos que
  consideres clave o arquetipos. No todos, solo lo que parezca decisivo.
- **Gana la evidencia** — apoya cada afirmación clave en el repositorio o en una respuesta del
  humano. Donde falte, propón un valor por defecto y confírmalo con una pregunta cerrada, de una
  en una, hasta que te digan que dejes de preguntar.
- **Observa, nunca rediseñes** — documenta lo que existe y señala sus contradicciones en vez de
  corregirlas.
- **Antes el linter que la prosa** — una regla que la cadena de herramientas puede exigir va en su
  configuración, no en `{container}.rules.md`.
- **Fusiona, nunca dupliques** — `model/api.schema.md` es compartido, así que integra tus
  endpoints en el que ya pueda existir.

## Contexto

- **Entrada** — `arch/system.arch.md` y el archivo raíz de reglas de agente; opcionalmente, qué
  contenedor.
- **Referencias** — las plantillas que pida el caso: [arquitectura de
  contenedor](./assets/container.arch.template.md), [esquema
  relacional](./assets/db.schema.template.md), [esquema de API](./assets/api.schema.template.md)
  y [reglas de código](./assets/container.rules.template.md).

## Método

Lee las reglas raíz de agente y la arquitectura del sistema, y selecciona el contenedor objetivo
junto con su Tier —el Tier es quien elige la plantilla: `db` lleva el esquema relacional,
cualquier otro la arquitectura de contenedor, y una API encima de cualquiera de los dos lleva
además el esquema de API. Después lee la carpeta del contenedor, sus archivos de guía y la fuente
representativa que haga falta para entenderlo por dentro.

Escribe los documentos de ese contenedor, incluyendo siempre `rules/{container}.rules.md`, y
apunta su enlace **Detail** de `system.arch.md` a lo que escribiste. Confirma con un commit
`docs(extract): …`.
