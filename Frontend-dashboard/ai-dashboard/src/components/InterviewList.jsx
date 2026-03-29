import './InterviewList.css'

const interviews = [
  { label: 'Frontend Interview', score: '82%', scoreColor: '#1ec99b', icon: '✅', iconBg: '#2e7df7' },
  { label: 'HR Round',           score: '70%', scoreColor: '#f5a623', icon: '➕', iconBg: '#2e7df7' },
  { label: 'Backend Interview',  score: '60%', scoreColor: '#e05252', icon: '➕', iconBg: '#e05252' },
]

function InterviewList() {
  return (
    <div className="interview-list-card">
      {interviews.map((item) => (
        <div className="interview-row" key={item.label}>
          <div className="interview-icon" style={{ background: item.iconBg }}>
            {item.icon}
          </div>
          <span className="interview-label">{item.label}</span>
          <span className="interview-score" style={{ color: item.scoreColor }}>
            {item.score}
          </span>
          <span className="interview-arrow">›</span>
        </div>
      ))}
    </div>
  )
}

export default InterviewList
