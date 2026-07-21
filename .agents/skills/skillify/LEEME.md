# Skillificar — la única forma de escribir una skill

`/skillify` crea o arregla una skill bajo `.agents/skills/`. Es la única puerta por la que
se escribe cualquier `SKILL.md` —y sus `references/` y `assets/`—. Es una meta-skill: no
forma parte de la tubería SDLC, mantiene el propio framework de skills, actuando como Autor
de Skill que convierte la intención en una skill bien formada, fiel a la gramática de la
casa y consistente con el resto del conjunto.

> Nota: este LEEME es en sí mismo un ejemplo de la idea que sirve. El README/LEEME de cada
> skill es la especificación en lenguaje natural «des-skillificada» de su `SKILL.md`;
> ejecutar esa especificación de vuelta por `/skillify` debería reproducir la skill.

## Para qué sirve

Las skills de este repositorio siguen una forma fija (Rol, Tarea, Guardrails, Contexto,
Pasos, Verificación) y una gramática de oración restringida en sus Pasos. `/skillify`
mantiene esa disciplina: cada skill nueva o cambiada pasa por ella, para que el formato, la
gramática, los límites de ancho y largo y las referencias cruzadas sigan sincronizados.
También mantiene al día los documentos de alineación —el catálogo, el mapa de ciclo de
vida, los README/LEEME y el flujo de trabajo— cuando cambian el comportamiento o las rutas.
Úsala para redactar una skill nueva, o para arreglar o ajustar una existente, sus
referencias o sus activos.

Posición: se mantiene fuera de la tubería de construcción y no delega en nadie; es
invocable por el usuario y el modelo nunca la invoca automáticamente.

## Entradas y salidas

- **Entrada (requerida):** una skill nueva a redactar, o la ruta a un `SKILL.md` existente
  a arreglar. **Opcional:** qué cambió y por qué (para una corrección).
- **Un `SKILL.md`** escrito desde la plantilla, sin marcadores de posición.
- **Cualquier `references/*.guide.md` o `assets/*`** que la skill necesite, enlazado solo
  desde la carpeta de esa skill.
- **Documentos de alineación actualizados** — README/LEEME, `skills.catalog.md`,
  `skills.lifecycle.md`, `docs/AIDD.workflow.md` — cuando cambian comportamiento o rutas.

## Las reglas que nunca rompe

- **Puerta única** — una skill nunca se edita fuera de `/skillify`.
- **Ancho** — oraciones de menos de 100 caracteres; nunca parte una oración para fingir el
  límite.
- **Largo** — menos de 100 oraciones por skill (blancos y encabezados no cuentan).
- **Gramática** — los Pasos usan las [formas de la gramática de skill](./references/grammar.md);
  las demás secciones son declarativas.
- **Composición sobre duplicación** — la duplicación corta está bien, pero se prefiere
  componer.
- **Alinear documentos** — los cambios de comportamiento o rutas sincronizan catálogo,
  ciclo de vida, README/LEEME y flujo de trabajo.

Consulta [SKILL.md](./SKILL.md) para los pasos exactos y la lista de verificación, y
[references/grammar.md](./references/grammar.md) para la gramática de oración.
