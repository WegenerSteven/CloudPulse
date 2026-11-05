export function SettingsPage({
  theme,
  setTheme,
  refreshInterval,
  setRefreshInterval,
  notifications,
  setNotifications,
}: {
  theme: 'light' | 'dark'
  setTheme: (value: 'light' | 'dark') => void
  refreshInterval: number
  setRefreshInterval: (value: number) => void
  notifications: 'inline' | 'toast' | 'off'
  setNotifications: (value: 'inline' | 'toast' | 'off') => void
}) {
  return (
    <>
      <div className="page-header">
        <div>
          <p className="eyebrow">Preferences</p>
          <h3>Display and alert settings</h3>
        </div>
      </div>

      <div className="settings-grid">
        <label className="setting-card">
          <span>Theme preference</span>
          <select value={theme} onChange={(event) => setTheme(event.target.value as 'light' | 'dark')}>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </label>

        <label className="setting-card">
          <span>Metric refresh interval</span>
          <select value={refreshInterval} onChange={(event) => setRefreshInterval(Number(event.target.value))}>
            <option value={5}>5 seconds</option>
            <option value={10}>10 seconds</option>
            <option value={30}>30 seconds</option>
          </select>
        </label>

        <label className="setting-card">
          <span>Notification display</span>
          <select value={notifications} onChange={(event) => setNotifications(event.target.value as 'inline' | 'toast' | 'off')}>
            <option value="toast">Toast</option>
            <option value="inline">Inline</option>
            <option value="off">Off</option>
          </select>
        </label>
      </div>
    </>
  )
}
