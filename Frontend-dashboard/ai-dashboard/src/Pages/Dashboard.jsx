import './Dashboard.css'
import StatsCard from '../components/StatsCard'
import RecentInterviews from '../components/RecentInterviews'
import InterviewSession from '../components/InterviewSession'
import { useState, useEffect } from 'react';
import UserForm from '../components/UserForm'

function Dashboard() {
  const [isInterviewActive, setIsInterviewActive] = useState(false);
  const [sessionData, setSessionData] = useState(null);
  const [username, setUsername] = useState("");
  const [feedbacks, setFeedbacks] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetchUsername();
    fetchFeedbacks();
  }, []);

  const fetchUsername = async () => {
    try {
      const token = localStorage.getItem("mytoken");
      const res = await fetch(`${import.meta.env.VITE_API_URL}/user/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) setUsername(data.name || "User");
    } catch (err) {
      console.log(err);
    }
  };

  const fetchFeedbacks = async () => {
    try {
     const res = await fetch(`${import.meta.env.VITE_API_URL}/user/api/feedbacks/${userId}`);
      const data = await res.json();
      if (res.ok) setFeedbacks(data.feedbacks);
    } catch (err) {
      console.log(err);
    }
  };

  const avgScore = feedbacks.length > 0
    ? Math.round(feedbacks.reduce((sum, f) => sum + f.overallScore, 0) / feedbacks.length)
    : 0;

  if (isInterviewActive && !sessionData) {
    return <UserForm onStart={(data) => setSessionData(data)} />;
  }

  if (sessionData) {
    return (
      <InterviewSession
        sessionId={sessionData.sessionId}
        firstQuestion={sessionData.firstQuestion}
        onEnd={() => {
          setSessionData(null);
          setIsInterviewActive(false);
          fetchFeedbacks();
        }}
      />
    );
  }

  return (
    <div className="dashboard">
      <div className="welcome-row">
        <div>
          <h1 className="welcome-text">Welcome back, {username} 👋</h1>
          <p className="welcome-sub">Ready for your next interview practice?</p>
        </div>
        <button className="start-btn" onClick={() => setIsInterviewActive(true)}>
          + Start Interview
        </button>
      </div>

      <div className="stats-row">
        <StatsCard icon="🎯" label="Total Interviews" value={feedbacks.length || 0} />
        <StatsCard icon="⭐" label="Average Score" value={`${avgScore}%`} valueColor="#1ec99b" />
        <StatsCard icon="🏆" label="Last Verdict" value={feedbacks[0]?.verdict || "N/A"} />
      </div>

      <RecentInterviews feedbacks={feedbacks} />
    </div>
  );
}

export default Dashboard;