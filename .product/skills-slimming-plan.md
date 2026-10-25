# Plan para aligerar las skills

Fecha: 2026-10-25. Estado: prioridades iniciales 1–3 aplicadas; segunda pasada propuesta.

## Objetivo y medida

Reducir el texto que carga el agente sin cambiar las decisiones, los controles ni los resultados de los workflows. La base es [skills-sizes.md](skills-sizes.md): 14 archivos `SKILL.md`, 611 líneas y 8.213 palabras. El recuento excluye los archivos auxiliares.

Medir por separado las palabras de `SKILL.md`, las palabras de sus referencias y el texto que necesita cada ruta. Mover texto a una referencia reduce la carga inicial, pero solo reduce la carga de una ejecución si esa ruta no necesita leerlo. Las palabras son una aproximación al tamaño; no equivalen a tokens.

## Segunda pasada: prioridades actuales

Recuento comprobado tras los tres cambios: 569 líneas y 7.180 palabras en `SKILL.md`. El ahorro es de 1.033 palabras (12,6 %). Las tres skills tratadas pasan de 3.141 a 2.108 palabras (32,9 %). Las referencias propias añaden 148 palabras en `ship-spec`, solo cuando hay tests fallidos.

| Orden nuevo | Skill | Palabras de SKILL.md | Mejora concreta | Límite |
| ---: | --- | ---: | --- | --- |
| 1 | `define-spec` | 783 | El primer punto de Content repite la plantilla: máximo de requisitos, capacidad observable, errores, edge cases y nota Test. La regla de aceptación por requisito también se repite. Mantener esas definiciones en su fuente y acortar la clasificación de tipos y la aprobación. | Conservar los límites que no da la plantilla, el caso de archivo externo y el draft: esas rutas también necesitan las reglas de contenido. No borrar en bloque el primer punto. |
| 2 | `implement-project` | 762 | Contrastar Build y Check con `references/code-rules.md`: se repiten restricciones de validaciones, límites, defaults, efectos externos y ubicación de unitarios. Acortar las explicaciones del hook y del ciclo de checks. | Las code rules solo se cargan cuando existe system.md. No eliminar del texto común una regla necesaria para proyectos sin ese archivo. Mantener alcance, aprobación y comprobación final. |
| 3 | `build-archetype-foundation` | 556 | El diagrama repite Deliver y el cierre final. Conservar una sola ruta. Acortar las razones sobre el coste de contexto y las explicaciones de comandos. | Mantener recuperación tras interrupción, reutilización de specs existentes, condiciones de selección y cero deuda antes del siguiente spec. |
| 4 | `architect-system-foundation` | 586 | El árbol y la tabla repiten las fases greenfield. Conservar una vista principal y resumir las reglas repetidas de cierre de agentes. Revisar también las 1.320 palabras de referencias. | No trasladar texto que todas las fases necesitan a otra lectura obligatoria. Mantener la separación greenfield/brownfield y la restricción al catálogo. |
| 5 | `build-requested-spec` | 929 | Solo después de las anteriores, evaluar separar las filas de reparación y regresión en una referencia condicional. Es el archivo mayor, pero ahora concentra reglas distintas más que repeticiones. | Mantener selección de ruta, aprobación, responsables, límites y paradas en el archivo principal. Medir ruta verde y ruta con fallos por separado. |

No dar otra pasada a `ship-spec` ni a `craft-lasting-quality` solo por su tamaño. Ya han eliminado las repeticiones principales. Las skills pequeñas quedan para recortes evidentes.

La revisión de los tres cambios no demuestra ejecuciones equivalentes: se ha leído el texto y comparado el diff. Las mejoras propuestas son cambios de redacción; no se han aplicado en esta revisión.

## Prioridades iniciales (histórico)

El orden inicial combina ahorro probable, facilidad de revisión y riesgo de perder reglas. Los tamaños de esta tabla son los anteriores a la primera pasada; no son compromisos de reducción. Las prioridades 1–3 están aplicadas.

