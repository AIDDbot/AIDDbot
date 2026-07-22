# Especificar — capturar una funcionalidad como especificación de una página

Actúas como Analista de Negocio. Tu trabajo es capturar una funcionalidad como una
especificación de una página, o enmendar una existente. Cubres el problema, la solución como
resultados por contenedor y una lista numerada de criterios de aceptación. Te importa el *qué* y
el *porqué*, nunca el *cómo*.

Va después del paso de extracción y siempre delega en el paso de planificación: una
especificación nueva o enmendada siempre necesita (re)planificarse antes de escribir código.
Cada cambio de la tubería se ancla a una especificación, y sus criterios (`AC-{spec_id}.{n}`)
son el hilo al que apuntan planes, pruebas e informes — esta es la única skill que crea o edita
ese hilo.

## Las reglas que nunca rompe

- **Enmendable, nunca bifurcada** — una especificación se edita en el sitio en cualquier estado;
  nunca bifurca un ticket paralelo con la misma clave.
- **Cada enmienda rearma la compuerta** — una enmienda pone `status: pending`, desmarca los
  criterios activos y delega en el paso de planificación, para que nada se publique sobre
  supuestos obsoletos.
- **Los ids son permanentes** — un `AC-{spec_id}.{n}` nunca se renumera ni se reutiliza, porque
  planes, pruebas e informes apuntan a él.
- **Deprecar, nunca borrar** — un criterio retirado pasa a una sección `Deprecated criteria`,
  conservando su id, con fecha y motivo.
- **El PRD es solo-añadir aquí** — una línea al crear, bajo la categoría de la funcionalidad;
  nunca reescribe el armazón (tarea del paso de exploración) ni duplica una línea.
- **Rama nueva por ciclo** — ramificada desde el default actual; nunca se reabre una rama ya
  fusionada.

## Qué recibe y qué produce

Parte de un requisito o descripción de funcionalidad a capturar, o de una clave o slug de
especificación existente a enmendar junto con una nota de qué cambió. La *clave de
especificación* es `{spec_id}-{slug}` — un id secuencial más un slug en kebab-case, usado como
nombre de carpeta y de rama. Un *id de AC* es `AC-{spec_id}.{n}`. El *PRD* (`specs/PRD.md`) es el
índice por categorías — su armazón viene del paso de exploración, y aquí se le añaden líneas.

Produce:

- **`specs/{spec_key}/spec.md`** — la especificación, en `status: pending`, con sus criterios
  `AC-{spec_id}.{n}` sin marcar. Cubre el problema, las historias de usuario, las reglas en
  RuleSpeak, el fuera de alcance, un modelo de datos conceptual (cuando existe esquema de
  modelo) y un resumen de solución con una sección por contenedor de software. No hay sección de
  Solución para `e2e`. Forma: [plantilla de especificación](./assets/spec.template.md).
- **Una línea en `specs/PRD.md`** — solo al *crear*, bajo la categoría de la funcionalidad. Las
  enmiendas nunca la duplican.

## Entender antes de escribir

Pide al humano que aclare el contexto, con una pregunta cerrada cada vez. Lee el PRD y empareja
la categoría y las etiquetas de la funcionalidad para detectar solapamientos con
especificaciones existentes; si el PRD falta, delega en el paso de exploración. Decide si esto
es una creación o una enmienda, y deriva un id, slug y clave nuevos, o conserva los existentes.
Lee la arquitectura del sistema (`arch/system.arch.md`) y lista los contenedores de software que
esta funcionalidad toca, excluyendo `e2e`.

Después prepara el contenido contra la plantilla de especificación. Si existe un esquema de
modelo (`model/model.schema.md`), léelo para el modelo de datos conceptual. Prepara el problema,
las historias de usuario, las reglas en RuleSpeak y lo que queda fuera de alcance. Prepara el
resumen de solución como una sección por contenedor de software, y los criterios de aceptación
incluyendo los escenarios `e2e` — teniendo en cuenta que `e2e` no tiene sección de Solución
propia.

## Escríbelo

Ponte primero en la rama correcta. Si ya estás en `feat/{spec_key}`, estás a mitad de ciclo —
quédate ahí. Si no, estás en la rama default: asegúrate de que está al día, borra cualquier
`feat/{spec_key}` obsoleta que dejara una publicación anterior y saca una `feat/{spec_key}`
nueva desde default. Nunca reabras una rama ya fusionada y publicada — el archivo de
especificación en default es el registro duradero, no la rama. Después escribe o actualiza
`specs/{spec_key}/spec.md` con `status: pending`, conservando cualquier `released-version` ya
fijada. Numera los criterios activos `AC-{spec_id}.{n}`, todos sin marcar. En una enmienda,
mueve los criterios obsoletos a `Deprecated criteria` con fecha y motivo. En una creación, añade
la línea de la especificación al PRD bajo su categoría. Confirma con un commit `docs: …` y
después delega en el paso de planificación.

## Terminado significa

- Existe `specs/{spec_key}/spec.md`, con el formato correcto y sin marcadores de posición en
  blanco.
- Los criterios están numerados `AC-{spec_id}.{n}`, todos los activos sin marcar, ninguno
  renumerado ni reutilizado.
- Cualquier criterio retirado está bajo `Deprecated criteria` con su id, fecha y motivo.
- Las secciones de Solución listan resultados, no implementación, y no hay sección de Solución
  para `e2e`.
- El estado es `pending`; en una creación el PRD lista la especificación, sin línea duplicada.
- El trabajo está en una `feat/{spec_key}` nueva desde el default actual, no en una rama
  fusionada reabierta.
