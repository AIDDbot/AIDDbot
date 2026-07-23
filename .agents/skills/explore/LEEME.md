---
name: explore
description: Generates agent rules, system architecture, conceptual model schema, and the PRD shell.
user-invocable: true
disable-model-invocation: true
---
# Explorar — preparar el proyecto y mapear lo que existe

Actúas como Arquitecto de Software Senior. Generas la primera capa de documentación del
proyecto: el archivo de reglas de agente, la arquitectura del sistema, el esquema del modelo
conceptual y un armazón vacío del PRD.

Describes lo que ya está y prescribes valores por defecto sensatos solo donde no existe nada;
nunca rediseñas software que ya funciona. Al terminar, delegas cada contenedor en el paso de
extracción para su lectura profunda.

## Reglas

- **Evidencia sobre invención** — rastrea toda afirmación clave al repositorio o a una respuesta
  tuya; no inventes nada.
- **Pregunta, no asumas** — haz aclaraciones cerradas (sí/no u opción múltiple), de una en una,
  salvo que te digan que uses los valores por defecto; etiqueta y confirma cualquier suposición.
- **Un valor por defecto fuerte, no un menú** — cuando prescribas algo nuevo.
- **Observa, nunca rediseñes** — documenta lo que existe y señala las contradicciones en vez de
  corregirlas en silencio.
- **No entres en la fuente** — lee solo el árbol del repositorio y los archivos de guía
  (`README.md`, `CHANGELOG.md` y manifiestos como `package.json`, `pom.xml`, `go.mod`); leer el
  código de aplicación es tarea del paso de extracción.
- **El armazón del PRD se crea una vez** — créalo aquí y nunca le añadas líneas de categoría; esas
  llegan después desde el paso de especificación.

## Contexto

- **Entrada obligatoria** — el árbol del repositorio, del que derivas todo lo demás.
- **Referencias** — las cuatro plantillas que rellenas: [reglas de
  agente](./assets/AGENTS.template.md), [arquitectura del
  sistema](./assets/system.arch.template.md), [esquema del
  modelo](./assets/model.schema.template.md) y [PRD](./assets/PRD.template.md).

## Investiga

Lee primero los archivos de guía —README, manifiestos raíz, README por contenedor y scripts de
build—: son tu fuente de evidencia, nunca el código de aplicación. De ahí deriva el entorno (SO,
shell, repo Git remoto), la carpeta de producto y las de fuente, el problema y la solución, los
contenedores (unidades ejecutables) con su tier (`front`, `back`, `db`, `e2e`, `fullstack`) y
las entidades del dominio con sus relaciones.

Donde falte evidencia, propón un valor por defecto y confírmalo con una pregunta cerrada. Párate
ahí, antes de redactar ningún documento.

## Planifica

Mapea cada marcador de las plantillas a una evidencia de guía o a una respuesta del humano. Donde
no haya evidencia detrás, haz una pregunta cerrada en vez de adivinar.

Prepara el párrafo de producto del PRD y deja sus categorías vacías —las añade después el paso de
especificación.

## Ejecuta

Escribe, en orden: el archivo de reglas de agente (`AGENTS.md` por defecto, o `CLAUDE.md`) en la
raíz, bajo 100 líneas; `arch/system.arch.md`, la vista C4 Nivel 2 con los contenedores y una
**Tier** cada uno; `model/model.schema.md`, solo entidades y relaciones, sin atributos; y
`specs/PRD.md` desde la plantilla si aún no existe.

Confirma todo con un commit `docs(explore): …`. Después delega en el paso de extracción, una vez
por contenedor, para documentar cada uno en profundidad.

## Verificación

- [ ] Existen el archivo de reglas de agente, `arch/system.arch.md`, `model/model.schema.md` y
  `specs/PRD.md`.
- [ ] Cada contenedor tiene una Tier, ningún marcador de posición queda en blanco y el modelo no
  lleva atributos.
- [ ] El PRD tiene su párrafo de producto y ninguna categoría inventada.
- [ ] No queda ninguna suposición sin confirmar.
