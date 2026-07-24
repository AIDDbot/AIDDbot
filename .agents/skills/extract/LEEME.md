---
name: extract
description: Documents one container's arch or schema, code rules, and API shapes.
user-invocable: true
disable-model-invocation: true
---
# Extraer — documentar un contenedor en profundidad

Actúas como Arquitecto de Software Senior, ampliado desde el mapa del sistema cada unidad ejecutable (contenedor) hasta detallar su arquitectura y reglas de codificación. Además, crear esquemas de datos cuando se expone una API, o trabaja con la base datos.

Tienes que leer el código fuente (no todo, solo lo que te parezca importante), pues los documentos necesitan detalle y tú lo rellenas: esta es la capa de la que dependen luego los planes y el desarrollo.

## Reglas

- **Un contenedor por ejecución** — no lo hagas todo de golpe, front, back, db, e2e o fullstack. 
- **Evidencia sobre invención** — rastrea toda afirmación clave al repositorio o a una respuesta del tuya o del humano; no inventes nada en silencio. Etiqueta y confirma cualquier suposición.
- **Pregunta, no asumas** — plantea aclaraciones cerradas (sí/no u opción múltiple), de una en una, hasta que te digan que uses los valores por defecto; .
- **Observa, nunca rediseñes** — documenta lo que existe y señala las contradicciones en vez de corregirlas.
- **Debes entrar en la fuente** — lee el código fuente de los ficheros y artefactos que consideres clave o arquetipos.
- **Las reglas de codificación como guía** — prefiere configurar el lint para garantizar el cumplimiento de las reglas, en vez de codificarlas en la documentación.

## Contexto

- **Entrada obligatoria** — `arch/system.arch.md` y el archivo raíz de reglas de agente.
- **Entrada opcional** — qué contenedor documentar; si no se da o es ambiguo, pregunta cuál.
- **Referencias** — las plantillas que rellenas según el caso: [arquitectura de contenedor](./assets/container.arch.template.md), [esquema relacional](./assets/db.schema.template.md), [esquema de API](./assets/api.schema.template.md) y [reglas de código](./assets/container.rules.template.md).

## Investiga

Lee las reglas raíz de agente y la arquitectura del sistema, y selecciona el contenedor objetivo —una unidad ejecutable de `system.arch.md` (C4 Nivel 2)— junto con su Tier. Si no se te dio o es ambiguo, pregunta cuál.

Después lee la carpeta del contenedor, sus archivos de guía y algunos archivos de fuente representativos para entenderlo por dentro. Pide al humano que aclare cualquier hueco, con una pregunta cerrada cada vez.

## Planifica

Elige las plantillas correctas según el caso. Si el tier es `db`, la de esquema relacional; si no, la de arquitectura de contenedor; y, si el contenedor expone una API, además la de esquema de API.

Mapea cada marcador de posición a una evidencia concreta de la fuente o a una respuesta explícita del humano. Donde un marcador no tenga evidencia detrás, haz una propuesta y etiqueta la suposición.

## Ejecuta

Escribe los documentos del contenedor: el esquema relacional o el documento de arquitectura según el tier; el enlace **Detail** de ese contenedor en `system.arch.md`, apuntando a lo que escribiste; `rules/{container}.rules.md`, con la portada adaptada al arnés y las reglas exigibles codificadas en la cadena de herramientas; y, si expone una API, `model/api.schema.md`, fusionando endpoints en vez de duplicarlos.

Confirma con un commit `docs(extract): …`. después delega para que otra sesión continúe con el resto de contenedores hasta terminar.

## Verificación

- [ ] Existe `rules/{container}.rules.md` sin marcadores de posición en blanco.
- [ ] Existe el documento de arquitectura para contenedores de código.
- [ ] Existe `model/api.schema.md` o `model/db.schema.md` para contenedores que exponen o consumen datos.
- [ ] El enlace **Detail** en `system.arch.md` apunta al artefacto que escribiste.
- [ ] No queda ninguna suposición sin confirmar.
