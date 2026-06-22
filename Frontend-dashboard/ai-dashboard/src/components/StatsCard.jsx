import './StatsCard.css'

function StatsCard({ label, value, tone }) {
  return (
    <div className="stats-card">
      <div className="stats-info">
        <p className="stats-label">{label}</p>
        <p className={`stats-value ${tone ? `stats-value--${tone}` : ''}`}>
          {value}
        </p>
      </div>
    </div>
  )
}

export default StatsCard
