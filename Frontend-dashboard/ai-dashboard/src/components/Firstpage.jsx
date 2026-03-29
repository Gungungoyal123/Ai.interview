import { useState } from "react";

function FirstPage() {
  const [isLogin, setIsLogin] = useState(true);

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

          <input placeholder="Email" style={styles.input} />
          <input placeholder="Password" type="password" style={styles.input} />

          {!isLogin && (
            <input placeholder="Confirm Password" style={styles.input} />
          )}

          <button style={styles.button}>
            {isLogin ? "Login" : "Sign Up"}
          </button>

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