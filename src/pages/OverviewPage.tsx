import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { activityEvents, metricsByRange, services as serviceCatalog } from '../data/mockData'
import { formatRelativeTime, getStatusClass, statusText } from '../utils/formatters'
import type { Alert, Server } from '../types'

export function OverviewPage({
  servers,
  alerts,
}: {
  servers: Server[]
  alerts: Alert[]
}) {
  const totalServers = servers.length
  const healthyServers = servers.filter((server) => server.status === 'healthy').length
  const warningServers = servers.filter((server) => server.status === 'warning').length
  const criticalServers = servers.filter(
    (server) => server.status === 'critical' || server.status === 'offline',
  ).length
  const averageCpu = servers.reduce((sum, server) => sum + server.cpuUsage, 0) / totalServers
  const averageMemory = servers.reduce((sum, server) => sum + server.memoryUsage, 0) / totalServers
  const activity = activityEvents.slice(0, 4)
  const activeAlerts = alerts.filter((alert) => alert.status === 'active').length
  const availability = ((healthyServers + warningServers * 0.7) / totalServers * 100).toFixed(2)

  const trendData = useMemo(
    () =>
      metricsByRange['24h'].map((metric) => ({
        label: new Date(metric.timestamp).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
        cpu: metric.cpu,
        memory: metric.memory,
      })),
    [],
  )

  const summaryCards = [
    { label: 'Total Servers', value: totalServers, tone: 'neutral', detail: 'Across all regions' },
    { label: 'Healthy Servers', value: healthyServers, tone: 'good', detail: 'Nominal load' },
    { label: 'Average CPU', value: `${averageCpu.toFixed(1)}%`, tone: 'info', detail: 'Fleet utilization' },
    { label: 'Average Memory', value: `${averageMemory.toFixed(1)}%`, tone: 'warning', detail: 'Memory pressure' },
    { label: 'Active Alerts', value: activeAlerts, tone: 'alert', detail: 'Requires attention' },
    { label: 'Simulated Availability', value: `${availability}%`, tone: 'good', detail: 'Across demo fleet' },
  ]

  return (
    <>
      <div className="page-header">
        <div>
          <p className="eyebrow">Infrastructure overview</p>
          <h3>Fleet health summary</h3>
        </div>
        <span className="demo-chip">Demo environment</span>
      </div>

      <section className="kpi-grid">
        {summaryCards.map((card) => (
          <article key={card.label} className={`kpi-card ${card.tone}`}>
            <div className="kpi-header">
              <span>{card.label}</span>
              <span className="spark">●</span>
            </div>
            <div className="kpi-value">{card.value}</div>
            <div className="kpi-detail">{card.detail}</div>
          </article>
        ))}
      </section>

      <section className="panel-grid two-up">
        <div className="panel chart-panel">
          <div className="panel-header">
            <h4>Resource utilization</h4>
          </div>
          <div className="chart-wrap">
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="label" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} domain={[0, 100]} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="cpu" name="CPU %" stroke="#3b82f6" strokeWidth={2.5} />
                <Line type="monotone" dataKey="memory" name="Memory %" stroke="#f59e0b" strokeWidth={2.5} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="panel">
          <div className="panel-header">
            <h4>Server health summary</h4>
          </div>
          <div className="health-stack">
            {[
              { label: 'Healthy', value: healthyServers, className: 'good' },
              { label: 'Warning', value: warningServers, className: 'warning' },
              { label: 'Critical', value: criticalServers, className: 'critical' },
            ].map((item) => (
              <div key={item.label} className="health-row">
                <span className={`color-swatch ${item.className}`} />
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="panel-grid two-up lower-spacing">
        <div className="panel">
          <div className="panel-header">
            <h4>Recent activity</h4>
          </div>
          <ul className="activity-list">
            {activity.map((event) => (
              <li key={event.id}>
                <div className="activity-title">{event.title}</div>
                <div className="activity-meta">{event.description}</div>
                <div className="activity-time">{formatRelativeTime(event.createdAt)}</div>
              </li>
            ))}
          </ul>
        </div>

        <div className="panel">
          <div className="panel-header">
            <h4>Service status</h4>
          </div>
          <div className="service-summary">
            {serviceCatalog.slice(0, 4).map((service) => (
              <div key={service.id} className="service-mini">
                <span>{service.name}</span>
                <span className={getStatusClass(service.status)}>{statusText[service.status]}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export function EmptyLink() {
  return <Link to="/servers">View servers</Link>
}
