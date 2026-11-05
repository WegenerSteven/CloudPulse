import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import type { Server } from '../types'
import { getStatusClass, statusText } from '../utils/formatters'

export function ServersPage({ servers }: { servers: Server[] }) {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const filteredServers = useMemo(() => {
    const term = search.toLowerCase()
    return servers.filter((server) => {
      const matchesSearch =
        server.name.toLowerCase().includes(term) || server.ipAddress.toLowerCase().includes(term)
      const matchesStatus = statusFilter === 'all' || server.status === statusFilter
      return matchesSearch && matchesStatus
    })
  }, [search, servers, statusFilter])

  return (
    <>
      <div className="page-header">
        <div>
          <p className="eyebrow">Inventory</p>
          <h3>Server fleet</h3>
        </div>
      </div>

      <div className="toolbar">
        <input
          aria-label="Search servers"
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search by name or IP"
        />
        <select
          aria-label="Filter by server status"
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
        >
          <option value="all">All statuses</option>
          <option value="healthy">Healthy</option>
          <option value="warning">Warning</option>
          <option value="critical">Critical</option>
          <option value="offline">Offline</option>
        </select>
      </div>

      <div className="table-wrap">
        <table className="data-table">
          <thead>
            <tr>
              <th>Server</th>
              <th>Region</th>
              <th>IP</th>
              <th>OS</th>
              <th>CPU</th>
              <th>Memory</th>
              <th>Disk</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredServers.length ? (
              filteredServers.map((server) => (
                <tr key={server.id}>
                  <td>
                    <Link to={`/servers/${server.id}`}>{server.name}</Link>
                  </td>
                  <td>{server.region}</td>
                  <td>{server.ipAddress}</td>
                  <td>{server.operatingSystem}</td>
                  <td>{server.cpuUsage}%</td>
                  <td>{server.memoryUsage}%</td>
                  <td>{server.diskUsage}%</td>
                  <td>
                    <span className={getStatusClass(server.status)}>{statusText[server.status]}</span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="empty-cell">
                  No servers match the current search or filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  )
}
