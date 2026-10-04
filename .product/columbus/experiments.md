# Columbus — experimentos

Guion y prompts para cada prueba de la fase 6. Cada prueba se ejecuta en `C:/code/aidd/experiments/columbus/{prueba}/` (por ejemplo `codex-2`, `claude-1`, `codex-go-1`): ahí se leen el diario, las specs, los `AGENTS.md`, `config.json` y la transcripción. Su resumen va a `notes.md`.

## 0 · Preparar

En una carpeta vacía, fuera de este repo, instalar **desde la copia local** (el `main` local va por delante de `origin`):

```bash
mkdir C:/code/aidd/experiments/columbus/{prueba} && cd C:/code/aidd/experiments/columbus/{prueba}
node C:/code/aidd/AIDDbot/bin/aiddbot.js init
```

Para traer cambios a una prueba ya instalada: `node C:/code/aidd/AIDDbot/bin/aiddbot.js update`.

Comprobar que existen `.agents/skills/architect-system-foundation/assets/foundation/` y `project.AGENTS.template.md`.

## 1 · Fundación

Elegir un prompt. En Claude Code se invoca `/architect-system-foundation`; en Codex, `$architect-system-foundation`.

### A · JS/TS sin negocio (base)

```text
/architect-system-foundation YOLO. Sistema de prueba sin funcionalidad de negocio: solo la fundación. Propósito: validar el scaffold. Usuarios: un operador genérico, así que incluye basic-auth. Proyectos: back-api con Hono, front-web con Vue, e2e con Playwright. Rechazo los arquetipos del catálogo: créalos al vuelo para esas tecnologías.
```

### B · Go sin front (agnosticismo)

```text
/architect-system-foundation YOLO. Sistema de prueba sin funcionalidad de negocio: solo la fundación. Propósito: validar que el Blueprint no depende de la tecnología. Usuarios: un operador genérico, así que incluye basic-auth. Proyectos: back-api en Go con net/http, e2e con Playwright. Sin front. Rechazo los arquetipos del catálogo: créalos al vuelo.
```

### C · Angular (frameworks con convenios propios, D27)

```text
/architect-system-foundation YOLO. Sistema de prueba sin funcionalidad de negocio: solo la fundación. Propósito: validar el scaffold con un framework con convenios propios. Usuarios: un operador genérico, así que incluye basic-auth. Proyectos: back-api con Hono, front-web con Angular, e2e con Playwright. Rechazo los arquetipos del catálogo: créalos al vuelo.
```

### F · Sin framework, con la tecnología de los arquetipos propios

```text
usa la skill $architect-system-foundation en modo YOLO. Para:
Sistema de prueba sin funcionalidad de negocio: solo la fundación.
Propósito: validar el scaffold.
Usuarios: un operador genérico, así que incluye basic-auth.
Proyectos: back-api con Node y Express; front-web con HTML, CSS y TypeScript modernos sin framework, servido con Vite; e2e con Playwright.
En el front, usa solo la plataforma web Baseline: custom elements y <template> para componentes, Navigation API y URLPattern para el router, validación nativa de formularios, fetch con AbortController, CSS con custom properties y nesting, y módulos ES con import dinámico por página.
Rechazo los arquetipos del catálogo: créalos al vuelo para esas tecnologías.
```

Sin framework que guíe, el router y los componentes los construye el agente desde el Blueprint. Comparar el resultado con `back-express` y `front-standard` sin que los copie: material para la fase 5. Vigilar: router y componentes sobredimensionados; `start` sin build (`vite`); dónde coloca cada pieza (componentes en `presentation`, router como manifiesto, `fetch` en `data`). La Navigation API basta para Chromium; para un arquetipo real, añadir History API si hace falta compatibilidad.

### D · Interactivo (D25)

```text
/architect-system-foundation Sistema de prueba sin funcionalidad de negocio: solo la fundación.
```

Sin YOLO: debe preguntar por propósito, usuarios, proyectos y cada elección técnica abierta, una pregunta cerrada cada vez, ofreciendo primero el arquetipo o la opción habitual. Anotar cuántas preguntas hace y si alguna sobra.

### E · Catálogo (arquetipos propios, tras la fase 5)

```text
/architect-system-foundation YOLO. Sistema de prueba sin funcionalidad de negocio: solo la fundación. Usuarios: un operador genérico, así que incluye basic-auth. Proyectos: back-api, front-web y e2e con los arquetipos del catálogo.
```

## 2 · Comprobar a mano

```bash
cat back/AGENTS.md                                # siete secciones, sin huecos {…}
node .agents/aidd/aidd.mjs config get projects    # todas las ranuras o {"na": …}
node .agents/aidd/aidd.mjs run lint
node .agents/aidd/aidd.mjs run acceptance
git log --oneline --graph
```

- **Canario (D39, regla fija 2):** en `back`, hacer que un fichero de `core` importe la fachada de `health` o el manifiesto; `run lint` **debe fallar**. Deshacer. (Que una funcionalidad importe el fichero público de `core` está permitido si el arquetipo eligió import directo; no sirve como canario.)
- `system.md` coincide con lo instalado (tecnologías y cambios de YOLO).
- Tres commits por proyecto en el scaffold (`generate`, `shape to blueprint`, `register tooling`).
- Specs `configuration`, `monitoring`, `health` y `basic-auth` en `shipped`.

