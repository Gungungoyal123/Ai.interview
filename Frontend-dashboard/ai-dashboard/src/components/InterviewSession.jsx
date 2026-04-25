import { useState, useEffect } from 'react';
import axios from 'axios';
import './InterviewSession.css';

function InterviewSession({ onEnd, sessionId, firstQuestion }) {
  const [isListening, setIsListening] = useState(false);
  const [isInterviewActive, setIsInterviewActive] = useState(true);
  const [feedback, setFeedback] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(firstQuestion || ""); // ✅ use prop directly
  const [userAnswer, setUserAnswer] = useState("");

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  // ✅ speak first question when component mounts
  useEffect(() => {
    if (firstQuestion) {
      speakText(firstQuestion);
    }
  }, []);

  // ✅ speak whenever question changes
  useEffect(() => {
    if (currentQuestion && isInterviewActive) {
      speakText(currentQuestion);
    }
  }, [currentQuestion]);

  const speakText = (text) => {
    window.speechSynthesis.cancel();
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "en-US";
    speech.rate = 1;
    speech.pitch = 1;
    window.speechSynthesis.speak(speech);
  };

  const handleSubmitAnswer = async () => {
    if (!userAnswer || !isInterviewActive) return;
    try {
      const res = await axios.post("http://localhost:8000/user/api/chat", {
        sessionid: sessionId,
        useranswer: userAnswer
      });
      setCurrentQuestion(res.data.interviewanswer);
      setUserAnswer("");
      if (res.data.isComplete) {
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
      setUserAnswer(transcript);
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
    if (recognition) recognition.stop();
    setIsInterviewActive(false);
    try {
      setIsLoading(true);
      const res = await axios.post("http://localhost:8000/user/api/feedback", {
        sessionId: sessionId,
        voiceAnalysis: {
          avgConfidence: 75,
          avgSentiment: 70,
          fillerWords: 5
        }
      });
      setFeedback(res.data.feedback);
    } catch (err) {
      console.error("❌ Feedback error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="is-loading-wrap">
        <div className="is-spinner" />
        <p>{isInterviewActive ? "Loading..." : "Generating feedback..."}</p>
      </div>
    );
  }

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
              {feedback.strengths?.map((s, i) => <li key={i}>{s}</li>)}
            </ul>
          </div>
          <div className="feedback-section">
            <h3>⚠️ Areas to Improve</h3>
            <ul>
              {feedback.weaknesses?.map((w, i) => <li key={i}>{w}</li>)}
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

  return (
    <div className="is-screen">
      <div className="is-header">
        <h2>AI Interview</h2>
        <button onClick={handleEnd} className='is-btn-finish'>End Interview</button>
      </div>
      <div className="is-card">
        <h3>Question:</h3>
        <p>{currentQuestion}</p>
      </div>
      <textarea
        placeholder="Type your answer or use mic..."
        value={userAnswer}
        onChange={(e) => setUserAnswer(e.target.value)}
        className="is-input"
        style={{ width: "657px", height: "77px" }}
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

export default InterviewSession;