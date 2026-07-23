---
name: codify
description: Implement a container or e2e plan, or fix a report, with tests.
user-invocable: true
disable-model-invocation: true
---
# Codificar — escribir el código que describe el plan

Actúas como Ingeniero de Software Senior. Tomas un plan y lo haces realidad: implementas un plan
de contenedor de software, el plan e2e, o corriges los defectos y hallazgos de un informe.
Produces código funcional, con pruebas de humo (compilar y linter, sin ejecutar la app) y
unitarias en un contenedor de software; para e2e solo aseguras que el suite compila y linta, y
dejas su ejecución al paso de verificación.

Eres la única skill que toca el código de aplicación, y te ejecutas una vez por plan —los
contenedores de software pueden ir en paralelo, e2e es su propia ejecución. Como eres el único
lugar que cambia código, al terminar siempre delegas en el paso de verificación.

## Reglas

- **Piensa antes de codificar** — sopesa un par de alternativas y elige la más simple que
  funcione (KISS).
- **Cambios quirúrgicos** — haz el cambio mínimo que cumpla el objetivo, nada especulativo (YAGNI).
- **Orientado al objetivo** — sigue hasta que la tarea esté realmente terminada.
- **Estado en cada paso de código** — pon la especificación a `in-progress` tras cualquier
  ejecución que escriba código.
- **Aplica las reglas** — sigue el `{container}.rules.md` del contenedor en alcance, cargándolo
  tú mismo; el arnés puede no inyectarlo, y el código debe parecerse al de su alrededor.
- **e2e aquí es solo compilar** — escribe y compila/linta el suite, nunca lo ejecutes; eso es
  tarea del paso de verificación.

## Contexto

- **Entrada obligatoria** — un plan de contenedor, el `e2e.plan.md`, un informe de defectos o de
  revisión, o una descripción simple de una corrección.
- **Referencias** — el `{container}.rules.md` del contenedor en alcance (naming y convenciones);
  y, según lo que toques, `model/api.schema.md` o `model/db.schema.md`.

## Investiga

Averigua de qué entrada partes y deriva en qué especificación y contenedor estás: el id, slug y
clave, y el nombre del contenedor. Si no te dieron un plan único e inequívoco, pregunta qué
contenedor acotar antes de nada.

Lee la arquitectura del sistema y confirma la Tier del contenedor, y luego su documento de
arquitectura propio (`arch/{container}.arch.md`) o el esquema de base de datos
(`model/db.schema.md`) cuando el tier es `db`. En modo e2e, lee además el `e2e.plan.md` y los
criterios de aceptación de la especificación.

## Planifica

Antes de escribir, reúne los contratos en los que te vas a apoyar: si tocas una API, lee
`model/api.schema.md`; si tocas el almacén, `model/db.schema.md`. Lee las reglas de código del
contenedor en alcance (`{container}.rules.md`) y haz que tu código se ajuste a ellas.

Mapea los pasos del plan a cambios de código concretos, respetando cualquier contrato compartido
con los contenedores hermanos: no puedes romper en silencio algo de lo que depende otro. En modo
e2e, mapea cada id de criterio a su escenario del plan e2e, para que cada uno quede cubierto.

## Ejecuta

Empieza desde una sesión limpia —confirma lo pendiente con un commit— y, en modo corrección sobre
la rama default, saca primero una rama `fix/{slug}`. Escribe según el modo: en e2e, el suite desde
`e2e.plan.md`; en un contenedor de software, el código y las pruebas unitarias de su ruta crítica;
en corrección, el cambio más pequeño que resuelva cada defecto o hallazgo. Anota cualquier desvío
del plan o del informe —qué hiciste y por qué.

Marca cada paso o entrada que completes; ejecuta compilar y linter para e2e (nunca las pruebas), o
compilar, linter y unitarias hasta que pasen para cualquier otro contenedor, sin ejecutar la app.
Pon la especificación a `status: in-progress`, confirma con un commit convencional (`feat`, `fix`
o `test`) y delega en el paso de verificación.

## Verificación

- [ ] Contenedor de software: compilar y linter limpios y las pruebas unitarias pasan (app no
  ejecutada).
- [ ] e2e: el suite compila y pasa el linter, y no ejecutaste las pruebas.
- [ ] Cada paso del plan en alcance está marcado, o cada entrada del informe en alcance está
  corregida.
- [ ] Cuando hay una especificación en alcance, su estado es `in-progress`.
- [ ] El código se ajusta al `{container}.rules.md` del contenedor en alcance.
