import './Dashboard.css'
import StatsCard from '../components/StatsCard'
import PerformanceChart from '../components/PerformanceChart'
import InterviewList from '../components/InterviewList'
import RecentInterviews from '../components/RecentInterviews'
import InterviewSession from '../components/InterviewSession'
import { useState } from 'react';
import UserForm from '../components/UserForm'

function Dashboard() {
  const [isInterviewActive, setIsInterviewActive] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [firstQuestion, setFirstQuestion] = useState(null);

  // show UserForm
  if (isInterviewActive && !sessionId) {
    return (
      <UserForm
        onStart={(data) => {
          setSessionId(data.sessionId);        // ✅ store sessionId
          setFirstQuestion(data.firstQuestion); // ✅ store firstQuestion
        }}
      />
    );
  }

  // show InterviewSession
  if (sessionId && firstQuestion) {
    return (
      <InterviewSession
        sessionId={sessionId}
        firstQuestion={firstQuestion}
        onEnd={() => {
          setSessionId(null);
          setFirstQuestion(null);
          setIsInterviewActive(false);
        }}
      />
    );
  }

  return (
    <div className="dashboard">

      {/* Welcome Row */}
      <div className="welcome-row">
        <h1 className="welcome-text">Welcome back 👋</h1>
        <button className="start-btn" onClick={() => setIsInterviewActive(true)}>
          Start Interview ›
        </button>
      </div>

      {/* Stats Row */}
      <div className="stats-row">
        <StatsCard icon="✅" label="Total Interviews" value="12" />
        <StatsCard icon="⭐" label="Average Score" value="78%" valueColor="#1ec99b" />
        <StatsCard icon="😊" label="Confidence Level" value="Good" />
      </div>

      {/* Bottom Section */}
      <div className="bottom-row">
        <div className="left-col">
          <PerformanceChart />
          <InterviewList />
        </div>
        <div className="right-col">
          <RecentInterviews />
        </div>
      </div>

    </div>
  );
}

export default Dashboard;