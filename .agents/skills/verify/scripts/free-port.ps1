# free-port.ps1 — stop a listener only when it is the process captured by this run.
# Capture identity: $p = Get-Process -Id <pid>; $p.Id; $p.StartTime.ToUniversalTime().Ticks
# Usage: ./free-port.ps1 -OwnerPid <pid> -OwnerStartTicks <ticks> 3000 4200
[CmdletBinding()]
param(
  [Parameter(Mandatory)]
  [int] $OwnerPid,

  [Parameter(Mandatory)]
  [long] $OwnerStartTicks,

  [Parameter(Mandatory, Position = 0, ValueFromRemainingArguments)]
  [int[]] $Port
)

$ErrorActionPreference = 'Stop'
$ownedListener = $false

function Get-ListenerProcessIds([int] $LocalPort) {
  @(Get-NetTCPConnection -LocalPort $LocalPort -State Listen -ErrorAction SilentlyContinue |
    Select-Object -ExpandProperty OwningProcess -Unique)
}

function Assert-OwnerIdentity {
  $owner = Get-Process -Id $OwnerPid -ErrorAction SilentlyContinue
  if (-not $owner) {
    throw "owner PID $OwnerPid is no longer running"
  }
  $actualTicks = $owner.StartTime.ToUniversalTime().Ticks
  if ($actualTicks -ne $OwnerStartTicks) {
    throw "owner PID $OwnerPid start identity changed"
  }
}

foreach ($p in $Port) {
  $listenerIds = Get-ListenerProcessIds $p
  if (-not $listenerIds) {
    Write-Host "port ${p}: free"
    continue
  }

  $foreignIds = @($listenerIds | Where-Object { $_ -ne $OwnerPid })
  if ($foreignIds.Count -gt 0) {
    throw "port ${p}: listener PID(s) $($foreignIds -join ', ') are not owned by this run"
  }

  Assert-OwnerIdentity
  $ownedListener = $true
}

if ($ownedListener) {
  Assert-OwnerIdentity
  Write-Host "stopping owned listener PID $OwnerPid"
  Stop-Process -Id $OwnerPid -ErrorAction Stop
  $remainingOwner = Get-Process -Id $OwnerPid -ErrorAction SilentlyContinue
  if ($remainingOwner) {
    try {
      Wait-Process -Id $OwnerPid -Timeout 5 -ErrorAction Stop
    } catch {
      Assert-OwnerIdentity
      Stop-Process -Id $OwnerPid -Force -ErrorAction Stop
      Wait-Process -Id $OwnerPid -Timeout 5 -ErrorAction SilentlyContinue
    }
  }
}

foreach ($p in $Port) {
  $remaining = Get-ListenerProcessIds $p
  if ($remaining) {
    throw "port ${p}: still occupied by PID(s) $($remaining -join ', ')"
  }
  Write-Host "port ${p}: free"
}
