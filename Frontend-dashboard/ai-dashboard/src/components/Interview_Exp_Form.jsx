import React from "react";
import "./Interview_Form.css";
import axios from "axios";
import { useState } from "react";

function Form() {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    companyname: "",
    role: "",
    experience: "",
    interviewtype: "",
    interviewques: "",
    tips: "",
    anonymously: false,
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,

      [name]: type === "checkbox" ? checked : value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const { name, email, companyname, role, interviewques } = formData;

      // Frontend Validation
      if (
        !name.trim() ||
        !email.trim() ||
        !companyname.trim() ||
        !role.trim() ||
        !interviewques.trim()
      ) {
        setError("Please fill all required fields!");

        setLoading(false);

        return;
      }

      // API Request
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/userexperience`,
        formData,
      );

      // Success
      if (res.data.success) {
        setSuccess("Interview Experience Shared Successfully!");

        console.log(res.data);

        // Reset Form
        setFormData({
          name: "",
          email: "",
          companyname: "",
          role: "",
          experience: "",
          interviewtype: "",
          interviewques: "",
          tips: "",
          anonymously: false,
        });
      } else {
        setError(res.data.message || "Submission failed");
      }
    } catch (error) {
      console.log(error);

      setError(
        error.response?.data?.message ||
          error.message ||
          "Something went wrong!",
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <h1 style={{ textAlign: "center" }}>Share Your Interview Experience</h1>
      <form className="interview-form">
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />

        <label>Email</label>
        <input
          type="text"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />

        <label>Company Name</label>
        <input
          type="text"
          name="companyname"
          value={formData.companyname}
          onChange={handleChange}
        />

        <label>Role</label>
        <input
          type="text"
          name="role"
          onChange={handleChange}
          value={formData.role}
        />

        <label>Experience Level</label>
        <select
          name="experience"
          onChange={handleChange}
          value={formData.experience}
        >
          <option value="">Select Experience Level</option>
          <option value="Fresher">Fresher</option>
          <option value="1-2 Years">1-2 Years</option>
          <option value="3-5 Years">3-5 Years</option>
          <option value="5+ Years">5+ Years</option>
        </select>
        <div className="form-group">
          <label>Interview Type</label>

          <select
            name="interviewtype"
            onChange={handleChange}
            value={formData.interviewtype}
          >
            <option value="">Select Interview Type</option>
            <option value="HR">HR</option>
            <option value="Technical">Technical</option>
            <option value="Managerial">Managerial</option>
            <option value="System Design">System Design</option>
            <option value="Coding Round">Coding Round</option>
            <option value="Group Discussion">Group Discussion</option>
            <option value="Case Study">Case Study</option>
            <option value="Final Round">Final Round</option>
          </select>
        </div>
        <label>Interview Questions</label>
        <textarea
          style={{ padding: "10px" }}
          name="interviewques"
          rows="5"
          placeholder="Write interview questions here..."
          onChange={handleChange}
          value={formData.interviewques}
        ></textarea>

        {/* <label>Interview Process</label>
        <textarea
          style={{ padding: "10px" }}
          name="interviewProcess"
          rows="5"
          placeholder="Explain interview rounds/process..."
        ></textarea> */}

        <label>Tips to Crack Interview</label>
        <textarea
          style={{ padding: "10px" }}
          name="tips"
          rows="5"
          placeholder="Share your tips..."
          onChange={handleChange}
          value={formData.tips}
        ></textarea>

        {/* <label>Difficulty Level</label>
        <select name="difficultyLevel">
          <option value="">Select Difficulty</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select> */}

        <div className="checkbox-field">
          <input
            type="checkbox"
            name="anonymously"
            id="anonymous"
            onChange={handleChange}
            value={formData.anonymously}
          />
          <label htmlFor="anonymous">Submit Anonymously</label>
        </div>
         <div className="btn-container">
          {error && <div className="message-box error-message">{error}</div>}

          {/* Success Message */}
          {success && (
            <div className="message-box success-message">{success}</div>
          )}
        </div>
        <div className="btn-container">
          <button
            className="submit-btn"
            type="submit"
            disabled={loading}
            onClick={handleSubmit}
          >
            {loading ? "Submitting..." : "Submit Experience"}
          </button>
        </div>
       
      </form>
    </>
  );
}

export default Form;
