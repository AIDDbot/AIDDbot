# Workflow `specify-feature`

Este workflow recibe un requisito y conduce todo el trabajo necesario para especificarlo, implementarlo, revisarlo y entregarlo. Es la única puerta de entrada humana de este proceso.

El workflow llama primero a `scope-feature`. El resultado determina mediante triage si el requisito se entrega como una única especificación, mediante `deliver-spec`, o como un cambio coordinado con varias especificaciones, mediante `deliver-change`.

Una llamada a un comando conserva el contexto de orquestación. Un `spawn` crea un contexto nuevo para un agente y le encarga la ejecución de una skill. Las listas se ejecutan en orden salvo cuando se indica expresamente que el trabajo es paralelo.

## Comandos

### `scope-feature`

Determina si el requisito necesita una única especificación o varias especificaciones coordinadas.

Crea un contexto de agente con el rol **Architect** y ejecuta la skill `scope-change`. 

Retorna un informe corto con la decisión.

### `deliver-spec`

Coordina la entrega cuando el requisito puede representarse mediante una sola especificación.

Todo el trabajo se realiza en la rama `feat/{spec-key}`. El comando llama secuencialmente a:

1. `specify-spec`, una vez para el requisito.
2. `implement-spec`, una vez para la especificación resultante.
3. `ship-implementation`, una vez para revisar y entregar esa especificación.

### `deliver-change`

Coordina un cambio formado por varias especificaciones relacionadas.

Todo el cambio comparte la rama `change/{change-key}`. El comando:

1. Llama a `specify-spec` una vez por cada especificación. Estas llamadas pueden ejecutarse en paralelo.
2. Llama a `implement-spec` una vez por cada especificación. Estas llamadas son secuenciales.
3. Llama una sola vez a `ship-implementation` para revisar y entregar el cambio completo.

### `specify-spec`

Produce una especificación.

Crea un contexto de agente con el rol **Architect** y ejecuta la skill `specify`. 

Retorna la especificación resultante.

### `implement-spec`

Planifica e implementa una especificación ya validada.

El comando crea contextos con el rol **Builder** en dos fases secuenciales:

1. Ejecuta la skill `planify` una vez por cada contenedor de la especificación. Los contenedores pueden planificarse en paralelo.
2. Ejecuta la skill `codify` una vez por cada plan resultante. Los planes pueden implementarse en paralelo.

La segunda fase comienza después de disponer de los planes necesarios.

Retorna la especificación resultante como informe corto.

### `ship-implementation`

Comprueba y entrega el alcance implementado, que puede ser una especificación individual o el conjunto completo de un cambio.

Primero crea un contexto con el rol **Craftsman** y ejecuta la skill `verify`. Esta verificación busca fallos funcionales, incluidos los detectados por pruebas E2E:

- Si `verify` encuentra defectos, el llama a `fix-defects` con su reporte y reinicia `ship-implementation` desde la verificación.
- Si el resultado está limpio, continúa con la evaluación técnica.

A continuación crea otro contexto con el rol **Craftsman** y ejecuta la skill `qualify`:

- Si `qualify` encuentra defectos técnicos o de calidad, el comando llama a `fix-defects` con su reporte y reinicia `ship-implementation` desde `verify`. Volver a la verificación funcional es necesario porque una corrección técnica puede introducir una regresión.
- Si el resultado está limpio, crea un contexto con el rol **Craftsman** y ejecuta la skill `shipify` para completar la entrega.

Retorna un informe corto con el resultado de la entrega.

### `fix-defects`

Corrige los defectos encontrados durante la revisión.

Recibe el reporte producido por `verify` o `qualify`, crea un contexto con el rol **Builder** y ejecuta la skill `codify`. Cuando termina, el control vuelve a `ship-implementation`, que reinicia la revisión desde `verify`.

Retorna un informe corto con el resultado de la corrección.
