# Skillificar — la única forma de escribir una skill

Actúas como Autor de Skill. Tu trabajo es crear o arreglar una skill bajo `.agents/skills/`. Es
la única puerta por la que se escribe cualquier `SKILL.md` —y sus `references/` y `assets/`—, y
las mismas reglas aplican también a esos archivos de apoyo. Es una meta-skill: no forma parte de
la tubería SDLC, mantiene el propio framework de skills, convirtiendo la intención en una skill
bien formada, fiel a la gramática de la casa y consistente con el resto del conjunto.

> Este LEEME es en sí mismo un ejemplo de la idea que sirve. El README/LEEME de cada skill es la
> forma en lenguaje natural de su skill formal; ejecutar esa prosa de vuelta por este proceso
> debería reproducir la skill.

## Las reglas que nunca rompe

- **Puerta única** — una skill nunca se edita fuera de este proceso.
- **Ancho** — oraciones cortas, de menos de 100 caracteres; nunca parte una oración a mitad solo
  para fingir el límite.
- **Largo** — menos de 100 oraciones por skill; los blancos y encabezados no cuentan.
- **Gramática** — los Pasos usan las [formas de la gramática de skill](./references/grammar.md);
  las demás secciones son declarativas.
- **Composición sobre duplicación** — un poco de repetición está bien, pero prefiere componer.
- **Alinear los documentos** — cuando cambian el comportamiento o las rutas, sincroniza el
  catálogo, el mapa de ciclo de vida, el README (y su traducción LEEME) y el documento de flujo de
  trabajo.

## Qué recibe y qué produce

O bien una skill nueva a redactar, o la ruta a una skill existente a arreglar; opcionalmente, para
una corrección, qué cambió y por qué. Cuando esta guía dice "alinear los documentos", se refiere
al README y su traducción LEEME, `skills.catalog.md`, `skills.lifecycle.md` y
`docs/AIDD.workflow.md`.

Produce:

- **Un `SKILL.md`** escrito desde la [plantilla de skill](./assets/skill.template.md), sin
  marcadores de posición.
- **Cualquier `references/*.guide.md` o `assets/*`** que la skill necesite, enlazado solo desde la
  carpeta de esa misma skill.
- **Documentos de alineación actualizados** — README y su traducción LEEME, catálogo, mapa de
  ciclo de vida y flujo de trabajo — cuando cambian el comportamiento o las rutas.

## Entender antes de escribir

Pide al humano que aclare el contexto, con una pregunta cerrada cada vez. Averigua si esto es una
creación o una corrección. Si arreglas, lee la skill objetivo y cada archivo `references/` o
`assets/` que enlaza. Si creas, lee una skill hermana para sus patrones de composición. Lee el
[catálogo de skills](../skills.catalog.md) para ver dónde encaja esta skill y qué produce.

Después planifica contra las dos guías: la [plantilla de skill](./assets/skill.template.md) que da
la estructura de secciones, y la [gramática de oración](./references/grammar.md) que los Pasos
deben seguir. Mapea el contenido a las secciones estándar — Rol, Tarea, Guardrails, Contexto,
Pasos, Verificación. Lista qué archivos `references/` y `assets/` necesitas añadir o actualizar. Si
cambian el comportamiento o las rutas, lista también qué documentos de alineación deben cambiar.

## Escríbelo

Escribe la skill desde la plantilla, sin dejar marcadores de posición. Escribe cualquier guía de
referencia o activo que la skill necesite, y enlázalos solo desde la carpeta de esa misma skill.
Si cambiaron el comportamiento o las rutas, actualiza los documentos de alineación. Confirma con un
mensaje que encaje con el cambio — por ejemplo `feat(skills): add /{skill}` para una skill nueva, o
`refactor(skills): tighten /{skill}` para una corrección.

## Terminado significa

- La skill sigue las secciones de la plantilla, en orden, sin marcadores de posición.
- Los Pasos y las viñetas de verbo de References se analizan como formas válidas de la gramática de
  skill.
- Las oraciones son cortas, sin saltos de línea artificiales a mitad de oración.
- Los `references/` y `assets/` enlazados existen y se quedan dentro de la carpeta de esa misma
  skill.
- Los documentos de alineación se actualizan siempre que cambien comportamiento o rutas, y el
  catálogo lista la skill.
