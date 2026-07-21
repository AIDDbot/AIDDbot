# Explorar — mapear el proyecto antes de que alguien construya

`/explore` es la primera skill en la tubería de AIDD. Lee un repositorio y escribe qué
es el proyecto — sus reglas de agente, su arquitectura del sistema, su modelo de datos
conceptual y una cáscara vacía para el documento de requisitos del producto (PRD). No
escribe código de aplicación; solo produce los documentos de guía sobre los que se
construye todo lo demás.

Piénsalo como un Arquitecto de Software Senior entrando en una base de código existente,
leyendo las señales y dibujando los primeros mapas.

## Para qué sirve

Antes de que cualquier característica pueda ser especificada, planificada o codificada,
el proyecto necesita una comprensión compartida y escrita de su forma: qué agente debe
obedecer qué reglas, qué unidades ejecutables (contenedores) existen, cómo se relacionan
y de qué trata el dominio. `/explore` crea esa línea base a partir de la evidencia que ya
existe en el repositorio, y llena los vacíos preguntando al humano en lugar de inventar
respuestas.

## Cuándo usarla

- Al inicio de un proyecto, o al integrar una base de código existente en AIDD.
- Cuando los mapas de alto nivel se han desviado tanto que necesitan reconstruirse desde
  cero (un `/release` puede devolver aquí cuando la desviación es significativa).

Es el punto de entrada de la tubería de construcción:
`/explore → /extract → /specify → /planify → /codify → /verify → /review → /release`.

## Qué le das

- **Requerido:** el árbol del repositorio (el proyecto que debe mapear).

Eso es todo lo que necesita estrictamente. Todo lo demás lo infiere de la evidencia o te
lo pregunta, una pregunta cerrada a la vez.

## Qué produce

- **`{Agents_File}`** — el archivo raíz de reglas de agente (`AGENTS.md` por defecto, o
  `CLAUDE.md`), mantenido bajo 100 líneas y conciso.
- **`{Product_Folder}/arch/system.arch.md`** — la arquitectura del sistema en el Nivel 2
  de C4: la lista de contenedores, cómo se conectan, y una **Tier** para cada uno
  (`front | back | db | e2e | fullstack`).
- **`{Product_Folder}/model/model.schema.md`** — el modelo conceptual: entidades del
  dominio y sus relaciones solamente, deliberadamente sin *atributos*.
- **`{Product_Folder}/specs/PRD.md`** — la *cáscara* del PRD: un párrafo del producto y
  nada más. Las líneas de categoría nunca se agregan aquí; se agregan más adelante por
  `/specify`.

Los cuatro son documentos de guía. Nunca se escribe código de aplicación por esta skill.

## Cómo se comporta (las reglas que nunca rompe)

- **Evidencia sobre invención.** Toda declaración clave debe rastrearse a algo en el
  repositorio o a una respuesta que diste. No fabrica hechos.
- **Pregunta, no asumas.** Las aclaraciones son preguntas cerradas a menos que le digas
  que use valores por defecto. Cuando debe recurrir a un valor por defecto, lo etiqueta
  como una suposición y te pide que lo confirmes.
- **Un valor por defecto fuerte, no un menú.** Cuando prescribe algo nuevo, ofrece un
  único valor por defecto de opinión fuerte en lugar de una lista de opciones.
- **Observa, nunca rediseñes.** Documenta lo que ya existe. Si encuentra
  contradicciones, las señala en lugar de silenciosamente "arreglarse" el diseño.
- **Mantente fuera de la fuente.** Lee el árbol de archivos y *archivos de guía*
  (`README.md`, `CHANGELOG.md`, `package.json`, `pom.xml`, `go.mod`) — nunca el código
  de aplicación. Esa lectura más profunda es trabajo de `/extract`.
- **La cáscara del PRD se crea una sola vez.** Escribe `specs/PRD.md` una sola vez y
  nunca agrega líneas de categoría a ella.

## Cómo funciona, paso a paso

1. **Investigación.** Lee los archivos de guía primero, luego detecta el sistema operativo,
   shell y repositorio Git remoto; las carpetas de producto y fuente; el problema y
   solución que aborda el proyecto; los contenedores y sus tiers; y las entidades del
   dominio y relaciones. Donde falta evidencia, propone un valor por defecto y te pide
   que confirmes, una pregunta cerrada a la vez — luego se detiene antes de redactar nada.
2. **Plan.** Mapea cada marcador de posición en sus cuatro plantillas a una pieza de
   evidencia de archivo de guía o una de tus respuestas. Cualquier marcador sin respaldo
   se convierte en una pregunta enfocada sí/no o múltiple opción. Prepara el párrafo del
   producto del PRD, dejando las categorías vacías para `/specify`.
3. **Implementar.** Escribe los cuatro artefactos, los confirma con un mensaje
   `docs(explore): …`, y delega a `/extract` una vez por contenedor para que cada
   contenedor se documente en profundidad.

## Cómo sabes que funcionó

- El archivo de reglas de agente, `system.arch.md`, `model.schema.md` y `PRD.md` todos
  existen.
- Cada contenedor enumera una **Tier**; ningún marcador de plantilla se dejó vacío; el
  modelo tiene entidades y relaciones pero sin atributos.
- El PRD tiene su párrafo del producto y sin entradas de categoría fabricadas.
- No hay suposiciones sin resolver dejadas pendientes.

## Dónde delega

Una vez dibujados los mapas, `/explore` delega cada contenedor a `/extract`, que los
documenta uno a la vez.
