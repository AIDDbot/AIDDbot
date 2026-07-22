# codify-plans

Build every plan in the set into working code. It runs `/codify` once per plan — the
software-container plans first, then the e2e plan — each in its own fresh subagent. This is
the only command that writes application source.

Use it after `specify-and-planify`, on a spec at status `planned` or `failed`. The e2e suite
is compiled and linted here but never run; that happens later, in `verify-and-fix`.
