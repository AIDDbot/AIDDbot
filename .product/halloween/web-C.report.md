# web-C: informe (2026-10-18)

## Resultado

- Parada por tokens hacia las 22:52, en S0011 users: `back` (`572788e`) y `front` (`c8f2828`) commiteados; el e2e de users y 5 ficheros de `back`/`front` sin commit; ninguna evaluación.
- 5 specs de foundation shipped (scaffold, configuration, monitoring, shell, about), 5 refactors y 6 patches; v0.5.2, deuda cero. Regresión al shipear about: 121 unitarios y 56 e2e.
- Tiempo: 21:30–22:52, unos 82 min sin pausas. Unos 10 min por feature y 1–2 min por reparación. web-B tardó 98 min en llegar a users; web-C, 72.
- Seguimiento: sección `## web-C` de `quality-gates.prompt.md`.

## Del export de Codex

- Agentes nuevos en cada paso (`3e6b8974`): 41 iniciados y 41 parados, uno por paso (`{spec}_architect`, `_builder`, `_craftsman`, `_scan`, `_low`, `d{nnnn}_builder`, `_ship`). Solo 15 interacciones, todas dentro de su paso. Funciona.
- 81 esperas sin ningún agente terminado (tope de espera de Codex).
- El export quedó otra vez en la raíz de web-C (`codex-session-01a1507d-….md`). Fuera del repo la próxima vez.

## Hallazgos

| # | Qué | Evidencia | Causa | Acción |
| --- | --- | --- | --- | --- |
| 1 | Cobertura al 100 % por fichero en `back` y `front` | scaffold `ad110fa`, `a575947`; AGENTS.md raíz | El agente la inventó; el Blueprint dice 80 | Usuario: basta con 80. Archetype Web con 80 |
| 2 | Cuatro deudas salen de una rama de `shared/identity.ts` (el autor que falta) | D0009, D0010 (cobertura), D0011, D0012 (`vi.mock` para cubrirla), S0009, S0010 | El 100 % obliga a probar la rama; leer `package.json` desde el módulo empuja a `vi.mock` | 80 %, y la identidad llega como argumento (primitiva semilla) |
| 3 | `vi.mock` volvió dos veces; lo cazó el override de tests de `layers.json` | D0011, D0012 | Ver 2 | El override ya salió del Builder (decisión del usuario); sin él lo caza la revisión. Vigilar en la próxima run |
| 4 | El mismo override costó un refactor | D0001, S0003: +91 líneas en `front/lint/layers.json` para el cliente HTTP compartido | Enumeración de módulos | Ya resuelto al quitarlo |
| 5 | Middleware Express en `core/app.routes.ts` | D0008 (max-params) | No siguió `core/{concern}.middleware.ts` | La reparación lo renombró a `api.middleware.ts`; la regla funciona |
| 6 | La composición del `front` se saltaba el manifiesto | D0007, S0007 | Home registrada a mano | `layers` lo cazó y el refactor lo corrigió |
| 7 | users es el doble que las demás | S0011: 33 requisitos, 189 líneas (las otras, 89–104) | La spec del Blueprint | Pensar si users se parte (cuentas y sesiones / navegación y guardas) |
| 8 | Scripts que el Blueprint no pide | `check:complexity`, `test:coverage`, `upgrade` en cada proyecto | `architect-system-foundation/references/scaffold.md:23` | Decisiones 5 y 6 de lint; arreglar scaffold.md |

## Lista de web-C

- ✅ Un agente nuevo por spec y reparación.
- ✅ `tree-kill` solo en el e2e (el about lo nombra como tecnología, en `back` y en el e2e).
- ✅ `front` en todas las interfaces con `strictPort` (desde configuration).
- ✅ `react/react-in-jsx-scope` en el `vite.config.ts` raíz; nada más que `.json` en `lint/`.
- ✅ Un test por primitiva (falta el de `shared/email.ts`, de users, sin commit).
- ✅ Nada en la raíz de `src` salvo `app.main` y `app.compose`.
- ❌ users y presentation: users a medias, presentation sin empezar.

## Ya aplicado durante la run (locales salvo archetype-cli)

- Builder (sin commit): fuera el override de tests de `lint/dependencies.json`; `ecosystems.md` lo deja en una regla.
- Decisiones de lint 1–6 en `quality-gates.prompt.md`; archetype-cli v0.4.4 (`.lint/`) y v0.4.5 (AGENTS.md corto) publicados y fijados; Blueprint corto en `outline-system` (`763b2916`).

## Siguiente

- Builder: `.lint/` con los nombres nuevos, cobertura 80, identidad como argumento, decidir si users se parte.
- AIDDbot: `scaffold.md` (scripts y nombres de `.lint/`).
- Retomar web-C en users con el mismo prompt, o preparar web-D con el Builder corregido.
