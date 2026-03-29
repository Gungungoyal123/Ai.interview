import './StatsCard.css'

function StatsCard({ icon, label, value, valueColor }) {
  return (
    <div className="stats-card">
      <div className="stats-icon">{icon}</div>
      <div className="stats-info">
        <p className="stats-label">{label}</p>
        <p className="stats-value" style={{ color: valueColor || '#1e2d4a' }}>
          {value}
        </p>
      </div>
    </div>
  )
}

export default StatsCard
