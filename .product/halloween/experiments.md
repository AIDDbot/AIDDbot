# Halloween — experimentos

Guion y prompts de la fase 3.2. La prueba se ejecuta en `C:/code/aidd/experiments/halloween/cli-1/`: ahí se leen el diario, las specs, los `AGENTS.md`, `config.json` y la transcripción. Su resumen (3.3) va a `notes.md`.

## cli-1 · Archetype CLI 0.4 desde sus specs

Un sistema de trabajo (D20) que sigue `procedure.md` del Builder desde el paso 1: scaffold vacío con el generador oficial, y todo el código sale de las 6 specs genéricas, entregadas una a una con un `craft` después de cada una (D19). No parte de ninguna biblioteca: una biblioteca nace de sus specs; un sistema de usuario recibe la fundación hecha.

Es también la primera prueba real de AIDDbot v0.3.17: el trío de la spec, los tipos `api`/`web`/`cli`/`e2e` (D17), la ranura `test` con `type` en la config (D18) y el `craft` por prioridad (D19).

> Primer intento (descartado): partió de Archetype CLI v0.3.13 con `$architect-system-foundation`. La fundación trajo hecho `configuration`, `monitoring` y `health`, y las specs nuevas quedaron como deltas sobre código que ninguna spec entregó.

### 0 · Preparar (PowerShell)

```powershell
Remove-Item -Recurse -Force C:\code\aidd\experiments\halloween\cli-1
New-Item -ItemType Directory C:\code\aidd\experiments\halloween\cli-1 | Out-Null
Set-Location C:\code\aidd\experiments\halloween\cli-1
node C:\code\aidd\AIDDbot\bin\aiddbot.js init
New-Item -ItemType Directory builder | Out-Null
Copy-Item C:\code\aidd\archetype-builder\procedure.md builder\
Copy-Item -Recurse C:\code\aidd\archetype-builder\blueprint builder\
git add -A; git commit -m "chore: Archetype Builder procedure and blueprint"
```

`builder/` lleva el procedimiento y el Blueprint dentro del sistema: el agente no lee fuera de su carpeta, y la prueba queda fija aunque el Builder cambie.

### 1 · Pasos 1–3 del procedimiento

```text
Sigue `builder/procedure.md`, pasos 1, 2 y 3, en modo YOLO. AIDDbot ya está instalado.
La biblioteca: Archetype CLI, una aplicación de línea de comandos local, sin usuarios.
Proyectos: `cli` (tipo cli) y `e2e` (tipo e2e), en TypeScript sobre Node, con las herramientas de `builder/blueprint/ecosystems.md`.
Identidad: displayName "Archetype CLI", description "A local command-line application and its acceptance suite", author "AIDDbot", homepage "https://aiddbot.com".
No ejecutes $architect-system-foundation. Al terminar el paso 3, para.
```

Vigilar:

- `system.md` con los dos proyectos y sus tipos; la identidad en el `package.json` raíz.
- Por proyecto, tres commits: `generate` (salida del generador, sin tocar), `shape to blueprint` y `register tooling`. Ningún código funcional: ni configuración, ni comandos, ni tests de aceptación.
- `config.json`: `type` en cada proyecto; ranuras `lint`, `format`, `upgrade`, `test`, `start`, `quality`. En `e2e`, `test` = tests de su `core` y después Playwright.
- La prueba de fronteras: un import prohibido hace fallar `lint`, y se quita.
- El `test` de `e2e` sin tests de aceptación todavía: Playwright falla con «No tests found» salvo `--pass-with-no-tests`. Ver cómo lo resuelve.
- `$outline-system` escribe el `AGENTS.md` raíz y `.product/model/`.

### 2 · Cada spec, con su craft

Para cada spec, en este orden: `configuration`, `monitoring`, `shell`, `about`, `health`, `presentation`. `users` no: un `cli` local no tiene usuarios.

**a · Entregar:**

```text
usa la skill $build-requested-spec en modo YOLO. Para:
Entrega la spec del fichero `builder/blueprint/foundation/{spec}.spec.md`.
```

