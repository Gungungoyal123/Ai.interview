import { useState, useEffect } from 'react';  // ← add useEffect
import axios from 'axios';
import './InterviewSession.css';

function InterviewSession({ onEnd, formData, userId  }) {

  const [isListening, setIsListening] = useState(false);
  const [isInterviewActive, setIsInterviewActive] = useState(true);
  const[feedback , setFeedback] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
const [currentQuestion, setCurrentQuestion] = useState("");
const [sessionId, setSessionId] = useState("");
const [userAnswer, setUserAnswer] = useState("");

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();

recognition.onresult = (event) => {
  const transcript = event.results[0][0].transcript;
  setUserAnswer(transcript);
};
const speakText = (text) => {
  const speech = new SpeechSynthesisUtterance(text);
  speech.lang = "en-US";
  speech.rate = 1;
  speech.pitch = 1;

  window.speechSynthesis.speak(speech);
};
  // ← ADD THIS — runs automatically when component mounts
  useEffect(() => {
    handleStartInterview();
  }, []);

const handleStartInterview = async () => {
  setIsLoading(true);
  try {
    const res = await axios.post(
      "http://localhost:8000/user/api/startinterview",
      {
         userId,
        ...formData
       
      }
    );

    setSessionId(res.data.sessionid);
    setCurrentQuestion(res.data.firstquestion);
    setIsStarted(true);

  } catch (err) {
    console.error("❌ Error starting interview:", err);
  } finally {
    setIsLoading(false);
  }
};

// const speakQuestion = async (text) => {
//   try {
//     const res = await axios.post(
//       "http://localhost:8000/user/api/voice/speak",
//       { text },
//       { responseType: "blob" }
//     );

//     const audioUrl = URL.createObjectURL(res.data);
//     const audio = new Audio(audioUrl);
//     audio.play();

//   } catch (err) {
//     console.error("Voice error:", err);
//   }
// };
useEffect(() => {
  if (currentQuestion && isInterviewActive) {
    speakText(currentQuestion);
  }
}, [currentQuestion, isInterviewActive]);

const handleSubmitAnswer = async () => {
 if (!userAnswer || !isInterviewActive) return;

  try {
    const res = await axios.post(
      "http://localhost:8000/user/api/chat",
      {
        sessionid: sessionId,
        useranswer: userAnswer
      }
    );

    setCurrentQuestion(res.data.interviewanswer);
    setUserAnswer("");

    if (res.data.isComplete) {
      alert("Interview Completed 🎉");
      handleEnd();
    }

  } catch (err) {
    console.error("❌ Chat error:", err);
  }
};

const startListening = () => {
  if (!recognition) {
    alert("Speech recognition not supported in your browser");
    return;
  }

  setIsListening(true);
  recognition.start();

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    setUserAnswer(transcript); // ✅ auto fill textarea
  };

  recognition.onerror = (event) => {
    console.error("Mic error:", event.error);
    setIsListening(false);
  };

  recognition.onend = () => {
    setIsListening(false);
  };
};

const handleEnd = async () => {
  window.speechSynthesis.cancel(); 
  if (recognition) {
  recognition.stop();
}
 setIsInterviewActive(false);
  try {
    setIsLoading(true);

    const res = await axios.post(
      "http://localhost:8000/user/api/feedback",
      {
        sessionId: sessionId,
        voiceAnalysis: {
          avgConfidence: 75,
          avgSentiment: 70,
          fillerWords: 5
        }
      }
    );

    setFeedback(res.data.feedback); // ✅ store feedback
    console.log("✅ Feedback:", res.data.feedback);


  } catch (err) {
    console.error("❌ Feedback error:", err);
  } finally {
    setIsLoading(false);
  }
};


  // ── Loading State ─────────────────────────────────
  if (isLoading) {
    return (
      <div className="is-loading-wrap">
        <div className="is-spinner" />
        <p>Generating your questions...</p>
      </div>
    );
  }


  // 🟣 SHOW FEEDBACK FIRST
if (feedback) {
  return (
    <div className="feedback-container">


      <div className="feedback-card">
        
      <h1 className="feedback-title">🎉 Interview Feedback</h1>

        <div className="score-row">
          <div className="score-box">
            <h3>{feedback.overallScore}</h3>
            <p>Overall</p>
          </div>
          <div className="score-box">
            <h3>{feedback.technicalScore}</h3>
            <p>Technical</p>
          </div>
          <div className="score-box">
            <h3>{feedback.communicationScore}</h3>
            <p>Communication</p>
          </div>
        </div>

        <div className="feedback-section">
          <h3>💪 Strengths</h3>
          <ul>
            {feedback.strengths?.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>

        <div className="feedback-section">
          <h3>⚠️ Areas to Improve</h3>
          <ul>
            {feedback.weaknesses?.map((w, i) => (
              <li key={i}>{w}</li>
            ))}
          </ul>
        </div>

        <div className="verdict-box">
          <h3>📌 Verdict</h3>
          <p>{feedback.verdict}</p>
        </div>

        <button className="back-btn" onClick={onEnd}>
          Back to Dashboard
        </button>

      </div>
    </div>
  );
}
  // ── Interview Running ─────────────────────────────
 if (isStarted && currentQuestion) {
  return (
    <div className="is-screen">

      <div className="is-header">
        <h2>AI Interview</h2>
        <button onClick={handleEnd} className='is-btn-finish'>End</button>
      </div>

      {/* Question */}
      <div className="is-card">
        <h3>Question:</h3>
        <p>{currentQuestion}</p>
      </div>

      {/* Answer Input */}
      <textarea
        placeholder="Type your answer..."
        value={userAnswer}
        onChange={(e) => setUserAnswer(e.target.value)}
        className="is-input"
        style={{width:"657px" , height:"77px"}}
      />
          <button onClick={startListening} className="mic-btn">
        {isListening ? "🎤 Listening..." : "🎤 Speak Answer"}
      </button>
      <button onClick={handleSubmitAnswer} className="is-btn">
        Submit Answer →
      </button>
    </div>
    
  );
}


  return null;
}

export default InterviewSession;