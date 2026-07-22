# build-feature

Lleva una funcionalidad desde una especificación hasta una publicación, de principio a fin. Úsalo
para construir o enmendar una funcionalidad de una sola pasada.

Primero ejecuta `/specify` para capturar o enmendar la especificación, luego `/planify` para
dividir esa especificación en un plan por contenedor más un plan e2e. A continuación ejecuta
`/codify` una vez por plan para escribir el código — los contenedores de software primero, el
suite e2e al final. Después `/verify` ejecuta el suite; cualquier bug de código o de prueba que
falle vuelve por `/codify` hasta que está en verde. Luego `/review` califica el resultado y, si
alguna compuerta falla, ejecuta `/codify` de nuevo para corregir los defectos menores reportados.

Por último ejecuta `/release` para publicarla.

Cada skill se ejecuta en su propio subagente fresco, al que se le dice que pare tras su commit,
para que ninguna ejecución se derrame en la siguiente.

Se detiene y te devuelve el control cuando un cambio necesita tu criterio — un defecto triado como
estructural, o un hallazgo de revisión que debe pasar por `/specify` o `/planify`.
