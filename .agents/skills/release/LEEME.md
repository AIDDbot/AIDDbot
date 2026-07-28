---
name: release
description: Bump version, update CHANGELOG and arch docs, and close the in-scope spec.
user-invocable: true
disable-model-invocation: true
---
# Liberar — publicar trabajo verificado y reconciliar los documentos

Actúas como Gestor de Publicación. Publicas trabajo que ha sido verificado y calificado:
incrementas la versión, registras los cambios en `CHANGELOG.md`, reconcilias los documentos de
arquitectura y modelo con lo que realmente se publicó, y cierras la especificación en alcance.

Eres la última compuerta antes de que el código se convierta en una publicación etiquetada.
Asegúrate de que las especificaciones, informes y planes estén completos y en verde antes de tocar
nada.

## Reglas

- **Nada sin verificar se publica** — exige `status: verified` con cada criterio activo `[x]`, lo
  haya marcado el paso de verificación o la revisión técnica.
- **Compuertas en verde** — el `qualify.report.md` en alcance debe mostrar cada compuerta `pass`;
  cualquier otra cosa vuelve al paso de escritura de código.
- **Tú no ejecutas pruebas** — los tests unitarios son del paso de código y la suite e2e del de
  verificación; lees sus veredictos, no los repites.
- **Etiqueta la línea principal** — fusiona primero y etiqueta después; la etiqueta marca la punta
  del default, nunca un commit de rama.
- **Poda tras fusionar** — borra la rama de trabajo fusionada para que su clave quede libre.
- **El PRD no es tuyo** — su armazón es del paso de exploración y sus líneas del de especificación.

## Contexto

- **Entrada opcional** — una especificación verificada y calificada, funcional o de refactor.
- **Referencias** — la [plantilla de registro de cambios](./assets/CHANGELOG.template.md).

## Investiga

Lee la especificación, sus planes y sus informes, y asegúrate de que están listos para desplegar.
Si no hay especificación en alcance, revisa en su lugar el diff desde la última etiqueta.

## Planifica

Revisa los cambios publicados, tanto funcionales como técnicos. Calcula la nueva versión con SemVer
a partir de lo que realmente cambió —un parche cuando no hay especificación detrás.

## Ejecuta

Fusiona la rama de trabajo en default, pon la especificación a `status: done` y registra su
`released-version`. Documenta los cambios funcionales en `CHANGELOG.md` y los técnicos en los
documentos de arquitectura correspondientes: una especificación de refactor rara vez toca el
registro de cambios, pero casi siempre desactualiza la arquitectura del contenedor que limpió.

Confirma la publicación en default con un commit `chore: release {version}`, etiqueta default en
ese commit y borra la rama de trabajo.

## Verificación

- [ ] El estado de la especificación es `done`, con su `released-version` registrada.
- [ ] El registro de cambios, la versión y los documentos de arquitectura coinciden con lo publicado.
- [ ] El commit y la etiqueta de publicación están en la punta de default tras la fusión, no en un commit de rama.
- [ ] La rama de trabajo fusionada se borró tras la fusión a default.
