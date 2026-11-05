import { useState } from 'react'
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { metricsByRange } from '../data/mockData'
import type { MetricRange } from '../types'

export function MonitoringPage() {
  const [range, setRange] = useState<MetricRange>('24h')
  const data = metricsByRange[range]

  return (
    <>
      <div className="page-header">
        <div>
          <p className="eyebrow">Monitoring</p>
          <h3>Infrastructure telemetry</h3>
        </div>
        <div className="range-picker" aria-label="Select monitoring range">
          {(['1h', '24h', '7d'] as MetricRange[]).map((option) => (
            <button
              key={option}
              type="button"
              className={range === option ? 'range-chip active' : 'range-chip'}
              onClick={() => setRange(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="panel chart-panel">
        <div className="panel-header">
          <h4>CPU, memory, and network</h4>
        </div>
        <div className="chart-wrap">
          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis
                dataKey="timestamp"
                tickFormatter={(value) =>
                  new Date(value).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                }
                tick={{ fontSize: 11 }}
              />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="cpu" name="CPU %" stroke="#3b82f6" strokeWidth={2.5} />
              <Line type="monotone" dataKey="memory" name="Memory %" stroke="#f59e0b" strokeWidth={2.5} />
              <Line type="monotone" dataKey="networkIn" name="Network In (MB/s)" stroke="#10b981" strokeWidth={2} />
              <Line type="monotone" dataKey="networkOut" name="Network Out (MB/s)" stroke="#ef4444" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  )
}
