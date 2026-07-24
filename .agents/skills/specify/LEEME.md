---
name: specify
description: Capture or amend a one-page spec; problem, solution, and criteria.
user-invocable: true
disable-model-invocation: true
---
# Especificar — capturar una funcionalidad como especificación de una página

Actúas como Analista de Negocio. Capturas una funcionalidad como una especificación nueva, o enmiendas una existente. En ella escribes de forma concisa y formal el problema a resolver, la solución esperada y los criterios para su verificación. 

Te importa el *qué* y el *porqué*, no el *cómo*. Y sigues fielmente las plantillas para maximizar la relación señal/ruido. Controlas el estado y metadata en la cabecera de la especificación

## Reglas

- **Cada especificación es identificable**: tiene un numero secuencial, única, una categoría funcional, un slug y unas etiquetas de contexto.
- **Los ids son permanentes** — los criterios de verificación se identifican de forma única y no reutilizable.
- **Deprecar, nunca borrar** — si un criterio ya no se tiene que cumplir, se mueve a una area especial como obsoleto.
- **Ramas del repositorio** - cada especificación dispone de una rama identificable. Al liberarla, se borra.
- **El PRD actúa como indice** — sirve de catálogo funcional agrupado por categorías.
- **Determina si el requerimiento es nuevo**: usa las etiquetas del PRD para buscar una especificación similar. Lee y determina si es nueva o un cambio.
- **Enmendable, nunca bifurcada** — si el requerimiento propone un cambio sobre algo implementado, lo enmiendas, no creas una nueva enlazada.

## Contexto

- **Requerimiento obligatoria** — necesitas un requisito o descripción de funcionalidad.
- **Referencias** — la [plantilla de especificación](./assets/spec.template.md); el esquema de arquitectura del sistema y el modelo de datos conceptual y el PRD:  `arch/system.arch.md`, `model/model.schema.md` y `specs/PRD.md`

## Investiga

Pide al humano que aclare el contexto, con una pregunta cerrada cada vez. Lee el PRD —el índice por categorías— y empareja categoría y etiquetas para detectar solapamientos con especificaciones existentes.

Decide si es una creación o una enmienda, y deriva o conserva la clave `{spec_id}-{slug}`, que da nombre a la carpeta y a la rama. Lee la arquitectura del sistema y lista los contenedores que esta funcionalidad toca, excluyendo `e2e`.

## Planifica

Prepara el contenido contra la plantilla de especificación. Lee el modelo de datos conceptual para usar los mismos términos, y el documento del sistema para proponer la solución por contenedores.

Prepara el problema, las historias de usuario, las reglas en RuleSpeak y lo que queda fuera de alcance. Prepara también el resumen de solución —una sección por contenedor— y los criterios de aceptación, incluidos los escenarios `e2e`, que no tienen sección de Solución propia.

## Ejecuta

Ponte en la rama correcta: quédate en `feat/{spec_key}` si ya estás a mitad de ciclo, o sácala nueva desde el default actual, borrando antes una obsoleta que dejara una publicación previa. Luego escribe o actualiza `specs/{spec_key}/spec.md` con `status: pending` —conservando cualquier `released-version` ya fijada—, numera los criterios activos `AC-{spec_id}.{n}` sin marcar, mueve a `Deprecated criteria` los obsoletos (con fecha y motivo) si enmiendas, y añade la línea al PRD si creas.

Confirma con un commit `docs: …`. Después delega en el paso de planificación.

## Verificación

- [ ] Existe `specs/{spec_key}/spec.md`, con el formato correcto y sin marcadores de posición en blanco.
- [ ] Los criterios están numerados `AC-{spec_id}.{n}`, todos los activos sin marcar, ninguno renumerado ni reutilizado.
- [ ] Cualquier criterio retirado está bajo `Deprecated criteria` con su id, fecha y motivo.
- [ ] Las secciones de Solución listan resultados, no implementación, y no hay sección de Solución para `e2e`.
- [ ] El estado es `pending`; en una creación el PRD lista la especificación, sin línea duplicada.
- [ ] El repositorio está en una rama `feat/{spec_key}` nueva desde el default actual.
