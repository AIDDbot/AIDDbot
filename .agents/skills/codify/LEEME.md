---
name: codify
description: Implement a container or e2e plan, or fix a report, with tests.
user-invocable: true
disable-model-invocation: true
---
# Codificar — escribir el código que describe el plan

Actúas como Ingeniero de Software Senior. Escribes código siguiendo un plan o resolviendo un informe o bug reportado. Respeta las reglas de codificación del contenedor afectado.

Escribe siempre pruebas unitarias para el código generado, excepto para contenedores e2e. El resultado debe ser superar los retos de lint, compilación y test unitario que existan.

## Reglas

- **Piensa antes de codificar** — sopesa un par de alternativas y elige la más simple que funcione (KISS).
- **Cambios quirúrgicos** — haz el cambio mínimo que cumpla el objetivo, nada especulativo (YAGNI).
- **Orientado al objetivo** — sigue hasta que la tarea esté realmente terminada y se pasen los criterios de lint, build, test.
- **Estado en cada paso de código** — cuando haya una especificación en alcance, ponla a `in-progress` tras cualquier ejecución que escriba código.
- **Lo no funcional no cambia el comportamiento** — si el plan viene de una especificación `kind: non-functional`, el suite e2e existente debe seguir afirmando lo mismo.
- **Aplica las reglas** — sigue el `{container}.rules.md` del contenedor, cargándolo tú mismo; el código debe parecerse al de su alrededor.

## Contexto

- **Entrada obligatoria** — un plan de contenedor, el `e2e.plan.md`, un informe de defectos o de revisión, o una descripción simple de una corrección.
- **Un contenedor** — trabajas un contenedor de cada vez; si no te lo dan, averigua o pregunta cuál.
- **Referencias** — el `{container}.rules.md` del contenedor en alcance; y, según lo que toques, `model/api.schema.md` o `model/db.schema.md`.

## Investiga

Averigua de qué entrada partes (plan, informe o bug) y el contenedor. Si no te dieron esa información, pregunta para acotar antes de nada.

Lee las reglas de codificación del contenedor y los comandos de linteado, compilación y testeo que puedas necesitar.

## Planifica

Si no te han dado un plan, haz uno sobre la marcha que incluya una serie de pasos ordenados con un un conjunto de tareas para realizar en cada uno.

Para codificación de pruebas e2e, mapea los criterios de aceptación para implementarlos como escenarios rastreables.

## Ejecuta

Empieza con el repositorio limpio. Para ello haz commit de cualquier cambio pendiente. Trabaja en la rama de la especificación —`feat/{spec_key}` si es funcional, `refactor/{spec_key}` si no lo es— o en `fix/{slug}` si corriges un bug sin especificación. Pon la especificación en alcance a `status: in-progress`.

Escribe el cambio más pequeño que resuelva cada tarea, defecto o hallazgo del plan, informe o bug. Anota cualquier desvío del plan o del informe —qué hiciste y por qué. Marca cada paso o entrada que completes. Asegura le código mediante, lint, build y test unitario si procede.

Confirma con un commit convencional (`feat`, `fix` o `test`). Después delega en el paso de verificación o cualquier codificación pendiente.

## Verificación

- [ ] Contenedor de software: compilar y linter limpios y las pruebas unitarias pasan (app no ejecutada).
- [ ] e2e: el suite compila y pasa el linter, y no ejecutaste las pruebas.
- [ ] Cada paso del plan en alcance está marcado, o cada entrada del informe en alcance está corregida.
- [ ] Cuando hay una especificación en alcance, su estado es `in-progress`.
