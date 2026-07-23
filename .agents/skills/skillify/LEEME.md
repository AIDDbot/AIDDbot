---
name: skillify
description: Create or fix a skill under .agents/skills/ — the only path to write skills.
user-invocable: true
disable-model-invocation: true
---
# Skillificar — la única forma de escribir una skill

Actúas como Autor de Skill. Creas o arreglas una skill bajo `.agents/skills/` —y sus
`references/` y `assets/`—, convirtiendo la intención en una skill bien formada, fiel a la
gramática de la casa y consistente con el resto del conjunto.

Eres la única puerta por la que se escribe cualquier skill, y una meta-skill: mantienes el propio
framework en vez de formar parte de la tubería SDLC. Este LEEME es en sí mismo un ejemplo de lo
que produce —ejecutar esta prosa de vuelta por el proceso debería reproducir la skill.

## Reglas

- **Puerta única** — nunca edites una skill fuera de este proceso.
- **Ancho** — oraciones cortas, de menos de 100 caracteres; nunca partas una a mitad solo para
  fingir el límite.
- **Largo** — menos de 100 oraciones por skill; los blancos y encabezados no cuentan.
- **Gramática** — usa en los Pasos las [formas de la gramática de skill](./references/grammar.md);
  mantén declarativas las demás secciones.
- **Composición sobre duplicación** — un poco de repetición está bien, pero prefiere componer.
- **Alinear los documentos** — cuando cambien el comportamiento o las rutas, sincroniza el README
  y su LEEME de cada skill y comando, `skills.catalog.md`, `skills.lifecycle.md` y
  `docs/AIDD.workflow.md`.

## Contexto

- **Entrada obligatoria** — una skill nueva a redactar, o la ruta a un `SKILL.md` existente a
  arreglar.
- **Entrada opcional** — qué cambió y por qué, para una corrección.
- **Referencias** — la [gramática de frase](./references/grammar.md), la [plantilla de
  skill](./assets/skill.template.md) para el formal y la [plantilla de
  prosa](./assets/leeme.template.md) para el README/LEEME.

## Investiga

Pide al humano que aclare el contexto, con una pregunta cerrada cada vez. Con eso decide si es
una creación —una skill nueva a redactar— o una corrección de una existente.

Si arreglas, lee la skill objetivo y cada archivo `references/` o `assets/` que enlaza; si creas,
lee una skill hermana por sus patrones de composición. En ambos casos, lee el [catálogo de
skills](../skills.catalog.md) para ver dónde encaja esta skill y qué produce.

## Planifica

Planifica contra las tres guías que listó Contexto: la plantilla de skill da la estructura del
formal, la de prosa la del README/LEEME, y la gramática las formas que los Pasos deben seguir.

Mapea el contenido a las secciones estándar y lista qué archivos `references/` y `assets/` añadir
o actualizar. Si cambian el comportamiento o las rutas, lista también qué documentos de
alineación tocar.

## Ejecuta

Escribe el `SKILL.md` desde la plantilla, sin dejar marcadores de posición. Luego cualquier
`references/*.guide.md` o `assets/*` que la skill necesite, enlazados solo desde su propia
carpeta; y, si cambiaron el comportamiento o las rutas, los documentos de alineación.

Cierra con un commit que encaje: `feat(skills): add /{skill}` para una skill nueva, o
`refactor(skills): tighten /{skill}` para una corrección.

## Verificación

- [ ] El `SKILL.md` sigue las secciones de la plantilla, en orden, sin marcadores de posición.
- [ ] Los Pasos y las viñetas de verbo de References se analizan como gramática de skill válida.
- [ ] Las oraciones son cortas, sin saltos de línea artificiales a mitad de oración.
- [ ] Los `references/` y `assets/` enlazados existen y se quedan dentro de la carpeta de esa
  misma skill.
- [ ] Los documentos de alineación se actualizan cuando cambian comportamiento o rutas, y el
  catálogo lista la skill.
