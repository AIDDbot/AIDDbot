# build-spec

Lleva una especificación desde su captura hasta una publicación, de principio a fin. Es el único
ciclo, y tiene dos puertas de entrada: `/specify` cuando traes un requerimiento funcional, y
`/restructure` cuando lo que quieres es auditar un contenedor y pagar su deuda acumulada.

Por la puerta funcional, `/specify` captura o enmienda la especificación. Por la técnica se exige
primero una línea base verde —`/verify` la confirma, y un suite en rojo lo detiene, porque
refactorizar necesita pruebas en las que apoyarse—, y después `/restructure` audita un contenedor y
captura lo que encuentra como especificación no funcional; si el contenedor está sano, no escribe
nada y termina ahí.

Desde ese punto el camino es el mismo para las dos, y el `kind` de la especificación es lo único
que lo modula. `/planify` la divide en un plan por contenedor —más un plan e2e solo si es
funcional, porque lo no funcional preserva el comportamiento y se apoya en el suite existente—.
`/codify` escribe el código, una ejecución por plan. `/verify` ejecuta el suite: cualquier bug de
código o de prueba vuelve por `/codify` hasta que está en verde. Después `/qualify` califica, y ahí
está la otra diferencia: ante una especificación no funcional es además su oráculo, porque juzga
cada criterio con la compuerta que este nombra y lo marca en la especificación.

Por último ejecuta `/release` para publicarla.

Cada skill se ejecuta en su propio subagente fresco, al que se le dice que pare tras su commit,
para que ninguna ejecución se derrame en la siguiente.

Se detiene y te devuelve el control cuando un cambio necesita tu criterio — un defecto triado como
estructural, o un hallazgo que debe pasar por `/specify` o `/planify`.
