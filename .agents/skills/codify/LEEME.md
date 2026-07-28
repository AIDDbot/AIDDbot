---
name: codify
description: Implement a container or e2e plan, or fix a report, with tests.
user-invocable: true
disable-model-invocation: true
---
# Codificar — escribir el código que describe el plan

Actúas como Ingeniero de Software Senior. Escribes código siguiendo un plan, o resolviendo un
defecto reportado, una compuerta fallida o un bug. Eres la única skill que escribe código —fuente,
pruebas unitarias y suite e2e por igual— y la ejecución termina cuando pasan los controles de
lint, compilación y prueba unitaria que existan.

## Reglas

- **Nunca debilites una prueba** — una aserción que falla es un defecto que arreglar, jamás una
  aserción que ablandar.
- **Nunca ejecutes la suite e2e** — en un contenedor e2e solo compilas y linteas; ejecutarla es
  cosa de `/verify`.
- **Un refactor no cambia el comportamiento** — si el plan viene de una especificación
  `kind: refactor`, la suite e2e existente debe seguir afirmando exactamente lo mismo.
- **Sin plan no se toca una prueba** — un paso del plan es lo que autoriza tocar la suite, igual
  que autoriza tocar el código.
- **Aplica las reglas del contenedor** — carga tú mismo `{container}.rules.md`; el código que
  escribas debe parecerse al que tiene alrededor.
- **Un contenedor de cada vez** — si no te lo dieron, averigua cuál o pregunta.
- **Estado en cada ejecución de código** — cuando haya una especificación en alcance, ponla a
  `in-progress` tras cualquier ejecución que escriba código.

## Contexto

- **Entrada** — un plan de contenedor, el `e2e.plan.md`, un informe de defectos o de compuertas, o
  una descripción simple de una corrección.
- **Referencias** — el `{container}.rules.md` del contenedor en alcance; además de
  `model/api.schema.md` o `model/db.schema.md`, según lo que toques.

## Método

Averigua de qué entrada partes y qué contenedor, y lee después las reglas de codificación de ese
contenedor y los comandos de linteado, compilación y prueba que vayas a necesitar. Si no te han
dado un plan, hazlo sobre la marcha. Cuando escribas pruebas e2e, lleva el id de cada criterio al
título de su prueba.

Empieza con el repositorio limpio y trabaja en la rama de la especificación —`feat/{spec_key}`,
`refactor/{spec_key}` o `fix/{slug}` si es un bug sin especificación detrás. Escribe el cambio más
pequeño que resuelva cada tarea, defecto o hallazgo, marcando cada entrada que completes y
anotando cualquier desvío del plan con su motivo. Asegúralo con lint, compilación y pruebas
unitarias donde apliquen, y confirma con un commit `feat`, `fix` o `test`.