**b · Reparar la deuda:**

```text
usa la skill $craft-lasting-quality en modo YOLO.
```

**c · Comprobar a mano:** `node .agents/aidd/aidd.mjs debt list` sin items abiertos. Si queda deuda, parar y avisar: no se empieza la spec siguiente (D19).

Vigilar en cada spec:

- `spec.md` con el trío y solo las filas de `cli` y `e2e`, requisitos renumerados sin huecos. Ya no hay requisitos repetidos de una fundación anterior.
- El código sale de la spec: `core`, `shared` y features nuevos, sin nada heredado.
- `configuration`: `CONFIG_FILE` relativo a la carpeta del proyecto, sin excepción; `config get` con el origen de cada valor; migraciones.
- `monitoring`: códigos 1, 2 y 3; el log diario de cada invocación.
- `shell`: el contrato de salida (`--json`); ningún comando escribe en stdout por su cuenta.
- `presentation`: `health runs` con `--limit` y `--offset`; tablas y `{label}: {value}` desde `core`, nunca desde una feature.
- `craft`: repara por prioridad y para en 5 specs. Anotar cuántas pasadas necesita cada spec.
- Tiempo de cada spec y de cada `craft`.

### 3 · Al final

```powershell
node .agents/aidd/aidd.mjs run lint
node .agents/aidd/aidd.mjs run test
node .agents/aidd/aidd.mjs debt list
Set-Location cli; npm start --silent -- --help; npm start --silent -- --version; npm start --silent -- config get; npm start --silent -- health runs --json
```

**Hecho cuando** (plan, fase 3): el `cli` responde a `--help`, `--version`, `--json` y `config get|set`, muestra listas y registros con las primitivas de `presentation`, pasa la suite de aceptación, y la deuda es cero. Después, el resumen (3.3) y el seed de Archetype CLI 0.4 desde este sistema (procedimiento, paso 5).

## cli-2 · Archetype CLI desde cero, con lo aprendido en cli-1

Igual que cli-1, pero con el Builder y AIDDbot corregidos (ver `notes.md`). Un solo prompt, **reanudable**: cli-1 agotó los tokens de una sesión de Codex en la cuarta spec. Si una sesión se acaba, se abre otra en la misma carpeta y se envía el mismo prompt.

### 0 · Preparar (PowerShell)

```powershell
New-Item -ItemType Directory C:\code\aidd\experiments\halloween\cli-2 | Out-Null
Set-Location C:\code\aidd\experiments\halloween\cli-2
node C:\code\aidd\AIDDbot\bin\aiddbot.js init
New-Item -ItemType Directory builder | Out-Null
Copy-Item C:\code\aidd\archetype-builder\procedure.md builder\
Copy-Item -Recurse C:\code\aidd\archetype-builder\blueprint builder\
git add -A; git commit -m "chore: Archetype Builder procedure and blueprint"
```

### 1 · Megaprompt (el mismo para empezar y para retomar)

