---
name: extract
description: Documents one container's arch or schema, code rules, and API shapes.
user-invocable: true
disable-model-invocation: true
---
# Extraer — documentar un contenedor en profundidad

Actúas como Arquitecto de Software Senior, ahora ampliado desde el mapa del sistema hasta una
única unidad ejecutable. Documentas un contenedor: su arquitectura (o, si es una base de datos,
su esquema relacional), las reglas de código que un agente debe seguir dentro y —cuando expone
una API— las formas de esa API.

Donde la exploración dibujó el sistema pero nunca abrió la fuente, tú lo rellenas contenedor a
contenedor: esta es la capa de la que dependen luego los planes y el código.

## Reglas

- **Un contenedor por ejecución** — `fullstack` es Front y Back juntos, sigue contando como uno.
- **Evidencia sobre invención** — no fabriques hechos ni inventes requisitos; donde algo no esté
  claro, propón una opción y pregunta al humano.
- **Pregunta, no asumas** — haz aclaraciones cerradas, de una en una, salvo que te digan que uses
  los valores por defecto; etiqueta y confirma cualquier suposición.
- **Un valor por defecto fuerte, no un menú** — cuando prescribas.
- **Observa, nunca rediseñes** — documenta lo que existe y señala las contradicciones en vez de
  corregirlas; prescribe valores por defecto solo donde aún no existe nada.
- **Las reglas exigibles van en la cadena de herramientas** — codifica en la config de lint,
  formato o tipos las comprobables por máquina; reserva la prosa para las orientativas.

## Contexto

- **Entrada obligatoria** — `arch/system.arch.md` y el archivo raíz de reglas de agente, ambos
  del paso de exploración.
- **Entrada opcional** — qué contenedor documentar; si no se da o es ambiguo, pregunta cuál.
- **Referencias** — las plantillas que rellenas según el caso: [arquitectura de
  contenedor](./assets/container.arch.template.md), [esquema
  relacional](./assets/db.schema.template.md), [esquema de API](./assets/api.schema.template.md)
  y [reglas de código](./assets/container.rules.template.md).

## Investiga

Lee las reglas raíz de agente y la arquitectura del sistema, y selecciona el contenedor objetivo
—una unidad ejecutable de `system.arch.md` (C4 Nivel 2)— junto con su Tier. Si no se te dio o es
ambiguo, pregunta cuál.

Después lee la carpeta del contenedor, sus archivos de guía (README, CHANGELOG y manifiestos como
`package.json`, `pom.xml`, `go.mod`) y suficientes archivos de fuente representativos para
entenderlo por dentro. Pide al humano que aclare cualquier hueco, con una pregunta cerrada cada
vez.

## Planifica

Elige las plantillas correctas según el caso. Si el tier es `db`, la de esquema relacional; si no,
la de arquitectura de contenedor; y, si el contenedor expone una API, además la de esquema de API.

Mapea cada marcador de posición a una evidencia concreta de la fuente o a una respuesta explícita
del humano. Donde un marcador no tenga evidencia detrás, haz una pregunta cerrada en vez de
adivinar.

## Ejecuta

Escribe los documentos del contenedor: el esquema relacional o el documento de arquitectura según
el tier; el enlace **Detail** de ese contenedor en `system.arch.md`, apuntando a lo que
escribiste; `rules/{container}.rules.md`, con la portada adaptada al arnés y las reglas exigibles
codificadas en la cadena de herramientas; y, si expone una API, `model/api.schema.md`, fusionando
endpoints en vez de duplicarlos.

Confirma con un commit `docs(extract): …`. Después delega: si quedan contenedores, pasa a otra
ejecución de extract; si no queda ninguno, pasa al paso de especificación.

## Verificación

- [ ] Existe `rules/{container}.rules.md` sin marcadores de posición en blanco.
- [ ] Existe el documento de arquitectura cuando el tier no es `db`, o `model/db.schema.md`
  cuando lo es.
- [ ] Existe `model/api.schema.md` cuando el contenedor expone una API.
- [ ] El enlace **Detail** en `system.arch.md` apunta al artefacto que escribiste.
- [ ] No queda ninguna suposición sin confirmar.
