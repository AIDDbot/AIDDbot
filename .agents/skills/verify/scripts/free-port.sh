#!/usr/bin/env bash
# free-port.sh — stop whatever is LISTENING on the given TCP port(s).
# Usage:  ./free-port.sh 3000 [4200 ...]
# Purpose: clear orphaned dev/e2e servers before /verify starts a fresh one.
# Idempotent: exits 0 whether or not anything was listening.
set -euo pipefail

if [ "$#" -eq 0 ]; then
  echo "usage: $0 <port> [port ...]" >&2
  exit 2
fi

have() { command -v "$1" >/dev/null 2>&1; }

free_with_lsof() {
  local port="$1" pids
  pids="$(lsof -ti "TCP:${port}" -sTCP:LISTEN 2>/dev/null || true)"
  if [ -z "${pids}" ]; then
    echo "port ${port}: free"
    return 0
  fi
  echo "port ${port}: stopping listener PID(s) ${pids//$'\n'/ }"
  kill ${pids} 2>/dev/null || true          # graceful (SIGTERM) first
  sleep 1
  pids="$(lsof -ti "TCP:${port}" -sTCP:LISTEN 2>/dev/null || true)"
  if [ -n "${pids}" ]; then
    echo "port ${port}: forcing PID(s) ${pids//$'\n'/ }"
    kill -9 ${pids} 2>/dev/null || true      # SIGKILL survivors
  fi
}

for port in "$@"; do
  if have lsof; then
    free_with_lsof "${port}"
  elif have fuser; then
    echo "port ${port}: freeing via fuser"
    fuser -k "${port}/tcp" 2>/dev/null || true
  else
    echo "port ${port}: neither lsof nor fuser available — cannot free" >&2
    exit 1
  fi
done
