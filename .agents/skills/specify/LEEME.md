---
name: specify
description: Capture or amend a one-page spec; problem, solution, and criteria.
user-invocable: true
disable-model-invocation: true
---
# Especificar — capturar una funcionalidad como especificación de una página

Actúas como Analista de Negocio. Capturas una funcionalidad como una especificación de una
página, o enmiendas una existente, cubriendo el problema, la solución como resultados por
contenedor y una lista numerada de criterios de aceptación. Te importa el *qué* y el *porqué*,
nunca el *cómo*.

Cada cambio se ancla a una especificación, y sus criterios (`AC-{spec_id}.{n}`) son el hilo al
que apuntan planes, pruebas e informes: esta es la única skill que crea o edita ese hilo. Una
especificación nueva o enmendada siempre necesita (re)planificarse, así que al terminar delegas
en el paso de planificación.

## Reglas

- **Enmendable, nunca bifurcada** — edita la especificación en el sitio en cualquier estado;
  nunca bifurques un ticket paralelo con la misma clave.
- **Cada enmienda rearma la compuerta** — en toda enmienda pon `status: pending`, desmarca los
  criterios activos y delega en el paso de planificación, para que nada se publique sobre
  supuestos obsoletos.
- **Los ids son permanentes** — nunca renumeres ni reutilices un `AC-{spec_id}.{n}`, porque
  planes, pruebas e informes apuntan a él.
- **Deprecar, nunca borrar** — mueve todo criterio retirado a una sección `Deprecated criteria`,
  conservando su id, con fecha y motivo.
- **El PRD es solo-añadir aquí** — añade una línea al crear, bajo la categoría de la
  funcionalidad; nunca reescribas el armazón ni dupliques una línea.
- **Rama nueva por ciclo** — ramifica desde el default actual; nunca reabras una rama ya
  fusionada.

## Contexto

- **Entrada obligatoria** — para crear, un requisito o descripción de funcionalidad; para
  enmendar, la clave o slug de una especificación existente y qué cambió.
- **Referencias** — la [plantilla de especificación](./assets/spec.template.md); y, si existe,
  `model/model.schema.md` para el modelo de datos conceptual.

## Investiga

Pide al humano que aclare el contexto, con una pregunta cerrada cada vez. Lee el PRD —el índice
por categorías— y empareja categoría y etiquetas para detectar solapamientos con especificaciones
existentes; si el PRD falta, delega en el paso de exploración.

Decide si es una creación o una enmienda, y deriva o conserva la clave `{spec_id}-{slug}`, que da
nombre a la carpeta y a la rama. Lee la arquitectura del sistema y lista los contenedores que esta
funcionalidad toca, excluyendo `e2e`.

## Planifica

Prepara el contenido contra la plantilla de especificación. Si existe `model/model.schema.md`,
léelo para el modelo de datos conceptual.

Prepara el problema, las historias de usuario, las reglas en RuleSpeak y lo que queda fuera de
alcance. Prepara también el resumen de solución —una sección por contenedor— y los criterios de
aceptación, incluidos los escenarios `e2e`, que no tienen sección de Solución propia.

## Ejecuta

Ponte en la rama correcta: quédate en `feat/{spec_key}` si ya estás a mitad de ciclo, o sácala
nueva desde el default actual, borrando antes una obsoleta que dejara una publicación previa.
Luego escribe o actualiza `specs/{spec_key}/spec.md` con `status: pending` —conservando cualquier
`released-version` ya fijada—, numera los criterios activos `AC-{spec_id}.{n}` sin marcar, mueve a
`Deprecated criteria` los obsoletos (con fecha y motivo) si enmiendas, y añade la línea al PRD si
creas.

Confirma con un commit `docs: …` y delega en el paso de planificación.

## Verificación

- [ ] Existe `specs/{spec_key}/spec.md`, con el formato correcto y sin marcadores de posición en
  blanco.
- [ ] Los criterios están numerados `AC-{spec_id}.{n}`, todos los activos sin marcar, ninguno
  renumerado ni reutilizado.
- [ ] Cualquier criterio retirado está bajo `Deprecated criteria` con su id, fecha y motivo.
- [ ] Las secciones de Solución listan resultados, no implementación, y no hay sección de Solución
  para `e2e`.
- [ ] El estado es `pending`; en una creación el PRD lista la especificación, sin línea duplicada.
- [ ] El trabajo está en una `feat/{spec_key}` nueva desde el default actual, no en una rama
  fusionada reabierta.
