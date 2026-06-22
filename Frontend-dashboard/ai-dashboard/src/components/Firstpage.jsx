

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './first.css'

function FirstPage() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handlemail = (e) => {
    setemail(e.target.value);
  };

  const handlepassword = (e) => {
    setpassword(e.target.value);
  };

  const handlelogin = async (e) => {
    e.preventDefault();
    const logindata = {
      email: email,
      password: password,
    };
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/user/login`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(logindata),
      });
      const data = await response?.json();
      if (response.ok) {
        localStorage.setItem("mytoken", data.token);
        localStorage.setItem("userId", data.userId); // save userId
        console.log("login successful");
        setMessage("Login successful");
        setIsError(false);
        navigate("/dashboard");
      } else {
        console.log("login failed!");
        setMessage(data.message);
        setIsError(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlesignup = async (e) => {
    e.preventDefault();
    const signupinfo = {
      email: email,
      password: password,
    };
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/user/signup`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(signupinfo),
      });
      const data = await response.json();
      if (response.ok) {
        console.log("successful signup");
        setMessage("Signup successful! Please login.");
        setIsError(false);
        setIsLogin(true);
      } else {
        console.log("unsuccessful signup");
        setMessage(data.message);
        setIsError(true);
      }
    } catch (error) {
      console.log(error);
      setMessage("Server not responding");
      setIsError(true);
    }
  };

  return (
    <div className="auth-container">

      {/* LEFT SIDE */}
      <div className="auth-left">
        <div className="left-content">
          <h1>IntervAI</h1>
          <h2>Practice smarter. Walk in ready.</h2>
          <p>
            AI-powered mock interviews with real-time feedback,
            voice analysis, and personalized improvement tips.
          </p>

          <div className="features">
            <p>Voice-based interviews</p>
            <p>Instant feedback</p>
            <p>AI suggestions</p>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="auth-right">
        <div className="auth-card">
          <h2>{isLogin ? "Welcome back" : "Create your account"}</h2>

          <input placeholder="Email" onChange={handlemail} />
          <input placeholder="Password" type="password" onChange={handlepassword} />

          {!isLogin && <input placeholder="Confirm Password" />}

          <button onClick={isLogin ? handlelogin : handlesignup}>
            {isLogin ? "Log in" : "Sign up"}
          </button>

          {message && (
            <p className={isError ? "error" : "success"}>{message}</p>
          )}

          <p className="toggle" onClick={() => setIsLogin(!isLogin)}>
            {isLogin
              ? "Don't have an account? Sign up"
              : "Already have an account? Log in"}
          </p>
        </div>
      </div>

    </div>
  );
}

export default FirstPage;