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
