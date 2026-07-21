# Especificar — capturar una característica como especificación de una página

`/specify` convierte una solicitud de característica en una especificación de una página:
el problema que resuelve, la solución en términos de resultados por contenedor, y una
lista numerada de criterios de aceptación. También puede **enmendar** una especificación
existente — y cualquier enmienda reinicia el trabajo al comienzo de la tubería para que
nada se envíe en suposiciones obsoletas.

Juega un Analista de Negocios: se preocupa por *qué* y *por qué*, no *cómo*.

## Para qué sirve

Cada cambio en AIDD está anclado a una especificación — una página que establece el
problema, esboza la solución por contenedor, y enumera criterios de aceptación
verificables con ids estables. Esos criterios (`AC-{spec_id}.{n}`) son el hilo que los
planes, pruebas e informes todos señalan de vuelta. `/specify` es la única skill que crea
o edita ese hilo.

## Cuándo usarla

- Para capturar una nueva característica o requisito como especificación.
- Para enmendar una característica ya enviada o en vuelo — incluyendo un "error" que
  realmente requiere cambiar el comportamiento acordado (es decir, uno que voltearía una
  prueba e2e verde).
- También es propietaria de agregar la línea de la característica al índice PRD.

Posición: sigue a `/extract` en la tubería de construcción y delega a `/planify`. Una
enmienda puede ser entrada en *cualquier* estado y siempre fuerza un replanificación
completa.

## Qué le das

- **Requerido:** una descripción de requisito o característica, **o**
- una especificación existente (su `{spec_key}` o `{slug}`) para enmendar, más una nota
  de qué cambió.

## Qué produce

- **`{Product_Folder}/specs/{spec_key}/spec.md`** — la especificación de una página, con
  `status: pending` y criterios numerados `AC-{spec_id}.{n}`, todos desmarcados.
- **Una línea en `{Product_Folder}/specs/PRD.md`** — solo en *crear*, agregada bajo la
  categoría de la característica (creando el encabezamiento de categoría si es nuevo). Las
  enmiendas nunca duplican esta línea.

La especificación cubre: problema, historias de usuario, reglas RuleSpeak, notas fuera
de alcance, un modelo de datos conceptual (cuando existe un esquema de modelo), un
resumen de solución con una sección por contenedor de software, y criterios de
verificación para e2e. Deliberadamente **no hay** sección de Solución para e2e.

## Cómo se comporta (las reglas que nunca rompe)

- **Enmendable, nunca bifurcada.** Una especificación existente se edita en el lugar en
  cualquier estado; nunca inventa un ticket paralelo para el mismo `{spec_key}`.
- **Cada enmienda reinicia la compuerta.** Una enmienda establece `status: pending`,
  desmarca todos los criterios activos, y siempre delega a `/planify` para replanificar
  (contenedores de software y e2e).
- **Los ids son permanentes.** Un `AC-{spec_id}.{n}` nunca se renumera o reutiliza —
  los planes y pruebas apuntan a él.
- **Deprecia, nunca borres.** Un criterio retirado se mueve a una sección
  `Deprecated criteria`, manteniendo su id, con una fecha y razón. Nunca se elimina
  completamente.
- **El PRD es solo-agregar aquí.** En crear agrega una línea; nunca reescribe la cáscara
  (eso pertenece a `/explore`), y en enmendar no duplica la línea.

## Cómo funciona, paso a paso

1. **Investigación.** Pregunta aclaraciones de preguntas cerradas, lee el PRD para
   detectar superposición por categoría y etiquetas, y decide crear vs enmendar. En
   crear, deriva el slug y el siguiente `{spec_id}` secuencial; en enmendar, resuelve la
   especificación existente y mantiene sus ids. Lee `system.arch.md` y enumera los
   contenedores de software que toca la característica (e2e excluido). Si falta el PRD,
   delega a `/explore` primero.
2. **Plan.** Lee la plantilla de especificación y, si está presente, el esquema de modelo,
   luego prepara el problema, historias de usuario, reglas RuleSpeak, fuera de alcance,
   el modelo de datos conceptual, el resumen de solución por contenedor, y los criterios
   de verificación de e2e. En crear también prepara la línea del PRD.
3. **Implementar.** En la rama por defecto primero crea una rama `feat/{spec_key}`. En
   crear escribe la especificación con `status: pending` y numera los criterios. En
   enmendar actualiza la especificación a `pending`, desmarca criterios activos, agrega
   nuevos criterios con el siguiente id no utilizado, mueve criterios ya no aplicables a
   `Deprecated criteria` (con fecha y razón), y preserva `released-version`. En crear
   agrega la línea del PRD. Confirma con `docs: …` y delega a `/planify`.

## Cómo sabes que funcionó

- La especificación existe, formateada correctamente, sin marcadores vacíos.
- Los criterios son verificables y numerados `AC-{spec_id}.{n}`, sin id renumerada o
  reutilizada.
- Después de crear o enmendar, todos los criterios activos están desmarcados (`[ ]`).
- Cualquier criterio retirado se sienta bajo `Deprecated criteria` con su id, una fecha,
  y una razón.
- Las secciones de Solución describen resultados, no detalles de implementación, y no hay
  sección de Solución para e2e.
- El estado es `pending`; una enmienda no duplicó la línea del PRD; en crear el PRD
  enumera la especificación bajo una categoría.

## Dónde delega

Siempre a `/planify` — porque una especificación fresca o enmendada siempre necesita un
(re)plan antes de que se escriba cualquier código.
