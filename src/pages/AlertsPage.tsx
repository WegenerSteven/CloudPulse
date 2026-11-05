import { useMemo, useState } from 'react'
import { servers as initialServers } from '../data/mockData'
import type { Alert } from '../types'
import { AlertSeverityLabel, getStatusClass, statusText } from '../utils/formatters'

export function AlertsPage({
  alerts,
  resolveAlert,
  notifications,
}: {
  alerts: Alert[]
  resolveAlert: (id: string) => void
  notifications: 'inline' | 'toast' | 'off'
}) {
  const [severityFilter, setSeverityFilter] = useState<'all' | Alert['severity']>('all')
  const [statusFilter, setStatusFilter] = useState<'all' | Alert['status']>('all')

  const filteredAlerts = useMemo(
    () =>
      alerts.filter((alert) => {
        const severityMatch = severityFilter === 'all' || alert.severity === severityFilter
        const statusMatch = statusFilter === 'all' || alert.status === statusFilter
        return severityMatch && statusMatch
      }),
    [alerts, severityFilter, statusFilter],
  )

  return (
    <>
      <div className="page-header">
        <div>
          <p className="eyebrow">Operations</p>
          <h3>Alert management</h3>
        </div>
      </div>

      <div className="toolbar grouped-toolbar">
        <select
          aria-label="Filter alerts by severity"
          value={severityFilter}
          onChange={(event) => setSeverityFilter(event.target.value as 'all' | Alert['severity'])}
        >
          <option value="all">All severities</option>
          <option value="critical">Critical</option>
          <option value="warning">Warning</option>
          <option value="info">Info</option>
        </select>
        <select
          aria-label="Filter alerts by status"
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value as 'all' | Alert['status'])}
        >
          <option value="all">All statuses</option>
          <option value="active">Active</option>
          <option value="resolved">Resolved</option>
        </select>
      </div>

      {filteredAlerts.length ? (
        <div className="alert-list-wrap">
          {filteredAlerts.map((alert) => {
            const serverName = initialServers.find((server) => server.id === alert.serverId)?.name ?? 'System-wide'
            const actionLabel = notifications === 'inline' ? 'Resolved' : 'Resolve alert'

            return (
              <article key={alert.id} className="alert-row">
                <div className="alert-main">
                  <div className="alert-topline">
                    <strong>{alert.title}</strong>
                    <span className={getStatusClass(alert.severity)}>{AlertSeverityLabel[alert.severity]}</span>
                  </div>
                  <p>{alert.description}</p>
                  <div className="alert-meta">
                    <span>{serverName}</span>
                    <span>{new Date(alert.createdAt).toLocaleString()}</span>
                    <span className={getStatusClass(alert.status)}>{statusText[alert.status]}</span>
                  </div>
                </div>
                <button
                  type="button"
                  className="primary-button"
                  onClick={() => resolveAlert(alert.id)}
                  disabled={alert.status === 'resolved'}
                >
                  {alert.status === 'resolved' ? actionLabel : 'Resolve alert'}
                </button>
              </article>
            )
          })}
        </div>
      ) : (
        <div className="empty-state">No alerts match the current filters.</div>
      )}
    </>
  )
}