| Orden | Alcance | Palabras | Cambio propuesto | Condición para aceptarlo |
| ---: | --- | ---: | --- | --- |
| 1 | `build-requested-spec` | 1.225 | Conservar una sola representación principal de la ruta. Eliminar repeticiones entre diagrama, tabla y secciones. Separar las instrucciones de entrada por draft o deuda cuando no sean necesarias para una petición normal. | Mantener visibles la selección de ruta, la aprobación, los límites de reparación y las condiciones de parada. |
| 2 | `craft-lasting-quality` | 985 | Quitar la repetición de prioridades y reparaciones entre diagrama, tabla y prosa. Unificar el comando y las reglas comunes de deuda alta y media. Evaluar una referencia para el caso exclusivo de actualización de dependencias. | Conservar las diferencias entre `fix`, `refactor` y patch; los límites de alcance; los cinco specs; y las condiciones de salida. |
| 3 | `ship-spec` | 931 | Reducir la explicación de las operaciones internas de `release`. Revisar las duplicaciones con la plantilla de regresión. Evaluar una referencia que se lea solo cuando hay regresiones. | Conservar el reparto de propietarios, la prohibición de reparar durante el envío, la gestión de deuda y el control exclusivo de `release`. |
| 4 | `define-spec` | 783 | Comparar cada regla de contenido con las plantillas de spec y las dos referencias existentes. Eliminar las paráfrasis que ya se cargan al crear el artefacto. | Conservar las decisiones de alcance, la clasificación del tipo, los contratos observables y la aprobación. |
| 5 | `implement-project` | 762 | Contrastar las reglas con `references/code-rules.md` y `references/acceptance-tests.md`. Eliminar repeticiones y acortar las explicaciones del hook y de los comandos. | Conservar los límites del proyecto y del scope, los criterios de pruebas, las comprobaciones finales y la prohibición de debilitar assertions. |
| 6 | `architect-system-foundation`, `build-archetype-foundation` | 1.142 | Revisar repeticiones entre rutas, fases y referencias. Resumir las reglas de contexto y cierre de agentes sin perder sus condiciones. | Conservar la distinción greenfield/brownfield, la recuperación tras interrupciones y el cierre sin deuda de cada foundation spec. |
| 7 | `rule-project`, `scan-quality` | 959 | Revisar ejemplos y explicaciones que repitan sus tablas o plantillas. Mantener las reglas que requieren juicio del agente. | No perder la clasificación semántica de comandos, la propiedad de cada prioridad ni el tratamiento de checks no disponibles. |
| 8 | Las otras cinco skills | 1.426 | Aplicar solo recortes evidentes en `architect-requested-spec`, `outline-system`, `review-implementation`, `verify-behavior` y `maintain-skills`. | Mantener cada skill autónoma. No añadir referencias para ahorrar unas pocas palabras. |

## Reglas de ejecución

- Ejecutar cada cambio mediante `maintain-skills`. Usar su plantilla como contrato. Mantener el inglés técnico simplificado que exige; no sustituir prosa clara por abreviaturas o pseudocódigo.
- Trabajar una skill por vez. Registrar sus reglas antes del cambio y comprobar dónde queda cada una después: texto principal, plantilla, referencia o comando existente.
- Borrar una regla por estar automatizada solo después de comprobar que el core la aplica y que su salida permite al agente actuar. Una explicación repetida y una instrucción necesaria no son equivalentes.
- Añadir una referencia solo con una condición de lectura explícita. Mantener en `SKILL.md` las reglas comunes y la información que permite elegir la ruta.
- No crear una referencia compartida entre skills: la plantilla actual limita las referencias a la carpeta propia. Antes de centralizar las reglas de agentes, identificar un mecanismo de carga común y comprobar su compatibilidad con los harnesses. Dejar esa centralización para una propuesta posterior si exige cambiar el contrato.

## Revisión y cierre

Para cada cambio, comparar las rutas antes y después. Revisar los casos que la skill distingue: aprobación y YOLO; request, draft y deuda; verificaciones fallidas; regresión; checks no disponibles; e interrupciones, según corresponda. Comprobar que cada caso conserva su decisión, responsable y salida.

Ejecutar `npm run adapt` después de cada cambio y resolver las omisiones o colisiones. Este comando valida frontmatter y regenera adapters; no prueba la equivalencia del comportamiento. Actualizar la documentación que cambie según `maintain-skills`.

Si se modifican `.agents/aidd/`, `bin/`, `scripts/` o `test/` para trasladar una regla mecánica, añadir las comprobaciones correspondientes y ejecutar `npm test`. Ese trabajo amplía el alcance de una simple reducción de texto.

Actualizar la tabla de tamaños al terminar. Registrar por skill las palabras anteriores y finales, las referencias añadidas y las rutas que deben leerlas. Aceptar la reducción solo si conserva todas las reglas necesarias y reduce el texto de alguna ruta sin aumentar injustificadamente el de las demás. No fijar un porcentaje de ahorro antes de realizar el primer cambio.
