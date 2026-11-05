export type ServerStatus = 'healthy' | 'warning' | 'critical' | 'offline'

export interface Server {
  id: string
  name: string
  region: string
  ipAddress: string
  operatingSystem: string
  cpuUsage: number
  memoryUsage: number
  diskUsage: number
  status: ServerStatus
  uptime: number
  lastCheckedAt: string
}

export type AlertSeverity = 'critical' | 'warning' | 'info'
export type AlertStatus = 'active' | 'resolved'

export interface Alert {
  id: string
  serverId: string
  title: string
  description: string
  severity: AlertSeverity
  status: AlertStatus
  createdAt: string
  resolvedAt?: string
}

export interface Metric {
  timestamp: string
  cpu: number
  memory: number
  disk: number
  networkIn: number
  networkOut: number
}

export type MetricRange = '1h' | '24h' | '7d'

export type ServiceStatus = 'operational' | 'degraded' | 'outage'

export interface MonitoredService {
  id: string
  name: string
  description: string
  status: ServiceStatus
  responseTimeMs: number
  availability: number
  lastCheckedAt: string
}

export interface ActivityEvent {
  id: string
  title: string
  description: string
  type: 'alert' | 'server' | 'service' | 'system'
  createdAt: string
}
