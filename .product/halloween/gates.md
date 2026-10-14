# Halloween — puertas de calidad

Propuesta del humano (2026-10-14), antes de la prueba cli-3:

```text
Builder.implement-project
- Unit test de los cambios
- Lint de los cambios

Craftsman.verify-behaviour
- E2E test

Craftsman.review-implementation
- Debt (high or low)

Craftsman.ship-spec
- Unit test completo regresivo
- E2E test completo regresivo

Craftsman.scan-quality
- Quality (medium debt run only when no other debt remains)
```

## Lectura: hoy y con la propuesta

| Paso | Rol hoy → propuesto | Puerta hoy | Puerta propuesta |
| --- | --- | --- | --- |
| `implement-project` | Builder → Builder | `run test --project` y `run lint --project` del proyecto; `run test --spec` como comprobación, nunca evidencia | unit y lint de los cambios |
| `verify-behavior` | Craftsman → Craftsman | `run test` completo: unit de cada proyecto, luego toda la suite `e2e`; el verde exige las dos | solo E2E |
| `review-implementation` | Craftsman → Craftsman | hallazgos `blocking` o `debt`; `ship-spec` los apunta (`high` si `blocking`; el resto, sin prioridad fija) | deuda `high` o `low` |
| `ship-spec` | Craftsman → Craftsman | `format` y `lint`; ningún test | unit completo y E2E completo, como regresión |
| `scan-quality` | Craftsman → Craftsman | al principio y al final de cada `craft` (D19, D21); cualquier prioridad | solo deuda `medium`, y solo cuando no queda otra deuda |

El reparto que sale:

- **`high`**: lo que rompe. Un hallazgo `blocking` de la revisión, o un fallo sin reparar en la revisión 3.
- **`low`**: un hallazgo `debt` de la revisión.
- **`medium`**: un hallazgo del scan de calidad.
- Cada spec prueba primero lo suyo (sus cambios, sus requisitos) y solo al final, una vez, todo el sistema.

## Dudas

✅ **P19 · Los roles no cambian.**
El Builder implementa. El Craftsman verifica, revisa, publica y escanea, como hoy. Solo cambian las puertas.
> **R:** Fue un error del humano al escribir los prefijos; ya corregido arriba.

✅ **P20 · «Los cambios» son los ficheros de la rama.**
> **R (humano):** ¿no se puede usar algo de magia de git para saber qué ficheros han cambiado en una rama?

Sí. Propuesta (P20.1):
- **Qué ficheros:** el core los calcula con git: `git diff --name-only $(git merge-base HEAD {default})`, más lo no commiteado y lo nuevo (`git ls-files --others --exclude-standard`). Sin los borrados. Cada fichero va a su proyecto por la carpeta.
- **Cómo se los pasa a la herramienta:** dos scripts npm nuevos en cada proyecto que no es `e2e`, que reciben los ficheros como argumentos, y dos ranuras con el mismo nombre (D18):
  - `lint:files`, por ejemplo `oxlint -c .oxlintrc.json` (sin la carpeta `src`).
  - `test:files`, por ejemplo `node --test` (sin el glob).
  Cada biblioteca los declara en su tooling (D15): Archetype CLI y Archetype Base ya usan `oxlint` y `node --test`, y los dos aceptan ficheros.
- **Qué tests:** cada test cambiado, y el test vecino de cada fuente cambiada (`x.ts` → `x.test.ts`, en la misma carpeta). Es la convención de las dos bibliotecas.
- **El comando:** `aidd run lint --changed` y `aidd run test --changed`, con `--project` opcional. Sin ficheros cambiados en un proyecto: n/a, no falla.
- **La regla de commit:** hoy exige un lint del proyecto entero sobre el mismo árbol. Pasa a aceptar también un lint `--changed` que pasó sobre el contenido actual de cada fichero de código del commit.
- **`implement-project`:** usa solo `--changed`. Nunca el lint ni el unit del proyecto entero.
- **Lo que no ve:** un fichero borrado o un cambio de firma que rompe a otro fichero. Lo caza la regresión completa de `ship-spec` (P22), que también exige un lint completo.

> **R:** de acuerdo (2026-10-14) → D22.

✅ **P21 · La verificación ejecuta solo los tests E2E de la spec.**
> **R (humano):** lo mismo que lo anterior: es reducirle la superficie de ataque (menos tests, fallos localizados).

Aquí las etiquetas son mejores que git: un fichero de `e2e` puede tener tests de varias specs, y la etiqueta `@S0042-Rnn` dice qué prueba cada requisito. Ya existe: `aidd run test --spec`. Propuesta (P21.1):
- `verify-behavior` ejecuta solo `run test --spec`. Ese run pasa a ser la evidencia: el verde exige que pase, sin cambios de código después, y un test por requisito. Ya no exige el unit.
- Un `refactor` o un `chore` sin requisitos no tiene tests etiquetados: su verificación es verde sin run (n/a), y la regresión de `ship-spec` lo prueba. La verificación siempre se ejecuta.
- `--preexisting` sale de la verificación: un test de la spec no falla por deuda anterior. Pasa a `release` (P22).

