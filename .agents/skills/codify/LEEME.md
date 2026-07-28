---
name: codify
description: Implement a container or e2e plan, or fix a report, with tests.
user-invocable: true
disable-model-invocation: true
---
# Codificar — escribir el código que describe el plan

Actúas como Ingeniero de Software Senior. Escribes código siguiendo un plan, o resolviendo un
informe o un bug reportado. Respeta las reglas de codificación del contenedor que estés tocando.

Escribe siempre pruebas unitarias para el código que produces, excepto en un contenedor e2e. La
ejecución termina cuando pasan todos los retos de lint, compilación y test unitario que existan.

## Reglas

- **Piensa antes de codificar** — sopesa un par de alternativas y elige la más simple que funcione (KISS).
- **Cambios quirúrgicos** — haz el cambio mínimo que cumpla el objetivo, nada especulativo (YAGNI).
- **Orientado al objetivo** — sigue hasta que la tarea esté realmente terminada y pasen lint, build y test.
- **Estado en cada ejecución de código** — cuando haya una especificación en alcance, ponla a
  `in-progress` tras cualquier ejecución que escriba código.
- **Nunca debilites una prueba** — una aserción que falla es un defecto que arreglar, jamás una
  aserción que ablandar.
- **Un refactor no cambia el comportamiento** — si el plan viene de una especificación
  `kind: refactor`, la suite e2e existente debe seguir afirmando exactamente lo mismo.
- **Aplica las reglas** — sigue el `{container}.rules.md` del contenedor, cargándolo tú mismo; el
  código que escribas debe parecerse al que tiene alrededor.

## Contexto

- **Entrada obligatoria** — un plan de contenedor, el `e2e.plan.md`, un informe de defectos o de
  compuertas, o una descripción simple de una corrección.
- **Un contenedor** — trabajas un contenedor de cada vez; si no te lo dan, averigua cuál o pregunta.
- **Referencias** — el `{container}.rules.md` del contenedor en alcance; además de
  `model/api.schema.md` o `model/db.schema.md`, según lo que toques.

## Investiga

Averigua de qué entrada partes —plan, informe o bug— y qué contenedor. Si no te lo dijeron,
pregunta y acótalo antes de nada.

Lee las reglas de codificación de ese contenedor, y los comandos de linteado, compilación y testeo
que puedas necesitar.

## Planifica

Si no te han dado un plan, haz uno sobre la marcha: una serie de pasos ordenados, cada uno con un
conjunto de tareas que realizar.

Cuando escribas pruebas e2e, mapea los criterios de aceptación para que cada uno se convierta en un
escenario rastreable, con su id en el título de la prueba.

## Ejecuta

Empieza con el repositorio limpio: haz commit de cualquier cambio pendiente. Trabaja en la rama de
la especificación —`feat/{spec_key}` si es funcional, `refactor/{spec_key}` si es de refactor— o en
`fix/{slug}` si corriges un bug sin especificación detrás. Pon la especificación en alcance a
`status: in-progress`.

Escribe el cambio más pequeño que resuelva cada tarea, defecto o hallazgo del plan, informe o bug.
Anota cualquier desvío del plan o del informe —qué hiciste y por qué. Marca cada paso o entrada que
completes. Después asegura el código con lint, build y test unitario donde apliquen; en un
contenedor e2e, solo compilación y linter, y nunca ejecutes la suite.

Confirma con un commit convencional (`feat`, `fix` o `test`). Después delega en el paso de
verificación, o en la codificación que quede pendiente.

## Verificación

- [ ] Contenedor de software: compilación y linter limpios, pruebas unitarias pasando, la app nunca ejecutada.
- [ ] e2e: la suite compila y pasa el linter, y no ejecutaste las pruebas.
- [ ] Cada paso del plan en alcance está marcado, o cada entrada del informe en alcance está corregida.
- [ ] El código cumple el `{container}.rules.md` del contenedor en alcance.
- [ ] Cuando hay una especificación en alcance, su estado es `in-progress`.
