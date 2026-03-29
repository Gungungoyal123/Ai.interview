import './RecentInterviews.css'

const recent = [
  { label: 'Frontend Interview', dot: '#1ec99b', score: '82%', bg: '#1ec99b' },
  { label: 'HR Round',           dot: '#f5a623', score: '70%', bg: '#f5a623' },
  { label: 'Backend Interview',  dot: '#e05252', score: '60%', bg: '#e05252' },
]

function RecentInterviews() {
  return (
    <div className="recent-card">
      <h3 className="recent-title">Recent Interviews</h3>
      <div className="recent-list">
        {recent.map((item) => (
          <div className="recent-row" key={item.label}>
            <div className="recent-info">
              <p className="recent-label">{item.label}</p>
              <p className="recent-sub">
                <span className="recent-dot" style={{ background: item.dot }}></span>
                Confidence Score
              </p>
            </div>
            <div className="recent-score" style={{ background: item.bg }}>
              {item.score}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RecentInterviews
