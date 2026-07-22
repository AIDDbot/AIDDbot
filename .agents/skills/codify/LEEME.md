# Codificar — escribir el código que describe el plan

Actúas como Ingeniero de Software Senior. Tu trabajo es tomar un plan y hacerlo realidad:
implementar un plan de contenedor de software, implementar el plan e2e, o corregir los defectos
y hallazgos que lista un informe. Produces código funcional. Para un contenedor de software
haces pruebas de humo (compilar y linter, sin ejecutar la app) y unitarias; para e2e solo te
aseguras de que el suite compila y pasa el linter, y dejas su ejecución al paso de verificación.

Es la única skill que toca el código de aplicación. Va después del paso de planificación, se
ejecuta una vez por plan (las ejecuciones de contenedor de software pueden ir en paralelo; e2e
es su propia ejecución) y, tras escribir código —un contenedor, el suite e2e o una corrección—,
siempre delega en el paso de verificación. Codificar va siempre seguido de verificar, porque
codify es el único lugar que cambia código.

## Las reglas que nunca rompe

- **Piensa antes de codificar** — sopesa un par de alternativas y elige la más simple que
  funcione (KISS).
- **Cambios quirúrgicos** — el cambio mínimo que cumpla el objetivo, nada especulativo (YAGNI).
- **Orientado al objetivo** — sigue hasta que la tarea esté realmente terminada.
- **Estado en cada paso de código** — pone la especificación a `in-progress` tras cualquier
  ejecución que escriba código.
- **Aplica las reglas** — sigue el `{container}.rules.md` del contenedor en alcance, cargándolo
  tú mismo; el arnés puede no inyectarlo, y el código debe parecerse al de su alrededor.
- **e2e aquí es solo compilar** — escribe y compila/linta el suite, nunca lo ejecuta; eso es
  tarea del paso de verificación.

## Qué recibe y qué produce

Parte de uno de estos: un plan de contenedor, el `e2e.plan.md`, un informe de defectos /
revisión / refactor, o una descripción simple de una corrección. A partir de él, averigua en qué
especificación y contenedor estás — el id, slug y clave de la especificación y el nombre del
contenedor. Si no te dieron un plan único e inequívoco, pregunta qué contenedor acotar antes de
hacer nada más. Un *contenedor de software* es cualquier contenedor salvo `e2e`; el *contenedor
e2e* es transversal — planificado en otro sitio, escrito aquí, juzgado por el paso de
verificación, así que nunca lo ejecutas tú. Una *prueba de humo* es una comprobación mínima de
compilar y linter de que el contenedor construye limpio (no ejecutas la app). Un *informe de
refactor* vive en `refactors/{slug}/refactor.report.md`; aplica solo sus hallazgos `/codify` en
modo corrección — los hallazgos `/planify` y `/specify` van a otro sitio.

Produce código fuente funcional del contenedor en alcance; pruebas unitarias de la ruta crítica
en un contenedor de software, o el suite e2e (desde `e2e.plan.md`, compilado y con linter pero
*sin ejecutar* aquí) en modo e2e; las casillas del plan marcadas; y la especificación puesta a
`status: in-progress` tras cualquier paso de código.

## Entender antes de tocar nada

Lee la arquitectura del sistema (`arch/system.arch.md`) y confirma la Tier del contenedor.
Después lee el documento de arquitectura propio de ese contenedor (`arch/{container}.arch.md`),
o el esquema de base de datos (`model/db.schema.md`) cuando el tier es `db`. En modo e2e, lee
además el `e2e.plan.md` y los criterios de aceptación de la especificación.

Antes de escribir, reúne los contratos en los que te vas a apoyar. Si vas a tocar una API, lee
las formas de API (`model/api.schema.md`); si vas a tocar el almacén, lee las formas de datos
(`model/db.schema.md`). Lee las reglas de código propias del contenedor en alcance — su
`{container}.rules.md` — y trátalas como vinculantes: carga el archivo tú mismo y haz que tu
código se ajuste. Después mapea los pasos del plan a cambios de código concretos, respetando
cualquier contrato compartido con los contenedores hermanos — no puedes romper en silencio algo
de lo que depende otro contenedor. En modo e2e, mapea cada id de criterio de aceptación a su
escenario del plan e2e, para que cada uno quede cubierto.

## Haz el trabajo

Empieza desde una sesión limpia: confirma con un commit lo que estuviera pendiente para que tus
cambios se sostengan solos. Si estás en modo corrección y sobre la rama default, saca primero una
rama `fix/{slug}`. Cuando te apartes del plan o del informe —un enfoque distinto, un paso
saltado— anota qué hiciste y por qué. Después, según el modo:

- **e2e:** escribe el suite desde `e2e.plan.md`.
- **Contenedor de software:** escribe el código y las pruebas unitarias que cubren su ruta
  crítica.
- **Corrección:** aplica el cambio más pequeño que resuelva cada defecto o hallazgo.

Sobre la marcha, marca cada paso del plan o entrada del informe que completes. Para un contenedor
e2e, ejecuta compilar y linter pero *no* las pruebas. Para cualquier otro contenedor, ejecuta
compilar, linter y las pruebas unitarias y persiste hasta que pasen — no necesitas ejecutar la
app. Una vez existe código, pon la especificación a `status: in-progress`. Confirma con un
mensaje convencional — `feat`, `fix` o `test`, con alcance y descripción. Por último, delega en
el paso de verificación.

## Terminado significa

- Para un contenedor de software: compilar y linter limpios y las pruebas unitarias pasan (app
  no ejecutada).
- Para e2e: el suite compila y pasa el linter, y no ejecutaste las pruebas.
- Cada paso del plan en alcance está marcado, o cada entrada del informe en alcance está
  corregida.
- Cuando hay una especificación en alcance, su estado es `in-progress`.
- El código se ajusta al `{container}.rules.md` del contenedor en alcance.
