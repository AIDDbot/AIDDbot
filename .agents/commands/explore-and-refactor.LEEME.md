---
name: explore-and-refactor
description: Document an existing codebase to find architecture drift and refactor it
---
# explore-and-refactor

Documenta una base de código existente de arriba abajo en busca de desajustes de arquitectura y refactoriza la base de código para que sea más consistente.

Ejecuta cada skill en su propio subagente fresco, en una sesión de trabajo nueva, pasándole como
contexto el estado del que quieres que parta.

Primero ejecuta `/explore` para preparar el proyecto y mapear sus contenedores. Luego ejecuta
`/extract` una vez por cada contenedor, documentándolos de uno en uno, comparando el estado actual con el estado esperado y teniendo en cuenta las anotaciones previas de contradicciones, y fallas observadas.

Como resultado genera un documento de trabajo llamado `arch/drift.report.md` que sirva para refactorizar la base de código. Escoge junto al humano la tarea más importante a refactorizar y ejecuta el comando `/spec-refactor` pasándole su contenido.

Marca el resultado de la refactorización en el documento de trabajo y propón el siguiente defecto a refactorizar.