import { useState, useEffect } from 'react';  // ← add useEffect
import axios from 'axios';
import './InterviewSession.css';

function InterviewSession({ onEnd, formData, userId  }) {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isStarted, setIsStarted] = useState(false);

  // ← ADD THIS — runs automatically when component mounts
  useEffect(() => {
    handleStartInterview();
  }, []);

  const handleStartInterview = async () => {
    setIsLoading(true);
    try {
      const res = await axios.post('http://localhost:8000/api/interview/generate', {
        // role: "Frontend Developer",
        // experience: "2",
        // techStack: "React, JavaScript"
         
        ...formData,   // ✅ all fields from form
        userId         // ✅ important
      
      });

      setQuestions(res.data.questions);
      setCurrentIndex(0);
      setIsStarted(true);

    } catch (err) {
      console.error("❌ Error generating questions:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // ... rest of your code stays exactly the same

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleEnd = () => {
    setIsStarted(false);
    setQuestions([]);
    setCurrentIndex(0);
    if (onEnd) onEnd();  // notify Dashboard if needed
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

  // ── Interview Running ─────────────────────────────
  if (isStarted && questions.length > 0) {
    const current = questions[currentIndex];
    const isFirst = currentIndex === 0;
    const isLast = currentIndex === questions.length - 1;

    return (
      <div className="is-screen">

        {/* Header */}
        <div className="is-header">
          <h2 className="is-title">AI Interview</h2>
          <button className="is-end-btn" onClick={handleEnd}>
            End Interview
          </button>
        </div>

        {/* Progress Bar */}
        <div className="is-progress-track">
          <div
            className="is-progress-fill"
            style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
          />
        </div>
        <p className="is-progress-text">
          Question {currentIndex + 1} of {questions.length}
        </p>

        {/* Question Card */}
        <div className="is-card">
          <span className="is-type-badge">{current.type}</span>
          <p className="is-question">{current.question}</p>
        </div>

        {/* Navigation */}
        <div className="is-nav">
          <button
            className="is-btn is-btn-prev"
            onClick={handlePrev}
            disabled={isFirst}
          >
            ← Prev
          </button>

          {isLast ? (
            <button className="is-btn is-btn-finish" onClick={handleEnd}>
              Finish ✓
            </button>
          ) : (
            <button className="is-btn is-btn-next" onClick={handleNext}>
              Next →
            </button>
          )}
        </div>

      </div>
    );
  }

  // ── Not Started Yet — just return null ───────────
  // Button is in Dashboard, this component only handles the session
  return null;
}

export default InterviewSession;