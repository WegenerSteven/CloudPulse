import { Link, useLocation } from 'react-router-dom'
import { navItems } from './Sidebar'

export function Header({
  theme,
  setTheme,
  activeAlerts,
}: {
  theme: 'light' | 'dark'
  setTheme: (value: 'light' | 'dark') => void
  activeAlerts: number
}) {
  const location = useLocation()
  const pageTitle =
    location.pathname.startsWith('/servers')
      ? 'Servers'
      : navItems.find((item) => item.path === location.pathname)?.label ?? 'Overview'

  return (
    <header className="topbar">
      <div>
        <p className="eyebrow">Operations</p>
        <h2>{pageTitle}</h2>
      </div>

      <div className="header-actions">
        <div className="live-indicator">
          <span className="dot live-dot" />
          Simulated live data
        </div>
        <button
          type="button"
          className="header-button"
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        >
          {theme === 'light' ? 'Dark mode' : 'Light mode'}
        </button>
        <Link to="/alerts" className="header-button alert-button">
          Alerts {activeAlerts > 0 ? `(${activeAlerts})` : ''}
        </Link>
        <div className="user-pill">Demo User</div>
      </div>
    </header>
  )
}
