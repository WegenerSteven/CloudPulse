import { Link, useParams } from 'react-router-dom'
import { Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { metricsByRange, servers as initialServers } from '../data/mockData'
import type { Alert } from '../types'
import { AlertSeverityLabel, formatRelativeTime, getStatusClass, statusText } from '../utils/formatters'

export function ServerDetailsPage({ alerts }: { alerts: Alert[] }) {
  const { serverId } = useParams()
  const server = initialServers.find((entry) => entry.id === serverId)

  if (!server) {
    return (
      <div className="empty-state large-empty">
        <h3>Server not found</h3>
        <p>The selected server ID does not exist in the demo fleet.</p>
        <Link to="/servers" className="primary-button">
          Back to servers
        </Link>
      </div>
    )
  }

  const serverAlerts = alerts.filter((alert) => alert.serverId === serverId && alert.status === 'active')
  const chartData = metricsByRange['24h'].map((metric) => ({
    label: new Date(metric.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    cpu: metric.cpu,
    memory: metric.memory,
  }))

  return (
    <>
      <div className="page-header">
        <div>
          <p className="eyebrow">Server detail</p>
          <h3>{server.name}</h3>
        </div>
        <span className={getStatusClass(server.status)}>{statusText[server.status]}</span>
      </div>

      <section className="detail-grid">
        <div className="panel">
          <div className="panel-header">
            <h4>Performance overview</h4>
          </div>
          <div className="stats-grid">
            <div>
              <span>Region</span>
              <strong>{server.region}</strong>
            </div>
            <div>
              <span>IP address</span>
              <strong>{server.ipAddress}</strong>
            </div>
            <div>
              <span>OS</span>
              <strong>{server.operatingSystem}</strong>
            </div>
            <div>
              <span>Uptime</span>
              <strong>{server.uptime}%</strong>
            </div>
            <div>
              <span>Last checked</span>
              <strong>{formatRelativeTime(server.lastCheckedAt)}</strong>
            </div>
            <div>
              <span>Disk</span>
              <strong>{server.diskUsage}%</strong>
            </div>
          </div>
        </div>

        <div className="panel">
          <div className="panel-header">
            <h4>Resource metrics</h4>
          </div>
          <div className="resource-list">
            <div className="resource-row">
              <span>CPU</span>
              <div className="progress"><span style={{ width: `${server.cpuUsage}%` }} /></div>
              <strong>{server.cpuUsage}%</strong>
            </div>
            <div className="resource-row">
              <span>Memory</span>
              <div className="progress"><span style={{ width: `${server.memoryUsage}%` }} /></div>
              <strong>{server.memoryUsage}%</strong>
            </div>
            <div className="resource-row">
              <span>Disk</span>
              <div className="progress"><span style={{ width: `${server.diskUsage}%` }} /></div>
              <strong>{server.diskUsage}%</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="panel chart-panel">
        <div className="panel-header">
          <h4>CPU and memory trend</h4>
        </div>
        <div className="chart-wrap">
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="cpuFill" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.6} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.05} />
                </linearGradient>
                <linearGradient id="memoryFill" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="label" tick={{ fontSize: 11 }} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="cpu" name="CPU %" stroke="#3b82f6" fill="url(#cpuFill)" />
              <Area type="monotone" dataKey="memory" name="Memory %" stroke="#f59e0b" fill="url(#memoryFill)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="panel">
        <div className="panel-header">
          <h4>Related alerts</h4>
        </div>
        {serverAlerts.length ? (
          <ul className="alert-list compact">
            {serverAlerts.map((alert) => (
              <li key={alert.id}>
                <div>
                  <strong>{alert.title}</strong>
                  <p>{alert.description}</p>
                </div>
                <span className={getStatusClass(alert.severity)}>{AlertSeverityLabel[alert.severity]}</span>
              </li>
            ))}
          </ul>
        ) : (
          <div className="empty-state">No active alerts for this server.</div>
        )}
      </section>
    </>
  )
}
