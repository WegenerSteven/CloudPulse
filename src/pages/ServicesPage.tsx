import { services as serviceCatalog } from '../data/mockData'
import { formatRelativeTime, getStatusClass, statusText } from '../utils/formatters'

export function ServicesPage() {
  return (
    <>
      <div className="page-header">
        <div>
          <p className="eyebrow">Service health</p>
          <h3>Monitored applications</h3>
        </div>
      </div>

      <div className="service-grid">
        {serviceCatalog.map((service) => (
          <article key={service.id} className="service-card">
            <div className="service-header">
              <h4>{service.name}</h4>
              <span className={getStatusClass(service.status)}>{statusText[service.status]}</span>
            </div>
            <p>{service.description}</p>
            <div className="service-metrics">
              <div>
                <span>Response time</span>
                <strong>{service.responseTimeMs === 0 ? 'Offline' : `${service.responseTimeMs} ms`}</strong>
              </div>
              <div>
                <span>Availability</span>
                <strong>{service.availability}%</strong>
              </div>
              <div>
                <span>Last checked</span>
                <strong>{formatRelativeTime(service.lastCheckedAt)}</strong>
              </div>
            </div>
          </article>
        ))}
      </div>
    </>
  )
}
