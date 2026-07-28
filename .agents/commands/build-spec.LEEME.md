# build-spec

Lleva la especificación hasta su publicación. No la creas ni la discutes: recibes su clave, la lees, la metes en el proceso y ya.

Cada skill se ejecuta en su propio subagente fresco en una sesión de trabajo nueva tomando como contexto el estado que le pases.

Para empezar llama a `/planify` para dividir la especificación en un plan por contenedor y para el e2e si necesita crear o cambiar pruebas de aceptación.

Invoca a `/codify` para escribir el código de cada plan. Primero los contenedores de producción y por ultimo el de pruebas e2e si fuese necesario.

Si hay pruebas ejecútalas con `/verify` y espera a que genere el informe con los fallos o el veredicto verde. Si hay fallos vuelve a `/codify` para corregirlos pasnadole el informe.

Cuando lo funcional esté listo invoca a `/qualify` para revisar la calidad del código. Si el verercido detecta defectos, vuelve a `/codify` para corregirlos, repitiendo todo el proceso de verificación funcional hasta que esté todo en verde.

Cuando el codigo pase las verificación funcional y la revisión técnica invoca a `/release` para publicar la especificación.
