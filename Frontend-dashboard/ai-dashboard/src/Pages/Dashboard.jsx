import './Dashboard.css'
import StatsCard from '../components/StatsCard'
import PerformanceChart from '../components/PerformanceChart'
import InterviewList from '../components/InterviewList'
import RecentInterviews from '../components/RecentInterviews'
import InterviewSession from '../components/InterviewSession'
// import axios from 'axios';
import { useState } from 'react';
function Dashboard() {

  //  const [questions, setQuestions] = useState([]);
  //  const handleStartInterview = async () => {
  //   console.log("Starting interview... calling OpenAI");

  //   try {
  //     const res = await axios.post('http://localhost:8000/api/interview/generate', {
  //       role: "Frontend Developer",       // hardcoded for now
  //       experience: "2",                  // hardcoded for now
  //       techStack: "React, JavaScript"    // hardcoded for now
  //     });

  //     setQuestions(res.data.questions);
  //     console.log("✅ Questions received:", res.data.questions); // check browser console

  //   } catch (err) {
  //     console.error("❌ Error generating questions:", err);
  //   }
  // };
   const [isInterviewActive, setIsInterviewActive] = useState(false);

  // ── Interview is active → show InterviewSession ──
  if (isInterviewActive) {
    return (
      <InterviewSession onEnd={() => setIsInterviewActive(false)} userId="69d227a8a737d2ffd066bc89"
  formData={{
    role: "Frontend Developer",
    experience: "2",
    techStack: "React, JavaScript",
    difficulty: "Medium",
    companyType: "Product-based",
    interviewType: "Technical"
  }}/>
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
