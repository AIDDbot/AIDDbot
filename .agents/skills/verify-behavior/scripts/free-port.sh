#!/usr/bin/env bash
# free-port.sh — stop a listener only when it is the process captured by this run.
# Capture identity: ps -p <pid> -o lstart=
# Usage: ./free-port.sh --owner-pid <pid> --owner-start "<lstart>" 3000 [4200 ...]
set -euo pipefail

if [ "$#" -lt 5 ] || [ "$1" != "--owner-pid" ] || [ "$3" != "--owner-start" ]; then
  echo "usage: $0 --owner-pid <pid> --owner-start <ps-lstart> <port> [port ...]" >&2
  exit 2
fi

owner_pid="$2"
owner_start="$4"
shift 4
ports=("$@")

have() { command -v "$1" >/dev/null 2>&1; }

process_start() {
  ps -p "$1" -o lstart= 2>/dev/null | sed -e 's/^[[:space:]]*//' -e 's/[[:space:]]*$//'
}

assert_owner_identity() {
  local actual
  actual="$(process_start "${owner_pid}")"
  if [ -z "${actual}" ]; then
    echo "owner PID ${owner_pid} is no longer running" >&2
    return 1
  fi
  if [ "${actual}" != "${owner_start}" ]; then
    echo "owner PID ${owner_pid} start identity changed" >&2
    return 1
  fi
}

listener_pids() {
  local port="$1"
  if have lsof; then
    lsof -ti "TCP:${port}" -sTCP:LISTEN 2>/dev/null || true
  elif have fuser; then
    fuser -n tcp "${port}" 2>/dev/null || true
  else
    echo "neither lsof nor fuser is available" >&2
    return 2
  fi
}

owned_listener=0
for port in "${ports[@]}"; do
  pids="$(listener_pids "${port}")"
  if [ -z "${pids}" ]; then
    echo "port ${port}: free"
    continue
  fi
  for listener_pid in ${pids}; do
    if [ "${listener_pid}" != "${owner_pid}" ]; then
      echo "port ${port}: listener PID ${listener_pid} is not owned by this run" >&2
      exit 1
    fi
  done
  assert_owner_identity
  owned_listener=1
done

if [ "${owned_listener}" -eq 1 ]; then
  assert_owner_identity
  echo "stopping owned listener PID ${owner_pid}"
  kill "${owner_pid}"
  for _ in 1 2 3 4 5 6 7 8 9 10; do
    still_listening=0
    for port in "${ports[@]}"; do
      if listener_pids "${port}" | grep -qx "${owner_pid}"; then
        still_listening=1
      fi
    done
    [ "${still_listening}" -eq 0 ] && break
    sleep 0.5
  done
  if kill -0 "${owner_pid}" 2>/dev/null; then
    still_listening=0
    for port in "${ports[@]}"; do
      if listener_pids "${port}" | grep -qx "${owner_pid}"; then
        still_listening=1
      fi
    done
    if [ "${still_listening}" -eq 1 ]; then
      assert_owner_identity
      kill -9 "${owner_pid}"
    fi
  fi
fi

for port in "${ports[@]}"; do
  remaining="$(listener_pids "${port}")"
  if [ -n "${remaining}" ]; then
    echo "port ${port}: still occupied by PID(s) ${remaining//$'\n'/ }" >&2
    exit 1
  fi
  echo "port ${port}: free"
done
