# Deterministic core — notes

Dudas abiertas durante la ejecución de las fases. Formato: 🟡 `P{n}` con el paso que la originó.

## 🟡 P1 — 0.1 · Alcance literal de `grep -ri hook`

El "hecho cuando" de 0.1 pide que `grep -ri hook` solo encuentre `.product/` y `CHANGELOG.md`. Dos coincidencias no encajan en esa lista y no parecen cubiertas por D4:

- `scripts/verify-release.js` menciona `hooks/pre-receive`, un hook de servidor Git nativo usado para simular un push rechazado en la prueba de `release.js`. No tiene relación con el bundle de auditoría que retira D4.
- `.agents/skills/temp/audit/**` y `.product/temp/audit/**` contienen eventos JSONL residuales de hooks que sí llegaron a ejecutarse en sesiones anteriores de este mismo repo. Son rastro de datos, no código; están bajo `temp/`, que `.gitignore` excluye por completo, así que no aparecen en un clon limpio.

Interpreté el criterio como referido a rastros de código y configuración del experimento de D4, no a cualquier cadena que contenga "hook". No toqué `verify-release.js` ni until confirmar si la decisión quiere que se evite también esa palabra en fixtures no relacionados. No bloquea nada del resto de la fase.

## 🟡 P2 — 0.3 · Línea base de "líneas escritas por el modelo en una entrega real"

Las otras dos métricas de 0.3 se miden directamente sobre el repo (palabras en `SKILL.md`, instrucciones de journal). La tercera — líneas de journal escritas a mano por el modelo en una entrega real — no tiene un artefacto guardado en este repo para recontar: la prueba real citada en `frontier-fall/plan.md` (7.1) corrió en un repo temporal efímero y su journal no se conservó. Ejecutar una entrega completa nueva (`architect-system-foundation` + `build-requested-spec`) solo para medir esto es un coste grande para una fase marcada "Mecánica" en la tabla de `plan.md`.

Registré en su lugar la estimación que ya trae la propuesta (`d.deterministic-core.proposal.md:86`, "roughly 25 model-issued lines per delivery"), dejando explícito que es una cifra heredada y no una medición fresca de esta sesión. Si se quiere un número medido de verdad, hace falta decidir cuándo se paga esa entrega real completa.

## 🟡 P3 — 1.3 · `free-port.*` frente a "solo queda el materializador"

El "hecho cuando" de 1.3 pide que en `.agents/skills/*/scripts/` solo quede el materializador, pero `verify-behavior/scripts/free-port.ps1` y `free-port.sh` siguen ahí. No son un script que 1.3 mande migrar: la fase 3 (3.2) es la que dice que `aidd run acceptance` los absorbe, y 3.3 que desaparecen. Los dejé en su sitio para no adelantar la fase 3 ni dejar `verify-behavior` sin su mecánica de puertos. Todo lo demás de `scripts/` salvo el materializador sí se borró.

## 🟡 P4 — 1.3 · `{Product_Folder}` en la prosa de los skills

D6 hace de `.product/` una constante del núcleo: `aidd spec new` y `aidd spec check` ya no aceptan `--product`. Pero los skills, `AGENTS.template.md` de `outline-system` y `debt.contract.md` siguen usando el marcador `{Product_Folder}` (y `outline-system` aún dice que lo acuerda con el humano). Ninguna decisión dice en qué fase se retira ese marcador; lo dejé tal cual porque cambiarlo toca la plantilla de `AGENTS.md` de los consumidores, fuera del alcance de "migrar sin cambiar el comportamiento". Propuesta: retirarlo en 8.2 con el documento de rutas.

## ℹ️ Nota — 1.3 · Fallo previo en la lectura de evaluaciones

Al probar la migración apareció un fallo que ya tenían los scripts antiguos: el escritor del journal trunca el evento `evaluated` a 8 caracteres (`evaluate`), y los dos lectores (`finalize.mjs` y `preflight.mjs`) comparaban con `evaluated`, así que nunca encontraban una evaluación: la cualificación siempre fallaba con "no journaled verification evidence" y la puerta de entrega nunca era elegible. El lector único de `lib/journal.mjs` compara ahora con la forma truncada. No cambia el formato; la fase 2 retira el lector entero.

## ✅ P5 — 2.1 · Transiciones legales hacia `shipped`

