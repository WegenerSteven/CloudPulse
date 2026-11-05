import type { ActivityEvent, Alert, Metric, MetricRange, MonitoredService, Server } from '../types'

const now = Date.now()

const buildMetricSeries = (range: MetricRange): Metric[] => {
  const points = range === '1h' ? 8 : range === '24h' ? 10 : 12
  const base = range === '1h' ? 22 : range === '24h' ? 18 : 14

  return Array.from({ length: points }, (_, index) => {
    const timestamp = new Date(now - (points - index - 1) * 60 * 60 * 1000)
    const cpu = Math.min(100, Math.max(16, base + Math.sin(index * 1.4) * 18 + index * 1.7))
    const memory = Math.min(100, Math.max(12, base + 15 + Math.cos(index * 1.2) * 14 + index))
    const disk = Math.min(100, Math.max(10, 52 + Math.sin(index * 1.3) * 18 + index * 0.8))
    const networkIn = Math.min(800, 160 + index * 16 + Math.sin(index * 1.8) * 80)
    const networkOut = Math.min(800, 170 + index * 15 + Math.cos(index * 2.1) * 75)

    return {
      timestamp: timestamp.toISOString(),
      cpu: Number(cpu.toFixed(1)),
      memory: Number(memory.toFixed(1)),
      disk: Number(disk.toFixed(1)),
      networkIn: Number(networkIn.toFixed(0)),
      networkOut: Number(networkOut.toFixed(0)),
    }
  })
}

export const servers: Server[] = [
  {
    id: 'srv-01',
    name: 'api-gateway-prod-us',
    region: 'us-east-1',
    ipAddress: '10.12.0.21',
    operatingSystem: 'Ubuntu 22.04 LTS',
    cpuUsage: 58,
    memoryUsage: 66,
    diskUsage: 54,
    status: 'healthy',
    uptime: 99.98,
    lastCheckedAt: new Date(now - 3 * 60 * 1000).toISOString(),
  },
  {
    id: 'srv-02',
    name: 'auth-worker-eu',
    region: 'eu-west-1',
    ipAddress: '10.24.1.09',
    operatingSystem: 'Debian 12',
    cpuUsage: 73,
    memoryUsage: 82,
    diskUsage: 61,
    status: 'warning',
    uptime: 98.4,
    lastCheckedAt: new Date(now - 5 * 60 * 1000).toISOString(),
  },
  {
    id: 'srv-03',
    name: 'payments-db-primary',
    region: 'ap-southeast-1',
    ipAddress: '10.31.3.12',
    operatingSystem: 'Rocky Linux 9',
    cpuUsage: 91,
    memoryUsage: 88,
    diskUsage: 74,
    status: 'critical',
    uptime: 97.2,
    lastCheckedAt: new Date(now - 2 * 60 * 1000).toISOString(),
  },
  {
    id: 'srv-04',
    name: 'image-cache-01',
    region: 'us-west-2',
    ipAddress: '10.14.9.44',
    operatingSystem: 'CentOS Stream 9',
    cpuUsage: 41,
    memoryUsage: 57,
    diskUsage: 38,
    status: 'healthy',
    uptime: 99.9,
    lastCheckedAt: new Date(now - 7 * 60 * 1000).toISOString(),
  },
  {
    id: 'srv-05',
    name: 'analytics-node-2',
    region: 'us-central-1',
    ipAddress: '10.19.5.18',
    operatingSystem: 'Ubuntu 24.04',
    cpuUsage: 67,
    memoryUsage: 78,
    diskUsage: 82,
    status: 'warning',
    uptime: 97.8,
    lastCheckedAt: new Date(now - 13 * 60 * 1000).toISOString(),
  },
  {
    id: 'srv-06',
    name: 'edge-router-ops',
    region: 'eu-central-1',
    ipAddress: '10.07.2.11',
    operatingSystem: 'Alpine Linux',
    cpuUsage: 0,
    memoryUsage: 0,
    diskUsage: 0,
    status: 'offline',
    uptime: 0,
    lastCheckedAt: new Date(now - 30 * 60 * 1000).toISOString(),
  },
]

