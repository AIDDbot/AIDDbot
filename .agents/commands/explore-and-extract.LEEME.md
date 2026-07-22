# explore-and-extract

Documenta una base de código existente de arriba abajo. Primero ejecuta `/explore` para preparar
el proyecto y mapear sus contenedores, y luego ejecuta `/extract` una vez por cada uno de esos
contenedores para documentarlos por turno. Cada skill se ejecuta en su propio subagente fresco, y
no se escribe código de aplicación — solo los documentos de guía que lee el resto de la tubería.

Úsalo como punto de entrada cuando una base de código aún no tiene documentación AIDD, o cuando
esta se ha desviado y hay que reconstruirla. Cuando todos los contenedores están documentados, te
apunta a `/specify`.
