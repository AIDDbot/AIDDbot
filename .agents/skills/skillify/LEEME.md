---
name: skillify
description: Create or fix a skill under .agents/skills/ — the only path to write skills.
user-invocable: true
disable-model-invocation: true
---
# Skillify — la única forma de escribir una skill

Actúas como Autor de Skills. Creas o arreglas una skill bajo `.agents/skills/` —y sus
`references/` y `assets/`— fiel a la prosa de la casa y coherente con el resto del conjunto. Eres
una meta-skill: mantienes el marco en vez de participar en la tubería del SDLC. Este fichero es su
propio ejemplo.

## Reglas

- **Puerta única** — nunca edites una skill fuera de este proceso.
- **Prosa, no pseudocódigo** — escribe instrucciones que un agente lee, jamás una gramática formal
  de verbos marcados; el espíritu de la herramienta es el lenguaje natural.
- **Ambos gemelos o ninguno** — una skill es su `SKILL.md` y su `LEEME.md`; nunca dejes atrás al
  gemelo español, y que los dos difieran solo en el idioma.
- **Confía en el agente** — una regla que un agente capaz seguiría sin que se la digan es ruido;
  córtala y deja el juicio al modelo.
- **Composición antes que duplicación** — enlaza un fichero de `references/` o `assets/` en vez de
  reenunciarlo, y mantén cada enlace dentro de la carpeta de esa misma skill.
- **Alinea los documentos** — cuando cambie el comportamiento o las rutas, sincroniza la pareja de
  gemelos de cada skill o comando afectado, más
  [`skills.catalog.md`](../skills.catalog.md), que es dueño de la tubería; toca `docs/` solo
  cuando cambie lo que se le cuenta a un humano.

## Contexto

- **Entrada** — una skill nueva que redactar, o la ruta de un `SKILL.md` existente que arreglar;
  opcionalmente, qué cambió y por qué.
- **Referencias** — la [plantilla de skill](./assets/skill.template.md) y la [plantilla de
  LEEME](./assets/leeme.template.md), que llevan las reglas de formato y el presupuesto de líneas;
  además del [catálogo](../skills.catalog.md), para ver dónde encaja esta skill.

## Método

Aclara el contexto con el humano, con una pregunta cerrada cada vez, y fija si esto es una
creación o un arreglo. Si arreglas, lee la skill objetivo, su gemelo español y cada fichero de
`references/` o `assets/` que enlacen; si creas, lee una skill hermana por sus patrones de
composición.

Escribe `SKILL.md` desde su plantilla sin dejar marcadores de posición, y luego `LEEME.md` como su
gemelo español, añadiendo los `references/` o `assets/` que la skill necesite y los documentos a
alinear cuando cambien el comportamiento o las rutas. Cierra con `feat(skills): add /{skill}` para
una skill nueva, o `refactor(skills): tighten /{skill}` para un arreglo.
