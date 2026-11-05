import type { Alert } from '../types'

export const formatRelativeTime = (isoDate: string) => {
  const diffMs = Date.now() - new Date(isoDate).getTime()
  const minutes = Math.max(0, Math.floor(diffMs / 60000))

  if (minutes < 2) return 'just now'
  if (minutes < 60) return `${minutes}m ago`

  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`

  const days = Math.floor(hours / 24)
  return `${days}d ago`
}

export const AlertSeverityLabel: Record<Alert['severity'], string> = {
  critical: 'Critical',
  warning: 'Warning',
  info: 'Info',
}

export const statusText: Record<string, string> = {
  healthy: 'Healthy',
  warning: 'Warning',
  critical: 'Critical',
  offline: 'Offline',
  operational: 'Operational',
  degraded: 'Degraded',
  outage: 'Outage',
  active: 'Active',
  resolved: 'Resolved',
}

export const getStatusClass = (value: string) => `status-badge status-${value}`
