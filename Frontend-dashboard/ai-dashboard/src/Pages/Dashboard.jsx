import './Dashboard.css'
import StatsCard from '../components/StatsCard'
import PerformanceChart from '../components/PerformanceChart'
import InterviewList from '../components/InterviewList'
import RecentInterviews from '../components/RecentInterviews'
import InterviewSession from '../components/InterviewSession'
// import axios from 'axios';
import { useState } from 'react';
import UserForm from '../components/UserForm'
function Dashboard() {

 
   const [isInterviewActive, setIsInterviewActive] = useState(false);
  //  const [questions, setQuestions] = useState([]);

const [formData, setFormData] = useState(null);

if (isInterviewActive && !formData) {
  return (
    <UserForm
      onStart={(data) => {
        setFormData(data); // save form data
      }}
    />
  );
}

if (formData) {
  return (
    <InterviewSession
      formData={formData}
      userId={"69d227a8a737d2ffd066bc89"} // need to get from database
      onEnd={() => {
        setFormData(null);
        setIsInterviewActive(false);
      }}
    />
  );
}
  
  return (
    <div className="dashboard">

      {/* Welcome Row */}
      <div className="welcome-row">
        <h1 className="welcome-text">Welcome back, Sonam 👋</h1>
        <button className="start-btn" 
        onClick={() => setIsInterviewActive(true)}  
        >Start Interview ›</button>
      </div>

      {/* Stats Row */}
      <div className="stats-row">
        <StatsCard icon="✅" label="Total Interviews" value="12" />
        <StatsCard icon="⭐" label="Average Score" value="78%" valueColor="#1ec99b" />
        <StatsCard icon="😊" label="Confidence Level" value="Good" />
      </div>

      {/* Bottom Section: Chart+List  |  Recent */}
      <div className="bottom-row">

        {/* Left column */}
        <div className="left-col">
          <PerformanceChart />
          <InterviewList />
        </div>

        {/* Right column */}
        <div className="right-col">
          <RecentInterviews />
        </div>

      </div>
    </div>
  )
}

export default Dashboard
