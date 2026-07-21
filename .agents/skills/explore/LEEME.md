# Explorar — mapear el proyecto antes de que alguien construya

`/explore` es la primera skill de la tubería AIDD. Lee un repositorio y anota qué *es* el
proyecto —sus reglas de agente, su arquitectura del sistema, su modelo de datos conceptual
y un armazón vacío del PRD— sin escribir código de aplicación. Piénsalo como un Arquitecto
de Software Senior que entra en una base de código, lee las señales y dibuja los primeros
mapas.

## Para qué sirve

Antes de especificar, planificar o codificar nada, el proyecto necesita una comprensión
compartida y escrita de su forma: qué reglas debe obedecer un agente, qué contenedores
existen y cómo se relacionan, y de qué trata el dominio. `/explore` construye esa línea
base a partir de la evidencia que ya hay en el repositorio y cubre los huecos preguntando,
no inventando. Úsala al inicio de un proyecto, al incorporar una base de código existente,
o cuando los mapas de alto nivel se han desviado tanto que hay que reconstruirlos.

Posición: es el punto de entrada —
`/explore → /extract → /specify → /planify → /codify → /verify → /review → /release` —
y delega cada contenedor en `/extract`.

## Entradas y salidas

- **Entrada:** el árbol del repositorio.
- **`{Agents_File}`** — el archivo raíz de reglas de agente (`AGENTS.md` o `CLAUDE.md`),
  bajo 100 líneas.
- **`arch/system.arch.md`** — la arquitectura C4 Nivel 2: contenedores, cómo se conectan
  y una **Tier** para cada uno (`front | back | db | e2e | fullstack`).
- **`model/model.schema.md`** — el modelo conceptual: solo entidades del dominio y sus
  relaciones, sin atributos.
- **`specs/PRD.md`** — el *armazón* del PRD: un párrafo de producto y nada más. Las líneas
  de categoría las añade después `/specify`.

## Las reglas que nunca rompe

- **Evidencia sobre invención** — toda afirmación clave se rastrea al repositorio o a tu
  respuesta.
- **Pregunta, no asumas** — preguntas cerradas; los valores por defecto se etiquetan y
  confirman.
- **Un valor por defecto fuerte, no un menú** cuando debe prescribir algo nuevo.
- **Observa, nunca rediseñes** — documenta lo que existe y señala contradicciones.
- **No entra en la fuente** — lee el árbol y los archivos de guía; la lectura profunda es
  tarea de `/extract`.
- **El armazón del PRD se crea una vez** — nunca le añade líneas de categoría.

Consulta [SKILL.md](./SKILL.md) para los pasos exactos y la lista de verificación.
