import { useState } from "react";
import axios from "axios";

const styles = {
  wrapper: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #eef2ff, #f5f3ff)",
  },
  card: {
    width: "420px",
    padding: "30px",
    borderRadius: "16px",
    background: "#ffffff",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
  },
  header: {
    marginBottom: "20px",
  },
  title: {
    margin: 0,
    fontSize: "22px",
    fontWeight: "600",
  },
  subtitle: {
    fontSize: "14px",
    color: "#666",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  field: {
    display: "flex",
    flexDirection: "column",
    textAlign: "left",
  },
  input: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    outline: "none",
    fontSize: "14px",
  },
  select: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    outline: "none",
    fontSize: "14px",
  },
  row: {
    display: "flex",
    gap: "10px",
  },
  button: {
    marginTop: "15px",
    padding: "14px",
    borderRadius: "10px",
    border: "none",
    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
    color: "white",
    fontWeight: "600",
    cursor: "pointer",
    fontSize: "15px",
  },
  errorBox: {
    background: "#fee2e2",
    color: "#b91c1c",
    padding: "10px",
    borderRadius: "8px",
    fontSize: "14px",
    marginTop: "10px",
  },
  loadingBox: {
    background: "#eef2ff",
    color: "#4338ca",
    padding: "10px",
    borderRadius: "8px",
    fontSize: "14px",
    marginTop: "10px",
    textAlign: "center",
  },
};

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
      const userId = localStorage.getItem("userId"); // ✅ get userId from localStorage

     const res = await axios.post(`${import.meta.env.VITE_API_URL}/user/api/startinterview`, {
        ...formData,
        userId
      });

      if (res.data.success) {
        // ✅ pass sessionId and firstQuestion to parent
        onStart({
          sessionId: res.data.sessionid,
          firstQuestion: res.data.firstquestion,
          formData
        });
      }

    } catch (err) {
      console.error("Error starting interview:", err);
      setError("Failed to start interview. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>

        <div style={styles.header}>
          <h2 style={styles.title}>🚀 Start AI Interview</h2>
          <p style={styles.subtitle}>Generate personalized interview questions</p>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>

          <div style={styles.field}>
            <label>Role</label>
            <input
              type="text"
              name="role"
              placeholder="Frontend Developer"
              value={formData.role}
              onChange={handleChange}
              style={styles.input}
            />
          </div>

          <div style={styles.field}>
            <label>Experience (Years)</label>
            <input
              type="number"
              name="experience"
              min="0"
              placeholder="2"
              value={formData.experience}
              onChange={handleChange}
              style={styles.input}
            />
          </div>

          <div style={styles.field}>
            <label>Tech Stack</label>
            <input
              type="text"
              name="techStack"
              placeholder="React, Node, JavaScript"
              value={formData.techStack}
              onChange={handleChange}
              style={styles.input}
            />
          </div>

          <div style={styles.row}>
            <select name="difficulty" value={formData.difficulty} onChange={handleChange} style={styles.select}>
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>

            <select name="companyType" value={formData.companyType} onChange={handleChange} style={styles.select}>
              <option>Product-based</option>
              <option>Service-based</option>
              <option>Startup</option>
            </select>
          </div>

          <select name="interviewType" value={formData.interviewType} onChange={handleChange} style={styles.select}>
            <option>Technical</option>
            <option>HR</option>
            <option>System Design</option>
          </select>

          {error && <div style={styles.errorBox}>{error}</div>}
          {loading && <div style={styles.loadingBox}>⏳ Starting interview...</div>}

          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? "Starting..." : "Start Interview →"}
          </button>

        </form>
      </div>
    </div>
  );
}

export default UserForm;