import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Header } from './components/layout/Header'
import { Sidebar } from './components/layout/Sidebar'
import { alerts as initialAlerts, servers as initialServers } from './data/mockData'
import { useAppPreferences } from './hooks/useAppPreferences'
import { AlertsPage } from './pages/AlertsPage'
import { MonitoringPage } from './pages/MonitoringPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { OverviewPage } from './pages/OverviewPage'
import { ServerDetailsPage } from './pages/ServerDetailsPage'
import { ServersPage } from './pages/ServersPage'
import { ServicesPage } from './pages/ServicesPage'
import { SettingsPage } from './pages/SettingsPage'
import type { Alert } from './types'

const alertStorageKey = 'cloudpulse-alerts'

const getStoredAlerts = (): Alert[] => {
  try {
    const stored = localStorage.getItem(alertStorageKey)
    return stored ? (JSON.parse(stored) as Alert[]) : initialAlerts
  } catch {
    return initialAlerts
  }
}

function App() {
  const [alerts, setAlerts] = useState<Alert[]>(() => getStoredAlerts())
  const { theme, setTheme, refreshInterval, setRefreshInterval, notifications, setNotifications } =
    useAppPreferences()
  const [toast, setToast] = useState<string | null>(null)

  useEffect(() => {
    localStorage.setItem(alertStorageKey, JSON.stringify(alerts))
  }, [alerts])

  useEffect(() => {
    if (!toast) return
    const timeout = window.setTimeout(() => setToast(null), 1800)
    return () => window.clearTimeout(timeout)
  }, [toast])

  const resolveAlert = (id: string) => {
    setAlerts((current) => {
      const next: Alert[] = current.map((alert) =>
        alert.id === id && alert.status === 'active'
          ? { ...alert, status: 'resolved', resolvedAt: new Date().toISOString() }
          : alert,
      )

      const resolvedAlert = next.find((alert) => alert.id === id && alert.status === 'resolved')
      if (resolvedAlert) {
        setToast(`Resolved: ${resolvedAlert.title}`)
      }

      return next
    })
  }

  return (
    <BrowserRouter>
      <div className="app-shell">
        <Sidebar />
        <div className="content-panel">
          <Header theme={theme} setTheme={setTheme} activeAlerts={alerts.filter((alert) => alert.status === 'active').length} />
          {toast ? <div className="floating-toast">{toast}</div> : null}
          <main className="main-content">
            <Routes>
              <Route path="/" element={<OverviewPage servers={initialServers} alerts={alerts} />} />
              <Route path="/servers" element={<ServersPage servers={initialServers} />} />
              <Route path="/servers/:serverId" element={<ServerDetailsPage alerts={alerts} />} />
              <Route path="/monitoring" element={<MonitoringPage />} />
              <Route
                path="/alerts"
                element={<AlertsPage alerts={alerts} resolveAlert={resolveAlert} notifications={notifications} />}
              />
              <Route path="/services" element={<ServicesPage />} />
              <Route
                path="/settings"
                element={
                  <SettingsPage
                    theme={theme}
                    setTheme={setTheme}
                    refreshInterval={refreshInterval}
                    setRefreshInterval={setRefreshInterval}
                    notifications={notifications}
                    setNotifications={setNotifications}
                  />
                }
              />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