## 3 · Negocio (solo si la fundación sale limpia)

```text
/build-requested-spec YOLO los operadores pueden dar de alta un cohete con nombre y capacidad, y listarlos
```

El diff no toca tooling, `config.json` ni el arranque; solo registra la funcionalidad en el manifiesto.

## 4 · Calidad (opcional)

```text
/craft-lasting-quality
```

```text
/craft-lasting-quality actualiza las dependencias
```

## 5 · Entregar

Nada que copiar si la prueba se ejecutó en `C:/code/aidd/experiments/columbus/{prueba}/`. Si no, copiar ahí:

- `.aiddbot/` (diario, `config.json`, `runs/`), `.product/`, `AGENTS.md` raíz y el `AGENTS.md` de cada proyecto.
- La transcripción de la sesión del arnés.
- Una línea con lo que hubo que hacer a mano, si algo.

| Prueba | Arnés | Prompt | Versión | Resultado |
| --- | --- | --- | --- | --- |
| `codex-1` | Codex | A (con Vite+) | `8bf7915` | S0001–S0002 shipped; S0003 a medias por tokens |
| `codex-2` | Codex (Sol 6.1 light) | A | D25–D31 | Cuatro specs shipped en 54 min, verde, sin intervención; 3 deudas |
| `codex-3` | Codex | A sin herramientas | D25–D33 | Cuatro specs en 36 min, sin intervención; stack D32; reparó D0002 por su cuenta (S0005, v0.5.1); cierre verde a los 41 min |
| `claude-4` | Claude Code (Opus 5.5) | F | `0e52fad` | Cuatro specs en 47 min, sin intervención ni reparaciones; 34 tests verdes; canario OK; 6 deudas (3 `high`) |
| `codex-5` | Codex (subagentes `gpt-6-sol`/`gpt-6-luna`) | F | `af31326` | Cuatro specs en 2 h 27 min, sin intervención; verificaciones a la primera; 34 tests verdes; canario OK; S0004 calificada en rojo por evasión del guard (D0001 `high`, D40); cierre `blocked` |
| `claude-6` | Claude Code (Opus 5.5) | F | `aca391f` | Fundación en 52 min, verde; S0004 calificada en rojo con Security en verde (D40 bien aplicada); dos pasadas de calidad a propósito (S0005, S0006) hasta v0.5.2 sin deuda salvo D0007 `low`; 35 tests verdes y 2 saltados por puertos (fallo humano); canario OK |
| `codex-6` | Codex (`gpt-6.1-sol`) | F | `aca391f` | Fundación en ~69 min sin la parada por tokens (81 min); sin calificaciones rojas, 3 deudas `low`; una pasada de calidad (S0005) hasta v0.5.1 sin deuda; 102 tests verdes (34 × 3 navegadores); canario OK; código más pequeño (~1880 líneas) |
| `claude-7` | Claude Code (Opus 5.5) | F | D40–D42 originales | Fundación en 60 min, verde; tapó el bloqueo de SQLite con un busy timeout en producción; calidad S0005 a medias; ~2020 líneas |
| `codex-7` | Codex (`gpt-6.1-sol`) | F | `953a9da` | Fundación en 45 min, cierre `blocked` por `database is locked` intermitente en la comprobación final; reparada en S0005 aislando la BD de cada instancia de test; calidad S0006 hasta v0.5.2; 37 tests; ~1370 líneas |
| `codex-8` | Codex (`gpt-6.1-sol`) | F | `651f442` + `68d188b` | Cinco specs (con `layout`) en 57 min, verde, sin intervención humana; Blueprint v2 (D39) y tema (D37) a la primera; una verificación roja (`database is locked`, tapada con un busy timeout) y una calificación roja de Security reparada a la primera; 4 deudas `medium`; canario D39 OK; ~1370 líneas |
| `claude-9` | Claude Code (Opus 5.5) | F | `d625c4e` (D43–D46) | Cinco specs en 58 min de trabajo (49 de fundación hasta S0004 y 9 de `basic-auth`), sin contar la parada por tokens (14:03–15:59); todas las verificaciones verdes a la primera; sin `database is locked`; S0005 calificada en rojo por el guard por prefijo (criterio de D45, Security en verde) y publicada con D0012 `high`; craft S0006 (con 12 min de espera de aprobación) cerró D0012 y D0013 pero abrió D0017 `high` (router de Express parcheado); 51 tests de aceptación; ~2330 líneas |
| `codex-9` | Codex (`gpt-6.1-sol`) | F | `a14862b` (F1–F4, D47) | Cinco specs en ~64 min, verde, sin intervención; todas las verificaciones verdes a la primera; `basic-auth` calificada en verde a la primera con D47 (guard en el base path, digest de tokens, caducidad); rojos de calificación en S0001 y S0002 por reglas generales y por el aislamiento de la BD de `e2e`; 3 deudas `high`; `shared` plano con primitivas en la raíz y sin `utils/`; `master` solo con merges; 44 tests de aceptación; ~1560 líneas |
