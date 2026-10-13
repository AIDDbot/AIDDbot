# Halloween — notas de las pruebas

## cli-1 · Archetype CLI desde sus specs (2026-10-13, descartada a mitad)

`experiments/halloween/cli-1`, AIDDbot v0.3.17 (con `update` local a mitad), Codex. Siguió `builder/procedure.md` desde un scaffold vacío. Se paró al quedarse Codex sin tokens, en el ship de S0010 (`about`), tras unas 2 h. Faltan `health` y `presentation`. Se rehace como cli-2.

### Lo que salió

| Spec | Tipo | Versión | Tiempo | Deuda que dejó | Reparaciones de craft |
| --- | --- | --- | --- | --- | --- |
| S0001 configuration | feat | 0.2.0 | ~10 min | D0001 (revisión), D0002–D0003 (scan) | S0002, S0003 (~13 min) |
| S0004 monitoring | feat | 0.3.0 | ~10 min | D0004–D0005 high (revisión) | S0005 (~7 min) |
| S0006 shell | feat | 0.4.0 | ~10 min | D0006 high (revisión), D0007–D0011 (scan) | S0007–S0009 (~28 min) |
| S0010 about | feat | — | ~20 min, sin ship | D0012 high (revisión) | — |

Tras cada `craft`, `debt list` quedó vacío: la apuesta de D19 (un `craft` por spec, máximo 5) se cumplió en 3 de 3.

### Lo que funcionó

- D18 en real: `type` en la config, `run test` con `cli` y luego `e2e`, `run test --spec` solo `e2e` filtrado.
- D19: `craft` por prioridad y en grupos coherentes; con la versión nueva, sin scan intermedio, y el Architect comprueba que cada deuda sigue en el código.
- El trío de la spec y la renumeración por tipo; la revisión encontró defectos reales (seguridad en S0004, interacción `about`/`monitoring` en S0010).
- Con un scaffold vacío, todo el código sale de las specs (sin la «fundación mágica» del primer intento).

### Lo que se corrigió durante la prueba (ya en el Builder o en AIDDbot)

- `start` ejecuta el proyecto en todos los tipos; en `cli`, una invocación (D18).
- Un `e2e` no tiene tests unitarios; su `test` es `playwright test --pass-with-no-tests` (D18).
- `system.md` en inglés fija el idioma del sistema de trabajo; el scaffold se integra antes de la primera spec; la fila `core` del `AGENTS.md` lleva su patrón (`app.*.ts`); `lint` prohíbe `!` (procedimiento y Blueprint).
- `craft` escanea solo al principio y al final (D19).
- Archetype CLI v0.3.13: `npm start --silent --`, porque npm 12 escribe `npm notice` en stderr.

### Pendiente (AIDDbot)

- `architect-system-foundation`: `system.template.md` dice `npm install --prefix` y `scaffold.md` exige `npm ci`; los commits de copia desde una biblioteca se llaman `generate` y `shape`, y deberían decir `copy`.
- El orquestador escribe el diario en el idioma del humano, no en el de `system.md`.
- La revisión entrega como deuda `high` defectos funcionales que la verificación no vio (D0004, D0005, D0012): faltan tests para casos límite, como opciones antes del comando. Valorar si un defecto contra un requisito de la spec debe volver al Builder en vez de ser deuda.
- Prioridad exagerada: D0006 (identidad fuera de `shared`) salió `high`, cuando es `medium`.
- Una regla de `lint` añadida a mitad de una spec bloquea el ship, que no puede reparar código; el Craftsman la devolvió al Builder (correcto, pero lento).
- Un megaprompt que lo hace todo agota los tokens de una sesión de Codex: el prompt debe ser reanudable.
- Los principios dicen «una condición tiene un operador lógico como mucho», pero ninguna herramienta lo comprueba; queda en la revisión, que no lo vio.
