# free-port.ps1 — stop whatever is LISTENING on the given TCP port(s).
# Usage:   ./free-port.ps1 3000 4200
# Purpose: clear orphaned dev/e2e servers before /verify starts a fresh one.
# Idempotent: succeeds whether or not anything was listening.
[CmdletBinding()]
param(
  [Parameter(Mandatory, ValueFromRemainingArguments)]
  [int[]] $Port
)

$ErrorActionPreference = 'Stop'

foreach ($p in $Port) {
  $procIds = Get-NetTCPConnection -LocalPort $p -State Listen -ErrorAction SilentlyContinue |
    Select-Object -ExpandProperty OwningProcess -Unique

  if (-not $procIds) {
    Write-Host "port ${p}: free"
    continue
  }

  foreach ($procId in $procIds) {
    if (-not $procId) { continue }
    $name = (Get-Process -Id $procId -ErrorAction SilentlyContinue).ProcessName
    Write-Host "port ${p}: stopping listener PID $procId ($name)"
    Stop-Process -Id $procId -Force -ErrorAction SilentlyContinue
  }
}
