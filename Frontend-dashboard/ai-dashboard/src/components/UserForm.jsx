import { useState } from "react";
import axios from "axios";
import "./UserForm.css";

function UserForm({ onStart }) {
  const [formData, setFormData] = useState({
    role: "",
    experience: "",
    techStack: "",
    difficulty: "Medium",
    companyType: "Product-based",
    interviewType: "Technical",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const { role, experience, techStack } = formData;

    if (!role || !experience || !techStack) {
      setError("All fields are required");
      return;
    }

    if (experience < 0) {
      setError("Experience cannot be negative");
      return;
    }

    setLoading(true);
    try {
      const userId = localStorage.getItem("userId");

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/api/startinterview`,
        {
          ...formData,
          userId,
        }
      );

      if (res.data.success) {
        onStart({
          sessionId: res.data.sessionid,
          firstQuestion: res.data.firstquestion,
          formData,
        });
      }
    } catch (err) {
      console.error(err);
      setError("Failed to start interview");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-wrapper">
      <div className="form-card">

        <div className="form-header">
          <h2>🚀 Start AI Interview</h2>
          <p>Generate personalized interview questions</p>
        </div>

        <form onSubmit={handleSubmit} className="form">

          <div className="form-field">
            <label>Role</label>
            <input
              type="text"
              name="role"
              placeholder="Frontend Developer"
              value={formData.role}
              onChange={handleChange}
            />
          </div>

          <div className="form-field">
            <label>Experience (Years)</label>
            <input
              type="number"
              name="experience"
              min="0"
              placeholder="2"
              value={formData.experience}
              onChange={handleChange}
            />
          </div>

          <div className="form-field">
            <label>Tech Stack</label>
            <input
              type="text"
              name="techStack"
              placeholder="React, Node, JavaScript"
              value={formData.techStack}
              onChange={handleChange}
            />
          </div>

          <div className="form-row">
            <select name="difficulty" value={formData.difficulty} onChange={handleChange}>
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>

            <select name="companyType" value={formData.companyType} onChange={handleChange}>
              <option>Product-based</option>
              <option>Service-based</option>
              <option>Startup</option>
            </select>
          </div>

          <select name="interviewType" value={formData.interviewType} onChange={handleChange}>
            <option>Technical</option>
            <option>HR</option>
            <option>System Design</option>
          </select>

          {error && <div className="error-box">{error}</div>}
          {loading && <div className="loading-box">⏳ Starting interview...</div>}

          <button type="submit" disabled={loading}>
            {loading ? "Starting..." : "Start Interview →"}
          </button>

        </form>
      </div>
    </div>
  );
}

export default UserForm;