**Resuelta en 4.0 → D24:** `shipped` solo desde `qualified`; la vía de la revisión 3 llega a `qualified` al cerrarse la cualificación, y `aidd release` aplica la puerta por sí mismo.

D8 fija la cadena `draft → in-progress → verified → qualified → shipped`, pero la puerta de entrega vigente también deja entregar con verificación roja en la revisión 3+ y una cualificación completada de cualquier color; en ese camino la spec está en `in-progress` o `verified`, nunca en `qualified`. Para no cambiar el comportamiento, `lib/control.mjs` admite `shipped` desde `in-progress`, `verified` y `qualified`, y deja que `aidd eval gate` decida. Rechaza: cualquier salida de `shipped`, cualquier salto desde `draft` que no sea la aprobación y aprobar algo que no esté en `draft`. Si D8 quiere `shipped` solo desde `qualified`, hay que decidir qué estado deja la vía de la revisión 3 (encaja con 4.0, al confirmar D8). Tampoco hice que `aidd release` ejecute la puerta por su cuenta: `ship-spec` sigue llamando a `aidd eval gate` antes, como en la fase 1; que `release` la exija sería natural en 6.1.

## ✅ P6 — 2.1 · Quién pone y quita `blocked`

**Resuelta en 4.0 → D23:** se adopta la propuesta: `aidd spec block <spec> <motivo>` y `aidd spec resume <spec> <resolución>`, que anotan el journal; `escalate` deja de ser un evento del modelo.

D2 y D8 ponen en `control.json` un campo `blocked` con motivo que "se limpia al reanudar", pero ni el plan de la fase 2 ni ninguna decisión nombran el comando que lo escribe ni qué es "reanudar". El esquema ya tiene `blocked: null` y `aidd release` lo limpia al entregar; no añadí `aidd spec block|resume` ni hice que `aidd log blocked` escriba estado (el journal no debe decidir nada, D3). Propuesta: `aidd spec block <spec> <motivo>` y `aidd spec resume <spec>`, que además anoten `blocked` en el journal, decididos en 4.0 junto con `escalate`.

## 🟡 P7 — 2.4 · Anotaciones que D5 no cubre

Al dejar solo `verdict`, `select`, `blocked` y `escalate`, cuatro anotaciones de los skills no encajaban en ninguno. No las convertí en estado nuevo:

- **Selección del scaffold** (`scaffold-system`): D5 define `select` como "deuda elegida", pero el skill anotaba también la elección de proyectos y arquetipos como `select`. La conservé como `select` porque es una decisión de criterio y el evento ya existe. Si `select` debe ser solo deuda, hay que decidir si esa traza desaparece (encaja con 7.0, que retira el materializador).
- **Deuda de una verificación roja en la revisión 3** (`build-requested-spec`, antes `debt` ámbar): D5 dice que la deuda la anota el núcleo, pero aún no hay comando de deuda (fase 5). Quité la línea; entretanto queda el rastro de la evaluación roja que anota `aidd eval record` y la entrada del TDR.
- **Lint no disponible** (`implement-project`, antes ámbar en el journal): ahora el skill lo informa en su resultado. D6 dice que `aidd run` lo "registra como no disponible (ámbar)"; cómo se registra se decide en la fase 3.
- **Sin deuda elegible** (`craft-lasting-quality`, antes ámbar): se devuelve la revisión diciéndolo, sin línea de journal.

Aparte, `architect-system-foundation` aún llamaba a `.agents/skills/scaffold-system/scripts/git-integrate.mjs`, borrado en 1.3; lo cambié por `aidd git integrate` al tocar esa línea.

## 🟡 P8 — 4.0 · Fallos inestables frente al invariante «la base está verde»

D21 da por hecho que la rama por defecto está verde salvo la deuda registrada, y por eso atribuye a la rama todo fallo que la deuda no cite. Un test inestable o que depende del entorno (puerto, reloj, datos compartidos) rompe ese supuesto: el triaje lo atribuiría a la rama y el Builder intentaría reparar algo que la spec no tocó. No se decide aquí si `aidd run acceptance` debe repetir los fallos una vez, si hay que confiar en los reintentos del propio framework (`retries` de Playwright) o si se acepta ejecutar la base solo en ese caso. Encaja con 4.4, al construir la asignación de fallos, o con la prueba real de la fase.
