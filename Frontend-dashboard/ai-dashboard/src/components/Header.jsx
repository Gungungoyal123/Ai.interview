import './Header.css'
import { useNavigate } from 'react-router-dom'

function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("mytoken");
    localStorage.removeItem("userId");
    navigate("/");
  };

  return (
    <header className="header">
      <div className="header-left">
        <h2 className="header-title">AI Interview Prep</h2>
      </div>
      <div className="header-right">
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
        <div className="avatar">👤</div>
      </div>
    </header>
  )
}

export default Header