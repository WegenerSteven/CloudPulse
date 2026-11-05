import { NavLink } from 'react-router-dom'

const navItems = [
  { path: '/', label: 'Overview' },
  { path: '/servers', label: 'Servers' },
  { path: '/monitoring', label: 'Monitoring' },
  { path: '/alerts', label: 'Alerts' },
  { path: '/services', label: 'Services' },
  { path: '/settings', label: 'Settings' },
]

export function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand-wrap">
        <div className="brand-mark">◉</div>
        <div>
          <p className="eyebrow">Demo environment</p>
          <h1>CloudPulse</h1>
        </div>
      </div>

      <nav className="nav" aria-label="Main navigation">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/'}
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <span className="dot live-dot" />
        Simulated data
      </div>
    </aside>
  )
}

export { navItems }
