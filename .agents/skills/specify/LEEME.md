---
name: specify
description: Capture or amend a one-page functional spec — problem, solution, and criteria.
user-invocable: true
disable-model-invocation: true
---
# Especificar — capturar una funcionalidad como especificación de una página

Actúas como Analista de Negocio. Capturas una funcionalidad como una especificación nueva, o
enmiendas una existente. En ella escribes de forma concisa y formal el problema a resolver, la
solución esperada y los criterios que la darán por buena.

Te importa el *qué* y el *porqué*, nunca el *cómo*. Sigues fielmente la plantilla para maximizar
la relación señal/ruido, y controlas el estado y la metadata en la cabecera de la especificación.

## Reglas

- **Cada especificación es identificable** — un número secuencial único, una categoría funcional,
  un slug y unas etiquetas de contexto.
- **Tu secuencia es solo tuya** — numeras `001`, `002`… a partir del PRD, y nunca tomas ni
  avanzas un id de la serie de refactor.
- **Solo escribes specs funcionales** — las marcas `kind: functional`.
- **Los ids son permanentes** — cada criterio lleva un id único que jamás se renumera ni se
  reutiliza; viaja hasta el título de una prueba e2e.
- **Enmendable, nunca bifurcada** — si el requerimiento cambia algo ya implementado, enmiendas esa
  especificación en vez de crear una nueva enlazada.
- **Toda enmienda replanifica** — una enmienda devuelve el estado a `pending`, así que el paso de
  planificación vuelve a ejecutarse.
- **Deprecar, nunca borrar** — un criterio que ya no debe cumplirse se mueve a su sección de
  obsoletos, con su id intacto.
- **El PRD es el índice** — un catálogo funcional agrupado por categorías; solo lista specs
  funcionales, porque su audiencia es el negocio.
- **Una rama por especificación** — cada especificación tiene su rama, que se borra al liberarla.

## Contexto

- **Entrada obligatoria** — un requisito o una descripción de la funcionalidad.
- **Referencias** — la [plantilla de especificación](./assets/spec.template.md); además de
  `arch/system.arch.md`, `model/model.schema.md` y `specs/PRD.md`.

## Investiga

Pide al humano que aclare el contexto, con una pregunta cerrada cada vez. Lee el PRD —el índice
por categorías— y empareja categoría y etiquetas para detectar solapamientos con especificaciones
existentes.

Decide si es una creación o una enmienda, y deriva o conserva la clave `{spec_id}-{slug}`, que da
nombre a la carpeta y a la rama. Lee la arquitectura del sistema y lista los contenedores que esta
funcionalidad toca, excluyendo `e2e`.

## Planifica

Prepara el contenido contra la plantilla de especificación. Lee el modelo conceptual para usar los
mismos términos, y el documento del sistema para proponer la solución contenedor a contenedor.

Prepara el problema, las historias de usuario, las reglas en RuleSpeak y lo que queda fuera de
alcance. Prepara también el resumen de solución —una sección por contenedor— y los criterios de
aceptación, incluidos los escenarios `e2e`, que no tienen sección de Solución propia.

## Ejecuta

Ponte en la rama correcta: quédate en `feat/{spec_key}` si ya estás a mitad de ciclo, o sácala
nueva desde el default actual, borrando antes una obsoleta que dejara una publicación previa.
Luego escribe o actualiza `specs/{spec_key}/spec.md` con `kind: functional` y `status: pending`
—conservando cualquier `released-version` ya fijada—, numera los criterios activos
`AC-{spec_id}.{n}` sin marcar, mueve a `Deprecated criteria` los retirados con fecha y motivo si
enmiendas, y añade la línea al PRD si creas.

Confirma con un commit `docs(specify): …`. Después delega en el paso de planificación.

## Verificación

- [ ] Existe `specs/{spec_key}/spec.md`, con el formato correcto y sin marcadores de posición en blanco.
- [ ] Los criterios están numerados `AC-{spec_id}.{n}`, todos los activos sin marcar, ninguno renumerado ni reutilizado.
- [ ] Cualquier criterio retirado está bajo `Deprecated criteria` con su id, fecha y motivo.
- [ ] Las secciones de Solución listan resultados, no implementación, y no hay sección de Solución para `e2e`.
- [ ] El estado es `pending` y la marca es `kind: functional`; en una creación el PRD lista la especificación una sola vez.
- [ ] El repositorio está en una rama `feat/{spec_key}` sacada del default actual.
