# web-B: informe y arreglos (2026-10-18)

## Resultado

- Parada por tokens a las 16:58, en S0008 users: `back` commiteado (`2601da5`), sus unitarios en el índice, `front` y e2e sin empezar.
- 7 specs shipped (S0001–S0007, v0.5.0), deuda cero, 32 + 24 unitarios y 65 e2e.
- Tiempo activo: unos 1 h 38 min (14:29–16:58, sin el sueño del ordenador de 15:38 a 16:45).
- Seguimiento detallado: sección `## web-B` de `quality-gates.prompt.md`.

## Del export de Codex

- El orquestador arrancó solo 3 agentes y los reutilizó en las 8 specs (41 interacciones): cada turno del Builder pagaba el contexto de todas las specs anteriores. Es el mayor ahorro posible de tokens.
- 61 esperas sin ningún agente terminado: el tope de espera de Codex; la skill ya pide el más largo.
- El export quedó en la raíz de web-B (`codex-session-01a14efc-….md`). La próxima vez, fuera del repo: el core hace commit de todo lo no ignorado.

## Arreglos (locales, sin push)

| Dónde | Commit | Qué | Para qué |
| --- | --- | --- | --- |
| AIDDbot | `3e6b8974` | `build-ordered-specs`: agentes nuevos en cada spec y reparación; para los de la anterior | Consumir menos tokens |
| AIDDbot | `e7a8afc9` | `review-implementation`: la regla de proyecto revisa los manifiestos de dependencias y la configuración de lint del diff | Cazar `tree-kill` y la regla apagada, que se colaron |
| Builder | `9621b67` | `front` en todas las interfaces con `strictPort` (spec `configuration`) | Evitar el atasco de 138 s y la vuelta al Architect de S0002 |
| Builder | `9621b67` | `tree-kill` en la lista cerrada del `e2e` con `web`, para parar un proyecto con sus hijos | Sin ramas por plataforma |
| Builder | `9621b67` | `react/react-in-jsx-scope` apagada en el `vite.config.ts` raíz, nunca en un fichero propio | Nada más que `.json` en `lint/` |
| Builder | `9621b67` | Un test junto a cada módulo, también las primitivas semilla | El hook corre solo los tests afectados |
| Builder | `9621b67` | Nada en la raíz de `src` salvo `app.main` y `app.compose`; un adaptador de plataforma es `core` | Fuera `app.crypto.ts` en la raíz |

Sin tocar: el título de un refactor agrupado (cosmético; el encabezado ya dice «and N more»), el `crap` en rojo al shipear (hueco aceptado), los campos del generador en los `package.json` de proyecto.

## Lo que ya funciona

Middleware en `core/*.middleware.ts` sin excepciones en `lint/`; el about por `loader` y `useLoaderData`; ningún `vi.mock`, `useEffect`, `useMemo` ni rama `win32`; los unitarios llegan con la implementación, sin patches de cobertura; `AGENTS.md` de proyecto al día en cada spec; deuda agrupada y reparada en 1–2 min; `.gitignore` raíz intacto; ningún CRLF.

## Siguiente: web-C

- Preparada en `C:\code\aidd\experiments\halloween\web-C`: AIDDbot `9cec1461`, Blueprint `9621b67`. Commits `82e21b4` (overlay) y `c74de78` (Blueprint y manifiesto).
- Prompt: `web-C.md` (7 specs con users). Qué mirar: sección `## web-C` de `quality-gates.prompt.md`.
- Primera run que llegaría a users y presentation.
- Evitar que el ordenador se duerma; exportar la conversación fuera del repo.
