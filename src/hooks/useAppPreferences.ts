import { useEffect, useState } from 'react'

export type ThemeMode = 'light' | 'dark'
export type NotificationMode = 'inline' | 'toast' | 'off'

export const useAppPreferences = () => {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('cloudpulse-theme')
    return saved === 'dark' ? 'dark' : 'light'
  })

  const [refreshInterval, setRefreshInterval] = useState<number>(() => {
    const saved = localStorage.getItem('cloudpulse-refresh-interval')
    return saved ? Number(saved) : 10
  })

  const [notifications, setNotifications] = useState<NotificationMode>(() => {
    const saved = localStorage.getItem('cloudpulse-notification-display')
    return saved === 'inline' || saved === 'toast' || saved === 'off' ? saved : 'toast'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('cloudpulse-theme', theme)
  }, [theme])

  useEffect(() => {
    localStorage.setItem('cloudpulse-refresh-interval', String(refreshInterval))
  }, [refreshInterval])

  useEffect(() => {
    localStorage.setItem('cloudpulse-notification-display', notifications)
  }, [notifications])

  return { theme, setTheme, refreshInterval, setRefreshInterval, notifications, setNotifications }
}
