---
name: explore-and-extract
description: Document an existing codebase top to bottom — /explore once, then /extract per container.
---
# explore-and-extract

Documenta una base de código existente de arriba abajo.

Ejecuta cada skill en su propio subagente fresco, en una sesión de trabajo nueva, pasándole como
contexto el estado del que quieres que parta.

Primero ejecuta `/explore` para preparar el proyecto y mapear sus contenedores. Luego ejecuta
`/extract` una vez por cada contenedor, documentándolos de uno en uno.

El resultado es la documentación de la base de código, creada o puesta al día.
