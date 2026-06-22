import "./Sidebar.css";
import { useNavigate, useLocation } from "react-router-dom";

const navItems = [{ label: "Dashboard", icon: "🏠", path: "/dashboard" }];

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const quotes = [
    "Explain concepts clearly — interviewers value clarity over complexity.",
    "Practice daily, even 15 minutes makes a difference.",
    "Focus on fundamentals — they win interviews.",
    "Think out loud — communication matters as much as logic.",
    "Mistakes are proof that you are learning.",
    "Consistency beats intensity.",
    "Confidence comes from preparation.",
  ];
  const getDailyQuote = () => {
    const today = new Date().getDate(); // 1–31
    return quotes[today % quotes.length];
  };
  const dailyQuote = getDailyQuote();
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-icon">🤖</div>
        <span className="logo-text">AI Interview</span>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <>
            <div
              key={item.label}
              className={`nav-item ${location.pathname === item.path ? "nav-item--active" : ""}`}
              onClick={() => navigate(item.path)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </div>

            <div className="sidebar-motivation">
              <p>💡 Tip of the Day</p>
              <span>{dailyQuote}</span>
            </div>
          </>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
