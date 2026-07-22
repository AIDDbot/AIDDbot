# refactor-and-verify

Audita toda la app en busca de decadencia acumulada, aplica las correcciones que preservan el
comportamiento, verifica y expone lo que necesita un plan o una especificación. Úsalo
periódicamente — cada varias especificaciones o en un tren de publicación — para detectar
problemas transversales que la revisión de una sola especificación no puede ver.

Trabaja en una rama dedicada `refactor/audit` y solo arranca desde verde: primero `/verify`
confirma la línea base, y un suite en rojo lo detiene — refactorizar necesita pruebas que pasen en
las que apoyarse. Después `/refactor` audita toda la app, siguiendo el archivo de reglas de agente
del propio proyecto y las reglas de contenedor para el stack, y escribe un único informe triado.

Los hallazgos que preservan el comportamiento y van a `/codify` se aplican en la misma rama, luego
`/verify` vuelve a ejecutarse para confirmar que el suite sigue pasando — repitiendo por `/codify`
si algo se puso en rojo. Los hallazgos que cambiarían el comportamiento o moverían contratos no se
aplican aquí: se te devuelven, para reingresar a la tubería por `/specify` o `/planify`.

Cada skill se ejecuta en su propio subagente fresco, al que se le dice que pare tras su commit,
para que ninguna ejecución se derrame en la siguiente. Termina con un resumen — qué se aplicó
frente a qué se enrutó — y te apunta a `/release`.
