# Skillificar — la única forma de escribir una skill

`/skillify` crea o arregla una skill bajo `.agents/skills/`. Es la única puerta a través
de la cual se escribe cualquier `SKILL.md` — y sus `references/` y `assets/`. Es una
meta-skill: no es parte de la tubería SDLC; mantiene el framework de habilidades en sí.

Juega un Autor de Skill: convierte la intención en una skill bien formada que obedece la
gramática de la casa y se mantiene consistente con el resto del conjunto de habilidades.

## Para qué sirve

Las skills en este repositorio siguen una forma fija (Rol, Tarea, Guardrails, Contexto,
Pasos, Verificación) y una gramática de oración restringida en sus Pasos. `/skillify` es
lo que mantiene esa disciplina: cada skill nueva o cambiada pasa a través de ella, para
que el formato, la gramática, los límites de ancho y largo, y las referencias cruzadas
todos se mantengan en sincronía. También es la skill que mantiene los documentos de
alineación — el catálogo, el mapa de ciclo de vida, LEEMEs, y el documento de flujo de
trabajo — actualizado cuando el comportamiento o las rutas cambian.

> Nota: este LEEME es en sí mismo un ejemplo de la idea que sirve. Cada skill tiene un
> LEEME que es la especificación en lenguaje natural de-skillificado de su `SKILL.md`;
> ejecutando esa especificación de vuelta a través de `/skillify` debería reproducir la
> skill.

## Cuándo usarla

- Para redactar una skill completamente nueva.
- Para arreglar o ajustar una skill existente, sus referencias, o sus activos.

Es invocable por usuario y nunca invocada automáticamente por el modelo. Se mantiene
fuera de la tubería de construcción.

## Qué le das

- **Requerido:** una skill nueva para redactar, o la ruta a un `SKILL.md` existente para
  arreglar.
- **Opcional:** qué cambió y por qué (para una corrección).

## Qué produce

- **Un `SKILL.md`** escrito desde la plantilla de skill, sin marcadores de posición
  dejados.
- **Cualquier `references/*.guide.md` o `assets/*`** que la skill necesite, enlazado
  solo desde la carpeta de esa skill.
- **Documentos de alineación actualizados** — el LEEME, `skills.catalog.md`,
  `skills.lifecycle.md`, y `docs/AIDD.workflow.md` — siempre que el comportamiento o
  rutas cambien.
- Una confirmación: `feat(skills): add /{skill}` o `refactor(skills): tighten /{skill}`.

## Cómo se comporta (las reglas que nunca rompe)

- **Puerta única.** Una skill nunca se edita fuera de `/skillify`.
- **Ancho.** Las oraciones permanecen cortas (menos de 100 caracteres); nunca envuelve
  mid-oración para fingir el límite.
- **Largo.** Una skill permanece bajo 100 oraciones (líneas en blanco y encabezados no
  cuentan).
- **Gramática.** Los Pasos usan las formas de gramática de skill; otras secciones
  permanecen declarativas.
- **Composición sobre duplicación.** Duplicación corta está bien, pero composición es
  preferida.
- **Alinea documentos.** Cuando el comportamiento o rutas cambian, sincroniza el
  catálogo, ciclo de vida, LEEME, y flujo de trabajo.

## Cómo funciona, paso a paso

1. **Investigación.** Te pregunta para aclarar el contexto una pregunta cerrada a la vez,
   y decide crear vs arreglar. Cuando arregla, lee el `SKILL.md` objetivo y cada archivo
   `references/` y `assets/` que vincula. Cuando crea, lee un `SKILL.md` hermano para
   patrones de composición. Lee el catálogo de skills para ver dónde se sienta la skill
   y qué produce.
2. **Plan.** Lee la plantilla de skill y la gramática de oración, mapea el contenido en
   Rol, Tarea, Guardrails, Contexto, Pasos, y Verificación, enumera qué referencias/
   activos agregar o actualizar, y — si el comportamiento o rutas cambian — enumera qué
   documentos de alineación actualizar.
3. **Implementar.** Escribe el `SKILL.md` desde la plantilla sin marcadores de posición,
   escribe cualquier referencias o activos que la skill necesite (enlazados solo desde la
   carpeta de esa skill), actualiza los documentos de alineación si el comportamiento o
   rutas cambiaron, y confirma.

## Cómo sabes que funcionó

- El `SKILL.md` sigue las secciones de plantilla, en orden, sin marcadores de posición
  dejados.
- Los viñetas de verbo en Pasos y Referencias se analizan como formas válidas de gramática
  de skill.
- Las oraciones son cortas, sin saltos de línea mid-oración artificial.
- Las referencias y activos enlazados existen y permanecen en la carpeta de la misma skill.
- Los documentos de alineación fueron actualizados cuando el comportamiento o rutas
  cambiaron, y el catálogo enumera la skill.

## La gramática de oración (para escribir Pasos)

Los Pasos y los viñetas de verbo en Referencias siguen una pequeña gramática; otras
secciones permanecen prosa declarativa. En resumen:

- **Acción:** `_<verbo>_ {sujetos}.` — verbos preferidos incluyen `_read_`, `_write_`,
  `_update_`, `_ask_`, `_commit_`, `_run_`, `_handoff_`, y un puñado más.
- **Condicional:** `_if_ {condición}, {acción}.` (opcionalmente `; _else_ {acción}.`),
  donde la acción es en sí misma una Acción, Handoff, o Bloque.
- **Iteración:** `_for-each_ {elemento}, {acción}.` — secuencial por defecto; di "en
  paralelo" solo cuando no se escribe archivo compartido.
- **Bloque:** cuando un `_if_` o `_for-each_` necesita más de una acción, sangra un
  nivel, cada hijo siendo una Acción, Condicional, Iteración, o Handoff.
- **Handoff:** `_handoff_ to /{skill}.`

Mantén las oraciones bajo 100 caracteres y divide las ideas largas en más oraciones en
lugar de envolver.

## Dónde delega

En ningún lugar en la SDLC — se mantiene aparte, manteniendo el framework de skill en
el que se escriben las skills de tubería.
