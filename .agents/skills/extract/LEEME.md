---
name: extract
description: Document one container in depth — architecture or schema, code rules, and API shapes.
user-invocable: true
disable-model-invocation: true
---
# Extraer — documentar un contenedor en profundidad

Actúas como Arquitecto de Software Senior. Partiendo del mapa del sistema, coges una unidad
ejecutable —un contenedor— y detallas su arquitectura y sus reglas de codificación. Además
escribes los esquemas de datos cuando expone una API o trabaja contra la base de datos.

Aquí sí lees código fuente: no todo, solo lo que te parezca decisivo. Los documentos necesitan
detalle y tú eres quien lo aporta, porque esta es la capa en la que se apoyan después los planes
y el desarrollo.

## Reglas

- **Un contenedor por ejecución** — `front`, `back`, `db`, `e2e` o `fullstack`; nunca todo de golpe.
- **Evidencia sobre invención** — rastrea toda afirmación clave al repositorio o a una respuesta
  tuya o del humano; no inventes nada en silencio. Etiqueta y confirma cualquier suposición.
- **Pregunta, no asumas** — plantea aclaraciones cerradas, sí/no u opción múltiple, de una en
  una, hasta que te digan que tires de valores por defecto.
- **Observa, nunca rediseñes** — documenta lo que existe y señala sus contradicciones en vez de
  corregirlas.
- **Debes entrar en la fuente** — lee los ficheros y artefactos que consideres clave o arquetipos.
- **Las reglas de codificación son guía** — prefiere configurar el linter para exigir una regla
  antes que escribir esa regla en la documentación.

## Contexto

- **Entrada obligatoria** — `arch/system.arch.md` y el archivo raíz de reglas de agente.
- **Entrada opcional** — qué contenedor documentar; si no se da o es ambiguo, pregunta cuál.
- **Referencias** — las plantillas que rellenas según el caso: [arquitectura de
  contenedor](./assets/container.arch.template.md), [esquema
  relacional](./assets/db.schema.template.md), [esquema de API](./assets/api.schema.template.md)
  y [reglas de código](./assets/container.rules.template.md).

## Investiga

Lee las reglas raíz de agente y la arquitectura del sistema, y selecciona el contenedor objetivo
—una unidad ejecutable de `system.arch.md`, la vista C4 Nivel 2— junto con su Tier. Si no se te
dio ninguno, o la elección es ambigua, pregunta cuál.

Después lee la carpeta del contenedor, sus archivos de guía y algunos archivos de fuente
representativos para entenderlo por dentro. Pide al humano que aclare cualquier hueco, con una
pregunta cerrada cada vez.

## Planifica

Elige las plantillas correctas según el caso. Si el tier es `db`, la de esquema relacional; si
no, la de arquitectura de contenedor; y, si el contenedor expone una API, además la de esquema de
API.

Mapea cada marcador de posición a una evidencia concreta de la fuente o a una respuesta explícita
del humano. Donde un marcador no tenga evidencia detrás, haz una propuesta y etiqueta la
suposición.

## Ejecuta

Escribe los documentos del contenedor: el esquema relacional o el documento de arquitectura según
pida el tier; el enlace **Detail** de ese contenedor en `system.arch.md`, apuntando a lo que
escribiste; `rules/{container}.rules.md`, con la portada adaptada al arnés y las reglas exigibles
codificadas en la cadena de herramientas; y, si expone una API, `model/api.schema.md`, fusionando
endpoints en vez de duplicarlos.

Confirma con un commit `docs(extract): …`. Después delega para que otra sesión continúe con los
contenedores restantes hasta que no quede ninguno.

## Verificación

- [ ] Existe `rules/{container}.rules.md` sin marcadores de posición en blanco.
- [ ] Existe el documento de arquitectura para un contenedor de código.
- [ ] Existe `model/api.schema.md` o `model/db.schema.md` para un contenedor que expone o almacena datos.
- [ ] El enlace **Detail** en `system.arch.md` apunta al artefacto que escribiste.
- [ ] No queda ninguna suposición sin confirmar.
