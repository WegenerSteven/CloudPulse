import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <div className="empty-state large-empty">
      <h3>Page not found</h3>
      <p>The route you requested does not exist in this demo dashboard.</p>
      <Link to="/" className="primary-button">
        Return to overview
      </Link>
    </div>
  )
}