```text
Modo YOLO, sin preguntas. Todo en inglés ASD-STE100.
Construye la biblioteca Archetype CLI siguiendo `builder/procedure.md`, pasos 1 a 4. No hagas el paso 5 (el seed). AIDDbot ya está instalado.

La biblioteca: una aplicación de línea de comandos local, sin usuarios.
Proyectos: `cli` (tipo cli) y `e2e` (tipo e2e), en TypeScript sobre Node, con las herramientas de `builder/blueprint/ecosystems.md`.
Identidad: displayName "Archetype CLI", description "A local command-line application and its acceptance suite", author "AIDDbot", homepage "https://aiddbot.com".
Las specs del paso 4, en este orden: configuration, monitoring, shell, about, health, presentation. No entregues users: un cli local no tiene usuarios.

Para el paso 4 usa las skills: $build-requested-spec con la petición «Entrega la spec del fichero `builder/blueprint/foundation/{spec}.spec.md`», después $craft-lasting-quality, y después `node .agents/aidd/aidd.mjs debt list`.

Este trabajo puede necesitar varias sesiones. El estado está en los ficheros: antes de empezar, lee `git log`, `.product/specs/*/control.json`, `node .agents/aidd/aidd.mjs debt list` y la rama actual, y sigue en el primer paso que no está terminado. Una spec sin entregar se termina con su skill pendiente (por ejemplo $ship-spec), nunca se empieza de nuevo.

Reglas:
- No ejecutes $architect-system-foundation. No cambies los ficheros de `builder/`.
- Si después de un $craft-lasting-quality queda deuda, para y explica por qué.
- Si una skill se bloquea o necesita una decisión de producto, para y explícalo.

Al final, ejecuta `node .agents/aidd/aidd.mjs run lint`, `run test` y `debt list`, y resume en una tabla cada spec, su versión, la deuda que dejó, las reparaciones de craft y sus tiempos.
```

### Vigilar (además de lo de cli-1)

- `system.md` y los `AGENTS.md` en inglés; `start` del `cli` registrado; `e2e` sin tests unitarios; ficheros de `core` como `app.*.ts`; `lint` con `typescript/no-non-null-assertion`; el scaffold integrado en `master` antes de S0001.
- El `craft` sin scan intermedio.
- Si los defectos funcionales vuelven a salir como deuda de la revisión (D0004, D0005 y D0012 en cli-1).
- Cuántas sesiones de Codex hacen falta, y si la reanudación sigue en el sitio correcto.

## cli-3 · Archetype CLI desde cero, con una puerta por paso (D22–D25)

```powershell
New-Item -ItemType Directory C:\code\aidd\experiments\halloween\cli-3 | Out-Null
Set-Location C:\code\aidd\experiments\halloween\cli-3
node C:\code\aidd\AIDDbot\bin\aiddbot.js init
New-Item -ItemType Directory builder | Out-Null
Copy-Item C:\code\aidd\archetype-builder\procedure.md builder\
Copy-Item -Recurse C:\code\aidd\archetype-builder\blueprint builder\
git add -A; git commit -m "chore: Archetype Builder procedure and blueprint"
```

Igual que cli-2 (mismo paso 0 en `experiments/halloween/cli-3`, mismo megaprompt), con AIDDbot y el Builder en `main` local tras D22–D25.

### Vigilar

- El Builder usa `run lint --changed` y `run test --changed`, nunca el lint ni el test completos; el `AGENTS.md` de `cli` y de `e2e` declara `lint:files` (y `test:files` en `cli`), y `config.json` los registra.
- `verify-behavior` ejecuta solo `run test --spec`; un `refactor` sin requisitos se verifica en verde sin run.
- `ship-spec` ejecuta `format`, `lint` y `test` completos antes de `release`. Si la regresión falla: triaje en `verification.md`, verificación en rojo y vuelta al Builder dentro de la misma spec.
- La deuda de la revisión sale `high` o `low`; la del scan, solo `medium`.
- `craft` escanea al inicio solo sin deuda `medium` abierta, y nunca al final. Tras la última spec, otro `craft` hasta un scan vacío.
- Tiempos por spec frente a cli-2: menos tests en cada paso, una sola regresión completa.

## cli-4 · Archetype CLI desde cero, una sesión por paso (D26)

Igual que cli-3, pero cada paso (el scaffold, cada spec con su `craft`, el cierre, el resumen) corre en una **sesión nueva de Codex, con el contexto vacío**. En cli-3, la sesión que orquesta acumuló todo el contexto: los desvíos se juntaron hacia el final y se agotaron los tokens en la sexta spec (`notes.md`). AIDDbot y el Builder en `main` local tras D26 (`harden`), sin publicar.

### 0 · Preparar (PowerShell)

```powershell
New-Item -ItemType Directory C:\code\aidd\experiments\halloween\cli-4 | Out-Null
Set-Location C:\code\aidd\experiments\halloween\cli-4
node C:\code\aidd\AIDDbot\bin\aiddbot.js init
New-Item -ItemType Directory builder | Out-Null
Copy-Item C:\code\aidd\archetype-builder\procedure.md builder\
Copy-Item -Recurse C:\code\aidd\archetype-builder\blueprint builder\
git add -A; git commit -m "chore: Archetype Builder procedure and blueprint"
```

### 1 · El prompt

En [`cli-4.prompt.md`](./cli-4.prompt.md). El mismo para cada sesión: lee el estado de los ficheros, hace solo el primer paso sin terminar y para. Su última línea es `AIDD-NEXT`, `AIDD-DONE` o `AIDD-STOP: <motivo>`.

### 2 · Lanzar (PowerShell)

Un paso, en una sesión nueva:

```powershell
$dir = 'C:\code\aidd\experiments\halloween\cli-4'
$prompt = Get-Content 'C:\code\aidd\AIDDbot\.product\halloween\cli-4.prompt.md' -Raw
$prompt | codex exec --dangerously-bypass-approvals-and-sandbox -C $dir -
```

Todos los pasos, una sesión nueva para cada uno, hasta `AIDD-DONE` o `AIDD-STOP` (como mucho 12 sesiones):

```powershell
$dir = 'C:\code\aidd\experiments\halloween\cli-4'
$prompt = Get-Content 'C:\code\aidd\AIDDbot\.product\halloween\cli-4.prompt.md' -Raw
$logs = Join-Path $env:TEMP 'cli-4'; New-Item -ItemType Directory -Force $logs | Out-Null
for ($i = 1; $i -le 12; $i++) {
  $last = Join-Path $logs "session-$i.last.txt"
  $start = Get-Date
  $prompt | codex exec --dangerously-bypass-approvals-and-sandbox -C $dir -o $last - 2>&1 | Tee-Object -FilePath (Join-Path $logs "session-$i.log")
  $minutes = [math]::Round(((Get-Date) - $start).TotalMinutes)
  $end = if (Test-Path $last) { (Get-Content $last | Where-Object { $_.Trim() } | Select-Object -Last 1).Trim() } else { 'no last message' }
  Write-Host "[$i] $minutes min · $end"
  if ($LASTEXITCODE -ne 0 -or $end -ne 'AIDD-NEXT') { break }
}
```

- Cada sesión deja su salida en `%TEMP%\cli-4\session-{n}.log` y su último mensaje en `session-{n}.last.txt`.
- Tras un `AIDD-STOP` por una decisión de producto, responde en la misma sesión y vuelve a lanzar el bucle:
  `codex exec resume --last --dangerously-bypass-approvals-and-sandbox "<tu respuesta>"`.
- Una sesión que se queda sin tokens a mitad de paso no deja `AIDD-NEXT`: el bucle para. Lanza el bucle otra vez; la sesión nueva sigue el paso sin empezarlo de nuevo.

### Vigilar (además de lo de cli-3)

- **D26.** Los `package.json` de `cli` y `e2e` tienen `--quiet` en `lint` y `lint:files`, y el script `harden`; `config.json` registra `harden`; `.oxlint.quality.json` no extiende la configuración de `lint`. `no-empty-pattern` desactivado para los fixtures de `e2e` en su configuración de `lint`.
- **`harden` en `craft`.** Solo cuando no queda deuda `high` ni `medium`, una vez por ejecución. Deuda `low` con origen `scan`, un item por regla con todos sus sitios.
- **Una sesión por paso.** Tiempo y desvíos de cada sesión; si la reanudación sigue en el sitio correcto; si los desvíos de cli-3 (el `lint` y el `test` completos en el Builder, la spec editada por el Builder) vuelven con el contexto vacío.
- **Las listas cerradas en los tests** y el **punto ciego de `--changed`** siguen sin arreglar: contar cuántas regresiones y ciclos de triaje cuestan.

## cli-5 · Archetype CLI desde cero, con el megaprompt y el Blueprint sin huecos

cli-4 se abandonó en la spec `configuration`: `define-spec` paró dos veces por ajustes sin valor por defecto (`notes.md`). Antes de cli-5, el Builder cierra los huecos que podían parar al Architect en las 6 specs (`archetype-builder` `71509c5`, `f424344`, `08276b4`): `node:sqlite` y `DATABASE_URL` = `./data/app.sqlite`, un valor por defecto y una regla de validación para cada ajuste, `source` del log = el nombre del proyecto, sin uptime en un `cli` local, y listas abiertas en los tests de aceptación. AIDDbot y el Builder en `main` local tras D26, sin publicar.

### 0 · Preparar (hecho)

Igual que cli-3, en `experiments/halloween/cli-5`.

### 1 · Lanzar (PowerShell)

El megaprompt está en [`cli-5.prompt.md`](./cli-5.prompt.md). Es el mismo para empezar y para retomar:

```powershell
Get-Content 'C:\code\aidd\AIDDbot\.product\halloween\cli-5.prompt.md' -Raw | codex exec --dangerously-bypass-approvals-and-sandbox -C C:\code\aidd\experiments\halloween\cli-5 -
```

Si la sesión se queda sin tokens, se lanza otra vez el mismo comando.

### Vigilar (además de lo de cli-3 y cli-4)

- `define-spec` no para en ninguna spec por un valor por defecto o una regla de validación.
- El `AGENTS.md` de `cli` nombra `node:sqlite` desde el scaffold.
- Las regresiones de las listas cerradas (3 en cli-3) no vuelven.
- Tiempo de cada spec y de cada `craft`, y cuántas sesiones hacen falta.

## cli-6 · Archetype CLI desde su manifiesto, con `$build-ordered-specs`

Todo sale de specs. El scaffold es la spec 0 (`chore`), el manifiesto es `.product/system.md`, y un orquestador de AIDDbot entrega la lista: cada spec con su `craft`, deuda cero antes de la siguiente, y el `craft` de cierre. Una sola sesión: si no sale de una, se sigue recortando. AIDDbot (`9e3bf31`) y el Builder (`730150f`) en `main` local, sin publicar.

### 0 · Preparar (PowerShell)

```powershell
New-Item -ItemType Directory C:\code\aidd\experiments\halloween\cli-6 | Out-Null
Set-Location C:\code\aidd\experiments\halloween\cli-6
node C:\code\aidd\AIDDbot\bin\aiddbot.js init
New-Item -ItemType Directory builder | Out-Null
Copy-Item C:\code\aidd\archetype-builder\procedure.md builder\
Copy-Item -Recurse C:\code\aidd\archetype-builder\blueprint builder\
Copy-Item C:\code\aidd\archetype-builder\libraries\archetype-cli.system.md .product\system.md
git add -A; git commit -m "chore: Archetype Builder and the Archetype CLI manifest"
```

### 1 · Lanzar (PowerShell)

```powershell
Get-Content 'C:\code\aidd\AIDDbot\.product\halloween\cli-6.prompt.md' -Raw | codex exec --dangerously-bypass-approvals-and-sandbox -C C:\code\aidd\experiments\halloween\cli-6 -
```

### Vigilar

- **S0001 `chore` scaffold.** `define-spec` sin `model/` ni proyectos, y sin parar. La identidad en el `package.json` raíz. Tres commits por proyecto. Verificación en verde sin run. `ship-spec` ejecuta `outline-system`: el `AGENTS.md` raíz con los dos proyectos y los schemas de `cli`. Versión 0.1.1 (un `chore` sube el patch).
- **`$build-ordered-specs`.** Las specs en el orden de `project-types.md`, sin `users`. Un `craft` tras cada spec, deuda cero antes de la siguiente, el `craft` de cierre hasta un scan y un hardening vacíos. La tabla final.
- **YOLO sin paradas.** Anotar cada decisión que el agente tomó por su cuenta: es un hueco del Blueprint.
- **`harden`.** Sin `no-floating-promises` ni `no-empty-pattern` (`f615746`).
- **Una sesión.** Si se agotan los tokens, dónde, y cuánto contexto gasta el orquestador.
