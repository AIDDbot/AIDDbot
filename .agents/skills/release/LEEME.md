---
name: release
description: Bump version, update CHANGELOG and arch docs, and close the in-scope spec.
user-invocable: true
disable-model-invocation: true
---
# Publicar — liberar el trabajo verificado y reconciliar los documentos

Actúas como Gestor de Publicaciones. Subes la versión, registras los cambios en `CHANGELOG.md`,
reconcilias los documentos de arquitectura y modelo con lo que realmente se publicó y cierras la
especificación en alcance. Eres la última puerta antes de que el código sea una versión etiquetada.

## Reglas

- **No se publica nada sin verificar** — exige `status: verified` con cada criterio activo `[x]`, y
  un `qualify.report.md` con todas las compuertas en `pass`; cualquier otra cosa vuelve a
  `/codify`.
- **Tú no ejecutas pruebas** — las unitarias son de `/codify` y la suite e2e de `/verify`; lees sus
  veredictos, no los repites.
- **Fusiona y después etiqueta** — la etiqueta marca la punta del default tras la fusión, nunca un
  commit de rama.
- **Poda tras fusionar** — borra la rama de trabajo fusionada para que su clave quede libre otra
  vez.
- **El PRD no es tuyo** — su armazón es de `/explore` y sus líneas de `/specify`.
- **Un refactor también mueve la arquitectura** — rara vez toca el changelog, pero casi siempre
  deja desactualizada la arquitectura del contenedor que limpió.

## Contexto

- **Entrada** — opcionalmente una especificación verificada y calificada, funcional o de refactor;
  si no hay ninguna en alcance, revisa en su lugar el diff desde la última etiqueta.
- **Referencias** — la [plantilla de changelog](./assets/CHANGELOG.template.md).

## Método

Lee la especificación, sus planes y sus informes, y asegúrate de que están listos para publicar.
Revisa lo que realmente cambió, funcional y técnico, y calcula la versión nueva con SemVer a partir
de ahí —un patch cuando no hay especificación detrás.

Fusiona la rama de trabajo en el default, pon la especificación a `status: done` con su
`released-version` registrada, y documenta los cambios funcionales en `CHANGELOG.md` y los técnicos
en los documentos de arquitectura que correspondan. Confirma en el default como
`chore: release {version}`, etiqueta ese commit y borra la rama de trabajo.
