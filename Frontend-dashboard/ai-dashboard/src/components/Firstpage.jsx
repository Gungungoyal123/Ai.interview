import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { useEffect } from "react";
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
      const response = await fetch("http://localhost:8000/user/login", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(logindata),
      });
      const data = await response?.json();
      if (response.ok) {
        localStorage.setItem("mytoken", data.token);
        console.log("login succeessfull");
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
      const response = await fetch("http://localhost:8000/user/signup", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(signupinfo),
      });
      const data = await response?.json();
      if (response.ok) {
        setMessage(data.message); // success message
         setTimeout(() => {
        navigate('/user/login');
      }, 1500);  
        setIsError(false);
        setemail("");
        setpassword("");
        console.log("successfull singup", data);
      } else {
        console.log("unsuccessfull signup");
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
    <div style={styles.container}>
      {/* LEFT SIDE (WELCOME) */}
      <div style={styles.left}>
        <h1>Welcome to IntervAI 🚀</h1>
        <p>Practice interviews smarter and boost your confidence.</p>
      </div>

      {/* RIGHT SIDE (FORM) */}
      <div style={styles.right}>
        <div style={styles.card}>
          <h2>{isLogin ? "Login" : "Sign Up"}</h2>
          <input
            placeholder="Email"
            onChange={handlemail}
            style={styles.input}
          />
          <input
            placeholder="Password"
            onChange={handlepassword}
            type="password"
            style={styles.input}
          />

          {!isLogin && (
            <input placeholder="Confirm Password" style={styles.input} />
          )}

          <button
            style={styles.button}
            onClick={isLogin ? handlelogin : handlesignup}
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
          {message && (
            <p
              style={{
                color: isError ? "red" : "green",
                marginTop: "10px",
              }}
            >
              {message}
            </p>
          )}

          <p style={styles.toggle} onClick={() => setIsLogin(!isLogin)}>
            {isLogin
              ? "Don't have an account? Sign Up"
              : "Already have an account? Login"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default FirstPage;

const styles = {
  container: {
    display: "flex",
    height: "100vh",
    fontFamily: "Arial",
  },
  left: {
    flex: 1,
    background: "linear-gradient(135deg, #4f46e5, #9333ea)",
    color: "white",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  },
  right: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f5f5f5",
  },
  card: {
    background: "white",
    padding: "30px",
    borderRadius: "10px",
    width: "300px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  button: {
    width: "100%",
    padding: "10px",
    background: "#4f46e5",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  toggle: {
    marginTop: "10px",
    cursor: "pointer",
    color: "#4f46e5",
  },
};