export const alerts: Alert[] = [
  {
    id: 'alert-101',
    serverId: 'srv-03',
    title: 'CPU saturation',
    description: 'Payments database primary cluster exceeded the CPU threshold for 15 minutes.',
    severity: 'critical',
    status: 'active',
    createdAt: new Date(now - 30 * 60 * 1000).toISOString(),
  },
  {
    id: 'alert-102',
    serverId: 'srv-02',
    title: 'Memory pressure',
    description: 'Authentication worker is trending above 80% memory utilization.',
    severity: 'warning',
    status: 'active',
    createdAt: new Date(now - 90 * 60 * 1000).toISOString(),
  },
  {
    id: 'alert-103',
    serverId: 'srv-06',
    title: 'Edge router offline',
    description: 'The edge router is unreachable and requires investigation.',
    severity: 'critical',
    status: 'active',
    createdAt: new Date(now - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'alert-104',
    serverId: 'srv-05',
    title: 'Disk capacity warning',
    description: 'Analytics node is approaching its storage threshold.',
    severity: 'info',
    status: 'resolved',
    createdAt: new Date(now - 5 * 60 * 60 * 1000).toISOString(),
    resolvedAt: new Date(now - 2 * 60 * 60 * 1000).toISOString(),
  },
]

export const services: MonitoredService[] = [
  {
    id: 'svc-01',
    name: 'API Gateway',
    description: 'Ingress routing and traffic balancing',
    status: 'operational',
    responseTimeMs: 128,
    availability: 99.97,
    lastCheckedAt: new Date(now - 2 * 60 * 1000).toISOString(),
  },
  {
    id: 'svc-02',
    name: 'Authentication Service',
    description: 'Token issuance and session validation',
    status: 'degraded',
    responseTimeMs: 384,
    availability: 98.7,
    lastCheckedAt: new Date(now - 5 * 60 * 1000).toISOString(),
  },
  {
    id: 'svc-03',
    name: 'Payments Service',
    description: 'Processing and settlement orchestration',
    status: 'outage',
    responseTimeMs: 0,
    availability: 91.4,
    lastCheckedAt: new Date(now - 12 * 60 * 1000).toISOString(),
  },
  {
    id: 'svc-04',
    name: 'Notification Service',
    description: 'Email and SMS delivery workflows',
    status: 'operational',
    responseTimeMs: 210,
    availability: 99.81,
    lastCheckedAt: new Date(now - 3 * 60 * 1000).toISOString(),
  },
  {
    id: 'svc-05',
    name: 'Database Service',
    description: 'Primary and replica storage layer',
    status: 'degraded',
    responseTimeMs: 456,
    availability: 97.6,
    lastCheckedAt: new Date(now - 7 * 60 * 1000).toISOString(),
  },
  {
    id: 'svc-06',
    name: 'File Storage Service',
    description: 'Persistent asset and artifact storage',
    status: 'operational',
    responseTimeMs: 150,
    availability: 99.92,
    lastCheckedAt: new Date(now - 1 * 60 * 1000).toISOString(),
  },
]

export const activityEvents: ActivityEvent[] = [
  {
    id: 'evt-01',
    title: 'CPU threshold exceeded',
    description: 'Payments database primary crossed the warning threshold.',
    type: 'alert',
    createdAt: new Date(now - 40 * 60 * 1000).toISOString(),
  },
  {
    id: 'evt-02',
    title: 'Server returned to healthy state',
    description: 'api-gateway-prod-us recovered after traffic normalization.',
    type: 'server',
    createdAt: new Date(now - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'evt-03',
    title: 'Alert resolved',
    description: 'Disk capacity warning was acknowledged and closed.',
    type: 'system',
    createdAt: new Date(now - 3 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'evt-04',
    title: 'Service response time increased',
    description: 'Authentication service latency spiked during peak traffic.',
    type: 'service',
    createdAt: new Date(now - 5 * 60 * 60 * 1000).toISOString(),
  },
]

export const metricsByRange: Record<MetricRange, Metric[]> = {
  '1h': buildMetricSeries('1h'),
  '24h': buildMetricSeries('24h'),
  '7d': buildMetricSeries('7d'),
}