> **R:** de acuerdo (2026-10-14) → D23.

✅ **P22 · Una regresión en `ship-spec` va a triaje.**
> **R (humano):** deberíamos ir a triaje y generar una propuesta `fix` para implementar. La causa puede ser el código de trabajo, el `e2e`, alguna spec… o el humano.

Propuesta (P22.1):
- `aidd release` exige un run completo (unit de cada proyecto, toda la suite `e2e` y lint completo) que pasa en el commit actual. El core lo comprueba.
- Si falla, `ship-spec` no publica. El Craftsman hace el triaje de cada fallo y le da un dueño:

| Causa | Dueño | Propuesta de arreglo |
| --- | --- | --- |
| El código de esta spec rompe un comportamiento publicado | **Builder** | repara el código de producción |
| El test de `e2e` está mal (frágil, o depende de otro test), no el comportamiento | **Builder** | repara el test, sin debilitar ninguna aserción |
| Un requisito de esta spec contradice el de otra spec | **Architect**, tras el humano | `Replaces: {ID global}` en la spec; el Builder retoca y reetiqueta el test |
| Solo una decisión de producto lo resuelve | **humano** | la pregunta; el Architect escribe la respuesta como requisito |

- El triaje va a `verification.md`, con cada fallo, su causa, su dueño y su propuesta, y se graba como verificación en rojo. Así cuenta como una revisión más y usa el bucle de reparación de `build-requested-spec`: el orquestador manda cada propuesta a su dueño, se verifica otra vez y se publica otra vez.
- La propuesta `fix` se implementa **dentro de esta spec**, no como una spec nueva: una spec nueva metería la regresión en la rama por defecto.
- Un fallo que explica deuda abierta anterior a la spec no bloquea: `release --preexisting <D IDs>`.
- En la revisión 3 en rojo, se publica con cada fallo como deuda `high`, como hoy.
> **R:** de acuerdo (2026-10-14) → D24.

✅ **P23 · La revisión da prioridad; `ship-spec` apunta la deuda.**
`ship-spec` apunta cada hallazgo de la revisión: `high` para `blocking`, `low` para `debt`. Por ahora la prioridad solo ordena las reparaciones.
> **R (humano):** sí; esto por ahora le da prioridad (quizá en el futuro la usemos para bloquear). → D24.

✅ **P24 · Menos scans: uno como mucho por ejecución, y solo sin deuda `medium` previa.**
> **R (humano):** quiero reducir el scan. Hay que ver el mejor algoritmo: lanzarlo al inicio o al final del turno, pero solo si no hay deuda media previa.

Propuesta (P24.1), que cambia D19 y D21:

```text
craft
  ¿hay deuda medium abierta? ── sí ──► sin scan
           │ no
           ▼
  scan-quality (apunta solo medium)
           ▼
  repite, como mucho 5 specs: selecciona el grupo (D21) → build-requested-spec
           ▼
  fin, sin scan
```

- **Al inicio, no al final.** Lo que encuentra el scan se repara en la misma ejecución. Al final, lo encontrado esperaría a la ejecución siguiente, y la deuda `medium` previa haría saltar ese scan.
- **Sin deuda `medium` previa.** Si queda, el scan solo la volvería a encontrar: se repara antes.
- La deuda que deja una reparación la apunta su propia revisión (`high` o `low`). La de calidad, el scan de la ejecución siguiente.
- `scan-quality` apunta solo deuda `medium`.
- **Biblioteca (D19):** termina con un `craft` cuyo scan no apunta nada y con el registro vacío.
> **R:** de acuerdo (2026-10-14) → D25.

## Lo que cambia al implantar (hecho 2026-10-14, salvo las bibliotecas)

- Skills: `implement-project`, `verify-behavior`, `review-implementation` (solo su referencia de prioridades), `ship-spec`, `scan-quality`, `build-requested-spec` (roles y bucle), `craft-lasting-quality` (scan).
- Core: `run --changed` y la regla de commit (P20), `eval verification` (evidencia de la spec), `release` (regresión completa, lint completo, `--preexisting`), sus tests.
- Bibliotecas: los scripts `lint:files` y `test:files` y sus filas en el `AGENTS.md` de cada proyecto, en Archetype CLI y Archetype Base; release de cada una y su pin.
- `outline-system` y `rule-project`, si clasifican las ranuras.
- Docs: `AIDD.workflow.md`, `how-it-works.md`, `core.md`.
- Builder (`archetype-builder`): su procedimiento, si cita el scan final o al Craftsman.
- Decisiones: D22 en adelante, en `decisions.md`.
