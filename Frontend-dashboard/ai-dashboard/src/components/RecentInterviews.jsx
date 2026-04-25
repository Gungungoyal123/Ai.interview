import './RecentInterviews.css'

function RecentInterviews({ feedbacks }) {
  if (!feedbacks || feedbacks.length === 0) {
    return (
      <div className="recent-card">
        <h3 className="recent-title">Recent Interviews</h3>
        <div className="recent-empty">
          <p>🎯 No interviews yet!</p>
          <p>Click "Start Interview" to begin your first practice session.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="recent-card">
      <h3 className="recent-title">Recent Interviews</h3>
      <div className="recent-list">
        {feedbacks.slice(0, 5).map((item, i) => {
          const color = item.overallScore >= 70 ? '#1ec99b' 
                      : item.overallScore >= 50 ? '#f5a623' 
                      : '#e05252';
          return (
            <div className="recent-row" key={i}>
              <div className="recent-info">
                <p className="recent-label">{item.role}</p>
                <p className="recent-sub">
                  <span className="recent-dot" style={{ background: color }}></span>
                  {item.verdict || "Completed"}
                </p>
              </div>
              <div className="recent-score" style={{ background: color }}>
                {item.overallScore}%
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default RecentInterviews;